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
import Card from "components/Card/Card.js";
import { postAPI } from "../../../API/post";
import { postImage } from "../../../API/postImage";
import { getAPI } from "../../../API/get";

function ProductInstruction() {
  const textColor = useColorModeValue("gray.700", "white");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState(null);
  const [file, setFile] = useState([]);
  const [image, setImage] = useState([]);

  useEffect(() => {
    getAPI("/product/admin_view/").then((response) => setProducts(response));
  }, []);

  const handleFile = (event) => {
    const formData = new global.FormData();
    formData.append("file", event.target.files[0]);
    postImage("/media_file/", formData)
      .then((data) => setFile(data))
      .then((data) => (
        <>
          <Alert status='success'>
            <AlertIcon />
            Файл загружен успешно!
          </Alert>
        </>
      ));
  };

  const handleImage = (event) => {
    const formData = new global.FormData();
    formData.append("file", event.target.files[0]);
    postImage("/media_file/", formData)
      .then((data) => setImage(data))
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
      "/product_instruction/",
      { title, description, product, file: file?.id, image: image?.id },
      "/#/admin/product-advantage"
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
          Добавить инструкцию продукта
        </Text>
        <Grid templateColumns='repeat(5, 1fr)' gap={5} mb='20px'>
          <FormControl>
            <FormLabel>Название</FormLabel>
            <Input
              value={title}
              variant='auth'
              type='text'
              placeholder='Титуль'
              onChange={(e) => setTitle(e.target.value)}
            />
          </FormControl>
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
            <FormLabel>Добавить Файл</FormLabel>
            <Input
              type='file'
              pt='5px'
              placeholder='Добавить Файл'
              onChange={handleFile}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Добавить Картинку</FormLabel>
            <Input
              type='file'
              pt='5px'
              placeholder='Добавить Картинку'
              onChange={handleImage}
            />
          </FormControl>
        </Grid>
        <Grid mb='30px'>
          <FormControl>
            <FormLabel>Описание</FormLabel>
            <Input
              value={description}
              variant='auth'
              type='text'
              placeholder='Описание'
              onChange={(e) => setDescription(e.target.value)}
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
          Добавить инструкцию
        </Button>
      </Card>
    </Flex>
  );
}

export default ProductInstruction;
