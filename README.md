# 📚 Journal - Article Dashboard with MERN Stack

### ✨ Description

A simple implementation of Login, Register, Protection Web using token by using MERN stack.

* * *

### 🖼️ Preview

✨ Dashboard  
[Dashboard Preview](assets/images/Dashboard.png)

✨ Login  
[Login Preview](assets/images/Login.png)

✨ Register  
[Register Preview](assets/images/Register.png)

✨ Home  
[Home Preview](assets/images/Home.png)

* * *

### 🚀 Key Features

- **User Authentication**: Register, login, and access personalized content.
- **Auto Logout**: User will be automatically logged out after 5 minutes of inactivity (AFK).
- **Secure Dashboard Access**: Users must be logged in to access the dashboard. If not logged in, they are redirected to the login page.
- **Filter articles by category** (AI, Biology, Technology, etc.).
- **Pagination** for article navigation.
- **Responsive** design for mobile and desktop.
- **Sidebar** with logout button.
- **Hamburger menu** for small screens (📱).
- **Protection Against XSS**: Measures have been taken to prevent cross-site scripting attacks by sanitizing inputs and escaping user-generated content.

* * *

### ⚙️ Technologies Used

- **Frontend**:
  - React JS
  - Tailwind CSS
  - React Router Dom

- **Backend**:
  - Node.js with Express
  - MongoDB (NoSQL Database)

* * *

### 🛠️ Weaknesses

- **Limited Features**: The web is still in its early stages and lacks more advanced features like full-text search, comment systems, content moderation, and CRUD functionality.
- **Basic Authentication**: User authentication is functional, but could be enhanced with additional security measures like two-factor authentication or OAuth.
- **Performance**: As the number of articles grows, pagination might not be as efficient, and additional optimizations might be needed for larger datasets.
- **Design**: The design is minimalist and may not appeal to users who prefer more dynamic, feature-rich layouts.
- **XSS Protection**: While XSS protection is implemented, it's always possible for new vulnerabilities to be discovered. Continuous security updates are recommended.
