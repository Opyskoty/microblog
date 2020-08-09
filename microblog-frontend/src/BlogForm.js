import React, { useState } from "react";
import { useHistory } from "react-router-dom"
import { useDispatch } from "react-redux";
import { savePostToApi, updatePostToApi } from "./actions";
import { Form, Label, Input, Button, FormGroup } from "reactstrap";

const INITIAL_STATE = { title: "", description: "", body: "" }

function BlogForm({ post = false, id = false, setEdit }) {
  const [formData, setFormData] = useState(post || INITIAL_STATE);
  const history = useHistory();
  const dispatch = useDispatch();

  const handleSubmit = evt => {
    evt.preventDefault();
    if (id) {
      dispatch(updatePostToApi(formData));
      setEdit(false);
      history.push(`/posts/${id}`);
    } else {
      dispatch(savePostToApi(formData));
      history.push('/');
    }
    setFormData(INITIAL_STATE);
  }

  const handleChange = evt => {
    const { name, value } = evt.target;
    setFormData(fData => ({ ...fData, [name]: value }))
  }

  const handleCancel = evt => {
    // prompt user for confirmation
    if (window.confirm('Are you sure you want to cancel?')) {
      // on cancel, redirect to homepage
      history.push("/");
    }
  }

  //how do we handle cancel????
  return (
    <div className="BlogForm">
      <h3>New Post</h3>
      <Form onSubmit={handleSubmit}>
      <FormGroup>
        <Label for="category">Category</Label>
        <Input type="select" name="category" id="category" value={formData.category} onChange={handleChange}>
          <option>Cooking</option>
          <option>Fitness</option>
          <option>Books</option>
          <option>Tech</option>
          <option>Business</option>
        </Input>
      </FormGroup>
        <FormGroup>
          <Label for="title">Title</Label>
          <Input type="text" name="title" id="title" value={formData.title} onChange={handleChange} />
        </FormGroup>
        <FormGroup>
          <Label for="description">Description</Label>
          <Input type="text" name="description" id="description" value={formData.description} onChange={handleChange} />
        </FormGroup>
        <FormGroup>
          <Label for="body">Body</Label>
          <Input type="textarea" name="body" id="body" value={formData.body} onChange={handleChange} />
        </FormGroup>
        <Button color="primary">Save</Button>
        <Button onClick={handleCancel} color="danger">Cancel</Button>
      </Form>
    </div>
  )
}


export default BlogForm;