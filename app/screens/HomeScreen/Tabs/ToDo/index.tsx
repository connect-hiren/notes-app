import { View, Text, TouchableOpacity, SafeAreaView, Platform } from 'react-native';
import React, { useEffect, useState, useCallback, useRef } from 'react';
import { styles } from './style';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Colors, ScaleSize } from '../../../../helper';
import { SwipeListView } from 'react-native-swipe-list-view';
import { CustomTextInput } from '../../../../components';
import { CalendarProvider, ExpandableCalendar } from 'react-native-calendars';
import { addTodo, changeDate, deleteTodo, getTodosData, setPinToTodos } from '../../../../../SQLiteHelper';
import moment from 'moment';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Linking } from 'react-native';


let currentId = 0;

const ToDo = () => {


  const [todos, setTodos] = useState([]);
  const [selectedDate, setSelectedDate] = useState(moment().format('YYYY-MM-DD'));
  const [todo, setTodo] = useState('');
  const openedRow = useRef(null);

  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(new Date());

  let lightColors: any[] = []

  const getColor = () => {
    const min = 210, max = 250
    const equ1 = max - min + 1;
    let r = Math.floor(Math.random() * equ1 + min);
    let g = Math.floor(Math.random() * equ1 + min);
    let b = Math.floor(Math.random() * equ1 + min);
    return `rgb(${r},${g},${b})`
  }

  const fillColors = () => {
    for (let i = 0; i <= 200; i++) {
      lightColors.push(getColor())
    }
  }

  const changeDateOfTask = (date: Date) => {
    const frDate = moment(date).format('DD-MM-YYYY');

    changeDate({ frDate, currentId }, (res: boolean) => {
      if (res) {
        getTodos();
      }
      currentId = 0;
      setTodo('');
    })

  }

  useEffect(() => {
    getTodos();
    fillColors();
  }, [selectedDate]);

  const getTodos = useCallback(() => {
    const formattedDate = moment(selectedDate).format('DD-MM-YYYY');
    getTodosData(formattedDate, (res: any) => {
      if (res) {
        let allTodos: any = [];
        res.map((item: any) => {
          allTodos.push({ ...item, color: lightColors[item.id % 200] });
        });
        setTodos(allTodos);
      }
    });
  }, [selectedDate]);

  const sendTodo = async () => {
    if (todo !== '') {
      let frDate = moment(selectedDate).format('DD-MM-YYYY');
      addTodo({ todo, frDate, id: currentId }, (result: boolean) => {

        if (result) {
          setTodos([])
          getTodos();
        }
        currentId = 0;
        setTodo('');
      });
    }
  };

  const renderTodos = useCallback(({ item }: any) => (
    <View style={[styles.notesContainer, { backgroundColor: item.color }]}>
      {item.is_pin === 1 && (
        <MaterialCommunityIcons
          name='checkbox-marked-circle-outline'
          style={{ marginRight: ScaleSize.SPACING_5 }}
          size={ScaleSize.SPACING_20}
          color={Colors.secondary}
        />
      )}
      <Text style={item.is_pin === 1 ? styles.doneTodo : styles.noteText}>{item.todos}</Text>
    </View>
  ), []);

  const deleteTodoItem = useCallback((item: any) => {
    deleteTodo(item.id, (result: any) => {
      if (result) {
        getTodos();
      }
    });
  }, [getTodos]);

  const onDayPress = useCallback((day: any) => {
    setSelectedDate(moment(day.dateString).format('YYYY-MM-DD'));
  }, []);

  const onRowOpen = useCallback((rowKey: any, rowMap: any) => {
    if (openedRow.current && openedRow.current !== rowMap[rowKey]) {
      openedRow.current.closeRow();
    }
    openedRow.current = rowMap[rowKey];
  }, []);

  const updateTodos = useCallback((item: any) => {
    setPinToTodos(item.id, item.is_pin === 1 ? 0 : 1, (result: boolean) => {
      if (result) {
        getTodos();
      }
    });
  }, [getTodos]);




  const shareItem = (data: any) => {
    const message = encodeURIComponent(data);
    const url = `sms:?body=${message}`;

    Linking.openURL(url)
      .then(() => {
        console.log('Message app opened');
      })
      .catch((err) => {
        console.error('Error opening message app:', err);
      });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <View style={styles.container}>
        <CalendarProvider date={selectedDate}>
          <ExpandableCalendar
            firstDay={1}
            disablePan={true}
            onDayPress={onDayPress}
          />


          <View style={{
            marginHorizontal: ScaleSize.SPACING_20,
            marginTop: Platform.OS === 'android' ? -ScaleSize.SPACING_40 : 0
          }}>
            <CustomTextInput
              border
              value={todo}
              onChangeText={setTodo}
              placeholder='Add Todo Here'
              rightIcon='send'
              multiline={true}
              rightIconPress={sendTodo}
            />
          </View>
          <SwipeListView
            data={todos}
            renderItem={renderTodos}
            keyExtractor={(data, index) => `sl${index.toString()}`}
            onRowOpen={onRowOpen}
            renderHiddenItem={({ item }) => (
              <View style={styles.rowBack}>
                <TouchableOpacity style={styles.hiddenPinStyle} onPress={() => {
                  if (openedRow.current) openedRow.current.closeRow();
                  updateTodos(item);
                }}>
                  <MaterialCommunityIcons
                    name={item.is_pin === 0 ? 'checkbox-blank-circle-outline' : 'checkbox-marked-circle-outline'}
                    size={ScaleSize.SPACING_20}
                    color={Colors.primary}
                  />
                </TouchableOpacity>

                <View style={{ flexDirection: 'row', height: "100%" }}>

                  <TouchableOpacity style={styles.hiddenShareStyle} onPress={() => {
                    if (openedRow.current) openedRow.current.closeRow();
                    shareItem(item?.todos)

                  }}>
                    <MaterialCommunityIcons name='share-variant' size={ScaleSize.SPACING_20} color={Colors.primary} />
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.hiddenDateStyle} onPress={() => {
                    if (openedRow.current) openedRow.current.closeRow();
                    currentId = item?.id;
                    setOpen(true);

                  }}>
                    <MaterialCommunityIcons name='calendar' size={ScaleSize.SPACING_20} color={Colors.primary} />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.hiddenEditStyle} onPress={() => {
                    if (openedRow.current) openedRow.current.closeRow();
                    currentId = item?.id;
                    setTodo(item?.todos);
                  }}>
                    <MaterialCommunityIcons name='pencil-outline' size={ScaleSize.SPACING_20} color={Colors.primary} />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.hiddenDeteleStyle} onPress={() => {
                    if (openedRow.current) openedRow.current.closeRow();
                    deleteTodoItem(item);
                  }}>
                    <MaterialCommunityIcons name='delete' size={ScaleSize.SPACING_20} color={Colors.primary} />
                  </TouchableOpacity>
                </View>
              </View>
            )}
            leftOpenValue={ScaleSize.SPACING_55}
            rightOpenValue={-ScaleSize.SPACING_55 * 4}
          />
        </CalendarProvider>

        {open && (
          <DateTimePicker
            value={date}
            mode='date'
            display='default'
            onChange={(event, selectedDate) => {
              setOpen(false);
              if (selectedDate) {
                setDate(selectedDate);
                changeDateOfTask(selectedDate)
              }
            }}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default ToDo;
