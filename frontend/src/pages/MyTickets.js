import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, Ticket, Calendar, MapPin, Copy, Download, AlertCircle } from 'lucide-react';
import { useTickets } from '@/hooks/useTickets';
import { useUser } from '@clerk/clerk-react';
import React from "react";
const MyTickets = () => {
  const navigate = useNavigate();
  const { isSignedIn, user } = useUser();
  const userEmail = user?.primaryEmailAddress?.emailAddress || '';
  const {
    getMyTickets,
    updateTicketStatus
  } = useTickets();
  const [filterStatus, setFilterStatus] = useState('all');
  const [copiedTicketId, setCopiedTicketId] = useState('');
  const userTickets = userEmail ? getMyTickets(userEmail) : [];
  const filteredTickets = userTickets.filter(ticket => {
    if (filterStatus === 'all') return true;
    return ticket.status === filterStatus;
  });
  const handleCopyCode = (code, ticketId) => {
    navigator.clipboard.writeText(code);
    setCopiedTicketId(ticketId);
    setTimeout(() => setCopiedTicketId(''), 2000);
  };
  const downloadTicketPDF = async ticketId => {
    try {
      // Dynamically import CommonJS modules to avoid ESM issues
      const html2canvas = (await import('html2canvas')).default;
      const jsPDF = (await import('jspdf')).jsPDF;
      const ticketElement = document.getElementById(`ticket-${ticketId}`);
      if (!ticketElement) return;
      const canvas = await html2canvas(ticketElement, {
        backgroundColor: '#ffffff',
        scale: 2
      });
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });
      const imgData = canvas.toDataURL('image/png');
      const imgWidth = 210;
      const imgHeight = canvas.height * imgWidth / canvas.width;
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      pdf.save(`ticket-${ticketId}.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };
  const getStatusColor = status => {
    switch (status) {
      case 'active':
        return 'bg-green-500/20 text-green-600 dark:text-green-400';
      case 'used':
        return 'bg-blue-500/20 text-blue-600 dark:text-blue-400';
      case 'cancelled':
        return 'bg-red-500/20 text-red-600 dark:text-red-400';
      default:
        return 'bg-gray-500/20 text-gray-600 dark:text-gray-400';
    }
  };
  const getStatusIcon = status => {
    switch (status) {
      case 'active':
        return '✓';
      case 'used':
        return '✓';
      case 'cancelled':
        return '✕';
      default:
        return '•';
    }
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "min-h-screen flex flex-col"
  }, /*#__PURE__*/React.createElement(Navbar, null), /*#__PURE__*/React.createElement("main", {
    className: "flex-1 bg-background"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bg-gradient-hero py-8 px-4 border-b border-white/10"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container mx-auto"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => navigate(-1),
    className: "flex items-center gap-2 text-white hover:text-white/80 transition-colors mb-6"
  }, /*#__PURE__*/React.createElement(ArrowLeft, {
    className: "w-5 h-5"
  }), "Back"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", {
    className: "text-4xl md:text-5xl font-bold text-white mb-2"
  }, "My Event Tickets"), /*#__PURE__*/React.createElement("p", {
    className: "text-white/80 text-lg"
  }, "View and manage your event tickets")))), /*#__PURE__*/React.createElement("div", {
    className: "container mx-auto py-12 px-4"
  }, userTickets.length > 0 ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "mb-8"
  }, /*#__PURE__*/React.createElement(Tabs, {
    value: filterStatus,
    onValueChange: value => setFilterStatus(value),
    className: "w-full"
  }, /*#__PURE__*/React.createElement(TabsList, {
    className: "grid w-full grid-cols-4"
  }, /*#__PURE__*/React.createElement(TabsTrigger, {
    value: "all"
  }, "All (", userTickets.length, ")"), /*#__PURE__*/React.createElement(TabsTrigger, {
    value: "active"
  }, "Active (", userTickets.filter(t => t.status === 'active').length, ")"), /*#__PURE__*/React.createElement(TabsTrigger, {
    value: "used"
  }, "Used (", userTickets.filter(t => t.status === 'used').length, ")"), /*#__PURE__*/React.createElement(TabsTrigger, {
    value: "cancelled"
  }, "Cancelled (", userTickets.filter(t => t.status === 'cancelled').length, ")")))), /*#__PURE__*/React.createElement("div", {
    className: "space-y-6"
  }, filteredTickets.map(ticket => /*#__PURE__*/React.createElement(Card, {
    key: ticket.id,
    className: "bg-white dark:bg-slate-900 border-border overflow-hidden",
    id: `ticket-${ticket.id}`
  }, /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 md:grid-cols-3 gap-6 p-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "md:col-span-2 space-y-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-start justify-between"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", {
    className: "text-2xl font-bold text-foreground"
  }, ticket.eventTitle), /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-muted-foreground mt-1"
  }, "Ticket: ", /*#__PURE__*/React.createElement("span", {
    className: "font-mono font-semibold text-foreground"
  }, ticket.ticketNumber))), /*#__PURE__*/React.createElement(Badge, {
    className: getStatusColor(ticket.status)
  }, /*#__PURE__*/React.createElement("span", {
    className: "mr-1"
  }, getStatusIcon(ticket.status)), ticket.status.charAt(0).toUpperCase() + ticket.status.slice(1))), /*#__PURE__*/React.createElement("div", {
    className: "space-y-3 pt-4 border-t border-border"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-3"
  }, /*#__PURE__*/React.createElement(Calendar, {
    className: "w-4 h-4 text-primary"
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-muted-foreground"
  }, "Date & Time"), /*#__PURE__*/React.createElement("p", {
    className: "font-semibold text-foreground"
  }, ticket.eventDate, ticket.eventStartTime && ` at ${ticket.eventStartTime}`))), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-3"
  }, /*#__PURE__*/React.createElement(MapPin, {
    className: "w-4 h-4 text-accent"
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-muted-foreground"
  }, "Location"), /*#__PURE__*/React.createElement("p", {
    className: "font-semibold text-foreground"
  }, ticket.eventLocation))), ticket.seat && /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-3"
  }, /*#__PURE__*/React.createElement(Ticket, {
    className: "w-4 h-4 text-primary"
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-muted-foreground"
  }, "Seat"), /*#__PURE__*/React.createElement("p", {
    className: "font-semibold text-foreground"
  }, ticket.seat))), ticket.tier && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-muted-foreground"
  }, "Ticket Tier"), /*#__PURE__*/React.createElement(Badge, {
    variant: "outline"
  }, ticket.tier)), /*#__PURE__*/React.createElement("div", {
    className: "mt-4 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-muted-foreground mb-2"
  }, "Verification Code"), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between"
  }, /*#__PURE__*/React.createElement("p", {
    className: "font-mono text-lg font-bold text-foreground"
  }, ticket.verificationCode), /*#__PURE__*/React.createElement(Button, {
    size: "sm",
    variant: "outline",
    onClick: () => handleCopyCode(ticket.verificationCode, ticket.id),
    className: "gap-1"
  }, /*#__PURE__*/React.createElement(Copy, {
    className: "w-3 h-3"
  }), copiedTicketId === ticket.id ? 'Copied!' : 'Copy')), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-muted-foreground mt-2"
  }, "Show this code at entry for quick verification")))), /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col items-center justify-center p-4 bg-secondary/50 rounded-lg"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-muted-foreground mb-3 text-center"
  }, "Scan for Entry"), /*#__PURE__*/React.createElement(QRCodeDisplay, {
    value: `${ticket.id}|${ticket.verificationCode}`,
    size: 180
  }), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-muted-foreground text-center mt-4"
  }, "Scan this QR code at the venue entrance for quick entry"))), /*#__PURE__*/React.createElement("div", {
    className: "border-t border-border bg-secondary/30 px-6 py-4 flex gap-3 flex-wrap"
  }, /*#__PURE__*/React.createElement(Button, {
    onClick: () => downloadTicketPDF(ticket.id),
    variant: "outline",
    className: "gap-2"
  }, /*#__PURE__*/React.createElement(Download, {
    className: "w-4 h-4"
  }), "Download PDF"), ticket.status === 'active' && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Button, {
    onClick: () => {
      if (confirm('Mark this ticket as used?')) {
        updateTicketStatus(ticket.id, 'used');
      }
    },
    variant: "outline",
    className: "gap-2"
  }, "\u2713 Mark as Used"), /*#__PURE__*/React.createElement(Button, {
    onClick: () => {
      if (confirm('Cancel this ticket?')) {
        updateTicketStatus(ticket.id, 'cancelled');
      }
    },
    variant: "outline",
    className: "gap-2 text-red-600 dark:text-red-400"
  }, "\u2715 Cancel Ticket")), /*#__PURE__*/React.createElement(Button, {
    onClick: () => navigate(`/events/${ticket.eventId}`),
    variant: "outline",
    className: "gap-2 ml-auto"
  }, "View Event")), ticket.status === 'used' && /*#__PURE__*/React.createElement("div", {
    className: "bg-blue-500/10 border-t border-blue-500/20 px-6 py-3"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-blue-600 dark:text-blue-400"
  }, "\u2713 This ticket was used on ", new Date(ticket.issuedDate).toLocaleDateString('en-IN'))), ticket.status === 'cancelled' && /*#__PURE__*/React.createElement("div", {
    className: "bg-red-500/10 border-t border-red-500/20 px-6 py-3"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-red-600 dark:text-red-400"
  }, "\u2715 This ticket has been cancelled"))))), filteredTickets.length === 0 && /*#__PURE__*/React.createElement(Card, {
    className: "bg-white dark:bg-slate-900 border-border"
  }, /*#__PURE__*/React.createElement(CardContent, {
    className: "py-12 text-center"
  }, /*#__PURE__*/React.createElement(AlertCircle, {
    className: "w-12 h-12 text-muted-foreground mx-auto mb-3 opacity-50"
  }), /*#__PURE__*/React.createElement("p", {
    className: "text-muted-foreground text-lg"
  }, "No ", filterStatus !== 'all' ? filterStatus : '', " tickets found")))) : /*#__PURE__*/React.createElement(Card, {
    className: "bg-white dark:bg-slate-900 border-border"
  }, /*#__PURE__*/React.createElement(CardContent, {
    className: "py-12"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-center"
  }, /*#__PURE__*/React.createElement(Ticket, {
    className: "w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50"
  }), /*#__PURE__*/React.createElement("h2", {
    className: "text-2xl font-bold text-foreground mb-2"
  }, "No Tickets Yet"), /*#__PURE__*/React.createElement("p", {
    className: "text-muted-foreground mb-6"
  }, "You haven't purchased any event tickets yet."), /*#__PURE__*/React.createElement(Button, {
    onClick: () => navigate('/events'),
    className: "bg-gradient-accent hover:opacity-90 text-white"
  }, "Browse Events")))), userTickets.length > 0 && /*#__PURE__*/React.createElement(Card, {
    className: "bg-blue-500/10 border-blue-500/20 mt-8"
  }, /*#__PURE__*/React.createElement(CardHeader, null, /*#__PURE__*/React.createElement(CardTitle, {
    className: "text-foreground"
  }, "\uD83C\uDFAB How to Use Your Ticket")), /*#__PURE__*/React.createElement(CardContent, {
    className: "space-y-3 text-sm text-foreground/80"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex gap-3"
  }, /*#__PURE__*/React.createElement("span", {
    className: "font-bold text-primary"
  }, "1"), /*#__PURE__*/React.createElement("span", null, "Save or print this page or download the PDF")), /*#__PURE__*/React.createElement("div", {
    className: "flex gap-3"
  }, /*#__PURE__*/React.createElement("span", {
    className: "font-bold text-primary"
  }, "2"), /*#__PURE__*/React.createElement("span", null, "Arrive at the venue 15 minutes before the event start time")), /*#__PURE__*/React.createElement("div", {
    className: "flex gap-3"
  }, /*#__PURE__*/React.createElement("span", {
    className: "font-bold text-primary"
  }, "3"), /*#__PURE__*/React.createElement("span", null, "Show the QR code or verification code to entry staff")), /*#__PURE__*/React.createElement("div", {
    className: "flex gap-3"
  }, /*#__PURE__*/React.createElement("span", {
    className: "font-bold text-primary"
  }, "4"), /*#__PURE__*/React.createElement("span", null, "They will scan your code and mark your entry")))))), /*#__PURE__*/React.createElement(Footer, null));
};

// Simple QR Code Display Component using Canvas

const QRCodeDisplay = ({
  value,
  size
}) => {
  const [dataUrl, setDataUrl] = useState('');
  React.useEffect(() => {
    // Create a simple encoded QR placeholder with data
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      // Fill white background
      ctx.fillStyle = 'white';
      ctx.fillRect(0, 0, size, size);

      // Create a simple pattern representing the QR data
      const hash = value.split('').reduce((acc, char) => (acc << 5) - acc + char.charCodeAt(0), 0);
      ctx.fillStyle = 'black';
      const moduleSize = Math.ceil(size / 21);
      for (let i = 0; i < 21; i++) {
        for (let j = 0; j < 21; j++) {
          const bit = hash >> i + j & 1;
          if (bit || i < 7 && j < 7 || i < 7 && j >= 14 || i >= 14 && j < 7) {
            ctx.fillRect(j * moduleSize, i * moduleSize, moduleSize, moduleSize);
          }
        }
      }
      const dataUrlString = canvas.toDataURL('image/png');
      setDataUrl(dataUrlString);
    }
  }, [value, size]);
  return /*#__PURE__*/React.createElement("div", {
    className: "bg-white p-3 rounded-lg"
  }, dataUrl ? /*#__PURE__*/React.createElement("img", {
    src: dataUrl,
    alt: "QR Code",
    width: size,
    height: size,
    className: "pixelated"
  }) : /*#__PURE__*/React.createElement("div", {
    className: "bg-gray-100 rounded animate-pulse",
    style: {
      width: `${size}px`,
      height: `${size}px`
    }
  }));
};
export default MyTickets;