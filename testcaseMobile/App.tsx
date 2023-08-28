/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  Text,
  TextInput,
  Button,
  FlatList,
  SafeAreaView,
  View,
  StyleSheet,
} from 'react-native';
import io from 'socket.io-client';

import 'react-native-get-random-values';
import {v4 as uuidv4} from 'uuid';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {UserListItem} from './src/components/UserListItem';

const socket = io('http://localhost:3000');

interface Message {
  userId: string;
  message: string;
}

const App: React.FC = () => {
  const [message, setMessage] = useState<string>('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [userId, setUserId] = useState<string | null>(null);
  const [users, setUsers] = useState<string[]>([]);

  useEffect(() => {
    const loadCachedUserId = async () => {
      try {
        const cachedUserId = await AsyncStorage.getItem('userId');
        if (cachedUserId) {
          setUserId(cachedUserId);

          if (!users.includes(cachedUserId)) {
            setUsers([...users, cachedUserId]);
          }
        } else {
          const newUserId = uuidv4();
          setUserId(newUserId);
          if (!users.includes(newUserId)) {
            setUsers([...users, newUserId]);
          }
          await AsyncStorage.setItem('userId', newUserId);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    loadCachedUserId();

    socket.on('message', (msg: Message) => {
      setMessages(prevMessages => [...prevMessages, msg]);
    });

    return () => {
      socket.off('message');
    };
  }, [users]);

  const sendMessage = () => {
    if (message.trim() !== '' && userId) {
      const newMessage: Message = {userId, message};
      socket.emit('message', newMessage);
      setMessage('');
    }
  };

  const handleSelectUser = async (item: string) => {
    setUserId(item);
    await AsyncStorage.setItem('userId', item);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{flex: 0.45}}>
        <Text style={styles.header}>Users</Text>
        <FlatList
          data={users}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({item}) => (
            <UserListItem
              onPress={() => handleSelectUser(item)}
              item={item}
              userId={userId}
            />
          )}
        />
        <Button
          onPress={() => {
            setUsers([...users, uuidv4()]);
          }}
          title="Add User"
        />
      </View>
      <View style={{flex: 0.5}}>
        <Text style={{fontWeight: 'bold'}}>Messages</Text>
        <FlatList
          data={messages}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({item}) => (
            <Text
              style={{
                fontWeight: item.userId === userId ? 'bold' : 'normal',
                marginVertical: 5,
              }}>
              {item.userId}: {item.message}
            </Text>
          )}
        />
        <TextInput
          placeholder="Type a message..."
          value={message}
          onChangeText={text => setMessage(text)}
        />
        <Button title="Send" onPress={sendMessage} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 16,
  },
  header: {
    fontWeight: 'bold',
    marginBottom: 8,
  },
});

export default App;
