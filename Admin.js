import React, { useEffect, useState } from 'react'
import axios from 'axios'
const Admin = () => {
  const [post, setPost] = useState([]);
  const [id, setId] = useState(0);
  const [image, setImage] = useState();
  const [task, setTask] = useState('');

  useEffect(() => {    
    axios.get(`http://localhost:3001/task`)
    .then(res=>{setPost(res.data)})
    .catch(err=>{console.log(err)})
  }, [])

  const handleSubmit = () => {
    axios.post(`http://localhost:3001/task`, {
        "id": id,"image":image,"task": task})
        .then((res) => {console.log(res) })
      .catch((err) => {console.log(err) })
  }


    const handleDelete = (id) => {
      axios.delete(`http://localhost:3001/task/${id}`)
        .then(res => {
          console.log(res);
          setPost(post.filter(item => item.id !== id));
        })
        .catch(err => { console.log(err); });
    }

    const[popup,setPopup]=useState(false)
    const [id1, setId1] = useState(0);
    const [image1, setImage1] = useState();
    const [task1, setTask1] = useState('');

    const openPopup=(datas)=>{
    setPopup(true)
    setId1(datas.id)
    setImage1(datas.image)
    setTask1(datas.task)
    }

    const handleUpdate = () => {
      axios.put(`http://localhost:3001/task/${id1}`, {
        "id": id1,"image":image1,"task": task1
      })
      .then(res => { console.log(res); })
      .catch(err => { console.log(err); });
    }
  return (
    <div>
     <div className="container">
   
          <form onSubmit={handleSubmit}>
          <h1>Add Task</h1>
            <label>Id:</label>
            <input type='number' value={id} onChange={(e) => setId(e.target.value)}/><br></br>
            <label>Image</label>
            <input type='text' value={image} onChange={(e) => setImage(e.target.value)}/><br></br>
            <label>task</label>
            <input type='text' value={task} onChange={(e) => setTask(e.target.value)}/><br></br>
            <button type='submit'>Add Task</button><br></br>
          </form>
      <table>
        <thead>
            <tr>
                <th>Id</th>
                <th>Image</th>
                <th>Task</th>
                <th>Action</th>
            </tr>
        </thead>
        <tbody>
              {post.map((x) => (
               
                <tr key={x.id}>
                  <td>{x.id}</td>
                  <td><img src={x.image} width={100} height={100}/></td>
                  <td>{x.task}</td>
                  <td>
                    <button onClick={() => openPopup(x)}>Update</button>
                    <button onClick={() => handleDelete(x.id)}>Delete</button>
                  </td>
                </tr>
              ))}    
            </tbody>
          </table>
      
          {popup && (
            <div className="popup">
              <form onSubmit={handleUpdate}>
                <button onClick={() => {setPopup(false);}}>X</button>
                <label>Id:</label>
                 <input type='number' value={id1} onChange={(e) => setId1(e.target.value)}/><br></br>
                 <label>Image</label>
                <input type='text' value={image1} onChange={(e) => setImage1(e.target.value)}/><br></br>
                <label>Task</label>
                 <input type='text' value={task1} onChange={(e) => setTask1(e.target.value)}/><br></br>
                <button type='submit'>Updated Task</button><br></br>
              </form>
            </div>
          )}

          <br></br>
        </div>
        </div>
  )
}


export default Admin
