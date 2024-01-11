import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import axios from "axios";
import Detail from "../../components/Detail";
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { FixedSizeList } from 'react-window';

const divStyle = {
  display: "flex",
  justifyContent: "space-between",
};

function renderRow(props) {
  const { index, style } = props;

  return (
      <ListItem style={style} key={index} component="div" disablePadding>
        <ListItemButton>
          <ListItemText primary={`Item ${index + 1}`} />
        </ListItemButton>
      </ListItem>
  );
}

function CustomHome(props) {
  const [dataList, setDataList] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [lastPage, setLastPage] = useState(0);
  const [selectedData, setSelectedData] = useState(null);

  useEffect(() => {
    const user = localStorage.getItem("user");
    getEntry(currentPage);
    if (user == null) {
      window.location.href = "/login";
    }
  }, []);

  const getEntry = async (page) => {
    const url = process.env.REACT_APP_OTHER_API_URL + `/file?page=${page}`;
    try {
      const response = await axios.get(url);
      setDataList(response.data.data);
      setLastPage(response.data.pageInfo.totalPages - 1);
      console.log(response.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handlePreviousPage = () => {
    setCurrentPage(currentPage - 1);
    getEntry(currentPage - 1);
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
    getEntry(currentPage + 1);
  };

  const handleShowDetail = (data) => {
    setSelectedData(data);
    console.log(data);
  };

  const handleCloseDetail = () => {
    setSelectedData(null);
  };

  const formatCreatedAt = (createdAt) => {
    if (createdAt) {
      return createdAt.slice(0, 10); // "2024-01-06"까지만 추출
    }
    return ""; // 또는 다른 기본값을 반환할 수 있습니다.
  };

  const renderDataList = () => {
    if (dataList.length > 0) {
      return dataList.map((data, index) => (
        <tr key={index}>
          <td>{currentPage * 10 + index + 1}</td>
          <td>{data.userId}</td>
          <td>{formatCreatedAt(data.createdAt)}</td>
          <td>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => handleShowDetail(data)}
            >
              상세보기
            </button>
          </td>
        </tr>
      ));
    } else {
      return (
        <tr>
          <td colSpan={4}>데이터가 없습니다.</td>
        </tr>
      );
    }
  };

  return (
    <div>
      <div style={divStyle}>
        <div style={{ width: "60%", marginRight: "25px" }}>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>userId</th>
                <th>createdDate</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>{renderDataList()}</tbody>
          </Table>
          <ul className="pagination mt-3 d-flex justify-content-center">
            <li className={`page-item ${currentPage === 0 ? "disabled" : ""}`}>
              <a className="page-link" href="#" onClick={handlePreviousPage}>
                &lt;
              </a>
            </li>
            <li
              className={`page-item ${
                currentPage === lastPage ? "disabled" : ""
              }`}
            >
              <a className="page-link" href="#" onClick={handleNextPage}>
                &gt;
              </a>
            </li>
          </ul>
        </div>
        {selectedData && (
          <div style={{ width: "40%" }}>
            <Detail
              key={selectedData.resultPath}
              data={selectedData}
              onClose={handleCloseDetail}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default CustomHome;
