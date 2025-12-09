
import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, Alert, StyleSheet } from 'react-native';
import axios from 'axios';
import { createMMKV } from 'react-native-mmkv'

// const BASE_URL = 'https://altiskill.com';
const BASE_URL ='https://upskillme.fr/staging';
const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const storage = createMMKV()
  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert('Error', 'Please enter both email and password');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(`${BASE_URL}/login/user`, {
        email: email.trim(),
        password: password.trim(),
      });
      storage.set('isLogin', true)
      storage.set('email', email)
      console.log('✅ Full Response:', response.data);
      navigation.replace('Home');
      Alert.alert('Success', response.data.message || 'Login successful!');
    } catch (error) {
      console.log('❌ Error:', error.response ? error.response.data : error.message);
      Alert.alert('Error', error.response?.data?.message || 'Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let isLogin=storage.getBoolean('isLogin')
    if(isLogin){
      navigation.navigate('Home')
    }
  }, [])
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        placeholderTextColor="#999"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={styles.input}
        placeholder="Enter your password"
        placeholderTextColor="#999"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity
        style={[styles.button, loading && { opacity: 0.6 }]}
        onPress={handleLogin}
        disabled={loading}
      >
        {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Login</Text>}
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate('ForgotPassword')}
        style={{ alignSelf: 'flex-end', marginTop: 10 }}
      >
        <Text style={{ color: '#007AFF', fontSize: 14, fontWeight: '500' }}>
          Forgot Password?
        </Text>
      </TouchableOpacity>

    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#000',
    marginBottom: 20,
  },
  button: {
    width: '100%',
    backgroundColor: '#007AFF',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});
