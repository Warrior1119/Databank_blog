import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { NavBar } from 'app/components/NavBar';
import styled from 'styled-components/macro';
import { PageWrapper } from 'app/components/PageWrapper';
import { PageContent } from 'app/components/PageContent';
import { PageTitle } from 'app/components/PageTitle';
import { FormInput } from 'app/components/FormInput';
import { FormLabel } from 'app/components/FormLabel';
import { Button } from 'app/components/Button';
import { selectError, selectSuccess } from './slice/selectors';
import { selectName, selectEmail, selectAvatar } from 'app/slices/selectors';
import { useProfileSlice } from './slice';
import { useDispatch, useSelector } from 'react-redux';
import { ProfileErrorType } from './slice/types';
import AvatarUploader from 'react-avatar-uploader';

export function ProfilePage({ history }) {
  const { actions } = useProfileSlice();
  const error = useSelector(selectError);
  const success = useSelector(selectSuccess);
  const dispatch = useDispatch();

  const authName = useSelector(selectName);
  const authEmail = useSelector(selectEmail);
  const authAvatar = useSelector(selectAvatar);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [avatar, setAvatar] = useState('');

  useEffect(() => {
    setName(authName || '');
    setEmail(authEmail || '');
    setAvatar(authAvatar || '');
  }, [authName, authAvatar, authEmail]);

  const onSubmit = () => {
    if (name.length === 0 || email.length === 0) {
      return;
    }
    dispatch(
      actions.updateProfile({
        history,
        form: { name, email, password, avatar },
      }),
    );
  };

  const onFinishFileUpload = (err, response) => {
    if (!err) {
      if (response.data) {
        const url = response.data.url;
        setAvatar(url);
      }
    }
  };

  return (
    <>
      <Helmet>
        <title>Profile</title>
        <meta name="description" content="Update your profile" />
      </Helmet>
      <NavBar />
      <PageWrapper>
        <PageContent>
          <PageTitle>Profile</PageTitle>

          <Form>
            {error && <Error>{errorMessage(error)}</Error>}
            {success && <Success>Profile updated successfully</Success>}
            <AvatarWrapper>
              <AvatarUploader
                size={150}
                name="avatar"
                uploadURL="http://localhost:3030/avatar"
                fileType={'image/*'}
                defaultImg={avatar}
                onFinished={onFinishFileUpload}
              />
            </AvatarWrapper>

            <FormLabel>Name</FormLabel>
            <FormInput value={name} onChange={e => setName(e.target.value)} />
            <FormLabel>Email</FormLabel>
            <FormInput
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            <FormLabel>
              Password{' '}
              <small>
                (You can leave blank if you don't want to change your password)
              </small>
            </FormLabel>
            <FormInput
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            <Button onClick={onSubmit}>Update Profile</Button>
          </Form>
        </PageContent>
      </PageWrapper>
    </>
  );
}

function errorMessage(error) {
  if (error === ProfileErrorType.RESPONSE_ERROR) {
    return 'Server response error';
  } else if (error === ProfileErrorType.DUPLICATE_EMAIL) {
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

const Success = styled.div`
  color: ${p => p.theme.textSuccess};
  font-size: 0.95rem;
  background: ${p => p.theme.backgroundSuccess};
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

const AvatarWrapper = styled.div`
  color: ${p => p.theme.textError};
  font-size: 0.95rem;
  /* background: ${p => p.theme.backgroundError}; */
  padding: 10px 10px;
  margin-bottom: 10px;
  text-align: center;
  display: flex;
  justify-content: center;
`;
