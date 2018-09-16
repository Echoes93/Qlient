import { connect } from 'inferno-redux';
import { ACTION_CREATORS } from '../state_store';

import './EditRecordPage.css';


const EditRecord = ({ editRecordKey, editRecordValue, onKeyChange, onValueChange, onEditRecordSubmit }) => (
  <div>
    <div className="row">
      <label for="key-input">Key</label>
      <input 
        id="key-input"
        placeholder="key" 
        value={editRecordKey} 
        onInput={e => onKeyChange(e.target.value)} />
    </div>
    <div className="row">
      <label for="value-input">Value</label>
      <input 
        id="value-input"
        placeholder="value" 
        value={editRecordValue} 
        onInput={e => onValueChange(e.target.value)} />
    </div>
    <div className="submit-row">
      <button onClick={() => {
        if (editRecordKey.length > 0)
          onEditRecordSubmit({key: editRecordKey, value: editRecordValue})
      }}>Submit Record</button>
    </div>
  </div>
);

export default connect(
  state => ({
    editRecordKey: state.editRecord.key,
    editRecordValue: state.editRecord.value
  }),
  dispatch => ({
    onKeyChange: key => dispatch(ACTION_CREATORS.editRecordKeyChange(key)),
    onValueChange: value => dispatch(ACTION_CREATORS.editRecordValueChange(value)),
    onEditRecordSubmit: record => dispatch(ACTION_CREATORS.editRecordSubmit(record))
  })
)(EditRecord);
