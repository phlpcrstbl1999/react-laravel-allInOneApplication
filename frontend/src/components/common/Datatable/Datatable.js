import React from 'react'
import MUIDataTable from "mui-datatables";
import { createTheme, ThemeProvider } from '@mui/material/styles'
const Datatable = ({ title, data, columns}) => {
  const options = {
    filterType: 'checkbox',
    selectableRows: false,
    elevation: 0,
    footer: true,
    rowsPerPage: 5,
    rowsPerPageOptions: [5,10,20,50]
  };

  const getMuiTheme = () => createTheme({
      typography: {
        fontFamily: "Roboto",
      },
      // palette: {
      //   background: {
      //     paper: '#1e293b',
      //     default: '#0f172a',
      //   },
      //   mode: 'dark'
      // },
      components: {
        MuiTableCell: {
          styleOverrides: {
            head: {
              padding: "10px 4px",      
            },
            body: {
              padding: "7px 15px",
            },
            footer: {
              padding: "10px 20px",
            }
          }
        }
      }

    });
  
  return (
    <ThemeProvider theme={getMuiTheme()}>
      <MUIDataTable
      title={title}
      data={data}
      columns={columns}
      options={options}
    />
  </ThemeProvider>
  )
}

export default Datatable
