# Quick Start Guide

## 🚀 Run the App

```bash
# Install dependencies (if not done)
npm install

# iOS
npm run pods
npm run ios

# Android
npm run android
```

## 🔐 Login Credentials

Try these test users from DummyJSON:

| Username | Password | Name |
|----------|----------|------|
| emilys | emilyspass | Emily Johnson |
| michaelw | michaelwpass | Michael Williams |
| sophiab | sophiabpass | Sophia Brown |

More users: https://dummyjson.com/users

## 📱 App Flow

```
┌─────────────┐
│   Splash    │ (3 seconds)
│   Screen    │
└──────┬──────┘
       │
       ├─ isAuthenticated? ─┐
       │                    │
    ✅ Yes               ❌ No
       │                    │
       ▼                    ▼
┌─────────────┐      ┌─────────────┐
│    Feed     │      │    Login    │
│   Screen    │◄─────│   Screen    │
└──────┬──────┘      └─────────────┘
       │
       ├─ Click Post
       │
       ▼
┌─────────────┐
│ Post Detail │
│   Screen    │
└─────────────┘
```

## 🗂️ Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Button.tsx
│   ├── Input.tsx
│   └── PostCard.tsx
│
├── constants/          # App constants
│   ├── colors.ts
│   └── strings.ts
│
├── data/              # Dummy data
│   └── dummyData.ts
│
├── navigation/        # Navigation setup
│   └── AppNavigator.tsx
│
├── screens/           # Screen components
│   ├── SplashScreen.tsx
│   ├── LoginScreen.tsx
│   ├── FeedScreen.tsx
│   └── PostDetailScreen.tsx
│
├── store/             # Redux store
│   ├── services/
│   │   └── authApi.ts      # API endpoints
│   ├── slices/
│   │   └── authSlice.ts    # Auth state
│   ├── hooks.ts            # Typed hooks
│   └── store.ts            # Store config
│
├── types/             # TypeScript types
│   └── navigation.ts
│
└── utils/             # Utility functions
    └── validation.ts
```

## 🔑 Key Files

### App.tsx
Entry point with Redux Provider and PersistGate

### src/store/store.ts
Redux store configuration with persist

### src/store/services/authApi.ts
RTK Query API definitions

### src/store/slices/authSlice.ts
Auth state management

### src/screens/LoginScreen.tsx
Login with API integration

### src/screens/FeedScreen.tsx
Feed with user info and logout

## 💡 Usage Examples

### Access User Data
```typescript
import { useAppSelector } from '../store/hooks';

const { user, token, isAuthenticated } = useAppSelector(state => state.auth);
```

### Call Login API
```typescript
import { useLoginMutation } from '../store/services/authApi';

const [login, { isLoading }] = useLoginMutation();
const result = await login({ username, password }).unwrap();
```

### Logout
```typescript
import { useAppDispatch } from '../store/hooks';
import { logout } from '../store/slices/authSlice';

const dispatch = useAppDispatch();
dispatch(logout());
```

## 🐛 Troubleshooting

### Metro bundler issues
```bash
npm start -- --reset-cache
```

### iOS build issues
```bash
cd ios && pod install && cd ..
npm run ios
```

### Android build issues
```bash
cd android && ./gradlew clean && cd ..
npm run android
```

## 📚 Documentation

- [REDUX_SETUP.md](./REDUX_SETUP.md) - Detailed Redux guide
- [IMPLEMENTATION_SUMMARY.md](./IMPLEMENTATION_SUMMARY.md) - What's implemented
- [src/README.md](./src/README.md) - Original project structure
- [src/store/README.md](./src/store/README.md) - Redux quick reference

## ✅ Checklist

- [x] Redux Toolkit installed
- [x] RTK Query configured
- [x] Redux Persist setup
- [x] Login API integrated
- [x] Token storage working
- [x] Auto-login implemented
- [x] Logout functionality
- [x] User data displayed
- [x] TypeScript types defined
- [x] No compilation errors

## 🔔 Firebase Cloud Messaging Setup

### 1. Create Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project" or "Add project"
3. Enter your project name and follow the setup steps

### 2. Add Android App
1. In your Firebase project, click "Add app" and select Android
2. Enter your Android package name (bundle identifier)
   - Find it in `android/app/build.gradle` under `applicationId`
   - Example: `com.yourcompany.yourapp`
3. Download the `google-services.json` file

### 3. Configure Android App
1. Copy the downloaded `google-services.json` file
2. Paste it in your project's `android/app/` directory
3. The file structure should look like:
   ```
   android/
   └── app/
       ├── google-services.json  ← Place here
       ├── build.gradle
       └── src/
   ```

### 4. Rebuild and Test
1. Clean and rebuild your Android app:
   ```bash
   cd android && ./gradlew clean && cd ..
   npm run android
   ```

2. Test push notifications:
   - Open Firebase Console → Your Project → Cloud Messaging
   - Click "Send your first message"
   - Enter notification title and text
   - Select your app as target
   - Paste the FCM Token get from console.log or from store in your app.
   - Send the test notification

### 5. Verify Setup
- Check device logs for FCM token
- Ensure notifications appear when app is in foreground/background
- Test notification tap actions

## 🎉 You're Ready!

Run the app and test the complete authentication flow with Redux state management and push notifications!
