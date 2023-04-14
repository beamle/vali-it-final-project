import React, {useState} from 'react';
import {signOut} from "firebase/auth";
import {auth} from "../../config/firebase";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import InputLabel  from "@mui/material/InputLabel";
import MenuItem  from "@mui/material/MenuItem";
import Select  from "@mui/material/Select";
import AddCompanyInfo from "./AddCompanyInfo";
import Button from "@mui/material/Button";
import Kaspar from "./Kaspar";

const AddTimeslot = ({ authUserId, companyId }) => {
    console.log(companyId); // this should log the companyId value
    // rest of the component code
    const [showAddCompanyInfo, setShowAddCompanyInfo] = useState(false);
    const [error, setError] = useState('');

    const logOut = async () => {
        try {
            await signOut(auth);
        } catch (err) {
            setError(err.message);
            console.log(err);
        }
    }
    console.log(companyId, "in ADDTIMESLOT")
    return (
        <div>
            {showAddCompanyInfo ? <AddCompanyInfo authUserId={authUserId}/> : (
                <Button onClick={() => setShowAddCompanyInfo(true)}>Add company Info </Button>
            )}
            <h1>Logged in</h1>
            <button onClick={logOut}>Logout</button>
            <Kaspar authUserId={authUserId} companyId={companyId}/>
            {error && <p>{error}</p>}
        </div>
    );
};

export default AddTimeslot;
