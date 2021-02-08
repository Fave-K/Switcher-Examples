import {combineReducers} from 'redux'

import contentReducer from './reducers'

const rootReducer = combineReducers({
    content: contentReducer
})

export default rootReducer