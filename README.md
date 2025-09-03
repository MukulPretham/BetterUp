# BetterUp - Website Monitoring Platform

A comprehensive website monitoring platform built with modern technologies, similar to BetterUp's monitoring services.

## 🚀 Features

- **Real-time Monitoring**: Monitor website uptime and performance across multiple regions
- **User Authentication**: Secure login/signup system with JWT tokens
- **Dashboard**: Beautiful, responsive dashboard with real-time status updates
- **Website Management**: Add/remove websites from monitoring
- **Detailed Analytics**: View response times, uptime statistics, and historical data
- **Multi-region Support**: Monitor from different geographic locations
- **Admin Panel**: System administration and region management

## 🏗️ Architecture

### Frontend (Next.js)
- **Framework**: Next.js 15 with React 19
- **Styling**: CSS Modules with custom design system
- **UI Components**: Custom component library
- **State Management**: React hooks and local storage

### Backend (Node.js)
- **Framework**: Express.js
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: JWT tokens
- **API**: RESTful endpoints

### Monitoring Services (Go)
- **Publisher**: Publishes website monitoring tasks to Redis
- **Consumer**: Processes monitoring tasks and updates database
- **Message Queue**: Redis Streams for real-time communication

## 📁 Project Structure

```
BetterUp-turborepo/
├── apps/
│   ├── web/                 # Next.js frontend application
│   ├── backend/             # Express.js API server
│   ├── publisher/           # Go publisher service
│   └── worker/              # Go consumer service
├── packages/
│   ├── db/                  # Prisma database package
│   ├── ui/                  # Shared UI components
│   ├── eslint-config/       # ESLint configuration
│   └── typescript-config/   # TypeScript configuration
└── services/                # Go microservices
    ├── publisher/           # Website monitoring publisher
    ├── consumer/            # Website monitoring consumer
    └── nf-server/           # Network function server
```

## 🛠️ Setup Instructions

### Prerequisites
- Node.js 18+ and pnpm
- Go 1.21+
- PostgreSQL database
- Redis server

### 1. Install Dependencies
```bash
# Install root dependencies
pnpm install

# Install all workspace dependencies
pnpm install --recursive
```

### 2. Database Setup
```bash
# Navigate to database package
cd packages/db

# Set up environment variables
cp .env.example .env
# Edit .env with your PostgreSQL connection string

# Run database migrations
npx prisma migrate dev

# Generate Prisma client
npx prisma generate
```

### 3. Backend Setup
```bash
# Navigate to backend
cd apps/backend

# Set up environment variables
cp .env.example .env
# Edit .env with your JWT secret and database URL

# Start the backend server
pnpm dev
```

### 4. Frontend Setup
```bash
# Navigate to web app
cd apps/web

# Start the development server
pnpm dev
```

### 5. Monitoring Services Setup
```bash
# Start Redis server
redis-server

# Start the publisher service
cd services/publisher
go run main.go

# Start the consumer service (in another terminal)
cd services/consumer
go run main.go
```

## 🌐 API Endpoints

### Authentication
- `POST /signUp` - Create new user account
- `POST /logIn` - User login
- `GET /profile` - Get user profile (requires auth)

### Website Management
- `POST /addWebsite` - Add website to monitoring (requires auth)
- `GET /websites` - Get user's monitored websites (requires auth)
- `GET /website/:id` - Get website details (requires auth)
- `DELETE /website/:id` - Remove website from monitoring (requires auth)

### System
- `GET /regions` - Get all monitoring regions
- `POST /addRegion` - Add new monitoring region

## 🎨 UI Components

The application includes a comprehensive design system with:
- **Buttons**: Primary, secondary, and destructive variants
- **Cards**: Content containers with consistent styling
- **Forms**: Input fields and form validation
- **Modals**: Authentication and website management dialogs
- **Status Indicators**: Online/offline status with color coding
- **Charts**: Response time visualization
- **Loading States**: Spinner and skeleton components

## 🔧 Configuration

### Environment Variables

#### Backend (.env)
```
DATABASE_URL="postgresql://username:password@localhost:5432/database"
JWT_SECRET="your-jwt-secret-key"
```

#### Database (.env)
```
DATABASE_URL="postgresql://username:password@localhost:5432/database"
```

### Redis Configuration
- Default: `localhost:6379`
- Database: `0`
- Stream: `websites`

## 🚀 Deployment

### Frontend (Vercel/Netlify)
```bash
cd apps/web
pnpm build
# Deploy the dist folder
```

### Backend (Railway/Heroku)
```bash
cd apps/backend
pnpm build
# Deploy with environment variables
```

### Monitoring Services (Docker)
```bash
# Build and run with Docker Compose
docker-compose up -d
```

## 📊 Monitoring Features

- **Uptime Monitoring**: Check website availability every 3 minutes
- **Response Time Tracking**: Measure and record response times
- **Multi-region Monitoring**: Monitor from different geographic locations
- **Historical Data**: Store and visualize performance trends
- **Real-time Updates**: Live status updates via Redis streams
- **Alert System**: Notifications for downtime and performance issues

## 🎯 Usage

1. **Sign Up**: Create a new account or sign in
2. **Add Websites**: Add websites you want to monitor
3. **View Dashboard**: See real-time status of all your websites
4. **Detailed View**: Click on any website for detailed analytics
5. **Admin Panel**: Manage monitoring regions and system settings

## 🔒 Security

- JWT-based authentication
- Password hashing (implement bcrypt in production)
- CORS protection
- Input validation and sanitization
- Rate limiting (recommended for production)

## 🧪 Testing

```bash
# Run frontend tests
cd apps/web
pnpm test

# Run backend tests
cd apps/backend
pnpm test

# Run Go service tests
cd services/publisher
go test ./...

cd services/consumer
go test ./...
```

## 📈 Performance

- **Frontend**: Optimized with Next.js 15 and React 19
- **Backend**: Express.js with efficient database queries
- **Monitoring**: Go services for high-performance monitoring
- **Database**: PostgreSQL with proper indexing
- **Caching**: Redis for real-time data and session management

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Check the documentation
- Review the API endpoints

---

Built with ❤️ using Next.js, Express.js, Go, PostgreSQL, and Redis.