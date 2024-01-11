import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {tokens} from "../theme";
import {useTheme} from "@mui/material";
import CircleIcon from '@mui/icons-material/Circle';

function createData(name, max, cur) {
    let ratio = cur / max;
    let color ="";
    let text = "";
    if(ratio <= 0.3) {
        color = "green";
        text = "원할";
    } else if(ratio <= 0.7) {
        color = "yellow";
        text = "혼잡";
    } else {
        color = "red";
        text = "복잡";
    }

    return { name, max, cur, color, text };
}

const rows = [
    createData('입구', 20, 6.0),
    createData('중앙광장', 40, 9),
    createData('오솔길', 30, 16),
    createData('1번 산책로', 30, 27),
    createData('2번 산책로', 30, 16),
];

export default function ParkInfoTable() {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell sx={{ fontSize: "26px" }}>장소 명</TableCell>
                        <TableCell sx={{ fontSize: "26px" }} align="right">적정 인원수</TableCell>
                        <TableCell sx={{ fontSize: "26px" }} align="right">현재 인원수</TableCell>
                        <TableCell sx={{ fontSize: "26px" }} align="right">혼잡도</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow
                            key={row.name}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell sx={{ fontSize: "16px" }} component="th" scope="row">
                                {row.name}
                            </TableCell>
                            <TableCell sx={{ fontSize: "16px" }} align="right">{row.max}</TableCell>
                            <TableCell sx={{ fontSize: "16px" }} align="right">{row.cur}</TableCell>
                            <TableCell sx={{ fontSize: "16px", color: row.color}} align="right">
                                <CircleIcon sx={{marginRight: "5px"}}/>{row.text}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
