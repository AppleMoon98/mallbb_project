import dayjs from "dayjs";

export function OutputList({ serverData, onClickTitle }) {
  const hasData = serverData?.totalCount > 0 && serverData?.dtoList?.length > 0;

  if (!hasData) {
    return (
      <>
        <li className="flex border-b-2 border-gray-300 bg-gray-100 px-2 py-3 font-semibold">
          <span className="basis-20 shrink-0 text-center">번호</span>
          <span className="flex-1">제목</span>
          <span className="basis-40 shrink-0 text-center">날짜</span>
        </li>

        <li className="p-6 text-center text-gray-500">
          등록된 게시글이 없습니다.
        </li>
      </>
    )
  }

  return (
    <>
      <li className="flex border-b-2 border-gray-300 bg-gray-100 px-2 py-3 font-semibold">
        <span className="basis-20 shrink-0 text-center">번호</span>
        <span className="flex-1">제목</span>
        <span className="basis-40 shrink-0 text-center">날짜</span>
      </li>

      {serverData.dtoList.map((board) => (
        <li key={board.id}
          className="flex cursor-pointer border-b border-gray-200 px-2 py-2 hover:bg-gray-50"
          onClick={() => onClickTitle(board.id)}>

          <span className="basis-20 shrink-0 text-center text-gray-600">
            {board.id}
          </span>

          <span className="flex-1 text-black">
            {board.title}
          </span>

          <span className="basis-40 shrink-0 text-center text-gray-600">
            {dayjs(board.createDate).format('YYYY-MM-DD')}
          </span>
        </li>
      ))}
    </>
  )
}

export function OutputDetail({board, handleChangeBoard, uploadRef, handleClickAdd}) {
  return (
     <div className="mx-auto max-w-2xl px-4 py-8">
      <h1 className="mb-6 text-2xl font-semibold">글 등록</h1>

      <div className="space-y-5 rounded-2xl bg-white p-6 shadow">
        <div className="space-y-2">
          <label htmlFor="title" className="text-sm font-medium text-gray-700">
            제목
          </label>
          <input id="title" type="text" name="title" placeholder="제목" value={board.title} onChange={handleChangeBoard}
            className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2 outline-none transition
                       focus:border-indigo-400 focus:bg-white focus:ring-2 focus:ring-indigo-200"/>
        </div>

        <div className="space-y-2">
          <label htmlFor="content" className="text-sm font-medium text-gray-700">내용</label>
          <textarea id="content" name="content" placeholder="내용" rows={8} value={board.content} onChange={handleChangeBoard}
            className="w-full resize-y rounded-xl border border-gray-200 bg-gray-50 px-4 py-2 outline-none transition
                       focus:border-indigo-400 focus:bg-white focus:ring-2 focus:ring-indigo-200"/>
        </div>

        <div className="space-y-2">
          <label htmlFor="files" className="text-sm font-medium text-gray-700">파일 첨부</label>
          <input id="files" type="file" multiple ref={uploadRef}
            className="block w-full text-sm text-gray-700
                       file:mr-4 file:rounded-xl file:border-0 file:bg-indigo-50 file:px-4 file:py-2 file:text-indigo-700
                       hover:file:bg-indigo-100"/>
        </div>

        <div className="flex justify-end">
          <button type="button" onClick={handleClickAdd}
            className="inline-flex items-center rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white shadow
                       hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 active:translate-y-px">
            글 등록
          </button>
        </div>
      </div>
    </div>
  )
}