import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

function Edit() {
    const {id} = useParams();
    const [students,setStudent] = useState({
        name:"",
        email:""
    });
    useEffect(()=>{
        getData();
    },[])
    async function getData(){
        const student = await axios.get(`http://localhost:3333/students/${id}`)
        setStudent(student.data);
    }
    function changevalue(e){
        e.preventDefault();
        const name  = e.target.name;
        const value = e.target.value;
        setStudent({...students,[name]:value})
    }
    async function handelsub(e){
        e.preventDefault();
        try{
            await axios.put(`http://localhost:3333/students/${id}`,students);
            // history.pushState('/')
        }catch{
            console.log("wrong")
        }
     }

    return (
        <>
        <form onSubmit={handelsub}>
            <input type="text" name="id" value={id} disabled /><br/>
            <input onChange={changevalue} type="text" name="name" placeholder="Name" value={students.name}  /><br/>
            <input onChange={changevalue} type="email" name="email" placeholder="Email" value={students.email}  /><br/>
            <input type="submit" value="Update" className="btn btn-primary" />
        </form><br/>
        <Link to="/" className="btn btn-info" >Back to home</Link>
        </>

    );
}

export default Edit;