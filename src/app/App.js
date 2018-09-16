import { Route, Switch, Link, Router } from 'inferno-router';
import Records from './RecordsPage';
import EditRecord from './EditRecordPage';

import createHistory from "history/createBrowserHistory"
import './App.css'

const history = createHistory();


const App = () => (
  <Router history={history}>
    <section className="app">
			<header className="header">
				<h1>Records</h1>
      </header>
      <section className="main">
        <div className="navbar">
          <ul className="navlinks">
            <li>
              <Link to="/">Records</Link>
            </li>
            <li>
              <Link to="/edit_record">New Record</Link>
            </li>
          </ul>
        </div>
        <Switch>
          <Route exact path="/" component={Records} history={history} />
          <Route path="/edit_record" component={EditRecord} />
        </Switch>
        <footer className="footer"></footer>
      </section>
      <footer className="info">
        <p>Double-click to edit a record</p>
      </footer>
    </section>
  </Router>
);

export default App;
