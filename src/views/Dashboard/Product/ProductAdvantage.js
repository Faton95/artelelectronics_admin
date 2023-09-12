import React, { useEffect, useState } from "react";
import {
  Grid,
  Flex,
  Button,
  FormControl,
  FormLabel,
  Input,
  Text,
  Select,
  useColorModeValue,
  Spacer,
  Link,
} from "@chakra-ui/react";
import Card from "components/Card/Card.js";
import { postAPI } from "../../../API/post";
import { postImage } from "../../../API/postImage";
import { getAPI } from "../../../API/get";

function ProductAdvantage() {
  const textColor = useColorModeValue("gray.700", "white");

  const [products, setProducts] = useState([]);
  const [title, setTitle] = useState("");
  const [product, setProduct] = useState(null);
  const [logo, setLogo] = useState([]);
  const [image, setImage] = useState([]);

  const [items, setItems] = useState([{ title: "" }]);

  const handleImage = (event) => {
    const formData = new global.FormData();
    formData.append("file", event.target.files[0]);
    postImage("/media_file/", formData).then((data) => setImage(data));
  };

  const handleLogo = (event) => {
    const formData = new global.FormData();
    formData.append("file", event.target.files[0]);
    postImage("/media_file/", formData).then((data) => setLogo(data));
  };

  useEffect(() => {
    getAPI("/product/admin_view/").then((response) => setProducts(response));
  }, []);

  const addItemField = () => {
    setItems([...items, { title: "" }]);
  };

  const removeItemField = (index) => {
    const updatedItems = items.filter((_, i) => i !== index);
    setItems(updatedItems);
  };

  const handleItemChange = (index, field, value) => {
    const updatedItems = [...items];
    updatedItems[index][field] = value;
    setItems(updatedItems);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = postAPI(
      "/product_advantage/",
      {
        title,
        product,
        logo: logo?.id,
        image: image?.id,
        items,
      },
      "/#/admin/product-advantage"
    );
    setTitle("");
    setProduct(null);
    setLogo([]);
    setImage([]);
    setItems([{ title: "" }]);
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
        <Grid templateColumns='repeat(5, 1fr)' gap={5}>
          <FormControl>
            <FormLabel>Название преимущества</FormLabel>
            <Input
              value={title}
              variant='auth'
              type='text'
              placeholder='Название'
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
            <FormLabel>Добавить картинку</FormLabel>
            <Input
              type='file'
              pt='5px'
              placeholder='Добавить картинку'
              onChange={handleImage}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Добавить лого</FormLabel>
            <Input
              type='file'
              pt='5px'
              placeholder='Добавить лого'
              onChange={handleLogo}
            />
          </FormControl>
        </Grid>

        <form onSubmit={handleSubmit}>
          {items.map((item, index) => (
            <div key={index}>
              <Grid mt='30px' templateColumns='repeat(3, 1fr)' gap={5}>
                <FormControl>
                  <FormLabel>Описание</FormLabel>
                  <Input
                    value={item.title}
                    type='text'
                    placeholder='Описание'
                    onChange={(e) =>
                      handleItemChange(index, "title", e.target.value)
                    }
                  />
                </FormControl>
                <Button
                  disabled={items.length === 1}
                  mt='32px'
                  variant='danger'
                  type='button'
                  onClick={() => removeItemField(index)}
                >
                  Удалить описание
                </Button>
              </Grid>
            </div>
          ))}
          <Flex mt='20px' mb='20px'>
            <Spacer />
            <Button variant='outline' type='button' onClick={addItemField}>
              Добавить описание
            </Button>
          </Flex>
        </form>
        <Grid templateColumns='repeat(2, 1fr)' gap={5}>
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
            Добавить преимущество
          </Button>

          <Link href='/#/admin/product-preview'>
            <Button
              fontSize='10px'
              variant='dark'
              fontWeight='bold'
              w='100%'
              h='45'
              mb='24px'
              marginTop='auto'
            >
              Публиковать продукт
            </Button>
          </Link>
        </Grid>
      </Card>
    </Flex>
  );
}

export default ProductAdvantage;
