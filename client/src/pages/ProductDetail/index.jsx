import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import ImageGalery from 'react-image-gallery';
import moment from 'moment';
import { getProduct } from '../../api';
import { Box, Button, Text } from '@chakra-ui/react';

function ProductDetail() {
  const { product_id } = useParams();

  const { data, isLoading, error } = useQuery(['product', product_id], () => getProduct(product_id));

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (error) {
    return <span>Error: {error.message}</span>;
  }

  const images = data.photos.map((url) => ({ original: url }));

  return (
    <div>
      <Button colorScheme="pink">Add to basket</Button>
      <Text as="h2" fontSize="2xl">
        {data.title}
      </Text>
      <Text>{moment(data.createdAt).format('DD/MM/YYYY')}</Text>
      <Text>{data.description}</Text>
      <Box margin="10">
        <ImageGalery items={images} />
      </Box>
    </div>
  );
}

export default ProductDetail;
