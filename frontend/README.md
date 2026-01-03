# Campus Connect Hub - Frontend

A modern, feature-rich React application for smart campus ecosystem management. Enables QR-based event registration, hackathon discovery, placement drives, club management, and career resources - all in one unified platform.

**Status**: ✅ Production Ready | **Build**: 2,166 modules | **Language**: JavaScript (converted from TypeScript)

---

## 📋 Table of Contents

- [Quick Start](#quick-start)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Environment Setup](#environment-setup)
- [Available Scripts](#available-scripts)
- [API Integration](#api-integration)
- [Authentication](#authentication)
- [Key Pages & Routes](#key-pages--routes)
- [Component Architecture](#component-architecture)
- [Styling & UI](#styling--ui)
- [Development Workflow](#development-workflow)
- [Deployment](#deployment)
- [Troubleshooting](#troubleshooting)

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm 9+
- Backend server running on `http://localhost:5000`
- MongoDB for backend data persistence

### Installation & Development

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start development server (runs on http://localhost:8080)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## ✨ Features

### Core Features
- **QR Code Event Registration** - Register for events in seconds using QR technology
- **Smart Event Management** - Discover, register, and manage campus events
- **Hackathons & Contests** - Find and participate in programming competitions
- **Placement Drives** - Track company visits and placement opportunities
- **Club Community** - Join and manage campus clubs
- **Learning Resources** - Access comprehensive study materials and guides
- **Payment Integration** - Secure ticket purchases with Stripe

### Advanced Features
- **Email Notifications** - Automated emails with QR tickets
- **Ticket Generation** - PDF tickets with unique QR codes
- **Role-Based Access Control** - Student, Admin, Club Head, Recruiter roles
- **Protected Routes** - 35+ routes with authentication & authorization
- **Real-time Updates** - Event status, registrations, and announcements
- **Responsive Design** - Mobile-first, works on all devices

---

## 🛠 Tech Stack

### Frontend
- **React** 18.3.1 - UI library
- **Vite** 5.4.21 - Build tool & dev server
- **Tailwind CSS** 3.4.17 - Utility-first CSS
- **JavaScript** - Converted from TypeScript for simpler development
- **React Router** 6.30.1 - Client-side routing
- **React Hook Form** 7.61.1 - Form management
- **React Query** 5.83.0 - Server state management
- **Shadcn/ui** - Beautiful UI components (40+ components)
- **Lucide React** - Icon library (200+ icons)
- **Recharts** - Data visualization
- **Zod** - Schema validation
- **jsPDF & html2canvas** - PDF generation
- **Sonner** - Toast notifications

### Backend (Node.js)
- Express.js - REST API server
- MongoDB - NoSQL database
- Mongoose - MongoDB ODM
- JWT - Authentication
- Bcryptjs - Password hashing
- Stripe - Payment processing
- Nodemailer - Email service

---

## 📁 Project Structure

```
frontend/
├── src/
│   ├── components/           # Reusable UI components
│   │   ├── ui/              # Shadcn UI components (40+)
│   │   ├── Navbar.js
│   │   ├── Footer.js
│   │   ├── EventCard.js
│   │   ├── Features.js
│   │   ├── EventsSection.js
│   │   ├── ProtectedRoute.js # Route protection
│   │   └── ...
│   ├── pages/                # Page components (routes)
│   │   ├── Index.js         # Home page
│   │   ├── Events.js
│   │   ├── Workshops.js
│   │   ├── Placements.js
│   │   ├── Community.js
│   │   ├── Resources.js
│   │   ├── Login.js
│   │   ├── Signup.js
│   │   ├── MyTickets.js
│   │   ├── EventDetails.js
│   │   ├── PaymentCheckout.js
│   │   ├── PaymentSuccess.js
│   │   ├── AdminDashboard.js
│   │   ├── UserDashboard.js
│   │   └── ... (35+ total routes)
│   ├── context/              # React Context
│   │   └── AuthContext.js   # Global auth & user state
│   ├── config/               # Configuration
│   │   └── api.js           # API endpoints & client
│   ├── hooks/                # Custom React hooks
│   │   ├── use-mobile.tsx
│   │   └── use-toast.ts
│   ├── lib/                  # Utility functions
│   │   └── utils.ts
│   ├── services/             # Business logic
│   │   ├── emailService.js
│   │   ├── ticketService.js
│   │   ├── paymentService.js
│   │   └── eventService.js
│   ├── App.js                # Main app component
│   ├── main.js               # Entry point
│   ├── index.css             # Global styles (Tailwind + CSS vars)
│   └── vite-env.d.ts
├── public/                   # Static assets
│   └── robots.txt
├── index.html                # HTML template
├── vite.config.ts            # Vite configuration
├── tailwind.config.ts        # Tailwind CSS config (updated for .js/.jsx)
├── postcss.config.js         # PostCSS config
├── tsconfig.json             # TypeScript config (legacy)
├── components.json           # Shadcn/ui config
├── eslint.config.js          # ESLint config
├── .babelrc                  # Babel config (automatic JSX runtime)
├── package.json              # Dependencies
├── add-react-imports.js      # Script to add React imports (utility)
├── fix-duplicate-imports.js  # Script to fix duplicate imports (utility)
└── README.md                 # This file
```

---

## 🔐 Environment Setup

### Frontend Environment Variables

Create a `.env` file in the frontend directory:

```env
# API Configuration
VITE_API_URL=http://localhost:5000/api

# Optional: For production
# VITE_API_URL=https://api.yourdomain.com/api
```

The app uses `import.meta.env.VITE_API_URL` with fallback to `http://localhost:5000/api`.

### Backend Configuration

Backend runs on `http://localhost:5000` with these environment variables (in `backend/.env`):

```env
MONGODB_URI=mongodb://localhost:27017/campus-connect
PORT=5000
NODE_ENV=development
JWT_SECRET=your_jwt_secret_key_change_in_production_12345
JWT_EXPIRE=7d
BCRYPT_SALT=10
FRONTEND_URL=http://localhost:8080
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
```

---

## 📝 Available Scripts

### Development

```bash
# Start dev server with hot reload (port 8080)
npm run dev

# Run ESLint checks
npm run lint
```

### Production

```bash
# Build for production (creates ./dist)
npm run build

# Preview production build locally
npm run preview

# Build in development mode
npm run build:dev
```

### Utilities

```bash
# Add React imports to all files that use React.createElement
node add-react-imports.js

# Remove duplicate React imports
node fix-duplicate-imports.js
```

---

## 🔌 API Integration

All API communication goes through `src/config/api.js`:

```javascript
import { API_ENDPOINTS } from "@/config/api";

// Example: Fetch events
const response = await fetch(API_ENDPOINTS.EVENTS_LIST, {
  headers: {
    'Authorization': `Bearer ${localStorage.getItem('authToken')}`
  }
});

const data = await response.json();
```

### Available Endpoints

**Authentication**
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `POST /api/auth/logout` - User logout

**Events**
- `GET /api/events` - List all events
- `GET /api/events/:id` - Get event details
- `POST /api/events` - Create event (admin/club_head)
- `PUT /api/events/:id` - Update event (admin/club_head)
- `DELETE /api/events/:id` - Delete event (admin/club_head)
- `GET /api/events/upcoming` - Get upcoming events

**Users**
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile
- `POST /api/users/upload-resume` - Upload resume

**Payments**
- `POST /api/payments` - Create payment
- `GET /api/payments` - List payments
- `GET /api/payments/:id` - Get payment details
- `PUT /api/payments/:id/complete` - Complete payment
- `PUT /api/payments/:id/refund` - Refund payment

**Tickets**
- `POST /api/tickets` - Create ticket
- `GET /api/tickets` - List user tickets
- `GET /api/tickets/:id` - Get ticket details
- `PUT /api/tickets/:id/check-in` - Check in to event

**Clubs**
- `GET /api/clubs` - List all clubs
- `POST /api/clubs` - Create club
- `GET /api/clubs/:id` - Get club details
- `POST /api/clubs/:id/join` - Join club
- `POST /api/clubs/:id/leave` - Leave club

**See backend README for complete API documentation**

---

## 🔐 Authentication

### Authentication Flow

1. User registers/logs in via Login or Signup page
2. Backend validates credentials and returns JWT token
3. Token stored in `localStorage` as `authToken`
4. Token sent with every API request in `Authorization: Bearer <token>` header
5. `ProtectedRoute` component checks authentication before rendering
6. `AuthContext` provides global access to user state

### User Roles

- **Student** - Event registration, ticket access, resource viewing
- **Admin** - Full system access, event management, user management
- **Club Head** - Club management, event organization
- **Recruiter** - Campus drive management, opportunity posting

### Protected Routes Example

```javascript
import { ProtectedRoute } from "@/components/ProtectedRoute";

<Route 
  path="/admin" 
  element={
    <ProtectedRoute 
      requiredRole="admin"
      component={AdminDashboard}
    />
  }
/>
```

### AuthContext Usage

```javascript
import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";

function MyComponent() {
  const { user, isLoggedIn, logout } = useContext(AuthContext);
  
  if (!isLoggedIn) return <div>Please log in</div>;
  
  return <div>Welcome, {user.name}!</div>;
}
```

---

## 📄 Key Pages & Routes

| Route | Component | Auth | Role | Description |
|-------|-----------|------|------|-------------|
| `/` | Index | ❌ | - | Home page with hero and features |
| `/events` | Events | ❌ | - | Browse all events |
| `/events/:id` | EventDetails | ❌ | - | Event details and registration |
| `/workshops` | Workshops | ❌ | - | Workshop listings |
| `/placements` | Placements | ❌ | - | Placement opportunities |
| `/community` | Community | ❌ | - | Club discovery and management |
| `/resources` | Resources | ❌ | - | Learning materials |
| `/login` | Login | ❌ | - | User login |
| `/signup` | Signup | ❌ | - | User registration |
| `/my-tickets` | MyTickets | ✅ | Student | User's event tickets (PDF download) |
| `/my-payments` | MyPayments | ✅ | Student | User's payment history |
| `/payment/:eventId` | PaymentCheckout | ✅ | Student | Event payment checkout (Stripe) |
| `/admin` | AdminDashboard | ✅ | Admin | Admin dashboard & analytics |
| `/admin/events` | AdminAddEvent | ✅ | Admin | Create/manage events |
| `/admin/opportunities` | AdminAddOpportunity | ✅ | Admin | Create/manage opportunities |
| `/user-dashboard` | UserDashboard | ✅ | Student | User profile and settings |
| `/404` | NotFound | ❌ | - | 404 error page |

---

## 🎨 Component Architecture

### Component Hierarchy

```
App (with Providers)
├── AuthProvider (handles auth state)
├── QueryClientProvider (React Query)
├── TooltipProvider (Radix UI)
│
├── BrowserRouter
│   ├── Routes
│   │   └── Route
│   │       ├── Navbar (on every page)
│   │       ├── Page Components
│   │       │   ├── Hero
│   │       │   ├── Features (with icons)
│   │       │   ├── EventCard (reusable)
│   │       │   ├── EventsSection (fetches from API)
│   │       │   ├── Button, Card, Dialog, etc.
│   │       │   └── Custom UI components
│   │       └── Footer (on every page)
```

### Key Components

**Layout**
- `Navbar.js` - Navigation with auth state
- `Footer.js` - Footer with links
- `ProtectedRoute.js` - Route guard with role checking

**Home Page**
- `Hero.js` - Hero section with CTA
- `Features.js` - Feature showcase with icons
- `EventsSection.js` - Latest events from API

**Event Management**
- `EventCard.js` - Individual event card
- `EventDetails.js` - Full event page with registration
- `EventsSection.js` - Event listing with API integration

**Authentication**
- `Login.js` - User login form
- `Signup.js` - User registration form
- `UserDashboard.js` - User profile and settings

**Tickets & Payments**
- `MyTickets.js` - User's tickets with PDF download
- `PaymentCheckout.js` - Stripe payment integration
- `PaymentSuccess.js` - Payment confirmation page

**Admin**
- `AdminDashboard.js` - Admin stats and management
- `AdminAddEvent.js` - Create/edit events
- `AdminAddOpportunity.js` - Create/edit opportunities

### UI Components (shadcn/ui)

Over 40 components from shadcn/ui:
- Forms: Button, Input, Select, Checkbox, Radio, Form
- Data: Table, Pagination, Card, Badge, Avatar
- Feedback: Dialog, Toast, Alert, Tooltip
- Navigation: Navbar, Menu, Sheet, Sidebar, Tabs
- And many more...

---

## 🎨 Styling & UI

### Tailwind CSS

- **Utility-first** CSS framework
- **Custom design system** with CSS variables
- **Responsive** breakpoints: sm, md, lg, xl, 2xl
- **Dark mode** support with `[class]` strategy
- **60+ custom colors** in HSL format

### Tailwind Configuration

`tailwind.config.ts` includes both TypeScript and JavaScript patterns:

```typescript
content: [
  "./pages/**/*.{ts,tsx,js,jsx}",      // ✅ Includes .js/.jsx
  "./components/**/*.{ts,tsx,js,jsx}",
  "./app/**/*.{ts,tsx,js,jsx}",
  "./src/**/*.{ts,tsx,js,jsx}"
]
```

### CSS Variables

Defined in `src/index.css`:
```css
:root {
  --background: 0 0% 100%;
  --foreground: 222 47% 11%;
  --primary: 188 94% 45%;
  --secondary: 217 97% 44%;
  /* ... 60+ more variables */
}
```

All colors use HSL for better control and accessibility.

---

## 🔄 Development Workflow

### Local Development Setup

1. **Start backend**: 
   ```bash
   cd backend && npm start
   # Runs on http://localhost:5000
   ```

2. **Start frontend**: 
   ```bash
   cd frontend && npm run dev
   # Runs on http://localhost:8080
   ```

3. **Make changes**: Files auto-reload on save (Hot Module Replacement)

4. **Check console**: 
   - Browser DevTools (F12) for frontend errors
   - Terminal for backend errors

5. **Test API**: Use Network tab in DevTools to verify API requests

### Code Organization

- **src/components/** - Reusable UI elements and components
- **src/pages/** - Full-page components (route components)
- **src/services/** - Business logic, API calls, data processing
- **src/hooks/** - Custom React hooks
- **src/context/** - Global state management (Auth)
- **src/config/** - Configuration files and constants
- **src/lib/** - Utility functions and helpers

### Common Development Tasks

**Adding a new page:**
```javascript
// 1. Create src/pages/MyPage.js
export default function MyPage() {
  return <div>My page</div>;
}

// 2. Add route in src/App.js
<Route path="/my-page" element={<MyPage />} />

// 3. Update Navbar links if needed in src/components/Navbar.js
```

**Adding API call:**
```javascript
// 1. Add endpoint to src/config/api.js
MY_ENDPOINT: `${API_BASE_URL}/my-endpoint`,

// 2. Use in component
const response = await fetch(API_ENDPOINTS.MY_ENDPOINT);
const data = await response.json();

// 3. Handle loading and error states
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);
```

**Creating reusable component:**
```javascript
// 1. Create src/components/MyComponent.js
export default function MyComponent({ prop1, prop2 }) {
  return <div>{prop1}</div>;
}

// 2. Import and use in pages
import MyComponent from "@/components/MyComponent";
<MyComponent prop1="value" />
```

---

## 📦 Deployment

### Build Process

```bash
# Create optimized production build
npm run build

# Output: ./dist directory
# Result: 2,166 modules compiled, ~750KB main bundle
```

### Deployment to Vercel (Recommended)

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy to production
vercel --prod

# Environment variables are configured in Vercel dashboard
```

### Deployment to Netlify

```bash
# Build the project
npm run build

# Deploy the ./dist folder to Netlify
# Use Netlify CLI or drag-and-drop to Netlify
```

### Deployment to Traditional Server

```bash
# 1. Build the project
npm run build

# 2. Copy ./dist to web server (e.g., /var/www/html)
cp -r dist/* /var/www/html/

# 3. Configure web server for SPA routing
# Important: All routes should fall back to index.html
```

**Nginx Configuration for SPA:**
```nginx
location / {
  try_files $uri /index.html;
}
```

**Apache Configuration for SPA:**
```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

### Production Environment Variables

```env
VITE_API_URL=https://api.yourdomain.com/api
```

---

## 🐛 Troubleshooting

### Common Issues & Solutions

**Dev server shows 404 error**
- ✅ Ensure you're in the `frontend` directory
- ✅ Run `npm run dev` (not `npx vite` directly)
- ✅ Check that port 8080 is available
- ✅ Try killing old Node processes: `taskkill /F /IM node.exe`

**Styles not loading / No CSS applied**
- ✅ Verify `tailwind.config.ts` includes `.js` and `.jsx` files
- ✅ Check that `src/index.css` is imported in `main.js`
- ✅ Restart dev server if you modified Tailwind config
- ✅ Clear browser cache (Ctrl+Shift+Del)

**API calls failing - net::ERR_CONNECTION_REFUSED**
- ✅ Start backend: `cd backend && npm start`
- ✅ Verify backend runs on http://localhost:5000
- ✅ Check `src/config/api.js` for correct base URL
- ✅ Verify network request in DevTools Network tab

**"React is not defined" errors**
- ✅ Check file has `import React from "react";` at top
- ✅ Run `node add-react-imports.js` to add missing imports
- ✅ Run `node fix-duplicate-imports.js` to fix duplicates

**Build errors during `npm run build`**
- ✅ Clear `node_modules`: `rm -rf node_modules && npm install`
- ✅ Clear Vite cache: `rm -rf .vite`
- ✅ Restart dev server after clearing cache
- ✅ Check for TypeScript errors: `npx tsc --noEmit`

**Component not rendering / Routes not working**
- ✅ Check route is added in `src/App.js`
- ✅ Verify component is imported correctly
- ✅ Check browser console for React errors
- ✅ Verify page component exports as default

**Form submission errors**
- ✅ Check network request in DevTools Network tab
- ✅ Verify API endpoint in `src/config/api.js`
- ✅ Check form validation with Zod
- ✅ Ensure auth token is sent in headers

### Debug Tips

1. **Browser Console (F12)**: Shows all frontend errors
2. **DevTools Network Tab**: Monitor API requests and responses
3. **DevTools Elements Tab**: Inspect HTML and CSS
4. **Terminal Output**: Shows build warnings and errors
5. **React DevTools Extension**: Inspect component state and props
6. **Redux DevTools**: Debug application state

### Getting Help

1. Check browser console (F12) for error messages
2. Check terminal output for build warnings
3. Verify environment variables are correctly set
4. Ensure backend is running and accessible
5. Check API endpoints in `src/config/api.js`
6. Review error logs and stack traces

---

## 📚 Additional Resources

- [React Official Docs](https://react.dev)
- [Vite Documentation](https://vitejs.dev)
- [Tailwind CSS Docs](https://tailwindcss.com)
- [shadcn/ui Components](https://ui.shadcn.com)
- [React Router Guide](https://reactrouter.com)
- [React Hook Form](https://react-hook-form.com)
- [Stripe Payment Integration](https://stripe.com/docs)
- [React Query Documentation](https://tanstack.com/query)

---

## 🤝 Contributing

1. Create feature branch: `git checkout -b feature/my-feature`
2. Make changes and test thoroughly
3. Commit changes: `git commit -m "Add my feature"`
4. Push to branch: `git push origin feature/my-feature`
5. Open pull request with description

---

## 📄 License

This project is part of the Campus Connect Hub ecosystem.

---

## 🎯 Project Status

### ✅ Completed
- Frontend: Fully developed and production-ready
- Backend: REST API running and functional
- Database: MongoDB connected and working
- Authentication: JWT implemented with role-based access
- Payment: Stripe integration operational
- Email: Notifications with QR tickets working
- Styling: Tailwind CSS fully applied
- Build: 2,166 modules compiled successfully
- React Imports: All files have proper React imports

### 📊 System Status
- Frontend: http://localhost:8080 ✅ Running
- Backend: http://localhost:5000 ✅ Running  
- MongoDB: Connected ✅ Ready
- Build: Zero errors ✅ Production ready

### 📈 Performance Metrics
- Build time: ~5 seconds
- Dev server startup: ~250ms
- Main bundle: ~750KB (minified + gzipped ~192KB)
- Total modules: 2,166
- Dev dependencies: 14 packages

---

## 👨‍💻 Development Team

**Last Updated**: December 27, 2025

**Version**: 1.0.0

**Contributors**: Campus Connect Development Team

---

## 📞 Support

For issues or questions:
1. Check the Troubleshooting section above
2. Review the Component Documentation
3. Check API Integration guide
4. Contact development team

---

**Campus Connect Hub** - Where every student stays connected! 🎓
