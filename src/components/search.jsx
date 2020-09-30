import React, { Component } from "react";
import axios from "axios";
import Table from './table'
import LoadingGif from '../Assets/loading.gif'


class Search extends Component {
    state = {
        query: "",
        result: [],
        error: false,
        firstLoad: true,
        loading: true
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
                    result: data.bestMatches.slice(0, 5),
                    loading: false
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
                query: this.search.value,
                firstLoad: false,
                loading: true
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
                {!this.state.loading && <div>
                    <Table tableData={
                        this.state.result
                    }></Table>
                </div>}
                { (this.state.loading && !this.state.firstLoad) && <img className="loading" src={LoadingGif} alt="Loading..." />
                }
            </div>
        );
    }
}

export default Search;
