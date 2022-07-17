import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import ImageGalery from 'react-image-gallery';
import moment from 'moment';
import { fetchProduct } from '../../api';
import { Box, Button, Text, Container } from '@chakra-ui/react';
import { useAuth } from '../../contexts/AuthContext';
import { useBasket } from '../../contexts/BasketContext';

function ProductDetail() {
  const { product_id } = useParams();
  const { loggedIn } = useAuth();
  const { items, addToBasket } = useBasket();

  const { data, isLoading, error } = useQuery(['product', product_id], () => fetchProduct(product_id));

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (error) {
    return <span>Error: {error.message}</span>;
  }

  const findBasketItem = items.find((item) => item._id === product_id);
  const images = data.photos.map((url) => ({ original: url }));

  return (
    <Container maxW="7xl">
      {loggedIn && (
        <Button colorScheme={findBasketItem ? 'pink' : 'green'} onClick={() => addToBasket(data, findBasketItem)}>
          {findBasketItem ? 'Remove from basket' : 'Add to basket'}
        </Button>
      )}
      <Text fontSize="2xl">{data.title}</Text>
      <Text fontSize="small">{moment(data.createdAt).format('DD/MM/YYYY')}</Text>
      <Text fontSize="2xl">{data.price}</Text>
      <Text>{data.description}</Text>
      <Box margin="10">
        <ImageGalery showPlayButton={false} items={images} />
      </Box>
    </Container>
  );
}

export default ProductDetail;
