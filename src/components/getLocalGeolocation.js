import React, {useEffect, useState} from 'react';

const GetLocalGeolocation = () => {
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    useEffect(() => {
        fetch('https://ipapi.co/json')
            .then(response => response.json())
            .then(json => {
                setLatitude(json.latitude);
                setLongitude(json.longitude);
            })
    })
    return (
        <div>
            <h3>My gelocation:</h3>
            <h4>latitude: {latitude} <br/>
                longitude: {longitude}</h4>
        </div>
    );
};

export default GetLocalGeolocation;