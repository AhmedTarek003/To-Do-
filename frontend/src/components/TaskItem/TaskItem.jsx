import { Link } from "react-router-dom";
import "./taskItem.css";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { taskCompleated } from "../../redux/ApiCalls/tasksApiCall";

const TaskItem = ({ task }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (task.compleated) {
      document.getElementById(`complete ${task?._id}`).classList.add("checked");
    }
  }, [task]);

  const click = (id) => {
    const task = document.getElementById(`complete ${id}`);
    task.classList.toggle("checked");
    if (task.classList.contains("checked")) {
      dispatch(taskCompleated(id, { compleated: true }));
    } else {
      dispatch(taskCompleated(id, { compleated: false }));
    }
  };
  return (
    <div className="task-item">
      <div className="task-box" style={{ opacity: task?.compleated && "0.5" }}>
        <Link to={`/task/${task._id}`} className="go-to-task">
          <div className="task-title">{task?.title}</div>
          <div className="task-desc">{task?.desc}</div>
        </Link>
        <div className="check-box" onClick={() => click(task?._id)}>
          <input
            type="checkbox"
            id={`complete ${task?._id}`}
            className="check-complete "
          />
          <label
            htmlFor={`complete ${task?._id}`}
            className="complete-label"
            onClick={() => click(task?._id)}
          >
            complete
          </label>
        </div>
      </div>
    </div>
  );
};

export default TaskItem;
