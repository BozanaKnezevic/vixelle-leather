function Toast({ poruka, vidljiv }) {
  if (!vidljiv) return null

  return (
    <div className="toast-notification">
      <i className="bi bi-check-circle-fill"></i>
      {poruka}
    </div>
  )
}

export default Toast