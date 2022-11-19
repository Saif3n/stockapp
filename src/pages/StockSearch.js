import React, { useEffect, useState } from "react"
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import 'bootstrap/dist/css/bootstrap.min.css';

let done = 0;
let sponsor = 0;
let arr = [];
let defArr = [];
let teamArr = [];

function StockSearch(props) {

    const [value, setValue] = useState('');
    const [option, setOption] = useState('');
    const [result, setResult] = useState([]);
    const [team, setTeam] = useState([]);

    useEffect(() => {
        if (done === 0) {
            fetch("https://personalbackendreact.azurewebsites.net/gjsgj20ujsa0dfjfbv0dgbjdfiugj459yo").then(
                response => response.json()
            ).then((response) => {
                teamArr.push('<-- Select a team -->')
                for (const i in response) {
                    arr.push(response[i]);
                    // gets array of teams for dropdown 
                    if (!teamArr.includes(response[i].teamName)) {
                        teamArr.push(response[i].teamName);
                    }
                    setResult(prevResult => {
                        return [...prevResult, arr[i]]
                    });
                }
                defArr = arr;
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
            setResult(defArr);
        }
        done = 1;

    }, [value])

    const handleDropdownChange = e => {

        setOption(e.target.value);
        sponsor = 1;
        setResult([])

        let query = e.target.value.toLowerCase();
        console.log(query)
        if (e.target.value === '<-- Select a team -->') {
            setResult(defArr);
        } else {
            for (const element in arr) {
                let val = arr[element].teamName.toLowerCase();
                if (val.slice(0, query.length).indexOf(query) !== -1) {
                    setResult(prevResult => {
                        return [...prevResult, arr[element]]
                    });
                }
            }
        }

    }
    return (
        <form>
            <label>
                Name:
                <input type="text" onChange={(event) => setValue(event.target.value)} value={value} />
            </label>



            <div className="w">
                <select id="dropdown-basic-button" title="Dropdown button" onChange={handleDropdownChange}>
                    {teamArr.map((teamArr, index) => (
                        <option className={'op' + teamArr} key={index}>{teamArr}</option>
                    ))}
                </select>
            </div>

            <div className="w">
                {result.map((result, index) => (
                    <ul key={index} className={result.teamName}>
                        <li><strong>{result.sponsorName}</strong></li>
                        <li>{result.teamName}</li>

                    </ul>
                ))}
            </div>

        </form>


    );
}
export default StockSearch;