import React, { useEffect, useState } from "react"
let done = 0;
var arr = [];
function StockSearch(props){

    const [value, setValue] = useState('');
    const [result, setResult] = useState([]);
    
    

    useEffect(()=>{
        console.log('first: ' + done)
        if (done === 0){
            fetch("https://personalbackendreact.azurewebsites.net/gjsgj20ujsa0dfjfbv0dgbjdfiugj459yo").then(
                response => response.json()
            ).then((response)=>{
                for (var i in response){
                    arr.push(response[i]);
                }
            })
            done = 1;
        }

        if (value.length>0) {
                setResult([]);
                let query = value.toLowerCase();
                console.log("query: " + query)
                for (const element in arr){
                    let val = arr[element].sponsorName.toLowerCase();
                    console.log("value: " + val)
                    if (val.slice(0, query.length).indexOf(query) !== -1){
                        setResult(prevResult =>{
                            console.log(arr[element].sponsorName)
                            return [...prevResult, arr[element].sponsorName]
                        });
                    }
                }
        } else {
            setResult([])
        }
        
      }, [value])

        return(
          <form>
            <label>
              Name:
              <input type="text" onChange={(event) => setValue(event.target.value)} value={value}/>
            </label>
            <div className="">
                {result.map((result, index) =>(
                    <div className="searchEntry">
                        {result}
                    </div>
                ))}
            </div>
          </form>
        );
        }
export default StockSearch;