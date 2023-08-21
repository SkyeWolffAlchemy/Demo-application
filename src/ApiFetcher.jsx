import { useState } from 'react'


function APIFetcher() {
    const [ result, setResult ] = useState('');

    function sendRequest(event) {
        console.log('sending a request...');

        const myRequest = new Request('https://httpbin.org/get');
        fetch(myRequest)
            .then((response) =>  response.json())
            .then((json) => {
            console.log(json)

            setResult(data.uuid)
        });
    }

    return (
        <div>
            <h1>API Fetcher...</h1>
            <button onClick={sendRequest}>Fetch Data</button>
        </div>
    )
}

export default APIFetcher;