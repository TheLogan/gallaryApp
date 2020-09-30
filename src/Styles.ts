import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
  camera: {flex: 1, alignItems: 'center'},
  snapButton: {flex: 0, flexDirection: 'row', justifyContent: 'center'},
  snapText: {fontSize: 14},
  button: {backgroundColor: 'red'},
  outer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    height: '50%',
  },
  imageRender: {
    width: '50%',
    height: '50%',
  },
  fullscreen: {
    width: '100%',
    height: '100%',
  },
  flex: {
    flex: 1,
  },
});
