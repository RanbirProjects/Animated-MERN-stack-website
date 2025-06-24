Trangotech.com Pixel-Perfect MERN Clone

Home Page 
![48C846C4-84D6-4F91-B648-5CD363FC1D95](https://github.com/user-attachments/assets/adf89a43-14aa-4126-a4cb-9e64039dd990)
About
![DB739145-9D3D-4A39-BC73-F5AA539A5B6A](https://github.com/user-attachments/assets/5c16b69c-10ff-49f9-b70f-b6f312e4578c)
Services 
![C46D2589-4BB9-43B0-977D-A7010F61281F](https://github.com/user-attachments/assets/2735e597-0035-4ef0-aa2e-ad808daecfc0)
Blog
![FE35CBBA-EA80-47A6-A3D0-206B290F5EDF](https://github.com/user-attachments/assets/958d33af-8e05-4021-8646-3a017a5c4793)
Contact
![930AC138-4166-44C4-A29E-307F4E90BAF5](https://github.com/user-attachments/assets/93cf9539-17dd-4c4f-9355-3b7ed4537799)








This project is a pixel-perfect, full-stack MERN (MongoDB, Express, React, Node.js) clone of [trangotech.com](https://trangotech.com/), featuring modern UI/UX, real content, and responsive design.
 Features
- Pixel-perfect clone of trangotech.com homepage and sections
- Animated, sticky header with logo and navigation
- Hero section with slider/video, real images, and text
- About, Services, Products, News, Partners, Gallery, Contact, and Footer
- Responsive design for desktop and mobile
- Modern animations and interactive UI (Framer Motion)
- Real content and images (where possible)
- Ready for deployment on Netlify (frontend) and Render/Heroku (backend)

 Tech Stack
- **Frontend:** React, Framer Motion, CSS Modules
- **Backend:** Node.js, Express
- **Database:** MongoDB
- **Deployment:** Netlify (frontend), Render/Heroku (backend)

Getting Started

 Prerequisites
- Node.js & npm
- MongoDB (local or Atlas)

 Installation
1. Clone the repo:
   ```sh
   git clone https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
   cd YOUR_REPO_NAME
   ```
2. Install dependencies:
   ```sh
   cd client && npm install
   cd ../server && npm install
   ```
3. Create a `.env` file in `/server` for MongoDB connection:
   ```env
   MONGO_URI=your_mongodb_connection_string
   PORT=5000
   ```
4. Start the backend:
   ```sh
   cd server && node index.js
   ```
5. Start the frontend:
   ```sh
   cd client && npm start
   ```

## Deployment
- Frontend: Deploy `/client` to Netlify. Use the provided `netlify.toml` for configuration.
- Backend: Deploy `/server` to Render, Heroku, or similar.

## Credits
- Inspired by [trangotech.com](https://trangotech.com/)
- Built by Ranbir Singh

---
Feel free to fork, contribute, or use as a template for your own projects!
