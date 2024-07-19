const Products = require('../model/products');

// Products transaction per page
const transaction = async (req, res) => {
    try{

      const { search = '', page = 1, perPage = 10 } = req.query;
      const transactions = await Products.find({});

      const filteredTransactions = transactions.filter(transaction => {
          return (
            transaction.title.toLowerCase().includes(search.toLowerCase()) ||
            transaction.description.toLowerCase().includes(search.toLowerCase()) ||
            transaction.price.toString().includes(search)
          );
        });

    
      // Implement pagination
      const start = (page - 1) * perPage;
      const paginatedTransactions = filteredTransactions.slice(start, start + perPage);
    
      res.status(200).json({
        page: parseInt(page),
        perPage: parseInt(perPage),
        total: filteredTransactions.length,
        transactions: paginatedTransactions,
      });

    }catch(err){
        console.log("send data ", err);
        res.status(500).json({ err: "Internal server error" });
    }
  };

// Bar chart
  const barChart = async (req, res) => {
    const { month } = req.query;
  
    if (!month) {
      return res.status(400).json({ error: 'Month parameter is required' });
    }
  
    const transactions = await Products.find({});
    const filteredTransactions = transactions.filter(transaction => {
      const transactionMonth = new Date(transaction.dateOfSale).getMonth() + 1; 
      return transactionMonth === parseInt(month, 10);
    });
  
    // Initialize the price range counters
    const priceRanges = {
      '0-100': 0,
      '101-200': 0,
      '201-300': 0,
      '301-400': 0,
      '401-500': 0,
      '501-600': 0,
      '601-700': 0,
      '701-800': 0,
      '801-900': 0,
      '901-above': 0,
    };
  
    // Count the number of items in each price range
    filteredTransactions.forEach(transaction => {
      const price = transaction.price;
      if (price <= 100) priceRanges['0-100']++;
      else if (price <= 200) priceRanges['101-200']++;
      else if (price <= 300) priceRanges['201-300']++;
      else if (price <= 400) priceRanges['301-400']++;
      else if (price <= 500) priceRanges['401-500']++;
      else if (price <= 600) priceRanges['501-600']++;
      else if (price <= 700) priceRanges['601-700']++;
      else if (price <= 800) priceRanges['701-800']++;
      else if (price <= 900) priceRanges['801-900']++;
      else priceRanges['901-above']++;
    });
  
    res.json(priceRanges);
  };
  


  // pie-chart
const pieChart = async (req, res) => {
  const { month } = req.query;

  if (!month) {
    return res.status(400).json({ error: 'Month parameter is required' });
  }

  const transactions = await Products.find({});
  const filteredTransactions = transactions.filter(transaction => {
    const transactionMonth = new Date(transaction.dateOfSale).getMonth() + 1; // getMonth() returns 0-11
    return transactionMonth === parseInt(month, 10);
  });

  // Initialize the category counters
  const categoryCounts = {};

  // Count the number of items in each category
  filteredTransactions.forEach(transaction => {
    const category = transaction.category;
    if (categoryCounts[category]) {
      categoryCounts[category]++;
    } else {
      categoryCounts[category] = 1;
    }
  });

  res.json(categoryCounts);
}

  module.exports = {
    transaction,
    barChart,
    pieChart,
  }