import Skeleton from 'react-loading-skeleton';
import useImages from '../hooks/useImages';
import Post from '../components/post'

export default function Timeline() {
    const { images } = useImages();
    
    return (
        <div className="container col-span-2">
            {
                !images ? (
                    <Skeleton count={4} width={600} height={450} className="mb-5" />
                ) : images && images.length ? (
                    // Render images if and when they are loaded
                    images.map((image) => (
                        <Post key={image.docId} image={image} />
                    ))
                    // Render default text
                ) : <p className="text-center text-2xl">Follow people to see images!</p>
            }
        </div>
    )
}