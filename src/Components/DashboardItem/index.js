import './index.css'
const DashboardItem = (props) => {
  const {taskStatus} = props
  const {count,status,imageUrl} = taskStatus
  return (
    <li className="task-details">
      <img src={imageUrl} alt="task" className='icon-img'/> 
      <p className="task-name">{status}</p> 
      <p className="count-task">{count}</p>
    </li>
  );
};

export default DashboardItem;
