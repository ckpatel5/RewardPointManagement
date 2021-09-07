## Available Scripts

To use React Redux with your React app, install it as a dependency:

### `npm install`

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

# To change Header name.

To make any changes in table header name go to the below file location and make changes.
`src/App.js`

const customerTransactionHeader = [
    {
      Header:'Customer',            # change header name
      accessor: 'name'              # access header name
    },    
    {
      Header:'Month',               # change header name
      accessor: 'month'             # access header name
    },
    {
      Header: "# of Transactions",  # change header name
      accessor: 'numTransactions'   # access header name
    },
    {
      Header:'Reward Points',       # change header name
      accessor: 'points'            # access header name
    }
  ];

# In the project we have used hard-coded test data.

To make any changes in the test data go to the below file and make changes.
`src/api/dataService.js`

export default function() {
  return Promise.resolve(
    [
        {
            customerId: 1,                  # change customerId 
            name: "Jhon",                   # change name
            amount: 120,                    # change amount
            transactionDate: "05-01-2019"   # change transctionDate
        },
        {
            customerId: 2,                  # change customerId 
            name: "Herray",                 # change name
            amount: 121,                    # change amount
            transactionDate: "05-01-2021"   # change transctionDate
        }
    ]
  )
}

