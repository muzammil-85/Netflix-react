import React,{useState,useEffect} from 'react'
import './RowPost.css';
import axios from '../../axios';
import YouTube from 'react-youtube';
import {imageUrl,API_KEY} from '../../constants/constants'

function RowPost(props) {
  const [movies, setmovies] = useState([]);
  const [urlId, setUrlId] = useState('');

  useEffect(() => {
    axios.get(props.url).then((response)=>{
      setmovies(response.data.results)
    }).catch(err=>{
      alert('Network Error')
    })
  }, []);
  const opts = {
    height: '390',
    width: '100% ',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };
  const handleMovie = (id)=>{
    axios.get(`/movie/${id}/videos?api_key=${API_KEY}&language=en-US`).then((response)=>{
      if(response.data.results.length!==0){
        setUrlId(response.data.results[0])
      }else{
        console.log('not found');
      }
    }).catch(err=>{
      console.log('no video found');
    })
  }
  return (
    <div className='row'>
      <h2>{props.title}</h2>
      <div className='posters'>
        {movies.map((obj,index)=>

        <img key={index} onClick={()=>handleMovie(obj.id)} className={props.isSmall ? 'smallPoster' : 'poster'} src={`${imageUrl+obj.backdrop_path}`} alt="poster" />
        )}
        
      </div>
      {urlId.key && <YouTube videoId={urlId.key} opts={opts}/> }
    </div>
  )
}

export default RowPost
