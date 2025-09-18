import MainNav from "../common/MainNav";
import Logo from "../img/project_Img/slide_Image/Silde4.jpeg"
import DatePicker from "react-datepicker";
import { ko } from "date-fns/locale";
import { addDays } from "date-fns";
import { useState } from "react";



const WebInfoPage=()=>{
    const [selectedDate,setSelectDate] = useState(new Date());
    return(
        <div>
            <MainNav/>
            <div className ="flex justify-center flex-col">
                <h1>소개</h1>
                 <DatePicker locale={ko} dateFormat="yyyy/MM/dd" selected={selectedDate} minDate={new Date()} maxDate={addDays(new Date(),6)}
                  onChange={date => setSelectDate(date)} inline>
                  <div>
                  </div>
                  </DatePicker>
            
                  
                
                

                <img src={Logo} width="500px"/>
                
                
            </div>
        </div>
    )    
}

export default WebInfoPage;