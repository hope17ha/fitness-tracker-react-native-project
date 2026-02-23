import {api} from './api';

export async function getAllWorkoutsByUserId(userId){
    const result = await api.get( `/workouts?userId=${Number(userId)}&_sort=createdAt&_order=desc`);

    return result.data;
}

export async function getWorkoutById(workoutId) {
        const result = await api.get(`/workouts/${workoutId}`);
        return result.data;
      }
export async function getLastWorkoutByUserId(userId) {
        const result = await api.get(
          `/workouts?userId=${Number(userId)}&_sort=createdAt&_order=desc&_limit=1`
        );
      
        return result.data[0] ?? null;
      }

      export async function createWorkout({
        title,
        userId,
    }) {
        const now = new Date().toISOString();
    
        const result = await api.post("/workouts", {
            title,
            status: 'active',
            userId: Number(userId),
            createdAt: now,
            updatedAt: now,
            startedAt: now,
            finishedAt: null,
            exercises: []
        });
    
        return result.data;
    }

    export async function finishWorkout(workoutId) {
        const now = new Date().toISOString();
      
        const result = await api.patch(`/workouts/${workoutId}`, {
          status: "done",
          finishedAt: now,
          updatedAt: now,
        });
      
        return result.data;
      }
    
      export async function getActiveWorkoutByUserId(userId) {
        const result = await api.get(
          `/workouts?userId=${Number(userId)}&status=active&_sort=startedAt&_order=desc&_limit=1`
        );
      
        return result.data?.[0] ?? null;
      }
    
      export async function addExerciseToWorkout(workoutId, exerciseId) {
        const w = await getWorkoutById(workoutId);
      
        const now = new Date().toISOString();
        const exercises = Array.isArray(w.exercises) ? [...w.exercises] : [];
      
        const maxOrder = exercises.reduce((m, x) => Math.max(m, Number(x.order || 0)), 0);
        const newOrder = maxOrder + 1;
      
        const newWorkoutExercise = {
          id: `wex_${Date.now()}`,       
          exerciseId: Number(exerciseId),
          order: newOrder,
          sets: [],                     
        };
      
        const updated = await api.patch(`/workouts/${workoutId}`, {
          exercises: [...exercises, newWorkoutExercise],
          updatedAt: now,

        });
      
        return updated.data;
      }