import { UTApi } from "uploadthing/server";

const utApi = new UTApi();

export const deleteUTFiles = async (file: string) => {
  try {
    const key = file.split("/f/")[1];
    await utApi.deleteFiles(key);
  } catch (error) {
    console.log("Error al eliminar archivo", error);
  }
};
