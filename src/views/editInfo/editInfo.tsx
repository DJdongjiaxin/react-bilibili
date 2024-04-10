import * as React from "react";
import "./editInfo.css";

const EditForm = () => {
    const [username, setUsername] = React.useState("");
    const [signature, setSignature] = React.useState("");
    const [avatar, setAvatar] = React.useState(null);
    const coverImageRef = React.useRef(null);
    const getResult = () => {
        const formData = new FormData();
        formData.append("username", username);
        formData.append("signature", signature);
        formData.append("uid", JSON.parse(localStorage.getItem('eyeUser'))[0].id)
        if (avatar) {
            formData.append("avatar", coverImageRef.current, avatar.name);
        }
        fetch("http://localhost:3011/user/uploadInfo", {
            method: "POST",
            body: formData
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error(response.statusText);
            })
            .then((data) => {
                console.log("Video uploaded successfully:", data);
            })
            .catch((error) => {
                console.error("Error uploading video:", error);
            });

    }
    const onSubmitForm = async (e) => {
        e.preventDefault();
        try {
            getResult();
        } catch (error) {
            console.error("Error uploading video:", error);
            alert("视频上传失败，请重试！");
        }
    };

    const handleAvatarChange = (e) => {
        const selectedImage = e.target.files[0];
        console.log("Selected cover image:", selectedImage);
        setAvatar(selectedImage);
        coverImageRef.current = selectedImage;
    };


    return (
        <div className="container">
            <h1>编辑个人信息</h1>
            <form onSubmit={onSubmitForm}>
                <div className="form-group">
                    <label htmlFor="videoName">昵称</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="videoDescription">个性签名</label>
                    <textarea
                        id="videoDescription"
                        value={signature}
                        onChange={(e) => setSignature(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="coverImage">用户头像</label>
                    <input
                        type="file"
                        id="avatar"
                        accept="image/*"
                        onChange={handleAvatarChange}
                    />
                    {avatar ? (
                        <img
                            className="preview-image"
                            src={URL.createObjectURL(avatar)}
                            alt="头像"
                        />
                    ) : (
                        <p>选择用户头像</p>
                    )}
                </div>
                <button type="submit">确认修改</button>
            </form>
        </div>
    );
};

export default EditForm;