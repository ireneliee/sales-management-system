import React from 'react';
import { auth } from '../firebaseConfig';
import { signOut } from 'firebase/auth';
import Button from '@mui/material/Button';

const SignOut = () => {
  const handleSignOut = () => {
    signOut(auth);
  };

  return (
    <Button variant="contained" onClick={handleSignOut}>Sign Out</Button>
  );
};

export default SignOut;