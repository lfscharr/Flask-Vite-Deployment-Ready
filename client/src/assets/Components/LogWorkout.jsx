import React, { useState, useEffect } from "react";
import { Link , useNavigate} from "react-router-dom";

function LogWorkout({ userId }) {
  const [workoutName, setWorkoutName] = useState("");
  const [exerciseName, setExerciseName] = useState("");
  const [sets, setSets] = useState(0);
  const [reps, setReps] = useState(0);
  const [weight, setWeight] = useState(0);
  const [exercises, setExercises] = useState([]);
  const [workoutId, setWorkoutId] = useState("");
  const [duration, setDuration] = useState(0);
  const navigate = useNavigate()

  useEffect(() => {
    // fetchWorkoutData();
  }, []);

  const fetchWorkoutData = async () => {
    try {
      const response = await fetch(`/api/workout/${workoutId}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(workoutId),
      });
      const data = await response.json();

      if (data.length > 0) {
        const workout = data[0];
        setWorkoutId(workout.id);
        setWorkoutName(workout.name);
        fetchExercises(workout.id);
      } else {
        createNewWorkout();
      }
    } catch (error) {
      console.error("Error fetching workout data:", error);
    }
  };

  const createNewWorkout = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/workout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: "",
        }),
      });
      const data = await response.json();
      setWorkoutId(data.id);
    } catch (error) {
      console.error("Error creating new workout:", error);
    }
  };

  const fetchExercises = async (workoutId) => {
    try {
      const response = await fetch(`/api/workout/${workoutId}/exercise`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const data = await response.json();
      setExercises(data);
    } catch (error) {
      console.error("Error fetching exercises:", error);
    }
  };

  const addExercise = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/exercise`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: exerciseName,
          duration: duration,
        }),
      });
      const newExercise = await response.json();
      setExercises((prevExercises) => [...prevExercises, newExercise]);
      setExerciseName("");
      setDuration("");
    } catch (error) {
      console.error("Error adding exercise:", error);
    }
  };

  const createNewLog = async (e) => {
    console.log("post");
    e.preventDefault();
    try {
      const response = await fetch(`/api/log`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          reps: reps,
          sets: sets,
          weight: weight,
          user_id: userId,
        }),
      });
      const newLog = await response.json();
      setWorkoutId((prevWorkouts) => [...prevWorkouts, newLog]);
      setSets(0);
      setReps(0);
      setWeight(0);
      navigate(`/log/${userId}`)
    } catch (error) {
      console.error("Error adding log:", error);
    }
  };

  return (
    <div>
      <form onSubmit={(e) => createNewWorkout(e)}>
      <h1>Workout Log </h1>
      <label>Workout Name:</label>
      <input
        type="text"
        value={workoutName}
        onChange={(e) => setWorkoutName(e.target.value)}
      />
      </form>
      <form onSubmit={(e) => addExercise(e)}>
        <div>
          <label>Exercise Name:</label>
          <input
            type="text"
            value={exerciseName}
            onChange={(e) => setExerciseName(e.target.value)}
          />
          <label>Duration:</label>
          <input
            type="text"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
          />

          <button type="submit">Add Exercise</button>
        </div>
      </form>
      <form onSubmit={(e) => createNewLog(e)}>
        <div>
          <h2>Exercises</h2>
          <ul>
            {exercises?.map((exercise) => (
              <li key={exercise.id}>
                <strong>{exercise.name}</strong>
                <label>Sets:</label>
                <input
                  type="number"
                  value={sets}
                  onChange={(e) => setSets(parseInt(e.target.value))}
                />
                <label>Reps:</label>
                <input
                  type="number"
                  value={reps}
                  onChange={(e) => setReps(parseInt(e.target.value))}
                />
                <label>Weight:</label>
                <input
                  type="number"
                  value={weight}
                  onChange={(e) => setWeight(parseFloat(e.target.value))}
                />
                  <button type="submit">Add Log</button>
              </li>
            ))}
          </ul>
        </div>
      </form>
    </div>
  );
}

export default LogWorkout;
