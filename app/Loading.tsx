'use client'

export function Loading() {
  return (
    <div className='h-100 d-flex flex-column align-items-center justify-content-center'>
      <div className='spinner-border' role='status'>
        <span className='visually-hidden'>Loading...</span>
      </div>
    </div>
  )
}
