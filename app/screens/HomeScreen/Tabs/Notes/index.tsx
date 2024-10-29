import { View, Text, TouchableOpacity, FlatList, Animated, Dimensions, Linking, SafeAreaView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { styles } from './style'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { Colors, ScaleFonts, ScaleSize } from '../../../../helper'
import { SwipeListView } from 'react-native-swipe-list-view';
import { CustomTextInput } from '../../../../components'
import { deleteNote, getNotesData, addNote, setPinToNote } from '../../../../../SQLiteHelper'

let currentId = 0, lightColors: any[] = [], openedRow: { closeRow: () => any; }
const Notes = () => {

  const [gridView, setGridView] = useState(false)
  const [notes, setNotes] = useState([])
  const [note, setNote] = useState('')


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
  useEffect(() => {
    getNotes()
    fillColors()
  }, [])

  const getNotes = () => {
    getNotesData((res: any) => {
      if (res) {
        setNotes([])
        let allNotes: any = []
        res.map((item: any) => {
          allNotes.push({ ...item, color: lightColors[item.id % 200], selected: false })
        })
        setNotes(allNotes)
      }
    })
  }

  const renderNotes = ({ item, index }: any) => {
    return (
      <View style={[styles.notesContainer, { backgroundColor: item.color }]}>
        {item.is_pin == 1 &&
          <MaterialCommunityIcons name='pin' style={{ marginRight: ScaleSize.SPACING_10 }} size={ScaleSize.SPACING_20} color={Colors.secondary} />}

        <Text style={styles.noteText}>{item.notes}</Text>

      </View>
    )
  }

  const openModal = (item: any) => {
    const updatedNotes = notes.map(note =>
      note.id === item.id ? { ...note, selected: true } : note
    );
    setNotes(updatedNotes);
  }

  const closeModal = (item: any) => {
    const updatedNotes = notes.map(note =>
      note.id === item.id ? { ...note, selected: false } : note
    );
    setNotes(updatedNotes);
  }

  const renderNotesGrid = ({ item, index }: any) => {
    let backgroundColor = lightColors[100 - index % 99]

    return (
      <>
        <TouchableOpacity
          style={[styles.gridViewContainer, { backgroundColor: backgroundColor }]}
          onLongPress={() => {
            openModal(item)
          }}
        >

          <View style={{ flexDirection: 'row' }}>
            {item.is_pin == 1 &&
              <MaterialCommunityIcons name='pin' size={ScaleSize.SPACING_20} color={Colors.secondary} />}
            {item.selected === true &&
              <View style={styles.optionsViewActions}>
                <TouchableOpacity style={styles.optionButton} onPress={() => {
                  closeModal(item)
                  shareItem(item?.notes)
                }}>
                  <MaterialCommunityIcons
                    name={'share-variant'}
                    size={ScaleSize.SPACING_20}
                    color={Colors.secondary}
                  />
                </TouchableOpacity>
                <TouchableOpacity style={styles.optionButton} onPress={() => {
                  closeModal(item)
                  updatePin(item)
                }}>
                  <MaterialCommunityIcons
                    name={item.is_pin === 0 ? 'pin' : 'pin-off'}
                    size={ScaleSize.SPACING_20}
                    color={Colors.secondary}
                  />
                </TouchableOpacity>

                <TouchableOpacity style={styles.optionButton} onPress={() => {
                  closeModal(item)
                  currentId = item.id;
                  setNote(item.notes)
                }}>
                  <MaterialCommunityIcons name='pencil-outline' size={ScaleSize.SPACING_20} color={Colors.secondary} />
                </TouchableOpacity>

                <TouchableOpacity style={styles.optionButton} onPress={() => {
                  closeModal(item)
                  deleteItem(item)
                }}>
                  <MaterialCommunityIcons name='delete' size={ScaleSize.SPACING_20} color={Colors.secondary} />
                </TouchableOpacity>
              </View>}
          </View>

          <Text style={styles.gridViewText}>{item.notes}</Text>
        </TouchableOpacity>

      </>
    );
  }


  const deleteItem = (item: any) => {
    deleteNote(item.id, (result: boolean) => {
      if (result === true) {
        getNotes()
      }
    })
  }

  const updatePin = (item: any) => {
    setPinToNote(item.id, item.is_pin == 1 ? 0 : 1, (result: boolean) => {
      if (result === true) {
        getNotes()
      }
    })
  }

  const sendNote = async () => {
    if (note != '') {
      addNote({ note, id: currentId }, (result: boolean) => {
        if (result === true) {
          getNotes()
        }
      })
      currentId = 0;
      setNote('')
    }
  }

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


  const onRowOpen = (rowKey: any, rowMap: any) => {
    openedRow = rowMap[rowKey];
  };


  return (
    <SafeAreaView style={{flex:1,backgroundColor:'white'}}>
    <View style={styles.container}>

      <View style={styles.textInputMainView}>
        <View style={{ flex: 1 }}>
          <CustomTextInput
            border
            value={note}
            onChangeText={(text) => setNote(text)}
            placeholder='Write Your Notes Here'
            rightIcon='send'
            multiline={true}
            rightIconPress={() => sendNote()}

          />
        </View>
        <TouchableOpacity onPress={() => setGridView(!gridView)} style={styles.gridViewOpitons}>
          <MaterialCommunityIcons
            name={gridView ? 'view-list' : 'view-grid'}
            size={ScaleSize.SPACING_20}
            color={Colors.secondary} />
        </TouchableOpacity>
      </View>


      {gridView ?
        <View style={styles.containerFlatlist}>
          <FlatList data={notes} numColumns={2} renderItem={renderNotesGrid} />
        </View>
        :
        <SwipeListView
          data={notes}
          renderItem={renderNotes}
          keyExtractor={(data, index) => `sl${index.toString()}`}
          onRowOpen={onRowOpen}
          renderHiddenItem={(notes) => {
            return (
              <View style={styles.rowBack}>
                <TouchableOpacity style={styles.hiddenPinStyle} onPress={() => {

                  openedRow && openedRow.closeRow()
                  updatePin(notes.item)

                }}>
                  <MaterialCommunityIcons
                    name={notes.item.is_pin === 0 ? 'pin' : 'pin-off'}
                    size={ScaleSize.SPACING_20}
                    color={Colors.primary}
                  />
                </TouchableOpacity>

                <View style={{ flexDirection: 'row', height: "100%" }}>
                  <TouchableOpacity style={styles.hiddenShareStyle} onPress={() => {
                    openedRow && openedRow.closeRow()
                    console.log(notes.item.notes);
                  shareItem(notes?.item?.notes)

                    
                  }}>
                    <MaterialCommunityIcons name='share-variant' size={ScaleSize.SPACING_20} color={Colors.primary} />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.hiddenEditStyle} onPress={() => {
                    openedRow && openedRow.closeRow()
                    currentId = notes.item.id;
                    setNote(notes.item.notes)
                  }}>
                    <MaterialCommunityIcons name='pencil-outline' size={ScaleSize.SPACING_20} color={Colors.primary} />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.hiddenDeteleStyle} onPress={() => {
                    openedRow && openedRow.closeRow()
                    deleteItem(notes.item)
                  }}>
                    <MaterialCommunityIcons name='delete' size={ScaleSize.SPACING_20} color={Colors.primary} />
                  </TouchableOpacity>
                </View>
              </View>
            )
          }}
          leftOpenValue={ScaleSize.SPACING_55}
          rightOpenValue={-ScaleSize.SPACING_55 * 3}
        />
      }

    </View>
    </SafeAreaView>
  )
}

export default Notes
