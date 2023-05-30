import React, { Component } from 'react';
import "./Main.scss"
import Hero from "./Hero";
import Product from "./Product";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";

export default class Home extends Component {
    static displayName = Home.name;
   



  render() {
    return (
      <main>
            <Hero />
            <Product />
            <Footer />
      </main>
    );
  }
}
