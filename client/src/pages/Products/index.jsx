import { useQuery } from 'react-query';

import { Grid } from '@chakra-ui/react';
import Card from '../../components/Card';
import { productList } from '../../api';

function Products() {
  const { data, isLoading, error } = useQuery('products', productList);

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (error) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <Grid templateColumns="repeat(3, 1fr)" gap={4}>
      {data.map((item, key) => (
        <Card key={key} item={item} />
      ))}
    </Grid>
  );
}

export default Products;
