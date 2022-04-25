import React from "react";
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import "./assets/css/brooke.css";
import App from "./components/App";

const container = document.getElementById('root');
const root = createRoot(container);

root.render(<App tab="home" />);
// ReactDOM.render(<BrowserRouter><App /></BrowserRouter>, document.getElementById("root"));