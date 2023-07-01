import React, {useState} from "react";
import {
  Box,
  Flex,
  Button,
  FormControl,
  FormLabel,
  Input,
  Link,
  Switch,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import CustomEditor from "components/Editor/Editor";
import {postAPI} from "../../API/post";

function News() {



  const textColor = useColorModeValue("gray.700", "white");
  const bgForm = useColorModeValue("white", "navy.800");

  return (
      <Flex position='relative' mb='40px'>
        <Flex
            minH={{ md: "1000px" }}
            h="100vh"
            w='100%'
            mx='auto'
            justifyContent='space-between'
            mb='30px'
            pt={{ md: "0px" }}>
          <Flex
              w='100%'
              h='100%'
              alignItems='center'
              justifyContent='center'
              mb='60px'
              mt={{ base: "50px", md: "20px" }}>
            <Flex
                zIndex='2'
                direction='column'
                w='100%'
                h="90%"
                background='transparent'
                borderRadius='15px'
                p='40px'
                mx={{ base: "100px" }}
                m={{ base: "20px", md: "auto" }}
                bg={bgForm}
                boxShadow={useColorModeValue(
                    "0px 5px 14px rgba(0, 0, 0, 0.05)",
                    "unset"
                )}>
              <Text
                  fontSize='xl'
                  color={textColor}
                  fontWeight='bold'
                  textAlign='center'
                  mb='22px'>
                Добавить новость
              </Text>
              <FormControl>
                <FormLabel ms='4px' fontSize='sm' fontWeight='normal'>
                  Титуль
                </FormLabel>
                <Input
                    value={title}
                    variant='auth'
                    fontSize='sm'
                    ms='4px'
                    type='text'
                    placeholder='Титуль'
                    mb='24px'
                    size='lg'
                    onChange={(e) => setTitle(e.target.value)}
                />
                <FormLabel ms='4px' fontSize='sm' fontWeight='normal'>
                  Дата публикации
                </FormLabel>
                <Input
                    value={publishDate}
                    variant='auth'
                    fontSize='sm'
                    ms='4px'
                    type='date'
                    placeholder='Дата публикации'
                    mb='24px'
                    size='lg'
                    onChange={(e) => setPublishDate(e.target.value)}
                />
                <FormLabel ms='4px' fontSize='sm' fontWeight='normal'>
                  Добавить ссылку для видео
                </FormLabel>
                <Input
                    value={url}
                    variant='auth'
                    fontSize='sm'
                    ms='4px'
                    type='url'
                    placeholder='Добавить ссылку'
                    mb='24px'
                    size='lg'
                    onChange={(e) => setUrl(e.target.value)}
                />
                <FormControl display='flex' alignItems='center' mb='24px'>
                  <Switch value={addToCarousel} id='remember-login' colorScheme='blue' me='10px' onChange={(e) => setAddToCarousel(!addToCarousel)} />
                  <FormLabel htmlFor='remember-login' mb='0' fontWeight='normal'>
                    Добавить в карусель
                  </FormLabel>
                </FormControl>
                <CustomEditor handleNews={handleNews}/>
                <Button
                    fontSize='10px'
                    variant='dark'
                    fontWeight='bold'
                    w='100%'
                    h='45'
                    mb='24px'
                    onClick={handleSubmit}
                >
                  Добавить новость
                </Button>
              </FormControl>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
  );
}

export default News;