import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import imgmonika from "../../public/Group 2.png"

const Login = () => {
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const navigate = useNavigate()

    const handleSubmit =async (e) =>{
        e.preventDefault()

        

         const res = await fetch("https://api.winaclaim.com/api/login/",{
            method:"POST",
            headers:{
                'Content-Type': "application/json"
            },
            body:JSON.stringify({email,password})


         })
         const data = await res.json()
         localStorage.setItem("token",data.access)

         navigate('/chatbot')

         console.log(data)


        


    }


  return (
    <div className="bg-[#D8FFEA] flex justify-center items-center gap-10 min-h-screen">
      <form onSubmit={handleSubmit} className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
        <legend className="text-center text-2xl font-bold text-green-500">Sign in to your account</legend>

        <label className="label">Email</label>
        <input type="email" value={email} className="input" placeholder="Email" onChange={(e)=>setEmail(e.target.value)}/>

        <label className="label">Password</label>
        <input type="password" value={password} className="input" placeholder="Password" onChange={(e)=>setPassword(e.target.value)} />

        <button type="submit" className="btn btn-neutral mt-4">Sign In</button>
        <h1>Don’t have an account? <Link className="text-green-500 font-bold" to="/register">Sign Up</Link></h1>
      </form>
      <div>
        <img src={imgmonika} alt="" />
      </div>
    </div>
  );
};

export default Login;
