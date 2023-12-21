import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const WorkoutHistory = () => {
  const [workoutHistory, setWorkoutHistory] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const fetchWorkoutHistory = async () => {
      try {
        console.log(id);
        const response = await fetch(`/api/log/${id}`);

        const data = await response.json();
        console.log(data);

        setWorkoutHistory(data.user);
      } catch (error) {
        console.error("Fetch workout history failed:", error);
      }
    };

    fetchWorkoutHistory();
  }, []);

  console.log(workoutHistory);

  return (
    <div>
      <h2>Workout History</h2>
      {workoutHistory.map((workout) => (
        <div key={workout.id}>
          <p>Workout Name: {workout.reps}</p>

          <h2>Exercises</h2>
          {/* {workout.exercises.map((exercise) => (
            <li key={exercise.id}>
              <p>Exercise Name: {exercise.name}</p>
              <p>Duration: {exercise.duration}</p>
            </li>
          ))} */}
        </div>
      ))}
    </div>
  );
};

export default WorkoutHistory;
