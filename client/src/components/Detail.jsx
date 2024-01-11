import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

const detailStyle = {
  backgroundColor: "#DCDCDC",
  padding: "10px",
  height: "500px", // 세로 크기
  width: "400px", // 가로 크기
};

const rightAlignStyle = {
  textAlign: "right",
};

const imageBoxStyle = {
  width: "380px",
  height: "400px",
  border: "1px solid #ddd",
  justifyContent: "center",
  alignItems: "center",
};

const imageStyle = {
  width: "320px",
  height: "320px",
  objectFit: "contain",
  backgroundColor: "#DCDCDC",
};

const buttonStyle = {
  margin: "10px",
};

const formatCreatedAt = (createdAt) => {
  if (createdAt) {
    return createdAt.slice(0, 10); // "2024-01-06"까지만 추출
  }
  return ""; // 또는 다른 기본값을 반환할 수 있습니다.
};

function Detail({ data, onClose }) {
  const [resImageSrc, setResImageSrc] = useState("");
  const [resImageTxt, setResImageTxt] = useState("");
  const [imageData, setImageData] = useState({
    originPath: "",
    resultPath: "",
    result: [],
  });

  const userId = JSON.parse(localStorage.getItem("user"))?.userId;

  useEffect(() => {
    callImageAPI(data.imageData);
  }, []);

  const callImageAPI = async (imageData) => {
    const url =
      process.env.REACT_APP_IMAGE_API_URL + "/result/" + data.resultPath;
    const formData = new FormData();
    formData.append("imageData", imageData);

    try {
      const response = await axios.get(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (response.status === 200) {
        setResImageSrc(
          process.env.REACT_APP_IMAGE_API_URL + "/result/" + data.resultPath
        );

        let txt = "";
        const newArr = [...new Set(data.result)];
        for (let i = 0; i < newArr.length; i++) {
          txt += data.result[i] + " ";
        }
        setImageData((prev) => ({
          ...prev,
          userId,
          originPath: data.originPath,
          resultPath: data.resultPath,
          result: data.result,
        }));
        setResImageTxt(txt);
      }
    } catch (error) {
      console.error(error);
    }
  };
  console.log(data)
  return (
    <div style={detailStyle}>
      <h4>user_id: {data.userId}</h4>
      <hr />
      <p style={rightAlignStyle}>{formatCreatedAt(data.createdAt)}</p>
      <div style={imageBoxStyle}>
        {resImageSrc && (
          <img src={resImageSrc} alt="resultview" style={imageStyle} />
        )}
        <p>{resImageTxt && resImageTxt}</p>
      </div>
    </div>
  );
}

export default Detail;
