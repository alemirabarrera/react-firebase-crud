import React from 'react';
import './App.css'; 
import Links from './components/Links' 
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  return (
    <div className="container">
      
      <Links/>
      <ToastContainer/>        
    </div>
  );
}

export default App;

