import { useState } from "react";
import ExcelUploader from "../../components/ExcelUploader/ExcelUploader";
import ChatScreen from "../../components/ChatScreen/ChatScreen";
import ExcelList from "../../components/ExcelList/ExcelList";
import ExcelViewer from "../../components/ExcelViewer/ExcelViewer";
import "./Landing.scss";
import { getExcelList } from "../../services/excelService";
import { useQuery } from "@tanstack/react-query";

export default function Landing({ onLogout }) {
  const [selectedExcel, setSelectedExcel] = useState(null);

  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ["ExcelList"],
    queryFn: getExcelList,
  });

  const clearEvent = () => {
    setSelectedExcel(null);
    refetch();
  };

  return (
    <div className="landing-page">
      <header>
        <h1>Dashboard</h1>
        <button onClick={onLogout}>Logout</button>
      </header>

      <div className="dashboard">
        <div className="left-col">
          <div className="box box1">
            <ExcelUploader onClear={() => clearEvent()}/>
          </div>
          <div className="box box2">
            <ExcelList
              data={data}
              onSelect={setSelectedExcel}
              onClear={() => clearEvent()}
            />
          </div>
        </div>

        <div className="box box3">
          <ExcelViewer
            selectedExcel={selectedExcel}
            onClear={() => clearEvent()}
          />
        </div>

        <div className="box box4">
          <ChatScreen selectedExcel={selectedExcel} />
        </div>
      </div>
    </div>
  );
}
