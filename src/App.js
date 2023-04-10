import './App.css';
import React, {createContext, useContext, useEffect, useState} from "react";
import SortedFirms, {MyContext} from "./components/body/main-page/SortedFirms";
import {collection, getDocs} from "firebase/firestore";
import {db} from "./config/firebase";
import {FullData} from "./utils/fullData";
import {Routes, Route} from "react-router-dom";
import {SelectedService} from "./components/pages/SelectedService";

//test
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

    //     TODO: make a new arrayu that conaints enriched (with company and employee info) TIMESLOT objects
    //     TODO: pass it to SortedFirms where i loop them and just return (show)
    // console.log(fullData)
    return (
    <div className="App">
        <FullData.Provider value={fullData}>
            <Routes>
                <Route path="/" element={ <SortedFirms props={newFullData}/> } />
                <Route path="/selectedService/:timeslotId" element={ <SelectedService/> } />
                {/*expected*/}
            </Routes>
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