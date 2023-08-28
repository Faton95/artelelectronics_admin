import React, { useState, useEffect } from "react";
import {
  Flex,
  Button,
  FormControl,
  FormLabel,
  Input,
  Text,
  useColorModeValue,
  Grid,
  Thead,
  Tr,
  Th,
  Tbody,
  Table,
} from "@chakra-ui/react";
import { postImage } from "../../API/postImage";
import { postAPI } from "../../API/post";
import Card from "components/Card/Card.js";
import TablesTableRow from "../../components/Tables/TablesTableRow";
import { getAPI } from "../../API/get";

function Color() {
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const textColor = useColorModeValue("gray.700", "white");

  const [code, setCode] = useState("");
  const [image, setImage] = useState("");
  const [colors, setColors] = useState([]);

  const handleImage = (event) => {
    const formData = new global.FormData();
    formData.append("file", event.target.files[0]);
    postImage("/media_file/", formData).then((data) => setImage(data));
  };

  useEffect(() => {
    getAPI("/color/").then((response) => setColors(response));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = postAPI(
      "/color/",
      {
        code,
        image: image?.id,
      },
      "#/admin/color"
    );
    getAPI("/color/").then((response) => setColors(response));
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
          Добавить Цвета
        </Text>
        <Grid templateColumns='repeat(3, 1fr)' gap={5} mb='40px'>
          <FormControl>
            <FormLabel>Код картинки</FormLabel>
            <Input
              value={code}
              type='text'
              placeholder='Код картинки'
              onChange={(e) => setCode(e.target.value)}
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

          <Button
            fontSize='10px'
            variant='dark'
            fontWeight='bold'
            w='100%'
            h='45'
            mt='27px'
            onClick={handleSubmit}
          >
            Добавить цвет
          </Button>
        </Grid>
        <Grid templateColumns='repeat(2, 1fr)' gap={5} mb='20px'>
          <Text as='b'>Цвет картинки</Text>
          <Text as='b'>Код картинки</Text>
        </Grid>

        {colors?.map((color) => (
          <Grid templateColumns='repeat(2, 1fr)' gap={5} mb='10px'>
            <div>
              <img
                src={color?.image?.file}
                height='32'
                width='32'
                alt='color images'
              />
            </div>
            <div>{color?.code}</div>
          </Grid>
        ))}
      </Card>
    </Flex>
  );
}

export default Color;
