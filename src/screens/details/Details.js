import React, { useEffect, useState } from 'react';
import './Details.css';
import Header from '../../common/header/Header';
import { withStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import YouTube from 'react-youtube';
import getYouTubeID from 'get-youtube-id';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import { GridList,GridListTile,GridListTileBar } from '@material-ui/core';

const styles = () =>(
    {
        'back-btn': {
            margin: '8px auto 0px 24px',
            height: '24px',
            cursor: 'pointer' ,
        },
        marginTop: {
            marginTop: '16px',
        },
        marginBottom: {
            marginBottom: '16px'
        },
        opts: {
            
        }

    }
)

const Details = (props) => {
    const [movieDetails,setMovieDetails] = useState({});
    const [genres,setGenres] =useState("");
    const [release_date,setReleaseDate] = useState("");
    const [critics_rating,setCriticsRating] = useState('');
    const [story_line,setStoryLine] = useState("");
    const [wiki_url,setWikiUrl] = useState("");
    const [trailer_url,setTrailerUrl] = useState("");
    const [rating,setRating] =useState(0);
    const [artists,setArtists] = useState([]);
    
    useEffect(() => {
        fetch(`${props.baseUrl}movies/${props.match.params.id}`, {
            method: 'GET',
            headers:{
                "Accept": "application/json;charset=UTF-8",
                "Content-Type": "application/json;charset=UTF-8"
            }
        })
            .then((response) => response.json())
            .then((data) => {
                setMovieDetails(data);
                setGenres(data.genres.join());

                let d = new Date(data.release_date);

                setReleaseDate(d.toDateString());
                setCriticsRating(data.rating);
                setStoryLine(data.storyline);
                setWikiUrl(data.wiki_url);
                setTrailerUrl(data.trailer_url);
                setArtists(data.artists.slice(0,2))
             })
    },[])


    return (
        <div>
            <Header  showBtn={true} history={props.history} id={props.match.params.id}/>

            <Typography className={props.classes['back-btn']} >
                <Link to='/'>
                    &#60; Back to Home
                </Link>
            </Typography>
 
            <div className='flex-container'>
                <div className='side-container'>
                    <img src={movieDetails.poster_url} alt={`${movieDetails.title} Poster`} />
                </div>
                <div className='middle-container'>
                    <Typography variant="headline"  component="h2">
                    {movieDetails.title}
                    </Typography>

                    <Typography >
                    <b>Genres:</b> {genres}
                    </Typography>

                    <Typography >
                    <b>Duration:</b> {movieDetails.duration}
                    </Typography>

                    <Typography >
                    <b>Release Date:</b> {release_date}
                    </Typography>

                    <Typography >
                    <b>Rating:</b> {critics_rating}
                    </Typography>

                    <Typography className={props.classes.marginTop}>
                    <b>Plot:</b> <a href={wiki_url}>(Wiki Link)</a> {story_line}
                    </Typography>

                    <Typography className={props.classes.marginTop}>
                        <b>Trailer:</b> 
                    </Typography>

                    <YouTube videoId={getYouTubeID(trailer_url)} opts={{width: '95%', playerVars: {autoplay: 1}}}/>
                </div>
                <div className="side-container">
                    <Typography >
                        <b>Rate this movie:</b> 
                    </Typography>
                    <div className="rating">
                        <StarBorderIcon style={rating>=1?{color: 'yellow'}:{color: 'black'}} onClick={() => setRating(1)}/>
                        <StarBorderIcon style={rating>=2?{color: 'yellow'}:{color: 'black'}} onClick={() => setRating(2)}/>
                        <StarBorderIcon style={rating>=3?{color: 'yellow'}:{color: 'black'}} onClick={() => setRating(3)}/>
                        <StarBorderIcon style={rating>=4?{color: 'yellow'}:{color: 'black'}} onClick={() => setRating(4)}/>
                        <StarBorderIcon style={rating>=5?{color: 'yellow'}:{color: 'black'}} onClick={() => setRating(5)}/>
                    </div>

                    <Typography className={`${props.classes.marginTop} ${props.classes.marginBottom}`}>
                        <b>Artists:</b> 
                    </Typography>

                    <GridList cols={2}>
                    { 
                        artists.map(artist => (
                            <GridListTile key={artist.id}>
                                <img src={artist.profile_url} alt={artist.first_name}/>
                                <GridListTileBar 
                                    title={`${artist.first_name} ${artist.last_name}`}
                                />
                            </GridListTile>
                        ))
                    }
                    </GridList>
                </div>
            </div>
        </div>
    );
}

export default withStyles(styles)(Details);