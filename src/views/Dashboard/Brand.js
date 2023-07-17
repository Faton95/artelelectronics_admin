import React, {useState, useEffect} from "react";
import {
  Flex,
  Button,
  FormControl,
  FormLabel,
  Input,
  Text,
  useColorModeValue, Box, Thead, Tr, Th, Tbody, Table,
} from "@chakra-ui/react";
import {postImage} from "../../API/postImage";
import {postAPI} from "../../API/post";
import Card from "components/Card/Card.js"
import TablesTableRow from "../../components/Tables/TablesTableRow";
import {getAPI} from "../../API/get";

function Brand() {
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const textColor = useColorModeValue("gray.700", "white");

  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [brands, setBrands] = useState([])

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
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    const data = postAPI('/brand/', {
      title,
      image: image?.id
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
                Добавить Бренд
              </Text>
              <FormControl>
                <Box>
                  <FormLabel ms='4px' fontSize='sm' fontWeight='normal'>
                    Бренд
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
                    Добавить картинку
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
                  Добавить Бренд
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

              {brands?.map((row, index, arr) => {
                return (
                    <TablesTableRow
                        name={row.title}
                        logo={row.image.file}
                        email={row.id}
                        subdomain={row.title}
                        domain={row.title}
                        status={row.title}
                        date={row.title}
                        isLast={index === arr.length - 1 ? true : false}
                        key={index}
                    />
                );
              })}
            </Tbody>
          </Table>
        </Card>
      </Flex>
  );
}

export default Brand;