import React, { useEffect, useState } from 'react';

import Tasks from './components/Tasks/Tasks';
import NewTask from './components/NewTask/NewTask';
import useHttp from './hooks/use-http';

function App() {
  const [tasks, setTasks] = useState([]);


  // second methods  -----------------------------------------------

  // const transformTask = (taskObj) => {
  //   const loadedTasks = [];

  //   for (const taskKey in taskObj) {
  //     loadedTasks.push({ id: taskKey, text: taskObj[taskKey].text });
  //   }

  //   setTasks(loadedTasks);
  // }
  // const httpData = useHttp({ url: 'https://647436057de100807b1a7a5b.mockapi.io/users' }, transformTask);

  const httpData = useHttp();
  const { isLoading, error, sendRequest: fetchTasks } = httpData;

  // first methods  -----------------------------------------------

  // const fetchTasks = async (taskText) => {
  //   setIsLoading(true);
  //   setError(null);
  //   try {
  //     const response = await fetch(
  //       'https://647436057de100807b1a7a5b.mockapi.io/users'
  //     );

  //     if (!response.ok) {
  //       throw new Error('Request failed!');
  //     }

  //     const data = await response.json();

  //     const loadedTasks = [];

  //     for (const taskKey in data) {
  //       loadedTasks.push({ id: taskKey, text: data[taskKey].text });
  //     }

  //     setTasks(loadedTasks);
  //   } catch (err) {
  //     setError(err.message || 'Something went wrong!');
  //   }
  //   setIsLoading(false);
  // };

  useEffect(() => {
    const transformTask = (taskObj) => {
      const loadedTasks = [];

      for (const taskKey in taskObj) {
        loadedTasks.push({ id: taskKey, text: taskObj[taskKey].text });
      }

      setTasks(loadedTasks);
    }
    fetchTasks({ url: 'https://647436057de100807b1a7a5b.mockapi.io/users' }, transformTask);
  }, [fetchTasks]);

  const taskAddHandler = (task) => {
    setTasks((prevTasks) => prevTasks.concat(task));
  };

  return (
    <React.Fragment>
      <NewTask onAddTask={taskAddHandler} />
      <Tasks
        items={tasks}
        loading={isLoading}
        error={error}
        onFetch={fetchTasks}
      />
    </React.Fragment>
  );
}

export default App;
