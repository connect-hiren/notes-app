import { View, Text, StyleSheet, TextInput, Pressable, Platform, Modal, TouchableOpacity } from 'react-native';
import React, { forwardRef, useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Colors, ScaleSize, Constants } from '../../../helper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import moment from 'moment';
import { styles } from './style';
import { iTextInput } from './iTextInput';

const CustomTextInput = forwardRef((props: iTextInput, ref) => {
  const { line, border, type } = props

  const [visible, setVisible] = useState<boolean>(false);
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [date, setDate] = useState<Date>(new Date());
  const [showPicker, setShowPicker] = useState<boolean>(false);
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const onChange = (event: any, selectedDate: any) => {
    const currentDate = selectedDate || date;
    setShowPicker(Platform.OS === 'ios');
    setDate(currentDate);
    props.onChangeDate && props.onChangeDate(currentDate);
  };

  let inputStyle;
  if (line) {
    inputStyle = [styles.viewIconIncluded, styles.inputType1];
  } else if (border) {
    inputStyle = [styles.viewIconIncluded, styles.inputType2];
  } else {
    inputStyle = styles.viewIconIncluded;
  }

  const handlePress = () => {
    if (type == Constants.INPUT.DATE) {
      setShowPicker(true)
    } else if (type == Constants.INPUT.DROPDOWN) {
      setModalVisible(true)
    } else {
      // console.log("123");
    }
  }

  return (
    <View style={props.error ? styles.inputView : styles.inputView1}>
      <TouchableOpacity style={inputStyle} onPress={() => handlePress()}>
        {props.leftIcon && (
          <View style={styles.leftIconView}>
            <MaterialCommunityIcons
              name={props.leftIcon}
              color={Colors.secondary}
              size={ScaleSize.SPACING_20}
            />
          </View>
        )}

        {type == Constants.INPUT.DATE ? (
          <>
            <View style={props.leftIcon ? styles.inputCommon : styles.inputCommon1}>
              <Text style={styles.dateText}>
                {moment(date).format('LL')}
              </Text>
            </View>
            {showPicker && (
              <DateTimePicker
                value={date}
                mode="date"
                display="default"
                onChange={onChange}
              />
            )}
          </>
        ) : type == Constants.INPUT.DROPDOWN ? (
          <>
            <View style={props.leftIcon ? styles.inputCommon : styles.inputCommon1}>
              <Text style={styles.dateText}>
                Open Modal
              </Text>
            </View>
            <Modal
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => setModalVisible(false)}
            >
              <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                  <Text style={styles.modalText}>This is a modal!</Text>
                  <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
                    <Text style={styles.closeButtonText}>Close</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
          </>
        ) : (
          <TextInput
            style={props.leftIcon ? styles.inputCommon : styles.inputCommon1}
            multiline={props.multiline}
            value={props.value}
            cursorColor={Colors.secondary}
            placeholder={props.placeholder}
            placeholderTextColor={Colors.placeholderColor}
            autoCorrect={false}
            enterKeyHint={props.enterKeyHint}
            keyboardType={props.keyboardType}
            secureTextEntry={visible ? false : props.secureTextEntry}
            onChangeText={props.onChangeText}
            ref={ref}
            onSubmitEditing={props.onSubmitEditing}
            blurOnSubmit={false}
            autoCapitalize="none"
          />
        )}

        {props.secureTextEntry && props.ispassword && (
          <Pressable
            style={styles.rightIconView}
            onPress={() => setVisible(!visible)}
          >
            <MaterialCommunityIcons
              name={visible ? 'eye-off' : 'eye'}
              color={Colors.secondary}
              size={ScaleSize.SPACING_20}
            />
          </Pressable>
        )}

        {props.rightIcon && (
          <TouchableOpacity style={styles.rightIconView}
            onPress={props.rightIconPress} 
            // onPress={() => { setDate(currentDate), props.onChangeDate && props.onChangeDate(currentDate) }} 
            >
            <MaterialCommunityIcons
              name={props.rightIcon}
              color={Colors.secondary}
              size={ScaleSize.SPACING_20}
            />
          </TouchableOpacity>
        )}
      </TouchableOpacity>
      {props.error ? <Text style={styles.errorText}>{props.error}</Text> : null}
    </View>
  );
});

export default CustomTextInput;