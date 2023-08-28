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
import { getAPI } from "../../../API/get";

function ProductCharacteristics() {
  const textColor = useColorModeValue("gray.700", "white");

  const [products, setProducts] = useState([]);
  const [title, setTitle] = useState("");
  const [product, setProduct] = useState(null);
  const [custom_order, setSetCustomOrder] = useState([]);

  useEffect(() => {
    getAPI("/product/admin_view/").then((response) => setProducts(response));
  }, []);

  const [items, setItems] = useState([
    {
      title: "",
      subItems: [{ key: "", title: "", is_primary: false }],
    },
  ]);

  const handleTitleChange = (itemIndex, value) => {
    const updatedItems = [...items];
    updatedItems[itemIndex].text = value;
    setItems(updatedItems);
  };

  const handleSubTitleChange = (itemIndex, subItemIndex, value) => {
    const updatedItems = [...items];
    updatedItems[itemIndex].subItems[subItemIndex].subText = value;
    setItems(updatedItems);
  };

  const handleCheckboxChange = (index, subItemIndex) => {
    const updatedSubItems = [...items];
    updatedSubItems[index].subItems[subItemIndex].is_primary = !updatedSubItems[
      index
    ].subItems[subItemIndex].is_primary;
    setItems(updatedSubItems);
  };

  const handleAddSubItem = (itemIndex) => {
    const updatedItems = [...items];
    updatedItems[itemIndex].subItems.push({ subText: "" });
    setItems(updatedItems);
  };

  const handleRemoveSubItem = (itemIndex, subItemIndex) => {
    const updatedItems = [...items];
    updatedItems[itemIndex].subItems.splice(subItemIndex, 1);
    setItems(updatedItems);
  };

  const handleAddItem = () => {
    setItems([
      ...items,
      {
        text: "",
        subItems: [{ key: "", title: "", is_primary: false }],
      },
    ]);
  };

  const handleRemoveItem = (itemIndex) => {
    const updatedItems = items.filter((_, i) => i !== itemIndex);
    setItems(updatedItems);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = postAPI(
      "/product_chharacteristic/",
      {
        title,
        product,
        custom_order,
        items,
      },
      "/#/admin/product-characteristics"
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
        <Grid templateColumns='repeat(3, 1fr)' gap={5}>
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
            <FormLabel>Порядок</FormLabel>
            <Select
              value={custom_order}
              placeholder='Выберите порядок'
              onChange={(e) => setSetCustomOrder(e.target.value)}
            >
              <option value={1}>1</option>
              <option value={2}>2</option>
            </Select>
          </FormControl>
        </Grid>

        <form onSubmit={handleSubmit}>
          {items.map((item, index) => (
            <div key={index}>
              <Grid mt='30px' templateColumns='repeat(3, 1fr)' gap={5}>
                <FormControl>
                  <FormLabel>Титуль</FormLabel>
                  <Input
                    value={item.title}
                    type='text'
                    placeholder='Титуль'
                    onChange={(e) => handleTitleChange(index, e.target.value)}
                  />
                </FormControl>
                <Button
                  disabled={items.length === 1}
                  mt='32px'
                  variant='danger'
                  type='button'
                  onClick={() => handleRemoveItem(index)}
                >
                  Удалить Титуль
                </Button>
                <div>
                  {item.subItems.map((subItem, subItemIndex) => (
                    <div key={subItemIndex}>
                      <Grid mt='30px' templateColumns='repeat(4, 1fr)' gap={5}>
                        <FormControl>
                          <FormLabel>Название характеристики</FormLabel>
                          <Input
                            value={subItem.key}
                            type='text'
                            onChange={(e) =>
                              handleSubTitleChange(
                                index,
                                subItemIndex,
                                e.target.value
                              )
                            }
                          />
                        </FormControl>
                        <FormControl>
                          <FormLabel>Значение характеристики</FormLabel>
                          <Input
                            value={subItem.value}
                            type='text'
                            onChange={(e) =>
                              handleSubTitleChange(
                                index,
                                subItemIndex,
                                e.target.value
                              )
                            }
                          />
                        </FormControl>
                        <FormControl
                          mt='25px'
                          display='flex'
                          alignItems='center'
                        >
                          <FormLabel htmlFor='email-alerts' mb='0'>
                            Основной
                          </FormLabel>
                          <Checkbox
                            checked={subItem.is_primary}
                            onChange={() =>
                              handleCheckboxChange(index, subItemIndex)
                            }
                          />
                        </FormControl>
                        <Button
                          variant='danger'
                          disabled={items?.subItems?.length === 1}
                          type='button'
                          onClick={() =>
                            handleRemoveSubItem(index, subItemIndex)
                          }
                        >
                          X
                        </Button>
                      </Grid>
                    </div>
                  ))}
                  <Flex mt='20px' mb='20px'>
                    <Spacer />
                    <Button
                      type='button'
                      onClick={() => handleAddSubItem(index)}
                    >
                      Добавить характеристику
                    </Button>
                  </Flex>
                </div>
              </Grid>
            </div>
          ))}
          <Flex mt='20px' mb='20px'>
            <Spacer />
            <Button variant='outline' type='button' onClick={handleAddItem}>
              Добавить Титуль
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
          Добавить Характеристики
        </Button>
      </Card>
    </Flex>
  );
}

export default ProductCharacteristics;
