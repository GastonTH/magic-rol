  
import React, { Component } from 'react';
import './App.css';

export default class App extends Component {

  constructor(props){

    super(props)
    this.state = { 
      /*
      - 0 Inicio
      - 1 Loggin
      - 2 Mi perfil
      - 3 Fichas de ejemplo
      - 4 Salas
      */
      selector_menu : 0,

      loggin : false // estado para saber si estas logeado
     };

    /* importante blindar el contenido de una funcion para que pueda acceder al state */
    this.cambioPestanya = this.cambioPestanya.bind(this);
    this.llamarEleccion = this.llamarEleccion.bind(this);
  }

  llamarEleccion(){

    switch (this.state.selector_menu) {
      case 0:
      return(<div>Inicio</div>)      

      case 1: 
      return(<div>Fichas</div>)
    }


  }

  cambioPestanya(n){
    console.log(n);
  }

  llamadaMenu(){
    return(

      <div className='menuTop'>
        <ul>
            <li><img href='./img/icono.png' alt='icono web'/></li>
            <li>Inicio</li>
            <li onClick={this.cambioPestanya(1)}>Fichas de ejemplo</li>
            <li>Login</li>
            <li>Salas</li>            
        </ul>
        </div>

    )
  }



render(){

    return(
      <div>
        {this.llamadaMenu()}
        {this.llamarEleccion()}
      </div>
    )
} 

}