import React from 'react';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';

const TotalSale = ({selectMonths, filterTransactions}) => {

    const filteredTransactions = filterTransactions();
    // Calculate totals
    const totalAmount = filteredTransactions.reduce((acc, transaction) => acc + parseFloat(transaction.price), 0);
    const totalSoldItems = filteredTransactions.filter(transaction => transaction.sold === 'true').length;
    const totalNotSoldItems = filteredTransactions.filter(transaction => transaction.sold === 'false').length;

  return (
    <Box my={2} p={2} m={1} textAlign={'start'}  width={'20%'}>
    <Typography textAlign={'center'} variant="h6" fontWeight={'bold'}>Statistics - {selectMonths ? new Date(`2024-${selectMonths}-01`).toLocaleString('default', { month: 'long' }) : 'All Months'}</Typography>
    <Box my={2} p={2} textAlign={'start'} borderRadius="30px" backgroundColor='#f8df8c'>
    <Typography>Total Sales:{totalAmount.toFixed(2)}</Typography>
    <Typography>Total Sold Items: {totalSoldItems}</Typography>
    <Typography>Total Not Sold Items: {totalNotSoldItems}</Typography>
  </Box>
  </Box>
  )
}

export default TotalSale;