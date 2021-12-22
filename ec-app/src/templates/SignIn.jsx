import { push } from 'connected-react-router';
import React, {useState} from 'react';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import {TextInput, PrimaryButton} from '../components/UIkit';
import { signIn } from '../reducks/users/operations';

const SignIn = () => {
    const dispatch = useDispatch();

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const inputEmail = useCallback((event) => {
        setEmail(event.target.value)
    },[setEmail])
    const inputPassword = useCallback((event) => {
        setPassword(event.target.value)
    },[setPassword])
    return (
        <div className="c-section-container">
            <h2 className="u-text_headline u=text-center">Sign In</h2>
            <div className="module-spacer--medium"/>
            <TextInput
            fullWidth={true} label={"email"} multiline={false} required={true}
            rows={1} value={email} type={"email"} onChange={inputEmail}
            />
            <TextInput
            fullWidth={true} label={"password"} multiline={false} required={true}
            rows={1} value={password} type={"password"} onChange={inputPassword}
            />
            <div className='center'>
            <div className="module-spacer--medium"/>
                <PrimaryButton
                    label ={"Sign In"}
                    onClick= {() => dispatch(signIn(email, password))}
                    />
            </div>
            <p onClick={() => dispatch(push('/signup'))}>アカウント登録</p>
            <p onClick={() => dispatch(push('/signin/reset'))}> パスワードを忘れたら</p>
        </div>
    )
}

export default SignIn