  
import React, { Component } from 'react';
import './App.css';


export default class App extends Component {

  constructor(props) {

    super(props)
    this.state = { 
      selector_menu : 0,
      loggin : false // estado para saber si estas logeado
     };

    this.cambioPestanya = this.cambioPestanya.bind(this);/* importante blindar el contenido de una funcion para que pueda acceder al state */
}

cambioPestanya(){
  this.setState({selector_menu: 1 })
}

render(){

  return(

    <div className=''></div>

  )

}

}