from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from recommandation import VinFastRecommendationEngine
from typing import Optional, Dict

app = FastAPI()

# Cho phép React truy cập API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

engine = VinFastRecommendationEngine('recommendation.json')

class RecommendRequest(BaseModel):
    budget: int
    seats: int
    type: str = "all"
    demand: str = "balanced"

@app.post("/recommend")
async def get_recommendation(req: RecommendRequest):
    try:
        result = engine.get_recommendations(
            budget_million=req.budget,
            seats=req.seats,
            vehicle_type=req.type,
            demand=req.demand
        )
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)