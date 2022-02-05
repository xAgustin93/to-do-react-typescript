import { useState, useEffect } from "react";
import { Container, Row, Col, Accordion } from "react-bootstrap";
import { map, size } from "lodash";
import { TaskItem, BasicModal, TaskForm } from "..";
import { Task } from "../../api";
import { ITask } from "../../models";
import "./TaskList.scss";

const task = new Task();

export function TaskList() {
  const items = task.obtain();
  const [tasks, setTaks] = useState(items);
  const [showModal, setShowModal] = useState(false);
  const [modalInfo, setModalInfo] = useState<any>({});
  const [reload, setReload] = useState(false);

  useEffect(() => setTaks(items), [reload]);

  if (size(tasks) < size(items)) setTaks(items);

  const openCloseModal = () => setShowModal(!showModal);
  const onReloadTask = () => setReload(!reload);

  const moreInfo = (task: ITask) => {
    setModalInfo({ title: task.title, children: task.description });
    openCloseModal();
  };

  const onDeleteTask = (id: string) => {
    const response = task.delete(id);
    setTaks(response);
  };

  const onUpdateTask = (task: ITask) => {
    setModalInfo({
      title: `Editar: ${task.title}`,
      children: (
        <TaskForm
          close={() => {
            onReloadTask();
            setShowModal(false);
          }}
          task={task}
        />
      ),
    });
    openCloseModal();
  };

  const onCompletedTask = (data: ITask) => {
    const newData = data;
    newData.completed = !data.completed;
    task.update(newData);
    onReloadTask();
  };

  const renderTasks = (completed: boolean) => {
    return map(tasks, (task) => {
      if (task.completed === completed) {
        return (
          <Col xs={6} md={4} lg={3} key={task.id}>
            <TaskItem
              task={task}
              openInfo={moreInfo}
              onDeleteTask={onDeleteTask}
              onUpdateTask={onUpdateTask}
              onCompletedTask={onCompletedTask}
            />
          </Col>
        );
      }
    });
  };

  return (
    <>
      <Container>
        <Row>
          {renderTasks(false)}
          <Accordion defaultActiveKey="0" className="tasks-completed">
            <Accordion.Item eventKey="0">
              <Accordion.Header>Tareas completadas</Accordion.Header>
              <Accordion.Body>
                <Row>{renderTasks(true)}</Row>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Row>
      </Container>

      <BasicModal
        show={showModal}
        close={openCloseModal}
        title={modalInfo?.title || ""}
        children={modalInfo.children}
      />
    </>
  );
}
