import axios from 'axios'
import React,{useState} from 'react'
import { useDispatch} from 'react-redux'
import {loginUser} from '../../../_actions/user_action'
import {withRouter} from 'react-router-dom'

function LoginPage(props) {
    const dispatch=useDispatch()

    //초기 상태 설정(for 값 변경을 위해. 초기 값은 빈칸)
    const [Email, setEmail] = useState("")
    const [Password, setPassword] = useState("")

    //타이핑 시  onChange라는 이벤트를 발생시켜 상태를 변경하면 값이 변경되도록 함.
    const onEmailHandler=(event)=>{
        setEmail(event.currentTarget.value)
    }
    const onPasswordHandler=(event)=>{
        setPassword(event.currentTarget.value)
    }
    const onSubmitHandler=(event)=>{
        //로그인 버튼 클릭 시 페이지가 새로고침 되는 것을 막아줌
        event.preventDefault();

        let body={
            email:Email,
            password:Password
        }

        //redux action 작업
        dispatch(loginUser(body))
            .then(response=>{
                //로그인 완료시 시작 화면으로 돌아감
                if(response.payload.loginSuccess){
                    props.history.push('/');
                }else{
                    alert("Error");
                }
            })

    }
    
    return (
        <div style={{
            display:'flex', justifyContent:'center', alignItems:'center'
            , width:'100%', height:'100vh'
        }}>
            <form style={{display: 'flex',flexDirection:'column'}}
                onSubmit={onSubmitHandler}
            >
                <label>Email</label>
                <input type="email" value={Email} onChange={onEmailHandler}/>
                <label>Password</label>
                <input type="password" value={Password} onChange={onPasswordHandler}/>
            
                <br/>
                <button type="submit">
                    Login
                </button>
            </form>
        </div>
    )
}

export default withRouter(LoginPage)
