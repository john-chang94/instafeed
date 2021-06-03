import { useState, useEffect, useContext } from 'react';
import UserContext from '../context/user';
import { getUserByUserId } from '../services/firebase';

export default function useUser() {
    const [activeUser, setActiveUser] = useState({});
    const { user } = useContext(UserContext);

    useEffect(() => {
        async function getUserObjByUserId() {
            // Destructure res because we don't need the extra array in our response
            const [res] = await getUserByUserId(user.uid);
            setActiveUser(res);
        }
        if (user.uid) {
            getUserObjByUserId();
        }
    }, [user])

    return { user: activeUser };
}