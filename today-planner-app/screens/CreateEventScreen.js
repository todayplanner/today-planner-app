import React from 'react';
import { Text, View, Image} from 'react-native';
import { Form, Input, Item, Button, Label } from 'native-base';
import firebase from 'firebase';

export default class CreateEvent extends React.Component {
  static navigationOptions = { title: 'Welcome', header: null};
  constructor(props) {
    super(props)
    this.state = ({
        title: '',
        date: '',
        hour: '',
        place: '',
        length: '',
    })
    if (firebase.auth().currentUser !== null) 
        console.log("user id: " + firebase.auth().currentUser.uid); 
        userId = firebase.auth().currentUser.uid
    
}

createEvent = (title, date, hour, length, location, items) => {
    try {
        if (!this.state.title) {
            alert("Title box must not be empty")
            return;
        }
        if (!this.state.date) {
            alert("Select Date")
            return;
        }
        if (!this.state.hour) {
            alert("Choose the hour")
            return;
        }
        if (!this.state.length) {
            alert("Enter duration of the event")
            return;
        }
        if (!this.state.location) {
            alert("Enter location of the event")
            return;
        }
        alert("Event created")
        this.props.navigation.navigate("NewEvent")
        firebase.database().ref(userId).push({
            title,
            date,
            length,
            hour,
            location
        })
    }
         catch (error) {
         console.log(error.toString())
         console.log(items)
    }
}



render() {
    return (

<View style={{
        flex: 1,
        width: 360,
        height: 640,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <View style={{
          flex: 1,
          width: 360,
          height: 100,
          justifyContent: 'center',
          alignItems: 'center',         
          flexGrow: 1,
          backgroundColor : '#032e5e'
        }} >
          <Image source={require('../assets/iconToday.png')} />
        </View>
        <View style={{
          flex: 1,
          width: 360,
          height: 100,
         
          flexGrow: 2,
          paddingHorizontal: 20               
        }} >
        {this.state.errorMessage &&
          <Text style={{ color: 'red' }}>
            {this.state.errorMessage}
          </Text>}
          
          <Form>
                <Item floatingLabel>
                    <Label style={{color:'#ae0578'}}>title</Label>
                    <Input
                        autoCorrect={false}
                        autoCapitalize="sentences"
                        style={{ color: '#032e5e' }}
                        onChangeText={(title) => this.setState({ title })}
                    />
                </Item>
                <Item floatingLabel>
                    <Label style={{color:'#ae0578'}}>date (YYYY-MM-DD)</Label>
                    <Input
                        secureTextEntry={false}
                        autoCorrect={false}
                        autoCapitalize="none"
                        style={{ color: '#032e5e' }}
                        onChangeText={(date) => this.setState({ date })}
                    />
                </Item>
                <Item floatingLabel>
                    <Label style={{color:'#ae0578'}}>hour</Label>
                    <Input
                        secureTextEntry={false}
                        autoCorrect={false}
                        autoCapitalize="none"
                        style={{ color: '#032e5e' }}
                        onChangeText={(hour) => this.setState({ hour })}
                    />
                </Item>   
                <Item floatingLabel>
                    <Label style={{color:'#ae0578'}}>how many hours?</Label>
                    <Input
                        secureTextEntry={false}
                        autoCorrect={false}
                        autoCapitalize="none"
                        style={{ color: '#032e5e' }}
                        onChangeText={(length) => this.setState({ length })}
                    />
                </Item>
                <Item floatingLabel>
                    <Label style={{color:'#ae0578'}}>where is the event located?</Label>
                    <Input
                        secureTextEntry={false}
                        autoCorrect={false}
                        autoCapitalize="sentences"
                        style={{ color: '#032e5e' }}
                        onChangeText={(location) => this.setState({ location })}
                    />
                </Item>            
                <Button 
                    style={{ marginTop: 40,
                             backgroundColor:'#032e5e'}}
                    full
                    primary
                    onPress={ () => this.createEvent(this.state.title, this.state.date, this.state.hour, this.state.length, this.state.location)}>
                    <Text style={{ color: '#d41998', fontWeight: 'bold', fontSize: 15}}> Create Event </Text>
                </Button>           
            </Form>
          
        </View>
      </View>

    );
}
}
