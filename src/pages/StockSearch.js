import React, { useEffect, useState } from "react"

function StockSearch(props){

    const [value, setValue] = useState('');
    const [result, setResult] = useState([]);

    useEffect(()=>{
        if (value.length>0){
            fetch("https://personalbackendreact.azurewebsites.net/gjsgj20ujsa0dfjfbv0dgbjdfiugj459yo").then(
                response => response.json()
            ).then((response)=>{
                setResult([]);
                
                for (const element in response){
                    let val = value.toLowerCase();

                }
            });
        } else{
            setResult([]);
        }
        
      }, [value])
    
    //   handleSubmit(event) {
    //     alert('A name was submitted: ' + this.state.value);
    //     event.preventDefault();
    //     console.log(this.state.value)
    //   }

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