import { useState } from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import AddComment from './addComment';

export default function Comments({ docId, comments: allComments, createdAt, commentInput }) {
    const [comments, setComments] = useState(allComments);

    return (
        <>
            <div className="p-4 pt-1 pb-4">
                {
                    comments.length >= 2 && (
                        <p className="text-sm text-gray-base mb-1 cursor-pointer">
                            View all {comments.length} comments
                        </p>
                    )
                }
                {
                    comments.slice(0, 3).map((item, index) => (
                        <p key={index} className="mb-1">
                            <Link to={`/p/${item.displayName}`}>
                                <span className="mr-1 font-bold">{item.displayName}</span>
                            </Link>
                            <span>{item.comment}</span>
                        </p>
                    ))
                }
                <p className="text-gray-base uppercase text-xs mt-2">{moment(createdAt).fromNow()}</p>
            </div>
            <AddComment
                docId={docId}
                comments={comments}
                setComments={setComments}
                commentInput={commentInput}
            />
        </>
    )
}