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
import { Select } from "@chakra-ui/react";
import { ToastContainer, toast } from "react-toastify";

function News() {
  const textColor = useColorModeValue("gray.700", "white");

  const [continents, setContinents] = useState([]);
  const [continent, setContinent] = useState(null);

  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState(null);

  const [uzDistrict, setUzDistrict] = useState("");
  const [ruDistrict, setRuDistrict] = useState("");
  const [engDistrict, setEngDistrict] = useState("");

  useEffect(() => {
    getAPI("/continent/").then((response) => setContinents(response));
  }, []);

  const handleContinent = (continent) => {
    setContinent(continent);
    getAPI(`/country/?continent=${continent}`).then((response) =>
      setCountries(response)
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = postAPI(
      "/region/",
      {
        country: Number(country),
        languages: [
          {
            language: "uz",
            title: uzDistrict,
          },
          {
            language: "ru",
            title: ruDistrict,
          },
          {
            language: "en",
            title: engDistrict,
          },
        ],
      },
      "#/admin/regions"
    )
      .then((response) => {
        toast.success("Область успешно добавлена!", {
          position: "top-right",
          theme: "colored",
        });
      })
      .catch((error) => {
        toast.error("Область не была успешно добавлена, попробуйте позже.", {
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
          Добавить Область
        </Text>
        <FormControl>
          <FormLabel>Континент</FormLabel>
          <Select
            value={continent}
            placeholder='Выберите Континент'
            onChange={(e) => {
              handleContinent(e.target.value);
            }}
          >
            {continents?.map((continent) => (
              <option key={continent?.id} value={continent?.id}>
                {continent?.title}
              </option>
            ))}
          </Select>
        </FormControl>
        <FormControl>
          <FormLabel>Страны</FormLabel>
          <Select
            value={country}
            placeholder='Выберите Страну'
            onChange={(e) => {
              setCountry(e.target.value);
            }}
          >
            {countries?.map((country) => (
              <option key={country?.id} value={country?.id}>
                {country?.title}
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
          Область на 3 языках
        </Text>
        <Grid templateColumns='repeat(3, 1fr)' gap={5} mb='20px'>
          <FormControl>
            <FormLabel>Uz</FormLabel>
            <Input
              value={uzDistrict}
              type='text'
              onChange={(e) => setUzDistrict(e.target.value)}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Ру</FormLabel>
            <Input
              value={ruDistrict}
              type='text'
              onChange={(e) => setRuDistrict(e.target.value)}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Eng</FormLabel>
            <Input
              value={engDistrict}
              type='text'
              onChange={(e) => setEngDistrict(e.target.value)}
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
          Добавить Область
        </Button>
      </Card>
      <ToastContainer />
    </Flex>
  );
}

export default News;
