import { useState, useEffect } from 'react';
import Skeleton from 'react-loading-skeleton';
import useUser from '../../hooks/useUser';
import { isUserFollowingProfile, toggleFollow } from '../../services/firebase';

export default function Header({
    imageCount,
    followerCount,
    setFollowerCount,
    profile: { // Destructure profile obj
        docId: profileDocId,
        userId: profileUserId,
        username: profileUsername,
        firstName,
        lastName,
        following,
        followers
    }
}) {
    const { user } = useUser();
    const [isFollowingProfile, setIsFollowingProfile] = useState(false);
    const activeBtnFollow = user.username && user.username !== profileUsername; // Signed in user cannot see button at all

    const handleToggleFollow = async () => {
        setIsFollowingProfile((isFollowingProfile) => !isFollowingProfile); // Set to opposite boolean
        // setFollowerCount dispatch sent from props
        setFollowerCount({
            followerCount: isFollowingProfile ? followerCount - 1 : followerCount + 1
        })

        await toggleFollow(isFollowingProfile, user.docId, profileDocId, profileUserId, user.userId);
    }

    useEffect(() => {
        const isSignedInUserFollowingProfile = async () => {
            const isFollowing = await isUserFollowingProfile(user.username, profileUserId);
            setIsFollowingProfile(!!isFollowing); // !! == truthy/falsey
        }

        if (user?.username && profileUserId) {
            isSignedInUserFollowingProfile();
        }

    }, [user?.username, profileUserId])

    return (
        <div className="grid grid-cols-3 gap-4 justify-between mx-auto max-w-scren-lg">
            <div className="container flex justify-center">
                {
                    profileUsername &&
                    <img src={`/images/avatars/${profileUsername}.png`} alt={`${profileUsername} profile picture`} className="rounded-full h-40 w-40 flex" />
                }
            </div>
            <div className="flex items-center justify-center flex-col sol-span-2">
                <div className="container flex items-center">
                    <p className="text-2xl mr-4">{profileUsername}</p>
                    {
                        activeBtnFollow &&
                        <button
                            className="bg-blue-medium font-bold text-sm rounded text-white w-20 h-8"
                            onClick={handleToggleFollow}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    handleToggleFollow();
                                }
                            }}
                        >
                            {isFollowingProfile ? 'Unfollow' : 'Follow'}
                        </button>
                    }
                </div>
                <div className="container flex mt-4">
                    {
                        !followers || !following ? (
                            <Skeleton count={1} width={677} height={24} />
                        ) : (
                            <>
                                <p className="mr-10">
                                    <span className="font-bold">{imageCount}</span> photos
                                </p>
                                <p className="mr-10">
                                    <span className="font-bold">{followerCount}</span>
                                    {` `}
                                    {followerCount === 1 ? `follower` : `followers`}
                                </p>
                                <p className="mr-10">
                                    <span className="font-bold">{following?.length}</span> following
                                </p>
                            </>
                        )
                    }
                </div>
                <div className="container mt-4">
                    <p className="font-medium">
                        {!firstName || !lastName ? <Skeleton count={1} height={24} /> : `${firstName} ${lastName}`}
                    </p>
                </div>
            </div>
        </div>
    )
}