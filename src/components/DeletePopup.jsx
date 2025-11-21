import "../css/DeletePopup.css";
export default function DeletePopup({ selectedForDelete, onClose }) {
  const { title, image, mal_id } = selectedForDelete;
  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup-box">
        <p className="delete-validation">
          <strong>Are You Sure You Want To Delete</strong>
        </p>
        <div className="delete-validation-anime-box">
          <h2>{title}</h2>
          {image && <img src={image} alt={title} className="popup-image" />}
        </div>

        <p className="delete-validation">
          <strong>From Your List?</strong>
        </p>
      </div>
    </div>
  );
}
