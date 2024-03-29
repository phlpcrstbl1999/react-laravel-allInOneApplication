import React from 'react'
import { DataGrid } from '@mui/x-data-grid';

const Datatable = ({ rows, columns,pageSizeOptions}) => {
  return (
    <div style={{ height: 400, width: '100%' }}>
    <DataGrid
      rows={rows}
      columns={columns}
      initialState={{
        pagination: {
          paginationModel: { page: 0, pageSize: 5 },
        },
      }}
      pageSizeOptions={pageSizeOptions}
      checkboxSelection
    />
  </div>
  )
}

export default Datatable
