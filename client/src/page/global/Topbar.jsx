import React, {useContext, useState} from "react";
import {ColorModeContext, tokens} from "../../theme";
import {Box, IconButton, useTheme} from "@mui/material";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import {useProSidebar} from "react-pro-sidebar";


const Topbar = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const colorMode = useContext(ColorModeContext);
    const {toggleSidebar, broken, rtl} = useProSidebar();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const logout = () => {

        localStorage.removeItem('user');
        alert('로그아웃 되었습니다.');
        window.location.href = '/login';
    };
    return (
        <Box display="flex" justifyContent="space-between" p={2}>
            <Box display="flex">
                {broken && !rtl && (
                    <IconButton
                        sx={{margin: "0 6 0 2"}}
                        onClick={() => toggleSidebar()}
                    >
                        <MenuOutlinedIcon/>
                    </IconButton>
                )}
            </Box>
            <Box display="flex">
                <IconButton onClick={colorMode.toggleColorMode}>
                    {theme.palette.mode === "dark" ? (
                        <LightModeOutlinedIcon/>
                    ) : (
                        <DarkModeOutlinedIcon/>
                    )}
                </IconButton>
                <IconButton>
                    <PersonOutlinedIcon
                        aria-controls={open ? 'basic-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick}
                    />
                    <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                            'aria-labelledby': 'basic-button',
                        }}
                    >
                        <MenuItem onClick={logout}>Logout</MenuItem>
                    </Menu>
                </IconButton>
                {broken && rtl && (
                    <IconButton
                        sx={{margin: "0 6 0 2"}}
                        onClick={() => toggleSidebar()}
                    >
                        <MenuOutlinedIcon/>
                    </IconButton>
                )}
            </Box>
        </Box>
    );
};

export default Topbar;
