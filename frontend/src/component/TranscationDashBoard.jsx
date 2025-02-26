import React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { columns } from './columns';
import TotalSale from './TotalSale';
import BarChart from './BarChart';

export default function TranscationDashBoard({selectMonths, data, search}) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };


  
  function createData(id, title, description, price, category, sold, image, dateOfSale) {
    return { id, title, description, price, category, sold, image, dateOfSale};
  }

  const filterTransactions = () => {
    const lowerCaseSearch = search.toLowerCase();
    return data.filter(transaction => {
      const { title, description, price, dateOfSale } = transaction;
      const formattedDate = dateOfSale.split('T')[0];
      const transactionMonth = formattedDate.substring(5, 7); 

      return (
        (lowerCaseSearch === '' ||
          title.toLowerCase().includes(lowerCaseSearch) ||
          description.toLowerCase().includes(lowerCaseSearch) ||
          price.toString().includes(lowerCaseSearch)) &&
        (selectMonths === '' || transactionMonth === selectMonths)
      );
    })
  }

  const filteredTransactions = filterTransactions();

  const rows = filteredTransactions.map((item) => 
      createData(item.id, item.title, item.description,  item.price, item.category, item.sold, item.image, item.dateOfSale.split('T')[0])
  );

  return (
    <>
    <Paper sx={{ width: '100%', overflow: 'hidden', background: '#f8df8c' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth, background: '#f8df8c' }}
                  
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id];
                  
                      return (
                        <TableCell key={column.id} align="left">
                        {column.format && typeof column.format === 'function'
                          ? column.format(value)
                          : value}
                      </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
    
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
    
    <TotalSale selectMonths={selectMonths} filterTransactions={filterTransactions}/>
    <BarChart filterTransactions={filteredTransactions} selectMonths={selectMonths}/>
  </>
  );
}
