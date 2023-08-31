import React from 'react'

const RightSideBar = () => {
  return (
    <section className='rightsidebar custom-scrollbar'>
      <div className="flex flex-col flex-1 justify-start">
        <h3 className='text-[20px]'>Suggested Communities</h3>
      </div>
      <div className="flex flex-col flex-1 justify-start">
        <h3 className='text-[20px]'>Suggested Users</h3>
      </div>
    </section>
  )
}

export default RightSideBar
