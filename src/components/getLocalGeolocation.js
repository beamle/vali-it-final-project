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
        </div>
    );
};

export default GetLocalGeolocation;