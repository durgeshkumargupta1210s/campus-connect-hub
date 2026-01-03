// Ticket Service - Manages event tickets with QR codes

class TicketService {
  storageKey = 'campus_connect_tickets';

  // Get all tickets
  getAllTickets() {
    try {
      const data = localStorage.getItem(this.storageKey);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error fetching tickets:', error);
      return [];
    }
  }

  // Get tickets by user
  getTicketsByUserId(userId) {
    return this.getAllTickets().filter(ticket => ticket.userId === userId);
  }

  // Get tickets by event
  getTicketsByEventId(eventId) {
    return this.getAllTickets().filter(ticket => ticket.eventId === eventId);
  }

  // Get single ticket by ID
  getTicketById(id) {
    return this.getAllTickets().find(ticket => ticket.id === id);
  }

  // Get active tickets for user
  getActiveTickets(userId) {
    return this.getTicketsByUserId(userId).filter(ticket => ticket.status === 'active');
  }

  // Create new ticket
  createTicket(data) {
    try {
      const tickets = this.getAllTickets();

      // Generate unique ID and ticket number
      const id = `ticket_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      const ticketNumber = `CCH-${data.eventId.toUpperCase().slice(0, 3)}-${tickets.length + 1001}`;
      const verificationCode = Math.random().toString(36).substring(2, 8).toUpperCase();
      const newTicket = {
        ...data,
        id,
        ticketNumber,
        verificationCode,
        issuedDate: new Date().toISOString()
      };
      tickets.push(newTicket);
      localStorage.setItem(this.storageKey, JSON.stringify(tickets));
      return {
        success: true,
        data: newTicket
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to create ticket'
      };
    }
  }

  // Update ticket status (used, cancelled)
  updateTicketStatus(id, status) {
    try {
      const tickets = this.getAllTickets();
      const ticketIndex = tickets.findIndex(t => t.id === id);
      if (ticketIndex === -1) {
        return {
          success: false,
          error: 'Ticket not found'
        };
      }
      tickets[ticketIndex].status = status;
      localStorage.setItem(this.storageKey, JSON.stringify(tickets));
      return {
        success: true
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to update ticket'
      };
    }
  }

  // Verify ticket using verification code
  verifyTicket(ticketId, verificationCode) {
    try {
      const ticket = this.getTicketById(ticketId);
      if (!ticket) {
        return {
          success: false,
          error: 'Ticket not found'
        };
      }
      if (ticket.verificationCode !== verificationCode) {
        return {
          success: false,
          error: 'Invalid verification code'
        };
      }
      if (ticket.status === 'used') {
        return {
          success: false,
          error: 'Ticket already used'
        };
      }
      if (ticket.status === 'cancelled') {
        return {
          success: false,
          error: 'Ticket has been cancelled'
        };
      }
      return {
        success: true,
        ticket
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Verification failed'
      };
    }
  }

  // Delete ticket
  deleteTicket(id) {
    try {
      const tickets = this.getAllTickets();
      const filtered = tickets.filter(t => t.id !== id);
      localStorage.setItem(this.storageKey, JSON.stringify(filtered));
      return {
        success: true
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to delete ticket'
      };
    }
  }

  // Check if user already has ticket for event
  hasTicketForEvent(userId, eventId) {
    return this.getAllTickets().some(ticket => ticket.userId === userId && ticket.eventId === eventId && ticket.status === 'active');
  }

  // Get ticket statistics for event
  getEventTicketStats(eventId) {
    const tickets = this.getTicketsByEventId(eventId);
    return {
      total: tickets.length,
      active: tickets.filter(t => t.status === 'active').length,
      used: tickets.filter(t => t.status === 'used').length,
      cancelled: tickets.filter(t => t.status === 'cancelled').length
    };
  }
}
export const ticketService = new TicketService();