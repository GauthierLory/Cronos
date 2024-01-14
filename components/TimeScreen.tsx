// TimerScreen.js
import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Button } from "react-native";

interface TimerScreenProps {
  currentSet: number;
  sets: number;
  timer: number;
  isExercise: boolean;
  toggleTimer: () => void;
  exitSeries: () => void;
}

const TimerScreen: React.FC<TimerScreenProps> = ({
  currentSet,
  sets,
  timer,
  isExercise,
  toggleTimer,
  exitSeries,
}) => {
  return (
    <View>
      <TouchableOpacity onPress={toggleTimer}>
        <Text style={styles.text}>
          Set: {currentSet}/{sets}
        </Text>
        <Text style={styles.text}>
          {isExercise ? "Exercise" : "Pause"} Time: {timer}
        </Text>
      </TouchableOpacity>
      <Button title="stop" onPress={exitSeries} />
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 24,
    margin: 10,
  },
});

export default TimerScreen;
