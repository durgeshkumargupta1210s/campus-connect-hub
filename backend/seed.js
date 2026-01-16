import mongoose from 'mongoose';
import Event from './models/Event.js';
import Club from './models/Club.js';
import Opportunity from './models/Opportunity.js';
import User from './models/User.js';
import dotenv from 'dotenv';

dotenv.config();

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✓ Connected to MongoDB');

    // Clear existing data (optional - comment out if you want to preserve existing data)
    // await Event.deleteMany({});
    // await Club.deleteMany({});
    // await Opportunity.deleteMany({});
    // console.log('✓ Cleared existing collections');

    // Create or find an admin user for demo purposes
    let adminUser = await User.findOne({ email: 'admin@campusconnect.com' });
    if (!adminUser) {
      adminUser = await User.create({
        name: 'Admin User',
        email: 'admin@campusconnect.com',
        password: 'admin123', // This will be hashed by the model
        role: 'admin'
      });
      console.log('✓ Created admin user');
    }

    // Seed Events if collection is empty
    const eventCount = await Event.countDocuments();
    if (eventCount === 0) {
      const eventsData = [
        {
          title: 'Annual Hackathon 2025',
          description: 'A 48-hour coding competition where students build innovative solutions to real-world problems.',
          category: 'hackathon',
          date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
          time: '09:00 AM',
          duration: '48 hours',
          location: 'Main Campus',
          venue: 'Convention Center',
          capacity: 500,
          tags: ['coding', 'innovation', 'competition'],
          status: 'upcoming',
          imageUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500',
          createdBy: adminUser._id,
          organizer: adminUser._id,
          isPaid: true,
          price: 299,
          paymentMethods: ['credit_card', 'debit_card', 'upi', 'net_banking']
        },
        {
          title: 'Web Development Workshop',
          description: 'Learn modern web development with React, Node.js, and MongoDB from industry experts.',
          category: 'workshop',
          date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
          time: '02:00 PM',
          duration: '2 days',
          location: 'Tech Building',
          venue: 'Room 301',
          capacity: 100,
          tags: ['web', 'react', 'nodejs'],
          status: 'upcoming',
          imageUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500',
          createdBy: adminUser._id,
          organizer: adminUser._id,
          isPaid: true,
          price: 499,
          paymentMethods: ['credit_card', 'debit_card', 'upi']
        },
        {
          title: 'Machine Learning Workshop',
          description: 'Intensive 2-day workshop covering ML fundamentals, deep learning, and real-world applications.',
          category: 'workshop',
          date: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000),
          time: '10:00 AM',
          duration: '2 days',
          location: 'AI Lab',
          venue: 'Room 501',
          capacity: 80,
          tags: ['machine learning', 'python', 'ai'],
          status: 'upcoming',,
          isPaid: true,
          price: 599,
          paymentMethods: ['credit_card', 'debit_card', 'upi', 'net_banking']
          imageUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500',
          createdBy: adminUser._id,
          organizer: adminUser._id
        },
        {
          title: 'Industry Seminar: Cloud Technologies',
          description: 'Learn about AWS, Azure, and Google Cloud from industry professionals.',
          category: 'seminar',
          date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
          time: '04:00 PM',
          duration: '1.5 hours',
          location: 'Auditorium',
          venue: 'Main Auditorium',
          capacity: 300,
          tags: ['cloud', 'aws', 'azure'],
          status: 'upcoming',,
          isPaid: false,
          price: 0
          imageUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500',
          createdBy: adminUser._id,
          organizer: adminUser._id
        },
        {
          title: 'Cultural Fest 2025',
          description: 'Celebrate art, music, dance, and culture with competitions and performances.',
          category: 'cultural',
          date: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000),
          time: '09:00 AM',
          duration: '2 days',
          location: 'Main Grounds',
          venue: 'Open Air Theater',
          capacity: 1000,
          tags: ['culture', 'music', 'dance', 'art'],
          status: 'upcoming',
          imageUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500',
          createdBy: adminUser._id,
          organizer: adminUser._id,
          isPaid: false
        },
        {
          title: 'Sports Championship',
          description: 'Competitive sports event featuring cricket, badminton, football, and athletics.',
          category: 'sports',
          date: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
          time: '08:00 AM',
          duration: '3 days',
          location: 'Sports Complex',
          venue: 'Multiple Grounds',
          capacity: 500,,
          isPaid: false,
          price: 0
          tags: ['sports', 'cricket', 'badminton', 'athletics'],
          status: 'upcoming',
          imageUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500',
          createdBy: adminUser._id,
          organizer: adminUser._id
        }
      ];

      const createdEvents = await Event.insertMany(eventsData);
      console.log(`✓ Created ${createdEvents.length} sample events`);
    } else {
      console.log(`✓ Events already exist (${eventCount} events found)`);
    }

    // Seed Clubs if collection is empty
    const clubCount = await Club.countDocuments();
    if (clubCount === 0) {
      const clubsData = [
        {
          name: 'Code Warriors',
          description: 'A community for competitive programmers and algorithm enthusiasts.',
          category: 'technical',
          email: 'codewarriors@campusconnect.com',
          phone: '+91-9876543210',
          location: 'Computer Science Building',
          head: adminUser._id,
          members: [],
          memberCount: 0
        },
        {
          name: 'Entrepreneurship Club',
          description: 'For students interested in startups, business ideas, and innovation.',
          category: 'professional',
          email: 'entrepreneurship@campusconnect.com',
          phone: '+91-9876543211',
          location: 'Business Hub',
          head: adminUser._id,
          members: [],
          memberCount: 0
        },
        {
          name: 'Cultural Fest Committee',
          description: 'Organizing campus cultural events and celebrations.',
          category: 'cultural',
          email: 'cultural@campusconnect.com',
          phone: '+91-9876543212',
          location: 'Main Campus',
          head: adminUser._id,
          members: [],
          memberCount: 0
        },
        {
          name: 'Sports Club',
          description: 'For sports enthusiasts and athletes across all disciplines.',
          category: 'sports',
          email: 'sports@campusconnect.com',
          phone: '+91-9876543213',
          location: 'Sports Complex',
          head: adminUser._id,
          members: [],
          memberCount: 0
        },
        {
          name: 'AI & ML Research Group',
          description: 'Exploring artificial intelligence, machine learning, and deep learning.',
          category: 'academic',
          email: 'aiml@campusconnect.com',
          phone: '+91-9876543214',
          location: 'AI Lab',
          head: adminUser._id,
          members: [],
          memberCount: 0
        }
      ];

      const createdClubs = await Club.insertMany(clubsData);
      console.log(`✓ Created ${createdClubs.length} sample clubs`);
    } else {
      console.log(`✓ Clubs already exist (${clubCount} clubs found)`);
    }

    // Seed Opportunities if collection is empty
    const opportunityCount = await Opportunity.countDocuments();
    if (opportunityCount === 0) {
      const opportunitiesData = [
        {
          title: 'Software Intern - Summer 2025',
          description: 'Join our team for a 3-month internship focusing on full-stack development.',
          type: 'internship',
          company: 'TechCorp Solutions',
          location: 'Bangalore',
          salary: '₹15,000/month',
          deadline: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000),
          requirements: ['JavaScript', 'React', 'Node.js', 'MongoDB'],
          postedBy: adminUser._id
        },
        {
          title: 'Graduate Recruitment 2025',
          description: 'Careers in various roles - Software Engineer, Data Analyst, Product Manager',
          type: 'placement',
          company: 'InfoSystems Inc',
          location: 'Multiple',
          salary: '₹8,00,000 - ₹12,00,000 per annum',
          deadline: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
          requirements: ['Problem Solving', 'Communication', 'Technical Skills'],
          postedBy: adminUser._id
        },
        {
          title: 'Campus Drive - Consulting Firm',
          description: 'Recruitment drive by leading management consulting firm',
          type: 'campus_drive',
          company: 'McKinsey & Company',
          location: 'On Campus',
          salary: '₹12,00,000 per annum',
          deadline: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000),
          requirements: ['Analytical', 'Problem Solving', 'Communication'],
          postedBy: adminUser._id
        }
      ];

      const createdOpportunities = await Opportunity.insertMany(opportunitiesData);
      console.log(`✓ Created ${createdOpportunities.length} sample opportunities`);
    } else {
      console.log(`✓ Opportunities already exist (${opportunityCount} opportunities found)`);
    }

    console.log('\n✅ Database seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
