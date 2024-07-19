import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const BarChart = ({ filterTransactions, selectMonths}) => {
  
  // Calculate price ranges
  const priceRanges = [0, 100, 200, 300, 400, 600, 700, 800, 900];
  const rangeCounts = priceRanges.map(range => {
    const nextRange = priceRanges[priceRanges.indexOf(range) + 1] || Infinity;
    return filterTransactions.filter(transaction => {
      const price = parseFloat(transaction.price);
      return price >= range && price < nextRange;
    }).length;
  });

  const data = {
    labels: priceRanges.map((range, index) => {
      const nextRange = priceRanges[index + 1] || 'Above';
      return `${range}-${nextRange}`;
    }),
    datasets: [
      {
        label: 'Number of Items',
        data: rangeCounts,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div>
      
      <div style={barStyle}>
      <h3 style={{textAlign: 'start'}}>Bar Chart Stats - {selectMonths ? new Date(`2024-${selectMonths}-01`).toLocaleString('default', { month: 'long' }) : 'All Months'}</h3>
        <Bar data={data} />
      </div>

      
    </div>
  );
};

export default BarChart;


const barStyle = {

  margin: '20px', 
  width: '50%',
  float: 'right',
  marginBottom: '10rem'
}