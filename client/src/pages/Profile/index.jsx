import { useAuth } from '../../contexts/AuthContext';
import { Text, Button, Container } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

function Profile({ history }) {
  const navigate = useNavigate();

  const { user, logout } = useAuth();

  const handleLogout = async () => {
    logout();
    navigate('/');
  };

  return (
    <Container maxW="7xl">
      <Text fontSize={22}>Profile</Text>
      <br />
      <Text>Role : {user.role}</Text>
      <Text>Email: {user.email}</Text>
      <br />
      <Button colorScheme="pink" variant="solid" onClick={handleLogout}>
        Logout
      </Button>
    </Container>
  );
}

export default Profile;
