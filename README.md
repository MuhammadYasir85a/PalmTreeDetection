# Date Palm Tree Detection using YOLOv11

This project detects and counts date palm trees from aerial images and videos using YOLOv11 and BoT-SORT tracking.

## Features
- Image detection
- Video detection
- Tracking with unique IDs
- Tree counting
- React Native frontend
- Flask backend

## Project Structure
PalmTreeDetection
│
├── backend
│   ├── detectors
│   ├── utils
│   ├── app.py
│   ├── config.py
│   └── requirements.txt
│
├── frontend
│   ├── app
│   ├── components
│   ├── screens
│   ├── services
│   └── package.json

## Run Backend
cd backend
pip install -r requirements.txt
python app.py

## Run Frontend
cd frontend
npm install
npx expo start
