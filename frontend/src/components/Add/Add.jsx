import "./add.css";
import { BsPlusLg } from "react-icons/bs";

const Add = ({ add, setAdd }) => {
  return (
    <div className="add" onClick={() => setAdd(!add)}>
      <div className="add-icon">
        <BsPlusLg />
      </div>
    </div>
  );
};

export default Add;
