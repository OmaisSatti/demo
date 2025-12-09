import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { createMMKV, useMMKVString } from 'react-native-mmkv'

const Home = ({ navigation }) => {
  let user = useMMKVString('email')
  const storage = createMMKV()

  const handleLogOut = () => {
    storage.remove('isLogin')
    storage.remove('email')
    console.log('✅ Logout success:');
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }]
    })
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Welcome: {user}</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={handleLogOut}
      >
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
  button: {
    width: '90%',
    marginVertical: 10,
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
})