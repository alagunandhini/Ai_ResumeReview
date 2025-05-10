import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Home=()=>{
      const [open, setOpen] = useState(null);
     

return(
    <>
    <Navbar/>
    {/* section-1 */}
    <div className="bg-white w-full min-h-screen grid grid-cols-1 md:grid-cols-2  gap-8  py-8 md:py-4 border-b border-gray-300">
{/* left text */}

        <div className=" flex flex-col justify-center p-6 lg:p-3 max-w-xl mx-auto">
            <h1 className=" font-bold text-4xl text-gray-500 mb-5 text-center md:text-left">AI Resume Review: Instant Feedback for Your Career Success!</h1>
            <div className="flex flex-col items-center md:items-start ">
            <p className="leading-relaxed text-gray-600 mb-3">Instant, Smart Resume Feedback
             Upload your resume and let our AI enhance it! Whether you're a fresher or a pro, get quick, smart insights on content, format, and keywords. It's fast, reliable, and completely free—kickstart your career today!</p>
              <button className="bg-pink-600/50 border border-gray-300 rounded-full py-2 w-40  text-white mt-2 cursor-pointer hover:bg-pink-400">Get Started</button>
            </div>
            
        </div>

        {/* right-image */}

        <div className="flex items-center justify-center">
            <img src="girl.png" className="max-w-[90%] h-auto max-h-[80vh] object-contain mt-12 md:mt-0 "/>
        </div>
        </div>

        

        {/* section-2 (steps)*/}
<div className=" min-h-[80vh] py-6 ">
    <h1 className="font-bold text-2xl md:text-3xl  text-center mb-20 text-gray-500 mt-5">Steps To Use Resume Ai  </h1>
    <div className="grid grid-cols-1 md:grid-cols-3 max-w-7xl mx-auto px-4 gap-20">
        {/* step-1 */}
        <div className="bg-white flex flex-col justify-center  p-6 shadow-lg rounded-t-4xl rounded-s-4xl rounded-e-sm relative">
           <div className=" bg-pink-300 rounded-full text-xl text-white w-12 h-12 flex items-center justify-center mb-4 absolute -top-6">1</div>
           <div className="max-w-4xl mx-auto ">
           <img src="step1.png" className="h-32 w-32 border-12 border-pink-300/10 bg-white rounded-full p-3 mt-10"/>
           </div>
               <h1 className="font-bold text-xl text-gray-700 mt-6"> Upload Your Resume</h1>
               <p className="text-gray-400 mt-2">Submit your latest resume for review and feedback</p>
        </div>

        {/* step-2 */}
        <div className="bg-white flex flex-col justify-center p-6 shadow-lg rounded-t-4xl rounded-s-4xl rounded-e-sm relative">
           <div className="bg-pink-300 rounded-full text-xl text-white w-12 h-12 flex items-center justify-center mb-4 absolute -top-6 ">2</div>
           <div className="max-w-4xl mx-auto ">
           <img src="steps2.png" className="h-32 w-32 object-cover border border-pink-300/10 bg-pink-300/10 rounded-full p-3 mt-10"/>
           </div>
             
               <h1 className="font-bold text-xl text-gray-700 mt-6"> Resume Analysis</h1>
               <p className="text-gray-400 mt-2">Our experts will review your resume carefully.</p>
        </div>

        {/* step-3 */}
        <div className="bg-white flex flex-col justify-center p-6 shadow-lg rounded-t-4xl rounded-s-4xl rounded-e-sm relative">
           <div className="bg-pink-300 rounded-full text-xl text-white w-12 h-12 flex items-center justify-center mb-4 absolute -top-6">3</div>
           <div className="max-w-4xl mx-auto ">
           <img src="step3.png" className="h-32 w-32 border border-pink-300/10 bg-pink-300/10 rounded-full p-3 mt-10"/>
           </div>
               <h1 className="font-bold text-xl text-gray-700 mt-6"> Get Feedback</h1>
               <p className="text-gray-400 mt-2">Receive personalized feedback to improve your resume.</p>
        </div>



    </div>

</div>



{/* section-3 */}
<div className="min-h-[80vh] flex items-center py-10 bg-white  ">
    <div className="grid  grid-cols-1 md:grid-cols-2 max-w-6xl mx-auto">
{/* left-img */}
        <div className="flex justify-center items-center">
            <img src="res.png" className="max-w-[90%]  max-h-[50vh] object-contain mt-8 md:mt-0"/> 
        </div>
{/* right-content */}
        <div className="flex flex-col justify-center items-center md:items-start px-10 md:px-0">
            <h2 className="font-bold text-3xl text-gray-700 mb-3">AI-Powered Resume Review</h2>
            <p className=" text-gray-600 text-lg mb-5 ">
            Our advanced AI technology analyzes your resume to ensure it meets modern industry standards.
            It checks for formatting, keyword optimization, readability, and structure to help you stand out among applicants.
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Get instant feedback on your resume quality.</li>
                <li>Optimize for ATS (Applicant Tracking Systems).</li>
                <li>Highlight your skills and achievements effectively.</li>
                <li>Increase your chances of landing interviews.</li>

            </ul>

          </div>



    </div>
</div>

{/* section-4 (premium)*/}
<div className="bg-pink-300/10 min-h-[40vh] mb-5 grid grid-cols-1 md:grid-cols-2   flex justify-center items-center">
<div className="p-8 md:p-0 mx-0 md:ms-50 ">
    <h1 className="text-3xl font-bold mb-3 text-gray-600">Create Your AI-Powered Resume</h1>
    <p className="mb-4"> Get your resume professionally created and optimized with AI. Stand out to recruiters and land your dream job faster.</p>
    <div>  <button className="bg-pink-600/50 border border-gray-300 rounded-full py-2 w-40  text-white mt-2 cursor-pointer hover:bg-pink-400 ">Go To Premium</button></div>
   
</div>
<div className="flex justify-end ">
    <img src="premium.png" className="w-90 h-90" />
</div>

</div>

{/* section-5 (FAQ) */}
<div className="min-h-[90vh] md:min-h-[80vh] bg-white">
    <div className="max-w-4xl mx-auto p-6">
        <h2 className=" text-4xl font-bold text-center mb-8 text-gray-700 ">Frequently Asked Questions (FAQs)</h2>
        {/* Question-1 */}
        <div className="bg-white shadow-md  p-5 rounded-lg border border-gray-300 mt-5">
            <button className="flex justify-between items-center w-full text-left " onClick={()=>setOpen(open===1 ? null:1)}>
                <h3 className="text-lg font-semibold text-gray-500"> Is the resume review free to use?</h3>
                <span className="text-2xl text-pink-300">{open===1?"×":"+"}</span>
            </button>
            {open===1&& (
                <p className="text-gray-600 mt-2"> Yes! Our basic AI resume review is completely free. Premium features will be available soon.
            </p>
            )}

        </div>

         {/* Question-2 */}
         <div className="bg-white shadow-md  p-5 rounded-lg border border-gray-300 mt-5">
            <button className="flex justify-between items-center w-full text-left " onClick={()=>setOpen(open===2 ? null:2)}>
                <h3 className="text-lg font-semibold text-gray-500">What file formats are supported?</h3>
                <span className="text-2xl text-pink-300">{open===2?"×":"+"}</span>
            </button>
            {open===2&& (
                <p className="text-gray-600 mt-2"> You can upload resumes in PDF, DOCX, and TXT formats.</p>
            )}

        </div>

         {/* Question-3 */}
         <div className="bg-white shadow-md  p-5 rounded-lg border border-gray-300 mt-5">
            <button className="flex justify-between items-center w-full text-left " onClick={()=>setOpen(open===3 ? null:3)}>
                <h3 className="text-lg font-semibold text-gray-500"> How accurate is the AI review?</h3>
                <span className="text-2xl text-pink-300">{open===3?"×":"+"}</span>
            </button>
            {open===3&& (
                <p className="text-gray-600 mt-2"> Our AI provides 90% accurate feedback based on latest ATS and HR standards.</p>
            )}

        </div>

         {/* Question-4 */}
         <div className="bg-white shadow-md  p-5 rounded-lg border border-gray-300 mt-5">
            <button className="flex justify-between items-center w-full text-left " onClick={()=>setOpen(open===4 ? null:4)}>
                <h3 className="text-lg font-semibold text-gray-500"> Can I download the reviewed resume?</h3>
                <span className="text-2xl text-pink-300">{open===4?"×":"+"}</span>
            </button>
            {open===4&& (
                <p className="text-gray-600 mt-2"> Yes, you can download a detailed feedback report after the review is complete</p>
            )}

        </div>


    </div>


</div>
<Footer/>


    </>
)

}
export default Home