import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MaterialTable from 'material-table';
import Chip from '@material-ui/core/Chip';
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import { Button } from '@material-ui/core';
import secrets from '../config/config'


const tableIcons = {
    Add: React.forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: React.forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: React.forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: React.forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: React.forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: React.forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: React.forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: React.forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: React.forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: React.forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: React.forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: React.forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: React.forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: React.forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: React.forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: React.forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: React.forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};

export default function StockTable(props) {
    const [tableData, setData] = useState([]);

    useEffect(() => {
        setData([]);
        var formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        });

        function setTableData(props) {
            for (const item of props.tableData) {
                let tempData = [];
                let stockPrice = 0;
                let marketCap = 0;
                const url = "https://cloud.iexapis.com/stable/stock/" + item["1. symbol"] + "/quote?token=" + secrets.iex;
                axios.get(url)
                    .then((res) => {

                        stockPrice = res.data.latestPrice;
                        marketCap = res.data.marketCap;

                        tempData.push({
                            "name": item["2. name"],
                            "symbol": <Chip label={item["1. symbol"]} color="primary" size="small" />,
                            "price": formatter.format(stockPrice),
                            "cap": formatter.format(marketCap),
                        })
                        setData(prevData => (prevData.concat(tempData)));
                    }).catch(err => {
                        console.log(err)
                    });
            }
        };

        setTableData(props);
    }, [props]);

    function handleOnClick(rowData) {
        alert(rowData.name)
    }

    return (
        <MaterialTable
            icons={tableIcons}

            title="Stock Details Table"

            columns={[
                {
                    title: 'Company Name', field: 'name',

                },
                {
                    title: 'Symbol',
                    field: 'symbol',
                },
                {
                    title: 'Market Cap',
                    field: 'cap',
                    type: 'numeric',

                },
                {
                    title: 'Current Price',
                    field: 'price',
                    type: 'numeric',

                },

            ]}
            data={tableData}
            actions={[
                {
                    icon: "",
                    tooltip: 'Save Data',
                    onClick: (event, rowData) => handleOnClick(rowData),
                },
            ]}
            components={{
                Action: props => (
                    <Button
                        onClick={(event) => props.action.onClick(event, props.data)}
                        variant="contained"
                        style={{ textTransform: 'none', padding: '5px 15px', background: '#18A0FB', width: '100px', color: 'white', }}
                    >
                        Save
                    </Button>
                ),
            }}
            options={{
                actionsColumnIndex: 3,
                headerStyle: {
                    backgroundColor: '#F4F2FF',
                    color: '#6E6893',
                    textAlign: 'center',
                },
                cellStyle: {
                    textAlign: 'center',
                    fontFamily: 'Roboto',
                },
                searchFieldStyle: {
                    alignSelf: 'flex-end',
                    backgroundColor: '#F4F2FF',
                    color: '#6E6893',
                    maxWidth: '140%',
                    minWidth: '130%',
                    height: '40px',
                    fontFamily: 'Roboto',
                    border: 'none !important',
                    borderRadius: '5px',
                    outline: 'none',
                },
            }}
        />
    )
}
