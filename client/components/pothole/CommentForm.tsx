import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import moment from 'moment';

interface Comment {
  name: string;
  text: string;
  time: string | number;
  pfp: string
}

interface User {
  name: string;
  photo: string;
}

type CommentFormArgs = {
  phId: number;
}

const CommentForm = ({ phId }: CommentFormArgs) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [user, setUser] = useState<User>({
    name: '',
    photo: ''
  });

  // handle submitting a new comment
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const newComment: Comment = {
      name: user.name,
      text: inputValue,
      time: new Date().toISOString(),
      pfp: user.photo
    };

    const reqArr: [string, number] = [newComment.text, phId]
    axios.post('/api/comments/add', reqArr)
      .catch(err => console.error(err))

    setComments([newComment, ...comments]);
    setInputValue('');
  }

  const getCommentForPh = () => {
    const potholeId: number = phId
    axios.get('/api/comments/perPh', { params: { potholeId } })
      .then(data => {
        setComments(data.data.reverse().map(each => {
          const eachC: Comment = {
            name: each.User.name,
            text: each.text,
            time: each.createdAt,
            pfp: each.User.photo,
          }
          return eachC
        }))
      })
      .catch(data => console.log(data))
  }

  const getUser = () => {
    axios.get('/api/user/me')
      .then(data => {
        setUser({
          name: data.data.name,
          photo: data.data.photo
        })
      })
  }

  useEffect(() => {
    getCommentForPh()
    getUser()
  }, [])

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
      {comments.map(renderComment => {
        return (
          <div key={renderComment.time}>
            <img src={renderComment.pfp} alt='pfp' width={'30px'} />
            <b>{renderComment.name}:</b> <h6>{renderComment.text}</h6>
            <p>{moment(renderComment.time).format('MMMM Do YYYY, h:mm a')}</p>
          </div>
        )
      })}
    </div>
  );
}

export default CommentForm;
