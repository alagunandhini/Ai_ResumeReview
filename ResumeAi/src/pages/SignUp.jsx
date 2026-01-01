
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import { useState } from "react";
import { CheckCircle } from "lucide-react";


const SignUp=()=>{
    const [name,setName]=useState("");
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const navigate=useNavigate();
    const [toast,setToast]=useState({show:false,message:"",type:"success"})
    
    // show toast notification
    const showToast=(message,type="success")=>{
        setToast({show:true,message,type});

        // remove after 3 sec
        setTimeout(()=>{
             setToast({show:false,message:"",type});

        },5000)


    }

    const handleSubmit=async(e)=>{
        e.preventDefault();
        
        if(!name || !email|| !password){
            showToast("Fill all fields","error");
            return;
        }

        if(password.length<6){
             showToast("Password length should > 6","error");
            return;
        }

        try{
            const res=await axios.post("http://localhost:3006/users/signup",{name,email,password});
              var user=res.data.user;
            
             localStorage.setItem("user",JSON.stringify(user));

        
            console.log(res.data);
            // alert("signup succesfull");
            if(res){
            showToast("Account Created sucessfully","success");
          

            setTimeout(()=>{
                navigate("/resume");

            },2000)
        }
            
              


        }catch(e){
            if(e.response.status === 400){
                 showToast("Email already exist","error");

            } else
             showToast("Failed to create an account","error");

        }


    }


return(
    <>
    <div className=" min-h-[100vh] bg-white w-full grid grid-cols-1 md:grid-cols-2">
        {/* column-1 */}
       <div className=''>
       <p className=' bg-pink-300 w-22 px-3 py-3 mx-2 my-2  rounded-tl-4xl rounded-br-4xl text-white cursor-pointer hover:bg-pink-400 transition duration-200 ease-in-out flex flex-col justify-center items-center'><Link to="/">🏠︎ Home</Link> </p>
          <div className='flex flex-col items-center'>
          <img src="3d.png" className="w-[75vh]"/>
          <p className='textt-md md:text-xl text-center text-gray-600 '> Hi I am Pinkyy Ai, Your resume Reviewer</p>
          <h1 className='text-4xl text-center text-pink-300 p-4'> Welcomes you</h1>
          </div> 

       </div>
       {/* colummn-1 */}
       <div className='bg-pink-300/10'>
        {/* form  */}
        <div className='p-10  flex flex-col items-center justify-center' >
            <form className='' onSubmit={handleSubmit}>
                <h2 className='text-4xl font-bold mb-2 text-pink-300'> Sign Up</h2>
                <p className='text-gray-400 mb-5'>Already a member? <Link to="/login" className='hover:text-black'>Log in</Link> </p>
                {/* floating design input -used peer */}
                <div className='relative w-full mb-4'>
                    {/* fullname */}
                <input type='text' placeholder='Full Name' id="name" value={name} onChange={(e)=>setName(e.target.value)} className=' w-[50vh] p-4 border border-gray-500 rounded-md hover:border-pink-300  focus:outline-none focus:border-pink-300 '/>
                
                </div>
                {/* Email */}
                <div className='relative w-full mb-4'>
                <input type='email' placeholder='Email' id="email" value={email} onChange={(e)=>setEmail(e.target.value)} className='w-[50vh] p-4 border border-gray-500 rounded-md hover:border-pink-300  focus:outline-none focus:border-pink-300 '/>
                
                </div>
                    {/* password */}
                    <div className='relative w-full mb-4'>
                <input type='password' placeholder='Password' id="pass" value={password} onChange={(e)=>setPassword(e.target.value)} className='w-[50vh] p-4 border border-gray-500 rounded-md hover:border-pink-300  focus:outline-none focus:border-pink-300 '/>
               
                </div>
                <div className='flex items-center justify-center'>
                <button className=' w-80 bg-pink-300 text-white px-6 py-3 rounded-full cursor-pointer hover:bg-pink-300 transition-all duration-200 mb-4'>Sign Up</button>
                </div>
                <div className='flex justify-center items-center'>
                <hr className=' flex-grow border-t text-gray-700 my-4'></hr>
                <span className='mx-4 text-gray-400'>OR</span>
                <hr className=' flex-grow border-t text-gray-400 my-4'></hr>
                </div>
                 
                <h1 className='text-center my-4' >Continue with </h1>
                <div className='flex items-center justify-center gap-8'>
                    <img src="google.png" className='w-10' />
                    <img src="communication.png" className='w-10' />
                    <img src="github.png" className='w-10' />

                </div>
                

            </form>

            
               <p className='mt-14 text-center text-sm mb-15'>By clicking “Sign Up” you agree to our<br/>
              <span className='text-pink-300 border-b cursor-pointer'>Terms and Conditions </span>and  <span className='text-pink-300 border-b  cursor-pointer'>Privacy Policy</span>.</p>

        </div>
       </div>

    </div>
    
    {toast.show && (
  <div className="fixed bottom-5 right-5 z-[100] animate-slideIn">
    <div
      className={`px-8 py-3 rounded-lg shadow-lg  text-sm ${toast.type==="success"? "bg-pink-400 ": "bg-gray-900"} text-white flex gap-3`}
    >
        {toast.type==="success"?( <CheckCircle size={18} className="text-pink-500" />):( <span className="font-extrabold  ">!</span>)
        
    }
       

      {toast.message}
    </div>
  </div>
)}


    
    </>
)
}
export default SignUp