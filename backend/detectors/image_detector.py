import cv2
import os
from ultralytics import YOLO
from config import MODEL_PATH, OUTPUT_IMAGE_DIR

model = YOLO(MODEL_PATH)

def detect_image(image_path):
    img = cv2.imread(image_path)

    results = model(img, conf=0.3)

    count = 0
    for box in results[0].boxes.xyxy:
        x1, y1, x2, y2 = map(int, box)
        cv2.rectangle(img, (x1, y1), (x2, y2), (0, 255, 0), 2)
        count += 1

    os.makedirs(OUTPUT_IMAGE_DIR, exist_ok=True)
    output_path = os.path.join(
        OUTPUT_IMAGE_DIR,
        os.path.basename(image_path)
    )

    cv2.imwrite(output_path, img)

    return {
        "count": count,
        "output_path": output_path
    }
