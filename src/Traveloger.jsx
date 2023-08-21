import { useEffect, useState } from 'react';
import './Traveloger.css';
import { MapContainer, TileLayer, useMap, Marker, Popup } from "react-leaflet";

function Traveloger() {

    const [ traveloger, setTraveloger ] = useState([])

    function fetchTraveloger(event) {
        const myRequest = new Request("http://127.0.0.1:3000/api");
        fetch(myRequest)
            .then((response) => response.json())
            .then((json) => {
                console.log(json);
                setTraveloger(json);
            });
    }

    function createTraveloger(newTraveloger) {
        const options = {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({log: newTraveloger})
        }
        fetch("http://127.0.0.1:3000/api", options)
            .then((response) => response.json())
            .then((json) =>  {
                setTraveloger([
                    ...traveloger,
                    json
                ])
            })
    }

    function deleteTraveloger(id) { // send a DELETE request to the API
        const options = {
            method: "DELETE",
            mode: "cors",
        }
        const url = "http://127.0.0.1:3000/api/" + id;
        fetch(url, options)
            .then((response) => response.json())
            .then((json) => {
                console.log("Deleting gave us: ", json);
                fetchTravelogger(); // re-create the application state from the database.
            })
    }
    

    useEffect(() => {
        fetchTraveloger()
    }, []);

    function handleSubmit(event) {
        event.preventDefault();
        createTraveloger(event.target.log.value);
    }

    function handleClick(event) {
        console.log("Delete: " + event.target.id);
        deleteTraveloger(event.target.id);
    }

    const items = traveloger.map((obj) => {
        return (
            
            <li key={'id-' + obj.traveloger}>
                <span className='left'>{obj.traveloger}</span>
                <button id={obj.id}
                    onClick={handleClick} 
                    className="right">Delete</button>
            </li>
        );
    });
 

    return (
        <>
            <h1>Traveloger</h1>
            <div id="map"></div>
            <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
            integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
            crossorigin=""/>
            <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
            integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo="
            crossorigin=""></script>
            <MapContainer center={[34.963, -89.972]} zoom={12} scrollWheelZoom={false}>
            <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[34.963, -89.972]}>
            <Popup>
            Hello Tech901!! <br /> Welcome to my Application!
            </Popup>
            </Marker>
            </MapContainer>
            <ul>
                {items}
            </ul>
            <form onSubmit={handleSubmit}>
                <p>
                    <input name='name' placeholder='Add a New Entry' type='text'/>
                    <input name='coordinates' placeholder='Add Coordinates' id='coords'/> 
                    <input date='date' type='date' />
                    <input type='submit' value='Post' />
                </p>
            </form>
        
        </>
    )
};

export default Traveloger;