import React,{useState,useEffect} from 'react'
import axios from 'axios'

const User = () => {
    const[post,setPost]=useState([])
  useEffect(()=>{
    axios.get(`http://localhost:3001/task`)
    .then(res=>{setPost(res.data)})
    .catch(err=>{console.log(err)})
  })


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
      <h2>User</h2>
      <div className='container'>
      <div className='user-container'>
        {
          post.map(x=>(
            <div className='grid-container'>
               <img src={x.image} width={100} height={100}/>
              <h2>{x.task}</h2>
              </div>
          ))
        }
      </div>
    </div>
    </div>
  )
}

export default User



  