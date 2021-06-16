import { useReducer, useEffect } from 'react';
import { getUserImagesByUserId } from '../../services/firebase';
import Header from './header';
import Images from './images';

export default function UserProfile({ user }) {
    // Use reducer to consolidate user and images instead of having separate state
    // Also follower count can be updated live if someone follows another user
    const reducer = (state, newState) => ({ ...state, ...newState });
    const initialState = {
        profile: {},
        imageCollection: [],
        followerCount: 0
    }

    const [{ profile, imageCollection, followerCount }, dispatch] = useReducer(
        reducer,
        initialState
    );
    useReducer(reducer, initialState);

    useEffect(() => {
        async function getUserProfileAndImages() {
            const images = await getUserImagesByUserId(user.userId);
            dispatch({
                profile: user,
                imageCollection: images,
                followerCount: user.followers.length
            })
        }

        getUserProfileAndImages();
    }, [user.username])

    return (
        <div>
            <Header
                imageCount={imageCollection ? imageCollection.length : 0}
                profile={profile}
                followerCount={followerCount}
                setFollowerCount={dispatch}
            />
            <Images images={imageCollection} />
        </div>
    )
}