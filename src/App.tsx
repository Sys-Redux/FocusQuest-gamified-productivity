import { BrowserRouter, Routes, Route } from "react-router-dom"
import { TaskProvider } from "./context/TaskProvider"
import Dashboard from "./pages/Dashboard"

function App() {
  return (
    <BrowserRouter>
      <TaskProvider>
        <Routes>
          <Route path="/" element={<Dashboard />} />
        </Routes>
      </TaskProvider>
    </BrowserRouter>
  );
}

export default App;