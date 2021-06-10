import Skeleton from 'react-loading-skeleton';
import usePhotos from '../hooks/usePhotos';
import Post from '../components/post'

export default function Timeline() {
    const { photos } = usePhotos();
    
    return (
        <div className="container col-span-2">
            {
                !photos ? (
                    <Skeleton count={4} width={600} height={450} className="mb-5" />
                ) : photos && photos.length ? (
                    // Render photos if and when they are loaded
                    photos.map((photo) => (
                        <Post key={photo.docId} photo={photo} />
                    ))
                    // Render default text
                ) : <p className="text-center text-2xl">Follow people to see photos!</p>
            }
        </div>
    )
}