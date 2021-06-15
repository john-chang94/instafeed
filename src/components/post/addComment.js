import { useState, useContext } from 'react';
import FirebaseContext from '../../context/firebase';
import UserContext from '../../context/user';

export default function AddComment({ docId, comments, setComments, commentInput }) {
    const [comment, setComment] = useState('');
    const { firebase, FieldValue } = useContext(FirebaseContext);
    const { user: { displayName } } = useContext(UserContext);

    const handleSubmitComment = (e) => {
        e.preventDefault();

        // Add new comment with display name to array with all previous comments
        // Array sent from Comments component
        setComments([{ displayName, comment }, ...comments])
        setComment('');

        return firebase
            .firestore()
            .collection('photos')
            .doc(docId)
            .update({
                comments: FieldValue.arrayUnion({ displayName, comment })
            })
    }

    return (
        <div className="border-t border-gray-primary">
            <form
                onSubmit={(e) => comment.length >= 1 ? handleSubmitComment : e.preventDefault()}
                className="flex justify-between pl-0 pr-5"
            >
                <input
                    type="text"
                    aria-label="Add a comment"
                    autoComplete="off"
                    className="text-sm text-gray-base w-full mr-3 py-5 px-4"
                    name="addComent"
                    placeholder="Add a comment..."
                    value={comment}
                    onChange={({ target }) => setComment(target.value)}
                    ref={commentInput}
                />
                <button
                    className={`text-sm font-bold text-blue-medium ${!comment && 'opacity-30'}`}
                    disabled={!comment}
                    onClick={handleSubmitComment}
                >
                    Post
                </button>
            </form>
        </div>
    )
}