import './App.css'
import Header from "./components/Header";
import Footer from "./components/Footer";
import Content from "./components/Content";
import React from 'react';
import { Container } from 'react-bootstrap'



function App() {
  return (
    <>
      <Container>
        <section className="todoapp container">
          <Header/>
          <Content/>
        </section>
        <Footer/>
      </Container>
    </>
  );
}

export default App;
