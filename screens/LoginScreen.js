import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import ErrorMessage from '../components/ErrorMessage';
import Firebase from '../config/firebase';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  const onFooterLinkPress = () => {
    navigation.navigate("Registration");
  }

  const onLoginPress = async () => {
    try {
      if(email !== '' && password !== '') {
        await Firebase.auth()
          .signInWithEmailAndPassword(email, password);
        
        navigation.navigate("Home");
      }
    } catch(error) {
      setLoginError(
        error.message.substring(10, error.message.length)
      );
    }
  }

  useEffect(() => {
    navigation.setOptions({
      headerTitle: 'Login'
    });
  }, []);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder='E-mail'
        placeholderTextColor="#aaaaaa"
        onChangeText={(text) => setEmail(text)}
        value={email}
        underlineColorAndroid="transparent"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        secureTextEntry
        placeholder='Password'
        placeholderTextColor="#aaaaaa"
        onChangeText={(text) => setPassword(text)}
        value={password}
        underlineColorAndroid="transparent"
        autoCapitalize="none"
      />
      {loginError ? <ErrorMessage error={loginError} visible={true} /> : null}
      <TouchableOpacity
        style={styles.button}
        onPress={() => onLoginPress()}>
        <Text style={styles.buttonTitle}>Log in</Text>
      </TouchableOpacity>
      <View style={styles.footerView}>
        <Text style={styles.footerText}>Don't have an account? <Text onPress={onFooterLinkPress} style={styles.footerLink}>Sign up</Text></Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
  input: {
    width: '80%',
    height: 48,
    borderRadius: 5,
    overflow: 'hidden',
    backgroundColor: 'white',
    marginTop: '10%',
    marginLeft: 30,
    marginRight: 30,
    paddingLeft: 16
  },
  button: {
    width: '80%',
    backgroundColor: '#788eec',
    marginLeft: 30,
    marginRight: 30,
    marginTop: '10%',
    height: 48,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: 'center'
  },
  buttonTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: "bold"
  },
  footerView: {
    flex: 1,
    alignItems: "center",
    marginTop: '10%'
  },
  footerText: {
    fontSize: 16,
    color: '#2e2e2d'
  },
  footerLink: {
    color: "#788eec",
    fontWeight: "bold",
    fontSize: 16
  }
});