import { useEffect,useState, useRef} from "react";
import { getOne,register,remove } from "../../api/questionApi";
import { API_SERVER_HOST } from "../../api/questionApi";
import { modify } from "../../api/questionApi";
import useCustomMove from "../hooks/useCustomMove";
import FetchingModal from "../../common/FetchingModal";
import ResultModal from "../../common/ResultModal";


const prefix = API_SERVER_HOST

const initState ={
    id:0,
    title:'',
    content:'',
    startDate:'',
    desc:'',
    delFlag:false,
    uploadFileNames:[]
}

const ModifyComponent = ({id}) =>{

    const[question,setQuestion] = useState(initState)

    const[result,setResult] = useState(null)

    const[fetching, setFetching] = useState(false)

    const[ moveToList, moveToRead ] = useCustomMove()

    const uploadRef = useRef()

    useEffect(()=>{

        setFetching(true)

            getOne(id).then(data =>{
                setQuestion(data)
                setFetching(false)
            })
        },[id])

        const handleClickModify = () =>{
            
            const files = uploadRef.current.files

            const formData = new FormData()

            for(let i = 0; i < files.length ; i++){
                formData.append("files", files[i]);
            }

                formData.append("price",question.id)
                formData.append("title",question.title)
                formData.append("desc",question.desc)
                formData.append("delFlag",question.delFlag)
            
                for(let i = 0; i < question.uploadFileNames.length ; i++){
                    formData.append("uploadFileName", question.uploadFileNames[i])
                }
                setFetching(true)

                modify(id, formData).then(data=>{

                    setResult('Modified')
                    setFetching(false)
                })
            }

                const handleClickDelete=()=>{
                    remove(id).then(data=>{

                        setResult('삭제')
                        setFetching(false)
                    })
                }

                const closeModal = () =>{
                    if(result ==='수정'){
                        moveToRead(id)
                    }else if(result ==='삭제')
                    moveToList({page:1})
                    setResult(null)
                }

                const handleChangeQuestion =(e) =>{
                    question[e.target.name]=e.target.value

                    setQuestion({...question})
                }

                const handleChangeQuestionComplete = (e) =>{
                    const value = e.target.value
                    question.delFlag = (value ==='Y')
                    setQuestion({...question})
                }

                const deleteOldImages = (ImageName) => {

                    const resultFileNames = question.uploadFileNames.filter(fileName => fileName !== ImageName)

                    question.uploadFileNames = resultFileNames

                    setQuestion({...question})
                }
                return(

                    <div className="border-2 border-sky-200 mt-2 m-2 p-4">
                        {fetching? <FetchingModal></FetchingModal> :<></>}
                        {result ? <ResultModal title={`${result}`} content={'정상적으로 처리되었습니다'} callbackFn={closeModal}></ResultModal> : <></>}
                        
                        <div className="flex justify-center">
                            <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                                <div className="w-1/5 p-6 text-right font-bold">제목</div>
                                <input className="w-4/5 p-6 rounded-r border border-solid shadow-md bg-gray-100" name="title" type={'text'} value={question.title} onChange={handleChangeQuestion}>{question.title}</input>
                                </div>
                        </div>
                    
                         <div className="flex justify-center">
                            <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                                <div className="w-1/5 p-6 text-right font-bold">내용</div>
                                <textarea className="w-4/5 p-6 rounded-r border border-solid shadow-md bg-gray-100" name="content" rows="4" value={question.content} onChange={handleChangeQuestion}>{question.content}</textarea>
                                </div>
                        </div>
                    
                    <div className="flex justify-center">
                        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                            <div className="w-1/5 p-6 text-right font-bold">작성일자</div>
                            <input className="w-4/5 p-6 rounded-r border border-solid border-neutral-500 shadow-md" name="startDate" type={'text'} value={question.startDate} onChange={handleChangeQuestion}>{question.startDate}</input>
                            </div>
                    </div>       
                    
                    <div className="flex justify-center">
                        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                            <div className="w-1/5 p-6 text-right font-bold">DELETE</div>
                            <select name="delFlag" className="border-solid border-2 rounded m-1 p-2" onChange={handleChangeQuestion} value={question.delFlag}>
                                <option value={false}>사용</option>
                                <option value={true}>삭제</option>
                            </select>
                        </div>
                    </div>

                    <div className="flex justify-center">
                        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                            <div className="w-1/5 p-6 text-right font-bold">FILES</div>
                            <input ref={uploadRef} className="w-4/5 p-6 rounded-r border border-solid border-neutral-500 shadow-md" type={'file'} multiple={true}></input>
                            </div>
                    </div> 
            
                    <div className="flex justify-center">
                        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                            <div className="w-1/5 p-6 text-right font-bold">IMAGE</div>
                            <div className="w-4/5 justify-center flex flex-wrap items-start">
                                {question.uploadFileNames.map((imgFile, i)=>
                                <div className="flex justify-center flex-col w-1/3" key={i}>
                                    <button className="bg-blue-500 text-3xl text-white" onClick={()=>deleteOldImages(imgFile)}>DELETE</button>
                                    <img alt="img" src={`${prefix}/api/question/view/s_${imgFile}`}></img>
                                </div>
                            )}
                        </div>

                        </div>
                    </div>
            
                
                    
        
                <div className="flex justify-end p-4">
                <button type="button" className="rounded p-4 w-36 bg-red-500 text-xl text-white" onClick={handleClickDelete}>삭제</button>
                <button type="button" className="rounded p-4 w-36 bg-blue-500 text-xl text-white" onClick={handleClickModify}>수정</button>
                </div>
        
                </div>
        
            )
        }

export default ModifyComponent