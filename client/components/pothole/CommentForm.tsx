import React, { useState } from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const CommentForm = () => {

  const [comment, setComment] = useState<string>('');

  const postComment = (event) => {

  }

  return <div className="comment_form">
    <Form className="post_commentBox">
      <input
        className="post_input"
        type="text"
        placeholder="Add a comment..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <Button
        className="post_button"
        variant='outlined-dark'
        disabled={!comment}
        type="submit"
        onClick={postComment}
      > Post
      </Button>
    </Form>
  </div>;
}

export default CommentForm;