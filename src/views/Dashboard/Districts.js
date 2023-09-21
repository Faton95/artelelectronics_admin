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

  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState(null);

  const [regions, setRegions] = useState([]);
  const [region, setRegion] = useState(null);

  const [uzDistrict, setUzDistrict] = useState("");
  const [ruDistrict, setRuDistrict] = useState("");
  const [engDistrict, setEngDistrict] = useState("");

  useEffect(() => {
    getAPI("/continent/").then((response) => setContinents(response));
  }, []);

  const handleContinent = (continent) => {
    getAPI(`/country/?continent=${continent}`).then((response) =>
      setCountries(response)
    );
  };

  const handleCountry = (country) => {
    getAPI(`/region/?country=${country}`).then((response) =>
      setRegions(response)
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = postAPI(
      "/district/",
      {
        region: Number(region),
        latitude,
        longitude,
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
      "#/admin/districts"
    )
      .then((response) => {
        toast.success("Регион успешно добавлен!", {
          position: "top-right",
          theme: "colored",
        });
      })
      .catch((error) => {
        toast.error("Регионы не был успешно добавлен, попробуйте позже.", {
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
          Добавить Регионы
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
              handleCountry(e.target.value);
            }}
          >
            {countries?.map((country) => (
              <option key={country?.id} value={country?.id}>
                {country?.title}
              </option>
            ))}
          </Select>
        </FormControl>
        <FormControl>
          <FormLabel>Область</FormLabel>
          <Select
            value={country}
            placeholder='Выберите Область'
            onChange={(e) => {
              setRegion(e.target.value);
            }}
          >
            {regions?.map((region) => (
              <option key={region?.id} value={region?.id}>
                {region?.title}
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
          Регион на 3 языках
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
        <Grid templateColumns='repeat(2, 1fr)' gap={5} mb='20px'>
          <FormControl>
            <FormLabel>Долгота</FormLabel>
            <Input
              value={latitude}
              type='text'
              onChange={(e) => setLatitude(e.target.value)}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Широта</FormLabel>
            <Input
              value={longitude}
              type='text'
              onChange={(e) => setLongitude(e.target.value)}
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
          Добавить Регион
        </Button>
      </Card>
      <ToastContainer />
    </Flex>
  );
}

export default News;
