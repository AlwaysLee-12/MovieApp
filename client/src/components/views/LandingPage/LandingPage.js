import React, { useEffect, useState } from "react";
import axios from 'axios';
import {withRouter} from 'react-router-dom'

function LandingPage(props) {
    //서버에 GET 요청을 보내고, 그에 따른 응답을 콘솔 창에 전시
    useEffect(() => {
        axios.get('/api/hello')
        .then(response=>{console.log(response)});
    }, [])

    const onclickHandler=()=>{
        axios.get('/api/users/logout')
        .then(response=>{
            if(response.data.success){
                console.log(response.data);
                props.history.push('/login')
            }else{
                alert("로그아웃 실패")
            }
        })
    }

    return (
        <div style={{
            display:'flex', justifyContent:'center', alignItems:'center'
            , width:'100%', height:'100vh'
        }}>
            <h2>시작 페이지</h2>

            <button onClick={onclickHandler}>
                로그아웃
            </button>
        </div>
    )
}

export default withRouter(LandingPage)
