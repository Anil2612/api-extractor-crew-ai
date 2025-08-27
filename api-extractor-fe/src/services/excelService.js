import { getData, postData } from "../provider/apiProvider";


const getExcelList = async () => {
  return getData("/list").then((data) => data || []);
};

const addExcelList = async (body) => {
  return postData("/upload", body).then((data) => data);
};

const sendMessageAPI = async (body) => {
  return postData("/getDetails", body).then((data) => data);
}

const deleteExcelList = async (body) => {
  return postData("/delete", body).then((data) => data);
}

export { getExcelList, sendMessageAPI, addExcelList, deleteExcelList};
