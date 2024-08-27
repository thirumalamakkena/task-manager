import React,{useState} from 'react';
import DashboardItem from '../DashboardItem';
import './index.css';
import TaskList from '../TaskList';

import { v4 as uuidv4 } from 'uuid';
import AddTaskModal from '../AddTaskModal';
import SuccessModal from '../SuccessModal';

const taskStatuses = [
  {
    id: uuidv4(),
    status: 'Expired Tasks',
    imageUrl: 'https://res.cloudinary.com/dpakgiqtz/image/upload/v1724684390/tp3vor9p6pasmymvuojk.png',
    count: 0, 
  },
  {
    id: uuidv4(),
    status: 'All Active Tasks',
    imageUrl: 'https://res.cloudinary.com/dpakgiqtz/image/upload/v1724732095/tpbz3xs0pcypl8fbscxf.png',
    count: 0,
  },
  {
    id: uuidv4(),
    status: 'Completed Tasks',
    imageUrl: 'https://res.cloudinary.com/dpakgiqtz/image/upload/v1724732095/kcdvfhpsbz15otzhwdvf.png',
    count: 0,
  },
];

const taskListContent = [
  {
    id: uuidv4(),
    color: 'blue',
    taskType: 'To Do',
    count: 0,
  },
  {
    id: uuidv4(),
    color: 'orange',
    taskType: 'On Progress',
    count: 0,
  },
  {
    id: uuidv4(),
    color: 'green',
    taskType: 'Done',
    count: 0,
  },
];

const Home = () => {
  const [showModal, setShowModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const closeSuccessModal = () => {
    setShowSuccessModal(false);
  }

  const openSuccessModal = () => {
    setShowModal(false);
    setShowSuccessModal(true);
  }


  const openModal = (e) =>{
    e.stopPropagation();
    setShowModal(true);
  } 
  const closeModal = () => {
    setShowModal(false);
  }
  return (
    <div className="home-container">
        <div className="task-dashboard">
            <ul className="task-details-list">
              {taskStatuses.map((taskStatus) => (<DashboardItem key={taskStatus.id} taskStatus={taskStatus} />))}
            </ul>
            <button className="add-task-btn" onClick={openModal}>+ Add Task</button>
        </div>
        <div className="task-container">
          {taskListContent.map((taskTypeItem) => (<TaskList key={taskTypeItem.id} taskTypeItem={taskTypeItem} />))}
        </div>
        <AddTaskModal showModal={showModal} closeModal={closeModal} openSuccessModal={openSuccessModal} />
        <SuccessModal
          showSuccessModal={showSuccessModal}
          closeSuccessModal={closeSuccessModal}
        />
    </div>
  );
}   

export default Home;


