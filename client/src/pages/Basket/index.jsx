import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Alert,
  Image,
  Button,
  Box,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  FormControl,
  FormLabel,
  Textarea,
  Container,
  Table,
  Thead,
  Tr,
  Th,
  Td,
  Tbody,
} from '@chakra-ui/react';
import { useBasket } from '../../contexts/BasketContext';
import { postOrder } from '../../api';

function Basket() {
  const [address, setAddress] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = useRef();

  const { items, removeFromBasket, emptyBasket } = useBasket();
  const total = items.reduce((acc, obj) => acc + obj.price, 0);

  const handleSubmitForm = async () => {
    const itemIds = items.map((item) => item._id);
    const input = { address, items: JSON.stringify(itemIds) };
    await postOrder(input);
    emptyBasket();
    onClose();
  };

  return (
    <Container maxW="7xl">
      {items.length < 1 && <Alert status="warning">You have no items in your basket.</Alert>}
      {items.length > 0 && (
        <>
          <Text fontSize="xl" p={5}>
            Basket
          </Text>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Title</Th>
                <Th>Price</Th>
                <Th>Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {items.map((item) => (
                <Tr key={item._id}>
                  <Td>
                    <Link to={`/product/${item._id}`}>{item.title}</Link>
                  </Td>
                  <Td>{item.price}</Td>
                  <Td>
                    <Button mt={2} size="sm" colorScheme="pink" onClick={() => removeFromBasket(item._id)}>
                      Remove from basket
                    </Button>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>

          <Box mt={10}>
            <Text fontSize={22}>Total: {total}</Text>
          </Box>
          <Button mt={2} size="sm" colorScheme="green" onClick={onOpen}>
            Order
          </Button>
          <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Order</ModalHeader>
              <ModalCloseButton />
              <ModalBody pb={6}>
                <FormControl>
                  <FormLabel>Address</FormLabel>
                  <Textarea ref={initialRef} placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)} />
                </FormControl>
              </ModalBody>
              <ModalFooter>
                <Button colorScheme="blue" mr={3} onClick={handleSubmitForm}>
                  Save
                </Button>
                <Button onClick={onClose}>Cancel</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </>
      )}
    </Container>
  );
}

export default Basket;
