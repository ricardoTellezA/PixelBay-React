import React, { useState } from 'react'
import { Error } from './Error';

export const Formulario = ({guardarValor}) => {
    const [buscar, guardarBuscar] = useState('');
    const [error, guardarError] = useState(false);


    const buscador = e => {
        e.preventDefault();
    

        //VALIDANDO

        if (buscar.trim() === '') {
            guardarError(true);
            return;
        }

        guardarError(false);

        //MANDAR VALOR DE BUSQUEDA 

        guardarValor(buscar);
    }
    return (
        <form onSubmit={buscador}>

            <div className="row">
                <div className="form-group col-md-8" >
                    <input
                        type="text"
                        className="form-control form-control-lg"
                        placeholder="Busca una imagen, ejemplo: futbol o café"
                        onChange={e => guardarBuscar(e.target.value)}
                    />
                </div>

                <div className="form-group col-md-4" >
                    <input
                        type="submit"
                        className="btn btn-lg btn-danger btn-block"
                        value="buscar"

                    />
                </div>
            </div>

            {
                error ? <Error mensaje="Ingresa una búsqueda válida"/> : null
            }

        </form>
    )
}
