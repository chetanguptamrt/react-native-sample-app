import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import People from './People'
import All from './All'
import Request from './Request'
import { SafeAreaView } from 'react-native-safe-area-context'

const Network = () => {

    const [selectedButton, setSelectedButton] = useState('people')

    const changeTab = (name) => {
        setSelectedButton(name)
    }

    return (
        <SafeAreaView>
            <View style={{ padding: 10 }}>
                <Text style={{ fontSize: 18, fontWeight: 'bold' }} >Network</Text>
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: 10,
                        marginTop: 12,
                    }}
                >
                    <TouchableOpacity
                        onPress={() => changeTab('people')}
                        style={[{
                            flex: 1,
                            paddingVertical: 8,
                            paddingHorizontal: 15,
                            backgroundColor: 'white',
                            borderColor: '#D0D0D0',
                            borderRadius: 6,
                            borderWidth: 0.7,
                            alignItems: 'center',
                        },
                        selectedButton === 'people' ? { backgroundColor: 'black' } : null
                        ]}
                    >
                        <Text style={selectedButton === 'people' ? { color: 'white', fontSize: 16 } : { fontSize: 16 }}>People</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => changeTab('all')}
                        style={[{
                            flex: 1,
                            paddingVertical: 8,
                            paddingHorizontal: 15,
                            backgroundColor: 'white',
                            borderColor: '#D0D0D0',
                            borderRadius: 6,
                            borderWidth: 0.7,
                            alignItems: 'center',
                        },
                        selectedButton === 'all' ? { backgroundColor: 'black' } : null
                        ]}
                    >
                        <Text style={selectedButton === 'all' ? { color: 'white', fontSize: 16 } : { fontSize: 16 }}>My People</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => changeTab('request')}
                        style={[{
                            flex: 1,
                            paddingVertical: 8,
                            paddingHorizontal: 15,
                            backgroundColor: 'white',
                            borderColor: '#D0D0D0',
                            borderRadius: 6,
                            borderWidth: 0.7,
                            alignItems: 'center',
                        },
                        selectedButton === 'request' ? { backgroundColor: 'black' } : null
                        ]}
                    >
                        <Text style={selectedButton === 'request' ? { color: 'white', fontSize: 16 } : { fontSize: 16 }}>Requests</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{ paddingHorizontal: 10 }}>
                {selectedButton === 'people' && <People />}
                {selectedButton === 'all' && <All />}
                {selectedButton === 'request' && <Request />}
            </View>
        </SafeAreaView>
    )
}

export default Network

const styles = StyleSheet.create({})