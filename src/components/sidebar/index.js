import useUser from '../../hooks/useUser';
import User from './user';
import Suggestions from './suggestions';

export default function Sidebar() {
    const { user } = useUser();
    return (
        <div className="p-4">
            <User username={user.username} firstName={user.firstName} lastName={user.lastName} />
            <Suggestions userId={user.userId} />
        </div>
    )
}