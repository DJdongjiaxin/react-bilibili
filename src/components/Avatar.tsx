import * as React from "react";

const Avatar = () => {
  const [avatarUrl, setAvatar] = React.useState("");
  React.useEffect(() => {
    const eyeUser = localStorage.getItem('eyeUser');
    if (eyeUser) {
      setAvatar(JSON.parse(localStorage.getItem('eyeUser'))[0].avatar);
    }
  }, [])
  if (avatarUrl) {
    return (
      <img src={`http://localhost:3011/${avatarUrl}`} alt="" style={{
        width: "100%",
        height: "100%",
        objectFit: "cover",
      }}/>
    )
  }
  return (
    <svg data-name="\u56FE\u5C42 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80">
      <title>default avatar</title>
      <path fill="#e7e7e7" d="M0 0h80v80H0z" />
      <path d="M45.78 57.73h2.29a73.4 73.4 0 0 1 4.23 9.5 57.14 57.14 0 0 1 2.62 10.5
        50.58 50.58 0 0 1-29.86 0 57.14 57.14 0 0 1 2.62-10.5 73.4 73.4 0 0 1 4.23-9.5h2.29l2.67
        7.21 2.41-7.21h1.42l2.41 7.21zM31.72 18.51l4.87 4.87a1.8 1.8 0 0 1 0 2.55 1.8 1.8 0 0 1-2.55
        0l-4.87-4.87a1.8 1.8 0 0 1 0-2.55 1.8 1.8 0 0 1 2.55 0zM48.57 18.51a1.8 1.8 0 0 1 2.55 0 1.8
          1.8 0 0 1 0 2.55l-4.87 4.87a1.8 1.8 0 0 1-2.55 0 1.8 1.8 0 0 1 0-2.55z" fill="#ccc" />
      <path data-name="Combined-Shape" d="M24.2 24.22h31.6a7.2 7.2 0 0 1 7.2 7.2v20.12a7.2 7.2 0
        0 1-7.2 7.2H24.2a7.2 7.2 0 0 1-7.2-7.2V31.42a7.2 7.2 0 0 1 7.2-7.2zm1 4a4.24 4.24 0 0 0-4.2
        4.29v17.94a4.24 4.24 0 0 0 4.21 4.27h29.5A4.24 4.24 0 0 0 59 50.45V32.51a4.24 4.24 0 0
        0-4.21-4.27z" fill="#ccc" />
      <path data-name="Combined-Shape" d="M25.88 29.84h28.24a3.22 3.22 0 0 1 3.22 3.21v16.86a3.22 3.22
        0 0 1-3.22 3.21H25.88a3.22 3.22 0 0 1-3.22-3.21V33.05a3.22 3.22 0 0 1 3.22-3.21zm0 .8a2.42 2.42
        0 0 0-2.42 2.41v16.86a2.42 2.42 0 0 0 2.42 2.41h28.24a2.42 2.42 0 0 0 2.42-2.41V33.05a2.42 2.42
          0 0 0-2.42-2.41z" fill="#ccc" />
      <path data-name="Combined-Shape" d="M26.73 40.1l7-3.1a1.81 1.81 0 1 1 1.48 3.3l-7 3.1a1.81 1.81 0
        1 1-1.48-3.3zM53.27 40.1a1.81 1.81 0 1 1-1.48 3.3l-7-3.1a1.81 1.81 0 1 1 1.48-3.3zM37.58 47.9c-1
        0-1.9-.7-2.7-2a.8.8 0 0 1 .26-1.11.81.81 0 0 1 1.11.26c.54.86 1 1.23 1.33 1.23s.79-.37 1.33-1.23a.81.81
          0 0 1 1.37 0c.54.86 1 1.23 1.33 1.23s.79-.37 1.33-1.23a.81.81 0 0 1 1.11-.26.8.8 0 0 1 .26 1.11c-.8
          1.28-1.69 2-2.7 2a2.71 2.71 0 0 1-2-1.06 2.71 2.71 0 0 1-2.03 1.06z" fill="#ccc" />
    </svg>
  );
}

export default Avatar;
