 
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import styled from "styled-components";
import { Box, Button } from "../styles";

 function PostList(){
    const [posts, setposts] = useState([]);

  useEffect(() => {
    fetch("/posts")
      .then((r) => r.json())
      .then(setposts);
  }, []);

  return (
    <Wrapper>
      {posts.length > 0 ? (
        posts.map((post) => (
          <Post key={post.id}>
            <Box>
              <h2>{post.title}</h2>
              <p>
                <em>Image: {post.image_url}</em>
                &nbsp;·&nbsp;
                <cite>By {post.user.username}</cite>
              </p>
              <ReactMarkdown>{post.description}</ReactMarkdown>
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