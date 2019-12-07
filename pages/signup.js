import { useReducer, useEffect } from 'react';
import { Button, Form, Icon, Message, Segment } from 'semantic-ui-react';
import Link from 'next/link';
import catchErrors from '../utils/catchErrors';

const initialState = {
  name: '',
  email: '',
  password: '',
  disabled: true,
  loading: false,
  error: ''
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'NAME':
      return { ...state, name: action.payload };
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

function Signup() {
  const [formState, dispatch] = useReducer(reducer, initialState);
  const { error, loading, name, email, password, disabled } = formState;

  const handleChange = e => {
    dispatch({ type: e.target.name.toUpperCase(), payload: e.target.value });
  };

  useEffect(() => {
    let isUser = false;
    if (name && email && password) {
      isUser = true;
    }
    dispatch({ type: 'DISABLED', payload: isUser });
  }, [name, email, password]);

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      dispatch({ type: 'LOADING' });
      console.log(formState);
      //make a request
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
        icon='setting'
        header='Get Started!'
        content='Create a new account'
        color='teal'
      />
      <Form error={Boolean(error)} loading={loading} onSubmit={handleSubmit}>
        <Message error header='Oops!' content={error} />
        <Segment>
          <Form.Input
            fluid
            icon='user'
            iconPosition='left'
            label='Name'
            placeholder='Name'
            name='name'
            onChange={handleChange}
            value={name}
          />
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
            icon='signup'
            type='submit'
            color='orange'
            content='Signup'
          />
        </Segment>
      </Form>
      <Message attached='bottom' warning>
        <Icon name='help' />
        Existing user?{' '}
        <Link href='/login'>
          <a>Login in here</a>
        </Link>{' '}
        instead.
      </Message>
    </>
  );
}

export default Signup;
