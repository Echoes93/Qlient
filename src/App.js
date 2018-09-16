import { BrowserRouter, Route, Switch, Link } from 'inferno-router';
import Records from './RecordsPage';
import EditRecord from './EditRecordPage';

import './App.css'

const App = () => (
  <BrowserRouter>
    <div>
      <ul>
        <li><Link to="/">Records</Link></li>
        <li><Link to="/edit_record">Edit Record</Link></li>
      </ul>
      <hr />
      <Switch>
        <Route exact path="/" component={Records} />
        <Route path="/edit_record" component={EditRecord} />
      </Switch>
    </div>
  </BrowserRouter>
);

export default App;
