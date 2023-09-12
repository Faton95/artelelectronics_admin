import React, { useEffect, useState } from "react";
import {
  Grid,
  Flex,
  Button,
  FormControl,
  FormLabel,
  Text,
  Select,
  useColorModeValue,
  Link,
} from "@chakra-ui/react";

import Card from "components/Card/Card.js";
import { postAPI } from "../../../API/post";
import { getAPI } from "../../../API/get";
import UploadImages from "components/UploadMultipleImage";
import { ToastContainer, toast } from "react-toastify";

function ProductVariants() {
  const textColor = useColorModeValue("gray.700", "white");

  const [products, setProducts] = useState([]);
  const [variants, setVariants] = useState([]);
  const [variant, setVariant] = useState(null);
  const [product, setProduct] = useState(null);
  const [images, setImages] = useState([]);
  const [is_default, setIsDefault] = useState(null);

  useEffect(() => {
    getAPI("/product/admin_view/").then((response) => setProducts(response));
  }, []);

  const handleVariants = (e) => {
    getAPI(`/product/${e.target.value}/admin_detail_view/`).then((response) =>
      setVariants(response)
    );
  };

  console.log("variants", variants);

  const handleSubmit = (e) => {
    e.preventDefault();
    const body = images.map((item) => {
      return {
        original_image: item,
        small_image: null,
        is_default: item == is_default,
      };
    });

    const data = postAPI(
      "/product/variant_image/create/",
      {
        variant,
        images: body,
      },
      "#/admin/products-variants"
    )
      .then((response) => {
        toast.success("Картинки успешно добавлены!", {
          position: "top-right",
          theme: "colored",
        });
        setProduct(null);
        setImages([]);
        setIsDefault(null);
      })
      .catch((error) => {
        toast.error("Картинки не были успешно добавлены, попробуйте позже.", {
          position: "top-right",
          theme: "colored",
        });
      });
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
          Добавить картинки для продуктов
        </Text>
        <Grid templateColumns='repeat(3, 1fr)' gap={5} mb='20px'>
          <FormControl>
            <FormLabel>Продукт</FormLabel>
            <Select
              value={product}
              placeholder='Выберите продукт'
              onChange={(e) => {
                handleVariants(e), setProduct(e.target.value);
              }}
            >
              {products?.map((product) => (
                <option key={product?.id} value={product?.id}>
                  {product?.title}
                </option>
              ))}
            </Select>
          </FormControl>
          <FormControl>
            <FormLabel>Варианты</FormLabel>
            <Select
              disabled={variants.length === 0}
              value={variant}
              placeholder='Выберите вариант'
              onChange={(e) => setVariant(e.target.value)}
            >
              {variants?.variants?.map((variant) => (
                <option key={variant?.id} value={variant?.id}>
                  {variant?.color?.code}
                </option>
              ))}
            </Select>
          </FormControl>
          <UploadImages
            title='Варианты'
            setImages={setImages}
            setIsDefault={setIsDefault}
          />
        </Grid>
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
            Добавить картинки
          </Button>

          <Link href='/#/admin/excel-product'>
            <Button
              fontSize='10px'
              variant='dark'
              fontWeight='bold'
              w='100%'
              h='45'
              mb='24px'
              marginTop='auto'
            >
              Преимущества продукта
            </Button>
          </Link>
        </Grid>
      </Card>
      <ToastContainer />
    </Flex>
  );
}

export default ProductVariants;
