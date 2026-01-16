# CampusConnect - Complete Setup & Troubleshooting Guide

## Issue Fixed ✅

**Problem:** Events, clubs, and opportunities were not visible on the Events/Community pages.

**Root Cause:** The database was empty - no sample data was seeded when the project was cloned.

**Solution:** Created an automated seeding script that populates the database with sample data.

---

## Quick Start

### 1. Backend Setup
```bash
cd backend
npm install
npm run seed      # Seed database with sample data
npm run dev       # Start backend server
```

### 2. Frontend Setup (New Terminal)
```bash
cd frontend
npm install
npm run dev       # Start frontend development server
```

### 3. Access the Application
- **Frontend:** http://localhost:8080
- **Backend API:** http://localhost:5000/api
- **Health Check:** http://localhost:5000/api/health

---

## What's Available After Seeding

### Events (6 Total)
- ✅ Annual Hackathon 2025
- ✅ Web Development Workshop
- ✅ Machine Learning Workshop
- ✅ Industry Seminar: Cloud Technologies
- ✅ Cultural Fest 2025
- ✅ Sports Championship

### Clubs (5 Total)
- ✅ Code Warriors (Technical)
- ✅ Entrepreneurship Club (Professional)
- ✅ Cultural Fest Committee (Cultural)
- ✅ Sports Club (Sports)
- ✅ AI & ML Research Group (Academic)

### Opportunities (3 Total)
- ✅ Software Intern - Summer 2025
- ✅ Graduate Recruitment 2025
- ✅ Campus Drive - Consulting Firm

---

## Common Issues & Solutions

### ❌ Events Not Showing

**Symptoms:** Events page loads but shows no events

**Solution:**
```bash
# 1. Navigate to backend folder
cd backend

# 2. Run the seed script
npm run seed

# 3. Wait for success message: "✅ Database seeding completed successfully!"

# 4. Refresh frontend in browser (Ctrl+R or Cmd+R)
```

### ❌ "Cannot connect to MongoDB"

**Symptoms:** Backend won't start, shows MongoDB connection error

**Solution:**
- Ensure MongoDB is running:
  ```bash
  # Windows
  mongod
  
  # or if MongoDB is installed as service, it should run automatically
  ```
- Check `.env` file has correct MONGODB_URI
- Default local connection: `mongodb://localhost:27017/campus-connect`

### ❌ Frontend showing empty data even after seeding

**Solution:**
- Hard refresh browser: `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)
- Clear localStorage: Open DevTools → Application → LocalStorage → Clear All
- Check browser console for API errors

### ❌ Club "View Details" button not working

**Solution:**
The ClubDetail page was recently created. Ensure:
- Backend server is running
- Frontend is restarted after latest changes
- Check browser console for errors

---

## File Changes Made

### New Files Created:
1. **`backend/seed.js`** - Database seeding script
2. **`backend/SEEDING_GUIDE.md`** - Seeding documentation
3. **`frontend/src/pages/ClubDetail.jsx`** - Club details page (added functionality to View Details button)

### Modified Files:
1. **`backend/package.json`** - Added `seed` script
2. **`Community.jsx`** - Already had View Details button, now it works with the new ClubDetail page

---

## How Seeding Works

The `seed.js` script:
1. Connects to MongoDB
2. Checks if data already exists
3. Creates sample data if collections are empty
4. Avoids duplicate entries (safe to run multiple times)
5. Reports what was created or already exists

**Run seed script:**
```bash
npm run seed
```

**Output Example:**
```
✓ Connected to MongoDB
✓ Created 6 sample events
✓ Clubs already exist (2 clubs found)
✓ Created 3 sample opportunities
✅ Database seeding completed successfully!
```

---

## API Endpoints Available

### Events
- `GET /api/events` - List all events
- `GET /api/events/:id` - Get event details
- `POST /api/events` - Create event (admin)
- `PUT /api/events/:id` - Update event (admin)
- `DELETE /api/events/:id` - Delete event (admin)

### Clubs
- `GET /api/clubs` - List all clubs
- `GET /api/clubs/:id` - Get club details
- `POST /api/clubs` - Create club (authenticated)
- `POST /api/clubs/:id/join` - Join club (authenticated)
- `POST /api/clubs/:id/leave` - Leave club (authenticated)

### Opportunities
- `GET /api/opportunities` - List all opportunities
- `GET /api/opportunities/:id` - Get opportunity details

---

## Features Added/Fixed

### 1. Club Details Page (ClubDetail.jsx)
- View complete club information
- See all club members
- Join/Leave club functionality
- Contact information with clickable links
- Member count and statistics
- Share club link feature
- Responsive design

### 2. Database Seeding
- Automatic population of sample events
- Automatic population of sample clubs
- Automatic population of sample opportunities
- Safe to run multiple times
- No duplicate entries

---

## Testing After Setup

### 1. Test Events
- Navigate to http://localhost:8080/events
- Should see 6 sample events displayed
- Click on an event to view details

### 2. Test Clubs
- Navigate to http://localhost:8080/community
- Should see 5 sample clubs displayed
- Click "View Details" button
- Test Join/Leave functionality

### 3. Test API Directly
```bash
# Health check
curl http://localhost:5000/api/health

# Get all events
curl http://localhost:5000/api/events

# Get all clubs
curl http://localhost:5000/api/clubs
```

---

## Next Steps

If you cloned this project and data wasn't showing:

1. ✅ Run `npm run seed` in backend folder
2. ✅ Refresh the frontend application
3. ✅ All events, clubs, and opportunities should now be visible

If you encounter any other issues:
- Check browser console for errors
- Check backend server logs
- Ensure MongoDB is running
- Verify `.env` file configuration

---

## Additional Notes

- Sample data is for development/testing purposes only
- You can modify `seed.js` to customize sample data
- Run `npm run seed` again if you want to add more sample data
- Existing data won't be deleted when seeding (prevents data loss)

**For detailed seeding instructions, see: `backend/SEEDING_GUIDE.md`**
