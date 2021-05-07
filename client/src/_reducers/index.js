//여러개의 Reducer를 combineReducers를 이용해서 하나로 합쳐줌
import { combineReducers } from 'redux';
import user from './user_reducer';

const rootReducer = combineReducers({
    user,
});

export default rootReducer;