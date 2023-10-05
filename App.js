import axios from 'axios';
import { StatusBar } from 'expo-status-bar';
import { 
  StyleSheet, 
  Text, 
  View, 
  Image, 
  Alert, 
  FlatList, 
  ActivityIndicator,
  RefreshControl, 
} from 'react-native';
import { Post } from './components/Post';
import { useState, useEffect } from 'react';
import styled from 'styled-components/native';

const StView = styled.View`
  margin-top: 40px;
`;

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [items, setItems] = useState([]);

  const fetchPosts = () => {
    setIsLoading(true);
    axios.get('https://651e852544a3a8aa4768835c.mockapi.io/articles')
      .then(({ data }) => {
        setItems(data)
      })
      .catch((error) => {
        console.log(error)
        Alert.alert('Error', 'Something went wrong!')
      })
      .finally(() => {
        setIsLoading(false)
      })
  };

  useEffect(fetchPosts, []);

  if (isLoading) {
    return (
      <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <ActivityIndicator size="large" />
        <Text style={{ marginTop: 15 }}>Загрузка...</Text>
      </View>
    )
  }

  return (
    <StView>
      <ActivityIndicator size="large" color="#0000ff" animating={isLoading} />
      <FlatList
        refreshControl={
          <RefreshControl 
            refreshing={isLoading} 
            onRefresh={fetchPosts} 
          />
        }
        data={items}
        renderItem={({ item }) => 
          <Post 
            title={item.title} 
            imageUrl={item.imageUrl} 
            createdAt={item.createdAt} 
          />
        }
      />
      <StatusBar theme='auto' />
    </StView>
  );
}
