
import React, { useEffect, useState } from 'react';

const WorkoutHistory = () => {
  const [workoutHistory, setWorkoutHistory] = useState([]);

  useEffect(() => {
    const fetchWorkoutHistory = async () => {
      try {
        const response = await fetch('http:/localhost:5000/log');

        const data = await response.json();

        setWorkoutHistory(data);
      } catch (error) {
        console.error('Fetch workout history failed:', error);
      }
    };

    fetchWorkoutHistory();
  }, []);

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
