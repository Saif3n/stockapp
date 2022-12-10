
  import React, { useState, useEffect } from "react";
  import { Line } from "recharts";

function ReactChatGPT() {
  let arr = [];
  let revArr = [];

  let polyLine = '';
  const date = new Date('2022-03-18');
  const lastDate = new Date('2022-11-22');
  const [data, setData] = useState([]);

    // Use the useEffect hook to fetch the data for the stock
    useEffect(() => {
      fetch("https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=IBM&outputsize=full&apikey=demo")
        .then(response => response.json())
        .then(response => {
          let data = [];
          for (const element in response["Time Series (Daily)"]) {
            const date = new Date(element);
            if (date > date && date < lastDate) {
              const closingValue = parseInt(response["Time Series (Daily)"][element]["4. close"]) + 50;
              data.push({ name: date, value: closingValue });
            }
          }
          setData(data);
        });
    }, []);

    return (
      <div className="stock-chart">
        <Line data={data} />
      </div>
    );
  }

export default ReactChatGPT;