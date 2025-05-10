import { useDropzone } from "react-dropzone"
import { useCallback, useState } from "react"
 // to read and extract the file content
import * as pdfjsLib from 'pdfjs-dist';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";


//pdfjs-dist needs a web worker to process PDFs in a background thread.
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;



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

    return(
        <>
        <Navbar/>
        <div className="min-h-screen">


          <div className=" grid grid-cols-1 md:grid-cols-6 min-h-screen ">
    {/* left */}
    <div className=" md:col-span-2 py-12 md:py-6 px-8 flex justify-center md:justify-start  border-e border-gray-300">
        <img src="resume1.png" className=" rounded-xl max-w-[80%] h-auto max-h-[70vh] object-fill   shadow-xl bg-black"/> 

    </div>
    {/* right */}
    <div className=" md:col-span-4 flex flex-col items-center  p-10">
        <h1 className="font-bold text-4xl mb-2">Resume Analyzer</h1>
    <h1 className="font-semibold text-2xl text-center mb-8 text-gray-600">Get Instant Feedback on Your Resume</h1>
        <div {...getRootProps()} className=" border-2 border-dashed border-pink-300 w-full h-[40vh] flex flex-col justify-center items-center hover:bg-pink-100/50 transition">
        <input {...getInputProps()}/> 
        <img src="border.png" className="w-32"/>
            <p className="">Upload Your Resume</p>
            <p className=""> Drag & drop or click to upload</p>
        </div>
        {file && <p className="mt-4 text-gray-600 "> {file.name} uploaded Succesfully</p>}

        <button className="bg-pink-300 text-white px-6 py-5 rounded-md cursor-pointer mt-5 hover:bg-pink-400  "> Analyze the Resume</button>
        


    </div>
</div>

        </div>
        
        <Footer/>
        </>
    )

}
export default Resume