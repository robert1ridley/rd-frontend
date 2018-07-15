import React from 'react';
import { StyleSheet, KeyboardAvoidingView } from 'react-native';
import { Form, Item, Input, Button, Text } from 'native-base';
import { darkBlue, darkGreen, white } from '../helpers/colors';

class Login extends React.Component {
  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
        <Form>
          <Item style={styles.inputContainer} stackedLabel underline>
            <Input 
              placeholder="Username" 
              placeholderTextColor={white}
              style={{color: white}}
            />
          </Item>
          <Item style={styles.inputContainer} stackedLabel underline>
            <Input
              placeholder="Password"
              secureTextEntry={true}
              placeholderTextColor={white}
              style={{color: white}}
            />
          </Item>
        </Form>
        <Button style={styles.button} block>
          <Text>Login!</Text>
        </Button>
      </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: darkGreen
  },
  inputContainer: {
    marginBottom: 5,
    marginLeft: 20,
    marginRight: 20,
  },
  button: {
    margin: 20,
    backgroundColor: darkBlue
  }
})

export default Login;