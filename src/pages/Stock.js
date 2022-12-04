
import React from "react"

let arr = [];
function Stock() {
    let element = 0;
    const fetchPromise = fetch("https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=IBM&outputsize=full&apikey=demo");
    const data = fetchPromise.then(response => response.json()).then((response) => {
        // for (element in response) {
        //     console.log(response[element].sponsorName)
        // }
        // console.log(response)
        arr.push(response['Time Series (Daily)']['2022-03-18']['4. close'])

        for (const element in response['Time Series (Daily)']){
            console.log(element);
        }
    });




return (<div className="visited"><p> was the last user to leave a message.</p></div>);
}
export default Stock;