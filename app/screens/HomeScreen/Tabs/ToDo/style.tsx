import { StyleSheet } from "react-native";
import { AppFonts, Colors, ScaleFonts, ScaleSize } from "../../../../helper";
const HIDDEN_BUTTON_WIDTH=ScaleSize.SPACING_55
const hiddenIconBase= {
    height:"100%",
    width: HIDDEN_BUTTON_WIDTH,
    justifyContent: 'center',
    alignItems: 'center'
}
export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    containerFlatlist: {
        paddingHorizontal: ScaleSize.SPACING_5 * 1.5
    },
    gridViewOpitons: {
        justifyContent: 'center',
        marginLeft: ScaleSize.SPACING_10
    },
    textInputMainView: {
        marginHorizontal: ScaleSize.SPACING_20,
        flexDirection: 'row'
    },
    optionViewContainer: {
        paddingVertical: ScaleSize.SPACING_10,
        marginVertical: ScaleSize.SPACING_10,
        flexDirection: 'row',
        alignSelf: 'flex-end',
    },
    optionsView: {
        marginHorizontal: ScaleSize.SPACING_10
    },
    rowBack: {
        alignItems: 'center',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    notesContainer: {
        alignItems: 'center',
        backgroundColor: Colors.inputBorderColor,
        paddingVertical: ScaleSize.SPACING_5,
        paddingHorizontal: ScaleSize.SPACING_10,
        minHeight: ScaleSize.SPACING_50,
        flexDirection: 'row'
    },
    swipeViewRight: {
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
        height:"100%",
        width: HIDDEN_BUTTON_WIDTH,

    },
    swipeViewPin: {
        backgroundColor: '#FFAD01',
        height:"100%",
        width: HIDDEN_BUTTON_WIDTH,
        justifyContent: 'center',
        alignItems: 'center'
    },
    hiddenPinStyle:{
        ...hiddenIconBase,
        backgroundColor: '#FFAD01'
    },
    hiddenShareStyle:{
        ...hiddenIconBase,
        backgroundColor: '#FF5733'
    },
    hiddenDateStyle:{
        ...hiddenIconBase,
        backgroundColor: '#38ACEC'
    },
    hiddenEditStyle:{
        ...hiddenIconBase,
        backgroundColor: '#42654d'
    },
    hiddenDeteleStyle:{
        ...hiddenIconBase,
        backgroundColor: '#de5246'
    },

    noteText: {
        fontSize: ScaleFonts.SIZE_18,
        fontFamily: AppFonts.Medium,
        color: 'black',
        textAlign: 'justify',
    },
    doneTodo:{
        fontSize: ScaleFonts.SIZE_18,
        fontFamily: AppFonts.Medium,
        color: 'black',
        textAlign: 'justify',
        textDecorationLine:'line-through'
    },
    gridViewContainer: {
        flex: 1,
        margin: ScaleSize.SPACING_10 / 1.5,
        backgroundColor: Colors.inputBorderColor,
        borderRadius: ScaleSize.SPACING_10,
        padding: ScaleSize.SPACING_15,
    },
    gridViewText: {
        color: Colors.secondary,
        textAlign: 'justify',
        fontSize: ScaleFonts.SIZE_18,
        fontFamily: AppFonts.Medium,
    },
})