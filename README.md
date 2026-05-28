# EduCore

## Overview

EduCore is a scalable Learning Management System (LMS) inspired by platforms like Udemy and Coursera. The platform enables instructors to create and manage courses while allowing students to enroll, watch video lectures, and track their learning progress.


## Track
Fullstack Engineer

## Tech Stack

### Frontend

* React (Vite)
* Tailwind CSS
* React Router DOM
* Axios

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication

### Deployment

* Vercel (Frontend)
* Render (Backend)

### Future Integrations

* Cloudinary for video uploads
* Razorpay for payments

## Core Features

### Authentication System

* User Signup/Login
* JWT Authentication
* Role-based Access (Student/Instructor)

### Course Management

* Create Course
* Update/Delete Course
* Course Catalog

### Lecture Management

* Add Lectures
* Video Player Support
* Lecture Sidebar

### Student Features

* Enroll in Courses
* Track Progress
* Student Dashboard

### Instructor Features

* Instructor Dashboard
* Manage Courses
* Upload Lectures


## Database Collections

### Users

* name
* email
* password
* role

### Courses

* title
* description
* category
* price
* instructor
* lectures

### Enrollments

* studentId
* courseId

### Progress

* userId
* courseId
* lectureId
* completed

## Project Goals

* Build a scalable LMS architecture
* Implement secure authentication
* Create a responsive UI
* Support lecture-based learning
* Track student progress


## MVP Scope

* Authentication
* Course CRUD
* Lecture APIs
* Media Player UI
* Student Dashboard
* Progress Tracking


## Future Scope

* Cloudinary Video Uploads
* Payment Integration
* Course Reviews & Ratings
* AI Recommendations
* Certificates


## Figma Wireframes

( Figma link here)


## ERD / Architecture Diagram

![ERD](https://github.com/Charumehra/prodesk-capstone-EduCore/blob/11f7e035eba71aba7e44692ed21f43c0d118d77d/ERD.png)
