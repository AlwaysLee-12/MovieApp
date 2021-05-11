import axios from 'axios'
import React,{useEffect,useState} from 'react'
import './favorite.css'

function FavoritePage() {
    const [Favorites,setFavorites]=useState([])

    useEffect(() => {
        axios.post('/api/favorite/getFavoredMovie',{userFrom:localStorage.getItem('userId')})
            .then(response=>{
                if(response.data.success){
                    console.log(response.data);
                    setFavorites(response.data.favorites)
                }else{
                    alert('영화 정보를 가져오는데 실패')
                }
            })
    }, [])

    return (
        <div style={{width:'85%', margin:'3rem auto'}}>
            <h2>Favorite Movies</h2>
            <hr/>

            <table>
                <thead>
                    <tr>
                        <th>Movie Title</th>
                        <th>Movie Runtime</th>
                        <th>Remove from favorites</th>
                    </tr>
                </thead>
                <tbody>
                    {Favorites.map((favorite,index)=>(
                        
                        <tr key={index}>
                            <td>{favorite.movieTitle}</td>
                            <td>{favorite.movieRunTime}mins</td>
                            <td><button>Remove</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default FavoritePage
