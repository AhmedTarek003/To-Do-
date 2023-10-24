import "./home.css";
import Header from "../../components/Header/Header";
import TasksList from "../../components/TasksList/TasksList";
import Add from "../../components/Add/Add";
import { useState } from "react";
import AddTask from "../AddTask/AddTask";

const Home = () => {
  const [add, setAdd] = useState(false);
  return (
    <section className="home-page">
      <Header />
      <TasksList />
      <Add add={add} setAdd={setAdd} />
      {add && <AddTask setAdd={setAdd} />}
    </section>
  );
};

export default Home;
