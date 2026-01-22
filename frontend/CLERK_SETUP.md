# Clerk Authentication Setup

This application now uses [Clerk](https://clerk.com) for authentication.

## Setup Instructions

### 1. Create a Clerk Account

1. Go to [https://clerk.com](https://clerk.com) and sign up for a free account
2. Create a new application in the Clerk dashboard

### 2. Get Your Clerk Keys

1. In your Clerk dashboard, go to **API Keys**
2. Copy your **Publishable Key** (starts with `pk_test_` or `pk_live_`)

### 3. Configure Environment Variables

1. Open the `.env.local` file in the `frontend` directory
2. Replace `your_publishable_key_here` with your actual Clerk Publishable Key:

```env
VITE_CLERK_PUBLISHABLE_KEY=pk_test_your_actual_key_here
```

### 4. Configure User Roles (Optional)

If you want to use admin/user roles:

1. In Clerk Dashboard, go to **Users & Authentication** → **Metadata**
2. Add public metadata to users with a `role` field:
   ```json
   {
     "role": "admin"
   }
   ```
   or
   ```json
   {
     "role": "user"
   }
   ```

### 5. Customize Sign In/Up (Optional)

In the Clerk Dashboard:
- Go to **User & Authentication** → **Email, Phone, Username**
- Configure which authentication methods you want to enable
- Go to **Customization** → **Theme** to match your brand colors

## Features Enabled

✅ **Sign In / Sign Up** - Pre-built Clerk components with modal support
✅ **User Management** - Managed by Clerk Dashboard  
✅ **Profile Management** - Built-in user button with profile/settings
✅ **Protected Routes** - Automatic redirect for unauthenticated users
✅ **Role-Based Access** - Admin vs User access control
✅ **Session Management** - Automatic token refresh and session handling

## Usage

### Sign In/Sign Up
- Users can sign in/up using the buttons in the Navbar
- Clerk provides a beautiful pre-built modal UI

### Protected Routes
- All routes are wrapped with `ProtectedRoute` component
- Unauthenticated users are shown the sign-in form
- Admin routes check for `role: "admin"` in user metadata

### Accessing User Data
```javascript
import { useUser } from "@clerk/clerk-react";

function Component() {
  const { isSignedIn, user } = useUser();
  
  if (isSignedIn) {
    const userName = user.fullName;
    const userRole = user.publicMetadata?.role || 'user';
    // Use user data
  }
}
```

### Sign Out
```javascript
import { useClerk } from "@clerk/clerk-react";

function Component() {
  const { signOut } = useClerk();
  
  const handleLogout = async () => {
    await signOut();
  };
}
```

## Migrating from Custom Auth

The following components have been updated:
- ✅ `App.js` - Uses `ClerkProvider` instead of `AuthProvider`
- ✅ `Navbar.js` - Uses Clerk hooks and components
- ✅ `ProtectedRoute.js` - Uses Clerk authentication state
- ❌ `Login.js` / `Signup.js` - No longer needed (Clerk provides UI)
- ❌ `AuthContext.js` - No longer needed (Clerk manages auth state)

## Documentation

- [Clerk React Documentation](https://clerk.com/docs/quickstarts/react)
- [Clerk Components](https://clerk.com/docs/components/overview)
- [User Metadata](https://clerk.com/docs/users/metadata)
