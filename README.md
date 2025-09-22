# E-Commerce Fashion Store

A modern, responsive product listing page for fashion products built with Next.js, TypeScript, and Tailwind CSS.

**Live demo:** https://your-app.vercel.app  
**Repo:** https://github.com/<your-username>/<repo-name>

---

## Features

- 🛍️ **Product Catalog**: Browse sneakers, bags, and belts from mock dataset (24+ items)  
- 🔍 **Filtering**: Filter by brand, category, color, price range  
- 🎨 **Color Selection**: Visual swatches with product background update  
- 🔄 **Real-time Filtering**: Instant updates without page reload  
- 🎯 **Sorting & Pagination**: Sort by name, price, popularity; paginated results  
- 🔥 **Hot Deals**: Badge for trending/discounted products  
- ⭐ **Ratings**: Star rating with count  
- 📱 **Responsive Design**: Desktop, tablet, and mobile layouts  
- 🎛️ **Sidebar / Drawer**: Expand/collapse filters, drawer mode on mobile  
- ♿ **Accessibility**: Alt text for images, keyboard nav, ARIA attributes  

---

## Tech Stack

- **Framework**: Next.js 14, React, TypeScript  
- **Styling**: Tailwind CSS  
- **Icons**: Lucide React  
- **State**: React hooks & Context API  
- **Data**: Client-side mock dataset  

---

## Getting Started

### Prerequisites
- Node.js 16.14+  
- npm, yarn, or pnpm  

### Installation
```bash
git clone https://github.com/<your-username>/<repo-name>.git
cd e-comm
npm install


### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```

2. Navigate to the project directory:
   ```bash
   cd e-comm
   ```

3. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

### Development

Start the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

### Building for Production

```bash
npm run build
# or
yarn build
# or
pnpm build
```

### Running Production Build

```bash
npm start
# or
yarn start
# or
pnpm start
```

## Project Structure

```
.
├── app/                 # Next.js app router pages
├── components/          # React components
│   ├── ui-tailwind/     # Reusable UI components
│   └── ...              # Page-specific components
├── contexts/            # React context providers
├── lib/                 # Utilities and data
├── public/              # Static assets
└── ...
```

## Key Components

### Product Filtering
- **Sidebar**: Persistent filter panel on desktop
- **MobileSidebar**: Overlay filter panel for mobile devices
- **Filter Types**: Brand, color, price range, category

### Product Display
- **ProductGrid**: Responsive grid layout for products
- **ProductCard**: Individual product display with image, price, and rating
- **ProductListing**: Main product listing page with sorting and pagination

### Navigation
- **Navbar**: Desktop navigation bar
- **MobileNavbar**: Mobile-specific navigation
- **Footer**: Site footer with links

## Available Scripts

- `dev`: Runs the app in development mode
- `build`: Builds the app for production
- `start`: Runs the built app in production mode
- `lint`: Runs ESLint to check for code issues

## Browser Support

- Latest Chrome, Firefox, Safari, Edge
- Mobile browsers (iOS Safari, Chrome for Android)

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a pull request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Product data sourced from mock data for demonstration purposes
- Icons provided by Lucide React