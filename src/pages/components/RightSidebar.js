import React from 'react';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Avatar, Button, Card, CardHeader } from '@mui/material';

const rightDrawerWidth = 400;

const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        {['Home', 'Profile'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              {index % 2 === 0 ? <HomeRoundedIcon /> : <PersonRoundedIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['Settings'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              {index % 2 === 0 ? <SettingsRoundedIcon /> : <SettingsRoundedIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </div>
);

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
      
    </div>
    </Box>
    );
}
 
export default RightSidebar;