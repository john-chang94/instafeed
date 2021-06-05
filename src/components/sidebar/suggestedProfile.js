import { useState } from 'react';
import { Link } from 'react-router-dom';
import { updateSignedInUserFollowing, updateFollowedUserFollowers } from '../../services/firebase';

export default function SuggestedProfile({ profileDocId, profileUsername, profileId, signedInUserId, signedInUserDocId }) {
    const [followed, setFollowed] = useState(false);

    const handleFollowUser = async () => {
        setFollowed(true);

        // Update signed in user's following array
        await updateSignedInUserFollowing(signedInUserDocId, profileId, false);
        // Update followed user's followers array
        await updateFollowedUserFollowers(profileDocId, signedInUserId, false);
    }

    return !followed ? (
        <div className="flex flex-row items-center align-items justify-between">
            <div className="flex items-center justify-between">
                <img src={`/images/avatars/${profileUsername}.png`} className="rounded-full w-8 flex mr-3" />
                <Link to={`/p/${profileUsername}`}>
                    <p className="font-bold text-sm">{profileUsername}</p>
                </Link>
            </div>
            <button className="text-xs font-bold text-blue-medium" onClick={handleFollowUser}>Follow</button>
        </div>
    ) : null
}