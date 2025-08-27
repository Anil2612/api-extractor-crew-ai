import { useEffect, useState } from "react";
import "./ExcelList.scss";
import { getExcelList } from "../../services/excelService";
import { useQuery } from "@tanstack/react-query";

export default function ExcelList({ onSelect, onClear }) {
  const [excels, setExcels] = useState([]);
  const [selectedExcel, setSelectedExcel] = useState(null);

  const { data, error, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: getExcelList,
  });

  useEffect(() => {
    setExcels(data?.data || []);
  }, [data]);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this Excel?")) {
      // await deleteDoc(doc(db, "excelData", id));
      onClear();
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
          <li key={excel.id} className={`${selectedExcel?.id === excel.id && 'selected-file-name'}`}>
            <span className={`file-name`} onClick={() => selectExcelEvent(excel)}>
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
