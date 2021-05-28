import { useState, useEffect, useContext } from 'react';
import { useHistory } from "react-router";
import { Link } from 'react-router-dom';
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
            <div className="flex w-3/5">
                <img src="/images/iphone-with-profile.jpg" alt="iPhone with Instagram" />
            </div>
            <div className="flex flex-col w-2/5">
                <div className="flex flex-col items-center bg-white p-4 border border-gray-primary mb-4">
                    <h1 className="flex justify-center w-full">
                        <img src="/images/logo.png" alt="Instagram" className="mt-2 w-6/12 mb-4" />
                    </h1>

                    {error && <p className="mb-4 text-xs text-red-primary">{error}</p>}

                    <form onSubmit={handleSignIn}>
                        <input
                            type="text"
                            aria-label="Enter email address"
                            placeholder="Email address"
                            className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
                            onChange={({ target }) => setEmail(target.value)}
                        />
                        <input
                            type="passwod"
                            aria-label="Enter password"
                            placeholder="Password"
                            className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
                            onChange={({ target }) => setPassword(target.value)}
                        />
                        <button
                            disabled={isInvalid}
                            type="submit"
                            className={`bg-blue-500 text-white w-full rounded h-8 font-bold ${isInvalid && 'opacity-50'}`}
                        >
                            Sign In
                    </button>
                    </form>
                </div>
                <div className="flex justify-center items-center flex-col w-full bg-white p-4 border border-gray-primary">
                    <p className="text-sm">New user?
                        <Link to='/register' className="font-bold text-blue-medium"> Register here</Link>
                    </p>
                </div>
            </div>
        </div>
    )
}