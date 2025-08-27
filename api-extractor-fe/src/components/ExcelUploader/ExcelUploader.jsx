import * as XLSX from "xlsx";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import "./ExcelUploader.scss";
import { addExcelList } from "../../services/excelService";

export default function ExcelUploader({onClear}) {
  const [status, setStatus] = useState("");

  const mutation = useMutation({
    mutationFn: (req) => addExcelList(req),
    onSuccess: (data) => {
      onClear();
      setStatus("✅ Excel uploaded successfully!");
    },
    onError: () => {
      setStatus("❌ Error uploading data");
    },
  });

  const handleFile = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const data = await file.arrayBuffer();
    const workbook = XLSX.read(data, { type: "array" });
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const jsonData = XLSX.utils.sheet_to_json(sheet);
    const req = {
      id: Math.random(),
      name: file.name,
      sheetName: workbook.SheetNames[0],
      rows: jsonData,
      uploadedAt: new Date()?.toISOString(),
    }    
    mutation.mutate(req);
  };

  return (
    <div className="excel-uploader">
      <h2>Upload Excel</h2>
      <label className="upload-btn">
        <input type="file" accept=".xlsx,.xls" onChange={handleFile} hidden />
        Choose File
      </label>
      {status && <p className="status">{status}</p>}
    </div>
  );
}
