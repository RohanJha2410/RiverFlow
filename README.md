# 🌊 RiverFlow

A modern Stack Overflow clone built with Next.js, TypeScript, and Appwrite. RiverFlow provides a seamless Q&A platform where developers can ask questions, share knowledge, and build their reputation within the community.

![Next.js](https://img.shields.io/badge/Next.js-14.2.4-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue?style=for-the-badge&logo=typescript)
![Appwrite](https://img.shields.io/badge/Appwrite-15.0.0-red?style=for-the-badge&logo=appwrite)
![TailwindCSS](https://img.shields.io/badge/Tailwind-3.4.1-38B2AC?style=for-the-badge&logo=tailwind-css)

## ✨ Features

- **🔐 Authentication System**: Secure user registration and login with Appwrite
- **❓ Question Management**: Ask, edit, and delete questions with rich text formatting
- **💬 Answer System**: Provide detailed answers with markdown support
- **🗳️ Voting System**: Upvote/downvote questions and answers
- **💬 Comments**: Add comments to questions and answers
- **🏆 Reputation System**: Earn reputation points based on community engagement
- **👤 User Profiles**: View user statistics, questions, answers, and voting history
- **🔍 Search Functionality**: Find questions and answers easily
- **📱 Responsive Design**: Works seamlessly across all devices
- **🌙 Dark Mode**: Beautiful dark theme support
- **🎨 Modern UI**: Built with shadcn/ui components and Framer Motion animations

## 🛠️ Tech Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Modern UI components
- **Framer Motion** - Smooth animations
- **Zustand** - Lightweight state management
- **Radix UI** - Unstyled, accessible UI primitives

### Backend & Database
- **Appwrite** - Backend-as-a-Service platform
- **Node Appwrite** - Server-side SDK for Appwrite

### Additional Tools
- **React Markdown Editor** - Rich text editing
- **Canvas Confetti** - Celebration animations
- **React Icon Cloud** - Interactive icon displays
- **Lucide React** - Beautiful icons

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- An Appwrite instance (cloud or self-hosted)
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/RohanJha2410/RiverFlow.git
   cd RiverFlow
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.sample .env.local
   ```
   
   Update the `.env.local` file with your Appwrite configuration:
   ```env
   NEXT_PUBLIC_APPWRITE_HOST_URL=https://cloud.appwrite.io/v1
   NEXT_PUBLIC_APPWRITE_PROJECT_ID=your_project_id
   APPWRITE_API_KEY=your_api_key
   ```

4. **Set up Appwrite Database**
   
   The application will automatically create the required collections when you first run it. Make sure your Appwrite project has the necessary permissions configured.

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

## 🏗️ Project Structure

```
src/
├── app/
│   ├── (auth)/                 # Authentication pages
│   ├── api/                    # API routes
│   ├── components/             # Page-specific components
│   ├── questions/              # Question-related pages
│   └── users/                  # User profile pages
├── components/                 # Reusable UI components
│   ├── ui/                     # shadcn/ui components
│   └── ...                     # Custom components
├── lib/                        # Utility functions
├── models/                     # Appwrite database models
│   ├── client/                 # Client-side configuration
│   └── server/                 # Server-side configuration
├── store/                      # Zustand store
└── utils/                      # Helper functions
```

## 🔧 Configuration

### Appwrite Setup

1. Create a new project in Appwrite
2. Set up authentication with email/password
3. Configure the following collections (auto-created by the app):
   - **Questions**: Store questions with content, author, tags, etc.
   - **Answers**: Store answers linked to questions
   - **Comments**: Store comments on questions/answers
   - **Votes**: Track upvotes/downvotes on questions/answers

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_APPWRITE_HOST_URL` | Appwrite server URL | ✅ |
| `NEXT_PUBLIC_APPWRITE_PROJECT_ID` | Your Appwrite project ID | ✅ |
| `APPWRITE_API_KEY` | Server-side API key | ✅ |

## 📊 Database Schema

### Collections Overview

- **Questions Collection**: Stores all questions with metadata
- **Answers Collection**: Linked answers to questions
- **Comments Collection**: Comments on questions/answers
- **Votes Collection**: Voting system for reputation management
- **Users**: Built-in Appwrite users with custom preferences

## 🎨 UI Components

RiverFlow uses a modern design system built on:

- **Custom Hero Section**: Animated parallax hero with question previews
- **Question Cards**: Beautiful cards displaying question metadata
- **Rich Text Editor**: Markdown-powered editor for content creation
- **Vote Buttons**: Interactive voting with real-time updates
- **Comment System**: Nested comment threads
- **User Avatars**: Generated user initials and profile pictures

## 🚀 Deployment

### Vercel (Recommended)

1. Fork this repository
2. Connect your GitHub repo to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

### Other Platforms

The app can be deployed on any platform that supports Next.js:

- Netlify
- Railway
- Heroku
- AWS Amplify
- Digital Ocean

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow TypeScript best practices
- Use Tailwind CSS for styling
- Maintain consistent code formatting
- Write descriptive commit messages
- Test your changes thoroughly

## 📋 Roadmap

- [ ] **Real-time notifications** - Live updates for new answers/comments
- [ ] **Advanced search** - Search by tags, users, date ranges
- [ ] **Question bounties** - Reward system for answers
- [ ] **Badges system** - Achievement badges for users
- [ ] **Mobile app** - React Native mobile application
- [ ] **Email notifications** - Notify users of activity
- [ ] **Rich media support** - Images and videos in questions/answers
- [ ] **Question bookmarks** - Save questions for later
- [ ] **Advanced moderation** - Community-driven content moderation

## 🐛 Known Issues

- File attachment previews may not work with certain file types
- Search functionality is basic and could be enhanced
- Mobile responsiveness could be improved for complex layouts

## 👏 Acknowledgments

- [Next.js](https://nextjs.org/) - The React framework for production
- [Appwrite](https://appwrite.io/) - Secure backend server for web & mobile developers
- [Tailwind CSS](https://tailwindcss.com/) - A utility-first CSS framework
- [shadcn/ui](https://ui.shadcn.com/) - Beautiful and accessible UI components
- [Stack Overflow](https://stackoverflow.com/) - Inspiration for the platform design

## 📧 Contact

- **Developer**: [RohanJha2410](https://github.com/RohanJha2410)
- **Repository**: [RiverFlow](https://github.com/RohanJha2410/RiverFlow)

---

<div align="center">
  <strong>Built with ❤️ using Next.js and Appwrite</strong>
</div>
