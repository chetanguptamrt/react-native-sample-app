import { Alert, FlatList, Image, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { getAuthHeader } from '../../services/auth.service'

const People = () => {

    const [search, setSearch] = useState('')
    const [users, setUsers] = useState([])

    useEffect(() => {
        fetchPeople()
    }, [search])

    const fetchPeople = async () => {
        try {
            const res = await axios({
                url: 'http://10.0.2.2:8080/my-people',
                method: 'GET',
                params: {
                    search,
                },
                ...await getAuthHeader(),
            })
            setUsers(res?.data?.data || [])
        } catch (err) {
            console.error(err)
        }
    }

    const followPeople = async (userId) => {
        try {
            const res = await axios({
                url: `http://10.0.2.2:8080/unfollow/${userId}`,
                method: 'POST',
                params: {
                    search,
                },
                ...await getAuthHeader(),
            })
            Alert.alert(res.data.message)
            setUsers(old => old.filter(user => user._id !== userId))
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <View>
            <TextInput
                style={{
                    borderWidth: 1,
                    paddingHorizontal: 10,
                    paddingVertical: 4,
                    borderRadius: 6,
                }}
                value={search}
                onChangeText={(value) => { setSearch(value) }}
                placeholder='Search...'
            />

            <FlatList
                data={users}
                renderItem={({ item }) =>
                    <View style={{ padding: 5, flexDirection: 'row', backgroundColor: 'white', borderWidth: 0.5, borderColor: '#d0d0d0', justifyContent: 'space-between' }}>
                        <View style={{ padding: 5, flexDirection: 'row' }}>
                            <Image style={{ width: 24, height: 24 }} source={require('../../assets/user.png')} />
                            <Text style={{ marginLeft: 4, fontSize: 16, textTransform: 'capitalize' }}>{item.name}</Text>
                        </View>
                        <View style={{ padding: 6 }}>
                            <Pressable
                                onPress={() => {
                                    followPeople(item._id)
                                }}
                                style={{ borderRadius: 2, borderWidth: .5, paddingVertical: 1, paddingHorizontal: 5 }}
                            >
                                <Text>Unfollow</Text>
                            </Pressable>
                        </View>
                    </View>
                }
                keyExtractor={item => item._id}
                style={{ marginTop: 5, marginBottom: 310 }}
            />
        </View>
    )
}

export default People

const styles = StyleSheet.create({})