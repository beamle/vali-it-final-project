import React, {useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import Input from "@mui/material/Input";
import Box from "@mui/material/Box";
import TextField from '@mui/material/TextField';
import Button from "@mui/material/Button";
import axios from 'axios';
import emailjs from 'emailjs-com';
import Dialog from '@mui/material/Dialog';
import {styled} from "@mui/material/styles";

const BookingBox = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '2rem',
    borderRadius: '1rem',
    backgroundColor: '#afafaf0f',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    margin: '50px',
    textAlign: 'center',
});


const Booking = ({props}) => {
    const navigate = useNavigate();

    const [openDialog, setOpenDialog] = useState(false);
    const handleOpenDialog = () => {
        setOpenDialog(true);
    };
    const handleCloseDialog = () => {
        setOpenDialog(false);
    };



    const {companyId} = useParams();

    // Find the object with matching companyId
    const selectedService = props.filter((item) => item.id === companyId)[0];

    // Access the object data
    const {eImg, serviceName, email, name, description, imgSrc, tDescription, Location, startTime, endTime} = selectedService;


    const formatTimestamp = (seconds) => {
        const date = new Date(seconds * 1000);
        const timestamp = date.toLocaleString();
        const time = timestamp.slice(timestamp.indexOf(',') + 2, timestamp.indexOf(',') + 7);
        return `${timestamp.slice(0, timestamp.indexOf(','))}, ${time}`;
    }

    // State for storing the input values
    const [inputValues, setInputValues] = useState({
        email: '',
        name: '',
        message: `It is a confirmation that your booking at ${formatTimestamp(startTime.seconds)} was succesfull`
    });

    // Event handler for updating the state when the inputs change
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setInputValues(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleButtonClick = (inputValues) => {
        emailjs.send(
            'service_aviqekk', // service ID
            'template_m6v1c23', //  template ID
            {
                from_name: inputValues.name,
                reply_to: inputValues.email,
                message: inputValues.message
            },
            'xs0E2JRZ2hdR5Z6Bt' // userId = public key
        )
            .then((response) => {
                console.log('SUCCESS!', response.status, response.text);
                handleOpenDialog();
            })
            .catch((error) => {
                console.log('FAILED...', error);
            });
    }

    return (
        <BookingBox>
            <h2>Booking</h2>
            <img src={eImg}/>
            <p>I am {name}!</p>
            <p>The service is going to be <strong>{serviceName}</strong></p>
            <p> at {formatTimestamp(startTime.seconds)}</p>
            <Box
                component="form"
                sx={{ m: 6, width: '75%' }}
            >
                <TextField id="email" name="email" label="Email" variant="outlined" value={inputValues.email} onChange={handleInputChange} />
                <TextField id="name" name="name" label="Name" variant="outlined" value={inputValues.name} onChange={handleInputChange} /> <br/>
                <Button sx={{ backgroundColor: '#B8B8F3', color: 'white', '&:hover': { backgroundColor: '#F397D6' }, margin: '25px 25px 0 0'}} onClick={() => handleButtonClick(inputValues)}>Confirm booking</Button>
                <Button sx={{ backgroundColor: '#F5F5F5', color: 'black', '&:hover': { backgroundColor: '#E5E5E5' }, marginTop: '25px' }} onClick={() => navigate(-1)}>Go back</Button>
            </Box>
            <Dialog open={openDialog} onClose={handleCloseDialog}>
                <Box sx={{ p: 2 }}>
                    <h2 style={{ marginBottom: '1rem' }}>Booking Confirmation</h2>
                    <p style={{ marginBottom: '1rem' }}>Your booking at {formatTimestamp(startTime.seconds)} was successful.</p>
                    <Button sx={{ backgroundColor: '#6699CC', color: 'white', '&:hover': { backgroundColor: '#507896' }, marginRight: '1rem' }} onClick={handleCloseDialog}>Close</Button>
                    <Button sx={{ backgroundColor: '#F5F5F5', color: 'black', '&:hover': { backgroundColor: '#E5E5E5' } }} onClick={() => navigate(-2)}>Go back</Button>
                </Box>
            </Dialog>
        </BookingBox>
    );





};

export default Booking;
