import Payment from '../models/Payment.js';
import { v4 as uuidv4 } from 'uuid';

export const createPayment = async (req, res) => {
  try {
    const { amount, paymentMethod, description, relatedTo, relatedId } = req.body;

    const payment = await Payment.create({
      user: req.user._id,
      transactionId: `TXN-${uuidv4()}`,
      amount,
      paymentMethod,
      description,
      relatedTo,
      relatedId,
      status: 'pending'
    });

    res.status(201).json({
      message: 'Payment initiated',
      payment
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getPayments = async (req, res) => {
  try {
    const { status, page = 1, limit = 10 } = req.query;
    
    let filter = { user: req.user._id };
    if (status) filter.status = status;

    const payments = await Payment.find(filter)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 })
      .exec();

    const count = await Payment.countDocuments(filter);

    res.json({
      payments,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      total: count
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getPaymentById = async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id);

    if (!payment) {
      return res.status(404).json({ message: 'Payment not found' });
    }

    res.json(payment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const completePayment = async (req, res) => {
  try {
    const { transactionId } = req.body;

    const payment = await Payment.findByIdAndUpdate(
      req.params.id,
      {
        status: 'completed',
        paidAt: Date.now(),
        'gateway.gatewayTransactionId': transactionId
      },
      { new: true }
    );

    if (!payment) {
      return res.status(404).json({ message: 'Payment not found' });
    }

    res.json({
      message: 'Payment completed successfully',
      payment
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const refundPayment = async (req, res) => {
  try {
    const payment = await Payment.findByIdAndUpdate(
      req.params.id,
      {
        status: 'refunded',
        refundedAt: Date.now()
      },
      { new: true }
    );

    if (!payment) {
      return res.status(404).json({ message: 'Payment not found' });
    }

    res.json({
      message: 'Payment refunded successfully',
      payment
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
