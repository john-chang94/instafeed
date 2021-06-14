import { useRef } from 'react';
import Header from './header';
import Image from './image';
import Actions from './actions';
import Footer from './footer';
import Comments from './comments';

export default function Post({ image }) {
    const commentInput = useRef(null);
    const handleFocus = () => commentInput.current.focus();

    return (
        <div className="rounded col-span-4 border bg-white border-gray-primary mb-12">
            <Header username={image.username} />
            <Image src={image.imageUrl} caption={image.caption} />
            <Actions
                docId={image.docId}
                totalLikes={image.likes.length}
                likedImage={image.userLikedImage} // Fetched from firebase service getImages()
                handleFocus={handleFocus}
            />
            <Footer caption={image.caption} username={image.username} />
            <Comments 
                docId={image.docId}
                comments={image.comments}
                createdAt={image.createdAt}
                commentInput={commentInput}
            />
        </div>
    )
}