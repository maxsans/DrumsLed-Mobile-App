const AddContainer = () => {
  return (
    <Pressable
      style={styles.containerAddColorBox}
      onPress={() => {
        addTheme();
      }}
    >
      <AntDesign
        style={styles.icon}
        color={COLOR.TERCIARY}
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
