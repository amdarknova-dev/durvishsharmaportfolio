# Durvish Sharma — Creative Developer Portfolio ✦

A high-performance, immersive portfolio website built to showcase creative frontend development, 3D web experiences, and modern UI/UX design.

![Portfolio Preview](./public/preview.png)

## ⚡ Tech Stack

This portfolio is built with bleeding-edge web technologies prioritizing performance and fluid animations:

- **Framework**: [React 18](https://reactjs.org/) + [Vite](https://vitejs.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/) & [GSAP](https://gsap.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Forms**: [EmailJS](https://www.emailjs.com/)

## ✨ Key Features

- **Fluid Animations**: Smooth page transitions, magnetic buttons, and scroll-triggered reveals powered by Framer Motion and GSAP.
- **Modern UI/UX**: Premium aesthetic featuring glassmorphism, dynamic glowing gradients, and custom marquee strips.
- **Fully Responsive**: Carefully crafted to look exceptional on all devices, from ultra-wide monitors to mobile phones.
- **Interactive Contact Form**: A gamified, fully functional contact form integrated with EmailJS for real-time inquiries.
- **Performance Optimized**: Built with Vite for instant server start and lightning-fast HMR.

## 🚀 Local Development Setup

To run this project locally, follow these steps:

### 1. Clone the repository
```bash
git clone https://github.com/amdarknova-dev/cinematic_portfolio.git
cd cinematic_portfolio
```

### 2. Install dependencies
Ensure you have Node.js installed, then run:
```bash
npm install
```

### 3. Environment Variables
Create a `.env` file in the root directory and add your EmailJS credentials to enable the contact form:
```env
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

### 4. Start the Development Server
```bash
npm run dev
```
The site will be running at `http://localhost:5173`.

### 5. Production Build
To create a highly optimized production build:
```bash
npm run build
```

## 📂 Project Structure

```text
├── public/               # Static assets
├── src/
│   ├── components/       # Reusable UI components (Hero, Skills, Projects, etc.)
│   ├── context/          # React Context providers (Theme, Auth, Sound)
│   ├── hooks/            # Custom React hooks
│   ├── lib/              # Utility functions and library wrappers
│   ├── pages/            # Main page routes (Index, Contact)
│   ├── styles/           # Global CSS and Tailwind directives
│   ├── App.tsx           # Main application routing
│   └── main.tsx          # React entry point
├── index.html            # HTML template
├── tailwind.config.ts    # Tailwind CSS configuration
└── vite.config.ts        # Vite configuration
```

## 🌐 Connect

- **Portfolio**: [durvish.dev](https://durvish.dev) (Replace with your actual domain)
- **LinkedIn**: [Durvish Sharma](https://www.linkedin.com/in/durvish-sharma-a936b93a5)
- **Twitter / X**: [@durvishsharma01](https://x.com/durvishsharma01)

---
*Designed & Engineered by Durvish Sharma.*
