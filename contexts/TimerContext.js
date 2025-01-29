import React, { createContext, useState, useContext, useEffect } from "react"
import AsyncStorage from "@react-native-async-storage/async-storage"

const TimerContext = createContext()

export const TimerProvider = ({ children }) => {
  const [timers, setTimers] = useState([])
  const [categories, setCategories] = useState([])

  useEffect(() => {
    loadTimers()
    loadCategories()
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setTimers((prevTimers) =>
        prevTimers.map((timer) => {
          if (timer.isRunning && timer.remainingTime > 0) {
            return { ...timer, remainingTime: timer.remainingTime - 1 }
          }
          return timer
        }),
      )
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  const loadTimers = async () => {
    try {
      const storedTimers = await AsyncStorage.getItem("timers")
      if (storedTimers) {
        setTimers(JSON.parse(storedTimers))
      }
    } catch (error) {
      console.error("Error loading timers:", error)
    }
  }

  const loadCategories = async () => {
    try {
      const storedCategories = await AsyncStorage.getItem("categories")
      if (storedCategories) {
        setCategories(JSON.parse(storedCategories))
      }
    } catch (error) {
      console.error("Error loading categories:", error)
    }
  }

  const saveTimers = async (updatedTimers) => {
    try {
      await AsyncStorage.setItem("timers", JSON.stringify(updatedTimers))
    } catch (error) {
      console.error("Error saving timers:", error)
    }
  }

  const saveCategories = async (updatedCategories) => {
    try {
      await AsyncStorage.setItem("categories", JSON.stringify(updatedCategories))
    } catch (error) {
      console.error("Error saving categories:", error)
    }
  }

  const addTimer = (timer) => {
    const newTimer = {
      ...timer,
      id: Date.now().toString(),
      isRunning: false,
      remainingTime: timer.duration,
    }
    setTimers((prevTimers) => {
      const updatedTimers = [...prevTimers, newTimer]
      saveTimers(updatedTimers)
      return updatedTimers
    })
  }

  const updateTimer = (updatedTimer) => {
    setTimers((prevTimers) => {
      const updatedTimers = prevTimers.map((timer) => (timer.id === updatedTimer.id ? updatedTimer : timer))
      saveTimers(updatedTimers)
      return updatedTimers
    })
  }

  const deleteTimer = (id) => {
    setTimers((prevTimers) => {
      const updatedTimers = prevTimers.filter((timer) => timer.id !== id)
      saveTimers(updatedTimers)
      return updatedTimers
    })
  }

  const startTimer = (id) => {
    setTimers((prevTimers) => prevTimers.map((timer) => (timer.id === id ? { ...timer, isRunning: true } : timer)))
  }

  const pauseTimer = (id) => {
    setTimers((prevTimers) => prevTimers.map((timer) => (timer.id === id ? { ...timer, isRunning: false } : timer)))
  }

  const resetTimer = (id) => {
    setTimers((prevTimers) =>
      prevTimers.map((timer) =>
        timer.id === id ? { ...timer, isRunning: false, remainingTime: timer.duration } : timer,
      ),
    )
  }

  const addCategory = (category) => {
    setCategories((prevCategories) => {
      const updatedCategories = [...prevCategories, category]
      saveCategories(updatedCategories)
      return updatedCategories
    })
  }

  const deleteCategory = (category) => {
    setCategories((prevCategories) => {
      const updatedCategories = prevCategories.filter((c) => c !== category)
      saveCategories(updatedCategories)
      return updatedCategories
    })
  }

  return (
    <TimerContext.Provider
      value={{
        timers,
        categories,
        addTimer,
        updateTimer,
        deleteTimer,
        startTimer,
        pauseTimer,
        resetTimer,
        addCategory,
        deleteCategory,
      }}
    >
      {children}
    </TimerContext.Provider>
  )
}

export const useTimerContext = () => {
  const context = useContext(TimerContext)
  if (context === undefined) {
    throw new Error("useTimerContext must be used within a TimerProvider")
  }
  return context
}

