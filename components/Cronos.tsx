import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Button,
  Text
} from "react-native";
import TimerScreen from "./TimeScreen";
import NumericInput from "react-native-numeric-input";

const Cronos: React.FC = () => {
  // input form from user for exercise, pause, and sets
  const [exerciseTime, setExerciseTime] = useState<number>();
  const [pauseTime, setPauseTime] = useState<number>();
  const [sets, setSets] = useState<number>();

  // timer and current set
  const [currentSet, setCurrentSet] = useState<number>(0);
  const [timer, setTimer] = useState<number>(0);

  // state for start/stop timer and series
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [isTimerPaused, setIsTimerPaused] = useState<boolean>(false);
  const [isExercise, setIsExercise] = useState<boolean>(false);

  // data user input for storing in history
  const [data, setData] = useState<
    { exerciseTime: Number; pauseTime: Number; sets: Number }[]
  >([]);

  const handleInterval = () => {
    if (isRunning && currentSet <= sets && !isTimerPaused) {
      handleTimer();
    }
  };

  useEffect(() => {
    const interval = setInterval(handleInterval, 1000);
    return () => clearInterval(interval);
  }, [
    isRunning,
    currentSet,
    isExercise,
    exerciseTime,
    pauseTime,
    sets,
    isTimerPaused,
  ]);

  const handleTimer = () => {
    setTimer((prevTimer) => {
      if (prevTimer > 1) {
        return prevTimer - 1;
      } else {
        setIsExercise(!isExercise);
        if (!isExercise) {
          if (currentSet < sets) {
            setCurrentSet((prevSet) => prevSet + 1);
          } else {
            alert("Series completed!");
            exitSeries();
          }
        }
        return isExercise ? pauseTime : exerciseTime;
      }
    });
  };

  const startTimer = () => {
    const currentSetData = {
      exerciseTime,
      pauseTime,
      sets,
    };

    // Add the current set data to the data array
    setData([...data, currentSetData]);
    setIsRunning(true);
    setIsExercise(true);
    setTimer(exerciseTime);
    setCurrentSet(1);
  };

  const toggleTimer = () => {
    setIsTimerPaused(!isTimerPaused);
  };

  const exitSeries = () => {
    setIsRunning(false);
    setIsExercise(false);
    setIsTimerPaused(false);
    setExerciseTime(0);
    setPauseTime(0);
    setSets(0);
    setCurrentSet(0);
    setTimer(0);
  };

  const isStartButtonDisabled =
    isNaN(Number(exerciseTime)) ||
    exerciseTime === 0 ||
    isNaN(Number(pauseTime)) ||
    pauseTime === 0 ||
    isNaN(Number(sets)) ||
    sets === 0;

  const populateForm = (index: number) => {
    const item = data[index];
    setExerciseTime(Number(item.exerciseTime));
    setPauseTime(Number(item.pauseTime));
    setSets(Number(item.sets));
  };

  const deleteInterval = (index: number) => {
    const newData = data.filter((item, i) => i !== index);
    setData(newData);
  };

  return (
    <View>
      {isRunning || isTimerPaused ? (
        <TimerScreen
          currentSet={currentSet}
          sets={sets}
          timer={timer}
          isExercise={isExercise}
          toggleTimer={toggleTimer}
          exitSeries={exitSeries}
        />
      ) : (
        <View style={styles.container}>
          <View style={styles.input}>
            <Text>Exercise Time (sec)</Text>
            <NumericInput
              rounded
              initValue={exerciseTime}
              value={exerciseTime}
              minValue={1}
              onChange={(value) => setExerciseTime(Number(value))}
              totalWidth={240}
              totalHeight={50}
              iconSize={25}
              step={5}
              valueType="real"
              textColor="black"
              rightButtonBackgroundColor="white"
              leftButtonBackgroundColor="white"
            />
          </View>
          <View style={styles.input}>
            <Text>Pause Time (sec)</Text>
            <NumericInput
              rounded
              initValue={pauseTime}
              value={pauseTime}
              minValue={1}
              onChange={(value) => setPauseTime(Number(value))}
              totalWidth={240}
              totalHeight={50}
              iconSize={25}
              step={5}
              valueType="real"
              textColor="black"
              rightButtonBackgroundColor="white"
              leftButtonBackgroundColor="white"
            />
          </View>

          <View style={styles.input}>
            <Text>Number of reps</Text>
            <NumericInput
              rounded
              initValue={sets}
              value={sets}
              minValue={1}
              onChange={(value) => setSets(Number(value))}
              totalWidth={240}
              totalHeight={50}
              iconSize={25}
              step={1}
              valueType="real"
              textColor="black"
              rightButtonBackgroundColor="white"
              leftButtonBackgroundColor="white"
            />
          </View>
          <Button
            title="Start"
            onPress={startTimer}
            disabled={isStartButtonDisabled}
          />
          {data.map((item, index) => (
            <View key={index} style={styles.setData}>
              <Text>
                Set {index + 1}: Exercise Time - {String(item.exerciseTime)}{" "}
                sec, Pause Time - {String(item.pauseTime)} sec, Sets -{" "}
                {String(item.sets)}
              </Text>
              <Button
                title={`Set ${index + 1}`}
                onPress={() => populateForm(index)}
              />
              <Button
                title={`Delete ${index + 1}`}
                onPress={() => deleteInterval(index)}
              />
            </View>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  input: {
    padding: 10,
    alignItems: "center",
  },
  setData: {
    marginVertical: 10,
  },
});

export default Cronos;
