import * as React from 'react';
import { Box } from '@mui/material';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { Link } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';

export default function IconBreadcrumbs({ breadcrumbs = [] }) {
  return (
    <Box
      sx={{
        p: 1,
        m: 1,
      }}
    >
      <Breadcrumbs aria-label='breadcrumb'>
        <Link
          underline='hover'
          sx={{ display: 'flex', alignItems: 'center' }}
          style={{ color: '#6b6b6b' }}
          to='/'
        >
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <HomeIcon sx={{ mr: 0.5 }} fontSize='inherit' />
            Home
          </Box>
        </Link>
        {breadcrumbs &&
          breadcrumbs.map((item, index) => {
            if (item.isActive) {
              return (
                <Typography
                  key={index}
                  sx={{ display: 'flex', alignItems: 'center' }}
                  color='text.primary'
                >
                  {item.icon ? item.icon : ''}
                  {item.title}
                </Typography>
              );
            } else {
              return (
                <Link
                  key={index}
                  underline='hover'
                  color='inherit'
                  to={item.link}
                  style={{ color: '#6b6b6b' }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    {item.icon ? item.icon : ''}
                    {item.title}
                  </Box>
                </Link>
              );
            }
          })}
      </Breadcrumbs>
    </Box>
  );
}
