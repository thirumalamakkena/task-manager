import { BsThreeDotsVertical } from "react-icons/bs";
import { LuDot } from "react-icons/lu";
import { useState } from "react";
import DatePickerModal from "../DatePickerModal";
import './index.css'    

const AddTaskModal = ({ showModal, closeModal ,openSuccessModal}) => {

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");

  const openDatePicker = (e) => {
    e.stopPropagation();
    setShowDatePicker(true);
  };
  

  const closeDatePicker = () => setShowDatePicker(false);

  const selectDate = (date) => {
    setSelectedDate(date);
    closeDatePicker();
  };

  if (!showModal) return null;
  return (
    <>
      <div className="modal-overlay">
        <div className="modal-container">
          <div className="modal-header">
            <div className="header-content">
              <LuDot className='dot-icon'/>
              <h2 className="add-task-text">ADD TASK</h2>
              <button className="plus-icon">+</button>
            </div>
            <div className="header-underline"></div>
          </div>
          <div className="task-assigning-container">   
            <div className="modal-body">
              <div className="input-container">
                <input type="text" placeholder="Task Title" className="task-input" />
                <BsThreeDotsVertical className="three-dots-icon" />
              </div>
              <div className="input-underline"></div>
              <textarea
                placeholder="Enter description..."
                className="description-textarea"
              ></textarea>
            </div>

            <div className="modal-footer">
              <button className="deadline-button" onClick={openDatePicker}>Deadline: {selectedDate && <span> {selectedDate}</span>}</button>
              <button className="assign-button" onClick={openSuccessModal} >Assign To</button> 
            </div>
          </div>
        </div>
      </div>
      <DatePickerModal 
        showDatePicker={showDatePicker} 
        closeDatePicker={closeDatePicker} 
        selectDate={selectDate}
      />
    </>
  );
};

export default AddTaskModal;
