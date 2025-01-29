import React from "react"
import { FlatList, StyleSheet } from "react-native"
import TimerItem from "./TimerItem"

const TimerList = ({ timers }) => {
  return (
    <FlatList
      data={timers}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <TimerItem timer={item} />}
      style={styles.list}
    />
  )
}

const styles = StyleSheet.create({
  list: {
    flex: 1,
  },
})

export default TimerList

