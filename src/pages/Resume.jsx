import { useDropzone } from "react-dropzone"
import { useCallback, useState } from "react"
 // to read and extract the file content
// import * as pdfjsLib from 'pdfjs-dist';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

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



    return(
        <>
        <Navbar/>
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
    <div className="col-span-6 p-6 md:p-12">

        <h2 className="text-3xl font-bold mb-6">Your AI Interview Questions</h2>

        <div className="space-y-6 bg-gradient-to-b from-pink-50 to-white p-6 rounded-xl shadow-xl border border-pink-300">
          <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white py-10 px-4 flex justify-center">
    <div className="w-full max-w-8xl bg-white rounded-3xl shadow-xl p-8 border border-pink-200">
        
        {/* Page Title */}
        <h2 className="text-3xl font-bold text-pink-600 mb-8 text-center">
          Alright! I’ve generated your questions. Let’s dive in!
        </h2>

        {/* Questions List */}
        <div className="space-y-8">
            {Object.entries(questions).map(([section, qArray]) => (
                <div key={section}>
                    
                    {/* Section Title */}
                    <h3 className="text-2xl font-semibold text-gray-700 mb-4">
                        📌 {section}
                    </h3>

                    <div className="space-y-5">
                        {qArray.map((item, index) => (
                            <div key={index} className="animate-fade space-y-3">
                                
                                {/* Question Bubble */}
                                <div className="bg-pink-100 border border-pink-200 p-5 rounded-2xl shadow-sm">
                                    <p className="text-lg font-semibold text-pink-700">
                                        Q{index + 1}. {item.q}
                                    </p>
                                </div>

                                {/* Answer Bubble */}
                                <div className="bg-white border border-pink-200 p-5 rounded-2xl shadow-sm ml-4">
                                    <p className="text-gray-700 leading-relaxed">
                                        {item.a}
                                    </p>
                                </div>

                            </div>
                        ))}
                    </div>

                </div>
            ))}
        </div>

        {/* Button */}
        <div className="flex justify-center mt-10">
            <button
                onClick={() => setShowQuestionsUI(false)}
                className="bg-gray-200 hover:bg-gray-300 text-gray-700 py-2 px-6 rounded-full shadow-sm transition"
            >
                🔙 Back
            </button>
        </div>
    </div>
</div>

        </div>

    </div>
)}

        




        


    </div>
</div>

      

        
        
        <Footer/>
        </>
    )

}
export default Resume