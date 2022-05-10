
import  {useState} from 'react'
import { Fragment } from 'react'
import Message from './Message'
import axios from 'axios'
function Upload(){
   const  [file,setFile]= useState('')
   const [filename, setFileName] = useState('Choose file')
   const  [uploadFile, setUploadFile]= useState({})
   const  [message, setMessage]= useState('')
   const  [upLoadPercent, setUploadPercent]= useState('')
   const onchange= e =>{
      setFile(e.target.files[0]);
      setFileName(e.target.files[0].name);
   }
   
   const  onsubmit = async e => {
      e.preventDefault();
      const formData = new FormData();
      formData.append('file', file)
      try{
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
   <img style={{width:'100%'}} src= {uploadFile.filePath}/>
</div>
 </div>:null }

</Fragment>
   )
}
export default Upload