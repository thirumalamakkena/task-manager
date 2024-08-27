import { BsThreeDots } from "react-icons/bs";


import './index.css'

const TaskItem = () => {
    return (
        <li className="task-item">
            <div className="task-item-main-container">
                <div className="task-priority-options-header">
                    <p className="task-priority">Low</p>
                    <BsThreeDots className="task-options"/>
                </div>
                <h1 className="task-title">Brainstorming</h1>  
                <p className="task-description">Brainstorming brings team members' diverse experience into play.</p>
                <div className="task-item-footer">
                    <p className="task-time">Deadline: 10/05/2003</p>
                </div>
            </div>
        </li>
    );
}

export default TaskItem;