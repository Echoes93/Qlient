import { connect } from 'inferno-redux';
import { ACTION_CREATORS } from '../state_store';

import './RecordsPage.css';

const Records = ({ records, searchQuery, onSearchQueryChange, onRecordDblClick, onRecordDelete, history }) => {
  return (
    <div>
      <input 
        className="search-record"
        placeholder="Search record by specific key" 
        value={searchQuery} 
        onInput={e => onSearchQueryChange(e.target.value)} 
      />
      <ul className="records-list">
        <li>
          <div className="record-item heading-item">
            <span>Key</span>
            <span>Value</span>
          </div>
        </li>
        {records
          .filter(record => record.key.includes(searchQuery))
          .map(record => 
            <li key={record.key}>
              <div className="record-item" onDblClick={_e => {
                onRecordDblClick(record);
                history.push("/edit_record");
              }}>
                <span className="record-key">{record.key}</span>
                <span className="record-value">{record.value}</span>
              </div>
              <button className="destroy" onclick={_e => onRecordDelete(record.key)}></button>
            </li>)
        }
      </ul>
    </div>
  )
};

export default connect(
  state => ({
    records: state.records,
    searchQuery: state.searchQuery
  }),
  dispatch => ({
    onSearchQueryChange: query => dispatch(ACTION_CREATORS.searchQueryChange(query)),
    onRecordDblClick: record => dispatch(ACTION_CREATORS.editRecord(record)),
    onRecordDelete: key => dispatch(ACTION_CREATORS.deleteRecord(key))
  })
)(Records);
