
import React from "react"

let arr = [];
let revArr = [];
let count= 0;
const date = new Date('2022-03-18');
const lastDate = new Date('2022-11-22');
function Stock() {
    let element = 0;
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
                count++;
                arr.push(element +' - THE DATE - '+response['Time Series (Daily)'][element]["4. close"])
            }
        }
        revArr = arr.slice().reverse();
        // unreveresed
        console.log(arr)
        // reversed
        console.log(revArr)
    });




    return (<div className="visited"><p> was the last user to leave a message.</p></div>);
}
export default Stock;