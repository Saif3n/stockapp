import React, { useEffect, useState, useRef } from "react";
import LineGraph from './LineGraph';
import { appendAdditionalElements } from './LineGraph';
import { raceArr } from './Data';


let arr = [];
let defArr = [];
let curTeamArr = [];
let teamArr = [];

let svgObj = {};



function StockSearch() {


    const [value, setValue] = useState('');
    const [result, setResult] = useState([]);
    const [sponsor, setSponsor] = useState('');
    const [stock, setStock] = useState('');

    const [team, setTeam] = useState('');
    const [driver, setDriver] = useState([]);

    const [navOpen, setNavOpen] = useState(false);
    const [showGraph, setShowGraph] = useState(false);

    const lineGraphRef = useRef();

    useEffect(() => {

        //personalbackendreact.azurewebsites.net
        fetch("https://personalbackendreact.azurewebsites.net/GetAllSponsors").then(
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
        setShowGraph(!showGraph);
    }

    const handleDropdownDrivers = (e) => {
        setDriver([]);

        let drivers = [];

        appendAdditionalElements(raceArr[e.target.value], svgObj.polyLineData, svgObj.svg, svgObj.xScale, svgObj.yScale, svgObj.yMin, svgObj.yMax);

        fetch("https://personalbackendreact.azurewebsites.net/GetResultByTeam?teamName=" + team + "&race=" + e.target.value).then(
            response => response.json()
        ).then((response) => {
            for (const element in response) {

                drivers.push(response[element])
                setDriver(prevResult => {
                    return [...prevResult, drivers[element]]
                });
            }

        });


    }

    const handleTargetVal = (polyLineData, svg, xScale, yScale, yMin, yMax) => {
        svgObj = {polyLineData, svg, xScale, yScale, yMin, yMax}
        console.log(svgObj);
    };


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

                <div className="w" style={{ display: navOpen ? "none" : "block" }}>
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
                            {Object.keys(raceArr).map((country, index) => (
                                <option key={index} value={country}>{country} ({raceArr[country]})</option>
                            ))}
                        </select>

                        <div>
                            <li></li>
                            {driver.map((driver, index) => (
                                <li key={index}><strong>Driver:</strong> {driver.driver}  <strong>Race Position:</strong> {driver.racePosition}</li>
                            ))}

                        </div>
                        <div className="stockgraph">
                            <div className="svgcontainer">
                                {showGraph && <LineGraph stockName={stock} ref={lineGraphRef} onTargetVal={handleTargetVal} />}
                            </div>
                        </div>
                    </div>
                </div>



            </>
        </>



    );
}
export default StockSearch;