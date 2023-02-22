import React, { useEffect, useState, useRef } from "react";
import LineGraph from './LineGraph';
import {appendAdditionalElements} from './LineGraph';
let done = 0;

let arr = [];
let defArr = [];
let curTeamArr = [];
let teamArr = [];


// const raceArr = ['<- Select an option ->', 'Bahrain', 'Saudi Arabia', 'Australia', 'Emilia Romagna', 'Miami', 'Spain', 'Monaco', 'Azerbaijan', 'Canada', 'Great Britain', 'Austria', 'France', 'Hungary', 'Belgium', 'Netherlands', 'Italy', 'Singapore', 'Japan', 'United States', 'Mexico', 'Brazil', 'Abu Dhabi']


const raceArr = {'<- Select an option ->':"1", 
                'Bahrain':'2022-03-20', 
                'Saudi Arabia': '2022-03-27', 
                'Australia': '2022-04-10', 
                'Emilia Romagna': '2022-04-24', 
                'Miami': '2022-05-08', 
                'Spain': '2022-05-22', 
                'Monaco': '2022-05-29', 
                'Azerbaijan': '2022-06-12', 
                'Canada': '2022-06-19', 
                'Great Britain': '2022-07-03', 
                'Austria': '2022-07-10', 
                'France': '2022-07-24', 
                'Hungary': '2022-07-31', 
                'Belgium': '2022-08-28', 
                'Netherlands': '2022-09-04', 
                'Italy': '2022-09-11', 
                'Singapore': '2022-10-02', 
                'Japan': '2022-10-09', 
                'United States':'2022-10-23', 
                'Mexico':'2022-10-30' , 
                'Brazil': '2022-11-13', 
                'Abu Dhabi':'2022-11-20'}



function StockSearch() {


    const [value, setValue] = useState('');
    const [result, setResult] = useState([]);
    const [sponsor, setSponsor] = useState('');
    const [stock, setStock] = useState('');
    const [date, setDate] = useState('');

    const [team, setTeam] = useState('');
    const [driver, setDriver] = useState([]);

    const [navOpen, setNavOpen] = useState(false);
    const [showGraph, setShowGraph] = useState(false);

    const lineGraphRef = useRef();

    useEffect(() => {
        if (done === 0) {
            //personalbackendreact.azurewebsites.net
            fetch("https://localhost:7024/GetAllSponsors").then(
                response => response.json()
            ).then((response) => {
                teamArr.push('<-- Select a team -->')
                for (let i in response) {
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
            console.log(arr)
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
            arr = defArr;
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


    const openNav = (sponsor, team, stock) => {
        setNavOpen(true);
        setSponsor(sponsor);
        setStock(stock);
        setTeam(team);
        setShowGraph(!showGraph);



    }

    function closeNav() {
        setNavOpen(false);
        setDriver([]);
        setDate('');

        setShowGraph(!showGraph);
    }

    const handleDropdownDrivers = (e) => {
        setDriver([]);

        let drivers = [];


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

                <div className="w" style ={{display: navOpen ? "none" : "block"}}>
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
                            <li><strong>Race Date: </strong>{date}</li>
                            {driver.map((driver, index) => (
                                <li key={index}><strong>Driver:</strong> {driver.driver}  <strong>Race Position:</strong> {driver.racePosition}</li>
                            ))}
 
                        </div>
                        <div className="stockgraph">
                            <div className="svgcontainer">
                            {showGraph && <LineGraph stockName={stock} ref={lineGraphRef} />}
                            </div>
                        </div>
                    </div>
                </div>



            </>
        </>



    );
}
export default StockSearch;