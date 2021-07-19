import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../common/header/Header';
import './Home.css';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import { withStyles } from '@material-ui/core/styles';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import PropTypes from "prop-types";
import Card from '@material-ui/core/Card';
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { FormControl,InputLabel,Input,Select,MenuItem,Checkbox,ListItemText,TextField,Button } from '@material-ui/core';

const styles = (theme) =>(
    {
        gridList: {
            flexWrap: 'nowrap',
            transform: 'translateZ(0)',
          },
        cardItem: {
            margin: theme.spacing.unit,
            minWidth: '240px',
            maxWidth:'240px'
        },
        cardHeading: {
            color: theme.palette.primary.light,
        }
    }
)


const Home = ({classes , baseUrl}) => {
    
    const [UpcomingMovies, setUpcomingMovies] = useState([]);
    const [releasedMovies,setReleasedMovies] = useState([]);
    const [movieName,setMoieName] = useState("");
    const [genres,setGenres] = useState([]);
    const [selectedGenres,setSelectedGenres] = useState([]);
    const [artists,setArtists] = useState([]);
    const [selectedArtists, setSelectedArtists] = useState([]);
    const [startDate,setStartDate] = useState("");
    const [endDate,setEndDate] = useState("");

    useEffect(() => {
        fetch(`${baseUrl}movies?page=1&limit=7`, {
            method: 'GET',
            headers:{
                "Accept": "application/json;charset=UTF-8",
                "Content-Type": "application/json;charset=UTF-8"
            }
        })
            .then((response) => response.json())
            .then((data) => {
                setUpcomingMovies(data.movies);
                setReleasedMovies(data.movies);
            });

        fetch('http://localhost:8085/api/v1/genres', {
            method: 'GET',
            headers: {
                "Accept": "application/json;charset=UTF-8",
            }
        })
            .then((response) => response.json())
            .then((data) => setGenres(data.genres.map(genre => genre.genre)));

        fetch('http://localhost:8085/api/v1/artists?page=1&limit=10', {
            method:'GET',
            headers: {
                "Accept": "application/json;charset=UTF-8",
                "Content-Type": "application/json;charset=UTF-8"
            }
        })
            .then(response => response.json())
            .then(data => setArtists(data.artists.map(artist => `${artist.first_name} ${artist.last_name}`)))
    },[])

    const movieNameHandler = (e) => {
        setMoieName(e.target.value);
    }

    const selectedGenresHandler =(e) => {
        setSelectedGenres(e.target.value);
    }

    const selectedArtistsHandler = (e) => {
        setSelectedArtists(e.target.value);
    }

    const startDateHandler = (e) => {
        setStartDate(e.target.value);
    }

    const endDateHandler = (e) => {
        setEndDate(e.target.value);
    }

    const applyButtonHandler = () => {
        let baseUrl = 'http://localhost:8085/api/v1/movies?page=1%20&limit=30';

        if(movieName)
            baseUrl= `${baseUrl}&title=${movieName}`

        if(selectedGenres && selectedGenres.length > 0) 
            baseUrl = `${baseUrl}&genre=${selectedGenres.join('%2C')}`;

        if(selectedArtists && selectedArtists.length > 0) 
            baseUrl = `${baseUrl}&artists=${selectedArtists.join('%2C')}`

        if(startDate)
            baseUrl = `${baseUrl}&start_date=${startDate}`;

        if(endDate)
            baseUrl = `${baseUrl}&end_date=${endDate}`;
          
        fetch(`${baseUrl}`, {
            method: 'GET',
            headers: {
                "Accept": "application/json;charset=UTF-8",
                "Content-Type": "application/json;charset=UTF-8"
            }
        })
        .then((response) => response.json())
        .then((data) => {
            setReleasedMovies(data.movies);
        });

    }

    const detailsHandler = () => {

    }

    return(
        <div>
            <Header />

            <h1 className="heading">Upcoming Movies</h1>

            <GridList cols={6} cellHeight={250} className={classes.gridList}>
                {
                    UpcomingMovies.map(movie => (
                        <GridListTile key={movie.id}>
                            <img src={movie.poster_url} alt={movie.title}/>
                            <GridListTileBar 
                                title={movie.title}
                            />
                        </GridListTile>
                    ))
                }
            </GridList>

            <div className="flex-container">
                <div className="released-movies">
                <GridList cols={4} cellHeight={350} spacing={60}>
                    {
                        releasedMovies.map(movie => (
                            <GridListTile 
                                key={movie.id}
                                onClick={detailsHandler}
                            >
                                
                                <Link to={`/movie/${movie.id}`}>
                                    <img src={movie.poster_url} alt={movie.title} className="image"/>
                                </Link>
                                <GridListTileBar 
                                    title={movie.title}
                                    subtitle={`Release Date ${movie.release_date}`}
                                />
                            </GridListTile>
                        ))
                    }
                </GridList>
                </div>
                <div className="filter">
                    <Card>
                        <CardContent>
                            <Typography variant="subheading"  className={classes.cardHeading}>
                                FIND MOVIES BY:
                            </Typography>

                            <FormControl className={classes.cardItem}>
                                <InputLabel htmlFor="movieName">
                                    Movie Name
                                </InputLabel>
                                <Input
                                    id="movieName"
                                    value={movieName}
                                    onChange={movieNameHandler}
                                />
                            </FormControl>

                            <FormControl className={classes.cardItem}>
                                <InputLabel htmlFor="genres">Genres</InputLabel>
                                <Select 
                                    value={selectedGenres}  
                                    multiple
                                    renderValue={(selected) => selected.join(', ')} 
                                    onChange={selectedGenresHandler}>
                                    {genres.map((genre) => (
                                    <MenuItem key={genre} value={genre}>
                                        <Checkbox checked={selectedGenres.indexOf(genre) > -1} />
                                        <ListItemText primary={genre} />
                                    </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>

                            <FormControl className={classes.cardItem}>
                                <InputLabel htmlFor="artists">Artists</InputLabel>
                                <Select 
                                    value={selectedArtists}  
                                    multiple
                                    renderValue={(selected) => selected.join(', ')} 
                                    onChange={selectedArtistsHandler}>
                                    {artists.map((artist) => (
                                    <MenuItem key={artist} value={artist}>
                                        <Checkbox checked={selectedArtists.indexOf(artist) > -1} />
                                        <ListItemText primary={artist} />
                                    </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>

                            <FormControl className={classes.cardItem}>
                                <TextField 
                                    label="Release Date Start" 
                                    type="date"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    onChange={startDateHandler}
                                />
                            </FormControl>

                            <FormControl className={classes.cardItem}>
                                <TextField 
                                    label="Release Date End" 
                                    type="date"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    onChange={endDateHandler}
                                />
                            </FormControl>

                            <Button
                                variant="contained"
                                onClick={applyButtonHandler}
                                color="primary"
                                className={classes.cardItem} 
                            >
                                APPLY
                            </Button>
                        </CardContent>                           
                    </Card>
                </div>
            </div>
        </div>
    );
}

Home.propTypes = {
    classes: PropTypes.object.isRequired,
};


export default withStyles(styles)(Home);