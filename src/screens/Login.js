import React, { Component } from 'react';

import {
    TextInput,
    Text,
    View,
    StyleSheet,
    Image,
    Button,
    AsyncStorage
} from 'react-native'

import axios from 'axios';


class Login extends React.Component {

    state = {
        email: '',
        password: '',
        formValid: false
    }

    validateEmail = (text) => {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        let formValid = (text.length > 0) && reg.test(text) && (this.state.password.length > 0)
        this.setState({email:text,formValid:formValid})
    }

    validatePassword = (text)=>{
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        let formValid = (text.length > 0) && reg.test(this.state.email);
        this.setState({password:text,formValid:formValid});

    }

    

    handleSubmit = async () => {
        try {
            debugger;
            let retorno = await axios.post("https://api.codenation.dev/v1/user/auth", {
                email: this.state.email,
                password: this.state.password
            });

            if (retorno) {
                await AsyncStorage.setItem('user', JSON.stringify({ ...retorno.data }));

                this.props.navigation.navigate('Acceleration',{navigation:this.props.navigation});
            }

        } catch (error) {
            console.log(error)
        }
    }

    render() {
        const { email, password } = this.state;
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Image
                        style={styles.headerImage}
                        source={{ uri: 'https://forum.codenation.com.br/uploads/default/original/2X/2/2d2d2a9469f0171e7df2c4ee97f70c555e431e76.png' }}
                    />
                </View>
                <View style={styles.form}>
                    <Text style={styles.title}>Login</Text>
                    <TextInput
                        className="email-input"
                        placeholder="Email"
                        autoCompleteType="email"
                        keyboardType="email-address"
                        style={styles.input}
                        value={email}
                        onChangeText={text => this.validateEmail(text)}
                    />
                    <TextInput
                        className="password-input"
                        placeholder="password"
                        autoCompleteType="password"
                        secureTextEntry={true}
                        style={styles.input}
                        value={password}
                        onChangeText={text => this.validatePassword(text)}
                    />
                    <Button
                        className="submit-login"
                        title="Entrar"
                        color="#7800ff"
                        disabled={!this.state.formValid}
                        onPress={() => this.handleSubmit()}
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({

    container: {
        flex: 1
    },
    form: {
        paddingHorizontal: 30
    },
    header: {
        alignItems: 'center',
        flexDirection: 'row',
        borderBottomColor: '#7800ff',
        borderBottomWidth: 2,
        padding: 16,
        paddingTop: 55
    },
    headerImage: {
        height: 45,
        width: 250
    },
    title: {
        marginTop: 150,
        fontSize: 40,
        fontWeight: 'bold',
        color: '#7800ff',
        marginBottom: 30
    },
    button: {
        backgroundColor: '#7800ff',
        height: 56,
        width: '90%',
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonLabel: {
        color: 'white',
        fontWeight: 'bold'
    },
    input: {
        height: 43,
        fontSize: 14,
        fontWeight: '800',
        paddingLeft: 10,
        marginHorizontal: 10,
        marginVertical: 15,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#eaeaea',
        backgroundColor: '#fafafa'
    },
})

export default Login;
