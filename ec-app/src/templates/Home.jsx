import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserId, getSignedIn } from '../reducks/users/selectors';
import { signOut } from '../reducks/users/operations';
import { push } from 'connected-react-router';

const Home = () => {
    const selector = useSelector(state => state);
    const uid = getUserId(selector);
    const isSignedIn = getSignedIn(selector);
    const dispatch = useDispatch();
    return (
        <div>
            <h2>Home</h2>
            <p>{uid}</p>
            <p>{isSignedIn}</p>
            <button onClick={() => dispatch(signOut())}>SIGN OUT</button>
        </div>

    )
}

export default Home