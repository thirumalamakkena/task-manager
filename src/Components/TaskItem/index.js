import { BsThreeDots } from "react-icons/bs";
import { useState,useRef,useEffect } from "react";


import './index.css'

const TaskItem = (props) => {
    const { task, onEditTask, onDeleteTask } = props;
    const { taskPriority, title, description, deadline } = task;
    const [showOptions, setShowOptions] = useState(false);
    const optionsRef = useRef(null);

    const toggleOptions = () => {
        setShowOptions(!showOptions);
    };

    const handleClickOutside = (event) => {
        if (optionsRef.current && !optionsRef.current.contains(event.target)) {
            setShowOptions(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleEdit = () => {
        onEditTask(task);
        setShowOptions(false);
    };

    const handleDelete = () => {
        onDeleteTask(task.id);
        setShowOptions(false);
    };

    return (
        <li className="task-item">
            <div className="task-item-main-container">
                <div className="task-priority-options-header">
                    <p className={`task-priority ${taskPriority}`}>{taskPriority}</p>
                    <div className="task-options-container"  ref={optionsRef}>
                        <BsThreeDots className="task-options" onClick={toggleOptions} />
                        {showOptions && (
                            <ul className="options-dropdown">
                                <li className="option-item" onClick={handleEdit}>Edit</li>
                                <li className="option-item" onClick={handleDelete}>Delete</li>
                            </ul>
                        )}
                    </div>
                </div>
                <h1 className="task-title">{title}</h1>  
                <p className="task-description">{description}</p>
                <div className="task-item-footer">
                    <p className="task-time">Deadline: {deadline}</p>
                </div>
            </div>
        </li>
    );
}

export default TaskItem;