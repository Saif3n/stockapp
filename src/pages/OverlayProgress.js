// import React, { useState } from 'react';

// const OverlayProgress = () => {
//     

//     return (
//         <div>
//             {showOverlay ? (
//                 <div className="progressoverlay">
//                     <div className="overlaycontent">
//                         Please note, this website is still heavily under development. You should consider this a minimum viable product. <br></br><br></br> (I've done most of the stock related-SVG elements + backend logic. I've yet to finish the front-end of this website - it will look vastly different to how it looks right now, so watch this space)
//                         <br></br>
//                         <br></br>
//                         Last updated on: 12/01/2023
//                         <span className="close-button" onClick={() => setShowOverlay(false)}>Click to view website!</span>
//                     </div>

//                 </div>
//             ) : null
//             }
//         </div>
//     );
// }

// export default OverlayProgress;


import LoadingSpinner from './LoadingSpinner';
import React, {useEffect, useState } from 'react';

const LineGraph = React.forwardRef((props, ref) => {
    const [showOverlay, setShowOverlay] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);

        setTimeout(() => {
          
            fetch(`https://localhost:7024/WakeUp`)
                .then(response => response.json())
                .then(data => {
                    setIsLoading(false);
                })
                .catch(error => {
                    setIsLoading(false);
                });
   
            }, 5000);
    }, []);



    return (
        <div>
            {showOverlay ? (
                <div className="progressoverlay">
                    <div className="overlaycontent">
                        Please note, this website is still heavily under development. You should consider this a minimum viable product. <br></br><br></br> (I've done most of the stock related-SVG elements + backend logic. I've yet to finish the front-end of this website - it will look vastly different to how it looks right now, so watch this space)
                        <br></br>
                        <br></br>
                        Last updated on: 12/01/2023
                        {isLoading ? <LoadingSpinner /> : <span className="close-button" onClick={() => setShowOverlay(false)}>Click to view website!</span>}
                        
                    </div>

                </div>
            ) : null
            }
        </div>
    );

    // return (
    //     <div>
    //         <svg ref={svgRef} width={width} height={height}></svg>
    //         <p>hello</p>
    //     </div>
    // );
});
export default LineGraph;