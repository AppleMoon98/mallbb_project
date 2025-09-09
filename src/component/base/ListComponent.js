export function Header() {
    return(
        <li className="flex border-b-2 border-gray-300 bg-gray-100 px-2 py-3 font-semibold">
          <span className="basis-20 shrink-0 text-center">번호</span>
          <span className="flex-1">제목</span>
          <span className="basis-40 shrink-0 text-center">날짜</span>
        </li>
    )
}

export function OutputList({ serverData, onClickTitle }) {
    const hasData = serverData?.totalCount > 0 && serverData?.dtoList?.length > 0;

  if (!hasData) {
    return (
      <li className="p-6 text-center text-gray-500">
        등록된 공지사항이 없습니다.
      </li>
    )
  }

  return (
    <>
      {serverData.dtoList.map((board) => (
        <li
          key={board.id}
          className="flex cursor-pointer border-b border-gray-200 px-2 py-2 hover:bg-gray-50"
          onClick={onClickTitle}
        >
          <span className="basis-20 shrink-0 text-center text-gray-600">
            {board.id}
          </span>
          <span className="flex-1 text-black">
            {board.title}
          </span>
          <span className="basis-40 shrink-0 text-center text-gray-600">
            {board.createDate}
          </span>
        </li>
      ))}
    </>
  )
}