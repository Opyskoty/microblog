import React, { useEffect } from 'react'
import BlogCard from "./BlogCard"
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import { loadPostsFromApi } from "./actions";
import { Row, Col } from "reactstrap";

function BlogList() {
  const { titles } = useSelector((store) => store, shallowEqual);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadPostsFromApi())
  }, [dispatch]);

  return (
    <div className="BlogList">
      <Row>
        <Col>
          <p className="mb-4">Welcome to <b>Microblog</b>, Olivia, Marco and Harry's safe space for expressing your feelings :)</p>
        </Col>
      </Row>
      <Row>
        {titles.sort((a, b) => b.votes - a.votes).map(post => (
          <BlogCard post={post} key={post.id} />
        ))}
      </Row>
    </div>
  )
}

export default BlogList;