//import logo from './logo.svg';
import './App.css';
import React, { Fragment } from "react";
import { Route, Routes} from "react-router-dom"

import Header from './Components/Header';
import Footer from './Components/Footer';
import Home from './Pages/Home';
import Signup from './Pages/Signup';
import Woman from './Pages/Woman';


function App() {
  return (
    <Fragment>
      <Header />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="signup" element={<Signup />} />
          <Route exact path="woman" element={<Woman>woman</Woman>} />
          <Route exact path="man" element={<Woman>man</Woman>} />
          <Route exact path="child" element={<Woman>child</Woman>} />
      </Routes>
      <Footer />
    </Fragment>









    //<div className="App">
    //  <header className="App-header">
    //    <img src={logo} className="App-logo" alt="logo" />
    //    <p>
    //      Edit <code>src/App.js</code> and save to reload.
    //    </p>
    //    <a
    //      className="App-link"
    //      href="https://reactjs.org"
    //      target="_blank"
    //      rel="noopener noreferrer"
    //    >
    //      Learn React
    //    </a>
    //  </header>
    //</div>
  );
}

export default App;
