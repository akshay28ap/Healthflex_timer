import React, { useState } from "react"
import { View, StyleSheet, FlatList, TextInput } from "react-native"
import { Button, ListItem } from "react-native-elements"
import { useTimerContext } from "../contexts/TimerContext"

const CategoryScreen = () => {
  const { categories, addCategory, deleteCategory } = useTimerContext()
  const [newCategory, setNewCategory] = useState("")

  const handleAddCategory = () => {
    if (newCategory.trim()) {
      addCategory(newCategory.trim())
      setNewCategory("")
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={newCategory}
          onChangeText={setNewCategory}
          placeholder="New category name"
        />
        <Button title="Add" onPress={handleAddCategory} />
      </View>
      <FlatList
        data={categories}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <ListItem bottomDivider>
            <ListItem.Content>
              <ListItem.Title>{item}</ListItem.Title>
            </ListItem.Content>
            <Button title="Delete" onPress={() => deleteCategory(item)} type="clear" titleStyle={styles.deleteButton} />
          </ListItem>
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  inputContainer: {
    flexDirection: "row",
    marginBottom: 16,
  },
  input: {
    flex: 1,
    marginRight: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    padding: 8,
  },
  deleteButton: {
    color: "red",
  },
})

export default CategoryScreen

