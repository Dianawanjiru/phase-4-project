import React, { useEffect, useState } from "react";
import Login from "./components/LoginForm";
import NavBar from "./components/NavBar";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import NewPost from "./pages/NewPost";
import PostList from "./pages/PostList";

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
      <NavBar user={user} setUser={setUser}/>
      <Router>
        <Routes>
      <Route path="/new">
        <NewPost/>

      </Route>
      <Route path="/">
        <PostList/>
      </Route>
      
      <Login/>
      </Routes>
     </Router>
    </div>
  )

}

export default App;