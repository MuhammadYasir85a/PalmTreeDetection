import os
from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from dotenv import load_dotenv

from utils.file_utils import save_file
from detectors.image_detector import detect_image
from detectors.video_detector import detect_video
from config import UPLOAD_IMAGE_DIR, UPLOAD_VIDEO_DIR, OUTPUT_IMAGE_DIR, OUTPUT_VIDEO_DIR

from flask import send_from_directory





load_dotenv()

app = Flask(__name__)
CORS(app)

# Security: Limit maximum upload size (32MB)
app.config['MAX_CONTENT_LENGTH'] = 32 * 1024 * 1024

# =========================
# ROOT & HEALTH
# =========================
@app.route("/", methods=["GET"])
def index():
    return jsonify({
        "project": "Palm Tree Detection API",
        "status": "Online",
        "endpoints": {
            "health": "/health",
            "image": "/detect/image",
            "video": "/detect/video",
            "outputs": "/outputs/<file>"
        }
    }), 200


@app.route("/health", methods=["GET"])
def health():
    return jsonify({
        "status": "Backend running",
        "environment": os.getenv("FLASK_ENV", "development")
    }), 200


# =========================
# IMAGE DETECTION
# =========================
@app.route("/detect/image", methods=["POST"])
def image_api():
    if "image" not in request.files:
        return jsonify({"error": "No image file provided"}), 400

    file = request.files["image"]
    input_path = save_file(file, UPLOAD_IMAGE_DIR)

    result = detect_image(input_path)

    # Convert local path → public URL
    # ADD THIS 👇
    result["output_url"] = f"http://{request.host}/outputs/images/{os.path.basename(result['output_path'])}"

    return jsonify(result), 200


# =========================
# VIDEO DETECTION
# =========================
@app.route("/detect/video", methods=["POST"])
def video_api():
    if "video" not in request.files:
        return jsonify({"error": "No video file provided"}), 400

    file = request.files["video"]
    input_path = save_file(file, UPLOAD_VIDEO_DIR)

    result = detect_video(input_path)

    if not result.get("output_path"):
        return jsonify(result), 500

    result["output_url"] = (
        f"http://{request.host}/outputs/videos/"
        f"{os.path.basename(result['output_path'])}"
    )

    return jsonify(result), 200



# =========================
# SERVE PROCESSED FILES
# =========================
@app.route("/outputs/images/<filename>")
def serve_image(filename):
    return send_from_directory(OUTPUT_IMAGE_DIR, filename)


@app.route("/outputs/videos/<filename>")
def serve_video(filename):
    return send_from_directory(OUTPUT_VIDEO_DIR, filename)


# =========================
# LARGE FILE ERROR
# =========================
@app.errorhandler(413)
def request_entity_too_large(error):
    return jsonify({"error": "File too large (max 32MB)"}), 413




if __name__ == "__main__":
    os.makedirs(UPLOAD_IMAGE_DIR, exist_ok=True)
    os.makedirs(UPLOAD_VIDEO_DIR, exist_ok=True)
    os.makedirs(OUTPUT_IMAGE_DIR, exist_ok=True)
    os.makedirs(OUTPUT_VIDEO_DIR, exist_ok=True)

    app.run(host="0.0.0.0", port=5000, debug=True)
