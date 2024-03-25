import * as React from "react";
import "./public.css";

const VideoUploadForm = () => {
  const [videoName, setVideoName] = React.useState("");
  const [videoDescription, setVideoDescription] = React.useState("");
  const [coverImage, setCoverImage] = React.useState(null);
  const [videoFile, setVideoFile] = React.useState(null);

  const onSubmitForm = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("videoName", videoName);
    formData.append("videoDescription", videoDescription);
    formData.append("coverImage", coverImage);
    formData.append("videoFile", videoFile);

    try {
      const response = await fetch("http://localhost:3001/upload", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        alert("视频上传成功！");
      } else {
        alert("视频上传失败，请重试！");
      }
    } catch (error) {
      console.error("Error uploading video:", error);
      alert("视频上传失败，请重试！");
    }
  };

  const handleCoverImageChange = (e) => {
    setCoverImage(e.target.files[0]);
  };

  const handleVideoFileChange = (e) => {
    setVideoFile(e.target.files[0]);
  };

  return (
    <div className="container">
      <h1>上传视频</h1>
      <form onSubmit={onSubmitForm}>
        <div className="form-group">
         <label htmlFor="videoName">视频名称</label>
         <input
            type="text"
            id="videoName"
            value={videoName}
            onChange={(e) => setVideoName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
         <label htmlFor="videoDescription">视频简介</label>
         <textarea
            id="videoDescription"
            value={videoDescription}
            onChange={(e) => setVideoDescription(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
         <label htmlFor="coverImage">封面图片</label>
         <input
            type="file"
            id="coverImage"
            accept="image/*"
            onChange={handleCoverImageChange}
          />
          {coverImage ? (
            <img
              className="preview-image"
              src={URL.createObjectURL(coverImage)}
              alt="封面图片"
            />
          ) : (
            <p>选择封面图片</p>
          )}
        </div>
        <div className="form-group">
         <label htmlFor="videoFile">视频文件</label>
         <input
            type="file"
            id="videoFile"
            accept="video/*"
            onChange={handleVideoFileChange}
          />
          {videoFile ? (
           <video
              className="preview-video"
              controls
              src={URL.createObjectURL(videoFile)}
            ></video>
          ) : (
            <p>选择视频文件</p>
          )}
        </div>
       <button type="submit">确认上传</button>
      </form>
    </div>
  );
};

export default VideoUploadForm;