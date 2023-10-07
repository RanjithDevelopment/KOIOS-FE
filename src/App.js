import React from "react";
import {Routes,Route} from 'react-router-dom';
import Signup from "./components/Signup";
function App() {
  return (
    <div className="App" >
      <Routes>
           <Route path="/" element={<Signup/>} />
      </Routes>
    </div>
  );
}

export default App;
