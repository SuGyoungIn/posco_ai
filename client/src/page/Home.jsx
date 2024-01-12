import React, {useEffect, useState} from 'react';
import Header from "../components/Header";
import ImageInput from '../components/ImageInput';

import 'bootstrap/dist/css/bootstrap.min.css';
import Topbar from "./global/Topbar";
import {MyProSidebarProvider} from "./global/sidebar/sidebarContext";
import Box from "@mui/material/Box";

const divStyle = {
    height: '80vh',
    margin: '0 auto',
    paddingTop: '30px',
};

function Home(props) {
    useEffect(() => {
        const user = localStorage.getItem('user');
        if (user == null) {
            window.location.href = '/login';
        }
    }, []);
    return (
        <Box m="20px">
            <div>
                <Header title="공원 입장 페이지" subtitle="반려동물을 찍어 입장 해주시기 바랍니다."/>

                <div style={divStyle}>
                    <ImageInput/>
                </div>
            </div>
        </Box>
    );
}

export default Home;
