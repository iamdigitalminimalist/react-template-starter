import { isRouteErrorResponse, useRouteError } from 'react-router';

export default function ErrorPage() {
  const error = useRouteError();
  const prod = import.meta.env.PROD;

  const errorMessage = isRouteErrorResponse(error)
    ? 'The requested page was not found.'
    : prod
    ? 'An unexpected error occurred.'
    : (error as Error).message;

  return (
    <div>
      <h1>Oops...</h1>
      <p>{errorMessage}</p>
    </div>
  );
}
