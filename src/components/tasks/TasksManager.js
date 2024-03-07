import { FaPencilAlt, FaTimes } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Swal from "sweetalert2";
import './TaskManager.css';

function App() {
    
    const [tasks, setTasks] = useState([]);
    const [text, setText] = useState('');
    const [day, setDay] = useState('');
    const [completed, setCompleted] = useState(false);
    
    // To load added tasks
    const getTasks = JSON.parse(localStorage.getItem("taskAdded"));
    useEffect(() => {
        if (getTasks == null) {
            setTasks([])
        } else {
            setTasks(getTasks);
        }
    }, [])

    //to handle add task form validation
    const onSubmit = (e) => {
        e.preventDefault();
        if (!text && !day) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Fill in your task and date or close the form!'
            })
        } else if (!text && day) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Fill in your task!'
            })
        } else if (text && !day) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Fill in your date!'
            })
        } else {
            addTask({ text, day });
        }
        setText('');
        setDay('');
    }
    
    //To Save task and ass to storage
    const addTask = (task) => {
        const id = uuidv4();
        const newTask = { id, ...task }
        setTasks([...tasks, newTask]);
        Swal.fire({
            icon: 'success',
            title: 'Yay...',
            text: 'You have successfully added a new task!'
        })
        localStorage.setItem("taskAdded", JSON.stringify([...tasks, newTask]));
    }
    
    // To delete task from storage
    const deleteTask = (id) => {
        const deleteTask = tasks.filter((task) => task.id !== id);
        setTasks(deleteTask);
        Swal.fire({
            icon: 'success',
            title: 'Oops...',
            text: 'You have successfully deleted a task!'
        })
        localStorage.setItem("taskAdded", JSON.stringify(deleteTask));
    }
    
    // To handle task update as completed
    const toggleCompleted = (id) => {
        const updatedTasks = tasks.map(task => {
            if (task.id === id) {
                return { ...task, completed: !task.completed };
            }
            return task;
        });
        setTasks(updatedTasks);
        localStorage.setItem("taskAdded", JSON.stringify(updatedTasks));
    }

    return (
        <div className="container">
            <header className="header">
                <h2 className="app-header">My Tasks</h2>
            </header>
            <form className="add-form" onSubmit={onSubmit}>
                <input className="formInput" type="text" placeholder="Task" value={text} onChange={(e) => setText(e.target.value)} />
                <input className="formInput" type="date" placeholder="Due Date" value={day} onChange={(e) => setDay(e.target.value)} />
                <input type="submit" className="btn btn-block formInput" value="Save Task" />
            </form>
            <h3>Available Tasks: {tasks.length}</h3>
            <table className="task-table">
                <thead>
                    <tr>
                        <th>Task</th>
                        <th>Day & Time</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {tasks.length > 0 ? (
                        tasks.map((task) => (
                            <tr>
                                <td className='tableCell'>{task.text}</td>
                                <td className='tableCell'>{task.day}</td>
                                <td className='tableCell'>
                                    <p><FaTimes onClick={() => deleteTask(task.id)} className="delIcon" /></p>                                   
                                </td>
                                <td className='tableCell'>
                                    <input
                                        type="checkbox"
                                        checked={task.completed}
                                        onChange={() => toggleCompleted(task.id)}
                                    />                                  
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td>No Task Found!</td>
                        </tr>
                    )}
                </tbody>                
            </table>                     
        </div>
    )
}
export default App;