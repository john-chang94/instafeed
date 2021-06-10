import { useRef } from 'react';
import Header from './header';
import Image from './image';
import Actions from './actions';
import Footer from './footer';
import Comments from './comments';

export default function Post({ photo }) {
    const commentInput = useRef(null);
    const handleFocus = () => commentInput.current.focus();

    return (
        <div className="rounded col-span-4 border bg-white border-gray-primary mb-12">
            <Header username={photo.username} />
            <Image src={photo.imageUrl} caption={photo.caption} />
            <Actions
                docId={photo.docId}
                totalLikes={photo.likes.length}
                likedPhoto={photo.userLikedPhoto} // Fetched from firebase service getPhotos()
                handleFocus={handleFocus}
            />
            <Footer caption={photo.caption} username={photo.username} />
            <Comments 
                docId={photo.docId}
                comments={photo.comments}
                createdAt={photo.createdAt}
                commentInput={commentInput}
            />
        </div>
    )
}