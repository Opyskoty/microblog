import React, { useState } from "react";
import { Form, Input, Button, FormGroup } from "reactstrap";
import { removeCommentFromApi, updateCommentToApi } from "./actions";
import { useDispatch } from "react-redux";

function CommentCard({ comment, postId }) {
  const [edit, setEdit] = useState(false);
  const [text, setText] = useState(comment.text);
  const dispatch = useDispatch();

  const handleDelete = (commentId) => {
    if (window.confirm("Are you sure you want to delete?")) {
      dispatch(removeCommentFromApi(postId, commentId));
    }
  };

  const handleChange = (evt) => {
    const { value } = evt.target;
    setText(value);
  };

  const handleEdit = (evt) => {
    evt.preventDefault();
    dispatch(updateCommentToApi(postId, comment.id, text));
    setEdit(false);
    setText("");
  };

  return (
    <div className="CommentCard">
      {edit ? (
        <Form onSubmit={handleEdit}>
          <FormGroup>
            <Input
              type="text"
              name="text"
              id="text"
              value={text}
              onChange={handleChange}
            />
          </FormGroup>
          <Button color="primary">Update</Button>
        </Form>
      ) : (
        <p>
          <Button color="danger" onClick={() => handleDelete(comment.id)}>
            X
          </Button>
          <Button color="info" onClick={() => setEdit(true)}>
            Edit
          </Button>
          {comment.text}
        </p>
      )}
    </div>
  );
}

export default CommentCard;
