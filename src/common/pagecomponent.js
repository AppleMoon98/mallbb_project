const PageComponent = ({ serverData, movePage }) => {
  return (
    <div style={{margin: "24px 0", display: "flex", justifyContent: "center",}}>
      {serverData.prev && (<div style={{margin: "8px", padding: "8px", width: "64px", textAlign: "center", fontWeight: "bold", color: "rgb(248,113,113)", cursor: "pointer"}}
          onClick={() => movePage({ page: serverData.prevPage })}>
          Prev
        </div>
      )}
      {serverData.pageNumList.map((pageNum) => (<div key={pageNum} style={{margin: "8px", padding: "8px", width: "48px", textAlign: "center", borderRadius: "6px", boxShadow: "0 1px 3px rgba(0,0,0,0.2)", color: "white", backgroundColor: serverData.current === pageNum ? "gray" : "royalblue", cursor: "pointer",
          }}
          onClick={() => movePage({ page: pageNum })}>
          {pageNum}
        </div>
      ))}
      {serverData.next && (
        <div
          style={{
            margin: "8px", padding: "8px", width: "64px", textAlign: "center", fontWeight: "bold", color: "rgb(248,113,113)", cursor: "pointer",
          }}
          onClick={() => movePage({ page: serverData.nextPage })}
        >
          Next
        </div>
      )}
    </div>
  );
};

export default PageComponent;