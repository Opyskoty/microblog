import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardFooter,
  Button,
  Col
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons';
import { sendVotesToApi } from "./actions"

function BlogCard({ post }) {
  const dispatch = useDispatch();
  const title = useSelector(state => state.titles.find(title => title.id === post.id));

  const vote = (id, dir) => {
    dispatch(sendVotesToApi(id, dir));
  }

  return (
    <Col sm="6">
      <Card className="BlogCard mb-3">
        <CardBody>
          <CardTitle><Link to={`/posts/${post.id}`}><h3>{post.title}</h3></Link></CardTitle>
          <CardSubtitle>{post.description}</CardSubtitle>
        </CardBody>
        <CardFooter>
          <p>{title.votes} votes</p>
          <Button color="success" className="mr-2" onClick={() => vote(post.id, "up")}><FontAwesomeIcon icon={faThumbsUp} /></Button>
          <Button color="danger" onClick={() => vote(post.id, "down")}><FontAwesomeIcon icon={faThumbsDown} /></Button>
        </CardFooter>
      </Card>
    </Col>
  )
}

export default BlogCard;