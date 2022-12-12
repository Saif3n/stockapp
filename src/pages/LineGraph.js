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
  let fetchPromise = '';



  const svgRef = useRef();

  const width = 500;
  const height = 300;

  useEffect(() => {

    fetchPromise = fetch("https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=" + name + "&outputsize=full&apikey=" + process.env.STOCK_API);

    fetchPromise.then(response => response.json()).then((response) => {

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




    })





  }, [fetchPromise, dataTest]);

  return (
    <svg ref={svgRef} width={width} height={height} />
  );
})

export default LineGraph;