import LoadingSpinner from './LoadingSpinner';
import React, {useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';

const OverlayProgress = React.forwardRef((props, ref) => {
    const [showOverlay, setShowOverlay] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);

            fetch(`https://localhost:7024/WakeUp`)
                .then(response => response.json())
                .then(data => {
                    setIsLoading(false);
                })
                .catch(error => {
                    setIsLoading(false);
                });
   
    }, []);



    return (
        <div>
            {showOverlay ? (
                <div className="progressoverlay">
                    <div className="overlaycontent">
                        Please note, this website is still heavily under development. You should consider this a minimum viable product. <br></br><br></br> (Most of the stock related-SVG elements + backend logic, but I've yet to finish the front-end of this website - it will look vastly different to how it looks right now, so watch this space!)
                        <br></br>
                        <br></br>
                        Last updated on: 15/01/2023
                        {isLoading ? <LoadingSpinner /> : <span className="close-button" onClick={() => setShowOverlay(false)}>Click to view website!</span>}
               
                    </div>
                    <div className="footer">My endpoints are hosted on Microsoft Azure, after a period of inactivity, the endpoints may take a while to 'wake up' again.</div>

                </div>
            ) : null
            }
        </div>
    );

});
export default OverlayProgress;