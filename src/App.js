import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Search from "./components/Search";
import Favourites from "./components/Favourites";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <hr
          style={{
            height: 2
          }}
        />
        <Route exact path="/" component={Search} />
        <Route exact path="/favourites" component={Favourites} />

        <Footer />
      </div>
    </Router>
  );
}

export default App;
