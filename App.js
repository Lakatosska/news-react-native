import { StatusBar } from 'expo-status-bar';
import styled from 'styled-components/native';
import { HomeScreen } from './screens/Home';
import { 
  StyleSheet, 
  Text, 
  View, 
  Image, 
  Alert, 
  FlatList, 
  ActivityIndicator,
  RefreshControl,
  TouchableOpacity,
  
} from 'react-native';
import { FullPostScreen } from './screens/FullPost';
import { Navigation } from './screens/Navigation';

export default function App() {
  return <Navigation />;
}
