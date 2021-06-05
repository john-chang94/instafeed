import { useState, useEffect } from 'react';
import Skeleton from 'react-loading-skeleton';
import { getSuggestedProfiles } from '../../services/firebase';
import SuggestedProfile from './suggestedProfile';

export default function Suggestions({ signedInUserId, following, signedInUserDocId }) {
    const [profiles, setProfiles] = useState(null);

    useEffect(() => {
        async function suggestedProfiles() {
            const res = await getSuggestedProfiles(signedInUserId, following);
            setProfiles(res);
        }

        if (signedInUserId) suggestedProfiles();
        
    }, [signedInUserId])

    return !profiles ? (
        <Skeleton count={3} height={150} className="mt-5" />
    ) : profiles.length > 0 ? (
        <div className="rounded flex flex-col">
            <div className="text-sm flex items-center align-items justify between mb-2">
                <p className="font-bold text-gray-base ">Suggestions for you</p>
            </div>
            <div className="mt-4 grid gap-5">
                {
                    profiles.map((profile) => (
                        <SuggestedProfile
                            key={profile.docId}
                            profileDocId={profile.docId}
                            profileUsername={profile.username}
                            profileId={profile.userId} // Reference to follow user (to update following)
                            signedInUserId={signedInUserId} // Signed in user (to update followers)
                            signedInUserDocId={signedInUserDocId} // Need docId to update docs in firebase
                        />
                    ))
                }
            </div>
        </div>
    ) : null
}