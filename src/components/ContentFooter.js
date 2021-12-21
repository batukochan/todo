import React from 'react'
import { Button, Card, ButtonGroup } from 'react-bootstrap';
import { useDispatch ,useSelector } from 'react-redux';
import { changeActiveFilter, completedDestroy,selectItemsTodos } from '../redux/todos/todoSlice'
const ContentFooter = () => {
	let filtered=[]
	const dispatch = useDispatch();
	const listItems = useSelector(selectItemsTodos)
	filtered = listItems.filter(item => !item.completed ).length

	return (
		<Card.Footer className="bg-white">

			<ButtonGroup aria-label="Basic example" size="sm" className="m-1 align-items-center">

				<span className="todo-count me-2">{filtered} left</span>

				<Button type="button" variant="outline-primary" onClick={() => dispatch(changeActiveFilter('All'))}>All</Button>
				<Button type="button" variant="outline-secondary" onClick={() => dispatch(changeActiveFilter('Active'))} >Active</Button>
				<Button type="button" variant="outline-success" onClick={() => dispatch(changeActiveFilter('Completed'))}>Completed</Button>
				<Button type="button" className="ms-2" variant="outline-danger" onClick={() => dispatch(completedDestroy())}> Clear Completed</Button>
		
			</ButtonGroup>

		</Card.Footer>
	)
}

export default ContentFooter
