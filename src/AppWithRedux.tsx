import './App.css';
import { Todolist } from './components/todolist/Todolist';
import { AddItemForm } from './components/add-item-form/AddItemForm';
import { TTodolist } from './types/types';
import { addTodolistAC, changeTodolistTitleAC, removeTodolistAC } from './state/todolists-reducer';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { AppRootState } from './state/store';
import { Header } from './components/header/Header';
import { Box, Container } from '@mui/material';
import { useCallback } from 'react';

function AppWithRedux() {
	const dispatch = useDispatch();
	const todolists = useSelector<AppRootState, Array<TTodolist>>(state => state.todolist);

	const addTodoList = useCallback((title: string) => {
		const action = addTodolistAC(title);
		dispatch(action);
	}, []);

	const deleteTodolist = useCallback((todoId: string) => {
		dispatch(removeTodolistAC(todoId));
	}, []);

	const changeTitle = useCallback((todoId: string, title: string) => {
		const action = changeTodolistTitleAC(todoId, title);
		dispatch(action);
	}, []);
	return (
		<div className='App'>
			<Header />
			<Container>
				<Box component='section' display='flex' alignItems='flex-start' flexWrap='wrap' gap={4}>
					<div>
						<h2>Add new todolist</h2>
						<AddItemForm addItem={addTodoList} />
					</div>
					{todolists.map(item => {
						return (
							<Todolist
								key={item.id}
								title={item.title}
								filter={item.filter}
								todoId={item.id}
								deleteTodolist={deleteTodolist}
								changeTitle={changeTitle}
							/>
						);
					})}
				</Box>
			</Container>
		</div>
	);
}

export default AppWithRedux;
