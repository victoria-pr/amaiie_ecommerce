import { useParams } from "react-router-dom";

//Queremos obtener la ficha de cada producto y lo hacemos con un hook
function ProductScreen() {
  const params = useParams();
  const { slug } = params;
  return (
    <div>
      <h1>{slug}</h1>
    </div>
  );
}

export default ProductScreen;
