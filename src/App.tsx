import './App.css'
import { Routes, Route } from 'react-router-dom'
import DefaultLayout from './layouts/DefaultLayout'
import HomePage from './pages/Default/HomePage/HomePage'
import AdminLayout from './layouts/AdminLayout'
import AddActor from './pages/Admin/Actor/AddActor/AddActor'
import LoginPage from './pages/Default/LoginPage/LoginPage'
import RegisterPage from './pages/Default/RegisterPage/RegisterPage'
import DeleteActor from './pages/Admin/Actor/DeleteActor/DeleteActor'
import EditActor from './pages/Admin/Actor/EditActor/EditActor'
import AddGenre from './pages/Admin/Genre/AddGenre/AddGenre'
import DeleteGenre from './pages/Admin/Genre/DeleteGenre/DeleteGenre'
import NotFoundPage from './pages/Default/NotFound/NotFoundPage'
import MoviesPage from './pages/Default/MoviesPage/MoviesPage'
import AddCountry from './pages/Admin/Country/AddCountry/AddCountry'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<DefaultLayout />}>
          <Route index element={<HomePage />} />
          <Route path='login' element={<LoginPage></LoginPage>}/>
          <Route path='register' element={<RegisterPage></RegisterPage>}/>
          <Route path='movies/:slug' element={<MoviesPage></MoviesPage>}/>
          <Route path='*' element={<NotFoundPage></NotFoundPage>}></Route>
        </Route>
        <Route path='/admin' element={<AdminLayout />}>
          <Route path='add-actor' element={<AddActor />} />
          <Route path='delete-actor' element={<DeleteActor/>} />
          <Route path='edit-actor' element={<EditActor/>} />
          <Route path='add-genre' element={<AddGenre/>} />
          <Route path='delete-genre' element={<DeleteGenre/>} />
          <Route path='add-country' element={<AddCountry/>} />
        </Route> 
      </Routes>
    </>
  )
}

export default App
