import React, { useState } from 'react';
import { db } from '../../config/firebase';
import { collection, updateDoc, doc, query, getDocs, where, addDoc, GeoPoint} from 'firebase/firestore';
import Input from "@mui/material/Input";
import Box from "@mui/material/Box";

const usersCollectionRef = collection(db, "firma");

const AddCompanyInfo = ({authUserId}) => {
    const userDocRef = doc(db, 'firma', authUserId);

    const [description, setDescription] = useState('');
    const [name, setName] = useState('');
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const [serviceType, setServiceType] = useState('');
    const [imgSrc, setImgSrc] = useState('');



    const handleAddCompanyInfo = async (e) => {
        e.preventDefault();

        try {
            // Query the documents in the test collection where the authUserId field matches authUserId prop
            const q = query(usersCollectionRef, where('authUserId', '==', authUserId));
            const querySnapshot = await getDocs(q);

            // If a document with matching authUserId is found, update it with the Description and Name fields
            if (querySnapshot.docs.length > 0) {
                const userDocRef = querySnapshot.docs[0].ref;

                // Check if the fields are not empty before updating
                const updateFields = {};
                if (description !== '') {
                    updateFields.Description = description;
                }
                if (name !== '') {
                    updateFields.Name = name;
                }
                if (serviceType !== '') {
                    updateFields.Service_type = serviceType;
                }
                if (imgSrc !== '') {
                    updateFields.imgSrc = imgSrc;
                }
                if (latitude !== '' && longitude !== '') {
                    const geopoint = new GeoPoint(parseFloat(latitude), parseFloat(longitude));
                    updateFields.Location = geopoint;
                }

                // Update the document with the non-empty fields
                await updateDoc(userDocRef, updateFields);
            }
            setDescription('');
            setName('');
            setLatitude('');
            setLongitude('');
            setName('');
            setServiceType('');
            setImgSrc('');
        } catch (err) {
            console.error(err);
        }
    };


    return (
        <Box>
            <form onSubmit={handleAddCompanyInfo}>
                <label>
                    Description:
                    <Input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
                </label>

                <label>
                    Name:
                    <Input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                </label>
                <label>
                    Latitude:
                    <Input type="text" value={latitude} onChange={(e) => setLatitude(e.target.value)} />
                </label>

                <label>
                    Longitude:
                    <Input type="text" value={longitude} onChange={(e) => setLongitude(e.target.value)} />
                </label>
                <label>
                    Name:
                    <Input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                </label>
                <label>
                    ServiceType:
                    <Input type="text" value={serviceType} onChange={(e) => setServiceType(e.target.value)} />
                </label>

                <button type="submit">Add this to db</button>
            </form>
        </Box>
    );
};

export default AddCompanyInfo;
