import React, {useState} from "react";
import {
  Flex,
  Button,
  FormControl,
  FormLabel,
  Input,
  Switch,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import CustomEditor from "components/Editor/Editor";
import {postAPI} from "../../API/post";
import { Select } from '@chakra-ui/react'

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
                Добавить страны
              </Text>
              <FormControl>
                <FormLabel ms='4px' fontSize='sm' fontWeight='normal'>
                  Выберите континент
                </FormLabel>
                <Select placeholder=''>
                  <option value='option1'>Азия</option>
                  <option value='option2'>Европа</option>
                  <option value='option3'>Африка</option>
                  <option value='option1'>Северная Америка</option>
                  <option value='option2'>Южная Америка</option>
                  <option value='option3'>Австралия</option>
                </Select>
                <FormLabel ms='4px' fontSize='sm' fontWeight='normal'>
                  Выберите страну
                </FormLabel>
                <Select placeholder=''>
                  <option value='option1'>Узбекистан</option>
                  <option value='option2'>Россия</option>
                  <option value='option3'>Италия</option>
                </Select>
                <br />
                <Button
                    fontSize='10px'
                    variant='dark'
                    fontWeight='bold'
                    w='100%'
                    h='45'
                    mb='24px'
                >
                  Добавить страну
                </Button>
              </FormControl>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
  );
}

export default News;