// pages/register.js

import RegistrationForm from "@/components/registration-form.component";

const Register = () => {
    // @ts-ignore
    const handleRegistration = (data) => {
        console.log('Registration data:', data);
        // Добавьте свою логику для обработки регистрации
    };

    return (
        <div>
            <h1>Registration</h1>
            <RegistrationForm />
        </div>
    );
};

export default Register;
