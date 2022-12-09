
import styled from "styled-components";
import { Button } from "../styles/Index";

function PostItem({post, onUpdatedPost, onDeletedPost}){
    const {id, image_url,title, description} = post

    function handleDeletePost() {
        fetch(`/spices/${id}`, {
          method: "DELETE",
        }).then((r) => {
          if (r.ok) {
            onDeletedPost(post);
          }
        });
      }

      return(
        <div className="post-item card">
     
      <div className="details">
        <h2>{title}</h2>
        <img className='post-image' src={image_url} alt='post' />
        <p>{description}</p>
        
        
        <p>
          <Button type="button" onClick={handleDeletePost}>Delete Post</Button>
        </p>
      </div>
    </div>
  );
}

export default PostItem;


      

