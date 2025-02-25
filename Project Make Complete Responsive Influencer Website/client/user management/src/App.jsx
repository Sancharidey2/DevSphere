import { useState } from 'react'
import './App.css'

import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom'
import SearchAppBar from './navbar'
import DataTable from './userList'
import AddnewUser from './new'
import EditUser from './edit'
import Aboutcard from './About'

const Routing = () => {
  return (
    <Routes>
      <Route path='/' element={<DataTable />}>
      </Route>
      <Route path='/new' element={<AddnewUser />}>
      </Route>
      <Route path='/edit' element={<EditUser />}>
      </Route>
      <Route path='/about' element={<Aboutcard />}>
      </Route>
    </Routes>
  )
}

function App() {

  return (
    <BrowserRouter>
      <Routing />
    </BrowserRouter>
  );
}

export default App
