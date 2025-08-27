import { useState } from "react";
import ExcelUploader from "../../components/ExcelUploader/ExcelUploader";
import ChatScreen from "../../components/ChatScreen/ChatScreen";
import ExcelList from "../../components/ExcelList/ExcelList";
import ExcelViewer from "../../components/ExcelViewer/ExcelViewer";
import "./Landing.scss";

export default function Landing({ onLogout }) {
  const [selectedExcel, setSelectedExcel] = useState(null);

  return (
    <div className="landing-page">
      <header>
        <h1>Dashboard</h1>
        <button onClick={onLogout}>Logout</button>
      </header>

      <div className="dashboard">
        <div className="left-col">
          <div className="box box1">
            <ExcelUploader />
          </div>
          <div className="box box2">
            <ExcelList
              onSelect={setSelectedExcel}
              onClear={() => setSelectedExcel(null)}
            />
          </div>
        </div>

        <div className="box box3">
          <ExcelViewer
            selectedExcel={selectedExcel}
            onClear={() => setSelectedExcel(null)}
          />
        </div>

        <div className="box box4">
          <ChatScreen selectedExcel={selectedExcel}/>
        </div>
      </div>
    </div>
  );
}
