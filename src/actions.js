import { LOAD_POSTS, LOAD_POST, EDIT_POST, ADD_POST, REMOVE_POST, ADD_COMMENT, REMOVE_COMMENT, UPDATE_POST } from "./actionTypes";
import axios from "axios";

export function loadPostsFromApi() {
  return async function (dispatch) {
    let res = await axios.get('http://localhost:5000/api/posts');
    dispatch(loadedPosts(res.data));
  };
}

function loadedPosts(posts) {
  return {
    type: LOAD_POSTS,
    payload: posts,
  };
}

export function loadPostFromApi(postId) {
  return async function (dispatch) {
    let res = await axios.get(`http://localhost:5000/api/posts/${postId}`);
    dispatch(loadedPost(res.data));
  };
}

function loadedPost(post) {
  return {
    type: LOAD_POST,
    payload: post,
  };
}

export function savePostToApi(post) {
  return async function (dispatch) {
    let res = await axios.post("http://localhost:5000/api/posts/", { ...post });
    console.log("res=", res);
    dispatch(savedPost(res.data));
  };
}

export function savedPost(post) {
  return {
    type: ADD_POST,
    payload: post,
  };
}

export function updatePostToApi(post) {
  return async function (dispatch) {
    let res = await axios.put(`http://localhost:5000/api/posts/${post.id}`, { ...post });
    dispatch(updatedPost(res.data));
  };
}


export function updatedPost(post) {
  return {
    type: UPDATE_POST,
    payload: post,
  };
}

export function removePostFromApi(postId) {
  return async function (dispatch) {
    let res = await axios.delete(`http://localhost:5000/api/posts/${postId}`);
    dispatch(removedPost(postId));
  };
}

export function removedPost(postId) {
  return {
    type: REMOVE_POST,
    payload: postId,
  };
}

export function sendCommentToApi(postId, text) {
  return async function (dispatch) {
    let res = await axios.post(`http://localhost:5000/api/posts/${postId}/comments`, { text });
    dispatch(receivedComment(postId, res.data));
  };
}

export function receivedComment(postId, comment) {
  return {
    type: ADD_COMMENT,
    payload: { postId, comment }
  };
}

export function removeCommentFromApi(postId, commentId) {
  return async function (dispatch) {
    let res = await axios.delete(`http://localhost:5000/api/posts/${postId}/comments/${commentId}`);
    dispatch(removedComment(postId, commentId));
  };
}

export function removedComment(postId, commentId) {
  return {
    type: REMOVE_COMMENT,
    payload: { postId, commentId },
  };
}
