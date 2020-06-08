  
import React, { Component } from 'react';
import './App.css';
import Perfil from './components/Loggin/Perfil.js';
import Loggin from './components/Loggin/Loggin.js';
import Inicio from './components/Inicio/Inicio.js';
import Aventura from './components/Aventura/Aventura.js';
import MisFichas from './components/MisFichas/MisFichas.js';
import Fichas from './components/Fichas/Fichas.js';
import LogginRequires from './components/LogginRequires/LogginRequires.js';



export default class App extends Component {

  constructor(props){

    super(props)
    this.state = { 
      /*
      - 0 Inicio
      - 1 Loggin
      - 2 Mi perfil
      - 3 Fichas de ejemplo
      - 4 Mis Fichas
      - 5 Aventura
      */
      selector_menu : 0,

      loggin : false // estado para saber si estas logeado
     };

    /* importante blindar el contenido de una funcion para que pueda acceder al state */
    this.cambioInicio = this.cambioInicio.bind(this);
    this.cambioFichas = this.cambioFichas.bind(this);
    this.llamarEleccion = this.llamarEleccion.bind(this);
    this.ErrorLoggin = this.ErrorLoggin.bind(this);
    this.cambioLoggin = this.cambioLoggin.bind(this);
    this.cambioAventura = this.cambioAventura.bind(this);

    }

  llamarEleccion(){

    switch (this.state.selector_menu) {
      case 0:
        return(<div><Inicio /></div>)      

      case 1: 
        return(<div><Loggin /></div>)

      case 2:
        return(<div><Perfil /></div>) 

      case 3:
        return(<div><Fichas /></div>) 

      case 4:
        return(<div><MisFichas /></div>)

      case 5:
        return(<div><Aventura /></div>)

      case 6:
        return(<div><LogginRequires /></div>)
    }

  }

  cambioInicio(e){
    e.preventDefault();
    console.log('click inicio');
    
    this.setState({selector_menu:0})    
    return false
 }

  ErrorLoggin(){

  }

  cambioFichas(e){
    e.preventDefault();
    console.log('click fichas');

    if (this.state.loggin) {

      this.setState({selector_menu:4})
      console.log('mis fichas');

      
    } else {

      this.setState({selector_menu:3})
      console.log('fichas stock');
      
      
    }
    
    return false
  }

  cambioLoggin(e){
    e.preventDefault();

    if (this.state.loggin) {
      console.log('logged');
      this.setState({selector_menu:2})

      
    } else {
      console.log('not logged');
      this.setState({selector_menu:1})
      
    }
    
    return false
  }

  cambioAventura(e){
    e.preventDefault();
    console.log('click salas');
    
    this.setState({selector_menu:3})    
    return false
  }

  llamadaMenu(){
    
    return(

      <div className='menuTop'>
        <ul>
            <li><img href='./img/icono.png' alt='icono web'/></li>
            <li onClick={this.cambioInicio}>Inicio</li>
            <li onClick={this.cambioFichas}>Fichas de ejemplo</li>
            <li onClick={this.cambioLoggin}>Login</li>
            <li onClick={this.cambioAventura}>Salas</li>            
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