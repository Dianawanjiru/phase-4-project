import React, {useState} from "react";
import {  useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import styled from "styled-components";
import { Button, Error, FormField, Input, Label, Textarea } from "../styles/Index";

function NewRecipe({user}){
    const [title, setTitle] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [description, setDescription] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState([]);
    const navigate = useNavigate();

    function handleSubmit(e){
        e.preventDefault();
        setIsLoading(true);
        fetch("/posts", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                title,
                image_url: imageUrl,
                description,
                user_id,
            }),

        }).then((r)=>{
            if (r.ok){
                navigate("/")
            }

            else {
                r.json().then((err) => setErrors(err.errors));
            }
        })
    }



return(
    
    <Wrapper>
    <WrapperChild>
      <h2>Create New Post</h2>
      <form onSubmit={handleSubmit}>
        <FormField>
          <Label htmlFor="title">Title</Label>
          <Input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </FormField>
        <FormField>
          <Label htmlFor="imageUrl">Image</Label>
          <Input
            type="text"
            id="imageUrl"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
        </FormField>
        <FormField>
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            rows="20"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </FormField>
        <FormField>
          <Button color="primary" type="submit">
            {isLoading ? "Loading..." : "Submit Post"}
          </Button>
        </FormField>
        <FormField>
          {errors.map((err) => (
            <Error key={err}>{err}</Error>
          ))}
        </FormField>
      </form>
    </WrapperChild>
    <WrapperChild>
      <h1>{title}</h1>
      
        <p>
            <em>Image: {post.image_url}</em>
            &nbsp;·&nbsp;
            <cite>By {user.username}</cite>
        </p>
      
      <ReactMarkdown>{description}</ReactMarkdown>
    </WrapperChild>
  </Wrapper>
);
}

const Wrapper = styled.section`
max-width: 1000px;
margin: 40px auto;
padding: 16px;
display: flex;
gap: 24px;
`;

const WrapperChild = styled.div`
flex: 1;
`;


export default NewRecipe;