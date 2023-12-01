import React from 'react'

const CategoryInput = ({handleSubmit,value,setValue}) => {
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
        <input type ="text" placeholder="enter new category" className="form-control" value={value}
        onChange={(e)=>setValue(e.target.value)}
       />
       </div>
       <button type="submit" className='btn btn-primary'>Create</button>
        
      </form>
    </>
  )
}

export default CategoryInput
