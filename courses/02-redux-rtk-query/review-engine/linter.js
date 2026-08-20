import { execSync } from 'child_process';
import { existsSync } from 'fs';
import { join } from 'path';

/**
 * Runs ESLint on specified files
 * Only checks files specified in challenge metadata
 */
export async function runLinting(filesToCheck, projectDir, challengeMetadata = {}) {
  if (!filesToCheck || filesToCheck.length === 0) {
    return {
      score: 0,
      passed: false,
      error: 'No files specified for linting',
      details: []
    };
  }

  // Resolve file paths
  const filePaths = filesToCheck
    .map(file => join(projectDir, file))
    .filter(file => existsSync(file));

  if (filePaths.length === 0) {
    return {
      score: 0,
      passed: false,
      error: 'None of the specified files exist',
      details: []
    };
  }

  // Check if ESLint is required in requirements
  const requirements = challengeMetadata.requirements?.codeQuality || [];
  const requiresESLint = requirements.some(req =>
    req.toLowerCase().includes('eslint') || req.toLowerCase().includes('lint')
  );

  // If no ESLint requirement specified, return 100% (nothing to check)
  if (requirements.length > 0 && !requiresESLint) {
    return {
      score: 100,
      passed: true,
      totalIssues: 0,
      errors: 0,
      warnings: 0,
      details: [],
      note: 'No ESLint requirement specified in challenge'
    };
  }

  try {
    // Quote file paths so Windows paths containing spaces work correctly
    const quotedFilePaths = filePaths.map(filePath => `"${filePath}"`);

    // Run ESLint ONLY on specified files
    const output = execSync(
      `npx eslint ${quotedFilePaths.join(' ')} --format json`,
      {
        cwd: projectDir,
        encoding: 'utf-8',
        stdio: ['pipe', 'pipe', 'pipe']
      }
    );

    const lintResults = JSON.parse(output);

    // Calculate score based on errors and warnings
    const filePathSet = new Set(
      filePaths.map(p => p.replace(/\\/g, '/'))
    );

    let totalIssues = 0;
    let errors = 0;
    let warnings = 0;

    lintResults.forEach(file => {
      const normalizedPath = file.filePath.replace(/\\/g, '/');

      const isTargetFile =
        filePathSet.has(normalizedPath) ||
        filePaths.some(fp =>
          normalizedPath.endsWith(fp.replace(/\\/g, '/'))
        );

      if (isTargetFile) {
        file.messages.forEach(message => {
          totalIssues++;

          if (message.severity === 2) {
            errors++;
          } else {
            warnings++;
          }
        });
      }
    });

    // Score: 100 - (errors * 10) - (warnings * 2)
    const score = Math.max(
      0,
      100 - (errors * 10) - (warnings * 2)
    );

    return {
      score: Math.round(score * 10) / 10,
      passed: errors === 0,
      totalIssues,
      errors,
      warnings,
      details: lintResults
    };
  } catch (error) {
    // ESLint exits with non-zero on errors, try to parse output
    try {
      const errorOutput = error.stdout || error.stderr || '';
      const lintResults = JSON.parse(errorOutput);

      const filePathSet = new Set(
        filePaths.map(p => p.replace(/\\/g, '/'))
      );

      let totalIssues = 0;
      let errors = 0;
      let warnings = 0;

      lintResults.forEach(file => {
        const normalizedPath = file.filePath.replace(/\\/g, '/');

        const isTargetFile =
          filePathSet.has(normalizedPath) ||
          filePaths.some(fp =>
            normalizedPath.endsWith(fp.replace(/\\/g, '/'))
          );

        if (isTargetFile) {
          file.messages.forEach(message => {
            totalIssues++;

            if (message.severity === 2) {
              errors++;
            } else {
              warnings++;
            }
          });
        }
      });

      const score = Math.max(
        0,
        100 - (errors * 10) - (warnings * 2)
      );

      return {
        score: Math.round(score * 10) / 10,
        passed: errors === 0,
        totalIssues,
        errors,
        warnings,
        details: lintResults
      };
    } catch {
      return {
        score: 50,
        passed: false,
        error: 'Could not parse linting results',
        details: []
      };
    }
  }
}