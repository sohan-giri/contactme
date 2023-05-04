import { StatusBar, TouchableOpacity, StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import { Formik } from 'formik'
import * as Yup from 'yup'
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import * as sgMail from '@sendgrid/mail';


const SignupSchema = Yup.object().shape({
  name: Yup.string()
    .min(6, 'Too Short!')
    .max(30, 'Too Long!')
    .required('Please enter your full name'),

  email: Yup.string().email('Invalid email').required('Please enter your email address'),
  mobile: Yup.string()
    .min(10, 'Must be 10 digit number')
    .max(10, 'Must be 10 digit number')
    .matches(/^[0-9]+$/, 'Must be only digits')
    .required('Please enter your mobile number'),

  txt: Yup.string()
    .max(100, 'Word limit exceeded!')
    .required('Please describe your query within a word limit of 50. We will try to reach you as soon as possible'),
});

const App = () => {

  sgMail.setApiKey(process.env.YiOuYA0IRwyr8CwJcUwayA);

  const handleEmail = async (values) => {
    try {
      const msg = {
        to: 'info@redpositive.in', 
        from: 'sgiri7598@gmail.com', 
        subject: 'New message from contact form',
        text: `Name: ${values.name}\nEmail: ${values.email}\nMobile: ${values.mobile}\nMessage: ${values.txt}`,
        html: `<p>Name: ${values.name}</p><p>Email: ${values.email}</p><p>Mobile: ${values.mobile}</p><p>Message: ${values.txt}</p>`,
      };
      await sgMail.send(msg);
      alert('Your message has been sent!');
    } catch (error) {
      console.error(error);
      alert('Sorry, there was an error sending your message. Please try again later.');
    }
  };

   return (
    <Formik
      initialValues={{
        name: '',
        mobile: '',
        email: '',
        txt: '',
      }}
      validationSchema={SignupSchema}
      onSubmit={handleEmail}
    >
      {({ values, errors, touched, handleChange, setFieldTouched, isValid,
      
       handleEmail  
       
       
    }) => (

      

      <View style={styles.wrapper}>
          <StatusBar barStyle={'light-content'} />
          <View style={styles.formContainer}>
            <Text style={styles.title}>Contact US <Ionicons name="ios-phone-portrait-outline" size={30} color="#000" />
</Text>
            

            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.inputStyle}
                placeholder='Full Name'
                value={values.name}
                
                onChangeText={handleChange('name')}
                onBlur={() => setFieldTouched('name')}
              />
              <FontAwesome name="user" size={20} style={{ position: 'absolute', top: 25, left: 300 }} />
              {touched.name && errors.name && (
                <Text style={styles.errorTxt}>{errors.name}</Text>
              )}
            </View>

            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.inputStyle}
                placeholder='Phone number'
                value={values.mobile}
                keyboardType='phone-pad'
                onChangeText={handleChange('mobile')}
                onBlur={() => setFieldTouched('mobile')}
              />
              <FontAwesome name="phone" size={20} style={{ position: 'absolute', top: 25, left: 300 }} />
              {touched.mobile && errors.mobile && (
                <Text style={styles.errorTxt}>{errors.mobile}</Text>
              )}
            </View>

            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.inputStyle}
                placeholder='Email id'
                value={values.email}
                autoCapitalize= "false"
                onChangeText={handleChange('email')}
                onBlur={() => setFieldTouched('email')}
              />

              <FontAwesome name="envelope" size={20} style={{ position: 'absolute', top: 25, left: 300 }} />
              {touched.email && errors.email && (
                <Text style={styles.errorTxt}>{errors.email}</Text>
              )}
            </View>

            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.inputStyle}
                placeholder='Message'
                value={values.txt}
                onChangeText={handleChange('txt')}
                onBlur={() => setFieldTouched('txt')}
              />
              <Feather name="message-circle" size={20} style={{ position: 'absolute', top: 25, left: 300 }} />
              {touched.txt && errors.txt && (
                <Text style={styles.errorTxt}>{errors.txt}</Text>
              )}
            </View>

            <TouchableOpacity
              onPress={handleEmail}
              style={[
                styles.submitBtn,
                { backgroundColor: isValid ? '#395864' : '#A5C9CA' },
              ]}
              disabled={!isValid && Object.values(values).every((value) => !value.trim())}
              
            >
              <Text style={styles.submitBtnTxt}>Send</Text>
            </TouchableOpacity>
         

      </View>
     </View>
    
    )}
    </Formik>
    );  
};

export default App

const styles = StyleSheet.create({


wrapper: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#2C3333',
  paddingHorizontal: 10,


},


formContainer: {
  backgroundColor: '#F5EDDC',
  padding: 30,
  borderRadius: 20,
  width: '95%',

},

title: {
  color: '#16213E',
  fontSize: 30,
  fontWeight: '600',
  marginBottom: 10,
  
  

},

inputWrapper: {
  marginBottom: 7,
  marginRight: 20

},

inputStyle: {
  borderColor: '#16213E',
  borderWidth: 1,
  borderRadius: 15,
  padding: 20, 
},




errorTxt: {
  fontSize: 13,
  color: '#FF0D10',
  marginLeft: 8,

},

submitBtn: {
  
  padding: 10,
  borderRadius: 25,
  justifyContent: 'center',
  marginLeft: 80,
  marginRight: 80,
  
},

submitBtnTxt: {
  color: '#fff',
  textAlign: 'center',
  fontSize: 23,
  fontWeight: '700',
  

},

});





