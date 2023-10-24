import { Link, useNavigate, useParams } from "react-router-dom";
import "./task.css";
import { AiOutlineClose } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";
import { MdDeleteOutline } from "react-icons/md";
import { useEffect, useState } from "react";
import UpdateTask from "../../components/UpdateTask/UpdateTask";
import { useDispatch, useSelector } from "react-redux";
import {
  DeleteTask,
  getTask,
  taskCompleated,
} from "../../redux/ApiCalls/tasksApiCall";
import { tasksActions } from "../../redux/Slices/tasksSlice";

const Task = () => {
  const [update, setUpdate] = useState(false);
  const { id } = useParams();
  const { task } = useSelector((state) => state.tasks);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getTask(id));
  }, [dispatch, id]);

  // check if task is complete
  useEffect(() => {
    if (task?.compleated) {
      document.getElementById(`complete${id}`).classList.add("checked");
    }
  }, [id, task]);

  // Complete task or not
  const click = () => {
    const task = document.getElementById(`complete ${id}`);
    const task2 = document.getElementById(`complete${id}`);
    task.classList.toggle("checked");
    task2.classList.toggle("checked");

    if (task2.classList.contains("checked")) {
      dispatch(taskCompleated(id, { compleated: true }));
    } else {
      dispatch(taskCompleated(id, { compleated: false }));
    }
  };

  // Const Delete Handler
  const deleteHandler = () => {
    dispatch(tasksActions.deleteTask(id));
    dispatch(DeleteTask(id));
    navigate("/");
  };
  return (
    <section className="single-task">
      <div className="sigle-task-container">
        <Link to={"/"} className="backHome-icon">
          <AiOutlineClose />
        </Link>
        <div className="task-content">
          <div className="task-info">
            <div className="task-name">
              Title : <span>{task?.title}</span>
            </div>
            <div className="task-description">
              Description : <span>{task?.desc}</span>
            </div>
          </div>
          <div className="task-actions">
            <FiEdit
              style={{ color: "green" }}
              className="task-action-icon"
              onClick={() => setUpdate(!update)}
            />
            <MdDeleteOutline
              style={{ color: "red" }}
              className="task-action-icon"
              onClick={deleteHandler}
            />
          </div>
        </div>
        <div
          className="check-box"
          style={{ marginTop: "40px" }}
          onClick={click}
        >
          <input
            type="checkbox"
            id={`complete${id}`}
            className="check-complete"
          />
          <label htmlFor={`complete`} className="complete-label">
            complete
          </label>
        </div>
      </div>
      {update && <UpdateTask setUpdate={setUpdate} />}
    </section>
  );
};

export default Task;
