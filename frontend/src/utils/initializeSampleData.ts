import { opportunityService } from '@/services/opportunityService';

export const initializeSampleOpportunities = () => {
  const existingOpportunities = opportunityService.getAllOpportunities();

  // Only add sample data if there are no opportunities
  if (existingOpportunities.length === 0) {
    const sampleOpportunities = [
      {
        id: '1',
        title: 'Software Engineer Intern',
        company: 'Google',
        type: 'Internship' as const,
        location: 'Bangalore',
        ctc: '₹8 LPA',
        positions: 15,
        jobProfile: 'Software Engineer Intern',
        eligibility: 'CGPA >= 7.0, 2024 & 2025 Graduates',
        applyLink: 'https://google.com/careers',
        deadline: '2024-03-30',
        description:
          'Work with cutting-edge technologies at Google. You will be working on impactful projects that affect billions of users worldwide.',
        skills: ['Python', 'JavaScript', 'Data Structures', 'Algorithms', 'System Design', 'Git'],
        status: 'Active' as const,
        createdDate: new Date(),
        postedDate: new Date(),
        experience: '0-1 years',
        contactEmail: 'careers@google.com',
        contactPhone: '+91-XXXX-XXXX',
      },
      {
        id: '2',
        title: 'Full Stack Developer',
        company: 'Microsoft',
        type: 'Job' as const,
        location: 'Hyderabad',
        ctc: '₹12-15 LPA',
        positions: 20,
        jobProfile: 'Full Stack Developer',
        eligibility: 'CGPA >= 6.5, 2024 Graduates',
        applyLink: 'https://microsoft.com/careers',
        deadline: '2024-04-05',
        description: 'Build scalable solutions for millions of users. Join our innovative team working on cloud technologies.',
        skills: [
          'React',
          'Node.js',
          'TypeScript',
          'MongoDB',
          'AWS',
          'Docker',
          'Kubernetes',
          'REST APIs',
        ],
        status: 'Active' as const,
        createdDate: new Date(),
        postedDate: new Date(),
        experience: '1-3 years',
        contactEmail: 'careers@microsoft.com',
        contactPhone: '+91-XXXX-XXXX',
      },
      {
        id: '3',
        title: 'SDE I (Software Development Engineer)',
        company: 'Amazon',
        type: 'Job' as const,
        location: 'Mumbai',
        ctc: '₹18-22 LPA',
        positions: 10,
        jobProfile: 'SDE I',
        eligibility: 'CGPA >= 7.5, All Graduates',
        applyLink: 'https://amazon.com/careers',
        deadline: '2024-04-10',
        description:
          'Lead high-impact projects at Amazon. Work on challenges that affect millions of customers and drive innovation in cloud computing.',
        skills: [
          'Java',
          'C++',
          'Distributed Systems',
          'Microservices',
          'SQL',
          'AWS',
          'Leadership',
          'Problem Solving',
        ],
        status: 'Active' as const,
        createdDate: new Date(),
        postedDate: new Date(),
        experience: '2-5 years',
        contactEmail: 'careers@amazon.com',
        contactPhone: '+91-XXXX-XXXX',
      },
    ];

    // Add each sample opportunity
    sampleOpportunities.forEach((opp) => {
      opportunityService.addOpportunity({
        title: opp.title,
        company: opp.company,
        type: opp.type,
        location: opp.location,
        ctc: opp.ctc,
        positions: opp.positions,
        jobProfile: opp.jobProfile,
        eligibility: opp.eligibility,
        applyLink: opp.applyLink,
        deadline: opp.deadline,
        description: opp.description,
        skills: opp.skills,
        status: opp.status,
        experience: opp.experience,
        contactEmail: opp.contactEmail,
        contactPhone: opp.contactPhone,
        tags: [opp.company, opp.type],
      });
    });

    console.log('✅ Sample opportunities initialized');
  }
};
