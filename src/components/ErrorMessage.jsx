// ErrorMessage.js
import React from 'react';

function ErrorMessage({ message }) {
  if (!message) return null;

  return (
    <span style={{ color: 'red' }}>{message}</span>
  );
}

export default ErrorMessage;