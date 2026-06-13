import { put } from "@vercel/blob";

async function uploadToBlob(userId: string, file: File) {
  const blob = await put(`decks/${userId}/${Date.now()}-${file.name}`, file, {
    access: "private",
  });

  return blob.url;
}

export default uploadToBlob;
