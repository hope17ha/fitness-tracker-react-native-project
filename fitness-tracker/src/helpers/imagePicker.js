import * as ImagePicker from "expo-image-picker";

export async function pickExerciseImageFromLibrary() {
  const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
  if (status !== "granted") {
    throw new Error("Media library permission not granted");
  }

  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: [ImagePicker.MediaType.Images],
    allowsEditing: true,
    quality: 0.7,
    base64: true,
  });

  if (result.canceled) return null;

  const asset = result.assets?.[0];
  if (!asset?.base64) return null;

  const mime = asset.mimeType || "image/jpeg";
  return `data:${mime};base64,${asset.base64}`;
}

export async function takeExerciseImageWithCamera() {
  const { status } = await ImagePicker.requestCameraPermissionsAsync();
  if (status !== "granted") {
    throw new Error("Camera permission not granted");
  }

  const result = await ImagePicker.launchCameraAsync({
    allowsEditing: true,
    quality: 0.7,
    base64: true,
  });

  if (result.canceled) return null;

  const asset = result.assets?.[0];
  if (!asset?.base64) return null;

  const mime = asset.mimeType || "image/jpeg";
  return `data:${mime};base64,${asset.base64}`;
}