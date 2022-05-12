
import  {useState} from 'react'
import { Fragment } from 'react'
import Message from './Message'
import axios from 'axios'
function Upload(){
/* Declaring variables, and it is using the useState hook. */
   const  [file,setFile]= useState('')
   const [filename, setFileName] = useState('Choose file')
   const  [uploadFile, setUploadFile]= useState({})
   const  [message, setMessage]= useState('')
   const  [upLoadPercent, setUploadPercent]= useState('')
/**
 * The onchange function is triggered when the user selects a file. The function then sets the file
 * state to the file selected by the user and sets the fileName state to the name of the file selected
 * by the user.
 */
   const onchange= e =>{
      setFile(e.target.files[0]);
      setFileName(e.target.files[0].name);
   }
   
/**
 * The function is called onsubmit, and it takes an event as an argument. It prevents the default
 * action of the event, and then creates a new FormData object, and appends the file to it.
 * it being an async function is the reason for the preventDefault, FormData though? (:-<|)
 */
   const  onsubmit = async e => {
      e.preventDefault();
      /* Form data is used to send html forms with or without files*/
      const formData = new FormData();
      formData.append('file', file)
/* A try catch block, and it is used to catch errors. */
      try{
/* Making a post request to the server, and it is sending the formData object to the server. */
const res = await axios.post('/upload', formData, {
   headers:{
   'Content-Type': 'multipart/form-data'
},
onUploadProgress:ProgressEvent=>{setUploadPercent(parseInt(Math.round((ProgressEvent.loaded*100)/ ProgressEvent.total)))

setTimeout(()=>setUploadPercent(0),10000)
}
})
const {fileName, filePath} = res.data
setUploadFile({fileName, filePath})
setMessage('File Uploaded')
      }
      catch(err){
if(err.response.status ===500){
   setMessage('there was a  problem with the  server')

}
else{
   setMessage(err.response.data.msg)
}
      }}
   
   return(
<Fragment>
{/* A ternary operator, and it is used to check if the message state is true. If it is true, it will
display the message component, and if it is false, it will display nothing. */}
{message? <Message msg={message}/>: null}

<form onSubmit={onsubmit}>
   
<div className="input-group mb-3 display-flex">
  <input type="file" className="form-control" id="inputGroupFile02" onChange={onchange}/>
  <label className="input-group-text" htmlFor="inputGroupFile02">{filename} </label>
</div>

<input type = 'submit' value='Upload' className='btn btn-primary btn-block mt-4'/>
</form>
{uploadFile? <div className='row mt-5'>
<div className='.col-md-6.m-auto'>
   <h3> 
   {uploadFile.fileName}</h3>
   <img style={{width:'100%'}} src= {uploadFile.filePath} alt=''/>
</div>
 </div>:null }

</Fragment>
   )
}
export default Upload