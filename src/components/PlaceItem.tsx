import { Image } from '@chakra-ui/image';
import { Badge, Box } from '@chakra-ui/layout';
import React from 'react';

interface placeItemProps {
  photoUrl: string;
  item: { name: string; distance: string };
  priceRange: string;
}
const PlaceItem: React.FC<placeItemProps> = ({
  photoUrl,
  item,
  priceRange,
}) => {
  return (
    <Box maxW="xl" borderWidth="1px" borderRadius="lg" overflow="hidden">
      <Image src={photoUrl} height="300px" width="100%" />
      <Box p="6">
        <Box display="flex" alignItems="baseline">
          <Badge borderRadius="full" px="2" colorScheme="teal">
            Distance {item.distance}m
          </Badge>
        </Box>
        <Box
          mt="1"
          fontWeight="semibold"
          as="h4"
          lineHeight="tight"
          isTruncated
        >
          {item.name}
        </Box>
        <Box>
          {'price '}
          <Box as="span" color="gray.600" fontSize="sm">
            {priceRange}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
export default PlaceItem;
