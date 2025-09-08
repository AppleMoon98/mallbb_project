import { useRef,useState } from "react";
import { register } from "../../api/questionApi";

const initState = {
    title:'',
	content:'',
	createDate:'',
	delFlag:'',
}

const Addcomponent = () =>{
    const[notice,setNotice] = useState({...initState})

    const uploadRef = useRef()

    const handleChangeQuestion = (e) =>{
        question[e.target.name] = e.target.value
        setQuestion({...question})
    }

    const handleClickAdd = (e) =>{
        const files = uploadRef.current.files

        const formdata = new FormData()

        for(let i = 0; i <files.length; i++){
            formdata.append("files",files[i]);
        }

        formdata.append("qcontent",question.content)
        formdata.append("qtitle",question.title)
        formdata.append("qcreateDate",question.createDate)
        formdata.append("qdelFlag",question.delFlag)

        console.log(formdata)

        register(formdata)
    }
    
    return(
        <div>
            <div>
                <button type="button" onClick={handleClickAdd}>
                            글 등록
                </button>
            </div>
        </div>
    )
}
export default Addcomponent;