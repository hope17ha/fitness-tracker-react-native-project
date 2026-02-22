import {api} from './api';

export async function getAllWorkoutsByUserId(userId){
    const result = await api.get( `/workouts?userId=${Number(userId)}&_sort=createdAt&_order=desc`);

    return result.data;
}

export async function getWorkoutById(workoutId) {
        const result = await api.get(`/workouts/${workoutId}`);
        return result.data;
      }