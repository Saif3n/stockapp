import React, { useRef, useState } from 'react';
import LineGraph from './LineGraph';

const TextComp = () => {
    const [showGraph, setShowGraph] = useState(false);
    const lineGraphRef = useRef();

    const handleClick = () => {
        // Access the LineGraph function using the ref
        setShowGraph(!showGraph);
    }

    return (
        <div>
            {showGraph && <LineGraph ref={lineGraphRef} />}
            <button onClick={handleClick}>Click me!</button>
        </div>
    );
};

export default TextComp;
