import React from 'react';
import { StyleSheet, KeyboardAvoidingView } from 'react-native';
import { Form, Item, Input, Button, Text, Picker, Icon, Label } from 'native-base';
import { darkBlue, darkGreen, white } from '../helpers/colors';
import { BASE_URL } from 'react-native-dotenv';
import { processResponse } from '../helpers/utils';

class SignUp extends React.Component {
  state = {
    user_name: "",
    password: "",
    age: "3"
  };

  onValueChange(value) {
    this.setState({
      age: value
    });
  }

  onSubmit = () => {
    const { user_name, password, age } = this.state;
    const payload = {
      user_name: user_name,
      password: password,
      age: age
    }
    fetch(`${BASE_URL}/adduser`, { 
      headers: { 
        'content-type': 'application/json'
      },
      method: "POST",
      body: JSON.stringify(payload)
    })
    .then(processResponse)
    .then(res => {
      const { statusCode, data } = res;
      console.log("statusCode",statusCode);
      console.log("data",data);
    })
    .catch(err => {
      console.log(err)
      throw err
    })
  }

  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
        <Form>
          <Item style={styles.inputContainer} stackedLabel underline>
            <Input 
              placeholder="Username" 
              placeholderTextColor={white}
              style={{color: white}}
              onChangeText={(user_name) => this.setState({user_name})}
            />
          </Item>
          <Item style={styles.inputContainer} stackedLabel underline>
            <Input
              placeholder="Password"
              secureTextEntry={true}
              placeholderTextColor={white}
              style={{color: white}}
              onChangeText={(password) => this.setState({password})}
            />
          </Item>
          <Label style={[styles.inputContainer, styles.label]}>Age</Label>
          <Picker
            mode="dropdown"
            iosHeader="Age"
            iosIcon={<Icon style={{color: white}} name="ios-arrow-down-outline" />}
            style={{ marginLeft: 20 }}
            selectedValue={this.state.age}
            textStyle={{ color: white }}
            onValueChange={this.onValueChange.bind(this)}
          >
            <Picker.Item label="3" value="3" />
            <Picker.Item label="4" value="4" />
            <Picker.Item label="5" value="5" />
            <Picker.Item label="6" value="6" />
            <Picker.Item label="7" value="7" />
          </Picker>
        </Form>
        <Button style={styles.button} block onPress={this.onSubmit}>
          <Text>Sign Up</Text>
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
  label: {
    marginTop: 30,
    color: white
  },
  button: {
    margin: 20,
    backgroundColor: darkBlue
  }
})

export default SignUp;