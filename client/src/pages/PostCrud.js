

export function Delete(id){
  return fetch(`/posts/${id}`, {
    method: "DELETE",
  
  }).then((res)=>res.json())
}

