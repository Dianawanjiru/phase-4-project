

export function Delete(id){
	return fetch(`/products/${id}` ,{
		method : "DELETE",
	}).then((resp) => resp.json()) 
}

