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

function ProductsByExcel() {
  const textColor = useColorModeValue("gray.700", "white");

  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState(null);
  const [excel, setExcel] = useState([]);

  const handleFile = (event) => {
    const formData = new global.FormData();
    formData.append("file", event.target.files[0]);
    postImage("/media_file/", formData)
      .then((data) => setExcel(data))
      .then((data) => (
        <>
          <Alert status='success'>
            <AlertIcon />
            Файл загружен успешно!
          </Alert>
        </>
      ));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = postAPI(
      "/product_characteristic_item/upload_excel/",
      {
        product,
        file: excel?.id,
      },
      "/#/admin/product-preview"
    );
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
          Преимущества продукта
        </Text>
        <Grid templateColumns='repeat(5, 1fr)' gap={5} mb='20px'>
          <FormControl>
            <FormLabel>Продукт</FormLabel>
            <Select
              value={product}
              placeholder='Выберите продукт'
              onChange={(e) => setProduct(e.target.value)}
            >
              {products?.map((product) => (
                <option key={product?.id} value={product?.id}>
                  {product?.title}
                </option>
              ))}
            </Select>
          </FormControl>
          <FormControl>
            <FormLabel>Добавить Excel</FormLabel>
            <Input
              type='file'
              pt='5px'
              placeholder='Добавить Excel'
              onChange={handleFile}
            />
          </FormControl>
        </Grid>
        <Button
          fontSize='10px'
          variant='dark'
          fontWeight='bold'
          w='100%'
          h='45'
          mb='24px'
          onClick={handleSubmit}
          marginTop='auto'
        >
          Добавить продукты
        </Button>
      </Card>
    </Flex>
  );
}

export default ProductsByExcel;
