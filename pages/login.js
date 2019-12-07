import { useReducer, useEffect } from 'react';
import { Button, Form, Icon, Message, Segment } from 'semantic-ui-react';
import Link from 'next/link';
import catchErrors from '../utils/catchErrors';
import baseUrl from '../utils/baseUrl';
import axios from 'axios';
import { handleLogin } from '../utils/auth';

const initialState = {
  email: '',
  password: '',
  disabled: true,
  loading: false,
  error: ''
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'EMAIL':
      return { ...state, email: action.payload };
    case 'PASSWORD':
      return { ...state, password: action.payload };
    case 'DISABLED':
      return { ...state, disabled: !action.payload };
    case 'LOADING':
      return { ...state, loading: true, error: '' };
    case 'END':
      return { ...state, loading: false };
    case 'ERROR':
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

function Login() {
  const [formState, dispatch] = useReducer(reducer, initialState);
  const { error, loading, email, password, disabled } = formState;

  const handleChange = e => {
    dispatch({ type: e.target.name.toUpperCase(), payload: e.target.value });
  };

  useEffect(() => {
    let isUser = false;
    if (email && password) {
      isUser = true;
    }
    dispatch({ type: 'DISABLED', payload: isUser });
  }, [email, password]);

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      dispatch({ type: 'LOADING' });
      const url = `${baseUrl}/api/login`;
      const payload = { email, password };
      //make a request
      const response = await axios.post(url, payload);
      handleLogin(response);
    } catch (err) {
      catchErrors(err, error => {
        dispatch({ type: 'ERROR', payload: error });
      });
    } finally {
      dispatch({ type: 'END' });
    }
  };

  return (
    <>
      <Message
        attached
        icon='privacy'
        header='Welcome Back!'
        content='Log in wht email and password'
        color='blue'
      />
      <Form error={Boolean(error)} loading={loading} onSubmit={handleSubmit}>
        <Message error header='Oops!' content={error} />
        <Segment>
          <Form.Input
            fluid
            icon='envelope'
            iconPosition='left'
            label='Email'
            placeholder='Email'
            name='email'
            onChange={handleChange}
            value={email}
            type='email'
          />
          <Form.Input
            fluid
            icon='lock'
            iconPosition='left'
            label='Password'
            placeholder='Password'
            name='password'
            type='password'
            onChange={handleChange}
            value={password}
          />
          <Button
            disabled={disabled || loading}
            icon='sign in'
            type='submit'
            color='orange'
            content='Login'
          />
        </Segment>
      </Form>
      <Message attached='bottom' warning>
        <Icon name='help' />
        New user?{' '}
        <Link href='/signun'>
          <a>Sign up here</a>
        </Link>{' '}
        instead.
      </Message>
    </>
  );
}

export default Login;
