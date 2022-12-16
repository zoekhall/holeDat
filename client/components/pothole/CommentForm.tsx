import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

interface Comment {
  id: number;
  name: string;
  text: string;
}

const CommentForm: React.FC = () => {
  // Use state to store the list of comments and a form input value
  const [comments, setComments] = useState<Comment[]>([]);
  const [inputValue, setInputValue] = useState('');



  // handle submitting a new comment
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    // new comment object with the input value and a unique id
    const newComment: Comment = {
      id: Date.now(),
      name: 'Username',
      text: inputValue,
    };
    // Add the new comment to the list of comments and reset the input value
    setComments([newComment, ...comments]);
    setInputValue('');
  }

  // render a comment
  const renderComment = (comment: Comment) => {
    return (
      <div key={comment.id}>
        <strong>{comment.name}</strong>: <p>{comment.text}</p>
      </div>
    )
  }

  return (
    <div>
      <Form
        className='post_commentBox'
        onSubmit={handleSubmit}>
        <input className='post_input'
          placeholder='Add Comment'
          type="text"
          value={inputValue}
          onChange={event => setInputValue(event.target.value)}
        />
      <Button
        className='post_button'
        variant='outlined-dark'
        type="submit">
        Post
      </Button>
      </Form>
      {comments.map(renderComment)}
    </div>
  );
}


export default CommentForm;
