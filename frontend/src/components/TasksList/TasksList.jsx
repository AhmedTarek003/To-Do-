import "./tasksList.css";
import TaskItem from "../TaskItem/TaskItem";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { userTasks } from "../../redux/ApiCalls/tasksApiCall";

const TasksList = () => {
  const { user } = useSelector((state) => state.auth);
  const { tasks } = useSelector((state) => state.tasks);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(userTasks(user?._id));
  }, [dispatch, user]);

  if (tasks.length <= 0) {
    return (
      <div className="empty-tasks">
        <h1 className="empty-tasks-title">Create your first task</h1>
      </div>
    );
  }
  return (
    <div className="tasks-list">
      {tasks?.map((task) => (
        <TaskItem key={task?._id} task={task} />
      ))}
    </div>
  );
};

export default TasksList;
