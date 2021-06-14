import { useReducer, useEffect } from 'react';
import { getUserByUsername } from '../../services/firebase';
import Header from './header';

export default function UserProfile({ username }) {
    const reducer = (state, newState) => ({ ...state, ...newState });
    const initialState = {
        profile: {},
        imageCollection: [],
        followerCount: 0
    }

    const [{ profile, imageCollection, followerCount }, dispatch] = useReducer(reducer, initialState);
    useReducer(reducer, initialState);

    useEffect(() => {
        async function getUserProfileAndImages() {
            const [{ ... user }] = await getUserByUsername(username);
            const images = getUserImagesByUsername(username);
        }
    }, [])
    return (
        <div>

        </div>
    )
}