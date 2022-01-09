import React from 'react';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Avatar, Button, Card, CardHeader, Tooltip } from '@mui/material';
import { firestore } from '../../firebase';
import { useHistory } from 'react-router-dom';

const rightDrawerWidth = 400;

const RightSidebar = () => {
  const history = useHistory();

  // Fetching Users
  const [users, setUsers] = React.useState([]);

  React.useEffect(() => {
      try {
          firestore.collection('users')
            .onSnapshot(snap => {
              let documents = [];
              snap.forEach(doc => {
                documents.push({...doc.data(), id: doc.id});
              });
              setUsers(documents);
            })
      }
      catch(err) {
          console.log(err);
      }
  }, [])

  console.log(users)

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
        Top Users  
      </Typography> 

      {users && users.map(doc => (
        <Card sx={{ margin: '15px 35px 15px 35px', padding: '10px 0px'}} key={doc.id}>
        <CardHeader
          avatar={
            <Tooltip
              title="Visit Profile"
              arrow
            >
              <Avatar sx={{bgcolor: '#1976D2'}}
              src={doc.profileImageURL}
              onClick={() => history.push({
                pathname: '/GuestProfile',
                state: {detail : doc.id}
              })}
            />
            </Tooltip>              
          }
          title={doc.firstName + " " + doc.lastName}
          subheader={doc.username}
          // action={
          //   <>
          //     <Button>Follow</Button>
          //   </>
          // }
        />
        </Card>
      ))}
    </div>
    </Box>
    );
}
 
export default RightSidebar;