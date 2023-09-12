import React, { useEffect, useState } from "react";
import {
  Grid,
  Flex,
  Button,
  FormControl,
  FormLabel,
  Input,
  Text,
  Checkbox,
  Select,
  useColorModeValue,
  Spacer,
} from "@chakra-ui/react";
import Card from "components/Card/Card.js";
import { postAPI } from "../../../API/post";
import { postImage } from "../../../API/postImage";
import { getAPI } from "../../../API/get";
import { ToastContainer, toast } from "react-toastify";

function Products() {
  const textColor = useColorModeValue("gray.700", "white");

  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState(null);
  const [brand, setBrand] = useState(null);
  const [default_variant_code, setDefaultVariantCode] = useState("");
  const [serial_number, setSerialNumber] = useState("");
  const [is_recommended, setIsRecommended] = useState(false);
  const [is_hot, setIsHot] = useState(false);
  const [is_new, setIsNew] = useState(false);
  const [dynamic_view, setDynamicView] = useState([]);
  const [images, setImages] = useState([]);
  const [colors, setColors] = useState([]);
  const [variants, setVariants] = useState([
    { color: null, code: "", is_default: false },
  ]);

  const handleImage = (event) => {
    const formData = new global.FormData();
    formData.append("file", event.target.files[0]);
    postImage("/media_file/", formData).then((data) => setImages(data));
  };

  const handleDynamicView = (event) => {
    const formData = new global.FormData();
    formData.append("file", event.target.files[0]);
    postImage("/media_file/", formData).then((data) => setDynamicView(data));
  };

  useEffect(() => {
    getAPI("/brand/").then((response) => setBrands(response));
  }, []);

  useEffect(() => {
    getAPI("/color/").then((response) => setColors(response));
  }, []);

  useEffect(() => {
    getAPI("/category/").then((response) => setCategories(response));
  }, []);

  const addVariantField = () => {
    setVariants([...variants, { color: null, code: "", is_default: false }]);
  };

  const removeVariantField = (index) => {
    const updatedVariants = variants.filter((_, i) => i !== index);
    setVariants(updatedVariants);
  };

  const handleVariantsChange = (index, field, value) => {
    const updatedVariants = [...variants];
    updatedVariants[index][field] = value;
    setVariants(updatedVariants);
  };

  const handleCheckboxChange = (index) => {
    const updatedVariants = [...variants];
    updatedVariants[index].is_default = !updatedVariants[index].is_default;
    setVariants(updatedVariants);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = postAPI(
      "/product/",
      {
        title,
        category,
        brand,
        default_variant_code,
        serial_number,
        dynamic_view: dynamic_view?.id,
        is_recommended,
        is_hot,
        is_new,
        variants,
        default_image: images?.id,
      },
      "/#/admin/products-variants"
    )
      .then((response) => {
        toast.success("Продукт успешно добавлен!", {
          position: "top-right",
          theme: "colored",
        });
      })
      .catch((error) => {
        toast.error("Продукт не был успешно добавлен, попробуйте позже.", {
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
          Добавить продукт
        </Text>
        <Grid templateColumns='repeat(5, 1fr)' gap={5}>
          <FormControl>
            <FormLabel>Название</FormLabel>
            <Input
              value={title}
              variant='auth'
              type='text'
              placeholder='Название продукта'
              onChange={(e) => setTitle(e.target.value)}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Категория</FormLabel>
            <Select
              value={category}
              placeholder='Выберите категорию'
              onChange={(e) => setCategory(e.target.value)}
            >
              {categories?.map((category) => (
                <option key={category?.id} value={category?.id}>
                  {category?.title}
                </option>
              ))}
            </Select>
          </FormControl>
          <FormControl>
            <FormLabel>Бренд</FormLabel>
            <Select
              value={brand}
              placeholder='Выберите бренд'
              onChange={(e) => setBrand(e.target.value)}
            >
              {brands?.map((brand) => (
                <option key={brand?.id} value={brand?.id}>
                  {brand?.title}
                </option>
              ))}
            </Select>
          </FormControl>
          <FormControl>
            <FormLabel>Вариант код</FormLabel>
            <Input
              value={default_variant_code}
              type='text'
              placeholder='Вариант код'
              onChange={(e) => setDefaultVariantCode(e.target.value)}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Серийный номер</FormLabel>
            <Input
              value={serial_number}
              type='text'
              placeholder='Серийный номер'
              onChange={(e) => setSerialNumber(e.target.value)}
            />
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
            <FormLabel>Добавить 3D</FormLabel>
            <Input
              type='file'
              pt='5px'
              placeholder='Добавить 3D'
              onChange={handleDynamicView}
            />
          </FormControl>
          <FormControl mt='25px' display='flex' alignItems='center'>
            <FormLabel htmlFor='email-alerts' mb='0'>
              Хитовый товар
            </FormLabel>
            <Checkbox checked={is_hot} onChange={() => setIsHot(!is_hot)} />
          </FormControl>
          <FormControl mt='25px' display='flex' alignItems='center'>
            <FormLabel htmlFor='email-alerts' mb='0'>
              Новый товар
            </FormLabel>
            <Checkbox checked={is_new} onChange={() => setIsNew(!is_new)} />
          </FormControl>
          <FormControl mt='25px' display='flex' alignItems='center'>
            <FormLabel htmlFor='email-alerts' mb='0'>
              Рекомендуемый продукт
            </FormLabel>
            <Checkbox
              checked={is_recommended}
              onChange={() => setIsRecommended(!is_recommended)}
            />
          </FormControl>
        </Grid>

        <form onSubmit={handleSubmit}>
          {variants.map((variant, index) => (
            <div key={index}>
              <Grid mt='30px' templateColumns='repeat(4, 1fr)' gap={5}>
                <FormControl>
                  <FormLabel>Выберите цвет</FormLabel>
                  <Select
                    value={variants.color}
                    placeholder='Выберите цвет'
                    onChange={(e) =>
                      handleVariantsChange(index, "color", e.target.value)
                    }
                  >
                    {colors?.map((color) => (
                      <option value={color.id}>{color.code}</option>
                    ))}
                  </Select>
                </FormControl>
                <FormControl>
                  <FormLabel>Код цвета</FormLabel>
                  <Input
                    value={variants.code}
                    type='text'
                    placeholder='Код цвета'
                    onChange={(e) =>
                      handleVariantsChange(index, "code", e.target.value)
                    }
                  />
                </FormControl>
                <FormControl mt='25px' display='flex' alignItems='center'>
                  <FormLabel htmlFor='is_default' mb='0'>
                    Основной цвет ?
                  </FormLabel>
                  <Checkbox
                    checked={variant.is_default}
                    id='is_default'
                    onChange={() => handleCheckboxChange(index)}
                  />
                </FormControl>
                <Button
                  disabled={variants.length === 1}
                  mt='32px'
                  variant='danger'
                  type='button'
                  onClick={() => removeVariantField(index)}
                >
                  Удалить вариант
                </Button>
              </Grid>
            </div>
          ))}
          <Flex mt='20px' mb='20px'>
            <Spacer />
            <Button variant='outline' type='button' onClick={addVariantField}>
              Добавить вариант
            </Button>
          </Flex>
        </form>

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
          Добавить продукт
        </Button>
      </Card>
      <ToastContainer />
    </Flex>
  );
}

export default Products;
