import React from "react";

import CommentCard from "./CommentCard";
import { Row, Container } from "reactstrap";

function CommentList({ postId, comments }) {
  //  const comments = useSelector(store => store.comments[postId], shallowEqual);

  return (
    <div className="CommentList mt-4">
      <h5>Comments</h5>
      {comments ?
        <Container>
          {comments.map(comment => (
            <Row className="my-2">
              <CommentCard comment={comment} key={comment.id} postId={postId} />
            </Row>
          ))}
        </Container>
        :
        <p>No comments yet :(</p>
      }
    </div>
  );
}

export default CommentList;






















