import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Navbar, Button} from 'react-bootstrap';
import {Box, Typography, useTheme} from "@mui/material";
import {tokens} from "../theme";

function HeaderInfo(props) {
    const nickName = JSON.parse(localStorage.getItem('user'))?.nickname;
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const logout = () => {

        localStorage.removeItem('user');
        alert('로그아웃 되었습니다.');
        window.location.href = '/login';
    };
    return (
        <Box mb="30px">
            <Typography
                variant="h2"
                color={colors.grey[100]}
                fontWeight="bold"
                sx={{mb: "5px"}}
            >
            </Typography>
            <Typography variant="h5" color={colors.greenAccent[400]}>
                <Navbar.Text>{nickName && <p>{nickName} 님</p>}</Navbar.Text>
                <Button variant='outline-secondary' onClick={() => logout()}>
                    로그아웃
                </Button>
            </Typography>
        </Box>
    );
}

export default HeaderInfo;
