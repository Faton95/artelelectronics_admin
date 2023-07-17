import {
  Box,
  Button,
  Flex,
  Icon,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";
import { FaPencilAlt, FaTrashAlt } from "react-icons/fa";
import {deleteAPI} from "../../API/delete";

function NewsTable(props) {
  const bgColor = useColorModeValue("#F8F9FA", "navy.900");
  const nameColor = useColorModeValue("gray.500", "white");

  const { name, image, id } = props;
  const handleDelete = (id) => {
    deleteAPI(`/news/${id}/`).then((res) => console.log(res))
  }

  return (
    <Box p="24px" bg={bgColor} my="22px" borderRadius="12px">
      <Flex justify="space-between" w="100%">
        <Flex maxWidth="70%" gap='10' align="center">
          <img src={image} alt="main image" height="auto" width="150px"/>
          <Text color={nameColor} fontSize="md" fontWeight="bold">
            {name}
          </Text>
        </Flex>
        <Flex
          direction={{ sm: "column", md: "row" }}
          align="flex-start"
          p={{ md: "24px" }}
        >
          <Button
            p="0px"
            bg="transparent"
            variant="no-effects"
            mb={{ sm: "10px", md: "0px" }}
            me={{ md: "12px" }}
            onClick={() => handleDelete(id)}
          >
            <Flex color="red.500" cursor="pointer" align="center" p="12px">
              <Icon as={FaTrashAlt} me="4px" />
              <Text fontSize="sm" fontWeight="semibold">
                Удалить
              </Text>
            </Flex>
          </Button>
          {/*<Button p="0px" bg="transparent"*/}
          {/*variant="no-effects">*/}
          {/*  <Flex color={textColor} cursor="pointer" align="center" p="12px">*/}
          {/*    <Icon as={FaPencilAlt} me="4px" />*/}
          {/*    <Text fontSize="sm" fontWeight="semibold">*/}
          {/*      EDIT*/}
          {/*    </Text>*/}
          {/*  </Flex>*/}
          {/*</Button>*/}
        </Flex>
      </Flex>
    </Box>
  );
}

export default NewsTable;
