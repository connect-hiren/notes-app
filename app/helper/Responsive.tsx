import { Dimensions, Platform } from 'react-native';
const { width } = Dimensions.get('window');
 
const aspectRatio = width / (Platform.OS === "ios" ? 480 : 450);
 
const getLayoutSize = (valueDimen:number) => {
  var newScale = ((aspectRatio * valueDimen) - valueDimen) * 0.5 + valueDimen
  return newScale
};
 
const getFontSize = (valueFontSize:number) => {
  var newScale = ((aspectRatio * valueFontSize) - valueFontSize) * 0.8 + valueFontSize
  return newScale
};
 
export {
  getLayoutSize,
  getFontSize
};
