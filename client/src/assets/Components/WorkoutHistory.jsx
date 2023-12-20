import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const WorkoutHistory = () => {
  const [workoutHistory, setWorkoutHistory] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const fetchWorkoutHistory = async () => {
      try {
        const response = await fetch(`/log/${id}`);

        const data = await response.json();
        console.log(data);

        setWorkoutHistory(data);
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
          <p>Workout Name: {workout.name}</p>
        </div>
      ))}
    </div>
  );
};

export default WorkoutHistory;
