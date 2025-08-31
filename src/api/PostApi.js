import axios from "axios";

const api = axios.create({
    baseURL : "https://jsonplaceholder.typicode.com"
})

//get post data
export const getPost = ()=>{
    return api.get("/posts");
}

//delete post data
export const deletePost = (id)=>{
    return api.delete(`/posts/${id}`)
}

//post data
export const addPost = (post)=>{
    return api.post("/posts", post)
}


export const updatePost = (id, post) => {
    return api.put(`/posts/${id}`, post);
}
