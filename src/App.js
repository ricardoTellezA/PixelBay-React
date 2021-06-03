import { useEffect, useState } from "react";
import { Formulario } from "./components/Formulario";
import { ListadoImganes } from "./components/ListadoImganes";

function App() {

  const [valor, guardarValor] = useState('');
  const [imagenes, guardarImagenes] = useState([]);
  const [paginaActual, guardarPaginaActual] = useState(1);
  const [totalPaginas, guardarTotalPaginas] = useState(1);

  useEffect(() => {

    const leerApi = async () => {
      if (valor === '') return;
      const imagenesPorPagina = 30;
      const key = '21827443-e6adda6f2a91c49a02760d4c2';
      const url = `https://pixabay.com/api/?key=${key}&q=${valor}&per_page=${imagenesPorPagina}&page=${paginaActual}`;
      const respuesta = await fetch(url);
      const resultado = await respuesta.json();
      guardarImagenes(resultado.hits);
      const calcularTotalPaginas = Math.ceil(resultado.totalHits / imagenesPorPagina);
      guardarTotalPaginas(calcularTotalPaginas);

      //MOVER PANTALLA ARRIBA
      const jumbotron = document.querySelector('.jumbotron');
      jumbotron.scrollIntoView({behavior: 'smooth'})


    }

    leerApi();

  }, [valor,paginaActual]);


  //DEF PAG ANTERIOR

  const paginaAnterior = () => {
    const nuevoPagActual = paginaActual - 1;
    if (nuevoPagActual === 0) return;
    guardarPaginaActual(nuevoPagActual);
  }

  const paginaSiguiente = () => {
    const nuevoPagActual = paginaActual + 1;
    if (nuevoPagActual > totalPaginas) return;
    guardarPaginaActual(nuevoPagActual);
  }
  return (
    <div className="container">
      <div className="jumbotron">
        <p className="lead text-center">Buscador de imagenes</p>
        <Formulario
          guardarValor={guardarValor}
        />
      </div>
      <div className="row justify-content-center">
        <ListadoImganes
          imagenes={imagenes}
        />

        {(paginaActual === 1) ? null : <button
          onClick={paginaAnterior}
          type="button"
          className="btn btn-info mr-1">
          &laquo;Anterior
           </button>}

        {(paginaActual === totalPaginas) ? null : <button
          onClick={paginaSiguiente}
          type="button"
          className="btn btn-info ">
          Siguiente &raquo;
          </button>}
      </div>


    </div>
  );
}

export default App;
