import React, { useState, useRef } from 'react';
import { Button, Container, Row, Col, Modal, Spinner } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import photo from '../page/assets/photo.png';
import arrow from '../page/assets/right-arrow.png';

const imageBoxStyle = {
  height: '50vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#fff',
  margin: '0 auto',
  border: '2px solid #237EED',
};

const imageInputStyle = {
  maxWidth: '100%',
  maxHeight: '100%',
  objectFit: 'contain',
  cursor: 'pointer',
};

const imageStyle = {
  maxWidth: '100%',
  maxHeight: '100%',
  objectFit: 'contain',
};

const iconStyle = {
  width: '60px',
  height: '60px',
  cursor: 'pointer',
};

const colStyle = {
  padding: '20px',
  backgroundColor: '#C0D9F4',
  borderRadius: '15px',
};

function ImageInput(props) {
  const [show, setShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [imageSrc, setImageSrc] = useState('');
  const [resImageSrc, setResImageSrc] = useState('');
  const [resImageTxt, setResImageTxt] = useState('');
  const [imageData, setImageData] = useState({
    originPath: '',
    resultPath: '',
    result: [],
  });
  const fileInputRef = useRef(null);
  const userId = JSON.parse(localStorage.getItem('user'))?.userId;

  const handleSubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    const url = process.env.REACT_APP_IMAGE_API_URL;
    const formData = new FormData();
    const imgData = await axios.get(imageSrc, { responseType: 'blob' });
    formData.append('file', imgData.data);
    formData.append('userId', userId);
    try {
      const response = await axios.post(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if (response.status === 202) {
        alert('업로드되었습니다.');
        const data = response.data;
        setResImageSrc(
          process.env.REACT_APP_IMAGE_API_URL + '/result/' + data.resultPath
        );

        let txt = '';

        let dogRes = data.result.some(
          (res) => res === '핏불' || res === '불독'
        );
        if (dogRes)
          txt =
            '입마개가 필요한 견종(핏불, 불독 등)입니다. 입마개 착용후 공원 입장해주시기 바랍니다.';
        else txt = '해당 견종은 안전한 견종입니다.';

        setImageData((prev) => ({
          ...prev,
          userId,
          originPath: data.originPath,
          resultPath: data.resultPath,
          result: data.result,
        }));
        setResImageTxt(txt);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
      handleShow();
    }
  };

  const handleIconClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleImageChange = (fileBlob) => {
    const reader = new FileReader();
    reader.readAsDataURL(fileBlob);
    return new Promise((resolve) => {
      reader.onload = () => setImageSrc(reader.result);
      resolve();
    });
  };

  const handleEntry = async (e) => {
    e.preventDefault();
    const url = process.env.REACT_APP_OTHER_API_URL + '/file';
    try {
      const response = await axios.post(url, JSON.stringify(imageData), {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log(response);
    } catch (err) {
      console.error(err);
    } finally {
      handleClose();
      window.location.href = '/park';
    }
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>검식 결과</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{resImageTxt && resImageTxt}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='outline-success' onClick={handleEntry}>
            공원 입장하기
          </Button>
          <Button variant='secondary' onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <Container>
        <Row className='justify-content-md-center'>
          <Col style={colStyle} xs='5'>
            <h5 style={{ textAlign: 'center' }}>이미지 미리보기</h5>
            <div style={imageBoxStyle}>
              {imageSrc ? (
                <img
                  src={imageSrc}
                  alt='preview'
                  style={imageInputStyle}
                  onClick={handleIconClick}
                />
              ) : (
                <img
                  style={iconStyle}
                  src={photo}
                  alt='icon'
                  onClick={handleIconClick}
                ></img>
              )}
            </div>
          </Col>
          <Col
            md='auto'
            style={{
              margin: 'auto 0',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <img
              style={{ width: '60px', margin: '0 auto 20px ' }}
              src={arrow}
              alt='right-arrow'
            />
            <Button variant='primary' type='button' onClick={handleSubmit}>
              업로드하기
            </Button>
          </Col>
          <Col style={colStyle} xs='5'>
            <h5 style={{ textAlign: 'center' }}>검사 결과</h5>
            <div style={imageBoxStyle}>
              {isLoading ? (
                <Spinner animation='border' role='status'>
                  <span className='visually-hidden'>Loading...</span>
                </Spinner>
              ) : (
                resImageSrc && (
                  <img src={resImageSrc} alt='resultview' style={imageStyle} />
                )
              )}
            </div>
          </Col>
        </Row>
      </Container>

      <input
        ref={fileInputRef}
        type='file'
        accept='image/jpeg'
        name='file'
        hidden
        onChange={(e) => handleImageChange(e.target.files[0])}
      />
    </div>
  );
}

export default ImageInput;
