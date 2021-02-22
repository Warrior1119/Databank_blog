import React, { useEffect } from 'react';
import { useAuthSlice } from 'app/slices';
import { useDispatch } from 'react-redux';

export function LogoutPage({ history }) {
  const { actions } = useAuthSlice();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(actions.logout());
    history.push('/login');
  }, []);
  return <></>;
}
