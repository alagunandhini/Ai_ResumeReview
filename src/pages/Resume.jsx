import { useDropzone } from "react-dropzone"
import { useCallback, useState } from "react"
 // to read and extract the file content
// import * as pdfjsLib from 'pdfjs-dist';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { FaHome } from "react-icons/fa";

import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf';

// Set workerSrc to CDN URL
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;




//pdfjs-dist needs a web worker to process PDFs in a background thread.



const Resume=()=>{
    
    const [resumeText,setResumeText]=useState()
    const [file,setFile]=useState(null) //to acess the file uploaded
    const onDrop=useCallback((acceptedFiles)=>{
        var file=acceptedFiles[0];// stores the first file in arrary
        setFile(file);// save the file in file variable
        console.log(file);
        alert(`file uploaded ${file.name}`)
        if(file.type==="application/pdf"){
            readPdf(file); //checking wheather file is pdf or not
        }else{
            alert("Upload Pdf file")
        }

    },[]) // it calls once file get from users 
    const { getRootProps, getInputProps } = useDropzone({ onDrop,accept:{ 'application/pdf': ['.pdf'] }
     });// to accept only pdf file , it is DropZone function for for drag and drop

     const readPdf= async(file)=>{
        const reader=new FileReader();// create a new file reader
        // when file readed this function triggers
        reader.onload= async function () {

            const array= new Uint8Array(this.result) //file into a Uint8Array (pdf want this format)
            const pdf=await pdfjsLib.getDocument({data:array}).promise
            let text='';

            for(let i=1;i<=pdf.numPages;i++){
                const page = await pdf.getPage(i) //get each page
                const content= await page.getTextContent(); //get file content
                const strings = content.items.map(item=>item.str)
                text+=strings.join(" ")

            }
            console.log(text)
            setResumeText(text)
           
            
        }
        reader.readAsArrayBuffer(file)


     }
    const [questions, setQuestions] = useState([]); // store generated questions
    const [loading, setLoading] = useState(false);
    const [showQuestionsUI, setShowQuestionsUI] = useState(false);


const analyzeInterview = async () => {
    if (!resumeText) {
        alert("Please upload your resume first!");
        return;
    }

    setLoading(true);

    try {
        const response = await fetch("http://localhost:3000/analyze", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ text: resumeText }),
        });

        const data = await response.json();
        setLoading(false);

      if (data.success) {
    try {
        console.log("BACKEND RAW RESPONSE:", data.analysis);

        const parsedQuestions = JSON.parse(data.analysis); // convert string to object
        setQuestions(parsedQuestions); // now each section is an array
        setShowQuestionsUI(true);
    } catch (err) {
        console.error("Failed to parse AI response:", err);
        alert("AI response is invalid");
    }
}

    } catch (error) {
        setLoading(false);
        console.error("Error:", error);
        alert("Something went wrong");
    }
};
const sections = ["HR", "Technical", "Stress", "Scenario"];

const [activeSection, SetActiveSection] =useState("HR");

// forward button logic
const goNext=()=>{
    const index= sections.indexOf(activeSection);
    if(index<sections.length-1){
        SetActiveSection(sections[index+1]);

    }
}

// Backward button logic
const goPrev=()=>{
    const index= sections.indexOf(activeSection);
    if(index>0){
        SetActiveSection(sections[index-1]);

    }
}


    return(
        <>
         {!showQuestionsUI && ( 
        <Navbar/> )}
        <div className="min-h-screen">


          <div className=" grid grid-cols-1 md:grid-cols-6 min-h-screen ">
             {!showQuestionsUI && ( <>
    {/* left */}
    <div className=" md:col-span-2 py-12 md:py-6 px-8 flex justify-center md:justify-start  border-e border-gray-300">
        <img src="resume1.png" className=" rounded-xl max-w-[80%] h-auto max-h-[70vh] object-fill   shadow-xl bg-black"/> 

    </div>
    {/* right */}
    <div className=" md:col-span-4 flex flex-col items-center  p-10">
        <h1 className="font-bold text-4xl mb-2">Resume-Based Interview Preparation</h1>
    <h1 className="font-semibold text-2xl text-center mb-8 text-gray-600">Get AI-generated interview questions</h1>
        <div {...getRootProps()} className=" border-2 border-dashed border-pink-300 w-full h-[40vh] flex flex-col justify-center items-center hover:bg-pink-100/50 transition">
        <input {...getInputProps()}/> 
        <img src="border.png" className="w-32"/>
            <p className="">Upload Your Resume</p>
            <p className=""> Drag & drop or click to upload</p>
        </div>
        {file && <p className="mt-4 text-gray-600 "> {file.name} uploaded Succesfully</p>}

        <button  onClick={analyzeInterview} className="bg-pink-300 text-white px-6 py-5 rounded-md cursor-pointer mt-5 hover:bg-pink-400  ">Generate Now </button>
        {loading && <p className="mt-4 text-gray-600">Generating questions...</p>}
        </div>
</>
        )}

{showQuestionsUI && (
  <div className="col-span-6 min-h-screen bg-white p-6 md:pb-0">

    {/* TOP TABS */}
 {/* TOP TABS – FULL WIDTH BEAUTIFUL UI */}


  <div className="w-full flex items-center justify-between">

    {/* Center Tabs */}
    <div className="flex-1 flex justify-center">
      <div className="flex gap-4 bg-pink-50 px-4 py-2 rounded-2xl shadow-inner">
        {sections.map((tab) => (
          <button
            key={tab}
            onClick={() => SetActiveSection(tab)}
            className={`px-36 py-2 rounded-xl font-semibold text-sm md:text-base transition-all duration-300
              ${
                activeSection === tab
                  ? "bg-pink-300 text-white shadow-md"
                  : "bg-white text-gray-700 hover:bg-pink-200"
              }
            `}
          >
            {tab.toUpperCase()}
          </button>
        ))}
</div>


  
  </div>

</div>




    {/* QUESTION BOX */}
    <div className="mt-10 flex justify-center gap-10">
        <div className=" h-[72vh] flex flex-col items-center justify-center ">
          
            <img  src="robot.png" className="w-70 h-70"/>
              <p className="text-center">Hi, Pinkyy here..! 💗 <br/> Let’s practice!</p>
            
                    <button   className="bg-pink-300 text-white px-8 py-4 rounded-full cursor-pointer mt-5 hover:bg-pink-400  ">Start Practice</button>
             </div>
      <div className="w-[75%] h-[72vh] border-2 border-gray-400 rounded-xl p-6 overflow-y-scroll bg-white shadow-md">

  <h2 className="text-2xl font-bold text-pink-400 mb-4 text-center">
    {activeSection} Questions 
  </h2>

  {(() => {
    const qArray = questions[activeSection] || [];

    return (
      <div className="space-y-8">
        {qArray.map((item, idx) => (
          <div key={idx} className="mb-6">
            <p className="font-bold text-gray-800">
              Q{idx + 1}. {item.q}
            </p>
            <p className="mt-2 text-gray-600 pl-4">{item.a}</p>
          </div>
        ))}
      </div>
    );
  })()}
</div>

    </div>
      <button
      onClick={() => setShowQuestionsUI(false)}
      className=" ms-350 mt-4 px-6 py-2 rounded-full text-white bg-pink-300 shadow hover:bg-pink-200 transition"
      title="Go Home"
    >
       Back 
    </button>




  </div>
)}


        




        


    </div>
   
</div>

      

        
         {!showQuestionsUI && ( 
        <Footer/> )}
        </>
    )

}
export default Resume