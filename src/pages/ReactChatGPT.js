import React, { useState } from 'react';
import * as d3 from 'd3';

const ReactChatGPT = () => {
  const [ticker, setTicker] = useState('');
  const [data, setData] = useState(null);

  const fetchStockData = () => {
    fetch(
      `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${ticker}&apikey=${process.env.REACT_APP_ALPHAVANTAGE_API_KEY}`
    )
      .then((response) => response.json())
      .then((response) => {
        setData(response['Time Series (Daily)']);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const plotGraph = () => {
    if (!data) return;

    const dates = Object.keys(data);
    const closingValues = dates.map((date) => data[date]['5. adjusted close']);

    const svg = d3.select('#graph-container');
    const margin = { top: 20, right: 20, bottom: 30, left: 50 };
    const width = svg.attr('width') - margin.left - margin.right;
    const height = svg.attr('height') - margin.top - margin.bottom;

    const x = d3
      .scaleTime()
      .domain(d3.extent(dates, (d) => new Date(d)))
      .range([0, width]);
    const y = d3
      .scaleLinear()
      .domain(d3.extent(closingValues, (d) => +d))
      .range([height, 0]);

    const line = d3
      .line()
      .x((d) => x(new Date(d)))
      .y((d) => y(+data[d]['5. adjusted close']));

    svg
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`)
      .append('path')
      .datum(dates)
      .attr('fill', 'none')
      .attr('stroke', 'steelblue')
      .attr('stroke-linejoin', 'round')
      .attr('stroke-linecap', 'round')
      .attr('stroke-width', 1.5)
      .attr('d', line);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter ticker symbol"
        value={ticker}
        onChange={(e) => setTicker(e.target.value)}
      />
      <button onClick={fetchStockData}>Fetch Data</button>
      {data && <button onClick={plotGraph}>Plot Graph</button>}
      <svg id="graph-container" width="600" height="400"></svg>
    </div>
  );
};

export default ReactChatGPT;