import cv2
import os
import numpy as np
from ultralytics import YOLO
from config import MODEL_PATH, OUTPUT_VIDEO_DIR

model = YOLO(MODEL_PATH)

def detect_video(video_path):
    cap = cv2.VideoCapture(video_path)
    if not cap.isOpened():
        return {"count": 0, "output_path": None, "error": "Could not open video"}

    width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
    height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
    fps = cap.get(cv2.CAP_PROP_FPS) or 25

    os.makedirs(OUTPUT_VIDEO_DIR, exist_ok=True)
    output_path = os.path.join(OUTPUT_VIDEO_DIR, os.path.basename(video_path))
    out = cv2.VideoWriter(output_path, cv2.VideoWriter_fourcc(*"mp4v"), fps, (width, height))

    counted_ids = set()
    total_count = 0

    # Define a "Detection Gate" (a horizontal strip)
    gate_top = int(height * 0.70)
    gate_bottom = int(height * 0.85)

    while True:
        ret, frame = cap.read()
        if not ret: break

        # ✅ SWITCHED TO BoT-SORT: Best for moving cameras/drones
        # conf=0.1 allows the tracker to keep the ID even when the tree "blinks"
        results = model.track(
            frame, 
            persist=True, 
            conf=0.1, 
            iou=0.5, 
            tracker="botsort.yaml" # BoT-SORT handles camera motion compensation
        )

        if results and results[0].boxes.id is not None:
            boxes = results[0].boxes.xyxy.cpu().numpy()
            ids = results[0].boxes.id.int().cpu().numpy()
            confs = results[0].boxes.conf.cpu().numpy() # Get confidence for filtering

            for box, track_id, conf in zip(boxes, ids, confs):
                # ✅ FILTER: Only process/draw if the model is reasonably sure (>0.3)
                # This stops "ghost" boxes from appearing while keeping IDs stable
                if conf < 0.3:
                    continue

                x1, y1, x2, y2 = map(int, box)
                cx, cy = (x1 + x2) // 2, (y1 + y2) // 2

                # REGION LOGIC: Only count if the tree ID enters the 'Gate'
                if track_id not in counted_ids:
                    if gate_top < cy < gate_bottom:
                        total_count += 1
                        counted_ids.add(track_id)

                # Visuals
                color = (0, 255, 0) if track_id in counted_ids else (255, 0, 0)
                cv2.rectangle(frame, (x1, y1), (x2, y2), color, 2)
                cv2.putText(frame, f"ID:{track_id} {conf:.2f}", (x1, y1-10), 0, 0.6, color, 2)

        # Draw the Detection Gate
        cv2.rectangle(frame, (0, gate_top), (width, gate_bottom), (0, 255, 255), 2)
        cv2.putText(frame, f"Palm Count: {total_count}", (30, 50), 0, 1.2, (0, 255, 0), 3)

        out.write(frame)

    cap.release()
    out.release()
    return {"count": total_count, "output_path": output_path}
