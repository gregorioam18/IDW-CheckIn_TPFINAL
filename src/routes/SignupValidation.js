function validation(values) {
    let error = {};

    const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const password_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/;

    if (!values.name) {
        error.name = "El correo electrónico no puede estar vacío";
    } else if (!email_pattern.test(values.email)) {
        error.name = "El correo electrónico no es válido";
    } else {
        error.name = "";
    }

    if (!values.email) {
        error.email = "El correo electrónico no puede estar vacío";
    } else if (!email_pattern.test(values.email)) {
        error.email = "El correo electrónico no es válido";
    } else {
        error.email = "";
    }

    if (!values.password) {
        error.password = "La contraseña no puede estar vacía";
    } else if (!password_pattern.test(values.password)) {
        error.password = "La contraseña no cumple con los requisitos de seguridad";
    } else {
        error.password = "";
    }

    return error;
}

export default validation;