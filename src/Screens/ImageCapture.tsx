import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TouchableWithoutFeedback,
  Dimensions,
} from 'react-native';
import {RNCamera, TakePictureResponse} from 'react-native-camera';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as GalleryCaller from '../NetworkManagers/GalleryCaller';
import styles from '../Styles';
import {Button, TextInput} from 'react-native-paper';
import ImageZoom from 'react-native-image-pan-zoom';

const ImageCapture = () => {
  const [camera, setCamera] = useState<RNCamera | null>(null);
  const [showCamera, setShowCamera] = useState(false);
  const [image, setImage] = useState<null | TakePictureResponse>(null);
  const [name, setName] = useState('');
  const [viewDatePicker, setViewDatePicker] = useState(false);
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState('');
  const [viewImage, setViewImage] = useState(false);

  function renderMain() {
    return (
      <>
        <Button onPress={() => setShowCamera(true)}>Camera</Button>
      </>
    );
  }

  function renderCamera() {
    return (
      <View style={styles.container}>
        <RNCamera
          style={styles.camera}
          captureAudio={false}
          ref={(ref) => {
            setCamera(ref);
          }}
        />

        <View style={styles.snapButton}>
          <TouchableOpacity
            onPress={() => takePicture()}
            style={styles.capture}>
            <Text style={styles.snapText}> SNAP </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  async function takePicture() {
    if (camera) {
      const options = {quality: 0.5, base64: true};
      const data = await camera.takePictureAsync(options);
      setShowCamera(false);
      setImage(data);
    }
  }

  function renderImage() {
    return (
      <>
        <TouchableWithoutFeedback
          style={styles.outer}
          onPress={() => setViewImage(true)}>
          <Image
            source={{uri: `data:image/gif;base64,${image?.base64}`}}
            style={styles.imageRender}
          />
        </TouchableWithoutFeedback>
        <Text>Name: </Text>
        <TextInput onChangeText={(text) => setName(text)} value={name} />
        {viewDatePicker && (
          <DateTimePicker
            value={date}
            mode="datetime"
            display="default"
            onChange={(dateEvent) => changedDatePicker(dateEvent)}
          />
        )}
        <Text>Date: </Text>
        <TouchableWithoutFeedback onPress={() => setViewDatePicker(true)}>
          <Text>{date.toLocaleDateString()}</Text>
        </TouchableWithoutFeedback>
        <Text>Notes: </Text>
        <TextInput onChangeText={(text) => setNotes(text)} value={notes} />

        <Button onPress={() => sendImageData()}>Submit</Button>
      </>
    );
  }

  function changedDatePicker(dateEvent: any) {
    if (dateEvent.type === 'dismissed') {
      setViewDatePicker(false);
    } else if (dateEvent.type === 'set') {
      setDate(new Date(dateEvent.nativeEvent.timestamp));
      setViewDatePicker(false);
    }
    console.log(dateEvent);
  }

  async function sendImageData() {
    let response = await GalleryCaller.sendRequest();
    if (response === true) {
      console.log('yay');
    } else {
      console.log('doh');
    }
  }

  function renderView() {
    if (viewImage) {
      return (
        <View style={[styles.flex, styles.fullscreen]}>
          <TouchableOpacity
            style={styles.capture}
            onPress={() => setViewImage(false)}>
            <Text style={styles.snapText}> Back </Text>
          </TouchableOpacity>
          <ImageZoom
            cropWidth={Dimensions.get('screen').width}
            cropHeight={Dimensions.get('screen').height}
            imageWidth={Dimensions.get('screen').width}
            imageHeight={Dimensions.get('screen').height}>
            <Image
              source={{uri: `data:image/gif;base64,${image?.base64}`}}
              style={styles.fullscreen}
            />
          </ImageZoom>
        </View>
      );
    }

    if (!showCamera) {
      if (image != null) {
        console.log();
        return (
          <>
            {renderMain()}
            {renderImage()}
          </>
        );
      }
      return <>{renderMain()}</>;
    } else {
      return <>{renderCamera()}</>;
    }
  }

  // Renders the page

  return renderView();
};

export default ImageCapture;
