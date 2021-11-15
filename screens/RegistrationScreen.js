import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import ErrorMessage from '../components/ErrorMessage';
import Firebase from '../config/firebase';

export default function RegistrationScreen({ navigation }) {
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [signupError, setSignupError] = useState('');

  const onFooterLinkPress = () => {
    navigation.goBack();
  }

  const onRegisterPress = async () => {
    try {
      if(nickname !== '' && email !== '' && password !== ''
          && confirmPassword !== '') {
        
        if(password === confirmPassword){
          await Firebase.auth()
            .createUserWithEmailAndPassword(email, password);
        
          navigation.navigate({
            name: 'Home',
            params: {
              nickname: nickname
            }
          });
        
        } else{
          setSignupError("Passwords doesn't match!");
          return;
        }
      }
    } catch(error) {
      setSignupError(
        error.message.substring(10, error.message.length)
      );
    }
  }

  useEffect(() => {
    navigation.setOptions({
      headerTitle: 'Registration'
    });
  }, []);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder='Nickname'
        placeholderTextColor="#aaaaaa"
        onChangeText={(text) => setNickname(text)}
        value={nickname}
        underlineColorAndroid="transparent"
        autoCapitalize="none"
      />
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
      <TextInput
        style={styles.input}
        secureTextEntry
        placeholder='Confirm Password'
        placeholderTextColor="#aaaaaa"
        onChangeText={(text) => setConfirmPassword(text)}
        value={confirmPassword}
        underlineColorAndroid="transparent"
        autoCapitalize="none"
      />
      {signupError ? <ErrorMessage error={signupError} visible={true} /> : null}
      <TouchableOpacity
        style={styles.button}
        onPress={() => onRegisterPress()}>
        <Text style={styles.buttonTitle}>Create account</Text>
      </TouchableOpacity>
      <View style={styles.footerView}>
        <Text style={styles.footerText}>Already got an account? <Text onPress={onFooterLinkPress} style={styles.footerLink}>Log in</Text></Text>
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