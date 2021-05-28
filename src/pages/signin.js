import { useState, useEffect, useContext } from 'react';
import { useHistory } from "react-router";
import FirebaseContext from '../context/firebase';

export default function SignIn() {
    const history = useHistory();
    const { firebase } = useContext(FirebaseContext);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [error, setError] = useState('');
    const isInvalid = password === '' || email === '';

    const handleSignIn = () => {

    };

    useEffect(() => {
        document.title = 'Sign in - Instafeed';
    }, [])

    return (
        <div className="container flex mx-auto max-w-screen-md items-center h-screen">
            SIGN IN
        </div>
    )
}