import "../assets/UserCard.css";

export function UserCard({userName, jobTitle, profilePicture}) {
  return (
    <div className="d-flex align-items-center justify-content-end gap-3 p-3">
      <div className="text-end">
        <h3 className="fs-4 fw-bold mb-0">{userName}</h3>
        <h5 className="fs-6 text-muted mb-0">{jobTitle}</h5>
      </div>
      <button className="btn btn-link p-0 d-flex align-items-center">
        <div className="rounded-circle" style={{ 
          width: 'clamp(40px, 3vw, 50px)', 
          height: 'clamp(40px, 3vw, 50px)', 
          backgroundColor: '#FABB18',
          backgroundImage: `url(${profilePicture})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }} />
      </button>
    </div>
  );
    
}