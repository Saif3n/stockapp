import React, { useRef, useEffect, useState } from 'react';
import * as d3 from 'd3';

const TestLineGraph = React.forwardRef((props, ref) => {

    const firstRaceDate = new Date('2022-03-20');
    const lastRaceDate = new Date('2022-11-20');


    const name = props.stockName;

    // will reference this from function that calls it
    const border = "black";
    const hoverColor = "red";
    const path = "blue";

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
                    const closePrice = parseFloat(response['Time Series (Daily)'][element]['4. close']);
                    polyLineData.push({ x: dateOfElement, y: closePrice });
                }
            }
            console.log(polyLineData);

            const margin = { top: 20, right: 20, bottom: 30, left: 50 };

            const xScale = d3.scaleTime()
                .domain(d3.extent(polyLineData, d => d.x))
                .range([margin.left, width - margin.right]);

            const yScale = d3.scaleLinear()
                .domain([d3.min(polyLineData, d => d.y), d3.max(polyLineData, d => d.y)])
                .range([height - margin.bottom, margin.top]);

            const line = d3.line()
                .x(d => xScale(d.x))
                .y(d => yScale(d.y));


            const svg = d3.select(svgRef.current);
            const yMin = yScale.domain()[0];
            const yMax = yScale.domain()[1];

            const xMin = xScale.domain()[0];
            const xMax = xScale.domain()[1];
            console.log(xMin);
            console.log(xMax);


            svg.append('rect')
                .attr('x', margin.left)
                .attr('y', margin.top)
                .attr('width', width - margin.left - margin.right)
                .attr('height', height - margin.top - margin.bottom)
                .attr('stroke', `${border}`)
                .attr('fill', 'none');

            svg.append('g')
                .attr('transform', `translate(${margin.left}, 0)`)
                .style('color', `${border}`)
                .call(d3.axisLeft(yScale));

            svg.append('g')
                .attr('transform', `translate(0, ${height - margin.bottom})`)
                .style('color', `${border}`)
                .call(d3.axisBottom(xScale)
                    .ticks(d3.timeDay.every(20))
                    .tickFormat(d3.timeFormat('%m-%d')));


            svg.append('path')
                .datum(polyLineData)
                .attr('fill', 'none')
                .attr('stroke', `${path}`)
                .attr('stroke-linejoin', 'round')
                .attr('stroke-linecap', 'round')
                .attr('stroke-width', 1.5)
                .attr('d', line);

            const numTicks = 10;
            const xTickValues = xScale.ticks(numTicks);

            svg.selectAll('.vertical-gridline')
                .data(xTickValues)
                .enter()
                .append('line')
                .attr('class', 'vertical-gridline')
                .attr('x1', d => xScale(d))
                .attr('y1', yScale(yMin))
                .attr('x2', d => xScale(d))
                .attr('y2', yScale(yMax))
                .attr('stroke', 'gray')
                .attr('stroke-dasharray', '3,3');

            polyLineData.forEach(point => {
                svg.append('circle')
                    .attr('cx', xScale(point.x))
                    .attr('cy', yScale(point.y))
                    .attr('r', 2)
                    .attr('fill', `${path}`)

                svg.append('line')
                    .attr('x1', xScale(point.x))
                    .attr('y1', yScale(yMin))
                    .attr('x2', xScale(point.x))
                    .attr('y2', yScale(yMax))
                    .attr('stroke', 'white')
                    .attr('stroke-width', 5)
                    .attr('stroke-opacity', 0)
                    .attr('class', 'existing-line')
                    .on('mouseover', () => {
                        
                        svg.append('text')
                            .attr('x', xScale(point.x))
                            .attr('y', yScale(point.y) - 20)
                            .attr('text-anchor', 'middle')
                            .attr('class', 'mouseover-text')
                            .text(point.y)
                            .attr('fill', `${hoverColor}`)
                            .style('font-weight', 'bold');

                        // Append vertical line to SVG
                        svg.append('line')
                            .attr('x1', xScale(point.x))
                            .attr('y1', yScale(yMin))
                            .attr('x2', xScale(point.x))
                            .attr('y2', yScale(yMax))
                            .attr('stroke', `${hoverColor}`)
                            .attr('stroke-width', 2)
                            .attr('stroke-dasharray', '3,3')  // Dotted line
                            .attr('class', 'mouseover-vert-line');

                        svg.append('line')
                            .attr('x1', xScale(xMin))
                            .attr('y1', yScale(point.y))
                            .attr('x2', xScale(xMax))
                            .attr('y2', yScale(point.y))
                            .attr('stroke', `${hoverColor}`)
                            .attr('stroke-width', 2)
                            .attr('stroke-dasharray', '3,3')  // Dotted line
                            .attr('class', 'mouseover-horiz-line');
                    })
                    .on('mouseout', () => {
                        svg.select('.mouseover-text').remove();
                        svg.select('.mouseover-vert-line').remove();
                        svg.select('.mouseover-horiz-line').remove();
                    });


            });



            // polyLineData.forEach(point => {
            //     svg.append('circle')
            //       .attr('cx', xScale(point.x))
            //       .attr('cy', yScale(point.y))
            //       .attr('r', 2)
            //       .attr('fill', `${path}`)

            //     svg.append('line')
            //       .attr('x1', xScale(point.x))
            //       .attr('y1', yScale(yMin))
            //       .attr('x2', xScale(point.x))
            //       .attr('y2', yScale(yMax))
            //       .attr('stroke', 'white')
            //       .attr('stroke-width', 7)
            //       .attr('stroke-opacity', 0)
            //       .attr('class', 'existing-line')
            //       .on('mouseover', (event) => {
                    // const clientX = event.clientX;
                    // const clientY = event.clientY;

                    // const svgRect = svg.node().getBoundingClientRect();
                    // const x = clientX - svgRect.left;
                    // const y = clientY - svgRect.top;

                    // svg.append('text')
                    //   .attr('x', x)
                    //   .attr('y', y)
                    //   .attr('text-anchor', 'middle')
                    //   .attr('class', 'mouseover-text')
                    //   .text(point.y)
                    //   .attr('fill', `${hoverColor}`)
                    //   .style('font-weight', 'bold');

            //         // Append vertical line to SVG
            //         svg.append('line')
            //           .attr('x1', xScale(point.x))
            //           .attr('y1', yScale(yMin))
            //           .attr('x2', xScale(point.x))
            //           .attr('y2', yScale(yMax))
            //           .attr('stroke', `${hoverColor}`)
            //           .attr('stroke-width', 2)
            //           .attr('stroke-dasharray', '3,3')  // Dotted line
            //           .attr('class', 'mouseover-line');
            //       })
            //       .on('mouseout', () => {
            //         svg.select('.mouseover-text').remove();
            //         svg.select('.mouseover-line').remove();
            //       })
            //   });


        });
    }, []);

    return (
        <svg ref={svgRef} width={width} height={height} />
    );
});

export default TestLineGraph;

