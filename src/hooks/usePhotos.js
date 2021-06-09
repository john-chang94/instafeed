import { useState, useEffect, useContext } from 'react';
import UserContext from '../context/user';
import { getUserByUserId, getPhotos } from '../services/firebase';

export default function usePhotos() {
    const [photos, setPhotos] = useState(null);
    const { user } = useContext(UserContext);

    useEffect(() => {
        async function getTimelinePhotos() {
            // Destructure user following from array
            const [{ following }] = await getUserByUserId(user.uid);
            let followedUserPhotos = [];

            if (following.length) {
                followedUserPhotos = await getPhotos(user.uid, following);
            }
            
            // Sort photos by newest first
            followedUserPhotos.sort((a, b) => b.createdAt - a.createdAt);
            setPhotos(followedUserPhotos);
        }

        getTimelinePhotos();
    }, [user])

    return { photos };
}