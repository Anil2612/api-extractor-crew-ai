import { Navigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode";

export default function ProtectedRoute({ children }) {
  const ackTk = localStorage.getItem("ack-tk") ? jwtDecode(localStorage.getItem("ack-tk")) : null;
  return ackTk?.email === localStorage.getItem('currentUser') ? children : <Navigate to="login" />;
}
