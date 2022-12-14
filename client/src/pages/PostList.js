 
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { Link } from "react-router-dom";

import styled from "styled-components";
import { Box, Button } from "../styles/Index";
import {Delete} from "./PostCrud";

 function PostList(){
    const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("/posts")
      .then((r) => r.json())
      .then(setPosts);
  }, []);

  console.log(setPosts);
  console.log("posts",posts)

  function onDelete(id) {
    Delete(id).then(resp => {
      const index = posts.findIndex(r => r.id === id);
      console.log(index)
      let latestUpdate = [...posts];
      latestUpdate.splice(index, 1);
      setPosts(latestUpdate);
    })
  }  

  

  
  return (
    <Wrapper>
      {posts.length > 0 ? (
        posts.map((post) => (
          <Post key={post.id}>
            <Box>
               
              <h2>{post.title}</h2>
              <img className='post-image' src={post.image_url} alt='post' />
              <ReactMarkdown>{post.description}</ReactMarkdown>
              <Button type="button" color="primary" onClick={() =>onDelete(post.id)} >Delete Post</Button>
              
            </Box>
            
          </Post>
        ))
      ) : (
        <>
          <h2>No Posts Found</h2>
          <Button as={Link} to="/new">
            Make a New Post
          </Button>
        </>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.section`
  max-width: 800px;
  margin: 40px auto;
  
`;

const Post = styled.article`
 margin-bottom: 24px;
  
`;
    
  
 

 export default PostList;