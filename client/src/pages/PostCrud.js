

export function Delete(id){
	return fetch(`/posts/${id}` ,{
		method : "DELETE",
	}).then((resp) => resp.json()) 
}

