import React, {useEffect, useState} from "react";
import {
  Flex,
  Button,
  FormControl,
  FormLabel,
  Input,
  Text,
  useColorModeValue, Box, Select
} from "@chakra-ui/react";
import {postImage} from "../../API/postImage";
import {postAPI} from "../../API/post";
import Card from "components/Card/Card.js"
import {getAPI} from "../../API/get";
import { FaFilePdf } from "react-icons/fa";
import CatalogueTable from "../../components/Tables/CatalogueTable";

function Catalogue() {
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const textColor = useColorModeValue("gray.700", "white");

  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [brand, setBrand] = useState(undefined);
  const [brands, setBrands] = useState([]);
  const [catalogues, setCatalogues] = useState([]);

  console.log("as", catalogues)
  const handleImage = (event) => {
    const formData = new global.FormData();
    formData.append(
        "file", event.target.files[0]
    )
    postImage('/media_file/', formData)
        .then(data => setImage(data))
  }

  useEffect(() => {
    getAPI('/brand/').then(response => setBrands(response))
    getAPI('/catalogue/').then(response => setCatalogues(response?.results))
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    const data = postAPI('/catalogue/', {
      title,
      file: image?.id,
      brand
    })
  }


  return (
      <Flex direction="column" pt={{ base: "120px", md: "75px" }} gap='10'>
          <Card>
              <Text
                  fontSize='xl'
                  color={textColor}
                  fontWeight='bold'
                  textAlign='center'
                  mb='22px'>
                Добавить Каталог
              </Text>
            <FormControl>
              <Box>
                <FormLabel ms='4px' fontSize='sm' fontWeight='normal'>
                  Каталог
                </FormLabel>
                <Input
                    value={title}
                    variant='auth'
                    fontSize='sm'
                    ms='4px'
                    type='text'
                    placeholder='Название каталога'
                    mb='24px'
                    size='lg'
                    onChange={(e) => setTitle(e.target.value)}
                />
              </Box>
              <Box>
                <FormLabel ms='4px' fontSize='sm' fontWeight='normal'>
                  Бренд
                </FormLabel>
                <Select
                    value={brand}
                    placeholder='Выберите бренд'
                    size='lg'
                    onChange={(e) => setBrand(e.target.value)}
                >
                  {brands.map((item) => (
                      <option value={item.id}>{item.title}</option>
                  ))}
                </Select>
              </Box>
              <br/>
              <Box>
                <FormLabel ms='4px' fontSize='sm' fontWeight='normal'>
                  Добавить файл
                </FormLabel>
                <Input
                    type='file'
                    pt='7px'
                    mb='24px'
                    size='lg'
                    onChange={handleImage}
                />
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
                Добавить Каталог
              </Button>
            </FormControl>
          </Card>
        <Card>
          {catalogues?.map((row, idx) => {
            return (
                <CatalogueTable
                    title={row.title}
                    brand={row.brand.title}
                    link={row.file.file}
                    download="Скачать"
                    logo={FaFilePdf}
                    format="pdf"
                    key={idx}
                />
            );
          })}
        </Card>
      </Flex>
  );
}

export default Catalogue;