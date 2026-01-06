# LLM Architecture Explorer

An interactive visualization of various LLM (Large Language Model) architectures including GPT, Claude, Gemini, Llama, and more.

## Features

- Interactive architecture diagrams using React Flow
- Support for 30+ model architectures
- Visual representation of data flow and processing pipelines
- Responsive design

## Local Development

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Devisri-B/LLM-Architectures.git
cd LLM-Architectures
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The application will open at `http://localhost:3000`

## Build for Production

To create an optimized production build:
```bash
npm run build
```

This creates a `build` folder with the optimized production-ready files.

## GitHub Pages Deployment

This project is automatically deployed to GitHub Pages on every push to the `main` branch.

### Live Site
Visit: https://Devisri-B.github.io/LLM-Architectures

### Manual Deployment

If you want to manually deploy, run:
```bash
npm run deploy
```

This will build the project and push it to the `gh-pages` branch.

### First-Time Setup

1. Ensure your repository is public
2. Go to your repository Settings → Pages
3. Under "Build and deployment", select:
   - Source: **GitHub Actions**
   - This will automatically deploy whenever you push to `main`

## Project Structure

```
src/
├── architectures/        # Individual model architecture components
├── App.js               # Main app component
├── App.css              # App styling
└── index.js             # Entry point

public/
├── index.html           # HTML template
├── data.json            # Architecture data
└── images/              # Assets
```

## Technologies Used

- React 18
- React Flow (for diagrams)
- React Router (for navigation)
- React Scripts (Create React App)

## Available Scripts

- `npm start` - Start development server
- `npm build` - Create production build
- `npm test` - Run tests
- `npm run deploy` - Deploy to GitHub Pages

## License

See LICENSE file for details.
