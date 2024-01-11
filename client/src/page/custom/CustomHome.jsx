import React, {useState, useEffect} from "react";
import axios from "axios";
import Detail from "../../components/Detail";
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Grid from "@mui/material/Unstable_Grid2";
import {Typography, useMediaQuery, useTheme} from "@mui/material";
import {tokens} from "../../theme";
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

const divStyle = {
    display: "flex",
    justifyContent: "space-between",
};

function renderRow(props) {
    const {index, style} = props;

    return (
        <ListItem style={style} key={index} component="div" disablePadding>
            <ListItemButton>
                <ListItemText primary={`Item ${index + 1}`}/>
            </ListItemButton>
        </ListItem>
    );
}

function CustomHome(props) {
    const theme = useTheme();
    const smScreen = useMediaQuery(theme.breakpoints.up("sm"));
    const colors = tokens(theme.palette.mode);
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
        let originalDate = new Date(createdAt);
        return `${originalDate.getFullYear()}-${(originalDate.getMonth() + 1).toString().padStart(2, '0')}-${originalDate.getDate().toString().padStart(2, '0')} ${originalDate.getHours().toString().padStart(2, '0')}:${originalDate.getMinutes().toString().padStart(2, '0')}:${originalDate.getSeconds().toString().padStart(2, '0')}`;
    };

    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event, newPage) => {
        setCurrentPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setCurrentPage(0);
    };

    const columns = [
        { id: 'userId', label: '유저정보', minWidth: 10 },
        { id: 'result', label: '견종', minWidth: 200 },
        { id: 'createdAt', label: 'createdDate', minWidth: 10 },
    ];

    return (
        <Box m="20px">
            <Grid container rowSpacing={1} columnSpacing={{xs: 1, sm: 2, md: 3}}>
                <Grid xs={12} sm={6} md={6} lg={6} xl={6}>
                    <Typography
                        variant="h1"
                        fontWeight="600"
                        color={colors.grey[100]}
                        sx={{ marginBottom: "10px" }}
                    >고객 목록</Typography>
                    <Box
                        width="100%"
                        backgroundColor={colors.primary[400]}
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                    >
                        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                            <TableContainer sx={{ maxHeight: 440 }}>
                                <Table stickyHeader aria-label="sticky table">
                                    <TableHead>
                                        <TableRow>
                                            {columns.map((column) => (
                                                <TableCell
                                                    key={column.id}
                                                    align={column.align}
                                                    style={{ minWidth: column.minWidth }}
                                                >
                                                    {column.label}
                                                </TableCell>
                                            ))}
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {dataList
                                            .slice(currentPage * rowsPerPage, currentPage * rowsPerPage + rowsPerPage)
                                            .map((row) => {
                                                return (
                                                    <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                                        {columns.map((column) => {
                                                            const value = row[column.id];
                                                            return (
                                                                <TableCell
                                                                    key={column.id}
                                                                    align={column.align}
                                                                    onClick={() => setSelectedData(row)}
                                                                >
                                                                    {column.format && typeof value === 'number'
                                                                        ? column.format(value)
                                                                        : column.id === 'createdAt' ? formatCreatedAt(value) : value}
                                                                </TableCell>
                                                            );
                                                        })}
                                                    </TableRow>
                                                );
                                            })}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            <TablePagination
                                rowsPerPageOptions={[10]}
                                component="div"
                                count={10*(lastPage) + dataList.length}
                                rowsPerPage={rowsPerPage}
                                page={currentPage}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                            />
                        </Paper>
                    </Box>
                </Grid>
                <Grid xs={12} sm={6} md={6} lg={6} xl={6}>
                    <Typography
                        variant="h1"
                        fontWeight="600"
                        color={colors.grey[100]}
                        sx={{ marginBottom: "10px" }}
                    >사진 정보</Typography>
                    <Box
                        width="100%"
                        backgroundColor={colors.primary[400]}
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                    >
                        {selectedData && (
                            <Detail
                                key={selectedData.resultPath}
                                data={selectedData}
                                onClose={handleCloseDetail}
                            />
                        )}
                    </Box>
                </Grid>
            </Grid>

        </Box>
    );
}

export default CustomHome;
