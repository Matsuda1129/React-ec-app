import {useSelector} from "react-redux";
import {getSignedIn} from "./reducks/users/selectors";

const Auth = ({children}) => {
    const selector = useSelector((state) => state);

    const isSignedIn = getSignedIn(selector)

    if (!isSignedIn) {
        return <></>
    } else {
        return children
    }
};

export default Auth;