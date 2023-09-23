import { SafeAreaView, StyleSheet, Text, View, Image, KeyboardAvoidingView, TextInput, Pressable, Alert } from 'react-native'
import React, { useState } from 'react'
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios'

const Signup = () => {

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const navigation = useNavigation()

  const handleSignup = async () => {
    try {
      setIsLoading(true)
      const res = await axios({
        url: 'http://10.0.2.2:8080/signup',
        method: 'POST',
        data: { name, email, password },
      })
      Alert.alert(res.data.message)
      setName('')
      setEmail('')
      setPassword('')
    } catch (err) {
      Alert.alert(err.response.data.message);
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white', alignItems: 'conter' }}>
      <View style={{ marginTop: 100, alignItems: 'center' }}>
        <Image
          style={{ width: 150, height: 100, resizeMode: 'contain' }}
          source={{ uri: 'https://uxwing.com/wp-content/themes/uxwing/download/editing-user-action/signup-icon.png' }}
        />
      </View>
      <KeyboardAvoidingView>
        <View style={{ alignItems: 'center', marginTop: 10, justifyContent: 'center' }}>
          <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Login to your account</Text>

          <View style={{ marginTop: 40 }}>
            <View style={{
              width: 200,
              borderWidth: 1,
              borderRadius: 5,
              paddingHorizontal: 5,
              alignItems: 'center',
              gap: 5,
              borderColor: '#D8D8D8',
              flexDirection: 'row',
              width: 250,
              padding: 5
            }} >
              <AntDesign name="user" size={24} color="black" style={{ marginTop: 1 }} />
              <TextInput
                value={name}
                onChangeText={(value) => {
                  setName(value)
                }}
                style={{ color: 'grey', width: 200 }}
                placeholder='Please enter your name'
              />
            </View>
          </View>

          <View>
            <View style={{
              marginTop: 10,
              width: 200,
              borderWidth: 1,
              borderRadius: 5,
              paddingHorizontal: 5,
              alignItems: 'center',
              gap: 5,
              borderColor: '#D8D8D8',
              flexDirection: 'row',
              width: 250,
              padding: 5
            }} >
              <MaterialIcons name="email" size={24} color="grey" style={{ marginTop: 1 }} />
              <TextInput
                value={email}
                onChangeText={(value) => {
                  setEmail(value)
                }}
                style={{ color: 'grey', width: 200 }}
                placeholder='Please enter your email'
              />
            </View>
          </View>
          <View>
            <View style={{
              marginTop: 10,
              width: 200,
              borderWidth: 1,
              borderRadius: 5,
              paddingHorizontal: 5,
              alignItems: 'center',
              gap: 5,
              borderColor: '#D8D8D8',
              flexDirection: 'row',
              width: 250,
              padding: 5
            }} >
              <AntDesign name="lock1" size={24} color="black" style={{ marginTop: 1 }} />
              <TextInput
                secureTextEntry={true}
                value={password}
                onChangeText={(value) => {
                  setPassword(value)
                }}
                style={{ color: 'grey', width: 200 }}
                placeholder='Please enter your password'
              />
            </View>
          </View>

          <Pressable onPress={handleSignup} disabled={isLoading} style={{ width: 150, alignItems: 'center', borderRadius: 6, backgroundColor: 'blue', padding: 10, marginTop: 10, marginRight: 'auto', marginLeft: 'auto' }}>
            <Text style={{ color: 'white', fontSize: 16 }}>Signup</Text>
          </Pressable>

          <Pressable style={{ margin: 10, alignItems: 'center' }} onPress={() => { navigation.goBack() }}>
            <Text style={{ fontSize: 16 }}>Already have an account? Login</Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default Signup

const styles = StyleSheet.create({})