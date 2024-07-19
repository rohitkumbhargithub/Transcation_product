const Products = require('../model/products');


const total = async(req, res) => {

    try{
        const { month } = req.query;

    const transactions = await Products.find({});
  
    
    const filteredTransactions = transactions.filter(transaction => {
      const transactionMonth = new Date(transaction.dateOfSale).getMonth() + 1; // getMonth() returns 0-11
      return transactionMonth === parseInt(month, 10);
    });
  
    // Calculate statistics
    const totalSaleAmount = filteredTransactions.reduce((acc, transaction) => acc + transaction.price, 0);
    const totalSoldItems = filteredTransactions.filter(transaction => transaction.sold === 'true').length;
    const totalNotSoldItems = filteredTransactions.filter(transaction => transaction.sold === 'false').length;
  
    res.json({
      totalSaleAmount,
      totalSoldItems,
      totalNotSoldItems,
    });
    }catch(err){
        console.log("send data ", err);
        res.status(500).json({ err: "Internal server error" });
    }
  };


  module.exports = {
    total,
  }