import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

//
const test = 'alskjd'
const App = () => (
     <BrowserRouter>
          <Routes>
               {test}
               <Route path='/' />
          </Routes>
     </BrowserRouter>


)

export default App;
