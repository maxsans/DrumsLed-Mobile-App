import { View, Text, StyleSheet, Pressable } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { COLOR } from "../utils/constants";


const AddBox = (props) =>{
  return (
    <Pressable
    style={[styles.containerAddColorBox, {  borderColor: props.color ? props.color : COLOR.TERCIARY}]}
    onPress={() => {
      props.onPress();
    }}>
      <AntDesign
        color={props.color ? props.color : COLOR.TERCIARY}
        name="pluscircleo"
        size={20}
      />
      <Text
        style={{
          fontSize: 18,
          fontWeight: "bold",
          justifyContent: "center",
          paddingLeft: 8,
          color: COLOR.TERCIARY,
        }}
      >
        Ajouter
      </Text>
    </Pressable>
  );
};

export default AddBox;
const styles = StyleSheet.create({
containerAddColorBox:{
  flex: 1,
  overflow: "hidden",
  borderWidth: 3,
  borderStyle: "dashed",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: 10,
}
})
