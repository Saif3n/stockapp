
import React from "react"


function Stock() {
    let element = 0;
    const fetchPromise = fetch("https://personalbackendreact.azurewebsites.net/gjsgj20ujsa0dfjfbv0dgbjdfiugj459yo");
    const data = fetchPromise.then(response => response.json()).then((response) => {
        for (element in response) {
            console.log(response[element].sponsorName)
        }
    });







return (<div className="visited"><p> was the last user to leave a message.</p></div>);
}
export default Stock;