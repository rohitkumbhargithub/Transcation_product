import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TranscationDashBoard from '../component/TranscationDashBoard';

const Search = () => {
    const [data, setData] = useState([]);
    const [selectMonths, setSelectMonths] = useState('');
    const [search, setSearch] = useState('');

    useEffect(() => {
        axios.get('https://transcation.onrender.com/product/all-product')
          .then((response) => {
            setData(response.data);
          })
          .catch((error) => {
            console.log(error);
          });
      }, []);

    return (
      <div className="App">
        <h1>Transctions Dashboard</h1>
        <div className="search-container">
          <input type="text" onChange={(e) => setSearch(e.target.value)} placeholder='Search Trascation'/>
          <select className='transcation' value={selectMonths} onChange={e => setSelectMonths(e.target.value)}>
            <option value="">Select Month</option>
            <option value="01">January</option>
            <option value="02">February</option>
            <option value="03">March</option>
            <option value="04">April</option>
            <option value="05">May</option>
            <option value="06">June</option>
            <option value="07">July</option>
            <option value="08">August</option>
            <option value="09">September</option>
            <option value="10">October</option>
            <option value="11">November</option>
            <option value="12">December</option>
          </select>
        </div>
        <TranscationDashBoard search={search} selectMonths={selectMonths} data={data}/>
      </div>
    );
}

export default Search
