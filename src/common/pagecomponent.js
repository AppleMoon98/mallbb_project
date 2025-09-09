const PageComponent = ({ serverData, movePage }) => {
  return (
    <div className="my-6 flex justify-center">
      {serverData.prev && (
        <div
          className="m-2 w-16 p-2 text-center font-bold text-red-400 cursor-pointer"
          onClick={() => movePage({ page: serverData.prevPage })}
        >
          Prev
        </div>
      )}

      {serverData.pageNumList?.map((pageNum) => (
        <div
          key={pageNum}
          className={`m-2 w-12 p-2 text-center rounded-md shadow text-white cursor-pointer ${
            serverData.current === pageNum ? 'bg-gray-500' : 'bg-blue-600'
          }`}
          onClick={() => movePage({ page: pageNum })}
        >
          {pageNum}
        </div>
      ))}

      {serverData.next && (
        <div
          className="m-2 w-16 p-2 text-center font-bold text-red-400 cursor-pointer"
          onClick={() => movePage({ page: serverData.nextPage })}
        >
          Next
        </div>
      )}
    </div>
  );
};

export default PageComponent;
