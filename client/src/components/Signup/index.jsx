import styles from "./styles.module.css";
import { Link , useNavigate} from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios'; //axios is a promise based HTTP client for the browser and node.js

const Signup = () => {

    const [data, setData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
    });

    const navigate = useNavigate();
    const [errors, setErrors] = useState("");

    const handleChange = ({currentTarget:input}) => { 
        setData({...data, [input.name]: input.value});
    };

    const handleSubmit = async(e) => { 
        e.preventDefault();
        console.log(data);
        try {
            const url = 'http://localhost:5000/api/users';
            const { data: res } = await axios.post(url, data);
            navigate('/login');
            console.log(res.message);
        } catch (error) {
            if (error.response &&
                error.response.status >= 400 &&
                error.response.status <= 500) {
                setErrors(error.response.data.message);
            }
        }
    };

    return (
        <div className={styles.signup_container}>
            <div className={styles.signup_form_container}>
                <div className={styles.left}>
                    <h1>Welcome Back</h1>
                    <Link to="/login">
                        <button type='button' className={styles.white_btn}>Sign in</button>
                    </Link>
                </div>

                <div className={styles.right}>
                    <form className={styles.form_container} onSubmit={handleSubmit}>
                        <h1>Create Account</h1>
                        <input
                            type="text"
                            placeholder="First Name"
                            name='firstName'
                            value={data.firstName}
                            required
                            className={styles.input}
                            onChange={handleChange}
                        />

                        <input
                            type="text"
                            placeholder="Last Name"
                            name='lastName'
                            value={data.lastName}
                            required
                            className={styles.input}
                            onChange={handleChange}
                        />

                        <input
                            type="email"
                            placeholder="Email"
                            name='email'
                            value={data.email}
                            required
                            className={styles.input}
                            onChange={handleChange}
                        />

                        <input
                            type="password"
                            placeholder="Password"
                            name='password'
                            value={data.password}
                            required
                            className={styles.input}
                            onChange={handleChange}
                        />
                        
                        {errors &&
                            <div className={styles.error}>
                                {errors}
                            </div>
                        }

                        <button type='submit' className={styles.green_btn}>Sign up</button>
                    </form>
                </div>
            </div>
        </div>
    );
};


export default Signup;