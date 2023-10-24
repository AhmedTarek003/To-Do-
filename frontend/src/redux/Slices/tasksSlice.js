import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tasks: [],
  task: null,
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    tasksOfUser(state, action) {
      state.tasks = action.payload;
    },
    addTask(state, action) {
      state.tasks.unshift(action.payload);
    },
    getTask(state, action) {
      state.task = action.payload;
    },
    deleteTask(state, action) {
      state.tasks = state.tasks.filter((t) => t._id !== action.payload);
    },
  },
});

const tasksActions = tasksSlice.actions;
const tasksReducer = tasksSlice.reducer;

export { tasksActions, tasksReducer };
