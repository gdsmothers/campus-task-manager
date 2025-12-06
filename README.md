# **Campus Task Manager – A Smart Productivity App for Students**

Campus Task Manager is a full-stack web application designed to help students organize coursework, manage deadlines, visualize workload patterns, and receive automated reminders for upcoming assignments. The system integrates a modern UI, dependable backend logic, and an intuitive dashboard experience tailored for university life.

This project was developed as part of our Software Engineering course and demonstrates requirements modeling, architectural design, dependability practices, and a functional deployed solution.

---

# **Features**

- **User Authentication** (register, login, secure sessions)
- **Task Management**
  - Create, complete, and delete tasks
  - Prioritize tasks (Low, Medium, High)
  - Automated reminders 1 day before due dates
  - Active vs. completed task organization
- **Calendar View**
  - Monthly calendar with due-date markers
- **Workload Analytics**
  - Interactive heatmap showing task distribution by day and time
- **Sidebar Navigation** for Dashboard, Calendar, Reminders, Priority, Analytics
- **Aesthetic Campus-Themed UI** with a purple/blue/red gradient style
- **Scalable Backend** using PostgreSQL + Prisma ORM

---

# **Tech Stack**

**Frontend:** Next.js 16, React, TailwindCSS  
**Backend:** Next.js API Routes, Prisma ORM  
**Database:** PostgreSQL (Supabase)  
**Authentication:** JWT cookies  
**Additional Libraries:**
- `bcrypt` – password hashing  
- `jsonwebtoken` – authentication tokens  
- `prisma` – database modeling + queries  

---

# **How to Run the Project Locally**

### **1. Clone the repository**

```bash
git clone https://github.com/gdsmothers/campus-task-manager.git
cd campus-task-manager/frontend
```
### **2. Install dependencies**

```bash
npm install
```
### **3. Create a .env file**

**Create frontend/.env:**

```bash
DATABASE_URL=your_supabase_postgres_url_here
JWT_SECRET=your_jwt_secret_here
```
Why these values are not included:
	•	The DATABASE_URL contains the username, password, host, and port for your database.
Publishing it would allow anyone to read, modify, or delete your data.
	•	The JWT_SECRET is used to cryptographically sign authentication tokens.
Exposing it would allow others to forge logins or access protected routes.

How to generate your own secrets:
	•	Create your own Supabase project to obtain a DATABASE_URL.
	•	Generate a secure JWT secret:
  
```bash
openssl rand -hex 32
```
Never commit the .env file — it should remain local to your machine.

### **4. Push the Prisma schema to your database**

```bash
npx prisma migrate dev --name init
```
**if needed:**

```bash
npx prisma generate
```
### **5. Start the development server**

```bash
npm run dev
```

Your app will be available at:
 http://localhost:3000

Group Member Contributions

Genesis — Backend Development & System Functionality
	•	Implemented database schema & Prisma models
	•	Developed user authentication, task API, reminder API
	•	Integrated dashboard, calendar, analytics logic
	•	Managed reliability behavior and backend dependability
	•	Resolved core bugs, database sync issues, and session logic

Kaleb — UI Design & Front-End Styling
	•	Designed the visual theme and landing page
	•	Applied app-wide gradients, color palette, and UI components
	•	Built sidebar styling and layout flow
	•	Ensured cohesive branding and aesthetic consistency

Abdoul — Sidebar Pages & Debugging Assistance
	•	Implemented Calendar, Analytics, Reminder Settings, Priority pages
	•	Helped resolve navigation issues and rendering bugs
	•	Improved responsiveness and component integration
