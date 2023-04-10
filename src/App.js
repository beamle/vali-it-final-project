import './App.css';
import React, {useEffect, useState} from "react";
import Navigation from "./components/header/Navigation";
import SortedFirms from "./components/body/main-page/SortedFirms";
import GetLocalGeolocation from "./components/getLocalGeolocation";

//test
function App() {

  return (
    <div className="App">
        <Navigation/>
        <GetLocalGeolocation/>
        <SortedFirms/>
    </div>
  );
}

export default App;
