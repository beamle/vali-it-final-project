import React, { useContext, useEffect, useRef, useState } from "react";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from '@mui/material/Grid';
import { styled } from "@mui/material/styles";
import Navigation from "../../header/Navigation";
import { useNavigate } from "react-router-dom";


function SortedFirms({ props }) {

    const navigate = useNavigate();

    // const fullData = useContext(FullData);

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === "dark" ? "#B8B8F3" : "#fff",
        ...theme.typography.body2,
        padding: theme.spacing(2),
        textAlign: "center",
        color: '#232E21',
        height: "450px",
        overflow: "auto",
        position: 'relative', // Set position relative to enable absolute positioning for ::before pseudo-element
        '&::before': { // Add a ::before pseudo-element
            content: '""',
            position: 'absolute',
            bottom: 0, // Position it at the bottom of the component
            left: 0, // Position it at the left of the component
            borderLeft: '20px solid transparent', // Add a left border
            borderBottom: '20px solid #B8B8F3', // Add a bottom border with blue color
            transform: 'rotate(90deg)',
        }
    }));


    const [maxHeight, setMaxHeight] = useState(0);
    const paperRefs = useRef([]);

    useEffect(() => {
        // Find the maximum height of all papers
        let newMaxHeight = 0;
        paperRefs.current.forEach((ref) => {
            const height = ref.offsetHeight;
            newMaxHeight = Math.max(newMaxHeight, height);
        });
        setMaxHeight(newMaxHeight);
    }, [props]);

    // Translating seconds to millisecond, removing last 00 from timestamp
    const formatTimestamp = (seconds) => {
        const date = new Date(seconds * 1000);
        const timestamp = date.toLocaleString();
        const time = timestamp.slice(timestamp.indexOf(',') + 2, timestamp.indexOf(',') + 7);
        return `${timestamp.slice(0, timestamp.indexOf(','))}, ${time}`;
    }

    return (
        <div>
            <Navigation />
            <Box sx={{ flexGrow: 1, width: '100%' }}>
                <Grid container rowSpacing={2} wrap="wrap">
                    {props && props.map((prop, index) => (
                        <Grid key={index} item xs={12} sm={6} md={4}>
                            <Item elevation={1} ref={(ref) => paperRefs.current[index] = ref}>
                                <img onClick={() => navigate('selectedService/' + prop.companyId)} src={prop.imgSrc}
                                     width="50%" style={{ cursor: 'pointer',  borderRadius: '100%' }} />
                                <h3>{prop.companyName}</h3>
                                <p> {prop.Description}</p>
                                <p> <strong>About this service: </strong> {prop.serviceName}</p>
                                <p> <strong> At </strong> {formatTimestamp(prop.startTime.seconds)}</p>
                            </Item>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </div>
    );
}

export default SortedFirms;
