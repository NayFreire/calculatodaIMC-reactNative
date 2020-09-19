import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { StyleSheet, Text, View, Alert, Button, ImageBackground, TextInput } from 'react-native';

class App extends Component{
  state = {
    peso: '',
    altura: '',
    info: '-',
    resultado: 0.0
  }
  setAltura = (valorAltura) => {
    this.setState({altura: valorAltura})
  }
  setPeso = (valorPeso) => {
    this.setState({peso: valorPeso})
  }

  calculaIMC = () => {
    var imc = (this.state.peso / (this.state.altura * this.state.altura)).toFixed(2);
    var s = this.state;

    s.resultado = imc;

    //this.setState({resultado: imc});

    // console.log('imc: ' + imc + '\nthis.state.resultado: ' + this.state.resultado + '\nthis.state.altura: ' + this.state.altura + '\nthis.state.peso: ' + this.state.peso)

    if (s.resultado < 18.5) {
      s.info = 'Menor que 18,5, seu quadro é de: Magreza';
    }
    else if (s.resultado < 24.9) {
      s.info = 'Entre 18,5 e 24,9, seu quadro é: Normal';
    }
    else if (s.resultado < 29.9) {
      s.info = 'Entre 25,0 e 29,9, você está com: Sobrepeso';
    }
    else if (s.resultado < 39.9) {
      s.info = 'Entre 30,0 e 39,9, tome cuidado, você está com: Obesidade';
    }
    else if (s.resultado > 39.9) {
      s.info = 'Maior que 40,0, você está com: Obesidade Grave';
    }
    this.setState(s);
    this.mensagem();
  }
    

  image = {uri: 'https://reactjs.org/logo-og.png'};

  clear = () => {
    this.setState({
      peso: '',
      altura: '',
      resultado: 0.0,
      info: '-'
    });
  };

  mensagem = () => {
    const mensagem = "Seu IMC é: " + this.state.resultado + " " + this.state.info;

    Alert.alert(
      'Calculadora de IMC',
      mensagem,
      [
        {
          text: 'Cancelar',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel'
        },

        {
          text: 'Ok',
          onPress: () => console.log('Ok Pressed')
        }
      ],
      {
        cancelable: false
      }
    );
  };

  render(){
    return (
      <View style={styles.viewContainer}>
        
        <View style={styles.viewCalc}>
          <StatusBar />
          <Text style={styles.titulo}>
            Calculadora IMC
          </Text>

          <Text style={styles.text}>Altura (m)</Text>
          <TextInput
            style={styles.textInput}
            onChangeText={this.setAltura}
            value={this.state.altura}
            placeholder="Exemplo: 1,75"
            keyboardType={'numeric'} />
  
          <Text style={styles.text}>Peso (kg)</Text>
          <TextInput
            style={styles.textInput}
            onChangeText={this.setPeso}
            value={this.state.peso}
            placeholder="Exemplo: 68,8"
            keyboardType={'numeric'} />
  
        <Separator />
  
        <Button
          onPress={this.calculaIMC}
          title="Calcula"
          color='green'
          accessibilityLabel="Clique aqui para calcular seu IMC" 
          style={styles.btns}/>
  
        <Separator />
  
        <Button
          onPress={this.clear}
          title="Limpar"
          color='red'
          accessibilityLabel="Botão para limpar os valores" />
  
        <Separator />
  
        <Text style={styles.input}>
          Seu IMC é: {this.state.resultado} {this.state.info}
        </Text>
        </View>
      </View>
    );
  }
}

export default App;

const Separator = () => <View style={styles.separator} />

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
    padding: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000060'
  },
  titulo: {
    fontSize: 30,
    color: 'orange',
    marginBottom: 20
  },
  viewCalc: {
    padding: 30,
    justifyContent: 'center',
    backgroundColor: '#000080'
    // padding:10,
    // // backgroundColor: 'yellow',
    // borderColor: 'white',
    // borderWidth: 2,
    // justifyContent: 'center',
    // alignItems: 'center'
  },
  input: {
    paddingLeft: 5,
    paddingRight: 5,
    paddingBottom: 5,
    fontSize: 18,
    color: 'white'
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: '#fff',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  text: {
    fontSize: 22,
    color: '#fff',
  },
  textInput: {
    height: 40,
    borderWidth: 1,
    borderColor: 'white',
    color: 'white',
    paddingLeft: 20,
    margin: 10,
    borderRadius: 20,
  }
});
