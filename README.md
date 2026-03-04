# React Native – Exam Project

## APK Download

A compiled APK file for testing the application can be downloaded here:

APK Download Link:
https://drive.google.com/file/d/1laYpWViaeGb1_XNCxPWbTJMlKLJslmep/view?usp=sharing

The APK can be installed directly on an Android device for testing without running the development environment.

## Installation & Running the Project (without APK)

Follow the steps below to install and run the application locally.

### 1. Clone the repository

https://github.com/hope17ha/fitness-tracker-react-native-project

### 2. Install dependencies

npm install

### 3. Start the development server

npm start

### 4. Run the application

You can run the app using:

- Expo Go (scan the QR code from the terminal)
- Android Emulator
- iOS Simulator

Make sure the backend API (JSON Server or Mock API) is running if the project depends on it.

### 5. Server

This API provides a simple REST backend using **json-server** and **json-server-auth**.  
It simulates a backend server that supports authentication and CRUD operations for users, exercises, and workouts.

- Clone the repository : https://github.com/hope17ha/fitness-tracker-react-native-project-api
- npm install for dependencies
- npm run dev -> this will run the server using the environment port



## Functional Guide

---

## 1. Project Overview

### Application Name
Workout Tracker

### Application Category / Topic
Fitness

### Main Purpose
Workout Tracker is a mobile fitness application that allows users to manage their workout sessions and exercise catalog. The app enables users to create workouts, add exercises to them, and track completed training sessions. It also includes an exercise catalog where users can browse or create exercises and attach images to them.

The goal of the application is to provide a simple and practical way for users to organize their workouts and maintain a history of completed sessions.

---

## 2. User Access & Permissions

### Guest (Not Authenticated)

Unauthenticated users have limited access to the application.

#### Available screens or actions

- Login screen  
- Register screen  

Guests cannot access the main application features such as workouts or the exercise catalog until they authenticate successfully.

---

### Authenticated User

Once logged in, users gain access to the full application.

#### Main sections / tabs

- **Home** – overview screen with quick actions and latest workout  
- **Catalog** – list of available exercises  
- **My Workouts** – list of created workouts and training sessions  
- **Profile** – user information and logout  

#### Details screens

- Exercise Details  
- Workout Details  
- Profile Details

#### Create / Edit / Delete actions

- Create exercises  
- Edit exercises  
- Delete exercises  
- Create workouts  
- Finish workouts  
- Delete workouts  
- Add exercises to workouts  
- Change password of the logged in user

---

## 3. Authentication & Session Handling

### Authentication Flow

1. When the application starts, it checks if there is an existing stored user session.  
2. The authentication state is read from secure storage.  
3. If a valid session exists, the user is automatically logged in.  
4. If no session is found, the user is redirected to the Login/Register screens.  
5. After successful login or registration, the main application navigation becomes available.  
6. On logout, the stored session is removed and the user is redirected to the authentication screens.

---

### Session Persistence

The user session is stored using **SecureStore**.

This allows the application to securely save authentication data and restore the user session automatically after the app restarts.

When the app launches, it reads the stored session and restores the authenticated state if valid credentials are present.

---

## 4. Navigation Structure

### Root Navigation Logic

Navigation is divided into two main flows.

#### Unauthenticated users

- Login  
- Register  

#### Authenticated users

- Access to the main application via Tab Navigation

---

### Main Navigation

The application uses **Bottom Tab Navigation** with four main sections:

- Home  
- Catalog  
- My Workouts  
- Profile  

Each tab represents a major feature of the application.

---

### Nested Navigation

The application includes **Stack Navigators inside the tabs**.

#### Catalog Stack

- Catalog Screen  
- Exercise List Screen  
- Exercise Details Screen  
- Add Exercise Screen  
- Edit Exercise Screen  

#### Workouts Stack

- My Workouts Screen  
- Workout Details Screen  
- Add Workout Screen  

#### Profile Stack

- Change password of the logged in user

This structure allows deeper navigation within each section.

---

## 5. List → Details Flow

### List / Overview Screen

Examples of list screens:

- Exercise List (Catalog)  
- My Workouts list  

These screens display collections of items fetched from the backend.

Users can:

- Scroll through the list  
- Pull to refresh data  
- Select an item to view details  

---

### Details Screen

Navigation to the details screen is triggered when the user taps an item from a list.

The selected item's **ID is passed through route parameters**.

Examples:

- Exercise ID → loads exercise details  
- Workout ID → loads workout details  

The details screen then fetches the full data for that item from the API.

---

## 6. Data Source & Backend

### Backend Type

The application uses a **simulated REST API backend (JSON Server)**.

The API provides endpoints for:

- Users  
- Exercises  
- Workouts  

All data operations are performed through HTTP requests.

---

## 7. Data Operations (CRUD)

### Read (GET)

Data is fetched from the API and displayed in:

- Exercise catalog  
- Workout list  
- Exercise details  
- Workout details  
- Profile details

---

### Create (POST)

Users can create new data through forms.

Examples:

- Create new exercises  
- Create new workouts  

Data is submitted to the backend and stored via POST requests.

---

### Update / Delete (Mutation)

The application supports modification and removal of data.

#### Update

- Edit exercise information  
- Finish workout session 
- Change password of the user's profile 

#### Delete

- Delete workouts  
- Delete exercises  

After each update or deletion, the UI refreshes to reflect the latest data from the server using useCallback and useFocusEffect hooks.

---

## 8. Forms & Validation

### Forms Used

The application includes several forms:

- Login form  
- Registration form  
- Add Exercise form  
- Edit Exercise form  
- Add Workout form (includes manual date/time selection)
- Change password form 

---

### Validation Rules

Examples of validation implemented in the application:

#### Email
- Required  
- Must match a valid email format  

#### Password
- Required  
- Minimum length: 6 characters  

#### Exercise Name
- Required  
- Minimum length: 3 characters  

#### Workout Title
- Required  
- Must not be empty  

#### Workout Start Time
- Cannot be set to a future date when creating a manual workout

---

## 9. Native Device Features

### Used Native Feature

- **Image Picker (Camera / Gallery)**
- **DateTime Picker**

---

### Usage Description

The image picker is used when creating or editing exercises.

Users can:

- Select an image from the device gallery  
- Capture a photo using the device camera  

The selected image is attached to the exercise and displayed in the exercise details screen.

This functionality allows exercises to have a visual representation, improving the usability of the exercise catalog.

The application also uses a **native DateTimePicker component** when creating workouts in manual mode.  
Users can manually choose the date and time when a workout started.

---

## 10. Typical User Flow

Example user journey:

1. The user launches the app.  
2. If not logged in, the user signs in or registers.  
3. The user navigates to the Catalog to browse exercises.  
4. The user creates a new workout.  
5. Exercises are added to the workout.  
6. The workout session is completed and saved.  
7. The user can view past workouts in the **My Workouts** section.

---

## 11. Error & Edge Case Handling

### Authentication Errors

- Invalid login credentials display an error message.  
- Unauthorized access redirects the user to the login screen.

---

### Network or Data Errors

- Failed API requests display error alerts.  
- Retry options are available where appropriate.

---

### Empty Data States

- If no workouts exist, the app displays an empty state message.  
- If lists are empty, users are encouraged to create new items.

---

### Business Logic Restrictions

The application includes additional safeguards that prevent invalid actions based on the current state of the data.

Example:

- Exercises cannot be added to a workout that has already been marked as **finished**.
- When viewing an exercise from a finished workout context, the **"Add to workout"** button is disabled.
- The application checks the workout status before allowing the operation.

This ensures that completed workouts remain immutable and prevents accidental modification of historical workout data.