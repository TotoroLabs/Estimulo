import React from "react";
import Routes from "./routes";
import Footer from './Components/Footer'
import 'dotenv';
import "./App.scss";

function App() {
  return (
    <div className="App">
      <Routes />
      <Footer/>
    </div>
  );
}

export default App;
