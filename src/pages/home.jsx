import React from 'react';

import googleLogo from '../Assets/google.png'
import facebookLogo from '../Assets/facebook.png'
import amazonLogo from '../Assets/amazon.svg'
import Card from '../components/card'
import Search from '../components/search'


function home() {
    return (
        <div>
            <div className="navBar">
                <h1>Stockzy</h1>
                <h5>A Barebones Stocks App</h5>
            </div>
            <div className="mainContainer">
                <div>
                    <div className="cardsContainer">
                        <Card logo={googleLogo} name="GOOGL" price={206} />
                        <Card logo={facebookLogo} name="FB" price={206} />
                        <Card logo={amazonLogo} name="AMZN" price={206} />
                    </div>
                    <Search />
                </div>
            </div>
        </div>
    );
};

export default home;