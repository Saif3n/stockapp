import React, { useEffect, useState } from "react"
let done = 0;
var arr = [];




function StockSearch(props) {

    const [value, setValue] = useState('');
    const [result, setResult] = useState([]);

    useEffect(() => {

        
        if (done === 0) {
            fetch("https://personalbackendreact.azurewebsites.net/gjsgj20ujsa0dfjfbv0dgbjdfiugj459yo").then(
                response => response.json()
            ).then((response) => {
                for (var i in response) {
                    arr.push(response[i]);
                }
                for (const element in arr) {
                    setResult(prevResult => {
                        return [...prevResult, arr[element]]
                    });
                }

            })
        }

        if (value.length > 0) {
            setResult([]);
            let query = value.toLowerCase();

            for (const element in arr) {
                let val = arr[element].sponsorName.toLowerCase();

                if (val.slice(0, query.length).indexOf(query) !== -1) {
                    setResult(prevResult => {
                        return [...prevResult, arr[element]]
                    });
                }
            }

        } else {
            setResult([]);
            for (const element in arr) {
                setResult(prevResult => {
                    return [...prevResult, arr[element]]
                });

            }

        }
        done = 1;
    }, [value])

    return (
        <form onLoad={(event) => setValue("")}>
            <label>
                Name:
                <input type="text" onChange={(event) => setValue(event.target.value)} value={value} />
            </label>
            <div className="w">
                {result.map((result, index) => (
                    <div key={index} className="searchEntry">
                        <li>{result.teamName}</li>
                        <li>{result.sponsorName}</li>

                    </div>
                ))}
            </div>
        </form>
    );
}
export default StockSearch;