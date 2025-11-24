import Event from '../models/Event.js';
import Registration from '../models/Registration.js';

export const createEvent = async (req, res) => {
  try {
    const { title, description, category, date, time, duration, location, venue, imageUrl, capacity, organizer, tags } = req.body;

    const event = await Event.create({
      title,
      description,
      category,
      date,
      time,
      duration,
      location,
      venue,
      imageUrl,
      capacity,
      organizer,
      tags,
      createdBy: req.user._id
    });

    res.status(201).json({
      message: 'Event created successfully',
      event
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getEvents = async (req, res) => {
  try {
    const { category, status, page = 1, limit = 10 } = req.query;
    
    let filter = {};
    if (category) filter.category = category;
    if (status) filter.status = status;

    const events = await Event.find(filter)
      .populate('organizer')
      .populate('createdBy')
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ date: -1 })
      .exec();

    const count = await Event.countDocuments(filter);

    res.json({
      events,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      total: count
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id)
      .populate('organizer')
      .populate('registrations');

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    res.json(event);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedAt: Date.now() },
      { new: true, runValidators: true }
    );

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    res.json({
      message: 'Event updated successfully',
      event
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    // Delete all registrations for this event
    await Registration.deleteMany({ event: req.params.id });

    res.json({ message: 'Event deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getUpcomingEvents = async (req, res) => {
  try {
    const events = await Event.find({
      status: 'upcoming',
      date: { $gte: new Date() }
    })
      .populate('organizer')
      .sort({ date: 1 })
      .limit(10);

    res.json(events);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
