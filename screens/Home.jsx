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
  TouchableOpacity
} from 'react-native';
import { Post } from '../components/Post';
import { useState, useEffect } from 'react';
import styled from 'styled-components/native';
import { Loading } from '../components/Loading';

export const HomeScreen = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [items, setItems] = useState([]);

  const fetchPosts = () => {
    setIsLoading(true);
    axios
      .get('https://651e852544a3a8aa4768835c.mockapi.io/articles')
      .then(({ data }) => {
        setItems(data)
      })
      .catch((error) => {
        console.log(error)
        Alert.alert('Ошибка', 'Не удалось получить статьи')
      })
      .finally(() => {
        setIsLoading(false)
      })
  };

  useEffect(fetchPosts, []);

  if (isLoading) {
    return (
      <View>
        <Loading />
      </View>
    )
  }

  return (
    <View>
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
          <TouchableOpacity onPress={() => navigation.navigate('FullPost', { id: item.id, title: item.title })}>
            <Post 
              title={item.title} 
              imageUrl={item.imageUrl} 
              createdAt={item.createdAt} 
            />
          </TouchableOpacity>
        }
      />
    </View>
  );
}
