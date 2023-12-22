import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const WorkoutHistory = () => {
  const [workoutHistory, setWorkoutHistory] = useState([]);
  const [logHistory, setLogHistory] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const fetchWorkoutHistory = async () => {
      try {
        console.log(id);
        const response = await fetch(`/api/log/${id}`);

        const data = await response.json();
        console.log(data);

        setLogHistory(data);
      } catch (error) {
        console.error("Fetch workout history failed:", error);
      }
    };

    fetchWorkoutHistory();
  }, []);

  console.log(workoutHistory);

  return (
    <div>
      {logHistory.map((log) =>
        log.workouts.map((workout) => (
          <div key={workout.id}>
            <h2>Workout: {workout.name}</h2>
            <div id="video-container">
       <video id="video" src= "/src/assets/Components/4783739_Women_Gym_Exercise_1920x1080.mp4"
            autoPlay="{true}" loop muted> 
        </video> 
        </div>
            

            <h2>Exercises</h2>
            {workout.exercises.map((exercise, index) => (
              <div key={index}>
                <p>Exercise Name: {exercise.name}</p>
                <p>Duration: {exercise.duration}</p>
                <h4>Reps: {exercise.reps}</h4>
                <h4>Sets: {exercise.sets}</h4>
                <h4>Weight: {exercise.weight}</h4>
              </div>
            ))}
          </div>
        ))
      )}
    </div>
  );
};

export default WorkoutHistory;
