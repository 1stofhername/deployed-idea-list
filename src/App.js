import logo from './logo.svg';
import { useEffect } from 'react';
import './App.css';

function App() {

  useEffect (()=>{
    fetch('https://json-server-heroku-hosting-2.herokuapp.com/notes')
    .then(res=>res.json())
    .then(data=>console.log(data));
  });

  return (
    <div className="App">
     <h1>Hi I use a JSON server on Heroku!</h1>
    </div>
  );
}

export default App;
