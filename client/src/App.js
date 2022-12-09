import React, { useEffect, useState } from "react";
import NavBar from "./components/NavBar";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Login from "./pages/Login";
import NewPost from "./pages/NewPost";
import PostList from "./pages/PostList";
import Footer from "./components/Footer";
import PostItem from "./pages/PostItem";

function App (){
  const [user, setUser] = useState(null)

  const [posts, setPosts] = useState{[]}

  

  useEffect(()=>{
    //auto-login
    fetch("/me").then((r)=>{
      if(r.ok){
        r.json().then((user)=>setUser(user))
      }
    });
  },[]);

    useEffect(()=>{
      fetch("/posts")
      .then((r)=>r.json())
      .then(setPosts)
    },[]);

    function handleUpdatePost(updatedPost) {
      setPosts((posts) =>
        posts.map((post) => {
          return post.id === updatedPost.id ? updatedPost : post;
        })
      );
    }

    function handleDeletePost(deletedPost) {
      setPosts((posts) =>
        posts.filter((post) => post.id !== deletedPost.id)
      );
    }

  if (!user) return <Login onLogin={setUser} />;

  return(
    <div className="container">
     
      <main>
        <Router>
        <NavBar user={user} setUser={setUser} />
          <Routes>
          <Route exact path="/new" element={<NewPost user={user} onDelete={handleDelete}/>}/>
          <Route exact path="/" element={<PostList />} />
          </Routes>
        </Router>
        <section className="spice-list">
          {spices.map((post) => (
            <PostItem
              key={post.id}
              post={post}
              onUpdatePost={handleUpdatePost}
              onDeletePost={handleDeletePost}
            />
          ))}
        </section>
      </main>
      <Footer/>
    </div>
  );
}

export default App;