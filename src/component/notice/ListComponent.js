import { useEffect, useState } from "react";
import { getList } from "../../api/noticeApi";
import PageComponent from "../../common/PageComponent";
import useCustomMove from "../hooks/useCustomMove";
import { Link } from "react-router-dom";

const initState = {
  dtoList: [],
  pageNumList: [],
  pageRequestDTO: null,
  prev: false,
  next: false,
  totalCount: 0,
  prevPage: 0,
  nextPage: 0,
  totalPage: 0,
  current: 0
}


const ListComponent = () => {
  const { page, size, moveToList } = useCustomMove()

  const [serverData, setServerData] = useState(initState);

  useEffect(() => {
    getList({ page, size }).then(data => {
      setServerData(data)
    })
  }, [page, size])

  return (
    <div style={{ width: "60%", margin: "20px auto" }}>
      <h2 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "16px" }}>공지사항</h2>

      <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
        <li style={{
          display: "flex", backgroundColor: "#f2f2f2", fontWeight: "bold", borderBottom: "2px solid #ddd", padding: "12px 8px",
        }}
        >
          <span style={{ flex: "0 0 80px", textAlign: "center" }}>번호</span>
          <span style={{ flex: "1" }}>제목</span>
          <span>작성자</span>
          <span style={{ flex: "0 0 160px", textAlign: "center" }}>날짜</span>
        </li>

        {serverData.totalCount > 0 && serverData.dtoList.length > 0 ? (
          serverData.dtoList.map((notice) => (
            <li key={notice.id} style={{ display: "flex", borderBottom: "1px solid #ddd", padding: "10px 8px", cursor: "pointer" }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#fafafa")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "white")}
            >
              <span style={{ flex: "0 0 80px", textAlign: "center", color: "#555" }}>{notice.id}</span>
              <span style={{ flex: "1", color: "#000000" }} onClick={moveToList}>{notice.title}</span>
              <span style={{ flex: "0 0 160px", textAlign: "center", color: "#666" }}>{notice.createDate}</span>
            </li>
          ))) :
          <li style={{ padding: "24px", textAlign: "center", color: "#777" }}>
            등록된 공지사항이 없습니다.
          </li>}
      </ul>

      <div style={{ marginTop: "20px", textAlign: "center" }}>
        <PageComponent serverData={serverData} movePage={moveToList} />
      </div>

      <Link to={"/notice/add"}>글 등록</Link>
    </div>
  );
}

export default ListComponent;