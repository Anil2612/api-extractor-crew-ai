import { useEffect, useState } from "react";
import "./ExcelList.scss";
import { deleteExcelList } from "../../services/excelService";
import { useMutation, useQuery } from "@tanstack/react-query";

export default function ExcelList({ onSelect, onClear, data }) {
  const [excels, setExcels] = useState([]);
  const [selectedExcel, setSelectedExcel] = useState(null);

  useEffect(() => {
    setExcels(data?.data || []);
  }, [data]);

  const mutation = useMutation({
    mutationFn: (req) => deleteExcelList(req),
    onSuccess: (data) => {
      onClear();
    },
    onError: () => {
    },
  });

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this Excel?")) {
      mutation.mutate({ doc_id: id });
    }
  };

  const selectExcelEvent = (excel) => {
    onSelect(excel);
    setSelectedExcel(excel);
  };

  return (
    <div className="excel-list">
      <h2>Uploaded Excels</h2>
      <ul>
        {excels.map((excel) => (
          <li
            key={excel.id}
            className={`${
              selectedExcel?.id === excel.id && "selected-file-name"
            }`}
          >
            <span
              className={`file-name`}
              onClick={() => selectExcelEvent(excel)}
            >
              📄 {excel.name}
            </span>
            <button
              className="delete-btn"
              onClick={() => handleDelete(excel.id)}
            >
              ❌
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
