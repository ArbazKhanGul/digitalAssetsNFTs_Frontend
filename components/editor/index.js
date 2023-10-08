import { useQuill } from 'react-quilljs';
import 'quill/dist/quill.snow.css';
import { useEffect, useState } from 'react'
import PulseLoader from "react-spinners/PulseLoader";
import { useRef } from "react";
import { toast } from "react-toastify";
import handleFileUpload from '../../utils/textconversion';
const modules = {
  toolbar: [
    ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
    [{ 'list': 'ordered' }, { 'list': 'bullet' }],
    // [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
    [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
    [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
    // [{ 'font': [] }],  
    ['clean']                                         // remove formatting button
  ],
  //   magicUrl: true 
};


const Editor = ({ setFieldValue,textData}) => {


  const { quill, quillRef } = useQuill({ modules });
  const [count, changeCt] = useState(0);
  const [firstTime, setFirstTime] = useState(false);
  const [textReaderLoader, setTextReaderLoader] = useState(false);
  const fileRef = useRef(null);


  useEffect(()=>{
    if(quill && !firstTime && textData){
      setFirstTime(true);
    quill.clipboard.dangerouslyPasteHTML(textData);
    // Update form field values
    setFieldValue('nftTextHTML', textData);
    setFieldValue('nftText', quill.getText());
    changeCt(quill.getText().length - 1);
    const length = quill.getLength();
    quill.setSelection(length, length);
  }
  },[quill])


  useEffect(() => {
    if (quill) {
      quill.on('text-change', (delta, oldDelta, source) => {
        console.log('Text change!');
        changeCt(quill.getText().length - 1);
        console.log(quill.getContents()); // Get delta contents
        setFieldValue("nftTextHTML", quill.root.innerHTML)
        setFieldValue("nftText", quill.getText())
      });
    }

  }, [quill]);

  return (
    <>


      <div className="w-11/12 sm:w-10/12 md:w-8/12 lg:w-6/12">

        <input
          type="file"
          id="nftTextFile"
          name="nftTextFile"
          accept=".txt"
          ref={fileRef}
          hidden
          onChange={(e) => {
            const file = e.target.files[0];
            if (file && file.type === 'text/plain') {
              handleFileUpload(file, setFieldValue, setTextReaderLoader, quill, changeCt,fileRef);
            } else {
              // Show a toast error message for invalid file type
              toast.error('File type must be .txt', {
                position: "top-center",
              });
            }
          }}
        />
      </div>

      <div className="w-[100%]">
        <button className=" w-[100%] bg-[#1b31c4] hover:bg-blue-800  text-white font-normal text-[1.8rem] sm:font-semibold px-12 my-[1rem]  py-[0.8rem] sm:px-14 rounded-[0.5rem] font-['Inconsolata'] tracking-wider"
          type="button" onClick={() => {
            fileRef.current.click();
          }}

        >
          Choose File (txt)
        </button>
      </div>


      {textReaderLoader && <div className="reginpfile w-[100%] mb-[1rem] flex">
        <span className="text-start flex items-center text-black w-[84%] font-['Inconsolata'] text-[#0D1344E5'] text-[2rem] tracking-wider">
          Reading file data  <PulseLoader
            color={"red"}
            loading={textReaderLoader}
            cssOverride={{ marginTop: "5px", marginLeft: "5px" }}
            size={6}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </span>

      </div>}


      <div className="w-[100%] h-[30rem]   mgeditior block ">
        <div ref={quillRef} className="h-[30rem] mb-[1rem] !font-['Inconsolata] text-[2rem]" />
        <h4 className="text-right font-['Inconsolata] text-[1.6rem] font-semibold mt-[0.3rem]">Count = {count}</h4>
      </div>

    </>
  )
}

export default Editor;