import React, { useEffect, useState } from "react";
import NavBar from "./components/NavBar";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Login from "./pages/Login";
import NewPost from "./pages/NewPost";
import PostList from "./pages/PostList";
import footer from "./components/footer";

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
    <div className="container">
     
      <main>
        <Router>
        <NavBar user={user} setUser={setUser} />
          <Routes>
          <Route exact path="/new" element={<NewPost user={user} />}/>
          <Route exact path="/" element={<PostList />} />
        
          </Routes>
        </Router>
      </main>
    </div>
  );
}

export default App;