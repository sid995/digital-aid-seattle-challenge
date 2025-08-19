# 🐾 Paws & Hearts Animal Shelter - Donation Management System

A modern, user-friendly web application built with React and TypeScript to help animal shelters efficiently manage and track their donations. This system provides comprehensive donation tracking, advanced filtering, search capabilities, and data export functionality.

![React](https://img.shields.io/badge/React-19.1.1-blue.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-blue.svg)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4.1.12-blue.svg)
![Vite](https://img.shields.io/badge/Vite-7.1.2-blue.svg)

## 📸 Features Overview

### Core Functionalities

- ✅ **Donation Input Form** - Add new donations with validation
- ✅ **Donation Management** - Edit and delete existing donations
- ✅ **Type Filtering** - Filter by donation types (money, food, clothing, etc.)
- ✅ **Search & Advanced Filtering** - Powerful search and filtering capabilities
- ✅ **Data Export** - Export filtered data to CSV format

### 🔍 Advanced Search & Filtering

- **Real-time Search** - Search by donor name or donation type
- **Date Range Filtering** - Filter donations between specific dates
- **Amount Range Filtering** - Filter by minimum and maximum amounts
- **Multi-column Sorting** - Sort by date, amount, donor name, or type
- **Visual Filter Indicators** - See active filters at a glance
- **Responsive Design** - Works seamlessly on desktop and mobile

### 📊 Analytics & Reporting

- **Total Money Donated** - Track monetary contributions
- **Total Donations Count** - Monitor donation volume
- **Monthly Statistics** - View current month's donations
- **Filtered Summaries** - Get insights on specific donation types
- **Export Capabilities** - Download data for external analysis

## 🏗️ Project Structure

The application follows a modular architecture with clear separation of concerns:

```bash
src/
├── components/           # Reusable UI components
│   ├── DonationForm.tsx     # Modal form for adding/editing donations
│   ├── DonationList.tsx     # Table displaying donations with actions
│   ├── StatsDashboard.tsx   # Statistics cards dashboard
│   ├── FilterControls.tsx   # Search bar and basic filters
│   ├── AdvancedFilters.tsx  # Advanced filtering panel
│   ├── FilterSummary.tsx    # Summary for filtered results
│   └── SearchBar.tsx        # Search input component
├── hooks/                # Custom React hooks
│   └── useDonations.ts      # Main donation management logic
├── types/                # TypeScript type definitions
│   └── donation.ts          # All interfaces and types
├── utils/                # Utility functions
│   ├── donationUtils.ts     # Helper functions for donations
│   └── exportUtils.ts       # CSV export functionality
├── constants/            # Application constants
│   └── donationTypes.ts     # Donation types and sample data
├── App.tsx               # Main application component
├── main.tsx             # Application entry point
└── App.css              # Global styles
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** (version 18 or higher)
- **npm** or **pnpm** (pnpm recommended)

### Installation & Setup

1. **Clone the repository**

   ```bash
   git clone https://github.com/sid995/digital-aid-seattle-challenge DigitalAidSeattle
   cd DigitalAidSeattle
   ```

2. **Install dependencies**

   ```bash
   # Using pnpm (recommended)
   pnpm install
   
   # Or using npm
   npm install
   ```

3. **Start the development server**

   ```bash
   # Using pnpm
   pnpm dev
   
   # Or using npm
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to view the application.

### Available Scripts

- **`pnpm dev`** - Start development server with hot reload
- **`pnpm build`** - Build the application for production
- **`pnpm preview`** - Preview the production build locally
- **`pnpm lint`** - Run ESLint to check code quality

## 💻 Usage Guide

### Adding Donations

1. Click the **"Add New Donation"** button
2. Fill in the donation details:
   - **Donor Name** (required)
   - **Donation Type** (money, food, clothing, toys, medical, other)
   - **Amount/Quantity** (required)
   - **Date** (required)
3. Click **"Add Donation"** to save

### Managing Donations

- **Edit**: Click the edit icon (✏️) in any donation row
- **Delete**: Click the delete icon (🗑️) and confirm deletion
- **Search**: Use the search bar to find donations by donor name or type
- **Filter**: Use the dropdown to filter by donation type

### Advanced Filtering

1. Click **"Advanced Filters"** to expand the panel
2. Set any combination of filters:
   - **Date Range**: Filter between specific dates
   - **Amount Range**: Set minimum and maximum amounts
   - **Sorting**: Click sort buttons to change order
3. **Export**: Click "Export CSV" to download filtered data
4. **Clear**: Use "Clear Advanced Filters" to reset

### Data Export

- Click the **"Export CSV"** button in the Advanced Filters panel
- The system will download a CSV file with the currently filtered donations
- File includes: Date, Donor Name, Donation Type, and Amount/Quantity

## 🛠️ Technology Stack

### Frontend Framework

- **React 19.1.1** - Modern React with latest features
- **TypeScript 5.8.3** - Type-safe JavaScript development
- **Vite 7.1.2** - Fast build tool and development server

### UI & Styling

- **Tailwind CSS 4.1.12** - Utility-first CSS framework
- **Lucide React** - Beautiful, customizable icons
- **Responsive Design** - Mobile-first approach

### Development Tools

- **ESLint** - Code linting and quality checks
- **TypeScript ESLint** - TypeScript-specific linting rules
- **Vite Plugin React** - React integration for Vite

## 🎯 Key Features Deep Dive

### 1. **Donation Types Supported**

- 💰 **Money** - Monetary donations with currency formatting
- 🥫 **Pet Food** - Food donations with quantity tracking
- 👕 **Clothing/Bedding** - Textile donations for animal comfort
- 🎾 **Pet Toys** - Toys and enrichment items
- 💊 **Medical Supplies** - Veterinary supplies and medications
- 📦 **Other** - Miscellaneous donation items

### 2. **Form Validation**

- Required field validation
- Positive number validation for amounts
- Date validation (no future dates)
- Real-time error clearing
- User-friendly error messages

### 3. **Search & Filter Capabilities**

- **Text Search**: Instant search across donor names and types
- **Type Filter**: Quick filter by donation category
- **Date Range**: Filter donations within specific time periods
- **Amount Range**: Find donations within value ranges
- **Sorting**: Multi-column sorting with direction indicators
- **Combined Filters**: Use multiple filters simultaneously

### 4. **Statistics Dashboard**

- **Total Money Donated**: Sum of all monetary contributions
- **Total Donations**: Count of all donation entries
- **Monthly Donations**: Current month's donation count
- **Real-time Updates**: Statistics update as donations are added/removed

### 5. **Data Management**

- **CRUD Operations**: Create, Read, Update, Delete donations
- **Sample Data**: Includes sample donations for testing
- **Data Persistence**: Uses React state
- **CSV Export**: Export filtered data for external analysis

## 🔧 Customization

### Adding New Donation Types

1. Open `src/constants/donationTypes.ts`
2. Add new type to the `DONATION_TYPES` array:

   ```typescript
   { value: "newtype", label: "New Type", icon: "🆕" }
   ```

3. Update the `DonationType` union in `src/types/donation.ts`

### Modifying Form Fields

1. Update the `FormData` interface in `src/types/donation.ts`
2. Modify the form component in `src/components/DonationForm.tsx`
3. Update validation logic in `src/utils/donationUtils.ts`

### Styling Customization

- Tailwind classes can be modified throughout components
- Global styles are in `src/App.css`
- Color scheme can be adjusted in Tailwind configuration

## 🚦 Performance Considerations

- **Memoized Filtering**: Uses `useMemo` for efficient filtering and sorting
- **Component Optimization**: Components are optimized to prevent unnecessary re-renders
- **Lazy Loading**: Components are loaded on-demand
- **Efficient State Management**: Uses custom hooks for state organization

## 🧪 Testing the Application

### Sample Data

The application includes sample donations for testing:

- Sarah Johnson - $500 money donation
- Mike Chen - 20 items pet food donation  
- Emily Davis - 5 items clothing donation

### Test Scenarios

1. **Add Donation**: Try adding various types of donations
2. **Edit Donation**: Modify existing donations
3. **Search**: Search for "Sarah" or "food"
4. **Filter**: Filter by different donation types
5. **Advanced Filters**: Set date ranges and amount limits
6. **Export**: Export filtered data to CSV
7. **Responsive**: Test on different screen sizes

## 📈 Future Enhancements

Potential features for future development:

- **Data Persistence**: LocalStorage or database integration
- **User Authentication**: Multi-user support with roles
- **Email Notifications**: Automated thank-you emails
- **Inventory Management**: Track stock levels for physical items
- **Charts & Graphs**: Visual analytics with chart libraries
- **Print Receipts**: Generate donation receipts
- **Bulk Operations**: Import/export multiple donations
- **Advanced Reporting**: Custom report generation

## 🤝 Contributing

This project was developed as a coding assessment for Digital Aid Seattle. The codebase is well-organized and documented to facilitate easy understanding and potential extensions.

### Code Quality

- **TypeScript**: Full type safety throughout the application
- **ESLint**: Consistent code formatting and quality
- **Component Architecture**: Reusable, well-documented components
- **Custom Hooks**: Logical separation of concerns
- **Utility Functions**: Helper functions for common operations

## 📝 License

This project is developed for educational and assessment purposes.

---

### Made with ❤️ for animal shelters and their furry friends! 🐾

*This donation management system helps shelters track their donations efficiently, ensuring every contribution is properly recorded and acknowledged.*
