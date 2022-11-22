
import React from "react"


function Stock() {


    const openNav = e => {
        document.getElementById("myNav").style.width = "100%";
        console.log('test')
    }

    const closeNav = e => {
        document.getElementById("myNav").style.width = "0%";
    }







return (

   <><div id="myNav" className="overlay">


   <a className="closebtn" onClick={closeNav}>poop</a>
 

   <div className="overlay-content">
     <a href="#">About</a>
     <a href="#">Services</a>
     <a href="#">Clients</a>
     <a href="#">Contact</a>
   </div>
 
 </div>
 

 <span onClick={openNav}>open</span></>

);
}
export default Stock;