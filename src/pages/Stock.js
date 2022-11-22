
import React from "react"


function Stock() {
    let element = 0;
    const fetchPromise = fetch("https://localhost:7024/gjsgj20ujsa0dfjfbv0dgbjdfiugj459yo");
    const data = fetchPromise.then(response => response.json()).then((response) => {
        for (element in response) {
            console.log(response[element].sponsorName)
        }
    });

    const openNav = e => {
        document.getElementById("myNav").style.width = "100%";
    }

    const closeNav = e => {
        document.getElementById("myNav").style.width = "0%";
    }







return (

   <><div id="myNav" class="overlay">


   <a href="javascript:void(0)" className="closebtn" onclick={closeNav}>&times;</a>
 

   <div class="overlay-content">
     <a href="#">About</a>
     <a href="#">Services</a>
     <a href="#">Clients</a>
     <a href="#">Contact</a>
   </div>
 
 </div>
 

 <span onclick={openNav}>open</span></>

);
}
export default Stock;