import './App.css'
import { Routes, Route } from 'react-router-dom'
import DefaultLayout from './layouts/DefaultLayout'
import HomePage from './pages/Default/HomePage/HomePage'
import AdminLayout from './layouts/AdminLayout'
import AddActor from './pages/Admin/AddActor/AddActor'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<DefaultLayout />}>
          <Route index element={<HomePage />} />
        </Route>
        <Route path='/admin' element={<AdminLayout />}>
          <Route path='add-actor' element={<AddActor />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
