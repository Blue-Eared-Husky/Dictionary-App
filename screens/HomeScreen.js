import * as React from 'react';
import { Text, View, StyleSheet,TextInput,TouchableOpacity } from 'react-native';
import { Header } from 'react-native-elements';
import { SafeAreaView, SafeAreaProvider, SafeAreaInsetsContext, useSafeAreaInsets, initialWindowMetrics } from 'react-native-safe-area-context';
import Constants from 'expo-constants';
import * as Speech from 'expo-speech';
import {Ionicons} from '@expo/vector-icons';

export default class HomeScreen extends React.Component {
  constructor(){
    super();

    this.state= {
      text: '',
      isSearchPressed: false,
      word: '',
      lexicalCategory: '',
      examples: [],
      definition: ''
    }
  }

  speak = () => {
    var thingToSay = this.state.text;
    Speech.speak(thingToSay);
  }

getWord=(word)=>{
    var searchKeyword=word.toLowerCase()
    
    var url = "https://rupinwhitehatjr.github.io/dictionary/"+searchKeyword+".json"
    //console.log(url)
    return fetch(url)
    .then((data)=>{
      if(data.status===200)
      {
        return data.json()
      }
      else
      {
        return null
      }
    })
    .then((response)=>{
        //console.log(response)

        var responseObject = response
        //var word = responseObject.word
        //var lexicalCategory = responseObject.results[0].lexicalEntries[0].lexicalCategory.text
        if(responseObject)
        {
          var wordData = responseObject.definitions[0]
          //console.log(responseObject.definitions[0])
          var definition=wordData.description
          var lexicalCategory=wordData.wordtype
          //console.log(lexicalCategory)
          this.setState({
            "word" : this.state.text, 
            "definition" :definition,
            "lexicalCategory": lexicalCategory     
            
          })
        }
        else
        {
          this.setState({
            "word" : this.state.text, 
            "definition" :"Not Found",
            
          })

        }
    
    })
  }

  render(){
    return (
      <SafeAreaProvider style = {styles.container}>
        <Header
          backgroundColor={'#888888'}
          centerComponent={{
            text: 'Pocket Dictionary',
            style: { color: '#000000', fontWeight: 'bold', fontSize: 20 },
          }}
        />

        <Text></Text>
        <TextInput
          style = {styles.input}
          onChangeText = {
            text => {
              this.setState({
                text: text,
                isSearchPressed: false,
                word: "Loading...",
                lexicalCategory: '',
                examples: [],
                definition: ''
              })
            }
          }
          value = {this.state.text}
          placeholder="Enter the Word Here"
          keyboardType="alphabetic"
        />
        <Text style = {{fontSize:50}}/>
        <TouchableOpacity
          style = {styles.button}
          onPress={()=>{
            this.setState({isSearchPressed: true});
            this.getWord(this.state.text)
          }}
        ><Text style = {{fontWeight: 'bold',color: '#ededed'}}>Find Meaning</Text></TouchableOpacity>
        <TouchableOpacity
          onPress = {this.speak}>
          <Text style = {styles.text1}>🔊Speak</Text>
        </TouchableOpacity>
        <Text style = {styles.text2}>Word: {this.state.word}</Text>
        <Text style = {styles.text2}>Type: {this.state.lexicalCategory}</Text>
        <Text style = {styles.text2}>Definition: {this.state.definition}</Text>
        <Text style = {{marginTop: 232}}>s</Text>
      </SafeAreaProvider>
    );
  }
}

const styles = StyleSheet.create({
 container: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,1500)',
  },
  input: {
    height: 40,
    margin: 15,
    backgroundColor: '#aaaaaa',
    borderWidth: 2,
    borderColor: "#666666",
    padding: 10,
    textAlign: "center"
  },
  text1: {
    height: 40,
    margin: 10,
    padding: 10,
    fontSize: 20,
    color: 'blue',
    fontWeight: "bold",
    textAlign: "center"
  },
  text2: {
    height: 40,
    padding: 10,
    fontSize: 20,
    color: 'grey',
    fontWeight: "bold",
    textAlign: "center"
  },
  titleText: {
    height: 40,
    margin: 5,
    padding: 10,
    fontSize: 30,
    fontWeight: "bold",
    textDecorationLine: "underline",
    textAlign: "center",
    color: '#cccccc'
  },
  button: {
    height: 40,
    marginLeft: 75,
    marginRight: 75,
    borderWidth: 2.5,
    borderColor: '#888888',
    padding: 10,
    textAlign: "center",
    backgroundColor: '#555577'
  },
  buttonPressed: {
    height: 40,
    marginLeft: 75,
    marginRight: 75,
    padding: 10,
    textAlign: "center",
    backgroundColor: '#555577'
  },
})