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

    })

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
        setDriver([]);
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

                    <div>
                        {driver.map((driver, index) => (
                            <li key={index}><strong>Driver:</strong> {driver.driver}  <strong>Race Position:</strong> {driver.racePosition}</li>
                        ))}
                    </div>
                    <div>

                    <svg class="svggraph" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1050 850 ">
  <polyline fill="none" stroke="#0074d9" stroke-width="2"
    points="0,240,10,248,20,147,30,273,40,285,50,162,60,223,70,286,80,265,90,231,100,257,110,288,120,235,130,278,140,208,150,143,160,163,170,225,180,115,190,171,200,200,210,131,220,273,230,170,240,136,250,183,260,221,270,145,280,258,290,264,300,222,310,271,320,125,330,140,340,258,350,289,360,227,370,255,380,241,390,132,400,144,410,207,420,230,430,260,440,252,450,278,460,204,470,169,480,257,490,143,500,222,510,223,520,149,530,121,540,232,550,136,560,219,570,198,580,231,590,150,600,110,610,263,620,160,630,282,640,179,650,160,660,205,670,160,680,262,690,128,700,182,710,133,720,220,730,233,740,141,750,219,760,289,770,121,780,261,790,226,800,284,810,202,820,256,830,213,840,231,850,164,860,193,870,148,880,151,890,190,900,113,910,256">
  </polyline>
 <text x="918.1" y="95">Max:289</text><text x="918.1" y="284">Min:81</text><text x=""
    y="307">31/08/2022</text><text x="830.1" y="307">30/11/2022</text><text x="" y="330">played: </text>
   <rect x=""y="81" width="915.1" height="209" fill="transparent" stroke="black" stroke-width="1"> </rect>
</svg>
                    </div>
                </div>
            </div>


        </>



    );
}
export default StockSearch;