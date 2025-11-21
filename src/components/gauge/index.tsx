import { Box, Typography } from '@mui/material';
import { Gauge, gaugeClasses } from '@mui/x-charts/Gauge';

const expected = 9023009.00;
const Realized = 5329523.00;
const percentage = (Realized / expected) * 100;


const settings = {
  width: 200,
  height: 200,
  value: percentage,
};

export default function ArcDesign() {
  return (
    <Box sx={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 2,
      width: "100%",
    }}>
      <Gauge
        {...settings}
        cornerRadius="50%"
        text={`${percentage.toFixed(1)}%`}
        sx={(theme) => ({
          [`& .${gaugeClasses.valueText}`]: {
            fontSize: 40,
          },
          [`& .${gaugeClasses.valueArc}`]: {
            fill: 'rgb(137, 86, 255)',
          },
          [`& .${gaugeClasses.referenceArc}`]: {
            fill: theme.palette.text.disabled,
          },
        })}
      />
      <Box sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
        gap: 2,
      }}>
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <Typography variant="body2">Expected</Typography>
          <Typography variant="body1" fontWeight={600}>
            ${expected.toLocaleString()}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <Typography variant="body2">Realized</Typography>
          <Typography variant="body1" fontWeight={600}>
            ${Realized.toLocaleString()}
          </Typography>
        </Box>
      </Box>
    </Box>
  );

}
