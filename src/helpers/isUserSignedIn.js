import { Route, Redirect } from 'react-router-dom';

export default function IsUserSignedIn({ user, signedInPath, children, ...rest }) {
    return (
        <Route {...rest} render={({ location }) => {
            if (!user) {
                return children;
            }
            if (user) {
                return (
                    <Redirect to={{
                        pathname: signedInPath,
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