# AI Product Advisor

An intelligent React Native application that acts as an AI-powered product advisor, helping users find the best products based on natural language descriptions of their needs.

## Architecture

The application follows a React Native architecture with context-based state management and tab navigation.

**Component Structure:**

```
App.js (Root Component)
├── Context Providers (Favorites, Alerts)
├── Tab Navigation
│   ├── WelcomeScreen (Home)
│   ├── AdvisorScreen (Search)
│   └── FavoritesScreen (Favorites)
└── ProductDetailsScreen
```

**Data Flow:**

1. User enters natural language query in search screen
2. Query sent to OpenAI with product catalog for AI processing
3. AI returns ranked products with confidence scores and reasoning
4. Users can save products to favorites across app sessions

## Approach

**Key Design Decisions:**

1. **OpenAI Structured Outputs** - Uses schema-enforced JSON responses for reliable AI integration without additional validation libraries

2. **Context-Based State Management** - React Context providers handle favorites and alerts globally across the app

3. **Prompt Engineering** - Weighted scoring (Features 50%, Use-case 30%, Price 20%) with strict anti-fabrication rules to ensure accurate recommendations

4. **Tab Navigation** - Standard mobile UX with Home, Search, and Favorites tabs plus modal product details

## File Structure

The project is organized with clear separation of concerns:

```
/ai-product-advisor
├── App.js                     # Root component with navigation setup
├── src/
│   ├── components/           # Reusable UI components
│   │   ├── DarkAlert.js     # Custom alert component
│   │   └── ProductCard.js   # Product display card
│   ├── context/             # Global state management
│   │   ├── AlertContext.js  # Alert system
│   │   └── FavoritesContext.js # Favorites management
│   ├── data/
│   │   └── catalog.js       # Product catalog (51 products)
│   ├── navigation/
│   │   └── TabNavigator.js  # Tab navigation configuration
│   ├── screens/             # App screens
│   │   ├── AdvisorScreen.js # AI search interface
│   │   ├── FavoritesScreen.js # Saved products
│   │   ├── ProductDetailsScreen.js # Product details
│   │   └── WelcomeScreen.js # Onboarding screen
│   ├── services/
│   │   └── aiService.js     # OpenAI API integration
│   └── utils/               # Helper functions and utilities
├── assets/                  # Static resources (icons, images)
└── package.json            # Project dependencies
```

**Organization Principles:**

- **Screens** contain complete page components with their own state
- **Components** are reusable UI elements used across screens
- **Context** provides global state management for favorites and alerts
- **Services** handle external API integrations (OpenAI)
- **Utils** contain pure functions for data manipulation and validation
