import Navigation from "../header/Navigation";
import {useParams} from "react-router-dom";

export function SelectedService() {
    let {id} = useParams();
    // console.log(id)

    // useEffect that is going to talk with fiebase to get this specific ID.
    return (
        <div>
            <Navigation/>
            <h1>This is selected service</h1>
        </div>
    )
}