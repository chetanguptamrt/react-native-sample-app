import { SafeAreaView, StyleSheet, Text, View, Image, KeyboardAvoidingView, TextInput, Pressable, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios'
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getAuthHeader, isLogin } from '../services/auth.service'

const Login = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigation = useNavigation()

  useEffect(() => {
    validateSession()
  }, [])

  const validateSession = async () => {
    try {
      if (await isLogin()) {
        const res = await axios({
          url: 'http://10.0.2.2:8080/session',
          method: 'POST',
          ...await getAuthHeader(),
        })
        navigation.navigate('Session')
        await AsyncStorage.setItem('session', JSON.stringify(res.data.session))
      }
    } catch (err) {
      console.error(err)
    }
  }

  const handleLogin = async () => {
    try {
      const res = await axios({
        url: 'http://10.0.2.2:8080/login',
        method: 'POST',
        data: { email, password },
      })
      Alert.alert(res.data.message)
      await AsyncStorage.setItem('token', res.data.token)
      setEmail('')
      setPassword('')
      navigation.navigate('Session')
    } catch (err) {
      console.log(err)
      Alert.alert(err.response.data.message);
    }
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white', alignItems: 'conter' }}>
      <View style={{ marginTop: 100, alignItems: 'center' }}>
        <Image
          style={{ width: 150, height: 100, resizeMode: 'contain' }}
          source={{ uri: 'https://cdn-icons-png.flaticon.com/512/1077/1077012.png' }}
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
          <View style={{ flexDirection: "row", alignItems: 'center', justifyContent: 'center', marginTop: 8 }}>
            <Text>Keep me logged in </Text>
            <Text style={{ fontWeight: '500', color: '#007fff', textDecorationLine: 'underline' }}>Forgot password</Text>
          </View>

          <Pressable onPress={handleLogin} style={{ width: 150, alignItems: 'center', borderRadius: 6, backgroundColor: 'blue', padding: 10, marginTop: 10, marginRight: 'auto', marginLeft: 'auto' }}>
            <Text style={{ color: 'white', fontSize: 16 }}>Login</Text>
          </Pressable>

          <Pressable style={{ margin: 10, alignItems: 'center' }} onPress={() => { navigation.navigate('Signup') }}>
            <Text style={{ fontSize: 16 }}>Don't have an account? Signup</Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default Login

const styles = StyleSheet.create({

})