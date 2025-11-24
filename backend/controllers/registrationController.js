import Registration from '../models/Registration.js';
import Event from '../models/Event.js';
import User from '../models/User.js';

export const registerEvent = async (req, res) => {
  try {
    const { eventId } = req.body;

    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    // Check if already registered
    const existing = await Registration.findOne({ event: eventId, user: req.user._id });
    if (existing) {
      return res.status(400).json({ message: 'Already registered' });
    }

    const registration = await Registration.create({
      event: eventId,
      user: req.user._id
    });

    event.registrations.push(registration._id);
    event.registeredCount = event.registrations.length;
    await event.save();

    // Add to user's registrations
    await User.findByIdAndUpdate(req.user._id, {
      $push: { registeredEvents: registration._id }
    });

    res.status(201).json({
      message: 'Registered successfully',
      registration
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getRegistrations = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const registrations = await Registration.find({ user: req.user._id })
      .populate('event')
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ registeredAt: -1 })
      .exec();

    const count = await Registration.countDocuments({ user: req.user._id });

    res.json({
      registrations,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      total: count
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const cancelRegistration = async (req, res) => {
  try {
    const registration = await Registration.findByIdAndUpdate(
      req.params.id,
      { status: 'cancelled' },
      { new: true }
    );

    if (!registration) {
      return res.status(404).json({ message: 'Registration not found' });
    }

    res.json({ message: 'Registration cancelled', registration });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
