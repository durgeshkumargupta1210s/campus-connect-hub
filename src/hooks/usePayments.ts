import { useState, useCallback } from 'react';
import { paymentService, Payment } from '@/services/paymentService';

export const usePayments = () => {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadPayments = useCallback(() => {
    try {
      paymentService.initialize();
      const allPayments = paymentService.getAllPayments();
      setPayments(allPayments);
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Failed to load payments';
      setError(errorMsg);
    }
  }, []);

  const getPaymentsByEventId = useCallback((eventId: string) => {
    return paymentService.getPaymentsByEventId(eventId);
  }, []);

  const getPaymentsByUserId = useCallback((userId: string) => {
    return paymentService.getPaymentsByUserId(userId);
  }, []);

  const createPayment = useCallback((paymentData: Omit<Payment, 'id' | 'paymentDate' | 'status' | 'transactionId'>) => {
    try {
      setError(null);
      setLoading(true);
      const newPayment = paymentService.createPayment(paymentData);
      setPayments(prev => [...prev, newPayment]);
      return { success: true, data: newPayment };
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Failed to create payment';
      setError(errorMsg);
      return { success: false, error: errorMsg };
    } finally {
      setLoading(false);
    }
  }, []);

  const updatePaymentStatus = useCallback((id: string, status: 'pending' | 'completed' | 'failed', transactionId?: string) => {
    try {
      setError(null);
      const updated = paymentService.updatePaymentStatus(id, status, transactionId);
      if (updated) {
        setPayments(prev => prev.map(p => p.id === id ? updated : p));
        return { success: true, data: updated };
      }
      return { success: false, error: 'Payment not found' };
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Failed to update payment';
      setError(errorMsg);
      return { success: false, error: errorMsg };
    }
  }, []);

  const getEventRevenue = useCallback((eventId: string) => {
    return paymentService.getEventRevenue(eventId);
  }, []);

  const getCompletedPayments = useCallback(() => {
    return paymentService.getCompletedPayments();
  }, []);

  const deletePayment = useCallback((id: string) => {
    try {
      setError(null);
      const deleted = paymentService.deletePayment(id);
      if (deleted) {
        setPayments(prev => prev.filter(p => p.id !== id));
        return { success: true };
      }
      return { success: false, error: 'Payment not found' };
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Failed to delete payment';
      setError(errorMsg);
      return { success: false, error: errorMsg };
    }
  }, []);

  return {
    payments,
    loading,
    error,
    loadPayments,
    getPaymentsByEventId,
    getPaymentsByUserId,
    createPayment,
    updatePaymentStatus,
    getEventRevenue,
    getCompletedPayments,
    deletePayment,
  };
};
