import { toast } from "react-toastify";
import request from "../../utils/reques";
import { tasksActions } from "../Slices/tasksSlice";

// Get Tasks of user
export function userTasks(userId) {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.get(`api/users/${userId}`, {
        headers: {
          Authorization: "Bearer " + getState().auth.user.token,
        },
      });
      dispatch(tasksActions.tasksOfUser(data.tasks));
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.msg);
    }
  };
}
// Get Tasks of user
export function addTask(taskInfo) {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.post(`api/tasks`, taskInfo, {
        headers: {
          Authorization: "Bearer " + getState().auth.user.token,
        },
      });
      dispatch(tasksActions.addTask(data));
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.msg);
    }
  };
}
// Get Task
export function getTask(taskId) {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.get(`api/tasks/${taskId}`, {
        headers: {
          Authorization: "Bearer " + getState().auth.user.token,
        },
      });
      dispatch(tasksActions.getTask(data));
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.msg);
    }
  };
}
// update Task
export function updateTask(taskId, taskInfo) {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.put(`api/tasks/${taskId}`, taskInfo, {
        headers: {
          Authorization: "Bearer " + getState().auth.user.token,
        },
      });
      dispatch(tasksActions.getTask(data.updatedTask));
      dispatch(tasksActions.tasksOfUser(data.user.tasks));
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.msg);
    }
  };
}
// Check Task Compleated
export function taskCompleated(taskId, taskInfo) {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.put(`api/tasks/${taskId}`, taskInfo, {
        headers: {
          Authorization: "Bearer " + getState().auth.user.token,
        },
      });
      dispatch(tasksActions.getTask(data.updatedTask));
      dispatch(tasksActions.tasksOfUser(data.user.tasks));
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.msg);
    }
  };
}
// Delete Task
export function DeleteTask(taskId) {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.delete(`api/tasks/${taskId}`, {
        headers: {
          Authorization: "Bearer " + getState().auth.user.token,
        },
      });
      toast.success(data.msg);
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.msg);
    }
  };
}
