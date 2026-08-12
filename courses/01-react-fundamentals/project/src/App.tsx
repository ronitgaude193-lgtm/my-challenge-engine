import './App.css'

import {
  useReducer,
  useEffect,
} from 'react'

import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom'

import ChallengeList from './components/ChallengeList'
import TaskList from './components/TaskList'
import TaskApp from './components/TaskApp'
import TaskDetailPage from './components/TaskDetailPage'
import FetchDemoView from './components/FetchDemoView'

import {
  ThemeProvider,
} from './contexts/ThemeContext'

import useLocalStorage from './hooks/useLocalStorage'

import type { Task } from './components/TaskList'

import {
  taskReducer,
} from './taskReducer'

/* =====================================================
   INITIAL TASKS
===================================================== */

const INITIAL_TASKS: Task[] = [
  {
    id: 1,
    title: 'First Task',
    description: 'Description one',
    priority: 'High',
    completed: false,
  },
  {
    id: 2,
    title: 'Second Task',
    description: 'Description two',
    priority: 'Medium',
    completed: false,
  },
  {
    id: 3,
    title: 'Third Task',
    description: 'Description three',
    priority: 'Low',
    completed: false,
  },
  {
    id: 4,
    title: 'Fourth Task',
    description: 'Description four',
    priority: 'Medium',
    completed: false,
  },
  {
    id: 5,
    title: 'Fifth Task',
    description: 'Description five',
    priority: 'High',
    completed: false,
  },
]

/* =====================================================
   APP CONTENT
===================================================== */

function AppContent() {
  const [
    storedTasks,
    setStoredTasks,
  ] = useLocalStorage<Task[]>(
    'task-app-tasks',
    INITIAL_TASKS
  )

  const [
    tasks,
    dispatch,
  ] = useReducer(
    taskReducer,
    storedTasks
  )

  /* ===================================================
     PERSIST REDUCER STATE
  =================================================== */

  useEffect(() => {
    setStoredTasks(tasks)
  }, [
    tasks,
    setStoredTasks,
  ])

  return (
    <BrowserRouter>
      <div className="App">
        <main>
          <Routes>

            {/* =========================================
                HOME
            ========================================= */}

            <Route
              path="/"
              element={
                <ChallengeList />
              }
            />

            {/* =========================================
                CHALLENGE 01
            ========================================= */}

            <Route
              path="/challenge/01-static-task-display"
              element={
                <TaskList />
              }
            />

            {/* =========================================
                CHALLENGE 02
            ========================================= */}

            <Route
              path="/challenge/02-dynamic-task-rendering"
              element={
                <TaskApp
                  tasks={tasks}
                  dispatch={dispatch}
                  showForm={false}
                  countFormat="tasks"
                />
              }
            />

            {/* =========================================
                CHALLENGE 03
            ========================================= */}

            <Route
              path="/challenge/03-adding-new-tasks"
              element={
                <TaskApp
                  tasks={tasks}
                  dispatch={dispatch}
                  showForm
                  countFormat="tasks"
                />
              }
            />

            {/* =========================================
                CHALLENGE 04
            ========================================= */}

            <Route
              path="/challenge/04-task-completion-toggle"
              element={
                <TaskApp
                  tasks={tasks}
                  dispatch={dispatch}
                  showForm
                  countFormat="completed"
                />
              }
            />

            {/* =========================================
                CHALLENGE 05
            ========================================= */}

            <Route
              path="/challenge/05-task-deletion"
              element={
                <TaskApp
                  tasks={tasks}
                  dispatch={dispatch}
                  showForm
                  countFormat="tasks"
                />
              }
            />

            {/* =========================================
                CHALLENGE 06
            ========================================= */}

            <Route
              path="/challenge/06-task-filtering"
              element={
                <TaskApp
                  tasks={tasks}
                  dispatch={dispatch}
                  showForm
                  countFormat="tasks"
                  showFilterBar
                />
              }
            />

            {/* =========================================
                CHALLENGE 07
            ========================================= */}

            <Route
              path="/challenge/07-priority-based-sorting"
              element={
                <TaskApp
                  tasks={tasks}
                  dispatch={dispatch}
                  showForm
                  countFormat="tasks"
                  showFilterBar
                />
              }
            />

            {/* =========================================
                CHALLENGE 08
            ========================================= */}

            <Route
              path="/challenge/08-task-editing"
              element={
                <TaskApp
                  tasks={tasks}
                  dispatch={dispatch}
                  showForm
                  countFormat="tasks"
                />
              }
            />

            {/* =========================================
                CHALLENGE 09
            ========================================= */}

            <Route
              path="/challenge/09-search-functionality"
              element={
                <TaskApp
                  tasks={tasks}
                  dispatch={dispatch}
                  showForm
                  countFormat="tasks"
                  showFilterBar
                />
              }
            />

            {/* =========================================
                CHALLENGE 10
            ========================================= */}

            <Route
              path="/challenge/10-useeffect-local-storage"
              element={
                <TaskApp
                  tasks={tasks}
                  dispatch={dispatch}
                  showForm
                  countFormat="tasks"
                />
              }
            />

            {/* =========================================
                CHALLENGE 11
            ========================================= */}

            <Route
              path="/challenge/11-useeffect-debounced-search"
              element={
                <TaskApp
                  tasks={tasks}
                  dispatch={dispatch}
                  showForm
                  countFormat="tasks"
                  showFilterBar
                />
              }
            />

            {/* =========================================
                CHALLENGE 12
            ========================================= */}

            <Route
              path="/challenge/12-categories-and-tags"
              element={
                <TaskApp
                  tasks={tasks}
                  dispatch={dispatch}
                  showForm
                  countFormat="tasks"
                  showFilterBar
                />
              }
            />

            {/* =========================================
                CHALLENGE 13
            ========================================= */}

            <Route
              path="/challenge/13-due-dates-and-sorting"
              element={
                <TaskApp
                  tasks={tasks}
                  dispatch={dispatch}
                  showForm
                  countFormat="tasks"
                  showFilterBar
                />
              }
            />

            {/* =========================================
                CHALLENGE 14
            ========================================= */}

            <Route
              path="/challenge/14-task-statistics-dashboard"
              element={
                <TaskApp
                  tasks={tasks}
                  dispatch={dispatch}
                  showForm
                  countFormat="tasks"
                  showStatsPanel
                />
              }
            />

            {/* =========================================
                CHALLENGE 15
            ========================================= */}

            <Route
              path="/challenge/15-component-organization"
              element={
                <TaskApp
                  tasks={tasks}
                  dispatch={dispatch}
                  showForm
                  countFormat="tasks"
                />
              }
            />

            {/* =========================================
                CHALLENGE 16
            ========================================= */}

            <Route
              path="/challenge/16-context-api-theme"
              element={
                <TaskApp
                  tasks={tasks}
                  dispatch={dispatch}
                  showForm
                  countFormat="tasks"
                />
              }
            />

            {/* =========================================
                CHALLENGE 17
            ========================================= */}

            <Route
              path="/challenge/17-custom-hook-uselocalstorage"
              element={
                <TaskApp
                  tasks={tasks}
                  dispatch={dispatch}
                  showForm
                  countFormat="tasks"
                />
              }
            />

            {/* =========================================
                CHALLENGE 18
            ========================================= */}

            <Route
              path="/challenge/18-usereducer-complex-state"
              element={
                <TaskApp
                  tasks={tasks}
                  dispatch={dispatch}
                  showForm
                  countFormat="tasks"
                  showFilterBar
                />
              }
            />

            {/* =========================================
                CHALLENGE 19
            ========================================= */}

            <Route
              path="/challenge/19-performance-optimization"
              element={
                <TaskApp
                  tasks={tasks}
                  dispatch={dispatch}
                  showForm
                  countFormat="tasks"
                />
              }
            />

            {/* =========================================
                CHALLENGE 20
            ========================================= */}

            <Route
              path="/challenge/20-error-boundaries"
              element={
                <TaskApp
                  tasks={tasks}
                  dispatch={dispatch}
                  showForm
                  countFormat="tasks"
                />
              }
            />

            {/* =========================================
                CHALLENGE 21
            ========================================= */}

            <Route
              path="/challenge/21-react-router"
              element={
                <TaskApp
                  tasks={tasks}
                  dispatch={dispatch}
                  showForm
                  countFormat="tasks"
                  linkToTaskDetail
                />
              }
            />

            {/* =========================================
                CHALLENGE 21 - TASK DETAIL
            ========================================= */}

            <Route
              path="/challenge/21-react-router/task/:id"
              element={
                <TaskDetailPage />
              }
            />

            {/* =========================================
                CHALLENGE 22
            ========================================= */}

            <Route
              path="/challenge/22-data-fetching"
              element={
                <FetchDemoView />
              }
            />

            {/* =========================================
                CHALLENGE 23
            ========================================= */}

            <Route
              path="/challenge/23-useref-focus-management"
              element={
                <TaskApp
                  tasks={tasks}
                  dispatch={dispatch}
                  showForm
                  countFormat="tasks"
                  showFilterBar
                />
              }
            />

          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}

/* =====================================================
   APP
===================================================== */

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  )
}

export default App