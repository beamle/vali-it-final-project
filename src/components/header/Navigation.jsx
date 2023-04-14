import * as React from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import Toolbar from "@mui/material/Toolbar";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import {useState} from "react";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Button from "@mui/material/Button";
import {useNavigate} from "react-router-dom";

function Navigation() {
    const [searchData, setSearchData] = useState('');
    const navigate = useNavigate();

    return (
        <Box mb={2}>
            <AppBar elevation={2} position="static" sx={{backgroundColor: '#B8B8F3'}}>
                <Toolbar sx={{display: 'flex', justifyContent: 'center'}}>
                    <IconButton sx={{ justifyContent: 'flex-start' }}>
                        <LocationOnIcon sx={{ fontSize: 35 }} />
                    </IconButton>
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
                            onChange={event => setSearchData(event.target.value)}
                            value={searchData}
                        />
                        <IconButton type="button" sx={{ p: '12px' }} aria-label="search">
                            <SearchIcon />
                        </IconButton>
                    </Paper>
                    <Button
                        sx={{ m: "0 25px", backgroundColor: '#F397D6', color: 'white', '&:hover': { backgroundColor: '#B8B8F3' } }}
                        variant="contained"
                        onClick={() => navigate(`/auth`)}
                    >
                        add timeslot
                    </Button>
                    {/*End of search input*/}
                    <IconButton />
                </Toolbar>
            </AppBar>
        </Box>
    );
}

export default Navigation;
