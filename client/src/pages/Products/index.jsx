import { Grid } from '@chakra-ui/react';
import Card from '../../components/Card';

function Products() {
  return (
    <Grid templateColumns="repeat(3, 1fr)" gap={4}>
      <Card />
    </Grid>
  );
}

export default Products;
