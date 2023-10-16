import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useNavigate, Link } from '@tanstack/react-router';
import { registerUser, loginUser } from '../../lib/api';
import logo from '../../assets/Y_logo.png';
/* import Input from './Input'; ---- planed*/

/** *Sign up form - Register page - @author Cnbergh*/
const Input = ({ type, placeholder, value, onChange, name }) => (
    <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={true}
        minLength={4}
        aria-label={placeholder}
        className="bg-neutral-100 border-2 border-orange-100 text-gray-900 leading-tight tracking-tight sm:text-sm rounded-3xl focus:ring-primary-600 focus:border-primary-600 block w-full min-w-[220px] sm:min-w-[300px] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
    />
);

const SignUpForm = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [showModal, setShowModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState([]);
    const [spin] = useState(false);

    const signUpMutation = useMutation(async ({ username, email, password }) => {
        try {
            const data = await registerUser({ username, email, password });
            localStorage.setItem("jwt", data.accessToken);
            localStorage.setItem("user_email", data.email);
            setShowModal(true);
            setTimeout(async () => {
                setShowModal(false);
                const loginData = await loginUser({ email, password });
                localStorage.setItem("jwt", loginData.accessToken);
                localStorage.setItem("user_email", loginData.email);
                navigate({ to: "/" });
            }, 2500);
        } catch (error) {
            setErrorMessage(prev => [...prev, 'Registration failed']);
        }
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        const { username, email, password, confirmPassword } = formData;
        let errorMessages = [];
        let emailValid = /\S+@\S+\.\S+/.test(email);
        if (password === confirmPassword && emailValid) {
            signUpMutation.mutate({ email, password, username });
        } else {
            if (!emailValid) {
                errorMessages.push('Invalid email.');
            }
            if (password.length < 4) {
                errorMessages.push('Password must be at least 4 characters');
            }
            if (password !== confirmPassword) {
                errorMessages.push('Passwords do not match.');
            }
            setErrorMessage(errorMessages);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div className="p-4 rounded-lg dark:bg-gray-900 md:p-10">
            <div className="flex items-center justify-center">
                <img className={`h-22 sm:h-24 md:h-26 lg:h-28 xl:h-30 my-5 logo dark:invert ${spin ? 'spin' : ''}`} src={logo}></img>
            </div>
            <h1 className="mt-2 mb-5 text-3xl font-bold sm:text-3xl md:text-4xl lg:text-5xl"><p className="text-sm text-white dark:text-gray-700">is</p>Better than X!</h1>
            <div className="w-full mt-1 bg-orange-200 border-2 border-orange-100 rounded-3xl md:mt-2 sm:max-w-md xl:p-1 dark:bg-gray-800 dark:border-gray-700">
                <div className='p-6 space-y-4 sm:space-y-5 md:space-y-7 sm:p-8'>
                    <h2 className="text-xl font-bold sm:text-2xl md:text-3xl lg:text-4xl">Create an Account</h2>
                    {errorMessage && <div className="text-red-600">{errorMessage}</div>}
                    <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6" action="/profile">
                        <Input type="text" name="username" placeholder="Username" value={formData.username} onChange={handleChange} />
                        <Input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
                        <Input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} />
                        <Input type="password" name="confirmPassword" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} />
                        <button type="submit" className="w-full px-4 py-2 my-2 leading-tight tracking-tight text-white bg-blue-500 border-2 border-blue-500 rounded-3xl hover:border-blue-400 shadow-custom">
                            Sign Up
                        </button>
                        <p className="text-xs font-light leading-tight tracking-tight text-gray-700 sm:text-sm dark:text-gray-400">
                            Already have an account? <Link to={`/login`} className="font-medium text-primary-600 hover:underline hover:text-indigo-500 dark:text-primary-500">Sign In</Link>
                        </p>
                    </form>
                </div>
                {showModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                        <div className="w-auto p-4 mt-1 text-white bg-blue-500 border-2 border-blue-400 modal-content px rounded-3xl md:mt-2 sm:max-w-md xl:p-3">
                            <h2 className="text-2xl font-bold leading-tight tracking-tight">Hi {formData.username}!</h2>
                            <p className="mt-2 text-base leading-tight tracking-tight">Welcome and thank you for signing up!</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
export default SignUpForm;