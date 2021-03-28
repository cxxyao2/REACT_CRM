import React, { useState, useEffect, useRef } from "react";
import Webcam from "react-webcam";
import { useSelector } from "react-redux";

import * as fileService from "../services/fileService";
import { base64ToBlob } from "../utils/fileTypeConvert";
import { dateYMDnoBlank } from "../utils/dateFormat";
import { saveItinerary } from "../services/itineraryservice";

const WebCameraForm = (props) => {
  const customers = useSelector((state) => state.entities.clients);

  const { user, visitStart } = props;
  const webcamRef = useRef(null);
  const [imgSrc, setImgSrc] = useState(null);
  const [uploadResult, setUploadResult] = useState(undefined);
  const [customerList, setCustomerList] = useState(undefined);

  useEffect(() => {
    setCustomerList(customers);
  }, [customers]);

  const handleFileUpload = async (e) => {
    e.preventDefault();
    if (!imgSrc) {
      alert("Please take a photo firstly");
      return;
    }
    if (!customerList || customerList.length < 1) {
      alert("Please select a customer firstly!");
      return;
    }

    let customer = customerList[0];

    const formData = new FormData();
    // fileName: yyyymmdd (Userid last 5 numbers)(Client 5 number) .jpeg,e,g 20210301abcedabced.jpeg
    const fileName =
      dateYMDnoBlank(new Date())
        .concat(user._id.slice(-5))
        .concat(customer._id.slice(-5)) + ".jpeg";
    formData.append("myFile", base64ToBlob(imgSrc, "jpeg"), fileName);

    fileService
      .upload(formData)
      .then((result) => {
        console.log("phot update is ", result);
        if (result && result.data && result.status === 200) {
          setUploadResult({ uploaded: true, message: result.data.message });
        }
        let itinerary = {
          salesmanId: user._id,
          customerId: customer._id,
          visitStart: visitStart,
          photoName: fileName,
        };

        saveItinerary(itinerary)
          .then((result) => {
            if (result && result.data && result.status === 200) {
              // setUploadResult({ uploaded: true, message: result.data.message });
              // setImgSrc(null);
            }
          })
          .catch((err) => {
            if (err.response && err.response.status === 400) {
              setUploadResult({ uploaded: false, message: err.response.data });
            } else {
              setUploadResult({
                uploaded: false,
                message: JSON.stringify(err),
              });
            }
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // const capture = React.useCallback(() => {
  //   const imageSrc = webcamRef.current.getScreenshot({});
  //   // getScreenshot({width: 1920, height: 1080});
  //   setImgSrc(imageSrc);
  //   setUploadResult(undefined);
  // }, [webcamRef, setImgSrc]);

  const capture = (e) => {
    e.preventDefault();
    const imageSrc = webcamRef.current.getScreenshot({});
    // getScreenshot({width: 1920, height: 1080});
    setImgSrc(imageSrc);
    setUploadResult(undefined);
  };

  return (
    <div className="container bg-white border rounded my-2 p-2">
      <div className="row row-cols-1 row-cols-md-2 g-1">
        <form>
          <fieldset>
            <legend>Take a photo and Upload</legend>
            <div className="col rounded overflow-hidden">
              <div>
                <Webcam
                  className="cameraFrom_photo"
                  audio={false}
                  ref={webcamRef}
                  style={{
                    width: "100%",
                    maxHeight: "200px",
                    border: "1px solid blue",
                    borderRadius: "10px",
                  }}
                  screenshotFormat="image/jpeg"
                />
                <button className="btn btn-sm btn-info" onClick={capture}>
                  Capture photo
                </button>
              </div>
              <div className="col rounded overflow-hidden">
                {!imgSrc && <div>Please take a photo ...</div>}
                {imgSrc && (
                  <img src={imgSrc} alt="result" className="cameraFrom_photo" />
                )}
                <button
                  className="btn btn-sm btn-warning my-1"
                  onClick={handleFileUpload}
                >
                  Upload Photo
                </button>
                {uploadResult && (
                  <div
                    className={"alert alert-".concat(
                      uploadResult.uploaded ? "success" : "danger"
                    )}
                  >
                    {uploadResult.message}
                  </div>
                )}
              </div>
            </div>
          </fieldset>
        </form>
      </div>
    </div>
  );
};

export default WebCameraForm;
