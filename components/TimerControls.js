import React from "react"
import { View, StyleSheet } from "react-native"
import { Button } from "react-native-elements"
import { useTimerContext } from "../contexts/TimerContext"

const TimerControls = () => {
  const { timers, startTimer, pauseTimer, resetTimer } = useTimerContext()

  const handleStartAll = () => {
    timers.forEach((timer) => startTimer(timer.id))
  }

  const handlePauseAll = () => {
    timers.forEach((timer) => pauseTimer(timer.id))
  }

  const handleResetAll = () => {
    timers.forEach((timer) => resetTimer(timer.id))
  }

  return (
    <View style={styles.container}>
      <Button title="Start All" onPress={handleStartAll} />
      <Button title="Pause All" onPress={handlePauseAll} />
      <Button title="Reset All" onPress={handleResetAll} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 16,
  },
})

export default TimerControls

