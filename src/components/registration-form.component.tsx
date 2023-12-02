// components/RegistrationForm.js

import { useForm } from 'react-hook-form';
import Link from 'next/link';
import axios from "axios";
import {useRouter} from "next/router";
import {useEffect} from "react";

// @ts-ignore
const RegistrationForm = () => {
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
            // Отправка данных на сервер
            const response = await axios.post('http://localhost:8080/auth/register', data);
            console.log('Registration successful:', response.data);
            const token = response.data.token; // Предполагаем, что сервер возвращает токен

            // Сохранение токена в localStorage
            localStorage.setItem('token', token);
            // Добавьте свою логику для обработки успешной регистрации
            await router.push('/articles')
        } catch (error) {
            // @ts-ignore
            console.error('Registration failed:', error.message);
            // Добавьте свою логику для обработки ошибки регистрации
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="auth-form">
            <h2>Registration</h2>
            <label>
                First Name:
                <input {...register('firstName', { required: true })} />
            </label>
            <label>
                Last Name:
                <input {...register('lastName', { required: true })} />
            </label>
            <label>
                Email:
                <input {...register('email', { required: true })} type="email" />
            </label>
            <label>
                Password:
                <input {...register('password', { required: true })} type="password" />
            </label>
            <button type="submit">Register</button>

            <p>
                Already have an account?{' '}
                <Link href="/login">Login</Link>
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

export default RegistrationForm;
