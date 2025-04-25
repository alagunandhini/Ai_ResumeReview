const Home=()=>{

return(
    <>
    <div className="bg-gray-white w-full min-h-screen grid grid-cols-1 md:grid-cols-2  gap-8  py-8 md:py-4 ">
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
    </>
)

}
export default Home