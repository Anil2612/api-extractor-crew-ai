import { useMutation } from "@tanstack/react-query";
import "./ExcelViewer.scss";
import { deleteExcelList } from "../../services/excelService";

export default function ExcelViewer({ selectedExcel, onClear }) {
  if (!selectedExcel) {
    return (
      <div className="excel-viewer">
        <h2>Excel Contents</h2>
        <p>Select a file from the list to view its data</p>
      </div>
    );
  }

  const mutation = useMutation({
    mutationFn: (req) => deleteExcelList(req),
    onSuccess: (data) => {
      onClear();
    },
    onError: () => {},
  });

  const handleDelete = async () => {
    if (window.confirm("Delete this Excel file?")) {
      mutation.mutate({ doc_id: selectedExcel.id });
    }
  };

  return (
    <div className="excel-viewer">
      <div className="header">
        <h2>{selectedExcel.name}</h2>
        <button className="delete-btn" onClick={handleDelete}>
          Delete
        </button>
      </div>
      <div>
        <pre className="table-wrapper">
          {JSON.stringify(selectedExcel.rows, null, 2)}
        </pre>
      </div>
    </div>
  );
}
