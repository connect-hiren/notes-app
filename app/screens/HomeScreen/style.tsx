import { StyleSheet } from "react-native";
import { ScaleFonts, ScaleSize } from "../../helper";

export const styles = StyleSheet.create({
    tabBar: {
        height: ScaleSize.SPACING_50,
        backgroundColor: '#f8f8f8', 
    },
    tab: {
        paddingBottom: ScaleSize.SPACING_15,
        paddingTop: ScaleSize.SPACING_5,
    },
    tabLabel: {
        fontSize: ScaleFonts.SIZE_16,
        color: 'black', 
    },
    activeTabLabel: {
        fontWeight: 'bold',
    },
})