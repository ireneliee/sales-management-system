// src/components/SignIn.js
import React from 'react';
import { auth, provider } from '../firebaseConfig';
import { signInWithPopup } from 'firebase/auth';
import Button from '@mui/material/Button';

const SignIn = () => {
  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log('User signed in:', result.user);
      })
      .catch((error) => {
        console.error('Error signing in with Google:', error);
      });
  };

  return (
    <Button variant = "contained" onClick={signInWithGoogle}>Google Sign In</Button>
  );
};

export default SignIn;