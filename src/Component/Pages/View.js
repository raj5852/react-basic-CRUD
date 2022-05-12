import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";


function View() {
    const [student,setStudent] = useState([])
    const {id} = useParams()

    useEffect(()=>{
        getData();
    },[])

    async function getData(){
        const sinStudent = await axios.get(`http://localhost:3333/students/${id}`)
        setStudent(sinStudent.data)
    }

    // console.log(student)
    return (
        <>
        <h5>Name:{student.name} </h5>
        <h5>Email:{student.email} </h5>
        <Link className="btn btn-info" to="/">back to home</Link>
        </>

    );
}

export default View;