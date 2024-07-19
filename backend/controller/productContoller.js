const Products = require('../model/products');

// get data from api and send to database
const getData = async (req, res) => {
    try {
        const url = await fetch('https://s3.amazonaws.com/roxiler.com/product_transaction.json');
        const response = await url.json();
        
        let products = [];
        
        for (let i = 0; i < response.length; i++) {
            const product = new Products({
                id: response[i]['id'],
                title: response[i]['title'],
                price: response[i]['price'],
                description: response[i]['description'],
                category: response[i]['category'],
                image: response[i]['image'],
                sold: response[i]['sold'],
                dateOfSale: response[i]['dateOfSale'],
            });

            await product.save();
            products.push(product);
        }

        res.status(200).json(products);

    } catch (err) {
        console.log("send data ", err);
        res.status(500).json({ err: "Internal server error" });
    }
};


// get all product details from database
const getAllProducts = async (req, res) => {

   try{

    const product = await Products.find({}).sort({ _id: 1 });

    res.status(200).json(product);

    }catch(err){
        console.log("products ", err)
        res.status(500).json({err: "Internal server error"});
    }
}

module.exports = {
    getAllProducts,
    getData
};