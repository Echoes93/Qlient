import { Socket } from 'phoenix';
import { store, ACTION_CREATORS } from './state_store';

const socket = new Socket('ws://localhost:4000/socket', {})
socket.connect()
socket.onError( () => console.log("there was an error with the connection!") )
socket.onClose( () => console.log("the connection dropped") )

const channel = socket.channel('records');
channel.on("new_value", msg => store.dispatch(ACTION_CREATORS.newValue(msg)));
channel.join().receive("ok", records => store.dispatch(ACTION_CREATORS.gotRecords(records)));

export default channel;
