import React from 'react'

const Header = ({coursename}) => {

    return(
      <h1>{coursename}</h1>
    )
  }
  
  const Total = ({total}) => {
  
    const course = total
    console.log(course)
    
    const totalExercises = course.parts.reduce((total, amount) => 
      total + amount.exercises, 0
    )
  
    return(
        <p>
           Number of total exercises {totalExercises}
        </p>
    )
  }
  
  const Part = ({content, exercises, header}) => {
  
      return(
        <p>{content} {exercises}</p>
      )
  }
  
  
  const Content = ({courseList}) => {
  
    const contentList = () => courseList.parts.map(courseList =>
    <Part key = {courseList.id} content = {courseList.name} exercises = {courseList.exercises}/>
    )
  
    return ( 
          <div>
            {contentList()}
          </div>
    )
    
    
        }
        
  
  const Course = ({ course }) => {
  
   const coursesAndContent = () => course.map(course =>
      <div key = {course.id}>
      <Header coursename = {course.name}/>
      <Content courseList = {course}/>
      <Total total = {course}/>
      </div>)
  
    return(
      coursesAndContent()
    )
     }

export default Course