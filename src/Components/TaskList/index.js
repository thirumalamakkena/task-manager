import { LuDot } from "react-icons/lu";
import TaskItem from '../TaskItem';


import './index.css'

const TaskList = (props) => {
    const {taskTypeItem,onDeleteTask,onEditTask} = props
    const {color, taskType,tasks} = taskTypeItem
    return (
        <div className="task-list-main-container">
            <div className='header'>
                <LuDot className={`dot ${color}`}/>
                <p className='task-type'>{taskType}</p>
                <button className="task-type-count-btn">
                    {tasks.length}
                </button>
            </div>
            <hr className={`line line-${color}`}/>
            <ul className="task-list">
                {tasks.map((task) => (<TaskItem key={task.id} task={task} onDeleteTask={onDeleteTask} onEditTask={onEditTask}/>))} 
            </ul>
        </div>
    );
}   

export default TaskList;