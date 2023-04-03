import React, {useEffect, useState} from "react";
import { db } from "../../../config/firebase.js";
import { getDocs, collection } from "firebase/firestore";


function SortedFirms() {
    const [firmsList, setFirmsList] = useState([]);
    const firmsCollection = collection(db, "firma");


    useEffect(() => {
        async function getFirmsList() {
            // READ THE DATA
            // SET THE FIRMS LIST
            try {
                const docsData = await getDocs(firmsCollection)
                const filteredDocsData = docsData.docs.map((docItem) => ({
                    ...docItem.data(), // adds docItem.id to the same object
                    id: docItem.id}));
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
            <div>
                {firmsList.map((firm, index) => {
                    return (
                        <div>
                            <h3>Id: {firm.id}</h3>
                            <h6>Latitude: {firm.Location._lat}</h6>
                            <h6>Longitude: {firm.Location._long}</h6>
                            {/*<h6>Free time slots: {(firm.Free_time_slots[index].seconds).toDate().toDateString()}</h6>*/}
                        </div>
                    )}
                )}
            </div>
        </div>
    );
}

export default SortedFirms;
