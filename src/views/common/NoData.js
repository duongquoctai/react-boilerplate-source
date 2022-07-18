import { Box, Typography } from '@mui/material';

export const NoData = ({ text }) => {
  return (
    <Box textAlign="center" p={2}>
      <img
        src="/static/images/nodata.png"
        alt="No data found"
        style={{ margin: '0 auto' }}
        width="100"
      />
      <Typography variant="body1" color="#919EAB">
        {text}
      </Typography>
    </Box>
  );
};
