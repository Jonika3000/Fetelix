import './App.css'
import { Routes, Route } from 'react-router-dom'
import DefaultLayout from './layouts/DefaultLayout'
import HomePage from './pages/Default/HomePage/HomePage'
import AdminLayout from './layouts/AdminLayout'
import AddActor from './pages/Admin/Actor/AddActor/AddActor'
import LoginPage from './pages/Default/LoginPage/LoginPage'
import RegisterPage from './pages/Default/RegisterPage/RegisterPage'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<DefaultLayout />}>
          <Route index element={<HomePage />} />
          <Route path='login' element={<LoginPage></LoginPage>}/>
          <Route path='register' element={<RegisterPage></RegisterPage>}/>
        </Route>
        <Route path='/admin' element={<AdminLayout />}>
          <Route path='add-actor' element={<AddActor />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
