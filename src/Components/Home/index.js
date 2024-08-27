import React,{useEffect, useState} from 'react';
import DashboardItem from '../DashboardItem';
import './index.css';
import TaskList from '../TaskList';

import { v4 as uuidv4 } from 'uuid';
import AddTaskModal from '../AddTaskModal';
import SuccessModal from '../SuccessModal';



const initialTaskListContent = [
  {
    id: uuidv4(),
    color: 'blue',
    taskType: 'To Do',
    tasks : [
      {
        id: uuidv4(),
        taskPriority: 'Low',
        title: 'Finish Project Report',
        description: 'Complete the final report for the project.',
        deadline: '10/09/2024',
      },
      {
        id: uuidv4(),
        taskPriority: 'High',
        title: 'Prepare Presentation',
        description: 'Prepare slides for the upcoming client meeting.',
        deadline: '12/09/2024',
      },
    ],
  },
  {
    id: uuidv4(),
    color: 'orange',
    taskType: 'On Progress',
    tasks : [
      {
        id: uuidv4(),
        taskPriority: 'High',
        title: 'Develop New Feature',
        description: 'Implement the new feature in the application.',
        deadline: '15/09/2024',
      },
      {
        id: uuidv4(),
        taskPriority: 'Low',
        title: 'Code Review',
        description: 'Review the code submitted by the team.',
        deadline: '14/09/2024',
      },
    ],
  },
  {
    id: uuidv4(),
    color: 'green',
    taskType: 'Done',
    tasks : [
      {
        id: uuidv4(),
        taskPriority: 'Completed',
        title: 'Fix Bugs',
        description: 'Resolve all issues reported in the last testing phase.',
        deadline: '05/09/2024',
      },
      {
        id: uuidv4(),
        taskPriority: 'Completed',
        title: 'Update Documentation',
        description: 'Update the project documentation with the latest changes.',
        deadline: '06/09/2024',
      },
    ],
  },
];


const initialTaskStatuses = [
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

const Home = () => {
  const [showModal, setShowModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [taskListContent, setTaskListContent] = useState(initialTaskListContent);
  const [taskStatuses, setTaskStatuses] = useState(initialTaskStatuses);
  
  const addTaskToList = (taskDetails) => {
    const newTaskListContent = taskListContent.map((taskCategory) => {
      if (taskCategory.taskType === taskDetails.taskType) {
        return {
          ...taskCategory,
          tasks: [...taskCategory.tasks, taskDetails.task],
        };
      }
      return taskCategory;
    });
    setTaskListContent(newTaskListContent);
  };



  useEffect(() => {
    const calculateTaskCounts = (taskListContent) => {
      let totalTasks = 0;
      let completedTasks = 0;
    
      taskListContent.forEach((taskCategory) => {
        totalTasks += taskCategory.tasks.length;
        completedTasks += taskCategory.tasks.filter(task => task.taskPriority === 'Completed').length;
      });
    
      return { totalTasks, completedTasks };
    };
    
    const { totalTasks, completedTasks } = calculateTaskCounts(taskListContent);
    
    const updatedTaskStatuses = taskStatuses.map((taskStatus) => {
      if (taskStatus.status === 'Expired Tasks') {
        return { ...taskStatus, count: 0 };
      }
      if (taskStatus.status === 'All Active Tasks') {
        return { ...taskStatus, count: totalTasks };
      }
      if (taskStatus.status === 'Completed Tasks') {
        return { ...taskStatus, count: completedTasks };
      }
      return taskStatus;
    });
    
    setTaskStatuses(updatedTaskStatuses);
  } ,[taskListContent]);

  const onDeleteTask = (taskId) => {
    const newTaskListContent = taskListContent.map((taskCategory) => {
      const updatedTasks = taskCategory.tasks.filter(task => task.id !== taskId);
      return { ...taskCategory, tasks: updatedTasks };
    });
    setTaskListContent(newTaskListContent);
  };


    const onEditTask = (taskDetails) => {
      return null
    }
    




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
          {taskListContent.map((taskTypeItem) => (<TaskList key={taskTypeItem.id} taskTypeItem={taskTypeItem} onDeleteTask={onDeleteTask} onEditTask={onEditTask}/>))}
        </div>
        <AddTaskModal showModal={showModal} closeModal={closeModal} openSuccessModal={openSuccessModal} addTaskToList={addTaskToList}/>
        <SuccessModal
          showSuccessModal={showSuccessModal}
          closeSuccessModal={closeSuccessModal}

        />
    </div>
  );
}   

export default Home;


