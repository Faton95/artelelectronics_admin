import React, { useState, useEffect, useRef } from "react";
import {
  Grid,
  Button,
  FormControl,
  FormLabel,
  Progress,
  Input,
  Radio,
  RadioGroup,
  Text,
} from "@chakra-ui/react";

import UploadService from "../../API/multipleImage";

const UploadImages = ({
  setImages,
  setIsDefault,
  withDefault = true,
  title,
}) => {
  const [selectedFiles, setSelectedFiles] = useState(undefined);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [progressInfos, setProgressInfos] = useState({ val: [] });
  const [message, setMessage] = useState([]);
  const [imageInfos, setImageInfos] = useState([]);
  const [defaultImage, setDefaultImage] = useState([]);
  const [value, setValue] = useState("1");

  const progressInfosRef = useRef(null);

  // useEffect(() => {
  //   UploadService.getFiles().then((response) => {
  //     setImageInfos(response.data);
  //   });
  // }, []);

  const selectFiles = (event) => {
    let images = [];

    for (let i = 0; i < event.target.files.length; i++) {
      images.push(URL.createObjectURL(event.target.files[i]));
    }

    setSelectedFiles(event.target.files);
    setImagePreviews(images);
    setProgressInfos({ val: [] });
    setMessage([]);
  };

  const upload = (idx, file) => {
    let _progressInfos = [...progressInfosRef.current.val];
    return UploadService.upload(file, (event) => {
      _progressInfos[idx].percentage = Math.round(
        (100 * event.loaded) / event.total
      );
      setProgressInfos({ val: _progressInfos });
    })
      .then((data) => {
        setImages((prevImage) => [...prevImage, data.data.id]);
        setDefaultImage((prevImage) => [...prevImage, data.data.id]);
        setMessage((prevMessage) => [
          ...prevMessage,
          "Изображение успешно загружено: " + file.name,
        ]);
      })
      .catch(() => {
        _progressInfos[idx].percentage = 0;
        setProgressInfos({ val: _progressInfos });

        setMessage((prevMessage) => [
          ...prevMessage,
          "Изображение не загружено: " + file.name,
        ]);
      });
  };

  const uploadImages = () => {
    const files = Array.from(selectedFiles);

    let _progressInfos = files.map((file) => ({
      percentage: 0,
      fileName: file.name,
    }));

    progressInfosRef.current = {
      val: _progressInfos,
    };

    const uploadPromises = files.map((file, i) => upload(i, file));

    Promise.all(uploadPromises)
      .then(() => UploadService.getFiles())
      .then((files) => {
        setImageInfos(files.data);
      });

    setMessage([]);
  };

  const handleSelectImage = (value) => {
    setValue(value);
    setIsDefault(value);
  };

  return (
    <>
      <Grid templateColumns='repeat(2, 1fr)' gap={5} mb='20px'>
        <FormControl>
          <FormLabel>
            <Text color='red'>{title}(несколько)</Text>
          </FormLabel>
          <Input
            type='file'
            pt='5px'
            placeholder='Добавить картинку'
            multiple
            accept='image/*'
            onChange={selectFiles}
          />
        </FormControl>
        <Button
          mt='32px'
          variant='outline'
          disabled={!selectedFiles}
          onClick={uploadImages}
        >
          Загрузить картинки
        </Button>
      </Grid>
      {withDefault ? (
        <RadioGroup onChange={handleSelectImage} value={value}>
          {progressInfos &&
            progressInfos.val.length > 0 &&
            progressInfos.val.map((progressInfo, index) => (
              <Radio key={index} value={`${defaultImage[index]}`}>
                <img
                  className='preview'
                  src={imagePreviews[index]}
                  alt={"image-" + index}
                  height='50'
                  width='50'
                />
                <span>{message[index]}</span>
                <Progress hasStripe value={progressInfo.percentage} />
              </Radio>
            ))}
        </RadioGroup>
      ) : (
        <>
          {progressInfos &&
            progressInfos.val.length > 0 &&
            progressInfos.val.map((progressInfo, index) => (
              <>
                <img
                  className='preview'
                  src={imagePreviews[index]}
                  alt={"image-" + index}
                  height='50'
                  width='50'
                />
                <span>{message[index]}</span>
                <Progress hasStripe value={progressInfo.percentage} />
              </>
            ))}
        </>
      )}
    </>
  );
};

export default UploadImages;
