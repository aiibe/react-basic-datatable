# React Basic Datatable

A basic version of [Datatables](datatables.net) for React written in Typescript.

## Features

- Pagination with custom number of entries showed per page
- Full-Text Search (multiple words)
- Sort by column (limited to string type only)

## Installation

- React >=16 is required

```bash
npm i react-basic-datatable
```

## Usage

_App.jsx_

```javascript
import { DataTable } from 'react-basic-datatable'

// Define columns, each field's name should match the data
const columns = [
  { label: "First Name", field: "firstName" },
  { label: "Last Name", field: "lastName" },
  { label: "Date of Birth", field: "birthDate" },
  { label: "City", field: "city" },
]

// Define your data rows
const rows = [
  {
    "firstName": "Molli",
    "lastName": "Keeton",
    "birthDate": "11/30/2001",
    "city": "Washington",
  },
  {
    "firstName": "Norris",
    "lastName": "Langridge",
    "birthDate": "12/31/1997",
    "city": "Indianapolis",
  },
  ...
]

// (Optional) Show entries per page, default is [10, 25, 50, 100]
const showingLength = [5, 10, 15]

function App(){
 return <DataTable columns={columns} rows={rows} showingLength={showingLength}/>
}

```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)
