import React from 'react';
import logo from './logo.svg';
import './App.css';
import SignUp from "./Components/Signup";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
} from "react-router-dom";
const App: React.FC = () =>{

  return (
    <div className="App">    
  <SignUp /> 
    </div>
  );
}

export default App;
