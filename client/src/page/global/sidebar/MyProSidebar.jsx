// docs https://github.com/azouaoui-med/react-pro-sidebar
import {useState} from "react";
import {Menu, MenuItem, Sidebar, useProSidebar} from "react-pro-sidebar";

import {useSidebarContext} from "./sidebarContext";

import {Link} from "react-router-dom";
import {tokens} from "../../../theme";
import {Box, IconButton, Typography, useTheme} from "@mui/material";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import SwitchRightOutlinedIcon from "@mui/icons-material/SwitchRightOutlined";
import SwitchLeftOutlinedIcon from "@mui/icons-material/SwitchLeftOutlined";

const Item = ({ title, to, icon, selected, setSelected }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    return (
        <MenuItem
            active={selected === title}
            style={{ color: colors.grey[100] }}
            onClick={() => setSelected(title)}
            icon={icon}
            routerLink={<Link to={to} />}
        >
            <Typography>{title}</Typography>
        </MenuItem>
    );
};

const MyProSidebar = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [selected, setSelected] = useState("Dashboard");
    const { sidebarRTL, setSidebarRTL, sidebarImage } = useSidebarContext();
    const { collapseSidebar, toggleSidebar, collapsed, broken } = useProSidebar();
    const nickname = JSON.parse(localStorage.getItem('user'))?.nickname;
    return (
        <Box
            sx={{
                position: "sticky",
                display: "flex",
                height: "100vh",
                top: 0,
                bottom: 0,
                zIndex: 10000,
                "& .sidebar": {
                    border: "none",
                },
                "& .menu-icon": {
                    backgroundColor: "transparent !important",
                },
                "& .menu-item": {
                    // padding: "5px 35px 5px 20px !important",
                    backgroundColor: "transparent !important",
                },
                "& .menu-anchor": {
                    color: "inherit !important",
                    backgroundColor: "transparent !important",
                },
                "& .menu-item:hover": {
                    color: `${colors.blueAccent[500]} !important`,
                    backgroundColor: "transparent !important",
                },
                "& .menu-item.active": {
                    color: `${colors.greenAccent[500]} !important`,
                    backgroundColor: "transparent !important",
                },
            }}
        >
            <Sidebar
                breakPoint="md"
                rtl={sidebarRTL}
                backgroundColor={colors.primary[400]}
                image={sidebarImage}
            >
                <Menu iconshape="square">
                    <MenuItem
                        icon={
                            collapsed ? (
                                <MenuOutlinedIcon onClick={() => collapseSidebar()} />
                            ) : sidebarRTL ? (
                                <SwitchLeftOutlinedIcon
                                    onClick={() => setSidebarRTL(!sidebarRTL)}
                                />
                            ) : (
                                <SwitchRightOutlinedIcon
                                    onClick={() => setSidebarRTL(!sidebarRTL)}
                                />
                            )
                        }
                        style={{
                            margin: "10px 0 20px 0",
                            color: colors.grey[100],
                        }}
                    >
                        {!collapsed && (
                            <Box
                                display="flex"
                                justifyContent="space-between"
                                alignItems="center"
                                ml="15px"
                            >
                                <Typography variant="h4" color={colors.grey[100]}>
                                    관리자 페이지
                                </Typography>
                                <IconButton
                                    onClick={
                                        broken ? () => toggleSidebar() : () => collapseSidebar()
                                    }
                                >
                                    <CloseOutlinedIcon />
                                </IconButton>
                            </Box>
                        )}
                    </MenuItem>
                    {!collapsed && (
                        <Box mb="25px">
                            <Box
                                display="flex"
                                justifyContent="center"
                                alignItems="center"
                                sx={{
                                    "& .avater-image": {
                                        backgroundColor: colors.primary[500],
                                    },
                                }}
                            >
                                <img
                                    className="avater-image"
                                    width="100"
                                    height="100"
                                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShN0nuLT7HIpIANuDi6wbMKpeuCgZsl2PtAA&usqp=CAU"
                                    style={{ cursor: "pointer", borderRadius: "50%" }}
                                />
                            </Box>
                            <Box textAlign="center">
                                <Typography
                                    variant="h3"
                                    color={colors.grey[100]}
                                    fontWeight="bold"
                                    sx={{ m: "10px 0 0 0" }}
                                >
                                    {nickname}
                                </Typography>
                            </Box>
                        </Box>
                    )}
                    <Box paddingLeft={collapsed ? undefined : "10%"}>
                        <Item
                            title="대시보드"
                            to="/"
                            icon={<HomeOutlinedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />

                        <Typography
                            variant="h6"
                            color={colors.grey[300]}
                            sx={{ m: "15px 20px 5px 20px" }}
                        >
                            Data
                        </Typography>
                        <Item
                            title="고객 입장정보"
                            to="/admin/custom"
                            icon={<PeopleOutlinedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />
                        <Item
                            title="공원 상황정보"
                            to="/admin/parkInfo"
                            icon={<ContactsOutlinedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />
                        <Typography
                            variant="h6"
                            color={colors.grey[300]}
                            sx={{ m: "15px 20px 5px 20px" }}
                        >
                        </Typography>
                    </Box>
                </Menu>
            </Sidebar>
        </Box>
    );
};

export default MyProSidebar;
