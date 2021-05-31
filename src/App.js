import './App.css';
import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import * as ROUTES from './constants/routes';

const SignIn = lazy(() => import('./pages/signIn'));
const Register = lazy(() => import('./pages/register'));

function App() {
  return (
    <div className="App">
      <Router>
        <Suspense fallback={<p>Loading...</p>}>
          <Switch>
            <Route path={ROUTES.SIGN_IN} component={SignIn} />
            <Route path={ROUTES.REGISTER} component={Register} />
          </Switch>
        </Suspense>
      </Router>
    </div>
  );
}

export default App;
