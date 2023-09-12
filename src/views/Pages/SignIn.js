import React, { useState, useEffect } from "react";
import {
  Box,
  Flex,
  Button,
  FormControl,
  FormLabel,
  Input,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import signInImage from "assets/img/signInImage.jpeg";
import { postAPI } from "API/post";

function SignIn() {
  const [phone_number, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    window.localStorage.removeItem("token");
  }, []);
  const onSubmit = (e) => {
    e.preventDefault();
    const data = postAPI("/account/customer/login/", {
      phone_number,
      password,
    });
  };
  const textColor = useColorModeValue("gray.700", "white");
  const bgForm = useColorModeValue("white", "navy.800");
  return (
    <Flex position='relative' mb='40px'>
      <Flex
        minH={{ md: "1000px" }}
        h={{ sm: "initial", md: "75vh", lg: "85vh" }}
        w='100%'
        maxW='1044px'
        mx='auto'
        justifyContent='space-between'
        mb='30px'
        pt={{ md: "0px" }}
      >
        <Flex
          w='100%'
          h='100%'
          alignItems='center'
          justifyContent='center'
          mb='60px'
          mt={{ base: "50px", md: "20px" }}
        >
          <Flex
            zIndex='2'
            direction='column'
            w='445px'
            background='transparent'
            borderRadius='15px'
            p='40px'
            mx={{ base: "100px" }}
            m={{ base: "20px", md: "auto" }}
            bg={bgForm}
            boxShadow={useColorModeValue(
              "0px 5px 14px rgba(0, 0, 0, 0.05)",
              "unset"
            )}
          >
            <Text
              fontSize='xl'
              color={textColor}
              fontWeight='bold'
              textAlign='center'
              mb='22px'
            >
              Артель
            </Text>
            <FormControl>
              <FormLabel ms='4px' fontSize='sm' fontWeight='normal'>
                Логин
              </FormLabel>
              <Input
                variant='auth'
                fontSize='sm'
                ms='4px'
                type='text'
                placeholder='Ваш логин'
                mb='24px'
                size='lg'
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
              <FormLabel ms='4px' fontSize='sm' fontWeight='normal'>
                Пароль
              </FormLabel>
              <Input
                variant='auth'
                fontSize='sm'
                ms='4px'
                type='password'
                placeholder='Ваш пароль'
                mb='24px'
                size='lg'
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button
                fontSize='10px'
                variant='dark'
                fontWeight='bold'
                w='100%'
                h='45'
                mb='24px'
                onClick={onSubmit}
              >
                Войти
              </Button>
            </FormControl>
          </Flex>
        </Flex>
        <Box
          overflowX='hidden'
          h='100%'
          w='100%'
          left='0px'
          position='absolute'
          bgRepeat='no-repeat'
          bgSize='cover'
          bgImage={signInImage}
        >
          <Box
            w='100%'
            h='100%'
            bgSize='cover'
            bg='blue.500'
            opacity='0.8'
          ></Box>
        </Box>
      </Flex>
    </Flex>
  );
}

export default SignIn;
