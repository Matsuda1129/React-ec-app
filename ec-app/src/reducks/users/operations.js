import { signInAction, signOutAction, fetchProductsInCartAction, fetchOrdersHistoryAction} from "./actions"
import { push } from "connected-react-router"
import {auth, db, FirebaseTimestamp} from "../../firebase/index"

const usersRef = db.collection('users')

export const addProductToCart = (addedProduct) => {
    return async (dispatch, getState) => {
        const uid = getState().users.uid;
        const cartRef = usersRef.doc(uid).collection('cart').doc();
        addedProduct['cartId'] = cartRef.id;
        await cartRef.set(addedProduct);
        dispatch(push('/cart'))
    }
  }

  export const fetchProductsInCart = (products) => {
    return async (dispatch) => {
        dispatch(fetchProductsInCartAction(products))
    }
}

export const fetchOrdersHistory = () => {
    return async (dispatch, getState) => {
        const uid = getState().users.uid;
        const list = []

        usersRef.doc(uid).collection('orders')
            .orderBy('updated_at', "desc").get()
            .then(snapshots => {
                snapshots.forEach(snapshot => {
                    const data = snapshot.data();
                    list.push(data)
                });
                dispatch(fetchOrdersHistoryAction(list))
            })
    }
}
export const listenAuthState = () => {
    return async (dispatch) => {
        return auth.onAuthStateChanged(user => {
            if (user) {
                usersRef.doc(user.uid).get()
                    .then(snapshot => {
                        const data = snapshot.data()
                        if (!data) {
                            throw new Error('ユーザーデータが存在しません。')
                        }

                        // Update logged in user state
                        dispatch(signInAction({
                            customer_id: (data.customer_id) ? data.customer_id : "",
                            payment_method_id: (data.payment_method_id) ? data.payment_method_id : "",
                            email: data.email,
                            isSignedIn: true,
                            role: data.role,
                            uid: user.uid,
                            username: data.username,
                        }))
                    })
            } else {
                dispatch(push('/signin'))
            }
        })
    }
};

export const signIn = (email, password) => {
    return async (dispatch) => {
        console.log(email,password)
        if (email === "" || password === ""){
            alert(" Please type nesseary data")
            return false
            }
        auth.signInWithEmailAndPassword(email, password)
        .then(result => {
            const user = result.user
            console.log(user)
            if(user) {
                const uid = user.uid
                console.log(uid)

                db.collection('users').doc(uid).get()
                .then(snapshot => {
                    const data = snapshot.data()
                    console.log(data);
                    console.log(data.role);
                    dispatch(signInAction({
                        customer_id: (data.customer_id) ? data.customer_id : "",
                        payment_method_id: (data.payment_method_id) ? data.payment_method_id : "",
                        email: data.email,
                        isSignedIn: true,
                        role: data.role,
                        uid: uid,
                        username: data.username
                    }))
                    dispatch(push('/'))
                })
            }
            })
        }
    }

export const signUp = (username, email, password, confirmPassword) => {
    return async (dispatch) => {
        // Validations
        if (password !== confirmPassword) {
            alert('パスワードが一致しません。もう1度お試しください。')
            return false
        }
        if (password.length < 6) {
            alert('パスワードは6文字以上で入力してください。')
            return false
        }

        return auth.createUserWithEmailAndPassword(email, password)
            .then(result => {
                const user = result.user;
                if (user) {
                    const uid = user.uid;
                    const timestamp = FirebaseTimestamp.now();

                    const userInitialData = {
                        customer_id: "",
                        created_at: timestamp,
                        email: email,
                        role: "customer",
                        payment_method_id: "",
                        uid: uid,
                        updated_at: timestamp,
                        username: username
                    };

                    usersRef.doc(uid).set(userInitialData).then(async () => {
                        // const sendThankYouMail = functions.httpsCallable('sendThankYouMail');
                        // await sendThankYouMail({
                        //     email: email,
                        //     userId: uid,
                        //     username: username,
                        // });
                        dispatch(push('/'))
                    })
                }
            })
    }
}

export const signOut = () => {
    return async (dispatch) => {
        auth.signOut()
        .then(() => {
            dispatch(signOutAction());
            dispatch(push('/signin'))
        })
    }
}

export const resetPassword = (email) => {
    return async (dispatch) => {
        if (email === '') {
            alert(" email is not")
            return false
        } else {
            auth.sendPasswordResetEmail(email)
            .then(() => {
                alert('sended')
                dispatch(push('/signin'))
            }).catch(() => {
                alert('failed')
            })
        }
    }
}