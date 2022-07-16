import { Alert, AlertIcon, AlertTitle, AlertDescription } from '@chakra-ui/react';

function Error404() {
  return (
    <div>
      <Alert status="error" variant="subtle" flexDirection="column" alignItems="center" justifyContent="center" textAlign="center" height="200px">
        <AlertIcon boxSize="40px" mr={0} />
        <AlertTitle mt={4} mb={1} fontSize="lg">
          Error 404
        </AlertTitle>
        <AlertDescription maxWidth="sm">The page was not found.</AlertDescription>
      </Alert>
    </div>
  );
}

export default Error404;
