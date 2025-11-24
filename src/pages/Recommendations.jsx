import "../css/Recommendations.css"

export default function Recommendations() {
    return (
      <div className="recommendations-page">
        <h1 className="rec-title">Recommendations</h1>
  
        <div className="rec-box">
          <p className="rec-main-text">
            This feature is currently in development.
          </p>
  
          <p className="rec-sub-text">
            Soon, you'll receive personalized anime recommendations based on your
            ratings, genres you enjoy, and your overall watching patterns.
          </p>
  
          <p className="rec-highlight">
          We’ll use collaborative filtering with Cosine Similarity to recommend shows that are closest to your personal preferences.
          All of this will be done by Python.
          </p> 
        </div>
      </div>
    );
  }