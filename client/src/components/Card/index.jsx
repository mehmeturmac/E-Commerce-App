import { Link } from 'react-router-dom';
import moment from 'moment';
import { Box, Image, Button, AspectRatio } from '@chakra-ui/react';
import { useBasket } from '../../contexts/BasketContext';
import { useAuth } from '../../contexts/AuthContext';

function Card({ item }) {
  const { loggedIn } = useAuth();
  const { items, addToBasket } = useBasket();
  const findBasketItem = items.find((basket_item) => basket_item._id === item._id);

  return (
    <Box borderWidth="1px" borderRadius="lg" overflow="hidden" p="3">
      <Link to={`product/${item._id}`}>
        <AspectRatio ratio={16 / 11}>
          <Image src={item.photos[0]} alt={item.title} loading="lazy" />
        </AspectRatio>
        <Box p="6">
          <Box d="flex" alignItems="baseline">
            {moment(item.createdAt).format('DD/MM/YYYY')}
          </Box>
          <Box mt="1" fontWeight="semibold" as="h4" lineHeight="tight">
            {item.title}
          </Box>
          <Box>{item.price}</Box>
        </Box>
      </Link>
      {loggedIn && (
        <Button colorScheme={findBasketItem ? 'pink' : 'green'} variant="solid" onClick={() => addToBasket(item, findBasketItem)}>
          {findBasketItem ? 'Remove from basket' : 'Add to basket'}
        </Button>
      )}
    </Box>
  );
}

export default Card;
