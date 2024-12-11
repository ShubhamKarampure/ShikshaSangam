import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
  IconButton,
  Button,
  TextField,
} from "@mui/material";
import { FaCheck, FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import StudentTable from "./StudentTable";
import AlumniTable from "./AlumniTable";
import { getAlumniByCollege, getStudentByCollege } from "../../../../api/users";

function UserView() {
    const [student,setStudent]=useState([])
    const [alumni,setAlumni]=useState([])
    useEffect(()=>{
        const fetchStudentsByCollege=async()=>{
            const res= await getStudentByCollege();
            if(res){
              setStudent(res)
            }else{
              console.log(res);
            }
        }
        const fetchAlumniByCollege=async()=>{
            const res=await getAlumniByCollege()
            if(res){
              setAlumni(res);
            }else{
              console.log(res);
              
            }
        }
        fetchAlumniByCollege()
        fetchStudentsByCollege()
    },[])
  return (
    <>
    <StudentTable students={student}/>
    <AlumniTable alumni={alumni}/>
    </>
    
  )
}

export default UserView