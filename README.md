Date Palm Tree Detection using YOLOv11
Overview
This project presents an AI‑based system for detecting and counting Date Palm trees from aerial images and videos. The system uses a deep learning object detection model combined with object tracking to ensure accurate counting without duplication.

The application consists of two main parts:

Backend (Flask API) – Performs detection, tracking, and counting

Frontend (React Native / Expo App) – Provides user interface for uploading media and viewing results

The system supports both images and videos and produces bounding boxes, confidence scores, unique tracking IDs, and total tree count.

Features
Date Palm detection in aerial images

Video frame detection

Multi‑object tracking with unique IDs

Accurate tree counting (no duplicate counts)

Bounding boxes with confidence scores

Simple mobile frontend interface

REST API backend service

Technology Stack
Backend
Python

Flask

OpenCV

YOLOv11

BoT‑SORT Tracking

Frontend
React Native

Expo

Project Structure
PalmTreeDetection/
│
├── backend/
│   ├── app.py
│   ├── config.py
│   ├── detectors/
│   │   ├── image_detector.py
│   │   └── video_detector.py
│   ├── utils/
│   └── requirements.txt
│
├── frontend/
│   ├── app/
│   ├── components/
│   ├── screens/
│   ├── services/
│   └── package.json
│
└── README.md
Installation and Running
1. Clone Repository
git clone https://github.com/<your-username>/PalmTreeDetection.git
cd PalmTreeDetection
2. Run Backend
cd backend
pip install -r requirements.txt
python app.py
The backend server will start locally.

3. Run Frontend
cd frontend
npm install
npx expo start
Open the Expo app on your mobile device or emulator to use the interface.

How It Works
User uploads image or video from frontend

Backend receives file via API

YOLO model detects Date Palm trees

BoT‑SORT tracker assigns unique IDs

Counting logic counts each tree once

Processed media is returned with results

Output
The system provides:

Bounding boxes around trees

Confidence score for each detection

Unique tracking IDs (for video)

Total tree count

Applications
Agricultural monitoring

Plantation management

Land survey analysis

Smart farming systems

Author
Muhammad Yasir
Department of Computer Sciences
Namal University, Mianwali, Pakistan

License
This project is for academic and research purposes.
