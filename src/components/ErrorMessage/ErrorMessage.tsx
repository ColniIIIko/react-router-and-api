import React from 'react';
import { Alert, AlertTitle } from '@mui/material';

function ErrorMessage() {
  return (
    <Alert severity='error'>
      <AlertTitle>OOopps something went wrong...</AlertTitle>
      It looks like the resource you are looking for does not exist.
    </Alert>
  );
}

export default ErrorMessage;
