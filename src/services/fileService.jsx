import http from '../services/httpService';
import { apiUrl } from "../config/config.json";


const apiEndpoint =  "/files";
const apiFileDownload = apiEndpoint + "/download";
const apiFileUpload = apiEndpoint + "/upload";

export function upload(formData) {
  return http.post(apiFileUpload, formData);
}

export function download(fileName) {
  return http.get(apiFileDownload,{
          responseType: 'blob'}
        ).then(response => {
          return response.data
        },function(err){
    　　　　console.log(err)
    　　});
}
