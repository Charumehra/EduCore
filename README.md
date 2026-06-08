# EduCore – Enterprise Learning Management System (LMS)

## 1. Project Title

**EduCore – Enterprise Learning Management System**

EduCore is a scalable, full-stack Learning Management System (LMS) inspired by modern e-learning platforms such as Udemy and Coursera. The platform enables instructors to create and manage courses, upload lectures, and track student engagement, while allowing students to enroll in courses, consume educational content, and monitor their learning progress through an intuitive dashboard.

---

## 2. High-Level Description

EduCore is designed as a modern full-stack educational platform featuring a React frontend and a secure Node.js backend. The system provides a seamless learning experience through role-based access control, lecture-based course delivery, progress tracking, and personalized dashboards.

The platform focuses on scalability, maintainability, and performance by implementing modular architecture, secure authentication mechanisms, and responsive user interfaces suitable for desktop and mobile devices.

---

## 3. Problem Statement

Online education platforms require secure and efficient systems that allow instructors to deliver educational content while enabling students to access and track their learning journey. Many learning platforms are either overly complex, expensive, or lack flexibility for smaller educational organizations.

EduCore addresses these challenges by providing a centralized LMS solution with secure authentication, course management, lecture delivery, progress tracking, and role-based access control in a responsive and user-friendly environment.

---

## 4. Objectives

### Secure Learning Environment

* Implement JWT-based authentication.
* Provide secure session management.
* Enforce role-based access control.

### Effective Course Management

* Enable instructors to create, update, and manage courses.
* Support lecture organization within courses.

### Student Learning Experience

* Allow students to enroll in courses.
* Track lecture completion and learning progress.
* Provide an intuitive course player interface.

### Responsive User Interface

* Deliver a modern and mobile-friendly design.
* Ensure accessibility across multiple devices.

### Scalable Architecture

* Follow modular backend architecture.
* Maintain clean code practices and reusable components.

---

## 5. Target Users

### System Administrators

* Monitor platform activities.
* Manage system-level configurations.

### Instructors

* Create and manage courses.
* Upload lectures and educational content.
* Track enrolled students.

### Students

* Browse course catalog.
* Enroll in courses.
* Watch lectures and track progress.

---

## 6. Designated Track

**Track:** Full Stack Engineer (Capstone Submission)

---

## 7. Complete Tech Stack

| Layer                | Technology           | Purpose                        |
| -------------------- | -------------------- | ------------------------------ |
| Frontend             | React (Vite)         | Fast and modern UI development |
| Routing              | React Router DOM     | Client-side routing            |
| Styling              | Tailwind CSS         | Responsive UI design           |
| API Communication    | Axios                | Backend communication          |
| Backend              | Node.js + Express.js | REST API services              |
| Database             | MongoDB + Mongoose   | Data persistence               |
| Authentication       | JWT                  | Secure user authentication     |
| Deployment           | Vercel               | Frontend hosting               |
| Deployment           | Render               | Backend hosting                |
| Future Media Storage | Cloudinary           | Video and media management     |
| Future Payments      | Razorpay             | Course payment processing      |

---

## 8. Core Features (MVP)

### Authentication & Authorization

* User Registration
* User Login
* JWT Authentication
* Role-Based Access Control (Student / Instructor)

### Course Management

* Create Courses
* Update Courses
* Delete Courses
* Course Catalog Listing

### Lecture Management

* Add Lectures
* Manage Course Content
* Lecture Player Interface

### Student Features

* Course Enrollment
* Learning Progress Tracking
* Student Dashboard

### Instructor Features

* Instructor Dashboard
* Course Management Panel
* Lecture Upload Management

---

## 9. User Roles & Permissions

| Permission / Action         | Admin | Instructor | Student |
| --------------------------- | ----- | ---------- | ------- |
| Manage Users                | ✓     | ✗          | ✗       |
| Create Course               | ✓     | ✓          | ✗       |
| Update Course               | ✓     | ✓          | ✗       |
| Delete Course               | ✓     | ✓          | ✗       |
| Upload Lectures             | ✓     | ✓          | ✗       |
| View Courses                | ✓     | ✓          | ✓       |
| Enroll in Course            | ✗     | ✗          | ✓       |
| Track Progress              | ✗     | ✗          | ✓       |
| Access Instructor Dashboard | ✓     | ✓          | ✗       |

---

## 10. Folder Structure

```bash
educore/
├── architecture
├── client/
│   ├── public/
│   ├── src/
│   │   ├── api/
│   │   ├──assets/
│   │   ├── components/
│   │   ├── pages/
│   ├── package.json
│   └── vite.config.js
│
├── server/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   ├── app.js
│   ├── package-lock.json
│   ├── package.json
│   ├── server.js
│   └── .env.example
```

---

## 11. Database Collections Overview

### Users

```js
{
  name: String,
  email: String,
  password: String,
  role: "student" | "instructor"
}
```

### Courses

```js
{
  title: String,
  description: String,
  category: String,
  price: Number,
  instructor: ObjectId,
  lectures: [ObjectId]
}
```

### Lectures

```js
{
  title: String,
  videoUrl: String,
  courseId: ObjectId
}
```

### Enrollments

```js
{
  studentId: ObjectId,
  courseId: ObjectId
}
```

### Progress

```js
{
  userId: ObjectId,
  courseId: ObjectId,
  lectureId: ObjectId,
  completed: Boolean
}
```

---

## 12. REST API Endpoint Planning

### Authentication Router (/api/auth)

| Method | Endpoint  | Description         |
| ------ | --------- | ------------------- |
| POST   | /register | Create user account |
| POST   | /login    | Authenticate user   |
| POST   | /logout   | Logout current user |

### Course Router (/api/courses)

| Method | Endpoint     | Description         |
| ------ | ------------ | ------------------- |
| GET    | /courses     | Fetch all courses   |
| GET    | /courses/:id | Fetch single course |
| POST   | /courses     | Create course       |
| PUT    | /courses/:id | Update course       |
| DELETE | /courses/:id | Delete course       |

### Lecture Router (/api/lectures)

| Method | Endpoint            | Description           |
| ------ | ------------------- | --------------------- |
| GET    | /lectures/:courseId | Fetch course lectures |
| POST   | /lectures           | Create lecture        |
| PUT    | /lectures/:id       | Update lecture        |
| DELETE | /lectures/:id       | Delete lecture        |

### Enrollment Router (/api/enrollments)

| Method | Endpoint  | Description             |
| ------ | --------- | ----------------------- |
| POST   | /enroll   | Enroll student          |
| GET    | /progress | Fetch learning progress |

---

## 13. UI/UX Screens Overview

### Landing Page

* Platform overview
* Featured courses
* Instructor highlights

### Authentication Portal

* Login interface
* Registration interface

### Student Dashboard

* Enrolled courses
* Progress tracking

### Instructor Dashboard

* Course management
* Lecture management

### Course Player

* Video lecture playback
* Lecture sidebar navigation
* Progress updates

---

## 14. Figma Design Links

### Login Page

https://www.figma.com/design/Pp3VbcO4CkBDE6Q9ssZrYt/Untitled?node-id=0-1

### Dashboard Page

https://www.figma.com/design/Pp3VbcO4CkBDE6Q9ssZrYt/Untitled?node-id=19-37

### Course Player Page

https://www.figma.com/design/Pp3VbcO4CkBDE6Q9ssZrYt/Untitled?node-id=4-3

---

## 15. Database ERD

![ERD](https://github.com/Charumehra/prodesk-capstone-EduCore/blob/11f7e035eba71aba7e44692ed21f43c0d118d77d/ERD.png)

## 16. Conclusion

EduCore is a modern Learning Management System built using React, Node.js, Express, and MongoDB. The platform provides a secure and scalable environment for online learning by combining role-based authentication, course management, lecture delivery, and progress tracking. Its architecture satisfies full-stack capstone requirements while serving as a production-ready foundation for future educational platforms.
