import { useParams, useHistory } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getUserByUsername } from '../services/firebase';
import * as ROUTES from '../constants/routes';
import Header from '../components/header';
import UserProfile from '../components/profile';

export default function Profile() {
    const { username } = useParams();
    const [user, setUser] = useState(null);
    const history = useHistory();

    useEffect(() => {
        async function checkUserExists() {
            const user = await getUserByUsername(username);
            if (user.length) {
                // Set user in state if exists
                setUser(user[0]);
            } else {
                // Redirect to not found page if user does not exist
                history.push(ROUTES.NOT_FOUND);
            }
        }

        checkUserExists();
    }, [username, history])

    // Init user is null but checks again after useEffect runs
    return user?.username ? (
        <div className="bg-gray-background">
            <Header />
            <div className="mx-auto max-w-screen-lg">
                <UserProfile user={user} />
            </div>
        </div>
    ) : null
}