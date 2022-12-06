
import React from "react"

let arr = [];
let revArr = [];
let count= 0;
let polyLine = '';
const date = new Date('2022-03-18');
const lastDate = new Date('2022-11-22');
function Stock() {
    let element = 0;
    let val = 0;
    let curr = 0;
    const fetchPromise = fetch("https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=IBM&outputsize=full&apikey=demo");
    const data = fetchPromise.then(response => response.json()).then((response) => {
        // for (element in response) {
        //     console.log(response[element].sponsorName)
        // }
        // console.log(response)

        // arr.push(response['Time Series (Daily)']['2022-03-18']['4. close'])

        for (const element in response['Time Series (Daily)']) {
            const dater = new Date(element);
            
            if (dater > date && dater < lastDate) {
                curr = parseInt(response['Time Series (Daily)'][element]["4. close"]) + 50;
           
                // arr.push(element +' - THE DATE - '+ response['Time Series (Daily)'][element]["4. close"])
                polyLine = polyLine.concat(val, ",");
                polyLine = polyLine.concat(curr, ",");
                val = val+1.5;

            }
            
        }
        revArr = arr.slice().reverse();
        // unreveresed

        // reversed

        polyLine = polyLine.slice(0, polyLine.length - 1)
        console.log(polyLine);

    });




    return (<div className="visited"><p> was the last user to leave a message.</p></div>);
}
export default Stock;