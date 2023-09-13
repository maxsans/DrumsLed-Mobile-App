import React, { useState} from 'react';
import { Modal, StyleSheet, Text, Pressable, View } from 'react-native'
import AntDesign from "@expo/vector-icons/AntDesign";
import { COLOR } from '../utils/constants';
import { MaterialIcons } from '@expo/vector-icons'; 


const ModalErr = ({isPopupVisible, onPress, onCancel, text}) => {
  return (
      <Modal
        visible={isPopupVisible}
        animationType="fade"
        transparent
        activeOpacity={1}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Pressable onPress={onCancel} style={styles.btnCancel}>
              <MaterialIcons
              style={{}}
              color={COLOR.SECONDARY}
              name="cancel"
              size={25}
              />
            </Pressable>
            <View
              style={{
                alignItems: "center",
                flexDirection: "column",
                margin:10,
                marginTop:40,
              }}
            > 
             
              <Text style={{textAlign:"center", fontSize:16, color:COLOR.TERCIARY, lineHeight: 21, fontWeight: "bold", letterSpacing: 0.25, }}>
              {text}</Text>
              <View style={{flexDirection: "row", width:"100%"}}>
                <View style={{flex:1}}>
                  <Pressable onPress={onPress} style={styles.btnDelete}>
                      <AntDesign
                      style={{marginEnd: 10}}
                      color={COLOR.ON_SECONDARY}
                      name="check"
                      size={25}
                    />
                    <Text style={styles.btnDeleteText}>Compris</Text>
                  </Pressable>
                </View>
              </View>

              </View>
            </View>
          </View>
      </Modal>
  )

};
export default ModalErr;

const styles = StyleSheet.create({
  modalView: {
    margin: 20,
    backgroundColor: COLOR.BACKGROUND,
    borderRadius: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    flexDirection: "column",
  },
  centeredView: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.2)', // Couleur semi-transparente pour l'effet de flou

  },
  btnCancel: {
    position: "absolute",
    top: 10,
    left: 10,
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
    flexDirection: "row",
    padding: 7,
    borderRadius: 60,
    elevation: 3,
    backgroundColor: COLOR.PRIMARY_VARIANT,
    shadowColor: "#000",
  },
  btnCancelText: {
    fontSize: 15,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: COLOR.SECONDARY,
  },
  btnDelete: {
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
    flexDirection: "row",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 60,
    elevation: 3,
    backgroundColor: COLOR.SECONDARY,
    shadowColor: "#000",
    marginTop: 20,
    marginBottom:10,
  },
  btnDeleteText: {
    fontSize: 15,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: COLOR.ON_SECONDARY,
  }
});
