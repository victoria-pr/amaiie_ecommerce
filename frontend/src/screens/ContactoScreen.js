import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

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
      <br />
      <br />
      <h1>CONTACTO</h1>
      <h3>ponerse en contacto</h3>
      {sentMessage && <p className='mensaje'>{sentMessage}</p>}
      <section>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              type='text'
              value={username}
              onChange={(event) => setUserName(event.target.value)}
              placeholder='Nombre'
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Email</Form.Label>
            <Form.Control
              type='email'
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder='Email'
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Mensaje</Form.Label>
            <Form.Control
              as='textarea'
              value={textarea}
              onChange={(event) => setTextArea(event.target.value)}
              placeholder='Escribe tu mensaje'
              rows={10}
            />
          </Form.Group>
          <Button className='botonenviar' disabled={errorMessage} type='submit'>
            Enviar
          </Button>
        </Form>
      </section>
    </div>
  );
}

const Validate = (username, email, textarea) => {
  if (!email.includes("@")) return "Email incorrecto";
  if (username.length < 4) return "Usuario incorrecto";
  if (textarea.length < 4) return "Texto incorrecto";
};

export default Inputs;
