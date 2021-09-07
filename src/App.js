import React, { useState, useEffect } from "react";
import fetchData from './api/dataService';
import ReactTable from 'react-table';
import "./App.css";
import _ from 'lodash';
import "react-table/react-table.css";  

function calculateResults(incomingData) {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  let byCustomer = {};
  let total = [];
  let totalByCustomer = [];
  let totalPoints = [];
  const pointsPerTransaction = incomingData.map(transaction => {
    let points = 0;
    let overHundred = transaction.amount - 100;
    if (overHundred > 0) {
      points += (overHundred * 2);
    }
    if (transaction.amount > 50) {
      points += 50;      
    }
    const month = new Date(transaction.transactionDate).getMonth();
    return {...transaction, points, month};
  });
  pointsPerTransaction.forEach(pointsPerTransaction => {
    let {customerId, name, month, points} = pointsPerTransaction;   
    if (!byCustomer[customerId]) {
      byCustomer[customerId] = [];      
    }    
    if (byCustomer[customerId][month]) {
      byCustomer[customerId][month].points += points;
      byCustomer[customerId][month].monthNumber = month;
      byCustomer[customerId][month].numTransactions++;      
    }
    else {
      byCustomer[customerId][month] = {
        customerId,
        name,
        monthNumber:month,
        month: months[month],
        numTransactions: 1,        
        points
      }
    }    
  });
  for (var customerKey in byCustomer) {    
    byCustomer[customerKey].forEach(customerRow => {
      total.push(customerRow);
    });    
  }
  pointsPerTransaction.map(item => {
    if(totalPoints[item.name]) {
      totalPoints[item.name] = totalPoints[item.name] + item.points
    } else {
      totalPoints[item.name] =item.points 
    }
  })
  for (customerKey in totalPoints) {    
    totalByCustomer.push({
      name: customerKey,
      points: totalPoints[customerKey]
    });    
  }
  return {
    summaryByCustomer: total,
    pointsPerTransaction,
    totalPointsByCustomer:totalByCustomer
  };
}

function RewardManagementApp() {
  const [transactionData, setTransactionData] = useState(null);
  const customerTransactionHeader = [
    {
      Header:'Customer',
      accessor: 'name'      
    },    
    {
      Header:'Month',
      accessor: 'month'
    },
    {
      Header: "# of Transactions",
      accessor: 'numTransactions'
    },
    {
      Header:'Reward Points',
      accessor: 'points'
    }
  ];
  const customerRewardHeader = [
    {
      Header:'Customer',
      accessor: 'name'      
    },    
    {
      Header:'Points',
      accessor: 'points'
    }
  ]

  useEffect(() => { 
    (async () => {
      await fetchData().then((data) => {             
        const results = calculateResults(data);      
        setTransactionData(results);
      });
    })();
  },[]);

  function getIndividualTransactions(row) {
    let byCustomerMonth = _.filter(transactionData.pointsPerTransaction, (tableRow) => {    
      return row.original.customerId === tableRow.customerId && row.original.monthNumber === tableRow.month;
    });
    return byCustomerMonth;
  }

  return transactionData == null ?
    <div>Loading...</div> 
      :    
    <div>      
      <div className="container">
        <div className="row">
          <div className="col-10">
            <h2>Points Rewards System Totals by Customer Months</h2>
          </div>
        </div>
        <div className="row">
          <div className="col-8">
            <ReactTable
              data={transactionData.summaryByCustomer}
              defaultPageSize={5}
              columns={customerTransactionHeader}
              SubComponent={row => {
                return (
                  <div>
                      {getIndividualTransactions(row).map(transaction => {
                        return <div className="container">
                          <div className="row">
                            <div className="col-8">
                              <strong>Transaction Date:</strong> {transaction.transactionDate} - <strong>$</strong>{transaction.amount} - <strong>Points: </strong>{transaction.points}
                            </div>
                          </div>
                        </div>
                      })}                                    
                  </div>
                )
              }}
              />             
            </div>
          </div>
        </div>
        
        <div className="container">    
          <div className="row">
            <div className="col-10">
              <h2>Points Rewards System Totals By Customer</h2>
            </div>
          </div>      
          <div className="row">
            <div className="col-8">
              <ReactTable
                data={transactionData.totalPointsByCustomer}
                columns={customerRewardHeader}
                defaultPageSize={5}                
              />
            </div>
          </div>
        </div>      
    </div>
  ;
}

export default RewardManagementApp;
