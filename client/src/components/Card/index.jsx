import { Link } from 'react-router-dom';
import moment from 'moment';
import { Box, Image, Button } from '@chakra-ui/react';

function Card({ item }) {
  return (
    <Box borderWidth="1px" borderRadius="lg" overflow="hidden" p="3">
      <Link to="#">
        <Image src={item.photos[0]} alt={item.title} loading="lazy" />
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

      <Button colorScheme="pink">Add to basket</Button>
    </Box>
  );
}

export default Card;
