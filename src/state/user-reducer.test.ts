import { userReducer } from './user-reducer';

test('user reducer should be increment only age', () => {
	const startState = { age: 16, victimCount: 0, name: 'Tom Riddle' };
	const newState = userReducer(startState, { type: 'INCREMENT-AGE' });
	expect(newState.age).toBe(17);
	expect(newState.name).toBe('Tom Riddle');
	expect(newState.victimCount).toBe(0);
});

test('user reduser should be increment only victimCount', () => {
	const startState = { age: 16, victimCount: 0, name: 'Tom Riddle' };
	const newState = userReducer(startState, { type: 'INCREMENT-CHILDREN-COUNT' });
	expect(newState.age).toBe(16);
	expect(newState.victimCount).toBe(1);
	expect(newState.name).toBe('Tom Riddle');
});

test('user reducer should change only user"s name', () => {
	const startState = { age: 16, victimCount: 0, name: 'Tom Riddle' };
	const newState = userReducer(startState, { type: 'CHANGE-NAME', name: 'Lord Voldemort' });

	expect(newState.name).toBe('Lord Voldemort');
	expect(newState.age).toBe(16);
	expect(newState.victimCount).toBe(0);
});
