import React from 'react';
import { useQuery } from 'react-query';
import { fetchOrders } from '../../../api';
import { Table, Thead, Tbody, Tr, Th, Td, TableCaption, Text } from '@chakra-ui/react';

function Orders() {
  const { isLoading, error, data } = useQuery('orders', fetchOrders);

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (error) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <div>
      <Text fontSize="xl" p={5}>
        Orders
      </Text>
      <Table variant="simple">
        <TableCaption>Imperial to metric conversion factors</TableCaption>
        <Thead>
          <Tr>
            <Th>User</Th>
            <Th>Address</Th>
            <Th>Items</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data.map((item) => (
            <Tr key={item._id}>
              <Td>{item.user.email}</Td>
              <Td>{item.adress}</Td>
              <Td>{item.items.length}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </div>
  );
}

export default Orders;
