import React, { useEffect, useState } from "react"
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import 'bootstrap/dist/css/bootstrap.min.css';

let done = 0;

let arr = [];
let defArr = [];
let curTeamArr = [];
let teamArr = [];

function StockSearch() {

    const [value, setValue] = useState('');
    const [result, setResult] = useState([]);
    const [sponsor, setSponsor] = useState('')


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
            setResult(arr);
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
        console.log(arr)
    }

    const openNav = (sponsor) => {
        document.getElementById("myNav").style.width = "100%";
        console.log(sponsor)
    }

    const closeNav = e => {
        document.getElementById("myNav").style.width = "0%";
    }





    return (
        <>
        <form>
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
                    <ul key={index} className={result.teamName} onClick={()=> openNav(result.sponsorName)}>
                        <li ><strong>{result.sponsorName}</strong></li>
                        <li>{result.teamName}</li>

                    </ul>
                ))}
            </div>

        </form>
        <><div id="myNav" className="overlay">


   <a className="closebtn" onClick={closeNav}>x</a>
 

   <div className="overlay-content">
     <a href="#">About</a>
     <a href="#">Services</a>
     <a href="#">Clients</a>
     <a href="#">Contact</a>
   </div>
 
 </div>
 
</>
                    </>
        


    );
}
export default StockSearch;