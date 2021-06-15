import { firebase, FieldValue } from '../lib/firebase';

export async function doesUsernameExist(username) {
    const result = await firebase
        .firestore()
        .collection('users')
        .where('username', '==', username)
        .get();

    return result.docs.length > 0;
}

export async function getUserByUsername(username) {
    const result = await firebase
        .firestore()
        .collection('users')
        .where('username', '==', username)
        .get();

    return result.docs.map((item) => ({
        ...item.data(),
        docId: item.id
    }))
}

// Get user from firestore with userId passed from auth
export async function getUserByUserId(userId) {
    const res = await firebase
        .firestore()
        .collection('users')
        .where('userId', '==', userId)
        .get();

    const user = res.docs.map((item) => ({
        ...item.data(),
        docId: item.id // Not required, but may be useful
    }))

    return user;
}

export async function getSuggestedProfiles(userId, following) {
    const res = await firebase
        .firestore()
        .collection('users')
        .limit(5)
        .get();

    return res.docs
        // Get users
        .map((user) => ({ ...user.data(), docId: user.id }))
        // Filter out self and any users that are already being followed
        .filter((profile) => profile.userId !== userId && !following.includes(profile.userId))
}

export async function updateSignedInUserFollowing(signedInUserDocId, profileId, isFollowingProfile) {
    firebase
        .firestore()
        .collection('users')
        .doc(signedInUserDocId)
        .update({
            // This acts as a toggle when the signed in user (un)follows a suggested profile
            following: isFollowingProfile
                ? FieldValue.arrayRemove(profileId)
                : FieldValue.arrayUnion(profileId)
        })
}

export async function updateFollowedUserFollowers(profileDocId, signedInUserId, isFollowingProfile) {
    firebase
        .firestore()
        .collection('users')
        .doc(profileDocId)
        .update({
            // This acts as a toggle when the signed in user (un)follows a suggested profile
            followers: isFollowingProfile
                ? FieldValue.arrayRemove(signedInUserId)
                : FieldValue.arrayUnion(signedInUserId)
        })
}

export async function getImages(userId, following) {
    const res = await firebase
        .firestore()
        .collection('photos')
        .where('userId', 'in', following)
        .get();

    const userFollowedImages = res.docs.map((image) => ({
        ...image.data(),
        docId: image.id
    }))

    const imagesWithUserDetails = await Promise.all(
        userFollowedImages.map(async (image) => {
            let userLikedImage = false;
            // Check if user liked the image
            if (image.likes.includes(userId)) {
                userLikedImage = true;
            }
            const user = await getUserByUserId(image.userId);
            const { username } = user[0]; // Firebase returns an array so get first item

            return { username, ...image, userLikedImage };
        })
    )

    return imagesWithUserDetails;
}

export async function getUserImagesByUserId(userId) {
    const result = await firebase
        .firestore()
        .collection('photos')
        .where('userId', '==', userId) // Not uid because user obj does not come from auth
        .get();

        return result.docs.map((item) => ({
            ...item.data(),
            docId: item.id
        }))
}