import React, {useState} from 'react';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import {TextInput, PrimaryButton} from '../components/UIkit';
import { resetPassword} from '../reducks/users/operations';
import { push } from 'connected-react-router';

const Reset = () => {
    const dispatch = useDispatch();

    const [email, setEmail] = useState("")

    const inputEmail = useCallback((event) => {
        setEmail(event.target.value)
    },[setEmail])
    return (
        <div className="c-section-container">
            <h2 className="u-text_headline u=text-center">Reset Password</h2>
            <div className="module-spacer--medium"/>
            <TextInput
            fullWidth={true} label={"email"} multiline={false} required={true}
            rows={1} value={email} type={"email"} onChange={inputEmail}
            />
            <div className='center'>
            <div className="module-spacer--medium"/>
                <PrimaryButton
                    label ={"Reset Password"}
                    onClick= {() => dispatch(resetPassword(email))}
                    />
            </div>
            <p onClick={() => dispatch(push('/signup'))}>アカウント登録</p>

        </div>
    )
}

export default Reset