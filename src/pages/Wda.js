// // import React, { useRef, useEffect } from 'react';
// // import * as d3 from 'd3';

// // const LineGraph = React.forwardRef((props, ref) => {

// //   const firstRaceDate = new Date('2022-03-18');
// //   const lastRaceDate = new Date('2022-11-22');

// //   let val = 0;
// //   let curr = 0;
// //   let dataFetch = [];

// //   const name = props.stockName;
// //   console.log(name)

// //   const fetchPromise = fetch("https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=" + name + "&outputsize=full&apikey=" + process.env.STOCK_API);
// //   const promise = fetchPromise.then(response => response.json()).then((response) => {

// //     const polyLineData = [];
// //     for (const element in response['Time Series (Daily)']) {
// //       const dateOfElement = new Date(element);

// //       if (dateOfElement > firstRaceDate && dateOfElement < lastRaceDate) {
// //         curr = parseInt(response['Time Series (Daily)'][element]["4. close"]) + 50;

// //         polyLineData.push(val, curr);
// //         val = val + 1.5;

// //       }

// //     }
// //    dataFetch = polyLineData;
// //    console.log('---------')
// //    console.log(dataFetch);
// //   })

  
// //   const data = [
// //     // 0, 122, 1.5, 123, 3, 123, 4.5, 122, 6, 126, 7.5, 123, 9, 122, 10.5, 118, 12, 109, 13.5, 113, 15, 113, 16.5, 112, 18, 110, 19.5, 108, 21, 109, 22.5, 110, 24, 112, 25.5, 108, 27, 109, 28.5, 111, 30, 108, 31.5, 108, 33, 107, 34.5, 107, 36, 107, 37.5, 107, 39, 105, 40.5, 108, 42, 107, 43.5, 107, 45, 107, 46.5, 108, 48, 117, 49.5, 117, 51, 117, 52.5, 116, 54, 113, 55.5, 114, 57, 118, 58.5, 117, 60, 116, 61.5, 117, 63, 119, 64.5, 124, 66, 125, 67.5, 126, 69, 126, 70.5, 126, 72, 127, 73.5, 127, 75, 134, 76.5, 135, 78, 132, 79.5, 129, 81, 128, 82.5, 130, 84, 132, 85.5, 134, 87, 136, 88.5, 138, 90, 141, 91.5, 147, 93, 142, 94.5, 142, 96, 142, 97.5, 145, 99, 150, 100.5, 148, 102, 150, 103.5, 151, 105, 150, 106.5, 148, 108, 149, 109.5, 145, 111, 150, 112.5, 152, 114, 153, 115.5, 148, 117, 149, 118.5, 146, 120, 144, 121.5, 141, 123, 139, 124.5, 135, 126, 137, 127.5, 138, 129, 141, 130.5, 139, 132, 135, 133.5, 131, 135, 131, 136.5, 128, 138, 127, 139.5, 126, 141, 126, 142.5, 129, 144, 129, 145.5, 125, 147, 125, 148.5, 123, 150, 126, 151.5, 127, 153, 130, 154.5, 136, 156, 137, 157.5, 132, 159, 133, 160.5, 133, 162, 131, 163.5, 132, 165, 139, 166.5, 136, 168, 136, 169.5, 144, 171, 148, 172.5, 151, 174, 155, 175.5, 155, 177, 156, 178.5, 158, 180, 151, 181.5, 151, 183, 152, 184.5, 148, 186, 142, 187.5, 141, 189, 145, 190.5, 143, 192, 146, 193.5, 146, 195, 152, 196.5, 144, 198, 145, 199.5, 137, 201, 137, 202.5, 138, 204, 136, 205.5, 145, 207, 143, 208.5, 149, 210, 141, 211.5, 139, 213, 135, 214.5, 139, 216, 134, 217.5, 135, 219, 140, 220.5, 138, 222, 139, 223.5, 144, 225, 146, 226.5, 143, 228, 143, 229.5, 147, 231, 145, 232.5, 147, 234, 151, 235.5, 153, 237, 153, 238.5, 156, 240, 160, 241.5, 158, 243, 159, 244.5, 169, 246, 173, 247.5, 170, 249, 169, 250.5, 170, 252, 163, 253.5, 164, 255, 165
// //   ];
// //   console.log(data);

// //   const xCoords = data.filter((d, i) => i % 2 === 0);
// //   const yCoords = data.filter((d, i) => i % 2 !== 0);
// //   const coords = d3.zip(xCoords, yCoords)
// //     .map(d => ({ x: d[0], y: d[1] }));

// //   const width = 500;
// //   const height = 300;
// //   const margin = { top: 20, right: 20, bottom: 30, left: 50 };

// //   const xScale = d3.scaleLinear()
// //     .domain([0, d3.max(coords, d => d.x)])
// //     .range([margin.left, width - margin.right]);

// //   // changes accordingly when entering into stocksearc
// //   const testParse = parseInt(d3.max(coords, d => d.y)) + 100;
// //   const yScale = d3.scaleLinear()
// //     .domain([40, testParse])
// //     .range([height - margin.bottom, margin.top]);

// //   const line = d3.line()
// //     .x(d => xScale(d.x))
// //     .y(d => yScale(d.y));

// //   const svgRef = useRef();

// //   useEffect(() => {
// //     const svg = d3.select(svgRef.current);
// //     // svg.append("g")
// //     //   .attr("transform", `translate(0, ${height - margin.bottom})`)
// //     //   .call(d3.axisBottom(xScale).tickSize(0));

// //     svg.append("rect")
// //       .attr("x", margin.left)
// //       .attr("y", margin.top)
// //       .attr("width", width - margin.left - margin.right)
// //       .attr("height", height - margin.top - margin.bottom)
// //       .attr("stroke", "black")
// //       .attr("fill", "none");


// //     svg.append("g")
// //       .attr("transform", `translate(${margin.left}, 0)`)
// //       .call(d3.axisLeft(yScale));
// //     svg.append("path")
// //       .datum(coords)
// //       .attr("fill", "none")
// //       .attr("stroke", "steelblue")
// //       .attr("stroke-linejoin", "round")
// //       .attr("stroke-linecap", "round")
// //       .attr("stroke-width", 1.5)
// //       .attr("d", line);
// //   }, []);

// //   return (
// //     <svg ref={svgRef} width={width} height={height} />
// //   );
// // });

// // export default LineGraph;

// // --------------

// import React, { useRef, useEffect, useState} from 'react';
// import * as d3 from 'd3';

// const LineGraph = React.forwardRef((props, ref) => {
//   const [dataTest, setDataTest] = useState(null);
//   const firstRaceDate = new Date('2022-03-18');
//   const lastRaceDate = new Date('2022-11-22');

//   let val = 0;
//   let curr = 0;
//   let dataFetch = [];

//   const name = props.stockName;
//   console.log(name)
//   useEffect(() => {
//     const fetchData = async () => {
//       const fetchPromise = await fetch("https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=" + name + "&outputsize=full&apikey=" + process.env.STOCK_API);
//       const dataTest = await fetchPromise.json();

//       const polyLineData = [];
//       for (const element in dataTest['Time Series (Daily)']) {
//         const dateOfElement = new Date(element);

//         if (dateOfElement > firstRaceDate && dateOfElement < lastRaceDate) {
//           curr = parseInt(dataTest['Time Series (Daily)'][element]["4. close"]) + 50;

//           polyLineData.push(val, curr);
//           val = val + 1.5;

//         }

//       }
//       dataFetch = polyLineData;
//       setDataTest(dataFetch);
//     }
//     fetchData();
//   }, []);

//   if (!dataTest) {
//     return <p>Loading data...</p>;
//   }
//   // const data = [
//   //   0, 122, 1.5, 123, 3, 123, 4.5, 122, 6, 126, 7.5, 123, 9, 122, 10.5, 118, 12, 109, 13.5, 113, 15, 113, 16.5, 112, 18, 110, 19.5, 108, 21, 109, 22.5, 110, 24, 112, 25.5, 108, 27, 109, 28.5, 111, 30, 108, 31.5, 108, 33, 107, 34.5, 107, 36, 107, 37.5, 107, 39, 105, 40.5, 108, 42, 107, 43.5, 107, 45, 107, 46.5, 108, 48, 117, 49.5, 117, 51, 117, 52.5, 116, 54, 113, 55.5, 114, 57, 118, 58.5, 117, 60, 116, 61.5, 117, 63, 119, 64.5, 124, 66, 125, 67.5, 126, 69, 126, 70.5, 126, 72, 127, 73.5, 127, 75, 134, 76.5, 135, 78, 132, 79.5, 129, 81, 128, 82.5, 130, 84, 132, 85.5, 134, 87, 136, 88.5, 138, 90, 141, 91.5, 147, 93, 142, 94.5, 142, 96, 142, 97.5, 145, 99, 150, 100.5, 148, 102, 150, 103.5, 151, 105, 150, 106.5, 148, 108, 149, 109.5, 145, 111, 150, 112.5, 152, 114, 153, 115.5, 148, 117, 149, 118.5, 146, 120, 144, 121.5, 141, 123, 139, 124.5, 135, 126, 137, 127.5, 138, 129, 141, 130.5, 139, 132, 135, 133.5, 131, 135, 131, 136.5, 128, 138, 127, 139.5, 126, 141, 126, 142.5, 129, 144, 129, 145.5, 125, 147, 125, 148.5, 123, 150, 126, 151.5, 127, 153, 130, 154.5, 136, 156, 137, 157.5, 132, 159, 133, 160.5, 133, 162, 131, 163.5, 132, 165, 139, 166.5, 136, 168, 136, 169.5, 144, 171, 148, 172.5, 151, 174, 155, 175.5, 155, 177, 156, 178.5, 158, 180, 151, 181.5, 151, 183, 152, 184.5, 148, 186, 142, 187.5, 141, 189, 145, 190.5, 143, 192, 146, 193.5, 146, 195, 152, 196.5, 144, 198, 145, 199.5, 137, 201, 137, 202.5, 138, 204, 136, 205.5, 145, 207, 143, 208.5, 149, 210, 141, 211.5, 139, 213, 135, 214.5, 139, 216, 134, 217.5, 135, 219, 140, 220.5, 138, 222, 139, 223.5, 144, 225, 146, 226.5, 143, 228, 143, 229.5, 147, 231, 145, 232.5, 147, 234, 151, 235.5, 153, 237, 153, 238.5, 156, 240, 160, 241.5, 158, 243, 159, 244.5, 169, 246, 173, 247.5, 170, 249, 169, 250.5, 170, 252, 163, 253.5, 164, 255, 165
//   // ];
//   let data = dataTest;
//   console.log(data);

//   const xCoords = data.filter((d, i) => i % 2 === 0);
//   const yCoords = data.filter((d, i) => i % 2 !== 0);
//   const coords = d3.zip(xCoords, yCoords)
//     .map(d => ({ x: d[0], y: d[1] }));

//   const width = 500;
//   const height = 300;
//   const margin = { top: 20, right: 20, bottom: 30, left: 50 };

//   const xScale = d3.scaleLinear()
//     .domain([0, d3.max(coords, d => d.x)])
//     .range([margin.left, width - margin.right]);

//   // changes accordingly when entering into stocksearc
//   const testParse = parseInt(d3.max(coords, d => d.y)) + 100;
//   const yScale = d3.scaleLinear()
//     .domain([40, testParse])
//     .range([height - margin.bottom, margin.top]);

//   const line = d3.line()
//     .x(d => xScale(d.x))
//     .y(d => yScale(d.y));

//   const svgRef = useRef();

//   useEffect(() => {
//     const svg = d3.select(svgRef.current);
//     // svg.append("g")
//     //   .attr("transform", `translate(0, ${height - margin.bottom})`)
//     //   .call(d3.axisBottom(xScale).tickSize(0));

//     svg.append("rect")
//       .attr("x", margin.left)
//       .attr("y", margin.top)
//       .attr("width", width - margin.left - margin.right)
//       .attr("height", height - margin.top - margin.bottom)
//       .attr("stroke", "black")
//       .attr("fill", "none");


//     svg.append("g")
//       .attr("transform", `translate(${margin.left}, 0)`)
//       .call(d3.axisLeft(yScale));
//     svg.append("path")
//       .datum(coords)
//       .attr("fill", "none")
//       .attr("stroke", "steelblue")
//       .attr("stroke-linejoin", "round")
//       .attr("stroke-linecap", "round")
//       .attr("stroke-width", 1.5)
//       .attr("d", line);
//   }, [coords, line, margin.bottom, margin.left, margin.right, margin.top, yScale]);

//   return (
//     <svg ref={svgRef} width={width} height={height} />
//   );
// });

// export default LineGraph;

  // const dataTest = [
  //   0, 122, 1.5, 123, 3, 123, 4.5, 122, 6, 126, 7.5, 123, 9, 122, 10.5, 118, 12, 109, 13.5, 113, 15, 113, 16.5, 112, 18, 110, 19.5, 108, 21, 109, 22.5, 110, 24, 112, 25.5, 108, 27, 109, 28.5, 111, 30, 108, 31.5, 108, 33, 107, 34.5, 107, 36, 107, 37.5, 107, 39, 105, 40.5, 108, 42, 107, 43.5, 107, 45, 107, 46.5, 108, 48, 117, 49.5, 117, 51, 117, 52.5, 116, 54, 113, 55.5, 114, 57, 118, 58.5, 117, 60, 116, 61.5, 117, 63, 119, 64.5, 124, 66, 125, 67.5, 126, 69, 126, 70.5, 126, 72, 127, 73.5, 127, 75, 134, 76.5, 135, 78, 132, 79.5, 129, 81, 128, 82.5, 130, 84, 132, 85.5, 134, 87, 136, 88.5, 138, 90, 141, 91.5, 147, 93, 142, 94.5, 142, 96, 142, 97.5, 145, 99, 150, 100.5, 148, 102, 150, 103.5, 151, 105, 150, 106.5, 148, 108, 149, 109.5, 145, 111, 150, 112.5, 152, 114, 153, 115.5, 148, 117, 149, 118.5, 146, 120, 144, 121.5, 141, 123, 139, 124.5, 135, 126, 137, 127.5, 138, 129, 141, 130.5, 139, 132, 135, 133.5, 131, 135, 131, 136.5, 128, 138, 127, 139.5, 126, 141, 126, 142.5, 129, 144, 129, 145.5, 125, 147, 125, 148.5, 123, 150, 126, 151.5, 127, 153, 130, 154.5, 136, 156, 137, 157.5, 132, 159, 133, 160.5, 133, 162, 131, 163.5, 132, 165, 139, 166.5, 136, 168, 136, 169.5, 144, 171, 148, 172.5, 151, 174, 155, 175.5, 155, 177, 156, 178.5, 158, 180, 151, 181.5, 151, 183, 152, 184.5, 148, 186, 142, 187.5, 141, 189, 145, 190.5, 143, 192, 146, 193.5, 146, 195, 152, 196.5, 144, 198, 145, 199.5, 137, 201, 137, 202.5, 138, 204, 136, 205.5, 145, 207, 143, 208.5, 149, 210, 141, 211.5, 139, 213, 135, 214.5, 139, 216, 134, 217.5, 135, 219, 140, 220.5, 138, 222, 139, 223.5, 144, 225, 146, 226.5, 143, 228, 143, 229.5, 147, 231, 145, 232.5, 147, 234, 151, 235.5, 153, 237, 153, 238.5, 156, 240, 160, 241.5, 158, 243, 159, 244.5, 169, 246, 173, 247.5, 170, 249, 169, 250.5, 170, 252, 163, 253.5, 164, 255, 165
  // ];
  // console.log(dataTest);


  import React, { useRef, useEffect, useState } from 'react';
import * as d3 from 'd3';

const LineGraph = React.forwardRef((props, ref) => {
  const [dataTest, setDataTest] = useState(null);
  const firstRaceDate = new Date('2022-03-18');
  const lastRaceDate = new Date('2022-11-22');

  let val = 0;
  let curr = 0;


  const name = props.stockName;
  console.log(name)
  const polyLineData = [];
  const fetchPromise = fetch("https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=" + name + "&outputsize=full&apikey=" + process.env.STOCK_API);
  const promise = fetchPromise.then(response => response.json()).then((response) => {

    

    for (const element in response['Time Series (Daily)']) {
      const dateOfElement = new Date(element);

      if (dateOfElement > firstRaceDate && dateOfElement < lastRaceDate) {
        curr = parseInt(response['Time Series (Daily)'][element]["4. close"]) + 50;

        polyLineData.push(val, curr);
        val = val + 1.5;

      }

    }

   console.log(polyLineData);
   setDataTest(polyLineData);
  },[])

  

  const svgRef = useRef();

  const width = 500;
  const height = 300;

  useEffect(() => {
  const xCoords = dataTest.filter((d, i) => i % 2 === 0);
  const yCoords = dataTest.filter((d, i) => i % 2 !== 0);
  const coords = d3.zip(xCoords, yCoords)
    .map(d => ({ x: d[0], y: d[1] }));


  const margin = { top: 20, right: 20, bottom: 30, left: 50 };

  const xScale = d3.scaleLinear()
    .domain([0, d3.max(coords, d => d.x)])
    .range([margin.left, width - margin.right]);

  // changes accordingly when entering into stocksearc
  const testParse = parseInt(d3.max(coords, d => d.y)) + 100;
  const yScale = d3.scaleLinear()
    .domain([40, testParse])
    .range([height - margin.bottom, margin.top]);

  const line = d3.line()
    .x(d => xScale(d.x))
    .y(d => yScale(d.y));

  
  
    const svg = d3.select(svgRef.current);
    // svg.append("g")
    //   .attr("transform", `translate(0, ${height - margin.bottom})`)
    //   .call(d3.axisBottom(xScale).tickSize(0));

    svg.append("rect")
      .attr("x", margin.left)
      .attr("y", margin.top)
      .attr("width", width - margin.left - margin.right)
      .attr("height", height - margin.top - margin.bottom)
      .attr("stroke", "black")
      .attr("fill", "none");


    svg.append("g")
      .attr("transform", `translate(${margin.left}, 0)`)
      .call(d3.axisLeft(yScale));
    svg.append("path")
      .datum(coords)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-linejoin", "round")
      .attr("stroke-linecap", "round")
      .attr("stroke-width", 1.5)
      .attr("d", line);
  }, [fetchPromise]);

  return (
    <svg ref={svgRef} width={width} height={height} />
  );
});

export default LineGraph;