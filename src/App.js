import React from "react";
import logo from "./logo.svg";
import { Counter } from "./features/counter/Counter";
import "./App.css";
import Navbar from "./components/Navbar";
import TodoList from "./components/TodoList";
import Footer from "./components/Footer";


function App() {
  return (
    <div className="App mb-20">
      <Navbar />
      <TodoList />
      <Footer />
    </div>
  );
}

export default App;
