# Next Music

A modern music streaming platform built with Next.js and NestJS.

## 🚀 Features

- Modern and responsive UI built with Material-UI
- Server-side rendering with Next.js
- RESTful API with NestJS
- Theme switching support (Light/Dark mode)
- Keep-alive mechanism to prevent server sleep
- Authentication system
- Redux state management
- MongoDB integration

## 🛠️ Tech Stack

### Frontend (Client)
- Next.js
- React
- Material-UI
- Redux with next-redux-wrapper
- Emotion for styled components
- Axios for API requests
- next-themes for theme management

### Backend (Server)
- NestJS
- MongoDB with Mongoose
- Express
- JWT Authentication
- Serve Static

## 🏗️ Project Structure

```
next-music/
├── client/             # Frontend Next.js application
│   ├── src/
│   │   ├── components/ # Reusable React components
│   │   ├── pages/     # Next.js pages
│   │   ├── store/     # Redux store configuration
│   │   ├── utils/     # Utility functions
│   │   └── layouts/   # Page layouts
│   └── public/        # Static files
│
└── server/            # Backend NestJS application
    └── src/
        ├── controllers/
        ├── services/
        ├── models/
        └── modules/
```

## 🚦 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB
- npm or yarn

### Environment Variables

#### Client (.env.local)
```
NEXT_PUBLIC_API_URL=your_api_url
```

#### Server (.env)
```
MONGODB_URI=your_mongodb_uri
PORT=5000
```

### Installation

1. Clone the repository
```bash
git clone [repository-url]
cd next-music
```

2. Install dependencies for both client and server
```bash
# Install client dependencies
cd client
npm install

# Install server dependencies
cd ../server
npm install
```

3. Start the development servers

For the client:
```bash
cd client
npm run dev
```

For the server:
```bash
cd server
npm run start:dev
```

## 🔄 Keep-Alive Mechanism

The application implements a keep-alive mechanism to prevent the server from sleeping on platforms like Vercel:

- Sends periodic ping requests every 4 minutes
- Automatically starts when users visit the main page
- Includes error handling and cleanup

## 📝 Scripts

### Client
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run linting

### Server
- `npm run start:dev` - Start development server
- `npm run build` - Build for production
- `npm run start:prod` - Start production server
- `npm run test` - Run tests

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 📜 License

This project is licensed under the [UNLICENSED] License - see the LICENSE file for details.
