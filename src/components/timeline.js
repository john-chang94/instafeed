import Skeleton from 'react-loading-skeleton';
import usePhotos from '../hooks/usePhotos';

export default function Timeline() {
    const { photos } = usePhotos();
    console.log(photos)
    return (
        <div className="container col-span-2">
            timeline
        </div>
    )
}