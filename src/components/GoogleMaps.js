import {useEffect} from "react";

function GoogleMap({props}){
    useEffect(()=>{
        const ifameData=document.getElementById("iframeId")
        const lat=props["latitude"];
        const long=props["longitude"];
        ifameData.src=`https://maps.google.com/maps?q=${lat},${long}&hl=es;&output=embed`
        console.log(lat, long)
    })
    return(
        <div>
            <iframe id="iframeId" height="250px" width="100%"></iframe>
        </div>
    );
}

export default GoogleMap;