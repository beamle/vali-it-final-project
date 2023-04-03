import React, {useEffect, useState} from "react";
import {getDocs, collection} from "firebase/firestore";
import {db} from "../../../config/firebase";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from '@mui/material/Grid';
import {styled} from "@mui/material/styles";


function SortedFirms() {
    const [firmsList, setFirmsList] = useState([]);
    const firmsCollection = collection(db, "firma");

    const Item = styled(Paper)(({theme}) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    })); // STYLES GRID ITEM


    useEffect(() => {
        async function getFirmsList() {
            // READ THE DATA
            // SET THE FIRMS LIST
            try {
                const docsData = await getDocs(firmsCollection)
                const filteredDocsData = docsData.docs.map((docItem) => ({
                    ...docItem.data(), // adds docItem.id to the same object
                    id: docItem.id
                }));
                console.log(filteredDocsData);
                //.toDate().toDateString()
                //.Free_time_slots[index].seconds.toDate().toDateString()
                setFirmsList(filteredDocsData);
            } catch (err) {
                console.error(err)
            }
        }

        getFirmsList();
    }, []);


    return (
        <div>
            <Box sx={{flexGrow: 1, width: '100%'}}>
                <Grid rowSpacing={2} container wrap="wrap">
                    {firmsList.map((firm) => {
                            return (
                                <Grid key={firm.id} item xs={12} sm={6} md={4}>
                                    <Item elevation={2}>
                                        <h6>{firm.Name}</h6>
                                        <p>{firm.Description}</p>
                                        <p>Vabad ajad: {firm.Free_time_slots.map((timeslot, index) => {
                                            return (
                                                <span key={index}>
                                                  {timeslot.seconds}
                                                </span>
                                            )
                                        })}
                                        </p>
                                        {/*<h6>Free time slots: {(firm.Free_time_slots[index].seconds).toDate().toDateString()}</h6>*/}
                                    </Item>
                                </Grid>
                            )
                        }
                    )}
                </Grid>
            </Box>
        </div>
    );
}

export default SortedFirms;
