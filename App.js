import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, Button} from 'react-native';

import {styles} from './styles/front' /* Objecto estilo importado */

  class App extends Component {
    constructor(props){
      super(props)
      this.state={
        peso: '',
        altura: '',
        resultado: '',
        color: '',
      }
      this.calcularIMC = this.calcularIMC.bind(this);
    }

    setPeso = peso_ =>{ /*Cambia el valor del peso que recibe con el evento onchangetext del input*/
      this.setState({peso: peso_});
    }

    setAltura = altura_ =>{ /*Cambia el valor de la altura que recibe con el evento onchangetext del input*/
      this.setState({altura: altura_});
    }

    setResultado = resultado_ =>{ /*Es llamado para cambiar el estado del resultado según el imc obtenido*/
      this.setState({resultado: resultado_});
    }

    setColor = color_ =>{
      this.setState({color: color_});
    }

    
    calcularIMC = () =>{ /*Función que es llamada con el onPress de Buttom*/

      if(!isNaN(this.state.peso)){ /*Parseamos el peso en caso de que no sea int*/
        parseInt(this.state.peso);
      }
          
      let imc = this.state.peso / Math.pow(this.state.altura,2); /*Formula para obtener el imc*/

      if(this.state.altura>0 && this.state.peso>0){ /*Si el peso y la altura no tienen valor no habrá resultado*/
        imc<18.5 ? this.setResultado('Peso insuficiente') :
        imc>=18.5 && imc < 25 ?  this.setResultado('Normopeso') : /*Según el imc obtenito se dará un valor diferente al resultado que saldrá por pantalla*/
        imc>=25 && imc < 27 ? this.setResultado('Sobrepeso grado I') : 
        imc>=27 && imc < 30 ? this.setResultado('Sobrepeso grado II') : 
        imc>=30 && imc < 35 ? this.setResultado('Obesidad de tipo I') :
        imc>=35 && imc < 40 ? this.setResultado('Obesidad de tipo II') :
        imc>=40 && imc < 50 ? this.setResultado('Obesidad de tipo III') :
        imc >= 50 ? this.setResultado('Obesidad de tipo IV') : 
        null; 
      }else{
        this.setResultado('');
      }

      imc > 27 && imc < 40 ? this.setColor('orange') : /*Si el imc esta comprendido ente 28 y 39 saldrá naranja , por defecto es verde y si supera o iguala los 40 es de color rojo*/
      imc >= 40 ? this.setColor('red') : this.setColor('green')

    }

    render() {
      return (
        <View style={styles.container}>
          <Text style={styles.titulo}>Calculadora IMC</Text>
          <Text style={styles.titleInput}>Peso</Text>
          <TextInput
            style={styles.input}
            placeholder='Peso'
            placeholderTextColor={'#a9a9a9'}
            onChangeText={this.setPeso}
            underlineColorAndroid= '#8a2be2'
            keyboardType='numeric'

          />
          <Text style={styles.titleInput}>Altura</Text>
          <TextInput
            style={styles.input}
            placeholder='Altura'
            placeholderTextColor={'#a9a9a9'}
            onChangeText={this.setAltura}
            underlineColorAndroid= '#8a2be2'
            keyboardType='decimal-pad'
        
          />
          <View style={styles.bottonView}>
            <Button
              color="#7fffd4"
              title='Calcular IMG'
              onPress={this.calcularIMC}
            />
          </View>
      
          <View style={{paddingLeft: 10 , marginBottom: 20 , fontWeight: 'bold' }}>
            <Text style={{paddingTop: 20 ,marginBottom: 10 ,fontWeight: 'bold'}}>Resultado</Text>
            <Text style={{color:this.state.color}}>{this.state.resultado}</Text>
          </View>
        </View>
      );
  }
}



export default App;
