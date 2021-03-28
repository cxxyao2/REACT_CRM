import React, { useState } from "react";
import PDFSave from "./PDFPrint/PDFSave";
import { saveBlobtoLocalFile, makeCSV } from "../utils/fileTypeConvert";

function FileDownload({
  fileName,
  subtitle,
  initData,
  pdfContent,
  pageCount,
  fieldsString,
}) {
  const [fileType, setFileType] = useState("csv");
  const [loading, setLoading] = useState(false);

  const fileTypes = ["CSV", "PDF", "JSON"];

  const downloadCSVFile = () => {
    if (!(initData && initData.length >= 1)) return;
    let output = [];
    const fields = Object.keys(initData[0]);
    output.push(fields);
    initData.forEach((row) => {
      let rowData = [];
      for (const [key, value] of Object.entries(row)) {
        rowData.push(value);
      }
      output.push(rowData);
    });
    const csvFileData = makeCSV(output);
    saveBlobtoLocalFile(csvFileData, fileName + ".csv", "text/csv");
  };

  const handleClick = () => {
    if (!(initData && initData.length >= 1)) return;
    switch (fileType) {
      case "CSV":
        // 下载开始
        setLoading(true);
        downloadCSVFile();
        setTimeout(() => {
          // 下载完毕
          setLoading(false);
        }, 1000);
        break;
      case "JSON":
        // 下载开始
        setLoading(true);
        let content = JSON.stringify(initData, null, 2);
        saveBlobtoLocalFile(content, fileName + ".json", "text/json");
        setTimeout(() => {
          // 下载完毕
          setLoading(false);
        }, 1000);
        break;
      default:
        break;
    }
  };

  return (
    <div className="row g-1 mt-2 ">
      {fileTypes.map((fileType, index) => (
        <div className="col-12 col-md-3" key={fileType}>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="fileType"
              id={"typeRadio".concat(index)}
              value={fileType}
              onClick={() => {
                setFileType(fileType);
              }}
            />
            <label
              className="form-check-label"
              htmlFor={"typeRadio".concat(index)}
            >
              {fileType}
            </label>
          </div>
        </div>
      ))}
      <div className="col-12 col-md-3">
        {fileType === "PDF" && (
          <span>
            <PDFSave
              subtitle={subtitle}
              content={pdfContent}
              fileName={fileName + ".pdf"}
              pageCount={pageCount}
              fieldsString={fieldsString}
            />
          </span>
        )}
        {(fileType === "CSV" || fileType === "JSON") && (
          <span
            className="text-primary text-decoration-underline"
            onClick={handleClick}
          >
            {loading ? "Loading..." : "Download"}
          </span>
        )}
      </div>
    </div>
  );
}

export default FileDownload;
