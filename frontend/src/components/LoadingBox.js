//Componente para indicar que la web se está cargando
import Spinner from "react-bootstrap/Spinner";

export default function LoadingBox() {
  return (
    <Spinner animation='border' role='status'>
      <span className='visually-hidden'>En breve verás nuestra web</span>
    </Spinner>
  );
}
