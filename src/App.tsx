import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { Layout } from './Layout';

import { Home } from './pages/Home';
import { Task } from './pages/Task';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="tarefas/:userID" element={<Task />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
