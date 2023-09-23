import { FlatList, Image, StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { getAuthHeader, getSessionData } from '../services/auth.service'
import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios'
import { StatusBar } from 'expo-status-bar';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';

const Home = () => {

    const [posts, setPosts] = useState([])
    const [session, setSession] = useState({})

    useEffect(() => {
        getSessionData().then(res => setSession(res));
        getPosts()
    }, [])

    useFocusEffect(
        useCallback(() => {
            getPosts()
        }, [])
    )

    const getPosts = async () => {
        try {
            const res = await axios({
                url: 'http://10.0.2.2:8080/posts',
                method: 'GET',
                ...await getAuthHeader(),
            })
            setPosts(res.data?.data)
        } catch (err) {
            console.log(err)
        }
    }

    const handlePostLike = async (postId) => {
        try {
            await axios({
                url: `http://10.0.2.2:8080/like/${postId}`,
                method: 'POST',
                ...await getAuthHeader(),
            })
            setPosts(old => old.map(post => {
                if (post._id === postId) {
                    post.likes.push(session._id)
                }
                return post
            }))
        } catch (err) {
            console.log(err);
        }
    }

    const handlePostUnLike = async (postId) => {
        try {
            await axios({
                url: `http://10.0.2.2:8080/unlike/${postId}`,
                method: 'POST',
                ...await getAuthHeader(),
            })
            setPosts(old => old.map(post => {
                if (post._id === postId) {
                    post.likes = post.likes.filter(userId => userId !== session._id)
                }
                return post
            }))
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <SafeAreaView>
            <StatusBar
                backgroundColor={'white'}
                barStyle={'default'}
                hidden={false}
                animated={true}
                showHideTransition={'fade'}
            />
            <View style={{ backgroundColor: 'white', padding: 4 }}>
                <Text style={{ fontSize: 16, fontWeight: '500' }}>TODO App</Text>
            </View>
            <FlatList
                data={posts}
                renderItem={({ item }) =>
                    <View style={{ padding: 10, backgroundColor: 'white', borderWidth: 0.5, borderColor: '#d0d0d0', justifyContent: 'space-between' }}>
                        <View style={{ paddingHorizontal: 5, flexDirection: 'row' }}>
                            <Image style={{ width: 22, height: 22 }} source={require('../assets/user.png')} />
                            <Text style={{ marginLeft: 4, fontSize: 14, textTransform: 'capitalize' }}>{item.userId.name}</Text>
                        </View>
                        <View style={{ paddingTop: 6 }}>
                            <Text style={{ marginLeft: 4, fontSize: 14, textTransform: 'capitalize' }}>{item.content}</Text>
                            <View style={{ paddingTop: 6, flexDirection: 'row', gap: 8 }}>
                                {
                                    item.likes.includes(session._id)
                                        ? <AntDesign
                                            onPress={() => { handlePostUnLike(item._id) }}
                                            style={{ paddingTop: 1 }}
                                            name='heart'
                                            size={18}
                                            color='red'
                                        />
                                        : <AntDesign
                                            onPress={() => { handlePostLike(item._id) }}
                                            style={{ paddingTop: 1 }}
                                            name={"hearto"}
                                            size={18}
                                            color={"black"}
                                        />
                                }
                                <FontAwesome name="comment-o" size={18} color="black" />
                                <Entypo name="share" size={18} color="black" />
                            </View>

                            <View style={{ paddingTop: 6, flexDirection: 'row' }}>
                                <Text style={{ marginLeft: 4, fontSize: 12, color: 'grey', textTransform: 'capitalize' }}>{item.likes.length} likes</Text>
                                <Text style={{ marginLeft: 4, fontSize: 12, textTransform: 'capitalize' }}>{item.comments.length} comments</Text>
                            </View>
                        </View>
                    </View>
                }
                keyExtractor={item => item._id}
                style={{ marginTop: 5, marginBottom: 36 }}
            />
        </SafeAreaView>
    )
}

export default Home

const styles = StyleSheet.create({})