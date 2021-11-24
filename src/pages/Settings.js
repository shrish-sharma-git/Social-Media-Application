import { Avatar, Backdrop, Button, Card, CardHeader, Divider, Fade, Grid, IconButton, Modal, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useRef, useState } from 'react';
import MenuDrawer from './components/MenuDrawer';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import { useHistory } from 'react-router';
import { useAuth } from '../context/AuthContext';

const Settings = () => {
    const [error, setError] = useState('');
    const { currentUser, logout, updateEmail, updatePassword } = useAuth();
  
    // Modal (Email & Password Change)
    function handleEmailPasswordChangeSubmit(e) {
        e.preventDefault();
        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError("Passwords do not match")
        }
    
        const promises = []
        setLoading(true)
        setError("")
    
        if (emailRef.current.value !== currentUser.email) {
        promises.push(updateEmail(emailRef.current.value))
        }
        if (passwordRef.current.value) {
        promises.push(updatePassword(passwordRef.current.value))
        }
    
        Promise.all(promises)
        .then(() => {
            history.push("/")
        })
        .catch(() => {
            setError("Failed to update account")
        })
        .finally(() => {
            setLoading(false)
        })
    }

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()

    const [loading, setLoading] = useState(false)

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'white',
        color: 'black',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };


    const history = useHistory();

    async function handleLogout() {
        setError('');

        try {
            await logout();
            history.push('/login')
        } catch {
            setError('Failed to Logout');
        }
    }

    return (  
        <Box>
            <MenuDrawer />
            <Box component="main" sx={{ flexGrow: 1, p: 3, margin: {xs: '50px 0px'}, marginLeft: {sm: '240px'}, marginRight: {sm: '400px'} }}>

                {/* Profile Picture Change */}
                <Grid container sx={{m: '10px'}}>
                    <Grid item xs={12} sx={{display: 'flex', justifyContent: 'center'}}>
                        <IconButton>
                            <Avatar
                                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRb1Vhn8SZVQpSdij5JRfhM5XcePLTYcZJTAA&usqp=CAU"
                                sx={{ height: 200, width: 200, "&:hover, &.Mui-focusVisible": {zIndex: 1}, "& .MuiImageBackdrop-root": {opacity: 0.15}, "& .MuiImageMarked-root": {opacity: 0}, "& .MuiTypography-root": {border: '10px solid currentColor'} }}
                            />
                        </IconButton>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="subtitle2" sx={{textAlign: 'center'}}>Edit Profile Picture</Typography>
                    </Grid>
                </Grid>

                {/* Name Change */}
                <Card sx={{m: '10px'}}>
                    <CardHeader
                        subheader="Edit Name"
                        action={
                            <IconButton aria-label="edit">
                                <EditRoundedIcon/>
                            </IconButton>
                        }
                    />
                    <Grid container sx={{m: '10px', p: '10px'}}>
                        <Grid item xs={6}>
                            <Typography variant="h5">Name:</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="h5">John Doe</Typography>
                        </Grid>
                    </Grid>
                </Card>
                
                {/* Username Change */}
                <Card sx={{m: '10px'}}>
                    <CardHeader
                            subheader="Edit Username"
                            action={
                                <IconButton aria-label="edit">
                                    <EditRoundedIcon/>
                                </IconButton>
                            }
                    />
                    <Grid container sx={{m: '10px', p: '10px'}}>
                        <Grid item xs={6}>
                            <Typography variant="h5">Username:</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="h5">@slim_shady</Typography>
                        </Grid>
                    </Grid>
                </Card>
                
                {/* Bio Change */}
                <Card sx={{m: '10px'}}>
                    <CardHeader
                            subheader="Edit Bio"
                            action={
                                <IconButton aria-label="edit">
                                    <EditRoundedIcon/>
                                </IconButton>
                            }
                    />
                    <Grid container sx={{m: '10px', p: '10px'}}>
                        <Grid item xs={6}>
                            <Typography variant="h5">Bio:</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography
                                variant="h5"
                                noWrap
                            >
                                Lorem ipsum dolor sit amet.
                            </Typography>
                        </Grid>
                    </Grid>
                </Card>

                <Divider sx={{ m: '25px 0 25px 0' }}/>
                
                {/* Email & Password Change */}
                <Card sx={{m: '10px'}}>
                    <CardHeader
                            subheader="Privacy & Security Settings"
                            action={
                                <IconButton aria-label="edit">
                                    <EditRoundedIcon
                                        onClick={handleOpen}
                                    />
                                </IconButton>
                            }
                    />
                    <Grid container sx={{m: '10px', p: '10px'}}>
                        <Grid item xs={6}>
                            <Typography variant="h5">Email:</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography
                                variant="h5"
                                noWrap
                            >
                                abc@xyz.com
                            </Typography>
                        </Grid>

                        <Grid item xs={6}>
                            <Typography variant="h5">Password:</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography
                                variant="h5"
                                noWrap
                            >
                                *******
                            </Typography>
                        </Grid>
                    </Grid>
                </Card>
                {/* MODAL Email & Password Change MODAL */}
                <Modal
                    open={open}
                    onClose={handleClose}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                      timeout: 500,
                    }}
                >
                    <Fade in={open}>
                        <Box sx={style}>
                        <Typography id="transition-modal-title" variant="h6" component="h2">
                            Edit Email and Pass
                        </Typography>
                        <Box component="form" noValidate onSubmit={handleEmailPasswordChangeSubmit} sx={{ mt: 1 }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                inputRef={emailRef}
                                id="email"
                                label="Email"
                                name="email"
                                autoComplete="email"
                                autoFocus
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                inputRef={passwordRef}
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                            />
                            <TextField
                            required
                            inputRef={passwordConfirmRef}
                            fullWidth
                            name="confirm password"
                            label="Confirm Password"
                            type="password"
                            id="confirm-password"
                            autoComplete="new-password"
                            />
                            <Button
                                type="submit"
                                disabled={loading}
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Save Changes
                            </Button>
                            </Box>
                        </Box>
                    </Fade>
                </Modal>

                <Divider sx={{ m: '25px 0 25px 0' }}/>                

                {/* Sign Out */}
                <Card sx={{m: '10px'}}>
                    <CardHeader
                            subheader="Log Out"
                    />
                    <Grid container sx={{m: '10px', p: '10px'}}>
                        <Grid item xs={12}>
                            <Button
                                variant="contained"
                                color="error"
                                onClick={handleLogout}
                            >
                                Log Out
                            </Button>
                        </Grid>
                    </Grid>
                </Card>

            </Box>
        </Box>
    );
}
 
export default Settings;
