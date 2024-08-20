/* eslint-disable react/prop-types */
import { Alert } from "flowbite-react";

function ErrorAlert({ message }) {
  return (
    <Alert color="failure" className="mt-4">
      {message}
    </Alert>
  );
}

export default ErrorAlert;