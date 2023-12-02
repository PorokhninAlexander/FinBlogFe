// components/LoginForm.js

import { useForm } from 'react-hook-form';
import Link from 'next/link';
import axios from "axios";
import { useRouter } from 'next/router';
import {useEffect} from "react";  // Импорт из 'next/router'

// @ts-ignore
const LoginForm = () => {
    const { register, handleSubmit } = useForm();
    const router = useRouter();  // Использование useRouter

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (token) {
            router.replace('/articles');
        }
    }, []);
    // @ts-ignore
    const onSubmit = async (data) => {
        try {
            const response = await axios.post('http://localhost:8080/auth/login', data);
            console.log('Login successful:', response.data);
            const token = response.data.token; // Предполагаем, что сервер возвращает токен

            // Сохранение токена в localStorage
            localStorage.setItem('token', token);
            await router.push('/articles')
        } catch (error) {
            // @ts-ignore
            console.log('Login failed:', error.message);

        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="auth-form">
            <h2>Login</h2>
            <label>
                Email:
                <input {...register('email', { required: true })} type="email" />
            </label>
            <label>
                Password:
                <input {...register('password', { required: true })} type="password" />
            </label>
            <button type="submit">Login</button>

            <p>
                {/* eslint-disable-next-line react/no-unescaped-entities */}
                Don't have an account?{' '}
                <Link href="/register">Register</Link>
            </p>

            <style jsx>{`
        .auth-form {
          max-width: 400px;
          margin: 0 auto;
          padding: 20px;
          border: 1px solid #ddd;
          border-radius: 8px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }

        h2 {
          text-align: center;
          color: #333;
        }

        label {
          display: block;
          margin: 15px 0;
          color: #555;
        }

        input {
          width: 100%;
          padding: 10px;
          margin-top: 5px;
          border: 1px solid #ccc;
          border-radius: 4px;
          box-sizing: border-box;
        }

        button {
          width: 100%;
          background-color: #0070f3;
          color: white;
          padding: 12px;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }

        p {
          margin-top: 15px;
          text-align: center;
        }

        p a {
          color: #0070f3;
          text-decoration: underline;
          cursor: pointer;
        }
      `}</style>
        </form>
    );
};

export default LoginForm;
