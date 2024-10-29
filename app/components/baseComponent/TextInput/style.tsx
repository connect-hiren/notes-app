import { StyleSheet } from 'react-native';
import { Colors, AppFonts, ScaleFonts, ScaleSize } from '../../../helper';

const baseInputStyle = {
  paddingVertical: ScaleSize.SPACING_25 / 2,
  backgroundColor: Colors.textInputBackground,
  flex: 1,
  fontSize: ScaleFonts.SIZE_16,
  color: Colors.secondary,
  fontFamily: AppFonts.Medium,
};

export const styles = StyleSheet.create({
    inputView: {
      marginVertical: ScaleSize.SPACING_5 ,
    },
    inputView1:{
      marginVertical: ScaleSize.SPACING_15 ,
    },
    viewIconIncluded: {
      flexDirection: 'row',
    },
    dateText: {
      fontSize: ScaleFonts.SIZE_16,
      color: Colors.secondary,
      fontFamily: AppFonts.Medium,
      paddingVertical: 4,
    },
    inputCommon: {
      ...baseInputStyle,
      paddingLeft: 0,
    },
    inputCommon1: {
      ...baseInputStyle,
      paddingLeft: ScaleSize.SPACING_15,
    },
    inputType1: {
      borderBottomWidth: 1,
      overflow: 'hidden',
      borderColor: Colors.inputBorderColor
    },
    inputType2: {
      borderWidth: 1,
      borderRadius: ScaleSize.SPACING_30,
      overflow: 'hidden',
      borderColor: Colors.inputBorderColor
    },
    errorText: {
      color: Colors.errorText,
      paddingLeft: ScaleSize.SPACING_20,
    },
    leftIconView: {
      justifyContent: 'center',
      paddingHorizontal: ScaleSize.SPACING_10 * 1.2,
      backgroundColor: Colors.textInputBackground,
    },
    rightIconView: {
      justifyContent: 'center',
      backgroundColor: Colors.textInputBackground,
      paddingHorizontal: ScaleSize.SPACING_10 * 1.2,
    },
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
      width: '80%',
      paddingVertical: ScaleSize.SPACING_30,
      backgroundColor: Colors.textInputBackground,
      padding: ScaleSize.SPACING_20,
      borderRadius: ScaleSize.SPACING_10,
      alignItems: 'center',
    },
    modalText: {
      fontSize: ScaleFonts.SIZE_18,
      color: Colors.secondary,
      marginBottom: 20,
      fontFamily: AppFonts.SemiBold
    },
    closeButton: {
      backgroundColor: Colors.primary,
      padding: ScaleSize.SPACING_10,
      borderRadius: ScaleSize.SPACING_10,
    },
    closeButtonText: {
      color: Colors.secondary,
      fontSize: ScaleFonts.SIZE_16,
      fontFamily: AppFonts.SemiBold
    },
  });