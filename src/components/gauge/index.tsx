import { Container, Typography } from '@mui/material';
import { Gauge, gaugeClasses } from '@mui/x-charts/Gauge';
import { Fragment } from 'react/jsx-runtime';

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
    <Fragment>
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
      <Container sx={{
        flex: 1,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
      }}>
        <Typography>
          <Typography>Expected</Typography>
          ${expected.toLocaleString()}
        </Typography>
        <Typography>
          <Typography>Realized</Typography>
          ${Realized.toLocaleString()}
        </Typography>
      </Container>

    </Fragment>
  );

}
