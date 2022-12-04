
import React from "react"

let arr = [];
let count= 0;
const date = new Date('2022-03-18');
const lastDate = new Date('2022-11-22');
function Wda() {
    let element = 0;
    const fetchPromise = fetch("https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=IBM&outputsize=full&apikey=demo");
    const data = fetchPromise.then(response => response.json()).then((response) => {
        // for (element in response) {
        //     console.log(response[element].sponsorName)
        // }
        // console.log(response)
        arr.push(response['Time Series (Daily)']['2022-03-18']['4. close'])

        for (const element in response['Time Series (Daily)']) {
            const dater = new Date(response[element]);
            console.log(dater)
            console.log(element)

        }
        console.log(count)
    });




    return (<div className="visited"><p> was the last user to leave a message.</p></div>);
}
export default Wda;