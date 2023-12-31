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
} from "@chakra-ui/react";
import Card from "components/Card/Card.js";
import { postAPI } from "../../API/post";
import { getAPI } from "../../API/get";
import { postImage } from "../../API/postImage";
import { Select } from "@chakra-ui/react";
import { ToastContainer, toast } from "react-toastify";

function News() {
  const textColor = useColorModeValue("gray.700", "white");
  const [continents, setContinents] = useState([]);
  const [continent, setContinent] = useState(null);

  const [country_code, setCountryCode] = useState("");
  const [IP, setIP] = useState("");

  const [uzCountry, setUzCountry] = useState("");
  const [ruCountry, setRuCountry] = useState("");
  const [engCountry, setEngCountry] = useState("");

  const [images, setImages] = useState([]);

  useEffect(() => {
    getAPI("/continent/").then((response) => setContinents(response));
  }, []);

  const handleImage = (event) => {
    const formData = new global.FormData();
    formData.append("file", event.target.files[0]);
    postImage("/media_file/", formData).then((data) => setImages(data));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = postAPI(
      "/country/",
      {
        continent,
        country_code,
        IP,
        languages: [
          {
            language: "uz",
            title: uzCountry,
          },
          {
            language: "ru",
            title: ruCountry,
          },
          {
            language: "en",
            title: engCountry,
          },
        ],
        flag: images?.id,
      },
      "#/admin/countries"
    )
      .then((response) => {
        toast.success("Страна успешно добавлена!", {
          position: "top-right",
          theme: "colored",
        });
      })
      .catch((error) => {
        toast.error("Страна не былы успешно добавлена, попробуйте позже.", {
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
          Добавить Страны
        </Text>
        <FormControl>
          <FormLabel>Континент</FormLabel>
          <Select
            value={continent}
            placeholder='Выберите Континент'
            onChange={(e) => {
              setContinent(e.target.value);
            }}
          >
            {continents?.map((continent) => (
              <option key={continent?.id} value={continent?.id}>
                {continent?.title}
              </option>
            ))}
          </Select>
        </FormControl>
        <Text
          fontSize='xl'
          color={textColor}
          fontWeight='bold'
          textAlign='center'
          mb='22px'
        >
          Добавить Страну
        </Text>
        <Grid templateColumns='repeat(3, 1fr)' gap={5} mb='20px'>
          <FormControl>
            <FormLabel>Код страны</FormLabel>
            <Input
              value={country_code}
              type='text'
              onChange={(e) => setCountryCode(e.target.value)}
            />
          </FormControl>
          <FormControl>
            <FormLabel>IP</FormLabel>
            <Input
              value={IP}
              type='text'
              onChange={(e) => setIP(e.target.value)}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Флаг</FormLabel>
            <Input type='file' pt='5px' onChange={handleImage} />
          </FormControl>
        </Grid>
        <Grid templateColumns='repeat(3, 1fr)' gap={5} mb='20px'>
          <FormControl>
            <FormLabel>Uz</FormLabel>
            <Input
              value={uzCountry}
              type='text'
              onChange={(e) => setUzCountry(e.target.value)}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Ру</FormLabel>
            <Input
              value={ruCountry}
              type='text'
              onChange={(e) => setRuCountry(e.target.value)}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Eng</FormLabel>
            <Input
              value={engCountry}
              type='text'
              onChange={(e) => setEngCountry(e.target.value)}
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
          Добавить Страну
        </Button>
      </Card>
      <ToastContainer />
    </Flex>
  );
}

export default News;
