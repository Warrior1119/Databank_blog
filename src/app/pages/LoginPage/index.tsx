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
import { useLoginSlice } from './slice';
import { useDispatch, useSelector } from 'react-redux';
import { LoginErrorType } from './slice/types';

export function LoginPage({ history }) {
  const { actions } = useLoginSlice();
  const error = useSelector(selectError);
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = () => {
    dispatch(actions.login({ history, form: { email, password } }));
  };

  return (
    <>
      <Helmet>
        <title>Login</title>
        <meta name="description" content="Login User" />
      </Helmet>
      <NavBar />
      <PageWrapper>
        <PageContent>
          <PageTitle>Login</PageTitle>

          <Form>
            {error && <Error>{errorMessage(error)}</Error>}

            <FormLabel>Email</FormLabel>
            <FormInput onChange={e => setEmail(e.target.value)} />

            <FormLabel>Password</FormLabel>
            <FormInput
              type="password"
              onChange={e => setPassword(e.target.value)}
            />

            <Button onClick={onSubmit}>Login</Button>
          </Form>
        </PageContent>
      </PageWrapper>
    </>
  );
}

function errorMessage(error) {
  if (error === LoginErrorType.RESPONSE_ERROR) {
    return 'Server response error';
  } else if (error === LoginErrorType.INVALID_PASSWORD) {
    return 'Invalid email or password';
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
