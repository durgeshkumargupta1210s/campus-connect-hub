# Database Seeding Guide

This guide explains how to seed the CampusConnect database with sample data.

## Why Seeding?

When you first clone the project, the database is empty. Seeding populates it with sample events, clubs, and opportunities for testing and development.

## How to Seed

### Option 1: Using npm script (Recommended)
```bash
cd backend
npm run seed
```

### Option 2: Direct node command
```bash
cd backend
node seed.js
```

## What Gets Seeded?

The seed script populates:

1. **Admin User**
   - Email: `admin@campusconnect.com`
   - Password: `admin123`
   - Role: `admin`

2. **Sample Events** (6 events)
   - Annual Hackathon 2025
   - Web Development Workshop
   - Machine Learning Workshop
   - Industry Seminar: Cloud Technologies
   - Cultural Fest 2025
   - Sports Championship

3. **Sample Clubs** (5 clubs)
   - Code Warriors (Technical)
   - Entrepreneurship Club (Professional)
   - Cultural Fest Committee (Cultural)
   - Sports Club (Sports)
   - AI & ML Research Group (Academic)

4. **Sample Opportunities** (3 opportunities)
   - Software Intern - Summer 2025
   - Graduate Recruitment 2025
   - Campus Drive - Consulting Firm

## Important Notes

- ✅ **Safe to run multiple times**: The script checks for existing data and won't create duplicates
- ✅ **Preserves existing data**: Existing events, clubs, and opportunities are not deleted
- ⚠️ **Database required**: MongoDB must be running and connection string must be in `.env`

## Troubleshooting

### "MongoDB connection failed"
- Ensure MongoDB is running
- Check `MONGODB_URI` in `.env` file
- Verify the connection string is correct

### "Admin user not created"
- This is normal if the user already exists
- The script will reuse existing admin user

### Script exits unexpectedly
- Check the error message in the console
- Ensure all required fields are present in the seed data
- Check MongoDB logs for connection issues

## After Seeding

Once seeded, you can:
1. Start the backend: `npm run dev`
2. Start the frontend: `npm run dev` (from frontend folder)
3. Visit http://localhost:8080 to see the sample data

## Modifying Seed Data

Edit `seed.js` to customize:
- Event details (title, description, date, etc.)
- Club information
- Opportunity data
- Number of sample records

Then run the seed script again:
```bash
npm run seed
```

Note: Existing records won't be duplicated, but you'll need to manually delete existing records if you want to completely refresh the data.

## Manual Deletion

To delete all seeded data and start fresh:

```bash
# Use MongoDB client to delete collections
db.events.deleteMany({})
db.clubs.deleteMany({})
db.opportunities.deleteMany({})

# Then run seed again
npm run seed
```
