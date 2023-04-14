import React,{useState} from "react";
import {auth, db} from "../../config/firebase";
import {collection, addDoc} from "firebase/firestore"
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

function AddTimeslotContent({authUserId, companyId}) {

    console.log(companyId, "companyId in KASPAR")

    const [newEndTime, setNewEndTime] = useState({});
    const [newServiceName, setNewServiceName] = useState("");
    const [newStartTime, setNewStartTime] = useState({});
    const [newTimeslotDescription, setNewTimeslotDescription] = useState("");

    // const companiesCollectionRef = collection(db, "time_slots");

    const onSubmitFreeSlot = async () => {
        if (companyId) {
            try {
                const docRef = await addDoc(collection(db, 'time_slots'), {
                    companyId: companyId,
                    description: newTimeslotDescription,
                    employeeId: "Kas", // or set the employee id here
                    endTime: newEndTime,
                    serviceName: newServiceName,
                    startTime: newStartTime,
                    userId: auth.currentUser.uid,
                });
                console.log('Document written with ID: ', docRef.id);
                window.location.reload(false);
            } catch (err) {
                console.error(err);
            }
        }
    };



    return (
        <Grid
            container
            direction="column"
            justifyContent="space-between">
            <Grid>
                <Typography id="transition-modal-title" variant="h6" component="h2">
                    Add new time slot
                </Typography>
            </Grid>
            <br/>
            <Grid><TextField fullWidth id="serviceName" label="Service name" variant="standard" onChange={(e) => setNewServiceName(e.target.value)}/></Grid>
            <br/>
            <Grid><TextField multiline fullWidth id="salonDescription" label="Service description" variant="standard" onChange={(e) => setNewTimeslotDescription(e.target.value)}/></Grid>
            <br/>
            <br/>
            <Grid>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateTimePicker
                        label="Pick 1-hour free slot date and time"
                        defaultValue={(dayjs(new Date()))}
                        minDateTime={(dayjs(new Date()))}
                        minutesStep={15}
                        minTime="7:00"
                        maxTime="23:00"
                        sx={{width: '100%'}} onChange={(e) => {

                        let startDate = new Date(e.$d);
                        console.log(new Date(e.$d))
                        setNewStartTime(startDate)

                        let endDate = new Date(e.$d);
                        console.log(endDate)
                        let endDateFinal = new Date(endDate.getTime()+3600000);

                        setNewEndTime(endDateFinal)
                    }}/>
                </LocalizationProvider>
            </Grid>
            <br/>
            <br/>
            <Grid>
                <Button onClick={onSubmitFreeSlot}
                        variant="outlined">Submit</Button>
            </Grid>
        </Grid>
    );
}

export default AddTimeslotContent;