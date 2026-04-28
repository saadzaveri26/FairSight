# FairSight

FairSight is a full-stack AI fairness auditing tool. It allows users to upload a machine learning dataset, run a bias audit using Fairlearn and scikit-learn, and generate an AI-powered insights report using Google's Gemini API.

## Project Structure

- **`backend/`**: A FastAPI application that handles dataset parsing, machine learning, and AI insight generation.
- **`frontend/app_build/`**: A Next.js 16 (React) application styled with Tailwind CSS and shadcn/ui.

---

## 🚀 Local Development

### 1. Backend Setup
The backend requires Python 3.10+ and a Gemini API key.

```bash
cd backend
pip install -r requirements.txt
```

Create a `.env` file in the `backend/` directory with your Gemini API key:
```env
GEMINI_API_KEY=your_gemini_api_key_here
```

Start the backend server:
```bash
python -m uvicorn main:app --reload
```

The backend API will be available at `http://localhost:8000`. You can view the Swagger UI documentation at `http://localhost:8000/docs`.

### 2. Frontend Setup
The frontend requires Node.js 18+.

```bash
cd frontend/app_build
npm install
npm run dev
```

The frontend application will be available at `http://localhost:3000`.

---

## ☁️ Deployment to Google Cloud Run

Both the frontend and backend can be deployed to Google Cloud Run as fully managed, scalable containerized applications.

### Prerequisites
- Install the [Google Cloud SDK](https://cloud.google.com/sdk/docs/install)
- Authenticate via `gcloud auth login`
- Create a GCP project and enable the **Cloud Run** and **Cloud Build** APIs.

### Backend Deployment

The backend directory contains a `Dockerfile`.

1. Submit the build to Cloud Build:
   ```bash
   cd backend
   gcloud builds submit --tag gcr.io/YOUR_PROJECT_ID/fairsight-backend
   ```
2. Deploy to Cloud Run (Make sure to pass your API key as a secret or environment variable):
   ```bash
   gcloud run deploy fairsight-backend \
     --image gcr.io/YOUR_PROJECT_ID/fairsight-backend \
     --platform managed \
     --region us-central1 \
     --allow-unauthenticated \
     --set-env-vars GEMINI_API_KEY="your_api_key"
   ```

### Frontend Deployment

Next.js can be deployed as a standalone Docker container. 

1. Create a `Dockerfile` in `frontend/app_build` (if one doesn't exist) following the [Next.js Docker deployment guide](https://github.com/vercel/next.js/tree/canary/examples/with-docker).
2. Note: You will need to configure your frontend to point to the production Cloud Run URL of the backend (e.g. by updating the API base URL in `lib/api.ts`).
3. Build and deploy:
   ```bash
   cd frontend/app_build
   gcloud builds submit --tag gcr.io/YOUR_PROJECT_ID/fairsight-frontend
   
   gcloud run deploy fairsight-frontend \
     --image gcr.io/YOUR_PROJECT_ID/fairsight-frontend \
     --platform managed \
     --region us-central1 \
     --allow-unauthenticated
   ```

---

## License
MIT License
