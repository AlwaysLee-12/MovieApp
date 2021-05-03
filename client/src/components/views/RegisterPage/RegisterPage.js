import React,{useState} from 'react'
import { useDispatch} from 'react-redux'
import {loginUser} from '../../../_actions/user_action'
import {registerUser} from '../../../_actions/user_action'
import {withRouter} from 'react-router-dom'

function RegisterPage(props) {
    const dispatch=useDispatch()

    //초기 상태 설정(for 값 변경을 위해. 초기 값은 빈칸)
    const [Email, setEmail] = useState("")
    const [Password, setPassword] = useState("")
    const [Name,setName]=useState("")
    const [ConfirmPassword,setConfirmPassword]=useState("")

    //타이핑 시  onChange라는 이벤트를 발생시켜 상태를 변경하면 값이 변경되도록 함.
    const onEmailHandler=(event)=>{
        setEmail(event.currentTarget.value)
    }
    const onNameHandler=(event)=>{
        setName(event.currentTarget.value)
    }
    const onPasswordHandler=(event)=>{
        setPassword(event.currentTarget.value)
    }
    const onConfirmPasswordHandler=(event)=>{
        setConfirmPassword(event.currentTarget.value)
    }
    const onSubmitHandler=(event)=>{
        //회원가입 버튼 클릭 시 페이지가 새로고침 되는 것을 막아줌
        event.preventDefault();

        if(Password!=ConfirmPassword){
            return alert('비밀번호와 비밀번호 확인이 같아야 합니다.')
        }

        let body={
            email:Email,
            name:Name,
            password:Password
        }

        //redux action 작업
        dispatch(registerUser(body))
            .then(response=>{
                if(response.payload.success){
                    props.history.push('/login')
                }else{
                    alert("Failed to sign up")
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

                <label>Name</label>
                <input type="text" value={Name} onChange={onNameHandler}/>

                <label>Password</label>
                <input type="password" value={Password} onChange={onPasswordHandler}/>

                <label>Coonfirm Password</label>
                <input type="password" value={ConfirmPassword} onChange={onConfirmPasswordHandler}/>
            
                <br/>
                <button type="submit">
                    회원가입
                </button>
            </form>
        </div>
    )
}

export default withRouter(RegisterPage)
