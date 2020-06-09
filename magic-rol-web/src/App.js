  
import React, { Component } from 'react';
import './App.css';
import Perfil from './components/Login/Perfil.js';
import Login from './components/Login/Login.js';
import Inicio from './components/Inicio/Inicio.js';
import Aventura from './components/Aventura/Aventura.js';
import MisFichas from './components/MisFichas/MisFichas.js';
import Fichas from './components/Fichas/Fichas.js';
import LoginRequires from './components/LoginRequires/LoginRequires.js';
//import Modal_ from './components/Modal_/Modal_.js';



export default class App extends Component {

  constructor(props){

    super(props)
    this.state = { 
      /*
      - 0 Inicio
      - 1 Login
      - 2 Mi perfil
      - 3 Fichas de ejemplo
      - 4 Mis Fichas
      - 5 Aventura
      - 6 Registro
      */
      selector_menu : 0,

      login : false // estado para saber si estas logeado
     };

    /* importante blindar el contenido de una funcion para que pueda acceder al state */
    this.cambioInicio = this.cambioInicio.bind(this);
    this.cambioFichas = this.cambioFichas.bind(this);
    this.llamarEleccion = this.llamarEleccion.bind(this);
    this.ErrorLogin = this.ErrorLogin.bind(this);
    this.cambioLogin = this.cambioLogin.bind(this);
    this.cambioAventura = this.cambioAventura.bind(this);
    this.toggleLogin = this.toggleLogin.bind(this);

    }

  llamarEleccion(){

    switch (this.state.selector_menu) {
      case 0:
        return(<div id='contenedor'><Inicio /></div>)      

      case 1: 
        return(<div id='contenedor'><Login /></div>)

      case 2:
        return(<div id='contenedor'><Perfil /></div>) 

      case 3:
        return(<div id='contenedor'><Fichas /></div>) 

      case 4:
        return(<div id='contenedor'><MisFichas /></div>)

      case 5:
        return(<div id='contenedor'><Aventura /></div>)

      case 6:
        return(<div id='contenedor'><LoginRequires /></div>)

        default:
          break;
    }

  }

  //funcion que prevee el click para no cargar el state y cambia al Inicio
  cambioInicio(e){
    e.preventDefault();
    console.log('click inicio');
    
    this.setState({selector_menu:0})    
    return false
 }

//funcion cambia al error de no login y pedir el login
  ErrorLogin(){
    return(
      <div><LoginRequires /></div>
    )
  }

  cambioFichas(e){
    e.preventDefault();
    console.log('click fichas');

    if (this.state.login) {

      this.setState({selector_menu:4})
      console.log('mis fichas');

      
    } else {

      this.setState({selector_menu:3})
      console.log('fichas stock');
      
      
    }
    
    return false
  }

  cambioLogin(e){
    e.preventDefault();

    if (this.state.login) {
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
    console.log('click aventura');

    this.state.login ? this.setState({selector_menu:5}) : this.setState({selector_menu:6});
    
    return false
  }

  toggleLogin(e){
    //console.log('toggle loggin - ' + this.state.login);
    this.state.login ? this.setState({login:false, selector_menu: 0}) : this.setState({login:true, selector_menu: 0});    


  }

  llamadaMenu(){
    
    return(

      <div id='menuTop'>
        <ul>
            <li><img href='./img/icono.png' alt='icono web'/></li>
            <li onClick={this.cambioInicio}>Inicio</li>
            <li onClick={this.cambioFichas}>{this.state.login ? 'Mis Fichas' : 'Fichas de ejemplo'}</li>
            <li onClick={this.cambioLogin}>{this.state.login ? 'Mi Perfil' : 'Login'}</li>
            <li onClick={this.cambioAventura}>Salas</li>   
            <li><button onClick={this.toggleLogin}>Pulsame</button></li>
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