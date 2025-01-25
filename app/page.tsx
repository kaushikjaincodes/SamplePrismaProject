'use client'

import { useState, useEffect } from 'react';

const Home = () => {
  const [tasks, setTasks] = useState<{ id: number; title: string }[]>([]);
  const [newTask, setNewTask] = useState('');

  // Fetch tasks from the API
  useEffect(() => {
    const fetchTasks = async () => {
      const res = await fetch('/api/tasks');
      const data = await res.json();
      setTasks(data);
    };
    fetchTasks();
  }, []);

  // Add a new task
  const addTask = async () => {
    if (!newTask.trim()) return;

    const res = await fetch('/api/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title: newTask }),
    });

    const task = await res.json();
    setTasks([...tasks, task]);
    setNewTask('');
  };

  return (
    <div>
      <h1>Task List</h1>

      <div>
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add a new task"
        />
        <button onClick={addTask}>Add Task</button>
      </div>

      <ul>
        {tasks.map((task: { id: number; title: string }) => (
          <li key={task.id}>
            {task.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
