import { firebase, FieldValue } from '../lib/firebase';

export async function doesUsernameExist(username) {
    const result = await firebase
        .firestore()
        .collection('users')
        .where('username', '==', username)
        .get();

    return result.docs.length > 0;
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