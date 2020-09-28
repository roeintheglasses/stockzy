import React, { useState, useEffect } from 'react';
import axios from 'axios';
import secrets from '../config/config'

export default function Card(props) {
    const [price, setPrice] = useState(0);

    useEffect(() => {
        var formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        });
        const url = "https://cloud.iexapis.com/stable/stock/" + props.name + "/quote?token=" + secrets.iex;
        axios.get(url)
            .then((res) => {
                let stockPrice = res.data.latestPrice;
                setPrice(formatter.format(stockPrice));
            }).catch(err => {
                console.log(err)
            });
    }, []);

    return (
        <div className="card">
            <div className="cardUpperRow">
                <p>{props.name}</p>
                <img className="cardLogo" src={props.logo} alt="" />
            </div>
            <div className="cardLowerRow">
                <p>{price}</p>
            </div>
        </div>
    );
};

