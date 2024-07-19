export const columns = [
    { id: 'id', label: 'ID', minWidth: 20 },
    { id: 'title', label: 'title', minWidth: 100 },
  
    {
      id: 'description',
      label: 'Description',
      minWidth: 170,
    },
    {
      id: 'price',
      label: 'Price',
      minWidth: 170,
    },
    {
      id: 'category',
      label: 'Category',
      minWidth: 170,
  
    },
    {
      id: 'sold',
      label: 'Sold',
      minWidth: 170,
      format: (value) => {
        if(value === "false"){
          return <p>No</p>
        }else{
          return <p>Yes</p>
        }
      }
    },
      { id: 'image', label: 'Image', minWidth: 100, format: (value) => <img src={value} alt="Product" style={{ width: 50, height: 50 }} /> },
  
  ];