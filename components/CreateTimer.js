import React, { useState } from "react"
import { View, StyleSheet } from "react-native"
import { Input, Button, Text } from "react-native-elements"
import { Picker } from "@react-native-picker/picker"
import { useTimerContext } from "../contexts/TimerContext"

const CreateTimer = ({ onClose }) => {
  const { addTimer, categories } = useTimerContext()
  const [name, setName] = useState("")
  const [duration, setDuration] = useState("")
  const [category, setCategory] = useState(categories[0] || "")

  const handleCreate = () => {
    if (name && duration) {
      addTimer({
        name,
        duration: Number.parseInt(duration, 10),
        category,
      })
      onClose()
    }
  }

  return (
    <View style={styles.container}>
      <Text h4 style={styles.title}>
        Create New Timer
      </Text>
      <Input placeholder="Timer Name" value={name} onChangeText={setName} />
      <Input placeholder="Duration (in seconds)" value={duration} onChangeText={setDuration} keyboardType="numeric" />
      <Picker selectedValue={category} onValueChange={(itemValue) => setCategory(itemValue)} style={styles.picker}>
        {categories.map((cat) => (
          <Picker.Item key={cat} label={cat} value={cat} />
        ))}
      </Picker>
      <View style={styles.buttonContainer}>
        <Button title="Create" onPress={handleCreate} />
        <Button title="Cancel" onPress={onClose} type="outline" />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  title: {
    marginBottom: 16,
  },
  picker: {
    marginBottom: 16,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
})

export default CreateTimer

