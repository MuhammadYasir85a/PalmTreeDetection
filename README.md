<div align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=0:0F172A,50:0E7C3A,100:06B6D4&height=220&section=header&text=Palm%20Tree%20Detection&fontSize=60&fontColor=ffffff&animation=fadeIn&fontAlignY=38&desc=YOLOv11%20%2B%20BoT-SORT%20Computer%20Vision%20System&descAlignY=58&descSize=18" width="100%" />
</div>

<div align="center">
  <img src="https://readme-typing-svg.demolab.com?font=Fira+Code&weight=600&size=22&duration=3500&pause=800&color=06B6D4&center=true&vCenter=true&width=800&height=45&lines=Detecting+Date+Palm+Trees+from+Aerial+Imagery;Powered+by+YOLOv11+Deep+Learning;Multi-Object+Tracking+with+BoT-SORT;Flask+REST+API+%2B+React+Native+Frontend" alt="Typing SVG" />
</div>

<div align="center">
  <img src="https://img.shields.io/badge/Status-Completed-success?style=for-the-badge" alt="Status" />
  <img src="https://img.shields.io/badge/Python-3.8+-3776AB?style=for-the-badge&logo=python&logoColor=white" alt="Python" />
  <img src="https://img.shields.io/badge/PyTorch-EE4C2C?style=for-the-badge&logo=pytorch&logoColor=white" alt="PyTorch" />
  <img src="https://img.shields.io/badge/OpenCV-5C3EE8?style=for-the-badge&logo=opencv&logoColor=white" alt="OpenCV" />
  <img src="https://img.shields.io/badge/Flask-000000?style=for-the-badge&logo=flask&logoColor=white" alt="Flask" />
  <img src="https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React Native" />
</div>

---

## Overview

An end-to-end Computer Vision system that detects and counts date palm trees from aerial images and videos using YOLOv11 deep learning model and BoT-SORT multi-object tracking algorithm. Built with a complete production-ready architecture: Flask REST API backend and React Native mobile frontend.

This project addresses the real-world challenge of automated agricultural monitoring, helping farm operators and agricultural researchers count and track date palm trees across large fields without manual effort.

---

## Key Features

- YOLOv11 deep learning detection trained on custom aerial imagery dataset
- BoT-SORT multi-object tracking assigns unique IDs to each tree across video frames
- Image and video input support
- Real-time inference via Flask REST API
- Mobile-first React Native frontend
- Tree counting logic eliminates duplicate counts using unique IDs
- Custom dataset prepared and annotated using Roboflow
- Modular architecture with clean separation of concerns

---

## Tech Stack

**Backend and Machine Learning:**
- Python 3.8+
- PyTorch
- YOLOv11 (Ultralytics)
- BoT-SORT
- OpenCV
- Flask

**Frontend and DevOps:**
- React Native
- Expo
- npm
- Git and GitHub
- Roboflow (Dataset management)

---

## System Architecture
React Native Frontend
|
| HTTP Request (image/video)
v
Flask REST API
|
v
YOLOv11 Detector
(Object Detection)
|
v
BoT-SORT Tracker
(Multi-Object Tracking + Counting)
|
v
JSON Response
(count, bounding boxes, tracking IDs)

text


---

## Project Structure
PalmTreeDetection/
│
├── backend/
│ ├── detectors/
│ ├── utils/
│ ├── app.py
│ ├── config.py
│ └── requirements.txt
│
├── frontend/
│ ├── app/
│ ├── components/
│ ├── screens/
│ ├── services/
│ └── package.json
│
└── README.md

text


---

## Installation and Setup

### Prerequisites

- Python 3.8 or higher
- Node.js 16+ and npm
- Expo CLI for React Native
- Git

### Backend Setup


git clone https://github.com/MuhammadYasir85a/PalmTreeDetection.git
cd PalmTreeDetection/backend

python -m venv venv
source venv/bin/activate

pip install -r requirements.txt

python app.py
The backend will start on http://localhost:5000

Frontend Setup
Bash

cd ../frontend

npm install

npx expo start
Scan the QR code with the Expo Go app on your phone (iOS or Android).

How It Works
Image/Video Upload — User uploads aerial imagery via mobile app
API Request — Frontend sends file via HTTP POST to Flask backend
YOLOv11 Detection — Model identifies palm trees with bounding boxes and confidence scores
BoT-SORT Tracking — For videos, tracks each tree across frames with unique IDs
Counting and Visualization — System counts unique trees and overlays results on output
Response Display — Mobile app displays annotated output and total count
Use Cases
Agricultural monitoring for tracking date palm tree growth
Crop yield estimation based on tree count
Land surveying and automated counting for large plantations
Drone integration for real-time field analysis
Research applications supporting agricultural data collection
Future Improvements
Cloud deployment on Microsoft Azure or AWS
Real-time drone video stream support
Tree health classification (healthy, diseased, dead)
Geo-location tagging using GPS metadata
Historical tracking of tree counts over time
Multi-class detection for different tree species
Web dashboard for analytics and reporting
Performance Notes
The system demonstrates reliable and consistent performance under standard conditions, with scope for further improvement in complex environments such as dense vegetation overlap, varying lighting conditions, and weather-induced visibility issues.

Author
Muhammad Yasir

Computer Science Undergraduate at Namal University Mianwali
Aspiring AI and Computer Vision Engineer

<div> <a href="https://www.linkedin.com/in/muhammad-yasir-6a9500343/"> <img src="https://img.shields.io/badge/LinkedIn-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn" /> </a> <a href="mailto:muhammadyasir85a@gmail.com"> <img src="https://img.shields.io/badge/Email-EA4335?style=for-the-badge&logo=gmail&logoColor=white" alt="Email" /> </a> <a href="https://github.com/MuhammadYasir85a"> <img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white" alt="GitHub" /> </a> </div>
Acknowledgments
Ultralytics for the YOLOv11 framework
Roboflow for dataset annotation tools (Verified Student access)
Murtaza's Workshop for OpenCV foundational tutorials
Namal University Mianwali for academic guidance
License
This project is licensed under the MIT License.

<div align="center"> <img src="https://capsule-render.vercel.app/api?type=waving&color=0:06B6D4,50:0E7C3A,100:0F172A&height=120&section=footer" width="100%" /> </div> ```
