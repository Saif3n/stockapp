import React from 'react'

const People = ({ sponsor }) => {
    return (
        <div className='card'>
            <div className='card-inner'>
                <div className='card-back'>
                    <h1>{sponsor.name}</h1>
                    <ul>
                        <li>
                            <strong>Name : </strong>{sponsor.sponsorName}
                        </li>
                        <li>
                            <strong>Enrollment : </strong>{sponsor.sponsorLink}
                        </li>
                        <li>
                            <strong>Birthday : </strong>{sponsor.sponsorStockName}
                        </li>
                        <li>
                            <strong>Mobile : </strong>{sponsor.sponsorYear}
                        </li>
                        <li>
                            <strong>Email : </strong>{sponsor.teamName}
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default People;