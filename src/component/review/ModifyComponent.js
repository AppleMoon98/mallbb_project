import { useEffect, useState, useRef} from "react";
import { getOne, remove } from "../../api/reviewApi";
import useCustomMove from "../hooks/useCustomMove";
import { API_SERVER_HOST } from "../../api/reviewApi";
import { modify } from "../../api/reviewApi";
import FetchingModal from "../../common/FetchingModal";
import ResultModal from "../../common/ResultModal";


const prefix = API_SERVER_HOST


const initState = {
    id:0,
    title:'',
    content:'',
    desc:'',
    createDate:'null',
    delFlag:false,
    uploadFileNames:[]
}

const ModifyComponent = ({id}) => {

    const [review, setReview] = useState({...initState})

    const [result, setResult] = useState(null)

    const {moveToList, moveToRead} = useCustomMove()

    const [fetching, setFetching] = useState(false)

    const uploadRef = useRef

    useEffect( () => {

        setFetching(true)

        getOne(id).then(data => {
            setReview(data)
            setFetching(false)
        })
    }, [id])


    const handleClickModify = () => {
        
        const files = uploadRef.current.files

        const formData = new FormData()

        for(let i=0; i<files.length; i++){
            formData.append("files", files[i]);
        }

        formData.append("price", review.id)
        formData.append("title", review.title)
        formData.append("desc", review.desc)
        formData.append("delFlag", review.delFlag)

        for(let i=0; i<review.uploadFileNames; i++){
            formData.append("uploadFileNames", review.uploadFileNames[i])
        }

        setFetching(true)

        modify(id, formData).then( data => {
            setResult('Modified')
            setFetching(false)
        })
    }

    const handleClickDelete = () => {
        remove(id).then(data => {
            setResult('삭제')
            setFetching(false)
        })
    }

    const closeModal = () => {
        if(result === '수정'){
            moveToRead(id)
        }else if(result === '삭제')
            moveToList({page:1})
            setResult(null)
    }

    const handleChangeReview = (e) => {
        review[e.target.name] = e.target.value

        setReview({...review})
    }

    const handleChangeReviewComplete = (e) => {
        const value = e.target.value
        review.delFlag = (value === 'Y')
        setReview({...review})
    }

    const deleteOIdImages = (imageName) => {
        
        const resultFileNames = review.uploadFileNames.filter(fileName => fileName !== imageName)

        review.uploadFileNames = resultFileNames

        setReview({...review})
    }

    return(
        
        <div className="border-2 border-sky-200 mt-2 m-2 p-4">
            {fetching? <FetchingModal/> :<></>}
            {result ? <ResultModal title={`${result}`} content={'정상적으로 처리되었습니다'} callbackFn={closeModal}></ResultModal> : <></>}
            
            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 text-right font-bold">제목</div>
                    <input className="w-4/5 p-6 rounded-r border border-solid shadow-md bg-gray-100"
                    name="title" type={'text'} value={review.title} onChange={handleChangeReview}>{review.title}</input>
                    </div>
            </div>

             <div className="flex justify-center">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 text-right font-bold">내용</div>
                    <textarea className="w-4/5 p-6 rounded-r border border-solid shadow-md bg-gray-100" 
                    name="content" rows="4" value={review.content} onChange={handleChangeReview}>{review.content}</textarea>
                    </div>
            </div>

            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 text-right font-bold">작성일자</div>
                    <input className="w-4/5 p-6 rounded-r border border-solid border-neutral-500 shadow-md"
                    name="startDate" type={'text'} value={review.createDate} onChange={handleChangeReview}>{review.createDate}</input>
                    </div>
            </div>       
                    
            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 text-right font-bold">DELETE</div>
                    <select name="delFlag" className="border-solid border-2 rounded m-1 p-2" onChange={handleChangeReview} value={review.delFlag}>
                        <option value={false}>사용</option>
                        <option value={true}>삭제</option>
                    </select>
                </div>
            </div>

            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 text-right font-bold">FILES</div>
                    <input ref={uploadRef} className="w-4/5 p-6 rounded-r border border-solid border-neutral-500 shadow-md" 
                    type={'file'} multiple={true}></input>
                    </div>
            </div> 
            
            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 text-right font-bold">IMAGE</div>
                    <div className="w-4/5 justify-center flex flex-wrap items-start">
                        {review.uploadFileNames.map((imgFile, i)=>
                        <div className="flex justify-center flex-col w-1/3" key={i}>
                            <button className="bg-blue-500 text-3xl text-white" onClick={()=>deleteOIdImages(imgFile)}>DELETE</button>
                            <img alt="img" src={`${prefix}/r/view/s_${imgFile}`}></img>
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
