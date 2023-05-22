import React, { useState } from "react";
//import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import { useNavigate } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
//FUNCION BUSCADOR: componente SearchBox, utilizamos el HOOK useNavigate para obtener la función de navegación de React DOM
//Utilizamos el HOOK useState para inicializar una cadena vacía
//Utilizamos la función setQuery para actualizar el estado
//La función SubmitHandler es para cuando se envía el formulario
//El valor query agrega a la URL el parámetro de búsqueda
//Devuelve una estrucura HTML y los elementos de entreda en el buscador
//AiOutlineSearch es la lupita (botón de submit del formulario)
export default function SearchBox() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const submitHandler = (e) => {
    e.preventDefault();
    navigate(query ? `/search/?query=${query}` : "/search");
  };
  return (
    <Form className='d-flex me-auto' onSubmit={submitHandler}>
      <InputGroup>
        <FormControl
          type='text'
          nameproduct='q'
          id='q'
          onChange={(e) => setQuery(e.target.value)}
          placeholder='buscar producto'
          aria-label='Search Products'
          aria-describedby='button-search'
        ></FormControl>
        <AiOutlineSearch onClick={submitHandler} id='button-search' />
      </InputGroup>
    </Form>
  );
}
