import React from 'react';
import { StyleSheet, KeyboardAvoidingView, Alert } from 'react-native';
import { Form, Item, Input, Button, Text, Picker, Icon, Label, View } from 'native-base';
import { darkBlue, darkGreen, white, red } from '../helpers/colors';
import { BASE_URL } from 'react-native-dotenv';
import { processResponse, setWebToken } from '../helpers/utils';

class SignUp extends React.Component {
  state = {
    user_name: "",
    password: "",
    age: "3",
    userError: null,
    passwordError: null,
    ageError: null,
  };

  onValueChange(value) {
    this.setState({
      age: value
    });
  }

  onSubmit = () => {
    const { navigation } = this.props;
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
      const { data } = res;
      if(data.token){
        setWebToken(data.token)
        this.setState({
          userError: null,
          passwordError: null,
          ageError: null
        })
        Alert.alert(
          data.message,
          'Login to your account?',
          [
            {
              text: 'Yes', onPress: () => navigation.navigate(
                'HomeTabs'
              )
            },
            {text: 'No'},
          ],
          { cancelable: false }
        )
      }
      if(data.error){
        this.setState({
          userError: data.error.user_name,
          passwordError: data.error.password,
          ageError: data.error.age
        })
      }
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
          {
            this.state.userError &&
            <View style={styles.errorContainer}>
              <Text style={styles.errorMessage}>{this.state.userError}</Text>
            </View>
          }
          <Item style={styles.inputContainer} stackedLabel underline>
            <Input
              placeholder="Password"
              secureTextEntry={true}
              placeholderTextColor={white}
              style={{color: white}}
              onChangeText={(password) => this.setState({password})}
            />
          </Item>
          {
            this.state.passwordError &&
            <View style={styles.errorContainer}>
              <Text style={styles.errorMessage}>{this.state.passwordError}</Text>
            </View>
          }
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
          {
            this.state.ageError &&
            <View style={styles.errorContainer}>
              <Text style={styles.errorMessage}>{this.state.ageError}</Text>
            </View>
          }
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
  },
  errorContainer: {
    marginLeft: 20
  },
  errorMessage: {
    color: red
  }
})

export default SignUp;