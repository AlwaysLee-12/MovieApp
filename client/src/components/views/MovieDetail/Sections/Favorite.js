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

    let variables={
        userFrom:userFrom,
        movieId:movieId,
        movieTitle:moviePost,
        moviePost:moviePost,
        movieRunTime:movieRunTime
    }
    useEffect(() => {
        

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

    const onClickFavorite=()=>{
        if(Favorited){
            axios.post('/api/favorite/removeFromFavorite',variables)
            .then(response=>{
                if(response.data.success){
                    setFavoriteNumber(FavoriteNumber-1)
                    setFavorited(!Favorited)
                }else{
                    alert('Favorite 리스트에서 삭제 실패')
                }
            })
        }else{
            axios.post('/api/favorite/addToFavorite',variables)
            .then(response=>{
                if(response.data.success){
                    setFavoriteNumber(FavoriteNumber+1)
                    setFavorited(!Favorited)
                }else{
                    alert('Favorite 리스트에 추가 실패')
                }
            })
        }
    }

    return (
        <div>
            <button onClick={onClickFavorite}>{Favorited? "Not Favorite ":"Add to Favorite "}{FavoriteNumber}</button>
        </div>
    )
}

export default Favorite
