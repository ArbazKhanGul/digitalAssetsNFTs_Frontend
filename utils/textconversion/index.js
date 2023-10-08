const handleFileUpload = (file, setFieldValue, setTextReaderLoader, quill, changeCount,fileRef) => {
    if (!file) return;
  
    console.log("hangle file running");
    setTextReaderLoader(true);
  
    const reader = new FileReader();
    reader.onload = (event) => {
      let fileContent = event.target.result;
  
      // Replace line breaks with <br> tags
      fileContent = fileContent.replace(/\n/g, '<br>');
  
      const currentContent = quill.root.innerHTML;
  
      // Remove leading <br> tags if present in the current content
      const trimmedCurrentContent = currentContent.replace(/^<br>/, '');
  
      const newContent = trimmedCurrentContent + fileContent;
  
      // Paste the new content
      quill.clipboard.dangerouslyPasteHTML(newContent);
  
      // Update form field values
      setFieldValue('nftTextHTML', newContent);
      setFieldValue('nftText', quill.getText());
      // Update character count
      changeCount(quill.getText().length);
  
      // Set cursor position at the end of the content
      const length = quill.getLength();
      quill.setSelection(length, length);
      fileRef.current.value = '';
      setTextReaderLoader(false);
    };
  
    reader.readAsText(file);
  };
  
  export default handleFileUpload;
  