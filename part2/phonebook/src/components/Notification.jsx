const Notification = ({ message, color }) => {
  if (message === '') {
    return null
  }

  return (
    <div className='error' style={{ color: color }} >
      {message}
    </div >
  )
}

export default Notification