import { connect } from 'inferno-redux';
import { pipe, toPairs, map } from 'ramda';
import { ACTION_CREATORS } from './state_store';


const Records = ({ records, searchQuery, onSearchQueryChange }) => {
  return (
    <div className={"App"}>
      <input placeholder="search record by key" value={searchQuery} onInput={e => onSearchQueryChange(e.target.value)} />
      {records
        .map(record => <div key={record.key}>{record.key}:{record.value}</div>)
        .filter(record => record.key.includes(searchQuery))}
    </div>
  )
};

export default connect(
  state => ({
    records: pipe(toPairs, map(pair => ({key: pair[0], value: pair[1]})))(state.records),
    searchQuery: state.searchQuery
  }),
  dispatch => ({
    onSearchQueryChange: query => dispatch(ACTION_CREATORS.searchQueryChange(query))
  })
)(Records);
