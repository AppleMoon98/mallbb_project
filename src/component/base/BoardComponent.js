import dayjs from "dayjs";
import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import useAuthGuard from '../hooks/useAuthGuard'

export function OutputList({ serverData, onClickTitle, booltype }) {
  const hasData = serverData?.totalCount > 0 && serverData?.dtoList?.length > 0;
  
  // Board List Class Name
  const idClassName = "basis-20 shrink-0 text-center"
  const wirterClassName = "basis-30 shrink-0 text-center"
  const dateClassName = "basis-40 shrink-0 text-center"
  
  if (!hasData) {
    return (
      <>
        <li className="flex border-b-2 border-gray-300 bg-gray-100 px-2 py-3 font-semibold">
          <span className={idClassName}>번호</span>
          <span className="flex-1">제목</span>
          <span className={wirterClassName}>작성자</span>
          <span className={dateClassName}>날짜</span>
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
        <span className={idClassName}>번호</span>
        <span className="flex-1">제목</span>
        <span className={wirterClassName}>작성자</span>
        <span className={dateClassName}>날짜</span>
      </li>

      {serverData.dtoList.map((board) => (
        <li key={board.id}
        className="flex cursor-pointer border-b border-gray-200 px-2 py-2 hover:bg-gray-50"
        onClick={() => onClickTitle(board.id)}>

          <span className={`${idClassName} text-gray-600`}>
            {board.id}
          </span>

          <span className="flex-1 text-black">
            {board.title} 
          </span>

          <span className={`${wirterClassName} text-gray-600`}>
            {!booltype ? board.writer : '운영자'}
          </span>

          <span className={`${dateClassName} text-gray-600`}>
            {dayjs(board.createDate).format('YYYY-MM-DD')}
          </span>
        </li>
      ))}
    </>
  )
}

export function InputDetail({ board, handleChangeBoard, uploadRef, handleClickAdd }) {
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
          <CKEditor editor={ClassicEditor} style={{ minHeight: "200px" }} placeholder="내용" rows={8} data={board.content} onChange={(_, editor) => { handleChangeBoard({ target: { name: "content", value: editor.getData() } }) }}
          />
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

export function OutputModify({ board, handleChangeBoard, uploadRef, handleClickModify, deleteOldImages, getFileUrl }) {
  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <h1 className="mb-6 text-2xl font-semibold">글 수정</h1>

      <div className="space-y-5 rounded-2xl bg-white p-6 shadow">
        <div className="space-y-2">
          <label htmlFor="title" className="text-sm font-medium text-gray-700">제목</label>
          <input id="title" type="text" name="title" placeholder="제목" value={board.title} onChange={handleChangeBoard}
            className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2 outline-none transition
            focus:border-indigo-400 focus:bg-white focus:ring-2 focus:ring-indigo-200"/>
        </div>

        <div className="space-y-2">
          <label htmlFor="content" className="text-sm font-medium text-gray-700">내용</label>
          <CKEditor editor={ClassicEditor} style={{ minHeight: "200px" }} placeholder="내용" rows={8} data={board.content} onChange={(_, editor) => { handleChangeBoard({ target: { name: "content", value: editor.getData() } }) }}
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="files" className="text-sm font-medium text-gray-700">파일 첨부</label>
          <input id="files" type="file" multiple ref={uploadRef}
            className="block w-full text-sm text-gray-700
            file:mr-4 file:rounded-xl file:border-0 file:bg-indigo-50 file:px-4 file:py-2 file:text-indigo-700
            hover:file:bg-indigo-100"/>
        </div>

        <div className="flex justify-center">
          <div className="relative mb-4 flex w-full flex-wrap items-stretch">
            <div className="w-1/5 p-6 text-right font-bold">IMAGE</div>
            <div className="w-4/5 justify-center flex flex-wrap items-start">
              {board.uploadFileNames.map((imgFile, i) =>
                <div className="flex justify-center flex-col w-1/3" key={i}>
                  <button className="bg-red-500 text-3xl text-white" onClick={() => deleteOldImages(imgFile)}>DELETE</button>
                  <img alt="img" src={getFileUrl(imgFile)} />
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button type="button" onClick={handleClickModify}
            className="inline-flex items-center rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white shadow
            hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 active:translate-y-px">
            수정 완료
          </button>
        </div>
      </div>
    </div>
  )
}

export function ListToRegister({type}) {
  const { ensureLogin } = useAuthGuard()
  const onClick = () => {
    if (!ensureLogin()) return;
    window.location.replace(`/${type}/add`)
  }
  
  return (
    <button onClick={() => onClick()} className="inline-flex items-center rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white shadow
    hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 active:translate-y-px">
      글 등록
    </button>
  )
}