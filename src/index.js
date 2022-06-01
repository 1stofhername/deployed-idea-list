import React from "react";
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import "./assets/css/index.css";
import './assets/css/mobile.css';
import App from "./components/App";

const container = document.getElementById('root');
const root = createRoot(container);

root.render(<BrowserRouter><App tab="home" /></BrowserRouter>);
// ReactDOM.render(<BrowserRouter><App /></BrowserRouter>, document.getElementById("root"));