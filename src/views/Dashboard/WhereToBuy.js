import React, {useState, useEffect} from "react";
import {
  Flex,
  Button,
  FormControl,
  FormLabel,
  Input,
  Text,
  useColorModeValue, Box, Thead, Tr, Th, Tbody, Table, Select,
} from "@chakra-ui/react";
import {postImage} from "../../API/postImage";
import {postAPI} from "../../API/post";
import Card from "components/Card/Card.js"
import TablesTableRow from "../../components/Tables/TablesTableRow";
import {getAPI} from "../../API/get";

function WhereToBuy() {
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const textColor = useColorModeValue("gray.700", "white");
  const [countries, setCountries] = useState([]);
  const [title, setTitle] = useState('');
  const [region, setRegion] = useState(1);
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [store_type, setStoreType] = useState('');
  const [workingHours, setWorkingHours] = useState('');
  const [address, setAddress] = useState('');
  const [image, setImage] = useState('');

  const handleImage = (event) => {
    const formData = new global.FormData();
    formData.append(
        "file", event.target.files[0]
    )
    postImage('/media_file/', formData)
        .then(data => setImage(data))
  }

  useEffect(() => {
    getAPI('/region/').then(response => setCountries(response))
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()

    const data = postAPI('/store/', {
      title,
      region,
      latitude,
      longitude,
      store_type,
      working_hours: workingHours,
      address,
      images: [{image: image?.id}]
    })
  }

  console.log("store", store_type)
  return (
      <Flex direction="column" pt={{ base: "120px", md: "75px" }} gap='10'>
        <Card>
              <Text
                  fontSize='xl'
                  color={textColor}
                  fontWeight='bold'
                  textAlign='center'
                  mb='22px'>
                Где купить ?
              </Text>
              <FormControl>
                <Box>
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
                </Box>
                <Box>
                  <FormLabel ms='4px' fontSize='sm' fontWeight='normal'>
                    Выберите континент
                  </FormLabel>
                  <Select placeholder='' onChange={(event) => setRegion(event.target.value)}>
                    {countries.map((item) => (
                        <option value={item?.id}>{item.title}</option>
                    ))}
                  </Select>
                </Box>
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
                    Добавить картинки
                  </FormLabel>
                  <Input
                      type='file'
                      placeholder='Добавить картинку'
                      pt='7px'
                      mb='24px'
                      size='lg'
                      onChange={handleImage}
                  />
                </Box>
                <Box>
                  <FormLabel ms='4px' fontSize='sm' fontWeight='normal'>
                    Время работы
                  </FormLabel>
                  <Input
                      value={workingHours}
                      variant='auth'
                      fontSize='sm'
                      ms='4px'
                      type='text'
                      placeholder='Время работы'
                      mb='24px'
                      size='lg'
                      onChange={(e) => setWorkingHours(e.target.value)}
                  />
                </Box>
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
                  <Select placeholder='' onChange={(event) => setStoreType(event.target.value)}>
                    <option value=''>Выберите тип магазина</option>
                    <option value='Texnopark'>Brand shop</option>
                    <option value='Market'>Premium Store</option>
                    <option value='Dealer'>Market Place</option>
                  </Select>
                </Box>
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
        </Card>
        <Card>
          <Table variant="simple" color={textColor}>
            <Thead>
              <Tr my=".8rem" pl="0px" color="gray.400" >
                <Th pl="0px" borderColor={borderColor} color="gray.400" >
                  Бренд
                </Th>
                <Th borderColor={borderColor}></Th>
              </Tr>
            </Thead>
            <Tbody>

              {/*{brands?.map((row, index, arr) => {*/}
              {/*  return (*/}
              {/*      <TablesTableRow*/}
              {/*          name={row.title}*/}
              {/*          logo={row.image.file}*/}
              {/*          email={row.id}*/}
              {/*          subdomain={row.title}*/}
              {/*          domain={row.title}*/}
              {/*          status={row.title}*/}
              {/*          date={row.title}*/}
              {/*          isLast={index === arr.length - 1 ? true : false}*/}
              {/*          key={index}*/}
              {/*      />*/}
              {/*  );*/}
              {/*})}*/}
            </Tbody>
          </Table>
        </Card>
      </Flex>
  );
}

export default WhereToBuy;