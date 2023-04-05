import React, {useContext} from "react";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from '@mui/material/Grid';
import {styled} from "@mui/material/styles";
import {FullData} from "../../../utils/fullData";

function SortedFirms() {

    const fullData = useContext(FullData);
    console.log("SEE ON FULL DATA")
    console.log(fullData)
    const employees = [];
    const firms = [];
    const timeslots = [];
    if(fullData.employees !== undefined && fullData.employees !== {}){
        fullData.employees.map(employee => employees.push(employee))
        fullData.firmsList.map(firm => firms.push(firm))
        fullData.timeslots.map(timeslot => timeslots.push(timeslot))
    }


    // TODO: ASK WHY fullData.employees DOESNT WORK?

    // const employees = fullData.employees;
    // const firmsList = fullData.firmsList;
    // const {firmsList} = fullData.firmsList
    // const timeslots = fullData.timeslots;
    const firmLocation = {};
    firms.map(firm => {
        console.log(firm["Location"]["_lat"])
    })



    //EXAMPLE HOW TO WORK WITH FULL DATA
         // LOOPING THROUGH EMPLOYEES WITH SALONG+ ID AND STORING THEM TO ARR
    // const salongPlusEmployeesArr = []
    // const companyKey = "xHMJkzpMtE840bfbpuMJ"; // SALON+ ID
    // if(employees !== undefined) {
    //     employees.map(employee => {
    //         if (employee.companyId === companyKey) {
    //             salongPlusEmployeesArr.push(employee);
    //         }
    //     })
    //     // PRINTING ALL SALON+ EMPLOYEES
    //     salongPlusEmployeesArr.map(employee => {
    //         // console.log(employee.name)
    //     })
    // }






    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));

    return (
        <div>
            <Box sx={{flexGrow: 1, width: '100%'}}>
                <Grid rowSpacing={2} container wrap="wrap">
                    {firms.map((firm) => {
                            return (
                                <Grid key={firm.id} item xs={12} sm={6} md={4}>
                                    <Item elevation={2}>
                                        <img src={firm.imgSrc} width="100%"/>
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
