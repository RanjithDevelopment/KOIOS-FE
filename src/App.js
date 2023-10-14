import React from "react";
import {Routes,Route} from 'react-router-dom';
import Signup from "./components/Signup";
import Table from "./components/Table";
function App() {
  return (
    <div className="App" >
      <Routes>
           <Route path="/" element={<Signup/>} />
           <Route path="/table" element={<Table/>}/> 
      </Routes>
    </div>
  );
}

export default App;
