import React, { useEffect, useState } from "react"
// import Dropdown from 'react-bootstrap/Dropdown';
// import DropdownButton from 'react-bootstrap/DropdownButton';
import 'bootstrap/dist/css/bootstrap.min.css';
import { isCompositeComponent } from "react-dom/test-utils";

let done = 0;

let arr = [];
let defArr = [];
let curTeamArr = [];
let teamArr = [];


function StockSearch() {

    const [value, setValue] = useState('');
    const [result, setResult] = useState([]);
    const [sponsor, setSponsor] = useState('');
    const [team, setTeam] = useState('');
    const [driver, setDriver] = useState([]);
    const [navOpen, setNavOpen] = useState(false);


    useEffect(() => {
        if (done === 0) {
            fetch("https://localhost:7024/GetAllSponsors").then(
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
            console.log(result)
        }

        if (value.length > 0) {
            setResult([]);

            let query = value.toLowerCase();

            for (const element in arr) {
                let val = arr[element].sponsorName.toLowerCase();
                if (val.slice(0, query.length).indexOf(query) !== -1) {
                    curTeamArr.push(arr[element]);
                    setResult(prevResult => {
                        return [...prevResult, arr[element]]
                    });
                }
            }

        } else {
            setResult(arr);
        }
        done = 1;

    }, [value])

    const handleDropdownChange = (e) => {

        setResult([])


        let query = e.target.value;

        if (e.target.value === '<-- Select a team -->') {
            setResult(defArr);

        } else {
            arr = [];
            for (const element in defArr) {
                let val = defArr[element].teamName;
                if (val.slice(0, query.length).indexOf(query) !== -1) {
                    arr.push(defArr[element])
                    setResult(prevResult => {
                        return [...prevResult, defArr[element]]
                    });
                }
            }
        }
    }

    function openNav(sponsor, team) {
        setNavOpen(true)
        setSponsor(sponsor);
        setTeam(team);


    }

    function closeNav() {
        setNavOpen(false)
    }

    const handleDropdownDrivers = (e) => {
        setDriver([]);
        let drivers = [];
        console.log(e.target.value)
        console.log(team)

        fetch("https://localhost:7024/GetResultByTeam?teamName=" + team + "&race=" + e.target.value).then(
            response => response.json()
        ).then((response) => {
            for (const element in response) {
                console.log(response)
                console.log(drivers[element])
                drivers.push(response[element])
                setDriver(prevResult => {
                    
                    return [...prevResult, drivers[element]]
                });
            }
            
        });
        
    }


    return (
        <>
            <div>
                <label>
                    Search for a sponsor:
                    <input type="text" onChange={(event) => setValue(event.target.value)} value={value} />
                </label>



                <div className="w">
                    <select id="dropdown-basic-button" title="Dropdown button" onChange={handleDropdownChange}>
                        {teamArr.map((teamArr, index) => (
                            <option className={'op' + teamArr} key={index}>{teamArr}</option>
                        ))}
                    </select>
                </div>

                <div className="w" >
                    {result.map((result, index) => (
                        <ul key={index} className={result.teamName} >
                            <li ><strong className="sponsorNameClick" onClick={() => openNav(result.sponsorName, result.teamName)}>{result.sponsorName}</strong></li>
                            <li>{result.teamName}</li>

                        </ul>
                    ))}
                </div>
            </div>


            <div className={'o' + team} id="overlay" style={{ height: navOpen ? 100 + '%' : 0 + '%' }} >
                <h1 className="closebtn" onClick={closeNav}>x</h1>
                <div className="overlay-content">
                    <h1 className="href">{sponsor}</h1>
                    <select id="dropdown-basic-button" title="Dropdown button" onChange={handleDropdownDrivers}>
                        <option>{'<- Select an option ->'}</option>
                        <option>Bahrain</option>
                        <option>Saudi Arabia</option>
                        <option>Australia</option>
                        <option>Emilia Romagna</option>
                        <option>Miami</option>
                        <option>Spain</option>
                        <option>Monaco</option>
                        <option>Azerbaijan</option>
                        <option>Canada</option>
                        <option>Great Britain</option>
                        <option>Austria</option>
                        <option>France</option>
                        <option>Hungary</option>
                        <option>Belgium</option>
                        <option>Netherlands</option>
                        <option>Italy</option>
                        <option>Singapore</option>
                        <option>Japan</option>
                        <option>United States</option>
                        <option>Mexico</option>
                        <option>Brazil</option>
                        <option>Abu Dhabi</option>
                    </select>

                    <div className="wdad">
                    {driver.map((driver, index) => (
                        <li key={index}><strong>Driver:</strong> {driver.driver}  <strong>Race Position:</strong> {driver.racePosition}</li>
                    ))}
                    </div>
                    <div>
                        {/* <svg id="svggraph" viewBox="-100 -100 1940 1805">
                            <rect class="bar" fill="blue" width="10" x="1690" y="1328" height="177"></rect>
                            <rect class="bar" fill="#ffd311fb" width="10" x="1710" y="856" height="649"></rect>
                            <rect class="bar" fill="blue" width="10" x="1720" y="1350" height="155"></rect>
                            <rect y="0" width="1740" height="1505" fill="transparent" stroke="black" stroke-strokeWidth="1"></rect><text
                                x="-40" y="15" fontSize="15">1505</text> <text x="-40" y="1505" fontSize="15">0</text><text
                                    x="0" y="-20" fontSize="40">Attendance Chart</text><text x="1640" y="20"
                                        fontSize="15">24/11/2022</text><text x="10" y="20" fontSize="15">28/09/2022</text><text x="0"
                                            y="1530" fontSize="11.3">In-person log: 199 207 103 0 0 119 182 246 224 190 0 0 194 237 166 99
                                119 0 0 128 158 87 232 127 0 0 179 101 217 223 180 0 0 96 217 249 185 214 0 0 99 165 189 219 211
                                0 0 126 216 99 180 181 0 0 190 92 177 155</text><text x="0" y="1555" fontSize="11.3">Online
                                    log: 1325 1063 1064 946 776 971 974 530 1505 817 1356 532 1031 1194 581 957 1498 1270 884 1467
                                    1223 776 1302 961 723 1225 992 1386 1242 1186 720 1405 1346 1150 721 986 1226 601 1225 1414 981
                                    828 973 1317 1272 797 1170 789 724 569 1199 1436 1437 1409 594 608 1462 649</text>
                        </svg> */}
                    </div>
                </div>
            </div>


        </>



    );
}
export default StockSearch;