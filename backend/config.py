import os

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

MODEL_PATH = os.path.join(
    BASE_DIR,
    "models",
    "palm_tree_model",
    "best.pt"
)

UPLOAD_IMAGE_DIR = os.path.join(BASE_DIR, "uploads", "images")
UPLOAD_VIDEO_DIR = os.path.join(BASE_DIR, "uploads", "videos")

OUTPUT_IMAGE_DIR = os.path.join(BASE_DIR, "outputs", "images")
OUTPUT_VIDEO_DIR = os.path.join(BASE_DIR, "outputs", "videos")

ALLOWED_IMAGE_EXT = {"jpg", "jpeg", "png"}
ALLOWED_VIDEO_EXT = {"mp4", "avi"}
