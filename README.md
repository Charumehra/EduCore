# EduCore – AI-Powered Learning Management System

## Overview

EduCore is a full-stack Learning Management System (LMS) built using the MERN stack. The platform enables instructors to create and manage courses, upload lecture videos, and monitor enrolled students, while allowing students to browse courses, purchase premium content, enroll in courses, and access learning materials through a secure and responsive interface.

The platform incorporates secure authentication, role-based authorization, cloud media storage, Stripe payment integration, and AI-powered course recommendations to deliver a modern online learning experience.

---

## Key Features

### Authentication & Authorization

* User Registration
* User Login
* User Logout
* JWT Authentication
* HTTP-Only Cookie Sessions
* Role-Based Access Control
* Protected Routes

### Course Management

* Create Courses
* Update Courses
* Delete Courses
* Browse Course Catalog
* Upload Course Thumbnails
* Instructor-Owned Course Management

### Lecture Management

* Upload Lecture Videos
* Update Lecture Content
* Delete Lectures
* View Course Lectures
* Course Learning Interface

### Student Features

* Browse Available Courses
* Purchase Courses via Stripe
* Enroll in Courses
* Access Enrolled Courses
* View Learning Dashboard

### Instructor Features

* Manage Created Courses
* Upload Course Content
* View Enrolled Students
* Manage Course Lectures

### AI Features

* AI-Powered Course Suggestions
* Rate-Limited AI Requests

### Security Features

* JWT Authentication
* Role-Based Authorization
* Ownership Authorization
* Input Validation
* Login Rate Limiting
* API Request Validation

---

## Tech Stack

### Frontend

* React (Vite)
* React Router DOM
* Redux Toolkit
* Axios
* Tailwind CSS

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose

### Authentication

* JWT
* HTTP-Only Cookies
* bcryptjs

### Media Storage

* Cloudinary

### Payments

* Stripe

### AI Integration

* GoogleGenerativeAI

### Deployment

* Vercel (Frontend)
* Render (Backend)

---

## User Roles

### Student

* Browse Courses
* Purchase Courses
* Enroll in Courses
* Access Learning Content

### Instructor

* Create Courses
* Upload Lectures
* Manage Course Content
* View Enrolled Students

### Admin

* Full Platform Access
* Course Oversight
* User Management Support

---

## Database Models

### User

* name
* email
* password
* role
* enrolledCourses

### Course

* title
* description
* category
* level
* price
* owner
* thumbnail
* lectures
* enrolledStudents

### Lecture

* title
* description
* duration
* videoUrl
* publicId

---

## API Modules

### Authentication

* Register User
* Login User
* Logout User
* Get Current User

### Courses

* Create Course
* Update Course
* Delete Course
* Get All Courses
* Get Single Course
* Enroll In Course
* Get My Courses
* Get My Created Courses
* Get Enrolled Students
* Access Learning Course

### Lectures

* Add Lecture
* Update Lecture
* Delete Lecture
* Get Course Lectures

### Payments

* Create Stripe Checkout Session

### AI

* Generate Course Suggestions

---

## Future Enhancements

* Course Reviews & Ratings
* Quiz & Assessment System
* Certificates of Completion
* Instructor Analytics Dashboard
* Discussion Forums
* Course Search & Recommendation Engine

---

## Conclusion

EduCore is a scalable and secure Learning Management System that combines modern web technologies with cloud media storage, payment processing, and AI-powered recommendations. The platform demonstrates real-world full-stack development practices including authentication, authorization, media management, payment integration, and modular API architecture.
