import { useState } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { updateTask } from "../../redux/ApiCalls/tasksApiCall";
import { useParams } from "react-router-dom";

const UpdateTask = ({ setUpdate }) => {
  const { task } = useSelector((state) => state.tasks);

  const [title, setTitle] = useState(task?.title);
  const [desc, setDesc] = useState(task?.desc);
  const dispatch = useDispatch();
  const { id } = useParams();

  // form submit handler
  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (title.trim() === "") return toast.error("title is required");
    dispatch(updateTask(id, { title, desc }));
    setUpdate(false);
  };
  return (
    <div className="add-task">
      <form onSubmit={formSubmitHandler} className="form-add-task">
        <AiOutlineCloseCircle
          className="close-icon"
          onClick={() => setUpdate(false)}
        />
        <h1 className="add-task-title">Edit Task</h1>
        <div className="add-task-group">
          <label className="task-title-label">Title</label>
          <input
            type="text"
            placeholder="Title"
            className="task-title-input"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="add-task-group">
          <label className="task-label">Description</label>
          <textarea
            type="text"
            placeholder="Description"
            className="task-title-input task-textarea"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
        </div>
        <button type="submit" className="add-task-btn">
          Edit Task
        </button>
      </form>
    </div>
  );
};

export default UpdateTask;
