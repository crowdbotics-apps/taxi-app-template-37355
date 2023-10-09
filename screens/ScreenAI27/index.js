import React, { useState } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Camera } from 'expo-camera';

const CameraScreen = () => {
  const [image, setImage] = useState(null);
  const [camera, setCamera] = useState(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const takePicture = async () => {
    if (camera) {
      let photo = await camera.takePictureAsync();
      setImage(photo.uri);
    }
  };

  return <SafeAreaView style={styles.container}>
      <View style={styles.cameraContainer}>
        <Camera style={styles.camera} ref={ref => setCamera(ref)} />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={takePicture} style={styles.button}>
          <Text style={styles.text}>Take Picture</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={pickImage} style={styles.button}>
          <Text style={styles.text}>Pick an image from gallery</Text>
        </TouchableOpacity>
      </View>
      {image && <Image source={{
      uri: image
    }} style={styles.image} />}
    </SafeAreaView>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  cameraContainer: {
    flex: 1
  },
  camera: {
    flex: 1
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10
  },
  button: {
    backgroundColor: '#1e90ff',
    padding: 10,
    borderRadius: 5
  },
  text: {
    color: '#fff',
    fontSize: 16
  },
  image: {
    width: '100%',
    height: 300
  }
});
export default CameraScreen;