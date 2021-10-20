import React from 'react';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Avatar, Button, Card, CardHeader } from '@mui/material';

const rightDrawerWidth = 400;

const RightSidebar = () => {
    return (  
      <Box
      sx={{ width: { sm: rightDrawerWidth }, flexShrink: { sm: 0 }, display: { xs: 'none', sm: 'block' } }}>
      <div>
      <Toolbar/>
      <Divider />

      <Typography
        variant="h6"
        textAlign="center"
      >
        People you may know  
      </Typography>  

      <Card sx={{ margin: '25px', padding: '25px 0px' }}>
      <CardHeader
        avatar={
          <Avatar sx={{bgcolor: '#1976D2'}}>
            SS
          </Avatar>
        }
        title="Slim Shady"
        subheader="@slim_shady"
        action={
          <Button>Follow</Button>
        }
      />
      </Card>
      <Card sx={{ margin: '25px', padding: '25px 0px' }}>
      <CardHeader
        avatar={
          <Avatar sx={{bgcolor: '#1976D2'}}>
            AR
          </Avatar>
        }
        title="Abigail Roberts"
        subheader="@abigail"
        action={
          <Button>Follow</Button>
        }
      />
      </Card>
      <Card sx={{ margin: '25px', padding: '25px 0px' }}>
      <CardHeader
        avatar={
          <Avatar sx={{bgcolor: '#1976D2'}}>
            JS
          </Avatar>
        }
        title="Jason Smith"
        subheader="@jason"
        action={
          <Button>Follow</Button>
        }
      />
      </Card>
      <Card sx={{ margin: '25px', padding: '25px 0px' }}>
      <CardHeader
        avatar={
          <Avatar sx={{bgcolor: '#1976D2'}}>
            RM
          </Avatar>
        }
        title="Rose Mary"
        subheader="@rose"
        action={
          <Button>Follow</Button>
        }
      />
      </Card>
      
    </div>
    </Box>
    );
}
 
export default RightSidebar;