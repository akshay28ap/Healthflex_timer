import React, { useState } from "react"
import { View, StyleSheet } from "react-native"
import { Button } from "react-native-elements"
import TimerList from "../components/TimerList"
import CreateTimer from "../components/CreateTimer"
import TimerControls from "../components/TimerControls"
import { useTimerContext } from "../contexts/TimerContext"

const TimerScreen = () => {
  const [isCreating, setIsCreating] = useState(false)
  const { timers } = useTimerContext()

  return (
    <View style={styles.container}>
      {isCreating ? (
        <CreateTimer onClose={() => setIsCreating(false)} />
      ) : (
        <>
          <TimerList timers={timers} />
          <TimerControls />
          <Button title="Create New Timer" onPress={() => setIsCreating(true)} containerStyle={styles.createButton} />
        </>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  createButton: {
    marginTop: 16,
  },
})

export default TimerScreen

