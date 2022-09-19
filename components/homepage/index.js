import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';




export default function Homepage(props) {

                return( 
                  <Box>
                                <Container maxWidth="false" className="homepageContainer" disableGutters sx={{ backgroundImage: 
                               "url('https://images.pexels.com/photos/325185/pexels-photo-325185.jpeg')",
                                      position: 'relative', 
                                      zIndex: '0',
                                  width: '100%',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                      height:'40vh',
                                      fontSize:'50px',
                                      backgroundSize: 'cover',
                                      backgroundRepeat: 'no-repeat',
                                      backgroundPosition: '0 -350px'}}>
                                      <Container maxWidth="xl">

                                        <Grid container spacing={0}>
                                          <Grid xs={6}>
                                            <Typography variant="h2" component="h1" sx={{textAlign: 'left', fontWeight: '900', fontFamily: 'Poppins'}}>
                                        The new economy for your community
                                        </Typography>
                                          </Grid>
                                          <Grid xs={4}>
                                          </Grid>
                                          <Grid xs={4}>
                                        <Typography variant="h6" component="h1" sx={{textAlign: 'left', fontFamily: 'Poppins'}}>
                                        Get Creative. Get Paid. Get Royalties
                                        </Typography>   
                                        </Grid>
                                          <Grid xs={8}>
                                          </Grid>
                                          <Grid xs={4} sx={{textAlign: 'left'}}>
                                          <Button variant="contained" size="large" sx={{fontFamily: 'Poppins', backgroundColor:'#96F2A4', color: '#000000', fontWeight: '800', borderRadius: '40px'}}>Create</Button>
                                        <Button variant="outlined" size="large" sx={{fontFamily: 'Poppins', backgroundColor:'#000000', color: '#ffffff', fontWeight: '800', borderRadius: '40px'}}>Discover</Button>
                                          </Grid>

                                          
                                        </Grid>
                                        </Container>

                              </Container>
                              </Box>

                )


}