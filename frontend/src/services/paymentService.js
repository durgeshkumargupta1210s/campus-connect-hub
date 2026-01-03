const PAYMENTS_KEY = 'campus_connect_payments';
export const paymentService = {
  initialize: () => {
    if (!localStorage.getItem(PAYMENTS_KEY)) {
      localStorage.setItem(PAYMENTS_KEY, JSON.stringify([]));
    }
  },
  getAllPayments: () => {
    paymentService.initialize();
    const data = localStorage.getItem(PAYMENTS_KEY);
    return data ? JSON.parse(data) : [];
  },
  getPaymentsByEventId: eventId => {
    const payments = paymentService.getAllPayments();
    return payments.filter(p => p.eventId === eventId);
  },
  getPaymentsByUserId: userId => {
    const payments = paymentService.getAllPayments();
    return payments.filter(p => p.userId === userId);
  },
  getPaymentById: id => {
    const payments = paymentService.getAllPayments();
    return payments.find(p => p.id === id) || null;
  },
  createPayment: paymentData => {
    const payments = paymentService.getAllPayments();
    const newPayment = {
      ...paymentData,
      id: `pay-${Date.now()}`,
      paymentDate: new Date().toISOString(),
      status: 'pending',
      transactionId: `TXN-${Date.now()}`
    };
    payments.push(newPayment);
    localStorage.setItem(PAYMENTS_KEY, JSON.stringify(payments));
    return newPayment;
  },
  updatePaymentStatus: (id, status, transactionId) => {
    const payments = paymentService.getAllPayments();
    const payment = payments.find(p => p.id === id);
    if (!payment) return null;
    payment.status = status;
    if (transactionId) payment.transactionId = transactionId;
    localStorage.setItem(PAYMENTS_KEY, JSON.stringify(payments));
    return payment;
  },
  getEventRevenue: eventId => {
    const payments = paymentService.getPaymentsByEventId(eventId);
    return payments.filter(p => p.status === 'completed').reduce((total, p) => total + p.amount, 0);
  },
  getCompletedPayments: () => {
    const payments = paymentService.getAllPayments();
    return payments.filter(p => p.status === 'completed');
  },
  deletePayment: id => {
    const payments = paymentService.getAllPayments();
    const filtered = payments.filter(p => p.id !== id);
    if (filtered.length === payments.length) return false;
    localStorage.setItem(PAYMENTS_KEY, JSON.stringify(filtered));
    return true;
  }
};