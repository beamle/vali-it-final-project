import * as React from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import Toolbar from "@mui/material/Toolbar";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import {useState} from "react";


function Navigation() {
    const [searchData, setSearchData] = useState('');


    return (
        <Box>
            <AppBar elevation={0} position="static" sx={{backgroundColor: '#B8B8F3'}}>
                <Toolbar sx={{display: 'flex', justifyContent: 'center'}}>
                    <IconButton sx={{ justifyContent: 'flex-start' }}><img src="./headerPictures/BeautyFinderLogo.png" width={'75px'} alt="logo"/></IconButton>
                    <IconButton size="large"
                                sx={{ mr: 2 }}
                    />
                    {/*Search input*/}
                    <Paper
                        className="searchInput"
                        component="form"
                        sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400}}
                    >
                        <InputBase
                            sx={{ ml: 1, flex: 1 }}
                            placeholder="Search by location/service/time"
                            // inputProps={{ 'aria-label': 'search' }}
                            onChange={event => setSearchData(event.target.value)}
                            value = {searchData}
                        />
                        <IconButton type="button" sx={{ p: '12px' }} aria-label="search"> <SearchIcon/> </IconButton>
                    </Paper>
                    {/*End of search input*/}
                    <IconButton/>
                </Toolbar>
            </AppBar>
        </Box>
    );
}

export default Navigation;