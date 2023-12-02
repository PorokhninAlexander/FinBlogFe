// pages/login.js


import LoginForm from "@/components/login-form.component";

const Login = () => {
    // @ts-ignore
    const handleLogin = (data) => {
        console.log('Login data:', data);
        // Добавьте свою логику для обработки логина
    };

    return (
        <div>
            <LoginForm />
        </div>
    );
};

export default Login;
