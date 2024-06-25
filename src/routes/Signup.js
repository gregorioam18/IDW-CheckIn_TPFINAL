import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import validation from './SignupValidation';

function Signup() {
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: ''
    });

    const [error, setError] = useState({});

    const handleInput = (event) => {
        setValues(prev => ({...prev, [event.target.name]: event.target.value}));
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const errors = validation(values);
        setError(errors);
        if (Object.keys(errors).length === 0) {
            // Aquí puedes enviar los datos del formulario si no hay errores
            console.log("Formulario válido. Datos enviados:", values);
        }
    }

    return (
        <div className='d-flex justify-content-center align-items-center bg-primary vh-100'>
            <div className='bg-white p-3 rounded w-25'>
                <h2 className='text-center'>Crear cuenta</h2>
                <form onSubmit={handleSubmit}>
                    <div className='mb-3'>
                        <label htmlFor="name">Nombre</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            placeholder='Ingrese su Nombre'
                            className='form-control rounded-0'
                            onChange={handleInput}
                            value={values.name}
                        />
                        {error.name && <span className='text-danger'>{error.name}</span>}
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="email">Correo</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder='Ingrese su correo'
                            className='form-control rounded-0'
                            onChange={handleInput}
                            value={values.email}
                        />
                        {error.email && <span className='text-danger'>{error.email}</span>}
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="password">Contraseña</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder='Ingrese su contraseña'
                            className='form-control rounded-0'
                            onChange={handleInput}
                            value={values.password}
                        />
                        {error.password && <span className='text-danger'>{error.password}</span>}
                    </div>
                    <button className='btn btn-success w-100 rounded-0' type="submit">Crear cuenta</button>
                    <p>Ya tiene cuenta, click abajo</p>
                    <Link to="/login" className='btn btn-default border w-100 text-decoration-non' type="button">Ingresar</Link>
                </form>
            </div>
        </div>
    );
}

export default Signup;
