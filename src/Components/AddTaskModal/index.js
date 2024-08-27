import { BsThreeDotsVertical } from "react-icons/bs";
import { LuDot } from "react-icons/lu";
import { useState } from "react";
import "./index.css";

const AddTaskModal = ({ showModal, closeModal, openSuccessModal,addTaskToList }) => {
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [selectedDate, setSelectedDate] = useState("");

  const onChangeTitle = (e) => {
    setTaskTitle(e.target.value);
  };

  const onChangeDescription = (e) => {
    setTaskDescription(e.target.value);
  };

  const addTask = () => {
    const formatDate = (date) => {
      const day = String(date.getDate()).padStart(2, "0");
      const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
      const year = date.getFullYear();
      return `${day}/${month}/${year}`;
    };
    if (taskTitle === "") return;
    const newTask = {
      task: {
        id: Math.random(),
        taskPriority: "High",
        title: taskTitle,
        description: taskDescription,
        deadline: formatDate(new Date()),
      },
      taskType: "To Do",
    };
    addTaskToList(newTask);
    setTaskTitle("");
    setTaskDescription("");
    openSuccessModal();
  };

  if (!showModal) return null;
  return (
    <>
      <div className="modal-overlay">
        <div className="modal-container">
          <div className="modal-header">
            <div className="header-content">
              <LuDot className="dot-icon" />
              <h2 className="add-task-text">ADD TASK</h2>
              <button className="plus-icon">+</button>
            </div>
            <div className="header-underline"></div>
          </div>
          <div className="task-assigning-container">
            <div className="modal-body">
              <div className="input-container">
                <input
                  type="text"
                  placeholder="Task Title"
                  className="task-input"
                  onChange={onChangeTitle}
                  value={taskTitle}
                />
                <BsThreeDotsVertical className="three-dots-icon" />
              </div>
              <div className="input-underline"></div>
              <textarea
                placeholder="Enter description..."
                className="description-textarea"
                onChange={onChangeDescription}
                value={taskDescription}
              ></textarea>
            </div>

            <div className="modal-footer">
              <label htmlFor="deadline" className="deadline-button">
                Deadline
                <input
                  type="date"
                  id="deadline"
                  className="date-picker"
                  onChange={(e) => setSelectedDate(e.target.value)}
                  value={selectedDate}
                />
              </label>
              <button className="assign-button" onClick={addTask}>
                Assign To
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddTaskModal;
