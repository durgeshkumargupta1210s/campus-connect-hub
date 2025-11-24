import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { ArrowLeft, CheckCircle, AlertCircle, CreditCard, Smartphone, Landmark, Loader2 } from 'lucide-react';
import { eventService } from '@/services/eventService';
import { usePayments } from '@/hooks/usePayments';
import { useTickets } from '@/hooks/useTickets';
import { useAuth } from '@/context/AuthContext';
import { registrationService } from '@/services/registrationService';
import { emailService } from '@/services/emailService';

const PaymentCheckout = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const { userEmail, userName } = useAuth();
  const { createPayment } = usePayments();
  const { createTicket } = useTickets();

  const [event, setEvent] = useState(() => 
    eventId ? eventService.getEventById(eventId) : undefined
  );

  const [formData, setFormData] = useState({
    fullName: userName || '',
    email: userEmail || '',
    phone: ''
  });

  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  if (!event || !event.isPaid) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 bg-background">
          <div className="container mx-auto py-12 px-4 text-center">
            <h1 className="text-2xl font-bold text-foreground mb-4">Event Not Found</h1>
            <Button onClick={() => navigate(-1)} className="bg-primary hover:bg-primary/90">
              Go Back
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage(null);

    // Validation
    if (!formData.fullName || !formData.email || !formData.phone) {
      setMessage({ type: 'error', text: 'Please fill all fields' });
      setIsSubmitting(false);
      return;
    }

    if (!selectedPaymentMethod) {
      setMessage({ type: 'error', text: 'Please select a payment method' });
      setIsSubmitting(false);
      return;
    }

    if (!event.paymentMethods?.includes(selectedPaymentMethod)) {
      setMessage({ type: 'error', text: 'Selected payment method is not available for this event' });
      setIsSubmitting(false);
      return;
    }

    try {
      // Create payment record
      const paymentResult = createPayment({
        eventId: event.id,
        eventTitle: event.title,
        userId: formData.email,
        userEmail: formData.email,
        userName: formData.fullName,
        amount: event.price || 0,
        currency: 'INR',
        paymentMethod: selectedPaymentMethod,
        status: 'completed' // Simulated payment - auto-complete for now
      });

      if (!paymentResult.success || !paymentResult.data) {
        setMessage({ type: 'error', text: paymentResult.error || 'Payment failed' });
        setIsSubmitting(false);
        return;
      }

      // Create registration record
      registrationService.initialize();
      const registrationResult = registrationService.addRegistration({
        eventId: event.id,
        eventTitle: event.title,
        eventCategory: event.category || 'Other',
        userName: formData.fullName,
        userEmail: formData.email,
        userPhone: formData.phone,
        registrationDate: new Date().toISOString(),
        status: 'registered',
        paymentId: paymentResult.data.id,
        paymentStatus: 'completed'
      });

      // Create ticket
      const ticketResult = await createTicket(
        event.id,
        event.title,
        event.date,
        event.location || 'TBD',
        formData.email,
        formData.email,
        formData.fullName,
        `reg_${Date.now()}`,
        paymentResult.data.id,
        undefined, // QR code will be generated on ticket page
        event.time,
        undefined,
        'General'
      );

      if (!ticketResult.success) {
        console.warn('Ticket creation failed:', ticketResult.error);
        // Continue anyway - payment succeeded
      }

      // Send confirmation email
      if (ticketResult.data) {
        await emailService.sendTicketConfirmationEmail(
          formData.email,
          formData.fullName,
          event.title,
          event.date || 'TBD',
          event.location || 'TBD',
          ticketResult.data.ticketNumber,
          ticketResult.data.verificationCode
        );
      }

      // Send registration confirmation email
      await emailService.sendRegistrationConfirmation(
        formData.email,
        formData.fullName,
        event.title,
        event.date || 'TBD'
      );

      setMessage({
        type: 'success',
        text: `✓ Payment of ₹${event.price} successful! Check your email for confirmation...`
      });

      // Redirect to confirmation page after 2 seconds
      setTimeout(() => {
        navigate(`/event/${eventId}/payment-success`, { 
          state: { 
            transactionId: paymentResult.data?.id,
            eventId,
            eventTitle: event.title,
            amount: event.price,
            paymentMethod: selectedPaymentMethod,
            ticketId: ticketResult.data?.id,
            ticketNumber: ticketResult.data?.ticketNumber
          }
        });
      }, 2000);
    } catch (err) {
      setMessage({ 
        type: 'error', 
        text: err instanceof Error ? err.message : 'Payment processing failed'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const getPaymentMethodIcon = (method: string) => {
    switch (method) {
      case 'card':
        return <CreditCard className="w-5 h-5" />;
      case 'upi':
        return <Smartphone className="w-5 h-5" />;
      case 'netbanking':
        return <Landmark className="w-5 h-5" />;
      default:
        return null;
    }
  };

  const getPaymentMethodLabel = (method: string) => {
    switch (method) {
      case 'card':
        return 'Credit/Debit Card';
      case 'upi':
        return 'UPI (Google Pay, PhonePe)';
      case 'netbanking':
        return 'Net Banking';
      default:
        return method;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 bg-background">
        {/* Header */}
        <div className="bg-gradient-hero py-8 px-4 border-b border-white/10">
          <div className="container mx-auto">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-white hover:text-white/80 transition-colors mb-6"
            >
              <ArrowLeft className="w-5 h-5" />
              Back
            </button>

            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
                Complete Your Payment
              </h1>
              <p className="text-white/80 text-lg">Secure payment for {event.title}</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="container mx-auto py-12 px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card className="bg-white dark:bg-slate-900 border-border sticky top-20">
                <CardHeader>
                  <CardTitle className="text-foreground">Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Event</p>
                    <p className="font-semibold text-foreground">{event.title}</p>
                  </div>

                  <div className="border-t border-border pt-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-foreground">Event Fee</span>
                      <span className="font-semibold text-foreground">₹{event.price}</span>
                    </div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-foreground">Processing Fee</span>
                      <span className="font-semibold text-foreground">₹0</span>
                    </div>
                    <div className="flex justify-between items-center border-t border-border pt-2">
                      <span className="font-semibold text-foreground">Total Amount</span>
                      <span className="text-2xl font-bold text-accent">₹{event.price}</span>
                    </div>
                  </div>

                  {event.paymentDeadline && (
                    <div className="p-3 bg-accent/10 rounded-lg border border-accent/20">
                      <p className="text-xs text-muted-foreground mb-1">Payment Deadline</p>
                      <p className="font-semibold text-foreground text-sm">
                        {new Date(event.paymentDeadline).toLocaleDateString('en-IN', { 
                          weekday: 'short', 
                          year: 'numeric', 
                          month: 'short', 
                          day: 'numeric' 
                        })}
                      </p>
                    </div>
                  )}

                  <div className="p-3 bg-green-500/10 rounded-lg border border-green-500/20 flex gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs text-green-600 dark:text-green-400 font-semibold">Secure Payment</p>
                      <p className="text-xs text-green-600/80 dark:text-green-400/80">Your payment is encrypted and secure</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Payment Form */}
            <div className="lg:col-span-2">
              <Card className="bg-white dark:bg-slate-900 border-border">
                <CardHeader>
                  <CardTitle className="text-foreground">Payment Details</CardTitle>
                  <CardDescription>Enter your information to complete the payment</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handlePaymentSubmit} className="space-y-6">
                    {/* Personal Information Section */}
                    <div className="space-y-4">
                      <h3 className="font-semibold text-foreground text-lg">Personal Information</h3>

                      <div>
                        <Label className="text-foreground font-semibold mb-2 block">Full Name *</Label>
                        <Input
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleInputChange}
                          placeholder="Your name"
                          className="bg-background border-border"
                          required
                          disabled={isSubmitting}
                        />
                      </div>

                      <div>
                        <Label className="text-foreground font-semibold mb-2 block">Email Address *</Label>
                        <Input
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="your@email.com"
                          className="bg-background border-border"
                          required
                          disabled={isSubmitting}
                        />
                      </div>

                      <div>
                        <Label className="text-foreground font-semibold mb-2 block">Phone Number *</Label>
                        <Input
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="+91 XXXXX XXXXX"
                          className="bg-background border-border"
                          required
                          disabled={isSubmitting}
                        />
                      </div>
                    </div>

                    {/* Payment Method Section */}
                    <div className="space-y-4 border-t border-border pt-6">
                      <h3 className="font-semibold text-foreground text-lg">Payment Method</h3>

                      {event.paymentMethods && event.paymentMethods.length > 0 ? (
                        <RadioGroup value={selectedPaymentMethod} onValueChange={setSelectedPaymentMethod}>
                          {event.paymentMethods.map(method => (
                            <div 
                              key={method} 
                              className="flex items-center space-x-3 p-4 border border-border rounded-lg hover:border-accent/50 cursor-pointer transition-all"
                              onClick={() => setSelectedPaymentMethod(method)}
                            >
                              <RadioGroupItem value={method} id={method} />
                              <Label htmlFor={method} className="flex-1 cursor-pointer flex items-center gap-3">
                                <div className="text-foreground/60">
                                  {getPaymentMethodIcon(method)}
                                </div>
                                <div>
                                  <p className="font-semibold text-foreground">{getPaymentMethodLabel(method)}</p>
                                  <p className="text-xs text-muted-foreground">
                                    {method === 'card' && 'Visa, Mastercard, American Express'}
                                    {method === 'upi' && 'Instant transfer from your bank account'}
                                    {method === 'netbanking' && 'Direct transfer from your bank'}
                                  </p>
                                </div>
                              </Label>
                            </div>
                          ))}
                        </RadioGroup>
                      ) : (
                        <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-600 dark:text-red-400">
                          <p className="text-sm font-semibold">No payment methods available</p>
                        </div>
                      )}
                    </div>

                    {/* Message */}
                    {message && (
                      <div className={`flex items-center gap-2 p-3 rounded-lg ${
                        message.type === 'success'
                          ? 'bg-green-500/20 text-green-300 border border-green-500/30'
                          : 'bg-red-500/20 text-red-300 border border-red-500/30'
                      }`}>
                        {message.type === 'success' ? (
                          <CheckCircle className="w-5 h-5 flex-shrink-0" />
                        ) : (
                          <AlertCircle className="w-5 h-5 flex-shrink-0" />
                        )}
                        <span className="text-sm">{message.text}</span>
                      </div>
                    )}

                    {/* Submit Button */}
                    <Button
                      type="submit"
                      disabled={isSubmitting || !selectedPaymentMethod}
                      className="w-full bg-gradient-accent hover:opacity-90 text-white h-12 text-base"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Processing Payment...
                        </>
                      ) : (
                        <>
                          <CreditCard className="w-4 h-4 mr-2" />
                          Pay ₹{event.price}
                        </>
                      )}
                    </Button>

                    <p className="text-xs text-muted-foreground text-center">
                      By clicking "Pay", you agree to our payment terms. Your payment is 100% secure.
                    </p>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PaymentCheckout;
