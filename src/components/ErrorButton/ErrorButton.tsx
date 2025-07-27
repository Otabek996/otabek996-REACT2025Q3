import { useState } from 'react';
import Button from '../Button/Button';

function ErrorButton() {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    throw new Error('This is a fallback UI Error test');
  }

  return (
    <Button
      className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
      buttonText="Throw Error"
      callback={() => setHasError(true)}
    />
  );
}

export default ErrorButton;
