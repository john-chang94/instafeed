import { useState, useEffect, useContext } from 'react';
import UserContext from '../context/user';
import { getUserByUserId, getImages } from '../services/firebase';

export default function useImages() {
    const [images, setImages] = useState(null);
    const { user } = useContext(UserContext);

    useEffect(() => {
        async function getTimelineImages() {
            // Destructure user following from array
            const [{ following }] = await getUserByUserId(user.uid);
            let followedUserImages = [];

            if (following.length) {
                followedUserImages = await getImages(user.uid, following);
            }
            
            followedUserImages.sort((a, b) => b.createdAt - a.createdAt);
            setImages(followedUserImages);
        }

        getTimelineImages();
    }, [user])

    return { images };
}