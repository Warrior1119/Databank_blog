import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { NavBar } from 'app/components/NavBar';
import styled from 'styled-components/macro';
import { PageWrapper } from 'app/components/PageWrapper';
import { PageContent } from 'app/components/PageContent';
import { PageTitle } from 'app/components/PageTitle';
import { FormInput } from 'app/components/FormInput';
import { FormLabel } from 'app/components/FormLabel';
import { Button } from 'app/components/Button';
import { selectError } from './slice/selectors';
import { useRegisterSlice } from './slice';
import { useDispatch, useSelector } from 'react-redux';
import { RegisterErrorType } from './slice/types';

export function RegisterPage({ history }) {
  const { actions } = useRegisterSlice();
  const error = useSelector(selectError);
  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = () => {
    dispatch(actions.register({ history, form: { name, email, password } }));
  };

  return (
    <>
      <Helmet>
        <title>Register</title>
        <meta name="description" content="Register New User" />
      </Helmet>
      <NavBar />
      <PageWrapper>
        <PageContent>
          <PageTitle>Register</PageTitle>

          <Form>
            {error && <Error>{errorMessage(error)}</Error>}

            <FormLabel>Name</FormLabel>
            <FormInput onChange={e => setName(e.target.value)} />

            <FormLabel>Email</FormLabel>
            <FormInput type="email" onChange={e => setEmail(e.target.value)} />

            <FormLabel>Password</FormLabel>
            <FormInput
              type="password"
              onChange={e => setPassword(e.target.value)}
            />

            <Button onClick={onSubmit}>Register</Button>
          </Form>
        </PageContent>
      </PageWrapper>
    </>
  );
}

function errorMessage(error) {
  if (error === RegisterErrorType.RESPONSE_ERROR) {
    return 'Server response error';
  } else if (error === RegisterErrorType.DUPLICATE_EMAIL) {
    return 'Email already in use';
  }
  return 'Error occurred';
}

const Error = styled.div`
  color: ${p => p.theme.textError};
  font-size: 0.95rem;
  background: ${p => p.theme.backgroundError};
  padding: 10px 10px;
  margin-bottom: 10px;
  text-align: center;
`;

const Form = styled.div`
  width: 400px;
  margin: auto;

  ${Button} {
    margin-top: 20px;
    width: 100%;
    padding: 10px 0;
  }
`;
