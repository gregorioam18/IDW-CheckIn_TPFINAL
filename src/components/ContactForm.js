import "./ContactFormStyles.css";

function ContactForm (){
    return(
        <div className="form-container">
            <h1>Escribinos</h1>
            <form>
                <input type="text" placeholder="Nombre" />
                <input type="email" placeholder="Correo" />
                <input type="email" placeholder="Asunto" />
                <textarea placeholder="Mensaje" rows="4"></textarea>
                <button>Enviar</button>
            </form>
        </div>
    )
}

export default ContactForm;