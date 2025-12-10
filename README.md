# React Native Assessment App

A comprehensive React Native application featuring authentication, product management, and push notifications with Redux Toolkit, RTK Query, and Firebase Cloud Messaging.

## 🚀 Installation & Setup

```bash
# Install dependencies
yarn install

# iOS setup
yarn pods
yarn ios

# Android setup
yarn android
```

## 🔐 Login Credentials

Test users from DummyJSON API:

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
       ├─ Click Product
       │
       ▼
┌─────────────┐
│  Product    │
│   Detail    │
└─────────────┘
```

## 🗂️ Project Structure

```
src/
├── components/              # Reusable UI components
│   ├── Button.tsx
│   ├── Input.tsx
│   └── ProductCard.tsx
│
├── constants/              # App constants
│   ├── colors.ts
│   └── strings.ts
│
├── hooks/                  # Custom React hooks
│   └── useFcm.ts          # FCM token hook
│
├── navigation/             # Navigation setup
│   └── AppNavigator.tsx
│
├── screens/               # Screen components
│   ├── SplashScreen.tsx
│   ├── LoginScreen.tsx
│   ├── FeedScreen.tsx
│   └── ProductDetailScreen.tsx
│
├── services/              # External services
│   └── firebaseNotificationHandler.ts  # FCM setup
│
├── store/                 # Redux store
│   ├── services/          # RTK Query APIs
│   │   ├── baseApi.ts     # Base API configuration
│   │   ├── authApi.ts     # Authentication endpoints
│   │   └── productsApi.ts # Products endpoints
│   ├── slices/           # Redux slices
│   │   ├── authSlice.ts  # Auth state management
│   │   └── fcmSlice.ts   # FCM token management
│   ├── hooks.ts          # Typed Redux hooks
│   └── store.ts          # Store configuration
│
├── types/                # TypeScript definitions
│   └── navigation.ts
│
└── utils/                # Utility functions
    └── validation.ts
```

## 🔑 Key Features

### 🔐 Authentication System
- JWT-based authentication with DummyJSON API
- Persistent login state with Redux Persist
- Secure token storage

### 📊 State Management
- **Redux Toolkit** for efficient state management
- **RTK Query** for API data fetching and caching
- **Redux Persist** for data persistence
- Type-safe Redux hooks

### 🔔 Push Notifications
- **Firebase Cloud Messaging** integration
- Foreground and background notification handling
- FCM token management in Redux store
- Cross-platform notification support

### 🛒 Product Management
- Product listing with pagination
- Product detail views
- API-driven product data
- Optimized data fetching with RTK Query

### 🎨 UI/UX
- Clean, modern interface
- Responsive design
- Loading states and error handling
- Smooth navigation with React Navigation

## 🏗️ Architecture

### Redux Store Structure
```
store/
├── services/
│   ├── baseApi.ts      # RTK Query base configuration
│   ├── authApi.ts      # Authentication endpoints
│   └── productsApi.ts  # Product management endpoints
├── slices/
│   ├── authSlice.ts    # User authentication state
│   └── fcmSlice.ts     # FCM token management
└── store.ts            # Store configuration with persistence
```

### API Integration
- **Base API**: Centralized RTK Query configuration
- **Auth API**: Login/logout endpoints with token management
- **Products API**: Product listing and details
- **Automatic token injection** for authenticated requests


## �️ Developmeont Scripts

```bash
# Start Metro bundler
yarn start

# Run on iOS
yarn ios

# Run on Android  
yarn android

# Install iOS dependencies
yarn pods

# Lint code
yarn lint

# Run tests
yarn test
```

## 🐛 Troubleshooting

### Metro bundler issues
```bash
yarn start --reset-cache
```

### iOS build issues
```bash
cd ios && pod install && cd ..
yarn ios
```

### Android build issues
```bash
cd android && ./gradlew clean && cd ..
yarn android
```

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
   yarn android
   ```

2. Test push notifications:
   - Open Firebase Console → Your Project → Cloud Messaging
   - Click "Send your first message"
   - Enter notification title and text
   - Select your app as target
   - Get FCM token from app logs or Redux store
   - Send the test notification

### 5. Verify Setup
- Check device logs for FCM token
- Ensure notifications appear when app is in foreground/background
- Test notification tap actions

## 🚀 Getting Started

1. **Clone and Install**
   ```bash
   git clone <repository-url>
   cd ReactNativeAssessment
   yarn install
   ```

2. **iOS Setup**
   ```bash
   yarn pods
   yarn ios
   ```

3. **Android Setup**
   ```bash
   yarn android
   ```

4. **Configure Firebase** (Optional - for push notifications)
   - Follow the Firebase Cloud Messaging setup above
   - Add `google-services.json` to `android/app/`
   - Rebuild the app

5. **Test the App**
   - Login with provided test credentials
   - Browse products and view details
   - Test push notifications (if Firebase configured)


## 📄 License

This project is for assessment purposes.

---

**Happy Coding! 🚀**
