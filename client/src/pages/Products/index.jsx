import React from 'react';
import { useInfiniteQuery } from 'react-query';
import { Grid, Box, Flex, Button } from '@chakra-ui/react';
import Card from '../../components/Card';
import { getProductList } from '../../api';

function Products() {
  const { data, error, fetchNextPage, hasNextPage, isFetchingNextPage, status } = useInfiniteQuery('products', getProductList, {
    getNextPageParam: (lastGroup, allGroups) => {
      const morePagesExist = lastGroup.length === 12;
      if (!morePagesExist) {
        return;
      }
      return allGroups.length + 1;
    },
  });

  if (status === 'loading') {
    return <span>Loading...</span>;
  }

  if (status === 'error') {
    return <span>Error: {error.message}</span>;
  }

  return (
    <div>
      <Grid templateColumns="repeat(3, 1fr)" gap={4}>
        {data.pages.map((group, i) => (
          <React.Fragment key={i}>
            {group.map((item) => (
              <Box w="100%" key={item._id}>
                <Card item={item} />
              </Box>
            ))}
          </React.Fragment>
        ))}
      </Grid>
      <Flex mt="10" justifyContent="center">
        <Button isLoading={isFetchingNextPage} onClick={() => fetchNextPage()} disabled={!hasNextPage || isFetchingNextPage}>
          {isFetchingNextPage ? 'Loading more...' : hasNextPage ? 'Load More' : 'Nothing more to load'}
        </Button>
      </Flex>
    </div>
  );
}

export default Products;
