import './App.css';
import React, {useEffect, useState} from "react";
import SortedFirms from "./components/body/main-page/SortedFirms";
import {collection, getDocs} from "firebase/firestore";
import {db} from "./config/firebase";
import {FullData} from "./utils/fullData";
import {Routes, Route} from "react-router-dom";
import {SelectedService} from "./components/pages/SelectedService";
import Booking from "./components/pages/Booking";
import {AddAlarm} from "@mui/icons-material";
import AddTimeslot from "./components/pages/AddTimeslot";
import Auth from "./components/auth/auth";


function App() {


    // const [firmsList, setFirmsList] = useState([]);
    // const [employees, setEmployees] = useState([]);
    // const [timeslots, setTimeslots] = useState([]);

    const firmsCollection = collection(db, "firma");
    const employeesCollection = collection(db, "workers");
    const timeslotsCollection = collection(db, "time_slots");

    const [fullData, setFullData] = useState({});
    const [newFullData, setNewFullData] = useState([]);



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


    /** Making <newFullData> which is array that contains enriched (with COMPANY and EMPLOYEE info) TIMESLOT objects */
    useEffect(() => {
        if(fullData !== undefined) {
            const employees = [];
            const firms = [];
            const timeslots = [];
            if(fullData.employees !== undefined && fullData.employees !== {}){
                fullData.employees.map(employee => employees.push(employee))
                fullData.firmsList.map(firm => firms.push(firm))
                fullData.timeslots.map(timeslot => timeslots.push(timeslot))
            }
            console.log("Infinite loop checker")
            const newFullData = [];
            if(fullData.employees !== undefined && fullData.employees !== {}){
                employees.map(employee => {
                    firms.map(firm => {
                        if (firm.id === employee.companyId){
                            timeslots.map(timeslot => {
                                if (employee.companyId === timeslot.companyId && timeslot.employeeId === employee.id){
                                    newFullData.push({...timeslot,...employee, ...firm})
                                }
                            })
                        }
                    })
                });setNewFullData(newFullData)
            }
        }
    }, [fullData])

    return (
    <div className="App">
        <FullData.Provider value={fullData}>
            <Routes>
                <Route path="/" element={ <SortedFirms props={newFullData}/> } />
                <Route path="/selectedService/:companyId" element={ <SelectedService props={newFullData} /> } />
                <Route path="/selectedService/:companyId/:serviceName" element={ <Booking props={newFullData} />} />
                <Route path="/:auth" element={ <Auth props={newFullData} />} />
            </Routes>
        </FullData.Provider>

    </div>
  );
}

export default App;
