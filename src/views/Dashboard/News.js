import React, { useEffect, useState } from "react";
import {
  Grid,
  Flex,
  Button,
  FormControl,
  FormLabel,
  Input,
  Switch,
  Text,
  Box,
  useColorModeValue,
  Icon,
} from "@chakra-ui/react";
import CustomEditor from "components/Editor/Editor";
import Card from "components/Card/Card.js";
import { FaTrashAlt } from "react-icons/fa";
import { postAPI } from "../../API/post";
import { postImage } from "../../API/postImage";
import { getAPI } from "../../API/get";
import { ToastContainer, toast } from "react-toastify";

function News() {
  const textColor = useColorModeValue("gray.700", "white");

  const [title, setTitle] = useState("");
  const [publishDate, setPublishDate] = useState("");
  const [url, setUrl] = useState("");
  const [addToCarousel, setAddToCarousel] = useState(false);
  const [content, setContent] = useState("");
  const [images, setImages] = useState([]);
  const [news, setNews] = useState([]);
  const handleNews = (news) => {
    setContent(news);
  };
  const handleImage = (event) => {
    const formData = new global.FormData();
    formData.append("file", event.target.files[0]);
    postImage("/media_file/", formData).then((data) => setImages(data));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = postAPI(
      "/news/",
      {
        title,
        publish_date: publishDate,
        external_source_url: url,
        add_to_carousel: addToCarousel,
        content,
        image: images?.id,
      },
      "#/admin/news"
    )
      .then((response) => {
        toast.success("Новость успешно добавлен!", {
          position: "top-right",
          theme: "colored",
        });
      })
      .catch((error) => {
        toast.error("Новость не был успешно добавлен, попробуйте позже.", {
          position: "top-right",
          theme: "colored",
        });
      });
  };

  useEffect(() => {
    getAPI("/news/").then((response) => setNews(response?.results));
  }, []);

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
          Добавить новость
        </Text>
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
        <Grid templateColumns='repeat(3, 1fr)' gap={6}>
          <Box>
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
          </Box>
          <Box>
            <FormLabel ms='4px' fontSize='sm' fontWeight='normal'>
              Добавить ссылку для видео
            </FormLabel>
            <Input
              value={url}
              variant='auth'
              fontSize='sm'
              ms='4px'
              type='text'
              placeholder='Ссылка'
              mb='24px'
              size='lg'
              onChange={(e) => setUrl(e.target.value)}
            />
          </Box>
          <Box>
            <FormControl display='flex' alignItems='center'>
              <FormLabel htmlFor='remember-login' mb='0' fontWeight='normal'>
                Добавить в карусель
              </FormLabel>
              <Switch
                value={addToCarousel}
                id='remember-login'
                colorScheme='blue'
                me='10px'
                onChange={(e) => setAddToCarousel(!addToCarousel)}
              />
            </FormControl>
          </Box>
        </Grid>
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
        <CustomEditor handleNews={handleNews} />
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
          Добавить новость
        </Button>
      </Card>

      {news?.map((row, key) => {
        console.log("row", row);
        return (
          <Card key={key}>
            <Grid templateColumns='repeat(5, 1fr)' gap={5}>
              <img
                src={row?.image?.file}
                height='100'
                width='100'
                alt='news image'
              />
              <div>{row.title}</div>
              <div />
              <div />
              <Flex color='red.500' cursor='pointer' align='center' p='12px'>
                <Icon as={FaTrashAlt} me='4px' />
                <Text fontSize='sm' fontWeight='semibold'>
                  Удалить
                </Text>
              </Flex>
            </Grid>
          </Card>
        );
      })}
      <ToastContainer />
    </Flex>
  );
}

export default News;
