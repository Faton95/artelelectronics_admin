import React, { useState, useEffect } from "react";
import {
  Flex,
  Button,
  FormControl,
  FormLabel,
  Input,
  Text,
  useColorModeValue,
  Box,
  Select,
  Grid,
  Checkbox,
  Spacer,
} from "@chakra-ui/react";
import { ToastContainer, toast } from "react-toastify";
import { postImage } from "../../API/postImage";
import { postAPI } from "../../API/post";
import Card from "components/Card/Card.js";

import { getAPI } from "../../API/get";
import UploadImages from "components/UploadMultipleImage";

const weekDays = {
  1: "Понедельник",
  2: "Вторник",
  3: "Среда",
  4: "Четверг",
  5: "Пятница",
  6: "Суббота",
  7: "Воскресенье",
};
function WhereToBuy() {
  const textColor = useColorModeValue("gray.700", "white");
  const [continents, setContinents] = useState([]);
  const [countries, setCountries] = useState([]);
  const [regions, setRegions] = useState([]);
  const [districts, setDistricts] = useState([]);

  const [country, setCountry] = useState(null);
  const [region, setRegion] = useState(null);
  const [district, setDistrict] = useState(null);

  const [title, setTitle] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [store_type, setStoreType] = useState("");
  const [address, setAddress] = useState("");
  const [default_image, setDefaultImage] = useState("");
  const [images, setImages] = useState([]);
  const [timetable, setTimeTable] = useState([
    { day: null, opens_at: "", closes_at: "", is_open: true },
  ]);

  const handleImage = (event) => {
    const formData = new global.FormData();
    formData.append("file", event.target.files[0]);
    postImage("/media_file/", formData).then((data) => setDefaultImage(data));
  };

  useEffect(() => {
    getAPI("/continent/").then((response) => setContinents(response));
  }, []);

  const handleContinents = (continent) => {
    getAPI(`/country/?continent=${continent}`).then((response) =>
      setCountries(response)
    );
  };

  const handleRegions = (country) => {
    setCountry(country);
    getAPI(`/region/?country=${country}`).then((response) =>
      setRegions(response)
    );
  };

  const handleDistricts = (region) => {
    setRegion(region);
    getAPI(`/district/?region=${region}`).then((response) =>
      setDistricts(response)
    );
  };

  console.log(country, region, district);

  const addTimeTableField = () => {
    setTimeTable([
      ...timetable,
      { day: null, opens_at: "", closes_at: "", is_open: true },
    ]);
  };

  const removeTimeTableField = (index) => {
    const updatedTimeTable = timetable.filter((_, i) => i !== index);
    setTimeTable(updatedTimeTable);
  };

  const handleTimeTableChange = (index, field, value) => {
    const updatedTimeTable = [...timetable];
    updatedTimeTable[index][field] = value;
    setTimeTable(updatedTimeTable);
  };

  const handleCheckboxChange = (index) => {
    const updatedTimeTable = [...timetable];
    updatedTimeTable[index].is_open = !updatedTimeTable[index].is_open;
    setTimeTable(updatedTimeTable);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const objectImages = images.map((item) => {
      return {
        image: item,
      };
    });

    const customTimetable = timetable?.map((item) => {
      if (item.is_open)
        return { ...item, opens_at: "00:00", closes_at: "00:00" };
      else return item;
    });

    const data = postAPI(
      "/store/",
      {
        country,
        district,
        title: "aa",
        region,
        latitude,
        longitude,
        store_type,
        timetable: customTimetable,
        address,
        images: objectImages,
        default_image: default_image?.id,
      },
      "#/admin/where-to-buy"
    )
      .then((response) => {
        toast.success("Магазин успешно добавлен!", {
          position: "top-right",
          theme: "colored",
        });
      })
      .catch((error) => {
        toast.error("Магазин не был успешно добавлен, попробуйте позже.", {
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
          Где купить ?
        </Text>
        <FormControl>
          {/* <Box>
            <FormLabel ms='4px' fontSize='sm' fontWeight='normal'>
              Название
            </FormLabel>
            <Input
              value={title}
              variant='auth'
              fontSize='sm'
              ms='4px'
              type='text'
              placeholder='Название бренда'
              mb='24px'
              size='lg'
              onChange={(e) => setTitle(e.target.value)}
            />
          </Box> */}
          <Grid templateColumns='repeat(4, 1fr)' gap={5}>
            <Box>
              <FormLabel ms='4px' fontSize='sm' fontWeight='normal'>
                Выберите континент
              </FormLabel>
              <Select onChange={(e) => handleContinents(e.target.value)}>
                <option value=''>Выберите Континент</option>
                {continents?.map((item) => (
                  <option value={item?.id}>{item.title}</option>
                ))}
              </Select>
            </Box>
            <Box>
              <FormLabel ms='4px' fontSize='sm' fontWeight='normal'>
                Выберите страну
              </FormLabel>
              <Select onChange={(e) => handleRegions(e.target.value)}>
                <option value=''>Выберите Страну</option>
                {countries?.map((item) => (
                  <option value={item?.id}>{item.title}</option>
                ))}
              </Select>
            </Box>
            <Box>
              <FormLabel ms='4px' fontSize='sm' fontWeight='normal'>
                Выберите Область
              </FormLabel>
              <Select onChange={(event) => handleDistricts(event.target.value)}>
                <option value=''>Выберите Область</option>
                {regions?.map((item) => (
                  <option value={item?.id}>{item.title}</option>
                ))}
              </Select>
            </Box>
            <Box>
              <FormLabel ms='4px' fontSize='sm' fontWeight='normal'>
                Выберите Регион
              </FormLabel>
              <Select onChange={(event) => setDistrict(event.target.value)}>
                <option value=''>Выберите Регион</option>
                {districts?.map((item) => (
                  <option value={item?.id}>{item.title}</option>
                ))}
              </Select>
            </Box>
          </Grid>
          <br />
          <Box>
            <FormLabel ms='4px' fontSize='sm' fontWeight='normal'>
              Широта
            </FormLabel>
            <Input
              value={latitude}
              variant='auth'
              fontSize='sm'
              ms='4px'
              type='text'
              placeholder='Название бренда'
              mb='24px'
              size='lg'
              onChange={(e) => setLatitude(e.target.value)}
            />
          </Box>
          <Box>
            <FormLabel ms='4px' fontSize='sm' fontWeight='normal'>
              Долгота
            </FormLabel>
            <Input
              value={longitude}
              variant='auth'
              fontSize='sm'
              ms='4px'
              type='text'
              placeholder='Название бренда'
              mb='24px'
              size='lg'
              onChange={(e) => setLongitude(e.target.value)}
            />
          </Box>
          <Box>
            <FormLabel ms='4px' fontSize='sm' fontWeight='normal'>
              Добавить картинку(Главная в поискавике)
            </FormLabel>
            <Input
              type='file'
              placeholder='Добавить картинку(Главная в поискавике)'
              pt='7px'
              mb='24px'
              size='lg'
              onChange={handleImage}
            />
          </Box>
          <form onSubmit={handleSubmit}>
            {timetable.map((item, index) => (
              <div key={index}>
                <Grid mt='30px' templateColumns='repeat(5, 1fr)' gap={5}>
                  <FormControl>
                    <FormLabel>Выберите день</FormLabel>
                    <Select
                      value={item.day}
                      placeholder='Выберите день'
                      onChange={(e) =>
                        handleTimeTableChange(index, "day", e.target.value)
                      }
                    >
                      <option value={1}>Понедельник</option>
                      <option value={2}>Вторник</option>
                      <option value={3}>Среда</option>
                      <option value={4}>Четверг</option>
                      <option value={5}>Пятница</option>
                      <option value={6}>Суббота</option>
                      <option value={7}>Воскресенье</option>
                    </Select>
                  </FormControl>
                  <FormControl mt='25px' display='flex' alignItems='center'>
                    <FormLabel htmlFor='is_default' mb='0'>
                      Работает {weekDays[item.day]} ?
                    </FormLabel>
                    <Checkbox
                      checked={item.is_open}
                      id='is_open'
                      onChange={() => handleCheckboxChange(index)}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Открыт с</FormLabel>
                    <Input
                      value={!item.is_open ? item.opens_at : "00:00"}
                      disabled={item.is_open}
                      type='text'
                      placeholder='Открыт с'
                      onChange={(e) =>
                        handleTimeTableChange(index, "opens_at", e.target.value)
                      }
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Открыт до</FormLabel>
                    <Input
                      value={!item.is_open ? item.closes_at : "00:00"}
                      disabled={item.is_open}
                      type='text'
                      placeholder='Открыт до'
                      onChange={(e) =>
                        handleTimeTableChange(
                          index,
                          "closes_at",
                          e.target.value
                        )
                      }
                    />
                  </FormControl>
                  <Button
                    disabled={timetable.length === 1}
                    mt='32px'
                    variant='danger'
                    type='button'
                    onClick={() => removeTimeTableField(index)}
                  >
                    Удалить время работы
                  </Button>
                </Grid>
              </div>
            ))}
            <Flex mt='20px' mb='20px'>
              <Spacer />
              <Button
                variant='outline'
                type='button'
                onClick={addTimeTableField}
              >
                Добавить время работы
              </Button>
            </Flex>
          </form>
          <UploadImages
            title='Сторисы'
            setImages={setImages}
            withDefault={false}
          />
          <Box>
            <FormLabel ms='4px' fontSize='sm' fontWeight='normal'>
              Адрес
            </FormLabel>
            <Input
              value={address}
              variant='auth'
              fontSize='sm'
              ms='4px'
              type='text'
              placeholder='Адрес'
              mb='24px'
              size='lg'
              onChange={(e) => setAddress(e.target.value)}
            />
          </Box>
          <Box>
            <FormLabel ms='4px' fontSize='sm' fontWeight='normal'>
              Тип магазина
            </FormLabel>
            <Select
              placeholder=''
              onChange={(event) => setStoreType(event.target.value)}
            >
              <option value=''>Выберите тип магазина</option>
              <option value={3}>Brand shop</option>
              <option value={2}>Premium Store</option>
              <option value={1}>Market Place</option>
            </Select>
          </Box>
          <br />
          <Button
            fontSize='10px'
            variant='dark'
            fontWeight='bold'
            w='100%'
            h='45'
            mb='24px'
            onClick={handleSubmit}
          >
            Добавить Магазин
          </Button>
        </FormControl>
        <ToastContainer />
      </Card>
    </Flex>
  );
}

export default WhereToBuy;
