# Quick Reference - Bugs Fixed & Development Guide

## 🐛 Bugs Fixed (3 Total)

### Bug #1: Email URL
```
FILE: src/services/emailService.js:191
OLD:  href="http://localhost:5173/my-tickets"
NEW:  href="${typeof window !== 'undefined' ? window.location.origin : 'https://campusconnecthub.com'}/my-tickets"
IMPACT: Email links now work in production
```

### Bug #2: API Endpoint
```
FILE: src/components/EventsSection.js:14
OLD:  fetch('http://localhost:5000/api/events', {...})
NEW:  fetch(API_ENDPOINTS.EVENTS_LIST, {...})
      import { API_ENDPOINTS } from "@/config/api";
IMPACT: Uses centralized API configuration
```

### Bug #3: Env Variable
```
FILE: backend/.env
ADDED: FRONTEND_URL=http://localhost:8080
IMPACT: Email templates use correct frontend URL
```

---

## 🚀 Quick Start

### Start Backend
```bash
cd backend
npm install  # if needed
npm start    # runs on port 5000
```

### Start Frontend
```bash
cd frontend
npm install  # if needed
npm run dev  # runs on port 8080
```

### Production Build
```bash
cd frontend
npm run build
# Output: dist/ folder ready for deployment
```

---

## 🔗 Important URLs

| Service | URL | Status |
|---------|-----|--------|
| Frontend | http://localhost:8080 | ✅ Running |
| Backend API | http://localhost:5000 | ✅ Running |
| Health Check | http://localhost:5000/api/health | ✅ OK |

---

## 🔑 Environment Variables

### Frontend (.env or .env.local)
```env
VITE_API_URL=http://localhost:5000/api
```

### Backend (.env)
```env
MONGODB_URI=mongodb://localhost:27017/campus-connect
PORT=5000
NODE_ENV=development
JWT_SECRET=your_jwt_secret_key_change_in_production_12345
FRONTEND_URL=http://localhost:8080
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
```

---

## 📁 Key Files Modified

```
campus-connect-hub/
├── frontend/
│   └── src/
│       ├── services/emailService.js          ✅ FIXED
│       └── components/EventsSection.js       ✅ FIXED
├── backend/
│   └── .env                                   ✅ FIXED
├── AUDIT_SUMMARY.md                          📄 NEW
└── BUG_AUDIT_REPORT.md                       📄 NEW
```

---

## 🧪 Testing the Fixes

### Test 1: Email Service
```javascript
// In browser console (after logged in)
import { emailService } from '@/services/emailService'
// Verify email links use correct origin
```

### Test 2: Event Loading
```javascript
// Verify API requests use centralized config
// Open DevTools → Network tab
// Load Events page → Check requests to /api/events
```

### Test 3: Environment Variables
```bash
# Backend
echo $env:FRONTEND_URL  # Should print http://localhost:8080

# Frontend (in code)
console.log(import.meta.env.VITE_API_URL)  // Should print config value
```

---

## 📚 Related Documentation

- [BUG_AUDIT_REPORT.md](./BUG_AUDIT_REPORT.md) - Detailed audit report
- [AUDIT_SUMMARY.md](./AUDIT_SUMMARY.md) - Audit summary
- [backend/README.md](./backend/README.md) - Backend setup
- [backend/.env](./backend/.env) - Environment template

---

## ⚡ Common Tasks

### Change API URL
```javascript
// File: frontend/src/config/api.js
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
// Or set VITE_API_URL environment variable
```

### Change Frontend URL
```bash
# File: backend/.env
FRONTEND_URL=https://yourdomain.com
```

### Change Database
```bash
# File: backend/.env
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/campus-connect
```

---

## 🚨 Troubleshooting

### "Cannot find module" errors
```bash
# Frontend
cd frontend && npm install

# Backend
cd backend && npm install
```

### API connection fails
- Check if backend is running: `curl http://localhost:5000/api/health`
- Verify FRONTEND_URL in backend/.env
- Check VITE_API_URL in frontend environment

### Email links broken
- Check FRONTEND_URL in backend/.env
- Verify email service is using environment variable

### Build fails
```bash
# Clear and rebuild
cd frontend
rm -rf node_modules
npm install
npm run build
```

---

## 📞 Support

For detailed information, see:
- [BUG_AUDIT_REPORT.md](./BUG_AUDIT_REPORT.md) - Full technical details
- Backend logging - Check console output
- Frontend DevTools - Network and Console tabs

---

**Last Updated**: December 2024  
**All Systems**: ✅ Operational
