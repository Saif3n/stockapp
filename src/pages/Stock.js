
import React from "react"

let arr = [];
let revArr = [];

let polyLine = '';
const date = new Date('2022-03-18');
const lastDate = new Date('2022-11-22');
function Stock() {
    let element = 0;
    let val = 0;
    let curr = 0;
    const fetchPromise = fetch("https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=IBM&outputsize=full&apikey=demo");
    const data = fetchPromise.then(response => response.json()).then((response) => {


        for (const element in response['Time Series (Daily)']) {
            const dater = new Date(element);
            
            if (dater > date && dater < lastDate) {
                curr = parseInt(response['Time Series (Daily)'][element]["4. close"]) + 50;
           
                polyLine = polyLine.concat(val, ",");
                polyLine = polyLine.concat(curr, ",");
                val = val+1.5;

            }
            
        }
        revArr = arr.slice().reverse();

        polyLine = polyLine.slice(0, polyLine.length - 1)
        console.log(polyLine);

    });


    return (<div className="visited"><p> was the last user to leave a message.</p></div>);
}
export default Stock;