export default function Modal({ onClose, title, children, footer }) {
  return (
    <div className="hd-modal-overlay" onClick={onClose}>
      <div className="hd-modal-content" onClick={(e) => e.stopPropagation()}>
        <h3>{title}</h3>
        {children}
        <div className="hd-modal-actions">{footer}</div>
      </div>
    </div>
  );
}
