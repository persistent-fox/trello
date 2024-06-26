import { combineReducers, createStore } from 'redux';
import { todolistReducer } from './todolists-reducer';
import { tasksReducer } from './tasks-reducer/tasks-reducer';

const rootReducer = combineReducers({
	todolists: todolistReducer,
	tasks: tasksReducer,
});

type AppRootState = ReturnType<typeof rootReducer>;

export const store = createStore(rootReducer);

//@ts-ignore
window.store = store;
