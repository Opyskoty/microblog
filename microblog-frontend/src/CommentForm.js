import React, { useState } from 'react';
import { Form, Input, Button, FormGroup } from "reactstrap";
import { sendCommentToApi } from "./actions";
import { useDispatch } from "react-redux";

function CommentForm({ postId }) {
  const dispatch = useDispatch();
  const [text, setText] = useState("");

  const handleChange = evt => {
    const { value } = evt.target;
    setText(value);
  }

  const handleSubmit = evt => {
    evt.preventDefault();
    dispatch(sendCommentToApi(postId, text));
    setText("")
  }

  return (
    <div className="CommentForm mt-4">
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Input placeholder="Add a new comment" type="text" name="text" id="text" value={text} onChange={handleChange} />
        </FormGroup>
        <Button color="primary">Save</Button>
      </Form>
    </div>
  );
}

export default CommentForm;