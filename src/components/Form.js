import { useState } from 'react'
import { addTodoItems } from '../redux/todos/todoSlice'
import { useDispatch, useSelector } from 'react-redux'
import ReactLoading from 'react-loading'



const Form = () => {
    const dispatch = useDispatch()
    const isLoading = useSelector((state) => state.todo.addItemIsLoading)
    const [title, setTitle] = useState('')
    const handleSubmit = (e) => {
        if (!title) return;
        e.preventDefault()
        dispatch(addTodoItems({ title }))
        setTitle("")
    }
    return (
        <form onSubmit={handleSubmit}>
            <input

                disabled={isLoading}
                className="new-todo"
                placeholder="What needs to be done?"
                autoFocus
                onChange={(e) => setTitle(e.target.value)}
                value={title} />
            {isLoading && <div style={{ position: "absolute", left: 470, top: 17 }}> <ReactLoading
                type={"spinningBubbles"}
                color={"#000"}
                height={25}
                width={25}

            /></div>}

        </form>
    )
}

export default Form