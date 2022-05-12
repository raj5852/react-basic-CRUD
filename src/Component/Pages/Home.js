import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Home() {

    const [student, setStudent] = useState([]);
    const [stdata,setStdata] = useState({
        name:'',
        email:''
    });
    const [status,setStatus] = useState();

    useEffect(() => {
        getAllData();
    }, [])
    async function getAllData() {
        try {
            const students = await axios.get('http://localhost:3333/students');
            setStudent(students.data)

        } catch {
            console.log('something is wrong')
        }
    }

    function ChangeValue(e){
        e.preventDefault();
        const name = e.target.name;
        const value = e.target.value;
        setStdata({...stdata,[name]:value})
        stdata.name = "";
        stdata.email = "";
        
    }
   async function handelsub(e){
        e.preventDefault();
        try{
             await axios.post("http://localhost:3333/students",stdata);
             setStatus(true);
        }catch{
            console.log("someyhing is  wrong")
        }
    }
    if(status){
      return  <Home/>
    }
   async function clickevent(id){
        await axios.delete(`http://localhost:3333/students/${id}`,student);
        setStatus(true)
    }

    return (
        <>
            <h1 className="text-center">React CRUD with api call</h1>
            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                        Add student
                        <hr />
                        <form onSubmit={handelsub}>
                            <input name="name" onChange={ChangeValue} value={stdata.name} type="name" placeholder="Name" required /><br />
                            <input name="email" onChange={ChangeValue} value={stdata.email} type="email" placeholder="Email" required /><br />
                            <input type="submit" />
                        </form>
                    </div>

                    <div className="col-md-6">
                        student List
                        <hr />
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th>No</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {student.map((student, id) => {
                                    return (<tr key={id}>
                                        <td> {id+1} </td>
                                        <td> {student.name} </td>
                                        <td> {student.email} </td>
                                        <td> 
                                        <Link className="btn btn-success" to={`/view/${student.id}`}>View</Link>    
                                        <Link className="btn btn-info" to={`edit/${student.id}`}>Edit</Link>    
                                        <button onClick={()=>clickevent(student.id)} className="btn btn-danger">Delete</button> 
                                        </td>
                                    </tr>
                                    )
                                })}
                            </tbody>

                        </table>
                        <br />

                    </div>

                </div>

            </div>
        </>
    );
}

export default Home;