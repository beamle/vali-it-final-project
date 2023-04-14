import Navigation from "../header/Navigation";
import { useNavigate, useParams } from "react-router-dom";
import React from "react";
import GoogleMaps from "../GoogleMaps";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";

export function SelectedService({ props }) {
    const navigate = useNavigate();
    const { companyId } = useParams();

    // Find the object with matching companyId
    const selectedTimestamp = props.filter((item) => item.id === companyId)[0];

    // Access the object data
    const {
        serviceName,
        id,
        email,
        name,
        description,
        imgSrc,
        tDescription,
        Location,
        startTime,
        endTime,
        Service_type,
        eImg,
    } = selectedTimestamp;

    // Translating seconds to millisecond, removing last 00 from timestamp
    const formatTimestamp = (seconds) => {
        const date = new Date(seconds * 1000);
        const timestamp = date.toLocaleString();
        const time = timestamp.slice(
            timestamp.indexOf(",") + 2,
            timestamp.indexOf(",") + 7
        );
        return `${timestamp.slice(0, timestamp.indexOf(","))}, ${time}`;
    };

    return (
        <div>
            <Navigation />
            <Grid container spacing={2} justifyContent="center" mt={2}>
                <Grid item xs={12} md={8}>
                    <Card sx={{ display: "flex" }}>
                        <CardContent sx={{ flex: 1 }}>
                            <Typography gutterBottom variant="h4" component="h2">
                                {serviceName}
                            </Typography>
                            <p> <strong>Provider:</strong> {name} </p>
                            <img src={eImg}/>
                            <p>About {name}: {description}</p>
                            <p> <strong>Service:</strong> {serviceName}</p>
                            <p> {tDescription} </p>
                            <p> <strong>Email:</strong> {email} </p>
                            <p> <strong>Start Time:</strong> {formatTimestamp(startTime.seconds)} </p>
                            <p> <strong>End Time:</strong> {formatTimestamp(endTime.seconds)} </p>

                            <Button
                                sx={{ m: "25px 0 50px", backgroundColor: '#F397D6', color: 'white', '&:hover': { backgroundColor: '#B8B8F3' } }}
                                variant="contained"
                                onClick={() => navigate(`/selectedService/${id}/${serviceName}`)}
                            >
                                Book Now
                            </Button>

                            <GoogleMaps props={Location} />
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

        </div>
    );
}
