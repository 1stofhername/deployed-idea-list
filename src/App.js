import logo from './logo.svg';
import { useEffect, useState } from 'react';
import './App.css';

function App() {

const [data, setData]= useState([]);

  useEffect (()=>{
    fetch('https://json-server-heroku-hosting-2.herokuapp.com/notes')
    .then(res=>res.json())
    .then(data=>setData(data));
  },[]);

  console.log(data)

  function handleAddHello(){
    fetch('https://json-server-heroku-hosting-2.herokuapp.com/notes', {
      method: 'POST',
      body: JSON.stringify({
        userId: 1, 
        title:'hello',
        body:"hello",
        tags:"nothing"
      }),
      headers: {
        "Content-type": "application/json"
      }
  })
  .then(res=> res.json())
  .then(data=>console.log(data))
}
  // .then(data=>tasks.push(data));

  return (
    <div className="App">
     <h1>Hi I use a JSON server on Heroku!</h1>
     <button onClick={()=>handleAddHello()}>Add "Hello"</button>
     
    </div>
  );
}

export default App;
