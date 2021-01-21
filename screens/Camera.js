import React, { Component } from 'react'
import {View, Text, Image, Button, TouchableOpacity, StyleSheet, Platform} from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import * as Permissions from 'expo-permission'

export default class Camera extends Component{
    constructor(){
        super()
        this.state={
            image : null
        }
    }
    getPermission = async()=>{
        if(Platform.OS !== 'web'){
            const {Status} = await Permissions.askAsync(Permissions.CAMERA_ROLL)

            if(status !== 'GRANTED'){
                alert('Sorry We Cannot Procced as The Camera Permissions Are Not Granted')
            }
        }
    }

    uploadImage= async(uri)=>{
        const data = new FormData()
        let filename = uri.split('/')[uri.split('/').length - 1]
        let type = "image/${uri.split('.')[uri.split('.').length - 1]}"
        const fileToUpload = {uri : uri, name : filename, type : type}
        data.append('digit',fileToUpload)
        fetch('https://f292a3137990.ngrok.io/predict-digit', {
            method: 'POST',
            body: data,
            headers:{
                'content-type': 'multipart/form-data'
            },
        })
            .then((response)=>{response.json()})
            .then((result)=>{
                console.log('Success:', result);
            })
            
            .catch((error)=>{
                console.log('ERROR:',error)
            })
  
    }

    pickImage = async()=>{
        try{
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes : ImagePicker.MediaTypeOptions.All,
                allowsEditing : true,
                aspect : [4,3],
                quality : 1
            })

            if(!result.cancelled){
                this.setState({
                    image : result.data      
                })
                this.uploadImage(result.uri)
            }
        }

        catch(error){
            console.log(error)
        }
    }

    componentDidMount(){
        this.getPermission()
    }
    render(){
        let image = this.state.image
        return(
            <View style = {styles.container}>
                <TouchableOpacity style= {styles.button} onPress={this.pickImage()}>
                    <Text style={styles.buttonText}>
                        Pick An Image From Camera Role
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
     flex:1,
     alignItems: 'center',
     justifyContent: 'center'
   },
   card:{
    flex:1,
    alignItems: 'right',
    justifyContent: 'right'
  },
   formTextInput:{
    width:"75%",
    height:35,
    alignSelf:'center',
    borderColor:'#000',
    borderRadius:10,
    borderWidth:1,
    marginTop:20,
    padding:10,
  },
  subtitle :{
    flex:1,
    fontSize: 20,
    justifyContent:'center',
    alignItems:'center',
    fontWeight: 'bold'
  },
  attribute :{
    flex:1,
    fontSize: 20,
    justifyContent:'center',
    alignItems:'center',
    color: '#000'
  },
  cardtitle :{
    flex:1,
    fontSize: 35,
    justifyContent:'center',
    alignItems:'center',
    fontStyle: 'Bold',
  },
  button:{
    width:"85%",
    height:50,
    justifyContent:'center',
    alignItems:'center',
    borderRadius:10,
    backgroundColor:"#ff5722",
    shadowColor: "#000",
    shadowOffset: {
       width: 0,
       height: 8,
    },
    marginLeft: 15,
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
    elevation: 16,
    marginTop:20
    },
    button1:{
        width:"85%",
        height:50,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:10,
        backgroundColor:"#00ff00",
        shadowColor: "#000",
        shadowOffset: {
           width: 0,
           height: 8,
        },
        marginLeft: 15,
        shadowOpacity: 0.44,
        shadowRadius: 10.32,
        elevation: 16,
        marginTop:20
        },
    buttonText:{
        fontSize:25,
        fontWeight:"bold",
        color:"#fff"
      },
      image: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center"
      },
      imageContainer:{
        width: 500,
        height: 300,
        marginTop: 20,
        borderRadius: 5,
        alignSelf: 'center'
      },
})