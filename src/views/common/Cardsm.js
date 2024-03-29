import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import ReactApexChart from 'react-apexcharts';
import { fNumber, fPercent } from '~/utils/formatNumber';
import trendingUpFill from '@iconify-icons/eva/trending-up-fill';
import trendingDownFill from '@iconify-icons/eva/trending-down-fill';
import { alpha, useTheme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import { Box, Card, Typography } from '@mui/material';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(3)
  },
  trending: {
    display: 'flex',
    alignItems: 'center',
    marginTop: theme.spacing(1.5),
    marginBottom: theme.spacing(0.5)
  },
  trendingIcon: {
    width: 24,
    height: 24,
    display: 'flex',
    borderRadius: '50%',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: theme.spacing(1),
    color: theme.palette.primary.main,
    backgroundColor: alpha(theme.palette.primary.main, 0.16)
  },
  isTrendingDown: {
    color: theme.palette.error.main,
    backgroundColor: alpha(theme.palette.error.main, 0.16)
  }
}));

// ----------------------------------------------------------------------

Cardsm.propTypes = {
  className: PropTypes.string
};

const PERCENT = 2.6;
const TOTAL_USER = 18765;

function Cardsm({ className, ...other }) {
  const classes = useStyles();
  const theme = useTheme();
  const { name, date } = other;
  const chartData = [
    { data: [2532, 6632, 4132, 8932, 6332, 2532, 4432, 1232, 3632, 932, 3354] }
  ];
  const chartOptions = {
    colors: [theme.palette.primary.main],
    chart: { sparkline: { enabled: true } },
    plotOptions: { bar: { columnWidth: '68%', endingShape: 'rounded' } },
    labels: [1, 2, 3, 4, 5, 6, 7, 8],
    tooltip: {
      x: { show: false },
      y: {
        formatter: (seriesName) => fNumber(seriesName),
        title: {
          formatter: function(seriesName) {
            return '';
          }
        }
      },
      marker: { show: false }
    }
  };

  return (
    <Card className={clsx(classes.root, className)} {...other}>
      <Box sx={{ flexGrow: 1 }}>
        <Typography variant="subtitle2">{name}</Typography>
        <div className={classes.trending}>
          <div
            className={clsx(classes.trendingIcon, {
              [classes.isTrendingDown]: PERCENT < 0
            })}
          >
            <Icon
              width={16}
              height={16}
              icon={PERCENT >= 0 ? trendingUpFill : trendingDownFill}
            />
          </div>
          <Typography
            component="span"
            variant="subtitle2"
            color={PERCENT >= 0 ? 'primary' : 'error'}
          >
            {date}
          </Typography>
        </div>

        <Typography variant="h3">{fNumber(TOTAL_USER)}</Typography>
      </Box>
      <ReactApexChart
        type="bar"
        width={60}
        height={36}
        series={chartData}
        options={chartOptions}
      />
    </Card>
  );
}

export default Cardsm;
