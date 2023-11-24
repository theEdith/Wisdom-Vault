import React from 'react'
import {Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import NewQuote from './pages/NewQuote';
import ShowQuote from './pages/ShowQuote';
import EditQuote from './pages/EditQuote';
import DeleteQuote from './pages/DeleteQuote';
const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/quotes/details/:id' element={<ShowQuote/>} />
      <Route path='/quotes/create' element={<NewQuote/>} />
      <Route path='/quotes/edit/:id' element={<EditQuote/>}/>
      <Route path='/quotes/delete/:id' element={<DeleteQuote/>} /> 
    </Routes>
  )
}

export default App
