import React, { Component } from "react";
import axios from "axios";
import Table from './table'


class Search extends Component {
    state = {
        query: "",
        result: [],
        error: false,
        searchEmpty: true
    };


    getInfo = () => {
        const apiUrl = "https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=" + this.state.query + "&apikey=" + process.env.REACT_APP_ALPHA_KEY;
        axios
            .get(apiUrl)
            .then(({ data }) => {
                data.bestMatches.forEach((bestMatch) => {
                    delete bestMatch["4. region"];
                    delete bestMatch["3. type"];
                    delete bestMatch["5. marketOpen"];
                    delete bestMatch["6. marketClose"];
                    delete bestMatch["7. timezone"];
                    delete bestMatch["8. currency"];
                    delete bestMatch["9. matchScore"];
                })

                this.setState({
                    result: data.bestMatches.slice(0, 3)
                });
            })
            .catch((err) => {
                this.setState({
                    error: true
                });
                this.setState({
                    result: []
                });
            });
    };

    handleInputChange = () => {
        this.setState(
            {
                query: this.search.value
            },
            () => {
                if (this.state.query && this.state.query.length > 1) {
                    this.getInfo();
                } else {
                    this.setState({
                        result: [],
                        error: false
                    });
                }
            }
        );
    };

    render() {
        return (
            <div className="container">
                <label className="search-label" htmlFor="search-input">
                    <input
                        placeholder="Search Company  here"
                        ref={(input) => (this.search = input)}
                    />
                    <button className='searchButton' onClick={this.handleInputChange}>Search</button>

                </label>
                {this.state.result &&
                    <div>
                        <Table tableData={
                            this.state.result
                        } hasSearch={false}></Table>
                        <p>{this.state.result["1. symbol"]}</p>
                    </div>}

                {this.state.error && <p className="error">Opps, Nothing found!</p>}
            </div>
        );
    }
}

export default Search;
