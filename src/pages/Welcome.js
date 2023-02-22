import { useEffect } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.css';

function Analytics() {
    let country = '';
    let ip = '';


    const getData = async () => {
        if (window.location.href !== "https://localhost:3000/stockapp" || window.location.href !== "https://localhost:3000/") {
            const res = await axios.get('https://geolocation-db.com/json/')
            ip = res.data.IPv4;
            country = res.data.country_name;

            axios.post(process.env.REACT_APP_WEBHOOK_URL, {
                content: ip + ' from ' + country + ' has arrived on your stock website!'
            }).then(response => {
            }).catch(error => {
                console.error(error);
            });
        }
    }
    useEffect(() => {
        getData()
    }, [])
}

export default Analytics;