import { LineChart, areaElementClasses } from '@mui/x-charts/LineChart';

export default function BasicLineChart() {
  // Realistic money data in thousands (e.g., 125 = $125,000)
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  
  // Money won - typically higher values with some variation
  const moneyWon = [125, 142, 98, 165, 178, 195, 210, 188, 203, 225, 198, 240];
  
  // Money lost - typically lower values, but can sometimes exceed won
  const moneyLost = [45, 52, 68, 38, 75, 92, 88, 105, 78, 95, 112, 85];

  // Calculate the positive difference: only show area where lost > won
  // This will be stacked on top of the won area
  const lostAboveWon = moneyLost.map((lost, index) => {
    const won = moneyWon[index];
    return Math.max(0, lost - won); // Only positive differences
  });

  return (
    <LineChart
      xAxis={[{ 
        data: months,
        scaleType: 'point'
      }]}
      yAxis={[{
        label: 'Amount (in thousands)'
      }]}
      series={[
        {
          id: 'won',
          label: "Money Won",
          data: moneyWon,
          color: 'rgb(137, 86, 255)',
          area: true,
          stack: 'total',
          highlightScope:{
            highlight:"item"
          }
        },
        {
          id: 'lost',
          label: "Money Lost",
          data: moneyLost,
          color: 'rgb(255, 179, 0)',
          area: true,
        },
        // {
        //   id: 'lost-above',
        //   label: "Lost Above Won",
        //   data: lostAboveWon,
        //   color: 'rgb(255, 179, 0)',
        //   area: true,
        //   showMark: false,
        //   stack: 'total',
        // }
      ]}
      height={300}
      sx={{
        width: '100%',
        [`& .${areaElementClasses.root}`]: { opacity: 0.3 },
      }}
    />
  );
}
