import React from "react"
import { View, StyleSheet } from "react-native"
import { ListItem, Button, Text } from "react-native-elements"
import { useTimerContext } from "../contexts/TimerContext"
import ProgressBar from "./ProgressBar"

const TimerItem = ({ timer }) => {
  const { startTimer, pauseTimer, resetTimer, deleteTimer } = useTimerContext()

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`
  }

  return (
    <ListItem bottomDivider>
      <ListItem.Content>
        <ListItem.Title>{timer.name}</ListItem.Title>
        <Text>{timer.category}</Text>
        <Text>{formatTime(timer.remainingTime)}</Text>
        <ProgressBar progress={(timer.duration - timer.remainingTime) / timer.duration} />
        <View style={styles.buttonContainer}>
          <Button
            title={timer.isRunning ? "Pause" : "Start"}
            onPress={() => (timer.isRunning ? pauseTimer(timer.id) : startTimer(timer.id))}
            type="clear"
          />
          <Button title="Reset" onPress={() => resetTimer(timer.id)} type="clear" />
          <Button title="Delete" onPress={() => deleteTimer(timer.id)} type="clear" titleStyle={styles.deleteButton} />
        </View>
      </ListItem.Content>
    </ListItem>
  )
}

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  deleteButton: {
    color: "red",
  },
})

export default TimerItem

