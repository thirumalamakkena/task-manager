import { LuDot } from "react-icons/lu";
import TaskItem from '../TaskItem';


import './index.css'

const TaskList = (props) => {
    const {taskTypeItem} = props
    const {color, taskType, count} = taskTypeItem
    return (
        <div className="task-list-main-container">
            <div className='header'>
                <LuDot className={`dot ${color}`}/>
                <p className='task-type'>{taskType}</p>
                <button className="task-type-count-btn">
                    {count}
                </button>
            </div>
            <hr className={`line line-${color}`}/>
            <ul className="task-list">
                <TaskItem />
                <TaskItem />
                <TaskItem />
                <TaskItem />
            </ul>
        </div>
    );
}   

export default TaskList;