import React from 'react';
import {Routes, Route, Navigate} from 'react-router-dom';
import {SocketManager} from './components/SocketManager';
import Home from './page/Home';
import AdminHome from './page/dashboard/AdminHome';
import Park from './page/Park';
import Login from './page/Login';
import Signup from './page/Signup';
import Topbar from './page/global/Topbar';
import {ColorModeContext, useMode} from './theme';
import {CssBaseline, ThemeProvider} from '@mui/material';
import {MyProSidebarProvider} from './page/global/sidebar/sidebarContext';
import CustomHome from './page/custom/CustomHome';

const App = () => {
    const [theme, colorMode] = useMode();
    const role = JSON.parse(localStorage.getItem('user'))?.role;
    return (
        <div className='App'>
            <SocketManager/>
            {role === 1 ? (
                <ColorModeContext.Provider value={colorMode}>
                    <ThemeProvider theme={theme}>
                        <CssBaseline/>
                        <MyProSidebarProvider>
                            <div style={{height: '100%', width: '100%'}}>
                                <main>
                                    <Topbar/>
                                    <Routes>
                                        <Route
                                            path='/'
                                            element={<Navigate to='/admin/home' replace/>}
                                        />
                                        <Route path='/admin/home' element={<AdminHome/>}></Route>
                                        <Route
                                            path='/admin/custom'
                                            element={<CustomHome/>}
                                        ></Route>
                                        <Route
                                            path='/admin/parkInfo'
                                            element={<AdminHome/>}
                                        ></Route>
                                    </Routes>
                                </main>
                            </div>
                        </MyProSidebarProvider>
                    </ThemeProvider>
                </ColorModeContext.Provider>
            ) : role === 2 ? (
                <ColorModeContext.Provider value={colorMode}>
                    <ThemeProvider theme={theme}>
                        <CssBaseline/>
                        <MyProSidebarProvider>
                            <div style={{height: '100%', width: '100%'}}>
                                <main>
                                    <Topbar/>
                                    <Routes>
                                        <Route path='/' element={<Home/>}></Route>
                                        <Route path='/park' element={<Park/>}></Route>
                                    </Routes>
                                </main>
                            </div>
                        </MyProSidebarProvider>
                    </ThemeProvider>
                </ColorModeContext.Provider>
            ) : (
                <div style={{height: '100%', width: '100%'}}>
                    <main>
                        <Routes>
                            <Route path='/' element={<Navigate to='/login' replace/>}/>
                            <Route path='/login' element={<Login/>}></Route>
                            <Route path='/signup' element={<Signup/>}></Route>
                        </Routes>
                    </main>
                </div>
            )}
        </div>
    );
};

export default App;
