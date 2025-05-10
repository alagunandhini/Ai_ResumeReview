
import { Link } from 'react-router-dom';

const SignUp=()=>{
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
        <div className='p-10  flex flex-col items-center justify-center'>
            <form className=''>
                <h2 className='text-4xl font-bold mb-2 text-pink-300'> Sign Up</h2>
                <p className='text-gray-400 mb-5'>Already a member? <Link to="/login" className='hover:text-black'>Log in</Link> </p>
                {/* floating design input -used peer */}
                <div className='relative w-full mb-4'>
                    {/* fullname */}
                <input type='text' placeholder='Full Name' id="name" className='peer w-[50vh] p-4 border border-gray-500 rounded-md hover:border-pink-300 placeholder-transparent focus:outline-none focus:border-pink-300 '/>
                <label className='absolute left-4 top-4 text-gray-500 text-base transition-all duration-200 peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-1 peer-focus:text-[12px] pointer-events-none  ' htmlFor="name">Full Name</label>
                </div>
                {/* Email */}
                <div className='relative w-full mb-4'>
                <input type='email' placeholder='Email' id="email" className='peer w-[50vh] p-4 border border-gray-500 rounded-md hover:border-pink-300 placeholder-transparent focus:outline-none focus:border-pink-300 '/>
                <label className='absolute left-4 top-4 text-gray-500 text-base transition-all duration-200 peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-1 peer-focus:text-[12px] pointer-events-none  ' htmlFor="email">Email</label>
                </div>
                    {/* password */}
                    <div className='relative w-full mb-4'>
                <input type='password' placeholder='Password' id="pass" className='peer w-[50vh] p-4 border border-gray-500 rounded-md hover:border-pink-300 placeholder-transparent focus:outline-none focus:border-pink-300 '/>
                <label className='absolute left-4 top-4 text-gray-500 text-base transition-all duration-200 peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-1 peer-focus:text-[12px] pointer-events-none  ' htmlFor="pass">Password</label>
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

            
               <p className='mt-14 text-center text-sm mb-15'>By clicking “Sign In” you agree to our<br/>
              <span className='text-pink-300 border-b cursor-pointer'>Terms and Conditions </span>and  <span className='text-pink-300 border-b  cursor-pointer'>Privacy Policy</span>.</p>

        </div>
       </div>

    </div>
    </>
)
}
export default SignUp