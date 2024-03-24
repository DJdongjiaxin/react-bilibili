import * as React from "react";
import './Login.css';
import { login, register } from "../../api/up-user";
const {
    useState,
    useEffect
} = React;
const Login: React.FC = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [usernameOrNumber, setUsernameOrNumber] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [number, setNumber] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    React.useEffect(() => {
        const eyeUser = localStorage.getItem('eyeUser');
        if (eyeUser) {
            // 如果本地存储中有 eyeUser，跳转到 /space 页面
            window.location.href = '/space';
        }
    }, [])
    const handleLogin = (number, password) => {
        login(number, password).then((result) => {
            console.log(JSON.stringify(result) + "####");
            if (result.code === 0) {
                console.log(JSON.stringify(result.data));
                localStorage.setItem('eyeUser', JSON.stringify(result.data));
                setErrorMessage('');
                window.location.href = '/space';
            } else {
                setErrorMessage(result.msg);
            }
        });
    }
    const handleRegister = (username, number, password) => {
        register(username, number, password).then((result) => {
            console.log(JSON.stringify(result) + "####");
            if (result.code === 0) {
                console.log(JSON.stringify(result.data));
                setErrorMessage('');
            } else {
                setErrorMessage(result.msg);
            }
        });
    }

    const handleSwitchMode = () => {
        setIsLogin(!isLogin);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (isLogin) {
            // 处理登录操作
            if (usernameOrNumber === '' || password === '') {
                setErrorMessage('请填写用户名/手机号和密码！');
            } else {
                console.log('Username/Phone:', usernameOrNumber, 'Password:', password);
                handleLogin(usernameOrNumber, password);

            }
        } else {
            // 处理注册操作
            if (username === '' || number === '' || password === '' || confirmPassword === '') {
                setErrorMessage('请填写所有必填字段！');
            } else if (password !== confirmPassword) {
                setErrorMessage('密码和确认密码不匹配！');
            } else {
                console.log('Username:', username, 'Number:', number, 'Password:', password, 'Confirm Password:', confirmPassword);
                handleRegister(username, number, password);
                // setErrorMessage('');
                // 在此处执行注册逻辑
            }
        }
    };

    return (
        <div className="login-page">
            <h1>{isLogin ? '登录' : '注册'}</h1>
            <form onSubmit={handleSubmit}>
                <div className="input-group">
                    <label htmlFor="usernameOrNumber">{isLogin ? '用户名/手机号：' : '用户名：'}</label>
                    <input
                        type={isLogin ? 'text' : 'text'}
                        id="usernameOrNumber"
                        value={isLogin ? usernameOrNumber : username}
                        onChange={(e) => (isLogin ? setUsernameOrNumber(e.target.value) : setUsername(e.target.value))}
                    />
                </div>
                {
                    !isLogin && (
                        <div className="input-group">
                            <label htmlFor="password">手机号：</label>
                            <input
                                type="password"
                                id="password"
                                value={number}
                                onChange={(e) => (setNumber(e.target.value))}
                            />
                        </div>
                    )
                }
                <div className="input-group">
                    <label htmlFor="password">密码：</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => (setPassword(e.target.value))}
                    />
                </div>
                {!isLogin && (
                    <div className="input-group">
                        <label htmlFor="confirmPassword">确认密码：</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </div>
                )}
                <div className="button-group">
                    <button type="submit">{isLogin ? '登录' : '注册'}</button>
                    <button type="button" onClick={handleSwitchMode}>
                        {isLogin ? '注册' : '登录'}
                    </button>
                </div>
                {errorMessage && <div className="error-message">{errorMessage}</div>}
            </form>
        </div>
    );
};

export default Login;