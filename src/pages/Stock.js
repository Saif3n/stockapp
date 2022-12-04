
import React from "react"


function Stock() {
    let element = 0;
    const fetchPromise = fetch("https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=IBM&outputsize=full&apikey=demo");
    const data = fetchPromise.then(response => response.json()).then((response) => {
        // for (element in response) {
        //     console.log(response[element].sponsorName)
        // }
        // console.log(response)
        console.log(response['Time Series (Daily)']['1999-12-01'])
    });




return (<div className="visited"><p> was the last user to leave a message.</p></div>);
}
export default Stock;