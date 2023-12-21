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

  //   return (
  //     <div>
  //       <h2>Workout History</h2>
  //       {workoutHistory.map((workout) => (
  //         <div key={workout.id}>
  //           <p>Workout: {workout.id}</p>
  //       <h4>{workoutHistory.reps}</h4>
  //       <h4>{workoutHistory.sets}</h4>
  //       <h4>{workoutHistory.weight}</h4>

  //           <h2>Exercises</h2>
  //           {/* {workout.exercises.map((exercise) => (
  //             <li key={exercise.id}>
  //               <p>Exercise Name: {exercise.name}</p>
  //               <p>Duration: {exercise.duration}</p>
  //             </li>
  //           ))} */}
  //         </div>
  //       ))}
  //     </div>
  //   );
  // };

  return (
    <div>
      {logHistory.map((log) =>
        log.workouts.map((workout) => (
          <div key={workout.id}>
            <p>Workout: {workout.id}</p>
            

            <h2>Exercises</h2>
            {workout.exercises.map((exercise, index) => (
              <div key={index}>
                <p>Exercise Name: {exercise.name}</p>
                <p>Duration: {exercise.duration}</p>
                <h4>{exercise.reps}</h4>
              <h4>{exercise.sets}</h4>
              <h4>{exercise.weight}</h4>
              </div>
            ))}
          </div>
        ))
      )}

      {/* <h2>Workout History</h2>
      {workoutHistory.map((workout) => (
        <div key={workout.id}>
          <p>Workout: {workout.id}</p>
          <h4>{workout.reps}</h4>
          <h4>{workout.sets}</h4>
          <h4>{workout.weight}</h4>

          <h2>Exercises</h2>
          {workout.exercises.map((exercise, index) => (
            <div key={index}>
              <p>Exercise Name: {exercise.name}</p>
              <p>Duration: {exercise.duration}</p>
            </div>
          ))}
        </div>
      ))} */}
    </div>
  );
};

export default WorkoutHistory;
