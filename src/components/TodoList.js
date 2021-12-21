import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { destroyTodoItem, toggleTodoItem, filteredItemsTodo, getItems } from '../redux/todos/todoSlice'
import Skeleton from 'react-loading-skeleton'

const TodoList = () => {

    const filtered = useSelector(filteredItemsTodo)
    const isLoading = useSelector((state) => state.todo.isLoading)

    const dispatch = useDispatch()
    const handleDestroy = async (id) => {

        await dispatch(destroyTodoItem(id))

    }

    useEffect(() => {
        dispatch(getItems())
    }, [dispatch])

    const handleToggle = async (id, completed) => {
        await dispatch(toggleTodoItem({ id, data: { completed } }))
    }

    return (
        <ul className="todo-list">
            {isLoading ? < Skeleton count={5} height={25} /> :
                (filtered.map(item =>

                    <li key={item.id} className={item.completed ? "completed" : ""} >

                        <div className="view">
                            <input className="toggle" type="checkbox" checked={item.completed} onChange={() => handleToggle(item.id, !item.completed)} />
                            <label>{item.title}</label>
                            <button className="destroy" onClick={() => handleDestroy(item.id)}></button>
                        </div>
                    </li>))}
        </ul>
    )
}

export default TodoList