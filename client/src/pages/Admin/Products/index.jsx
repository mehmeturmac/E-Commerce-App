import { useState, Fragment } from 'react';
import { useInfiniteQuery, useMutation, useQueryClient } from 'react-query';
import { Link } from 'react-router-dom';
import { fetchProductList, deleteProduct } from '../../../api';
import { Table, Thead, Tbody, Tr, Th, Td, Text, Button, ButtonGroup, Flex, useDisclosure } from '@chakra-ui/react';
import { AlertDialog, AlertDialogBody, AlertDialogFooter, AlertDialogHeader, AlertDialogContent, AlertDialogOverlay } from '@chakra-ui/react';

function Products() {
  const { error, data, fetchNextPage, hasNextPage, isFetchingNextPage, status } = useInfiniteQuery('adminProducts', fetchProductList, {
    getNextPageParam: (lastGroup, allGroups) => {
      const morePagesExist = lastGroup.length === 12;
      if (!morePagesExist) {
        return;
      }
      return allGroups.length + 1;
    },
  });
  const deleteMutation = useMutation(deleteProduct);
  const queryClient = useQueryClient();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [itemId, setItemId] = useState();

  if (status === 'loading') {
    return <span>Loading...</span>;
  }

  if (status === 'error') {
    return <span>Error: {error.message}</span>;
  }

  const handleDeleteClick = (e) => {
    setItemId(e.target.id);
    onOpen();
  };

  return (
    <div>
      <Text fontSize="xl" p={5}>
        Products
      </Text>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Index</Th>
            <Th>Title</Th>
            <Th>Price</Th>
            <Th>Created At</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data.pages.map((group, i) => (
            <Fragment key={i}>
              {group.map((item, index) => (
                <Tr key={item._id}>
                  <Td>{i * 12 + index + 1}</Td>
                  <Td>{item.title}</Td>
                  <Td>{item.price}</Td>
                  <Td>{item.createdAt}</Td>
                  <Td>
                    <ButtonGroup>
                      <Button colorScheme="teal" size="sm" variant="outline">
                        <Link to="/">Edit</Link>
                      </Button>

                      <Button colorScheme="red" size="sm" variant="outline" id={item._id} onClick={handleDeleteClick}>
                        Delete
                      </Button>
                    </ButtonGroup>
                  </Td>
                </Tr>
              ))}
            </Fragment>
          ))}
        </Tbody>
      </Table>
      <Flex mt="10" justifyContent="center">
        <Button size="sm" isLoading={isFetchingNextPage} onClick={() => fetchNextPage()} disabled={!hasNextPage || isFetchingNextPage}>
          {isFetchingNextPage ? 'Loading more...' : hasNextPage ? 'Load More' : 'Nothing more to load'}
        </Button>
      </Flex>
      <AlertDialog size="xs" isOpen={isOpen} onClose={onClose}>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete
            </AlertDialogHeader>
            <AlertDialogBody>Are you sure?</AlertDialogBody>
            <AlertDialogFooter>
              <Button
                colorScheme="teal"
                size="sm"
                onClick={() =>
                  deleteMutation.mutate(itemId, {
                    onSuccess: () => {
                      queryClient.invalidateQueries('adminProducts');
                      onClose();
                    },
                  })
                }
              >
                Yes
              </Button>
              <Button colorScheme="red" size="sm" onClick={onClose} ml={2}>
                No
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </div>
  );
}

export default Products;
