import axios from 'axios'
import React,{useEffect,useState} from 'react'

function Favorite(props) {
    const movieId=props.movieId
    const userFrom=props.userFrom
    const movieTitle=props.movieInfo.title
    const moviePost=props.movieInfo.backdrop_path
    const movieRunTime=props.movieInfo.runtime
    
    const [FavoriteNumber,setFavoriteNumber]=useState(0)
    const [Favorited,setFavorited]=useState(false)

    useEffect(() => {
        let variables={
            userFrom,
            movieId
        }

        axios.post('/api/favorite/favoriteNumber',variables)
            .then(response=>{
                console.log(response.data);
                setFavoriteNumber(response.data.favoriteNumber)
                if(response.data.success){

                }else{
                    alert('숫자 정보를 가져오는데 실패.')
                }
            })

        axios.post('/api/favorite/favorited',variables)
            .then(response=>{
                if(response.data.success){
                    setFavorited(response.data.favorited)
                }else{
                    alert('정보를 가져오는데 실패.')
                }
            })
    }, [])

    return (
        <div>
            <button>{Favorited? "Not Favorite":"Add to Favorite"}{FavoriteNumber}</button>
        </div>
    )
}

export default Favorite
