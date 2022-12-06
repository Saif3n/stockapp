import React, { useEffect, useState } from "react"
// import Dropdown from 'react-bootstrap/Dropdown';
// import DropdownButton from 'react-bootstrap/DropdownButton';
import 'bootstrap/dist/css/bootstrap.min.css';
import { isCompositeComponent } from "react-dom/test-utils";
import * as ReactDOM from 'react-dom';

let done = 0;

let arr = [];
let defArr = [];
let curTeamArr = [];
let teamArr = [];

const seasonStart = '2022-03-18';
const raceArr = ['<- Select an option ->', 'Bahrain', 'Saudi Arabia', 'Australia', 'Emilia Romagna', 'Miami', 'Spain', 'Monaco', 'Azerbaijan', 'Canada', 'Great Britain', 'Austria', 'France', 'Hungary', 'Belgium', 'Netherlands', 'Italy', 'Singapore', 'Japan', 'United States', 'Mexico', 'Brazil', 'Abu Dhabi']



function StockSearch() {

    const [value, setValue] = useState('');
    const [result, setResult] = useState([]);
    const [sponsor, setSponsor] = useState('');
    const [stock, setStock] = useState('');
    const [poly, setPoly] = useState('');
    const [date, setDate] = useState('');
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
    // rerenders when value dependency changes

    const handleDropdownChange = (e) => {

        setResult([]);
        setValue('');

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


    function openNav(sponsor, team, stock) {
        setNavOpen(true)
        setSponsor(sponsor);
        setStock(stock)
        setTeam(team);

        let polyLine = '';
        const date = new Date('2022-03-18');
        const lastDate = new Date('2022-11-22');

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

                    polyLine = polyLine.concat(val, ",");
                    polyLine = polyLine.concat(curr, ",");
                    val = val + 1.5;

                }

            }
            setPoly(polyLine);
        })
    }

    function closeNav() {
        setNavOpen(false)
        setDriver([]);
        setDate('');
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

                drivers.push(response[element])
                setDate(drivers[element].raceDate);
                setDriver(prevResult => {
                    return [...prevResult, drivers[element]]
                });
            }

        });

    }

    //https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=IBM&outputsize=full&apikey=demo
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
                            <li ><strong className="sponsorNameClick" onClick={() => openNav(result.sponsorName, result.teamName, result.sponsorStockName)}>{result.sponsorName}</strong></li>
                            <li>{result.teamName}</li>

                        </ul>
                    ))}
                </div>
            </div>

            <>
                <div className={'o' + team} id="overlay" style={{ height: navOpen ? 100 + '%' : 0 + '%' }} onLoad={() => handleDropdownDrivers('Bahrain')}>
                    <h1 className="closebtn" onClick={closeNav}>x</h1>
                    <div className="overlay-content">
                        <h1 className="href">{sponsor}</h1>
                        <select id="dropdown-basic-button" title="Dropdown button" onChange={handleDropdownDrivers}>
                            {raceArr.map((raceArr, index) => (
                                <option key={index}>{raceArr}</option>
                            ))}

                        </select>

                        <div>
                            <li><strong>Race Date:</strong>{date}</li>
                            {driver.map((driver, index) => (
                                <li key={index}><strong>Driver:</strong> {driver.driver}  <strong>Race Position:</strong> {driver.racePosition}</li>
                            ))}
                            <li>{stock}</li>
                        </div>
                        <div>

                            <svg className="svggraph" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 450 750 ">
                                <polyline fill="none" stroke="#0074d9" strokeWidth="1"
                                    points={poly}>
                                </polyline>
                                {/* <text x="918.1" y="95">Max:289</text><text x="918.1" y="284">Min:81</text><text
                                    y="307">31/08/2022</text><text x="830.1" y="307">30/11/2022</text><text y="330">played: </text> */}
                                <rect y="81" width="255" height="209" fill="transparent" stroke="black" strokeWidth="1"></rect>
                            </svg>
                        </div>
                    </div>
                </div>



            </>
        </>



    );
}
export default StockSearch;