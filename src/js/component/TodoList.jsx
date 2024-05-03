import React, { useEffect, useState } from "react";


export const TodoList = () => {
  const [ task, setTask ] = useState('');
  const [ idList, setIdList] = useState(0);
  const [ list, setList ] = useState();
  const [ posts, setPosts] = useState();
  const host = 'https://playground.4geeks.com/todo'


  const handleSumbit = (event) => {
    event.preventDefault();
    if (task.trim() !== '') {
      const newTodo = {
        label:task,
        is_done: false
      }
      updateList(newTodo);
      setTask('');
    } else {
      setTask('');
    } 
  }

  const deleteTask = async (item) => {
    const uri = host + '/todos/' + item.id;
    const options = {
      method: "DELETE"
    }
    const response = await fetch(uri,options);
    if(!response.ok){
      console.log('Error: ', response.status, response.statusText);
      return
    }
    getList()
  }

  const updateList = async (dataToSend) => {
    const uri = host + '/todos/paurb';
    const options = {
      method: 'POST',
      body: JSON.stringify(dataToSend),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    }
    const response = await fetch(uri, options);
    if(!response.ok){
      console.log('Error: ', response.status);
      return
    }
    getList()
  }
 
  const getList = async() => {
    const uri = host + '/users/paurb';
    const options = {
        method: 'GET'
    }
    const response = await fetch(uri, options);
    if(!response.ok){
        console.log('Error: ', response.status);
        return
    }
    const data = await response.json();
    setList(data.todos)
  }

  useEffect(()=> {
    getList()
  }, [])

  return (
    <div className="container col-10 col-sm-8 col-md-6">
      <h1 className="text-primary">todos</h1>
      <div className="mt-2">
        <form onSubmit={handleSumbit}>
            <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
              value={task}
              onChange={(event) => setTask(event.target.value)}
              />
        </form>
        {!list ? '':
        <ul className="list-group">
          {list.map((item, id) =>
            <li key={id} className="list-group-item d-flex justify-content-between hidden-icon">
            <div>
              {item.is_done ? <i className="text-success me-2 fas fa-thumbs-up"></i> : <i className="text-danger me-2 fas fa-ban"></i>}
              {item.label}
            </div>
            <div>
              <span onClick={() => editTask(item)} className="me-2">
                <i className="fas fa-edit text-success"></i>
              </span>
              <span onClick={() => deleteTask(item)}>
                <i className="fas fa-trash text-danger"></i>
              </span>
            </div>
          </li>
          )}
          <li className="list-group-item text-end bg-light fw-lighter">
           {list.length === 0 ? 'Please, add a new task' : `${list.length} tasks`}
          </li>
        </ul>
      }
      </div>

    </div>
  )
}