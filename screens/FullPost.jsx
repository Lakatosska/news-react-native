import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { View } from 'react-native';
import styled from 'styled-components/native';
import { Loading } from '../components/Loading';

const PostImage = styled.Image`
  border-radius: 10px;
  width: 100%;
  height: 250px;
  margin-bottom: 20px;
`;

const PostText = styled.Text`
  font-size: 18px;
  line-height: 24px;
`;

export const FullPostScreen = ({ route, navigation }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const { id, title } = route.params;

  useEffect(() => {
    navigation.setOptions({
      title,
    });
    axios
      .get('https://651e852544a3a8aa4768835c.mockapi.io/articles/' + id)
      .then(({ data }) => {
        setData(data);
      })
      .catch((error) => {
        console.log(error)
        Alert.alert('Ошибка', 'Не удалось получить статью')
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [])

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Loading />
      </View>
    )
  }

  return (
    <View style={{ padding: 15 }}>
      <PostImage source={{ uri: data.imageUrl }}/>
      <PostText>
        {data.text}
      </PostText>
    </View>
  )
}