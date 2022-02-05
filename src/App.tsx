import { useState } from "react";
import { NavBar, TaskForm, BasicModal, TaskList } from "./components";

export default function App() {
  const [showModal, setShowModal] = useState(false);

  const openCloseModal = () => setShowModal(!showModal);

  return (
    <div>
      <NavBar openCloseModal={openCloseModal} />

      <TaskList />

      <BasicModal
        show={showModal}
        close={openCloseModal}
        title="Nueva tarea"
        children={<TaskForm close={openCloseModal} />}
      />
    </div>
  );
}
