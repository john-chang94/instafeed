import './App.css';
import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import * as ROUTES from './constants/routes';
import useAuthListener from './hooks/useAuthListener';
import UserContext from './context/user';

const SignIn = lazy(() => import('./pages/signIn'));
const Register = lazy(() => import('./pages/register'));
const Dashboard = lazy(() => import('./pages/dashboard'));
const NotFound = lazy(() => import('./pages/notFound'));

function App() {
  // Fetch signed in user
  const { user } = useAuthListener();
  return (
    // Set user in UserContext
    <UserContext.Provider value={{ user }}>
      <div className="App">
        <Router>
          <Suspense fallback={<p>Loading...</p>}>
            <Switch>
              <Route path={ROUTES.SIGN_IN} component={SignIn} />
              <Route path={ROUTES.REGISTER} component={Register} />
              <Route path={ROUTES.DASHBOARD} component={Dashboard} />
              <Route component={NotFound} />
            </Switch>
          </Suspense>
        </Router>
      </div>
    </UserContext.Provider>
  );
}

export default App;
