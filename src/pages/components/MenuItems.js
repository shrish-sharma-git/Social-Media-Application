import React from 'react';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import { List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { useHistory } from 'react-router';

const MenuItems = () => {
    // React Router History
    const history = useHistory();

    const menuItems = [
        {
            text: 'Home',
            icon: <HomeRoundedIcon />,
            path: '/'
        },
        {
            text: 'Profile',
            icon: <PersonRoundedIcon />,
            path: '/UserProfile'
        },
        {
            text: 'Settings',
            icon: <SettingsRoundedIcon />,
            path: '/Settings'
        }
    ]

    return (  
        <div>
            <List>
                {menuItems.map(item => (
                    <ListItem
                        button
                        key={item.text}
                        onClick={() => history.push(item.path)}
                    >
                        <ListItemIcon>{item.icon}</ListItemIcon>
                        <ListItemText>{item.text}</ListItemText>
                    </ListItem>    
                ))}
            </List>
        </div>
    );
}
 
export default MenuItems;