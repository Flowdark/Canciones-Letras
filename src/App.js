import React, { Fragment, useState, useEffect } from 'react';
import Formulario from "./Componentes/Formulario";
import Cancion from "./Componentes/Cancion";
import Info from "./Componentes/Info";

function App() {

  const [ busquedaletra, guardarBusquedaLetra ] = useState({});

  //State para las letras

  const [ letra, guardarLetra ] = useState("");

  const [ info, guardarInfo ] = useState({});

  useEffect( () => {
    if( Object.keys(busquedaletra).length === 0 ) return;

    const { artista, cancion } = busquedaletra;

    const consultarAPI = async () => {

      const url = `https://api.lyrics.ovh/v1/${artista}/${cancion}`;
      const url2 = `https://www.theaudiodb.com/api/v1/json/1/search.php?s=${artista}`;

      const [ letra, informacion ] = await Promise.all([

        fetch(url),
        fetch(url2)

      ]);

      const resultado1 = await letra.json();
      const resultado2 = await informacion.json();
      
      guardarLetra(resultado1.lyrics);
      guardarInfo(resultado2.artists[0]);

    }

    consultarAPI();

  }, [busquedaletra, info] );

  return (
    <Fragment>
      <Formulario 
        guardarBusquedaLetra={guardarBusquedaLetra}
      />

        <div className="container mt-5">
          <div className="row">
            <div className="col-md-6">
              <Info 
                info={info}
              />
            </div>
            <div className="col-md-6">
                <Cancion 
                  letra={letra}
                />
            </div>
          </div>
        </div>

    </Fragment>
  );
}

export default App;
