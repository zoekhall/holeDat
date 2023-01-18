import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import moment from 'moment';
import User from '../user/User';
import Button from 'react-bootstrap/esm/Button';
import Container from 'react-bootstrap/Container';

interface Comment {
  name: string;
  text: string;
  time: string | number;
  pfp: string;
  userId_com: number | undefined;
  com_id: number;
}

interface User {
  name: string;
  photo: string;
  userId_user: number | undefined;
}

type CommentFormArgs = {
  phId: number;
};

const CommentForm = ({ phId }: CommentFormArgs) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [user, setUser] = useState<User>({
    name: '',
    photo: '',
    userId_user: undefined,
  });

  // handle submitting a new comment
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const newComment: Comment = {
      name: user.name,
      text: inputValue,
      time: new Date().toISOString(),
      pfp: user.photo,
      userId_com: user.userId_user,
      com_id: 0,
    };

    const reqArr: [string, number] = [newComment.text.trim(), phId];
    if (inputValue.trim().length >= 1) {
      axios
        .post('/api/comments/add', reqArr)
        .then(({ data }) => {
          const resCom: Comment = {
            name: user.name,
            text: data.text,
            time: new Date().toISOString(),
            pfp: user.photo,
            userId_com: user.userId_user,
            com_id: data.comment_id,
          };
          setComments([resCom, ...comments]);
        })
        .catch((err) => console.error(err));
      setInputValue('');
    }
  };

  // will need to add comId here for each comment
  const getCommentForPh = () => {
    const potholeId: number = phId;
    axios
      .get('/api/comments/perPh', { params: { potholeId } })
      .then((data) => {
        setComments(
          data.data.reverse().map((each) => {
            const eachC: Comment = {
              name: each.User.name,
              text: each.text,
              time: each.createdAt,
              pfp: each.User.photo,
              userId_com: each.User.user_id,
              com_id: each.comment_id,
            };
            return eachC;
          })
        );
      })
      .catch((data) => console.log(data));
  };

  const getUser = () => {
    axios.get('/api/user/me').then((data) => {
      setUser({
        name: data.data.name,
        photo: data.data.photo,
        userId_user: data.data.user_id,
      });
    });
  };

  const handleDelete = (id: number) => {
    axios.delete('/api/comments', { params: { id } }).then(() => {
      const deletedComments: Comment[] = comments.filter((each) => each.com_id !== id);
      setComments(deletedComments);
    });
  };

  useEffect(() => {
    getCommentForPh();
    getUser();
  }, []);

  return (
    (user?.name || comments.length) ?
      <Container className='comment-container'>
        <div >
          {user?.name && (
            <Form className='post_commentBox' onSubmit={handleSubmit}>
              <Form.Control
                as='textarea'
                rows={1}
                className='post_input'
                maxLength={255}
                placeholder='Add Comment'
                type='text'
                value={inputValue}
                onChange={(event) => setInputValue(event.target.value)}
              />
              <Button className='basicButton' id='postButton' type='submit'>
                Post
              </Button>
            </Form>
          )}
          {comments.map((renderComment) => {
            return (
              <div className='comment' key={renderComment.com_id}>
                <img className='avatar-comment' src={renderComment.pfp} alt='pfp' />
                <div className='comment-info'>
                  <div className='targetSpecific'>
                    {user.userId_user === renderComment.userId_com && (
                      <Button
                        onClick={() => handleDelete(renderComment.com_id)}
                        className='basicButton'
                        type='submit'
                      >
                        X
                      </Button>
                    )}
                    <h3>{renderComment.name}</h3>

                  </div>
                  <p>{renderComment.text}</p>
                  <p className='time-comment'>
                    {moment(renderComment.time).format('MMMM Do YYYY, h:mm a')}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </Container >
      : <></>
  );
};

export default CommentForm;
