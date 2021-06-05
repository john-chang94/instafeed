import { Link } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';

const User = ({ username, firstName, lastName }) =>
    !username || !firstName || !lastName ? (
        <Skeleton count={1} height={61} />
    ) : (
        <Link to={`/p/${username}`} className="grid grid-cols-4 gap-4 mb-6 items-center">
            <div className="flex items-center justify-between col-span-1">
                <img src={`/images/avatars/${username}.png`} alt="" className="rounded-full w-16 flex mr-3" />
            </div>
            <div className="col-span-3">
                <p className="font-bold text-sm">{username}</p>
                <p className="text-sm">{firstName} {lastName}</p>
            </div>
        </Link>
    )


export default User;

// User.propTypes = {
//     username: PropTypes.string.isRequired,
//     firstName: PropTypes.string.isRequired,
//     lastName: PropTypes.string.isRequired
// }