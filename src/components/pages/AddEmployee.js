import React, { useState } from "react";
import { auth, db } from "../../config/firebase";
import { collection, addDoc } from "firebase/firestore";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

function AddEmployee({ companyId }) {
    console.log(companyId, " IN THE ADD EMPLOYEE")
    const [newWorkerName, setNewWorkerName] = useState("");
    const [newWorkerEmail, setNewWorkerEmail] = useState("");

    const onSubmitAddWorker = async () => {
        if (companyId) {
            try {
                const docRef = await addDoc(collection(db, "workers"), {
                    companyId: companyId,
                    name: newWorkerName,
                    email: newWorkerEmail,
                });
                console.log("Document written with ID: HERE", docRef.id);
                window.location.reload(false);
            } catch (err) {
                console.error(err);
            }
        }
    };

    return (
        <Grid container direction="column" justifyContent="space-between">
            <Grid>
                <Typography id="transition-modal-title" variant="h6" component="h2">
                    Add new worker
                </Typography>
            </Grid>
            <br />
            <Grid>
                <TextField
                    fullWidth
                    id="workerName"
                    label="Worker name"
                    variant="standard"
                    onChange={(e) => setNewWorkerName(e.target.value)}
                />
            </Grid>
            <br />
            <Grid>
                <TextField
                    fullWidth
                    id="workerEmail"
                    label="Worker email"
                    variant="standard"
                    onChange={(e) => setNewWorkerEmail(e.target.value)}
                />
            </Grid>
            <br />
            <br />
            <Grid>
                <Button onClick={onSubmitAddWorker} variant="outlined">
                    Submit
                </Button>
            </Grid>
        </Grid>
    );
}

export default AddEmployee;
