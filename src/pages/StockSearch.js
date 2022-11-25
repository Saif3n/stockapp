import React, { useEffect, useState } from "react"
// import Dropdown from 'react-bootstrap/Dropdown';
// import DropdownButton from 'react-bootstrap/DropdownButton';
import 'bootstrap/dist/css/bootstrap.min.css';

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
    const [navOpen, setNavOpen] = useState(false);


    useEffect(() => {
        if (done === 0) {
            fetch("https://localhost:7024/gjsgj20ujsa0dfjfbv0dgbjdfiugj459yo").then(
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

    const handleDropdownChange = e => {

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
                    <div>
                        <svg id="svggraph" viewBox="-100 -100 1940 1805">
                            <rect class="bar" fill="#ffd311fb" width="10" x="0" y="180" height="1325"></rect>
                            <rect class="bar" fill="blue" width="10" x="10" y="1306" height="199"></rect>
                            <rect class="bar" fill="#ffd311fb" width="10" x="30" y="442" height="1063"></rect>
                            <rect class="bar" fill="blue" width="10" x="40" y="1298" height="207"></rect>
                            <rect class="bar" fill="#ffd311fb" width="10" x="60" y="441" height="1064"></rect>
                            <rect class="bar" fill="blue" width="10" x="70" y="1402" height="103"></rect>
                            <rect class="bar" fill="#ffd311fb" width="10" x="90" y="559" height="946"></rect>
                            <rect class="bar" fill="blue" width="10" x="100" y="1505" height="0"></rect>
                            <rect class="bar" fill="#ffd311fb" width="10" x="120" y="729" height="776"></rect>
                            <rect class="bar" fill="blue" width="10" x="130" y="1505" height="0"></rect>
                            <rect class="bar" fill="#ffd311fb" width="10" x="150" y="534" height="971"></rect>
                            <rect class="bar" fill="blue" width="10" x="160" y="1386" height="119"></rect>
                            <rect class="bar" fill="#ffd311fb" width="10" x="180" y="531" height="974"></rect>
                            <rect class="bar" fill="blue" width="10" x="190" y="1323" height="182"></rect>
                            <rect class="bar" fill="#ffd311fb" width="10" x="210" y="975" height="530"></rect>
                            <rect class="bar" fill="blue" width="10" x="220" y="1259" height="246"></rect>
                            <rect class="bar" fill="#ffd311fb" width="10" x="240" y="0" height="1505"></rect>
                            <rect class="bar" fill="blue" width="10" x="250" y="1281" height="224"></rect>
                            <rect class="bar" fill="#ffd311fb" width="10" x="270" y="688" height="817"></rect>
                            <rect class="bar" fill="blue" width="10" x="280" y="1315" height="190"></rect>
                            <rect class="bar" fill="#ffd311fb" width="10" x="300" y="149" height="1356"></rect>
                            <rect class="bar" fill="blue" width="10" x="310" y="1505" height="0"></rect>
                            <rect class="bar" fill="#ffd311fb" width="10" x="330" y="973" height="532"></rect>
                            <rect class="bar" fill="blue" width="10" x="340" y="1505" height="0"></rect>
                            <rect class="bar" fill="#ffd311fb" width="10" x="360" y="474" height="1031"></rect>
                            <rect class="bar" fill="blue" width="10" x="370" y="1311" height="194"></rect>
                            <rect class="bar" fill="#ffd311fb" width="10" x="390" y="311" height="1194"></rect>
                            <rect class="bar" fill="blue" width="10" x="400" y="1268" height="237"></rect>
                            <rect class="bar" fill="#ffd311fb" width="10" x="420" y="924" height="581"></rect>
                            <rect class="bar" fill="blue" width="10" x="430" y="1339" height="166"></rect>
                            <rect class="bar" fill="#ffd311fb" width="10" x="450" y="548" height="957"></rect>
                            <rect class="bar" fill="blue" width="10" x="460" y="1406" height="99"></rect>
                            <rect class="bar" fill="#ffd311fb" width="10" x="480" y="7" height="1498"></rect>
                            <rect class="bar" fill="blue" width="10" x="490" y="1386" height="119"></rect>
                            <rect class="bar" fill="#ffd311fb" width="10" x="510" y="235" height="1270"></rect>
                            <rect class="bar" fill="blue" width="10" x="520" y="1505" height="0"></rect>
                            <rect class="bar" fill="#ffd311fb" width="10" x="540" y="621" height="884"></rect>
                            <rect class="bar" fill="blue" width="10" x="550" y="1505" height="0"></rect>
                            <rect class="bar" fill="#ffd311fb" width="10" x="570" y="38" height="1467"></rect>
                            <rect class="bar" fill="blue" width="10" x="580" y="1377" height="128"></rect>
                            <rect class="bar" fill="#ffd311fb" width="10" x="600" y="282" height="1223"></rect>
                            <rect class="bar" fill="blue" width="10" x="610" y="1347" height="158"></rect>
                            <rect class="bar" fill="#ffd311fb" width="10" x="630" y="729" height="776"></rect>
                            <rect class="bar" fill="blue" width="10" x="640" y="1418" height="87"></rect>
                            <rect class="bar" fill="#ffd311fb" width="10" x="660" y="203" height="1302"></rect>
                            <rect class="bar" fill="blue" width="10" x="670" y="1273" height="232"></rect>
                            <rect class="bar" fill="#ffd311fb" width="10" x="690" y="544" height="961"></rect>
                            <rect class="bar" fill="blue" width="10" x="700" y="1378" height="127"></rect>
                            <rect class="bar" fill="#ffd311fb" width="10" x="720" y="782" height="723"></rect>
                            <rect class="bar" fill="blue" width="10" x="730" y="1505" height="0"></rect>
                            <rect class="bar" fill="#ffd311fb" width="10" x="750" y="280" height="1225"></rect>
                            <rect class="bar" fill="blue" width="10" x="760" y="1505" height="0"></rect>
                            <rect class="bar" fill="#ffd311fb" width="10" x="780" y="513" height="992"></rect>
                            <rect class="bar" fill="blue" width="10" x="790" y="1326" height="179"></rect>
                            <rect class="bar" fill="#ffd311fb" width="10" x="810" y="119" height="1386"></rect>
                            <rect class="bar" fill="blue" width="10" x="820" y="1404" height="101"></rect>
                            <rect class="bar" fill="#ffd311fb" width="10" x="840" y="263" height="1242"></rect>
                            <rect class="bar" fill="blue" width="10" x="850" y="1288" height="217"></rect>
                            <rect class="bar" fill="#ffd311fb" width="10" x="870" y="319" height="1186"></rect>
                            <rect class="bar" fill="blue" width="10" x="880" y="1282" height="223"></rect>
                            <rect class="bar" fill="#ffd311fb" width="10" x="900" y="785" height="720"></rect>
                            <rect class="bar" fill="blue" width="10" x="910" y="1325" height="180"></rect>
                            <rect class="bar" fill="#ffd311fb" width="10" x="930" y="100" height="1405"></rect>
                            <rect class="bar" fill="blue" width="10" x="940" y="1505" height="0"></rect>
                            <rect class="bar" fill="#ffd311fb" width="10" x="960" y="159" height="1346"></rect>
                            <rect class="bar" fill="blue" width="10" x="970" y="1505" height="0"></rect>
                            <rect class="bar" fill="#ffd311fb" width="10" x="990" y="355" height="1150"></rect>
                            <rect class="bar" fill="blue" width="10" x="1000" y="1409" height="96"></rect>
                            <rect class="bar" fill="#ffd311fb" width="10" x="1020" y="784" height="721"></rect>
                            <rect class="bar" fill="blue" width="10" x="1030" y="1288" height="217"></rect>
                            <rect class="bar" fill="#ffd311fb" width="10" x="1050" y="519" height="986"></rect>
                            <rect class="bar" fill="blue" width="10" x="1060" y="1256" height="249"></rect>
                            <rect class="bar" fill="#ffd311fb" width="10" x="1080" y="279" height="1226"></rect>
                            <rect class="bar" fill="blue" width="10" x="1090" y="1320" height="185"></rect>
                            <rect class="bar" fill="#ffd311fb" width="10" x="1110" y="904" height="601"></rect>
                            <rect class="bar" fill="blue" width="10" x="1120" y="1291" height="214"></rect>
                            <rect class="bar" fill="#ffd311fb" width="10" x="1140" y="280" height="1225"></rect>
                            <rect class="bar" fill="blue" width="10" x="1150" y="1505" height="0"></rect>
                            <rect class="bar" fill="#ffd311fb" width="10" x="1170" y="91" height="1414"></rect>
                            <rect class="bar" fill="blue" width="10" x="1180" y="1505" height="0"></rect>
                            <rect class="bar" fill="#ffd311fb" width="10" x="1200" y="524" height="981"></rect>
                            <rect class="bar" fill="blue" width="10" x="1210" y="1406" height="99"></rect>
                            <rect class="bar" fill="#ffd311fb" width="10" x="1230" y="677" height="828"></rect>
                            <rect class="bar" fill="blue" width="10" x="1240" y="1340" height="165"></rect>
                            <rect class="bar" fill="#ffd311fb" width="10" x="1260" y="532" height="973"></rect>
                            <rect class="bar" fill="blue" width="10" x="1270" y="1316" height="189"></rect>
                            <rect class="bar" fill="#ffd311fb" width="10" x="1290" y="188" height="1317"></rect>
                            <rect class="bar" fill="blue" width="10" x="1300" y="1286" height="219"></rect>
                            <rect class="bar" fill="#ffd311fb" width="10" x="1320" y="233" height="1272"></rect>
                            <rect class="bar" fill="blue" width="10" x="1330" y="1294" height="211"></rect>
                            <rect class="bar" fill="#ffd311fb" width="10" x="1350" y="708" height="797"></rect>
                            <rect class="bar" fill="blue" width="10" x="1360" y="1505" height="0"></rect>
                            <rect class="bar" fill="#ffd311fb" width="10" x="1380" y="335" height="1170"></rect>
                            <rect class="bar" fill="blue" width="10" x="1390" y="1505" height="0"></rect>
                            <rect class="bar" fill="#ffd311fb" width="10" x="1410" y="716" height="789"></rect>
                            <rect class="bar" fill="blue" width="10" x="1420" y="1379" height="126"></rect>
                            <rect class="bar" fill="#ffd311fb" width="10" x="1440" y="781" height="724"></rect>
                            <rect class="bar" fill="blue" width="10" x="1450" y="1289" height="216"></rect>
                            <rect class="bar" fill="#ffd311fb" width="10" x="1470" y="936" height="569"></rect>
                            <rect class="bar" fill="blue" width="10" x="1480" y="1406" height="99"></rect>
                            <rect class="bar" fill="#ffd311fb" width="10" x="1500" y="306" height="1199"></rect>
                            <rect class="bar" fill="blue" width="10" x="1510" y="1325" height="180"></rect>
                            <rect class="bar" fill="#ffd311fb" width="10" x="1530" y="69" height="1436"></rect>
                            <rect class="bar" fill="blue" width="10" x="1540" y="1324" height="181"></rect>
                            <rect class="bar" fill="#ffd311fb" width="10" x="1560" y="68" height="1437"></rect>
                            <rect class="bar" fill="blue" width="10" x="1570" y="1505" height="0"></rect>
                            <rect class="bar" fill="#ffd311fb" width="10" x="1590" y="96" height="1409"></rect>
                            <rect class="bar" fill="blue" width="10" x="1600" y="1505" height="0"></rect>
                            <rect class="bar" fill="#ffd311fb" width="10" x="1620" y="911" height="594"></rect>
                            <rect class="bar" fill="blue" width="10" x="1630" y="1315" height="190"></rect>
                            <rect class="bar" fill="#ffd311fb" width="10" x="1650" y="897" height="608"></rect>
                            <rect class="bar" fill="blue" width="10" x="1660" y="1413" height="92"></rect>
                            <rect class="bar" fill="#ffd311fb" width="10" x="1680" y="43" height="1462"></rect>
                            <rect class="bar" fill="blue" width="10" x="1690" y="1328" height="177"></rect>
                            <rect class="bar" fill="#ffd311fb" width="10" x="1710" y="856" height="649"></rect>
                            <rect class="bar" fill="blue" width="10" x="1720" y="1350" height="155"></rect>
                            <rect y="0" width="1740" height="1505" fill="transparent" stroke="black" stroke-width="1"></rect><text
                                x="-40" y="15" font-size="15">1505</text> <text x="-40" y="1505" font-size="15">0</text><text
                                    x="0" y="-20" font-size="40">Attendance Chart</text><text x="1640" y="20"
                                        font-size="15">24/11/2022</text><text x="10" y="20" font-size="15">28/09/2022</text><text x="0"
                                            y="1530" font-size="11.3">In-person log: 199 207 103 0 0 119 182 246 224 190 0 0 194 237 166 99
                                119 0 0 128 158 87 232 127 0 0 179 101 217 223 180 0 0 96 217 249 185 214 0 0 99 165 189 219 211
                                0 0 126 216 99 180 181 0 0 190 92 177 155</text><text x="0" y="1555" font-size="11.3">Online
                                    log: 1325 1063 1064 946 776 971 974 530 1505 817 1356 532 1031 1194 581 957 1498 1270 884 1467
                                    1223 776 1302 961 723 1225 992 1386 1242 1186 720 1405 1346 1150 721 986 1226 601 1225 1414 981
                                    828 973 1317 1272 797 1170 789 724 569 1199 1436 1437 1409 594 608 1462 649</text>
                        </svg>
                    </div>
                </div>
            </div>


        </>



    );
}
export default StockSearch;