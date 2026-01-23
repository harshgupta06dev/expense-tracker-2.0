function IconButton({ onClick, title, className, children }) {
  return (
    <button
      onClick={onClick}
      title={title}
      className={`p-2 rounded-lg transition-all ${className}`}
    >
      {children}
    </button>
  );
}

export default IconButton;
