
import React, { useEffect, useState } from 'react';

const WorkoutHistory = () => {
  const [workoutHistory, setWorkoutHistory] = useState([]);

  useEffect(() => {
    const fetchWorkoutHistory = async () => {
      try {
        const response = await fetch('http://your-api-url/workout-history');

        const data = await response.json();

        // Update state with workout history upon successful fetch
        setWorkoutHistory(data);
      } catch (error) {
        // Handle fetch error, e.g., display an error message
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
          {/* Display other workout information as needed */}
        </div>
      ))}
    </div>
  );
};

export default WorkoutHistory;
