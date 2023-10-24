import { useState } from "react";
import "./addTask.css";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { addTask } from "../../redux/ApiCalls/tasksApiCall";

const AddTask = ({ setAdd }) => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const dispatch = useDispatch();

  // form submit handler
  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (title.trim() === "") return toast.error("title is required");

    if (desc.trim() !== "") {
      dispatch(addTask({ title, desc }));
    } else {
      dispatch(addTask({ title }));
    }
    setAdd(false);
  };
  return (
    <div className="add-task">
      <form onSubmit={formSubmitHandler} className="form-add-task">
        <AiOutlineCloseCircle
          className="close-icon"
          onClick={() => setAdd(false)}
        />
        <h1 className="add-task-title">Add Task</h1>
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
          Add Task
        </button>
      </form>
    </div>
  );
};

export default AddTask;
