import React, {useState} from 'react';
import {signOut} from "firebase/auth";
import {auth} from "../../config/firebase";
import Box from "@mui/material/Box";
import {FormControl, InputLabel, MenuItem, Select} from "@mui/material";

const AddTimeslot = () => {
    const [error, setError] = useState('');

    const logOut = async () => {
        try {
            await signOut(auth);
        } catch (err) {
            setError(err.message);
            console.log(err);
        }
    }

    const [age, setAge] = React.useState('');

    const handleChange = (event) => {
        setAge(event.target.value);
    };

    return (
        <div>
            <h1>Logged in</h1>
            <button onClick={logOut}>Logout</button>
            <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Age</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={age}
                        label="Age"
                        onChange={handleChange}
                    >
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                </FormControl>
            </Box>
            {error && <p>{error}</p>}
        </div>
    );
};

export default AddTimeslot;
