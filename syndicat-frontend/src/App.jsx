import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {Route, Routes} from "react-router-dom";
import Login from "./components/Login.jsx";
import Home from "./containers/Home.jsx";
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer} from "react-toastify";

function App() {

  return (
      <>
          <ToastContainer />
          <Routes>
              {/*<Route path="login" element={<Login/>}/>*/}
              <Route path="/*" element={<Home/>}/>
          </Routes>
      </>
  )
}

export default App
