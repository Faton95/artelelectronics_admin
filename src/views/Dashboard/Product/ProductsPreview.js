import React, { useEffect, useState } from "react";
import {
  Grid,
  Flex,
  Button,
  FormControl,
  FormLabel,
  Input,
  Text,
  Badge,
  Select,
  useColorModeValue,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import { CheckIcon, CloseIcon } from "@chakra-ui/icons";
import Card from "components/Card/Card.js";
import { postAPI } from "../../../API/post";
import { postImage } from "../../../API/postImage";
import { getAPI } from "../../../API/get";
import { patchAPI } from "../../../API/patch";

function ProductPreview() {
  const textColor = useColorModeValue("gray.700", "white");

  const [products, setProducts] = useState([]);

  useEffect(() => {
    getAPI("/product/admin_view/").then((response) => setProducts(response));
  }, []);

  const handlePatch = (item) => {
    console.log("item", item);
    patchAPI(`/product/${item?.id}/publish/`, {
      is_published: !item?.is_published,
    })
      .then((responseData) => {
        console.log("Resource updated:", responseData);
      })
      .catch((error) => {
        console.error("Error updating resource:", error);
      });

    getAPI("/product/admin_view/").then((response) => setProducts(response));
  };

  return (
    <Flex direction='column' pt={{ base: "120px", md: "75px" }} gap='10'>
      <Card>
        <Text
          fontSize='xl'
          color={textColor}
          fontWeight='bold'
          textAlign='center'
          mb='22px'
        >
          Предварительный просмотр продукта
        </Text>
        <Grid templateColumns='repeat(5, 1fr)' gap={5} mb='20px'>
          <Text as='b'>Название</Text>
          <Text as='b'>Картинка</Text>
          <Text as='b'>Категория</Text>
          <Text as='b'>Код варианта</Text>
          <Text as='b'>Статус</Text>
        </Grid>
        {products.map((item) => (
          <Grid templateColumns='repeat(5, 1fr)' gap={5} mb='20px'>
            <div>{item?.title}</div>
            <div>
              <img
                src={item?.default_image?.file}
                alt='image'
                height='50'
                width='50'
              />
            </div>
            <div>{item?.category.title}</div>
            <div>{item?.default_variant_code}</div>
            {item?.is_published ? (
              <div>
                <Badge colorScheme='green'>Опубликован</Badge>
                &nbsp; &nbsp; &nbsp;
                <CloseIcon color='red.700' onClick={() => handlePatch(item)} />
              </div>
            ) : (
              <div>
                <Badge colorScheme='red'>Не опубликован</Badge>
                &nbsp; &nbsp; &nbsp;
                <CheckIcon
                  color='green.700'
                  onClick={() => handlePatch(item)}
                />
              </div>
            )}
          </Grid>
        ))}
      </Card>
    </Flex>
  );
}

export default ProductPreview;
