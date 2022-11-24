import { useQuill} from 'react-quilljs';
import 'quill/dist/quill.snow.css';
import {useEffect,useState} from 'react'

const Editor=({setFieldValue})=>{
  const [count,changeCt]=useState(0);
    const modules = {
        toolbar:[
      ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      // [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
      [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
      [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
      // [{ 'font': [] }],  
      ['clean']                                         // remove formatting button
    ],
  //   magicUrl: true 
    };

    const { quill, quillRef} = useQuill({modules});


    useEffect(() => {
        if (quill) {
          quill.on('text-change', (delta, oldDelta, source) => {
            console.log('Text change!');
            changeCt(quill.getText().length - 1);
            // useCount(quill.getText())
            // console.log(quill.getText()); // Get text only
            console.log(quill.getContents()); // Get delta contents
            // console.log(quill.root.innerHTML); // Get innerHTML using quill
            // console.log(quillRef.current.firstChild.innerHTML); // Get innerHTML using quillRef
            setFieldValue("nftTextHTML",quill.root.innerHTML)
            setFieldValue("nftText",quill.getText())
          });
        }
      }, [quill]);
      
    return (
<>
<div className="w-[100%] h-[30rem] mgeditior block ">
      <div ref={quillRef} className="h-[30rem] mb-[1rem]"/>
      <h4 className="text-right text-['Inconsolata] text-[1.6rem] font-semibold mt-[0.3rem]">Count = {count}</h4>
    </div>
    
    </>
    )
}

export default Editor;