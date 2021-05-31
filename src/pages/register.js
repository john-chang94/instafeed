import { useState, useEffect, useContext } from 'react';
import { useHistory } from "react-router";
import { Link } from 'react-router-dom';
import FirebaseContext from '../context/firebase';
import * as ROUTES from '../constants/routes';
import { doesUsernameExist } from '../services/firebase';

export default function Register() {
    const history = useHistory();
    const { firebase } = useContext(FirebaseContext);

    const [username, setUsername] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [error, setError] = useState('');
    const isInvalid = username == '' || firstName == '' || lastName == '' || email == '' || password == '';

    const handleRegister = async (e) => {
        e.preventDefault();
        const usernameExists = await doesUsernameExist(username);

        if (!usernameExists) {
            try {
                // Add user to auth
                const createdUser = await firebase
                    .auth()
                    .createUserWithEmailAndPassword(email, password)

                await createdUser.user.updateProfile({
                    displayName: username
                })

                // Add user to firestore
                await firebase.firestore().collection('users').add({
                    userId: createdUser.user.uid,
                    username: username,
                    firstName,
                    lastName,
                    email,
                    following: [],
                    followers: [],
                    createdAt: Date.now()
                })

                history.push(ROUTES.DASHBOARD);
            } catch (error) {
                setError(error.message);
            }
        } else {
            setError('Username is already taken, please try another.')
        }

        try {

        } catch (error) {

            setError(error.message);
        }
    };

    useEffect(() => {
        document.title = 'Register - Instafeed';
    }, [])

    return (
        <div className="container flex mx-auto max-w-screen-md items-center h-screen">
            <div className="flex w-3/5">
                <img src="/images/iphone-with-profile.jpg" alt="iPhone with Instagram" />
            </div>
            <div className="flex flex-col w-2/5">
                <div className="flex flex-col items-center bg-white p-4 border border-gray-primary mb-4 rounded">
                    <h1 className="flex justify-center w-full">
                        <img src="/images/logo.png" alt="Instagram" className="mt-2 w-6/12 mb-4" />
                    </h1>

                    {error && <p className="mb-4 text-xs text-red-primary">{error}</p>}

                    <form onSubmit={handleRegister}>
                        <input
                            type="text"
                            aria-label="Enter username"
                            placeholder="Username"
                            className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
                            onChange={({ target }) => setUsername(target.value)}
                            value={username}
                        />
                        <input
                            type="text"
                            aria-label="Enter first name"
                            placeholder="First name"
                            className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
                            onChange={({ target }) => setFirstName(target.value)}
                            value={firstName}
                        />
                        <input
                            type="text"
                            aria-label="Enter last name"
                            placeholder="Last name"
                            className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
                            onChange={({ target }) => setLastName(target.value)}
                            value={lastName}
                        />
                        <input
                            type="text"
                            aria-label="Enter email address"
                            placeholder="Email address"
                            className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
                            onChange={({ target }) => setEmail(target.value)}
                            value={email}
                        />
                        <input
                            type="password"
                            aria-label="Enter password"
                            placeholder="Password"
                            className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
                            onChange={({ target }) => setPassword(target.value)}
                            value={password}
                        />
                        <button
                            disabled={isInvalid}
                            type="submit"
                            className={`bg-blue-medium text-white w-full rounded h-8 font-bold ${isInvalid && 'opacity-50'}`}
                        >
                            Register
                        </button>
                    </form>
                </div>
                <div className="flex justify-center items-center flex-col w-full bg-white p-4 rounded border border-gray-primary">
                    <p className="text-sm">Have an account?
                        <Link to={ROUTES.SIGN_IN} className="font-bold text-blue-medium"> Sign in</Link>
                    </p>
                </div>
            </div>
        </div>
    )
}