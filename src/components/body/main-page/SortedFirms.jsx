import React, {useContext, useState} from "react";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from '@mui/material/Grid';
import {styled} from "@mui/material/styles";
import {FullData} from "../../../utils/fullData";
import Navigation from "../../header/Navigation";
import {useNavigate} from "react-router-dom";

function SortedFirms({props}) {
    console.log(props)

    const navigate = useNavigate();

    const fullData = useContext(FullData);
    // console.log("SEE ON FULL DATA")
    // console.log(fullData)

    // const employees = [];
    // const firms = [];
    // const timeslots = [];
    //
    // function extractDataFromFullData() {
    //     if(fullData.employees !== undefined && fullData.employees !== {}){
    //         fullData.employees.map(employee => employees.push(employee))
    //         fullData.firmsList.map(firm => firms.push(firm))
    //         fullData.timeslots.map(timeslot => timeslots.push(timeslot))
    //     }
    // }
    // extractDataFromFullData();




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

            <Navigation/>
            <Box sx={{flexGrow: 1, width: '100%'}}>
                <Grid rowSpacing={2} container wrap="wrap">
                    {props.map((prop,index) => {
                            return (
                                <Grid key={index} item xs={12} sm={6} md={4}>
                                    <Item elevation={2}>
                                        <img onClick={() => navigate('SelectedService/'+prop.companyId) } src={prop.imgSrc} width="100%" style={{cursor:'pointer'}} />
                                        <h3>{prop.companyName}</h3>
                                        <h6>About company: {prop.Description}</h6>
                                        <h6>About this service: {prop.serviceName}</h6>
                                        <h6>Company provided service description: {prop.ServiceName}</h6>

                                        {/*<h6>{firm.Name}</h6>*/}
                                        {/*<p>{firm.Description}</p>*/}
                                        {/*<p>Vabad ajad: {firm.Free_time_slots.map((timeslot, index) => {*/}
                                        {/*    return (*/}
                                        {/*        <span key={index}>*/}
                                        {/*          {timeslot.seconds}*/}
                                        {/*        </span>*/}
                                        {/*    )*/}
                                        {/*})}*/}
                                        {/*</p>*/}
                                    </Item>
                                </Grid>
                            )
                        }
                    )}
                    {/*{firms.map((firm) => {*/}
                    {/*        return (*/}
                    {/*            <Grid key={firm.id} item xs={12} sm={6} md={4}>*/}
                    {/*                <Item elevation={2}>*/}
                    {/*                    <img onClick={() => navigate('SelectedService/'+firm.id) } src={firm.imgSrc} width="100%" style={{cursor:'pointer'}} />*/}
                    {/*                    <h6>{firm.Name}</h6>*/}
                    {/*                    <p>{firm.Description}</p>*/}
                    {/*                    /!*<p>Vabad ajad: {firm.Free_time_slots.map((timeslot, index) => {*!/*/}
                    {/*                    /!*    return (*!/*/}
                    {/*                    /!*        <span key={index}>*!/*/}
                    {/*                    /!*          {timeslot.seconds}*!/*/}
                    {/*                    /!*        </span>*!/*/}
                    {/*                    /!*    )*!/*/}
                    {/*                    /!*})}*!/*/}
                    {/*                    /!*</p>*!/*/}
                    {/*                </Item>*/}
                    {/*            </Grid>*/}
                    {/*        )*/}
                    {/*    }*/}
                    {/*)}*/}
                </Grid>
            </Box>
        </div>
    );
}

export default SortedFirms;
