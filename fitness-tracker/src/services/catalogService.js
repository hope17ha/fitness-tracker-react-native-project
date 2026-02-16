import { api } from "./api";

export async function getExercisesByMuscleGroup(muscleGroupId){
    const result = await api.get(`/exercises?muscleGroupId=${muscleGroupId}`);

    return result.data;
}

export async function getAllExercises() {
    const result = await api.get("/exercises");
    return result.data;
  }

  export async function createExercise({
    name,
    muscleGroupId,
    equipment,
    imageUrl,
    userId,
  }) {
    const now = new Date().toISOString();
  
    const result = await api.post("/exercises", {
      name,
      muscleGroupId,
      equipment,
      imageUrl: imageUrl || null,
      createdByUserId: userId,
      createdAt: now,
      updatedAt: now,
    });
  
    return result.data;
  }
  