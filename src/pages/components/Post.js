import React, { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { Avatar, Card, CardActions, CardContent, CardHeader, CardMedia } from '@mui/material';
import { FavoriteBorderRounded, FavoriteRounded } from '@mui/icons-material';
import moment from 'moment';

const Post = ({ doc }) => {

    const [like, setLike] = useState(false);

    const handleLikes = () => {

      console.log('liked: ' + doc.id)

      if(like == true) {
        setLike(false);
        // firestore.collection('posts')
        // .doc(doc.id)
        // .update({
        //   "likes": "likes"-1
        // })
      } else {
        setLike(true);
        // firestore.collection('posts')
        // .doc(doc.id)
        // .update({
        //   "likes": "likes"+1
        // })
      }
    }
    return (  
        <Card sx={{ margin: {xs: '15px 0px 15px'}, padding: {xs: '15px'} }}>
            <CardHeader
              avatar={
                <Avatar sx={{ backgroundColor: 'red' }} aria-label="recipe" 
                  src={doc.postProfilePicture}
                />
              }
              title={doc.postFirstName + " " + doc.postLastName}
              subheader={moment(doc.postedAt.toDate()).startOf('hour').fromNow()}
            />
            <CardMedia
              component="img"
              height="100%"
              width="100%"
              image={doc.imageURL}
              alt="Post"
            />
            <CardContent>
              <Typography variant="subtitle2" fontSize="large" color="text.secondary">
                {doc.caption}
              </Typography>
            </CardContent>
            <CardActions disableSpacing>
              <IconButton aria-label="add to favorites" onClick={handleLikes}>
                {like ? <FavoriteRounded /> : <FavoriteBorderRounded /> }
                
              </IconButton>
              {/* <Typography
                variant="subtitle2"
                color="gray"
              >
                {doc.likes}
              </Typography> */}
            </CardActions>
        </Card>
    );
}
 
export default Post;