import { BrowserRouter, Route, Routes } from "react-router-dom";

import './App.css'

import Navbar from "../Navbar/Navbar";


function App() {

  return (
    <div className='app'>
      <BrowserRouter>
        <Navbar />
        <Routes>
          {/* <Route path="/" element={<Landing />} />
          <Route path='/login' element={<LoginPage />}/>
          <Route path='/register' element={<RegistrationPage />}/> */}
          {/* <Route path='/activity' element={<ActivityPage />}/> */}
          {/* <Route path='/nutrition/*' element={<NutritionPage />}/> */}
        </Routes>
      </BrowserRouter>

    </div>
  )
}

export default App
