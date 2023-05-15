import { useState } from "react";
import Footer from "./Footer";
import "./css/Contact.css";
import "./css/Footer.css";
import "./css/RRSS.css";
import RRSS from "./RRSS";

function Inputs() {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [textarea, setTextArea] = useState("");
  const [sentMessage, setSentMessage] = useState("");

  const errorMessage = Validate(username, email, textarea);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!errorMessage) {
      setSentMessage("¡Mensaje enviado!");
      setUserName("");
      setEmail("");
      setTextArea("");
      setTimeout(() => {
        setSentMessage("");
      }, 3000);
    }
  };

  return (
    <div id='contact-form'>
      <br></br>
      <br></br>
      <h1>CONTACTO</h1>
      <h3>ponerse en contacto</h3>
      {sentMessage && <p className='mensaje'>{sentMessage}</p>}
      <section>
        <form onSubmit={handleSubmit}>
          <fieldset>
            <label htmlFor='username'></label>
            <input
              onChange={(event) => setUserName(event.target.value)}
              type='username'
              id='username'
              name='username'
              autoComplete='off'
              value={username}
              placeholder='Nombre'
            />
            <label htmlFor='mail'></label>
            <input
              onChange={(event) => setEmail(event.target.value)}
              type='email'
              name='mail'
              id='mail'
              autoComplete='off'
              value={email}
              placeholder='Email'
            />
            <label htmlFor='textarea'></label>
            <textarea
              onChange={(event) => setTextArea(event.target.value)}
              name='textarea'
              id='textarea'
              autoComplete='off'
              value={textarea}
              cols='30'
              rows='10'
              placeholder='Escribe tu mensaje'
            ></textarea>
            <button
              className='botonenviar'
              disabled={errorMessage}
              type='submit'
            >
              enviar
            </button>
          </fieldset>
        </form>
      </section>
      <RRSS />
      <Footer />
    </div>
  );
}

const Validate = (username, email, textarea) => {
  if (!email.includes("@")) return "Email incorrecto";
  if (username.length < 4) return "Usuario incorrecto";
  if (textarea.length < 4) return "Texto incorrecto";
};

export default Inputs;
