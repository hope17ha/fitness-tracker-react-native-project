import { api } from "./api";

export async function getExercisesByMuscleGroup(muscleGroupId){
    const result = await api.get(`/exercises?muscleGroupId=${muscleGroupId}`);

    return result.data;
}

export async function getAllExercises() {
    const result = await api.get("/exercises");
    return result.data;
  }
  