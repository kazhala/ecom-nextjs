import { useReducer } from 'react';
import { Button, Form, Icon, Message, Segment } from 'semantic-ui-react';
import Link from 'next/link';

const initialState = {
  name: '',
  email: '',
  password: ''
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'NAME':
      return { ...state, name: action.payload };
    case 'EMAIL':
      return { ...state, email: action.payload };
    case 'PASSWORD':
      return { ...state, password: action.payload };
    default:
      return state;
  }
};

function Signup() {
  const [formState, dispatch] = useReducer(reducer, initialState);
  const { name, email, password } = formState;

  const handleChange = e => {
    dispatch({ type: e.target.name.toUpperCase(), payload: e.target.value });
  };

  return (
    <>
      <Message
        attached
        icon='setting'
        header='Get Started!'
        content='Create a new accoutn'
        color='teal'
      />
      <Form>
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
          <Button icon='signup' type='submit' color='orange' content='Signup' />
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
