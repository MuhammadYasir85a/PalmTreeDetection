const BASE_URL = "http://172.16.13.46:5000"; // change if needed

// =======================
// HEALTH CHECK
// =======================
export async function checkHealth() {
  const res = await fetch(`${BASE_URL}/health`);
  if (!res.ok) {
    throw new Error("Backend not reachable");
  }
  return res.json();
}

// =======================
// IMAGE DETECTION
// =======================
export async function detectImage(uri: string) {
  const formData = new FormData();

  formData.append("image", {
    uri,
    name: "image.jpg",
    type: "image/jpeg",
  } as any);

  const res = await fetch(`${BASE_URL}/detect/image`, {
    method: "POST",
    body: formData,
    // ❗ DO NOT set Content-Type manually
  });

  if (!res.ok) {
    throw new Error("Image detection failed");
  }

  /**
   * Expected backend response:
   * {
   *   count: number,
   *   output_url: string   <-- processed image (bounding boxes)
   * }
   */
  return res.json();
}

// =======================
// VIDEO DETECTION
// =======================
export async function detectVideo(uri: string) {
  const formData = new FormData();

  formData.append("video", {
    uri,
    name: "video.mp4",
    type: "video/mp4",
  } as any);

  const res = await fetch(`${BASE_URL}/detect/video`, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    throw new Error("Video detection failed");
  }

  /**
   * Expected backend response:
   * {
   *   count: number,
   *   output_url: string   <-- processed video
   * }
   */
  return res.json();
}
