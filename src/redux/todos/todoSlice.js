import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from 'react-toastify';
import axios from 'axios'
export const getItems = createAsyncThunk("todos/getItems", async () => {
    return await axios("http://localhost:7000/todos")
        .then(res => res.data)
})
export const addTodoItems = createAsyncThunk("todos/addTodoItems", async (title) => {
    return await axios.post("http://localhost:7000/todos", title)
        .then(res => res.data)
})

export const toggleTodoItem = createAsyncThunk("todos/toggleTodoItem", async ({ id, data }) => {
    return await axios.patch(`http://localhost:7000/todos/${id}`, data)
        .then(res => res.data)
})
export const destroyTodoItem = createAsyncThunk("todos/destroyTodoItem", async (id ) => {
    return await axios.delete(`http://localhost:7000/todos/${id}`)
        .then(res => res.data)
})

const todoSlice = createSlice({
    name: 'todo',
    initialState: {
        items: [
        ],
        activeFilter: 'All',
        isLoading: false,
        error: null,

        addItemIsLoading: false,
        addItemError: null,

    },
    reducers: {

        changeActiveFilter: (state, action) => {
            state.activeFilter = action.payload
        },
        completedDestroy: (state, action) => {
            const filtered = state.items.filter(item => item.completed !== true)
            state.items = filtered
        }
    },
    extraReducers: {
        [getItems.pending]: (state, action) => {
            state.isLoading = true
        },
        [getItems.fulfilled]: (state, action) => {
            state.items = action.payload
            state.isLoading = false
        },
        [getItems.rejected]: (state, action) => {
            state.isLoading = false
            state.error = action.error.message
            toast.error(state.error);
        },
        [addTodoItems.pending]: (state, action) => {
            state.addItemIsLoading = true
        },
        [addTodoItems.fulfilled]: (state, action) => {
            console.log("addTodo",action.payload)
            state.items.push(action.payload)
            state.addItemIsLoading = false
        },
        [addTodoItems.rejected]: (state, action) => {
            state.addItemIsLoading = false
            toast.error(action.error.message)
        },

        [toggleTodoItem.fulfilled]: (state, action) => {

            console.log("toggle", action.payload)
            const { id, completed } = action.payload
            console.log(id)
            const index = state.items.findIndex((item) => item.id === id)
            state.items[index].completed = completed

        },
        [destroyTodoItem.fulfilled]: (state, action) => {
            console.log("destroy",action.payload)
            state.items = action.payload
        },
    }
})

export const selectItemsTodos = (state) => state.todo.items
export const filteredItemsTodo = (state) => {
    if (state.todo.activeFilter === "All") {
        return state.todo.items
    }
    return state.todo.items.filter(item => state.todo.activeFilter === "Active" ? !item.completed : item.completed)
}
export const { changeActiveFilter, completedDestroy } = todoSlice.actions;
export default todoSlice.reducer;