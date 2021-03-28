import React from "react";

const photoList = [];
function PhotoUpload(props) {
  const addPhoto = (photo) => {
    photoList.push(photo);
  };
  return (
    <div className="container bg-white border rounded my-2 p-2">
      <webCameraForm addPhoto={addPhoto} />
      <div className="row">Upload photos:</div>
      <PhotoUpload photoList={photoList} />
    </div>
  );
}

export default PhotoUpload;
