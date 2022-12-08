import React, { useEffect, useState } from "react";
import Login from "./components/Login";
import NavBar from "./components/NavBar";
import {BrowserRouter as Router} from 'react-router-dom';

function App (){
  const [user, setUser] = useState(null)


  useEffect(()=>{
    //auto-login
    fetch("/me").then((r)=>{
      if(r.ok){
        r.json().then((user)=>setUser(user))
      }
    });
  },[]);

  if (!user) return <Login onLogin={setUser} />;

  return(
    <div>
      <Router>
      <NavBar user={user} setUser={setUser}/>
     <Login/>
     </Router>
    </div>
  )

}

export default App;