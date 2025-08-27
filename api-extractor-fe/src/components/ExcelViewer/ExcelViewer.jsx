import "./ExcelViewer.scss";

export default function ExcelViewer({ selectedExcel, onClear }) {
  if (!selectedExcel) {
    return (
      <div className="excel-viewer">
        <h2>Excel Contents</h2>
        <p>Select a file from the list to view its data</p>
      </div>
    );
  }

  const handleDelete = async () => {
    if (window.confirm("Delete this Excel file?")) {
      onClear(); // clear the viewer after delete
    }
  };

  return (
    <div className="excel-viewer">
      <div className="header">
        <h2>{selectedExcel.name}</h2>
        <button className="delete-btn" onClick={handleDelete}>Delete</button>
      </div>
      <div>
        <pre className="table-wrapper">
          {JSON.stringify(selectedExcel.rows, null, 2)}
        </pre>
      </div>
    </div>
  );
}
