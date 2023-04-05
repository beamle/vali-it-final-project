import './App.css';
import React, {createContext, useContext, useEffect, useState} from "react";
import Navigation from "./components/header/Navigation";
import SortedFirms, {MyContext} from "./components/body/main-page/SortedFirms";
import GetLocalGeolocation from "./components/getLocalGeolocation";
import {collection, getDocs} from "firebase/firestore";
import {db} from "./config/firebase";
import {styled} from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import {FullData} from "./utils/fullData";

//test
function App() {


    // const [firmsList, setFirmsList] = useState([]);
    // const [employees, setEmployees] = useState([]);
    // const [timeslots, setTimeslots] = useState([]);

    const firmsCollection = collection(db, "firma");
    const employeesCollection = collection(db, "workers");
    const timeslotsCollection = collection(db, "time_slots");

    const [fullData, setFullData] = useState({});



    useEffect(() => {
        async function getFirmsList() {
            try {
                const firmsDocsData = await getDocs(firmsCollection)
                const employeesDocsData = await getDocs(employeesCollection)
                const timeslotsDocsData = await getDocs(timeslotsCollection)

                const firmsData = firmsDocsData.docs.map((docItem) => ({
                    ...docItem.data(),
                    id: docItem.id // adds docItem.id to the same object
                }));

                const employeesData = employeesDocsData.docs.map((docItem) => ({
                    ...docItem.data(),
                    id: docItem.id
                }));

                const timeslotsData = timeslotsDocsData.docs.map((docItem) => ({
                    ...docItem.data(),
                    id: docItem.id
                }));

                // setFirmsList(filteredDocsData);

                setFullData({employees: employeesData, firmsList: firmsData, timeslots: timeslotsData})

            } catch (err) {
                console.error(err)
            }
        }

        getFirmsList();

    }, []);


    return (
    <div className="App">
        <FullData.Provider value={fullData}>
            <Navigation/>
            <GetLocalGeolocation/>
            <SortedFirms/>
        </FullData.Provider>

    </div>
  );
}

export default App;



//EXAMPLE Printing out all salon+ employees
// const companyKey = "xHMJkzpMtE840bfbpuMJ"; // SALONG ID
// let arr = []
//
// employeesDocsData.map(function(employee){
//     if (employee.companyId ===  companyKey) {
//         arr.push(employee);
//     }
// })
//
// arr.map(function (employee){
//     console.log(employee.name)
// })
// console.log("THOS OS ARRAY");

//EXAMPLE Printing out all times that salon+ has