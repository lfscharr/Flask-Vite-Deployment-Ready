import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

function LogWorkout({ userId }) {
  const [workoutName, setWorkoutName] = useState("");
  const [exercises, setExercises] = useState([
    { sets: 0, reps: 0, weight: 0, exerciseName: "", duration: "" },
  ]);
  const [workoutId, setWorkoutId] = useState("");
  const [exerciseName, setExerciseName] = useState("");
  const [duration, setDuration] = useState("");
  const [sets, setSets] = useState(0);
  const [reps, setReps] = useState(0);
  const [weight, setWeight] = useState(0);
  const navigate = useNavigate();

  console.log(exercises);

  useEffect(() => {
    fetchWorkoutData();
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
    setExercises([...exercises, { sets: 0, reps: 0, weight: 0 }]);
  };

  const createNewLog = async (e) => {
    console.log("post");
    e.preventDefault();
    try {
      fetch("/api/postlog", {
        method: "POST",
        headers: {
          "Content-Type": "Application/JSON",
        },
        body: JSON.stringify({
          userId: userId,
          workoutName: workoutName,
          exercises: exercises,
        }),
      }).then((r) => {
        if (r.ok) {
          navigate(`/log/${userId}`);
        } else {
          console.log("WE ARE NOT OKAY");
        }
      });
    } catch (error) {
      console.error("Error adding log:", error);
    }
  };

  return (
    <div>
      <form onSubmit={(e) => createNewWorkout(e)}></form>

      <form onSubmit={(e) => addExercise(e)}></form>

      <form onSubmit={(e) => createNewLog(e)}>
      <div id="video-container">
       <video id="video" src= "/src/assets/Components/4783739_Women_Gym_Exercise_1920x1080.mp4"
            autoPlay="{true}" loop muted> 
        </video> 
        </div>
        <div>
          <h2>Add New Workout! </h2>
          <label>Workout Name:</label>
          <input
            type="text"
            value={workoutName}
            onChange={(e) => setWorkoutName(e.target.value)}
          />
          <button type="button" onClick={addExercise}>
            Add Exercise
          </button>
          {exercises.map((exercise, index) => (
            <div key={index}>
              <div>
                <label>Exercise Name:</label>
                <input
                  type="text"
                  value={exercise.exerciseName}
                  onChange={(e) =>
                    setExercises(
                      exercises.map((ex, i) =>
                        i === index
                          ? { ...ex, exerciseName: e.target.value }
                          : ex
                      )
                    )
                  }
                />
                <label>Duration:</label>
                <input
                  type="text"
                  value={exercise.duration}
                  onChange={(e) =>
                    setExercises(
                      exercises.map((ex, i) =>
                        i === index ? { ...ex, duration: e.target.value } : ex
                      )
                    )
                  }
                />
              </div>
              <label>Sets:</label>
              <input
                type="number"
                value={exercise.sets}
                onChange={(e) =>
                  setExercises(
                    exercises.map((ex, i) =>
                      i === index
                        ? { ...ex, sets: parseInt(e.target.value) }
                        : ex
                    )
                  )
                }
              />
              <label>Reps:</label>
              <input
                type="number"
                value={exercise.reps}
                onChange={(e) =>
                  setExercises(
                    exercises.map((ex, i) =>
                      i === index
                        ? { ...ex, reps: parseInt(e.target.value) }
                        : ex
                    )
                  )
                }
              />
              <label>Weight:</label>
              <input
                type="number"
                value={exercise.weight}
                onChange={(e) =>
                  setExercises(
                    exercises.map((ex, i) =>
                      i === index
                        ? { ...ex, weight: parseFloat(e.target.value) }
                        : ex
                    )
                  )
                }
              />
            </div>
          ))}
          <button type="submit">Add Log</button>
        </div>
      </form>
    </div>
  );
}

export default LogWorkout;
