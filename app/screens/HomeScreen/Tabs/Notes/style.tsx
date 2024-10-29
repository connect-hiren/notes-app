import { StyleSheet } from "react-native";
import { AppFonts, Colors, ScaleFonts, ScaleSize } from "../../../../helper";
const HIDDEN_BUTTON_WIDTH = ScaleSize.SPACING_55
const hiddenIconBase = {
    height: "100%",
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
        minHeight: HIDDEN_BUTTON_WIDTH,
        flexDirection: 'row',
      
    },
    noteText: {
        fontSize: ScaleFonts.SIZE_18,
        fontFamily: AppFonts.Medium,
        flex:1,
        color: 'black',
        textAlign: 'justify',
    },
    gridViewContainer: {
        flex: 1,
        margin: ScaleSize.SPACING_10 / 1.5,
        backgroundColor: Colors.inputBorderColor,
        borderRadius: ScaleSize.SPACING_10,
        padding: ScaleSize.SPACING_15,
    },
    optionButton: {
        marginHorizontal: ScaleSize.SPACING_5 / 2,
    },
    optionsViewActions: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    gridViewText: {
        color: Colors.secondary,
        textAlign: 'justify',
        fontSize: ScaleFonts.SIZE_18,
        fontFamily: AppFonts.Medium,
    },
    hiddenPinStyle:{
        ...hiddenIconBase,
        backgroundColor: '#FFAD01'
    },
    hiddenDateStyle:{
        ...hiddenIconBase,
        backgroundColor: '#38ACEC'
    },
    hiddenEditStyle:{
        ...hiddenIconBase,
        backgroundColor: '#42654d'
    },
    hiddenShareStyle:{
        ...hiddenIconBase,
        backgroundColor: '#FF5733'
    },
    hiddenDeteleStyle:{
        ...hiddenIconBase,
        backgroundColor: '#de5246'
    },
})