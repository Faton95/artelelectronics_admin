import {
  Box,
  Button,
  Flex,
  Icon,
  Spacer,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";

function CatalogueTable(props) {
  const textColor = useColorModeValue("gray.700", "white");
  const { title, brand, download, format, logo, link } = props;

  return (
    <Flex my={{ sm: "1rem", xl: "10px" }} alignItems="center">
      <Flex direction="column">
        <Text fontSize="md" color={textColor} fontWeight="bold">
          {title}
        </Text>
        <Text fontSize="sm" color="gray.400" fontWeight="semibold" me="16px">
          {brand}
        </Text>
      </Flex>
      <Spacer />
      <Box me="12px">
          <a href={link} target='_blank'>
            <Text fontSize="md" color="gray.400" fontWeight="semibold">
              {download}
            </Text>
          </a>
      </Box>
      <Button p="0px" bg="transparent" variant="no-effects">
        <Flex alignItems="center" p="12px">
          <Icon as={logo} w="20px" h="auto" me="5px" color={textColor}/>
          <Text fontSize="md" color={textColor} fontWeight="bold">
            {format}
          </Text>
        </Flex>
      </Button>
    </Flex>
  );
}

export default CatalogueTable;
