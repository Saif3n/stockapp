import React, { useRef, useEffect, useState } from 'react';
import * as d3 from 'd3';

const TestLineGraph = React.forwardRef((props, ref) => {

    const firstRaceDate = new Date('2022-03-20');
    const lastRaceDate = new Date('2022-11-20');


    const name = props.stockName;


    const polyLineData = [];
    const svgRef = useRef();
    const width = 1000;
    const height = 600;

    useEffect(() => {

        let fetchPromise = fetch(
            `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${name}&outputsize=full&apikey=${process.env.STOCK_API}`
        );

        fetchPromise.then((response) => response.json()).then((response) => {

            for (const element in response['Time Series (Daily)']) {

                const dateOfElement = new Date(element);

                if (dateOfElement > firstRaceDate && dateOfElement < lastRaceDate) {
                    const closePrice = parseInt(response['Time Series (Daily)'][element]['4. close']);
                    polyLineData.push({ x: dateOfElement, y: closePrice });
                }
            }


            const margin = { top: 20, right: 20, bottom: 30, left: 50 };

            const xScale = d3.scaleTime()
                .domain([firstRaceDate, lastRaceDate])
                .range([margin.left, width - margin.right]);

            const yScale = d3.scaleLinear()
                .domain([d3.min(polyLineData, d => d.y), d3.max(polyLineData, d => d.y)])
                .range([height - margin.bottom, margin.top]);

            const line = d3.line()
                .x(d => xScale(d.x))
                .y(d => yScale(d.y));


            const svg = d3.select(svgRef.current);


            svg.append('rect')
                .attr('x', margin.left)
                .attr('y', margin.top)
                .attr('width', width - margin.left - margin.right)
                .attr('height', height - margin.top - margin.bottom)
                .attr('stroke', 'black')
                .attr('fill', 'none');

            svg.append('g')
                .attr('transform', `translate(${margin.left}, 0)`)
                .call(d3.axisLeft(yScale));

            svg.append('g')
                .attr('transform', `translate(0, ${height - margin.bottom})`)
                .call(d3.axisBottom(xScale)
                    .ticks(d3.timeDay.every(1))
                    .tickFormat(d3.timeFormat('%d-%m-%Y')));


            svg.append('path')
                .datum(polyLineData)
                .attr('fill', 'none')
                .attr('stroke', 'steelblue')
                .attr('stroke-linejoin', 'round')
                .attr('stroke-linecap', 'round')
                .attr('stroke-width', 1.5)
                .attr('d', line);

            polyLineData.forEach(point => {
                svg.append('circle')
                    .attr('cx', xScale(point.x))
                    .attr('cy', yScale(point.y))
                    .attr('r', 3)
                    .attr('fill', 'blue')
                    .on('mouseover', () => {
                        svg.append('text')
                            .attr('x', xScale(point.x))
                            .attr('y', yScale(point.y) - 5)
                            .attr('text-anchor', 'middle')
                            .attr('class','mouseover-text')
                            .text(point.y)
                            .attr('fill', 'green')
                            .style('font-weight','bold');
                    })
                    .on('mouseout', () => {
                        svg.select('.mouseover-text').remove();
                    });
            });




        });
    }, []);

    return (
        <svg ref={svgRef} width={width} height={height} />
    );
});

export default TestLineGraph;

