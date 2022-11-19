import React, { useEffect, useState } from "react"
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import 'bootstrap/dist/css/bootstrap.min.css';

let done = 0;
let arr = [];
let teamArr = [];

function StockSearch(props) {

    const [value, setValue] = useState('');
    const[option, setOption] = useState('');
    const [result, setResult] = useState([]);
    const [team, setTeam] = useState([]);

    useEffect(() => {
        console.log("The chosen value is: " + option);
        if (done === 0) {
            fetch("https://personalbackendreact.azurewebsites.net/gjsgj20ujsa0dfjfbv0dgbjdfiugj459yo").then(
                response => response.json()
            ).then((response) => {
                teamArr.push('<-- Select a team -->')
                for (var i in response) {
                    arr.push(response[i]);
                    // gets array of teams for dropdown
                    
                    if (!teamArr.includes(response[i].teamName)) {
                        teamArr.push(response[i].teamName);
                    }
                }
                for (const element in arr) {
                    setResult(prevResult => {
                        return [...prevResult, arr[element]]
                    });
                }

                for (const element in teamArr) {
                    setTeam(prevResult => {
                        return [...prevResult, teamArr[element]]
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

    const handleChange = e =>{
        console.log(e.target.value)
        setOption(e.target.value);
    }
    return (
        <form>
            <label>
                Name:
                <input type="text" onChange={(event) => setValue(event.target.value)} value={value} />
            </label>
            

            
            <div className="w">
                <select id="dropdown-basic-button" title="Dropdown button" onChange={handleChange}>
                {team.map((team, index) => (
                        <option className={'op'+team} key={index}>{team}</option>
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