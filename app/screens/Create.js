import { Image, Pressable, StyleSheet, Text, TextInput, View, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { getSessionData, getAuthHeader } from '../services/auth.service'
import { useNavigation } from '@react-navigation/native';
import axios from 'axios'

const Create = () => {

  const [session, setSession] = useState({})
  const [message, setMessage] = useState('')
  const navigation = useNavigation()

  useEffect(() => {
    getSessionData().then(res => setSession(res))
  }, [])

  const handleCreatePost = async () => {
    try {
      const res = await axios({
        url: 'http://10.0.2.2:8080/posts',
        method: 'POST',
        data: {
          message,
        },
        ...await getAuthHeader(),
      })
      Alert.alert(res.data.message)
      navigation.navigate('Home')
      setMessage('')
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <SafeAreaView>
      <View style={{ padding: 15, flexDirection: 'row' }}>
        <Image style={{ width: 32, height: 32 }} source={require('../assets/user.png')} />
        <Text style={{ marginLeft: 4, fontSize: 20, textTransform: 'capitalize' }}>{session.name}</Text>
      </View>
      <View style={{ padding: 10 }}>
        <TextInput
          multiline={true}
          value={message}
          onChangeText={setMessage}
          numberOfLines={4}
          style={{
            borderWidth: 0.5,
            borderColor: 'grey',
            borderRadius: 4,
            textAlignVertical: 'top',
            textAlign: 'left',
            paddingHorizontal: 3,
            justifyContent: "flex-start",
          }}
          placeholder='Type your thoughts here...'
        />
        <Pressable
          onPress={handleCreatePost}
          style={{ marginTop: 10, alignItems: 'center', backgroundColor: 'blue', borderRadius: 4, paddingVertical: 5 }}
        >
          <Text style={{ fontSize: 16, color: 'white' }}>Share post</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  )
}

export default Create

const styles = StyleSheet.create({})