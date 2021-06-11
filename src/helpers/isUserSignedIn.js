import { Route, Redirect } from 'react-router-dom';
import * as ROUTES from '../constants/routes';

export default function IsUserSignedIn({ user, children, ...rest }) {
    return (
        <Route {...rest} render={({ location }) => {
            if (!user) {
                return children;
            }
            if (user) {
                return (
                    <Redirect to={{
                        pathname: ROUTES.DASHBOARD,
                        state: { from: location }
                    }}
                    />
                )
            }
            return null;
        }}
        />
    )
}