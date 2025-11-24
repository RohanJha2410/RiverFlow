# Contributing to RiverFlow

Thank you for your interest in contributing to RiverFlow! We're excited to have you join our community of developers building a modern Q&A platform. This document provides guidelines and instructions for contributing to the project.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [How to Contribute](#how-to-contribute)
- [Coding Guidelines](#coding-guidelines)
- [Commit Message Guidelines](#commit-message-guidelines)
- [Pull Request Process](#pull-request-process)
- [Reporting Bugs](#reporting-bugs)
- [Suggesting Features](#suggesting-features)
- [Project Structure](#project-structure)
- [Testing](#testing)
- [Community](#community)

## Code of Conduct

By participating in this project, you agree to maintain a respectful and inclusive environment. We expect all contributors to:

- Be respectful and considerate of others
- Welcome newcomers and help them get started
- Accept constructive criticism gracefully
- Focus on what's best for the community
- Show empathy towards other community members

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js 18+** - [Download here](https://nodejs.org/)
- **Git** - [Download here](https://git-scm.com/)
- **Appwrite instance** - [Cloud](https://cloud.appwrite.io/) or [self-hosted](https://appwrite.io/docs/installation)
- A code editor (we recommend [VS Code](https://code.visualstudio.com/))

### Useful Skills

- React and Next.js fundamentals
- TypeScript
- Tailwind CSS
- Appwrite basics (helpful but not required)
- Git version control

## Development Setup

1. **Fork the repository**

   Click the "Fork" button at the top right of the repository page.

2. **Clone your fork**

   ```bash
   git clone https://github.com/YOUR_USERNAME/RiverFlow.git
   cd RiverFlow
   ```

3. **Add upstream remote**

   ```bash
   git remote add upstream https://github.com/RohanJha2410/RiverFlow.git
   ```

4. **Install dependencies**

   ```bash
   npm install
   ```

5. **Set up environment variables**

   ```bash
   cp .env.sample .env.local
   ```

   Update `.env.local` with your Appwrite configuration:

   ```env
   NEXT_PUBLIC_APPWRITE_HOST_URL=https://cloud.appwrite.io/v1
   NEXT_PUBLIC_APPWRITE_PROJECT_ID=your_project_id
   APPWRITE_API_KEY=your_api_key
   ```

6. **Run the development server**

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

7. **Verify the setup**

   - Try creating an account
   - Post a test question
   - Ensure all features work correctly

## How to Contribute

### Types of Contributions

We welcome various types of contributions:

- **Bug fixes** - Fix issues in existing functionality
- **New features** - Add new features from our roadmap or your ideas
- **Documentation** - Improve README, add guides, or document code
- **UI/UX improvements** - Enhance the user interface and experience
- **Performance optimizations** - Make the app faster and more efficient
- **Tests** - Add or improve test coverage
- **Code refactoring** - Improve code quality without changing functionality

### Finding Something to Work On

1. **Check the Issues page** - Look for issues labeled `good first issue` or `help wanted`
2. **Review the Roadmap** - Check the README for planned features
3. **Fix Known Issues** - The README lists some known issues you can tackle
4. **Propose new features** - Open an issue to discuss your idea before implementing

### Before You Start

- **Check existing issues** to avoid duplicate work
- **Comment on the issue** you'd like to work on so others know
- **Open a new issue** if you're working on something not yet tracked
- **Discuss major changes** before investing significant time

## Coding Guidelines

### General Principles

- Write clean, readable, and maintainable code
- Keep functions small and focused on a single task
- Use meaningful variable and function names
- Comment complex logic but let code be self-documenting
- Follow the existing code style and patterns

### TypeScript

- Always use TypeScript, avoid `any` types where possible
- Define interfaces for component props and data structures
- Use type inference where it improves readability
- Create reusable types in separate files when appropriate

```typescript
// Good
interface QuestionCardProps {
  question: Question;
  onVote: (voteType: 'up' | 'down') => void;
}

// Avoid
const handleClick = (data: any) => { ... }
```

### React Components

- Use functional components with hooks
- Keep components focused and single-purpose
- Extract reusable logic into custom hooks
- Use proper prop destructuring

```typescript
// Good
const QuestionCard: React.FC<QuestionCardProps> = ({ question, onVote }) => {
  // Component logic
};

// Use custom hooks for complex logic
const useQuestionVoting = (questionId: string) => {
  // Voting logic
};
```

### Styling

- Use Tailwind CSS utility classes
- Follow mobile-first responsive design
- Maintain consistency with existing components
- Use shadcn/ui components when possible
- Keep custom CSS minimal

```tsx
// Good - Tailwind utilities
<div className="flex items-center gap-4 rounded-lg border p-4">

// Use responsive classes
<div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
```

### File Organization

- Place components in appropriate directories
- Keep related files together
- Use index files for cleaner imports
- Follow the existing project structure

```
src/
├── components/
│   ├── ui/              # shadcn/ui components
│   ├── QuestionCard.tsx # Feature components
│   └── index.ts         # Barrel exports
├── lib/
│   └── utils.ts         # Utility functions
└── models/
    └── Question.ts      # Data models
```

### State Management

- Use Zustand for global state
- Keep local state in components when appropriate
- Avoid prop drilling - use context or Zustand
- Keep state updates immutable

### API Routes

- Use Next.js App Router conventions
- Implement proper error handling
- Validate input data
- Return appropriate HTTP status codes
- Use TypeScript for request/response types

## Commit Message Guidelines

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification for clear commit history.

### Commit Message Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- `feat` - A new feature
- `fix` - A bug fix
- `docs` - Documentation changes
- `style` - Code style changes (formatting, missing semi-colons, etc.)
- `refactor` - Code refactoring without feature changes
- `perf` - Performance improvements
- `test` - Adding or updating tests
- `chore` - Maintenance tasks, dependency updates

### Examples

```bash
feat(questions): add markdown preview in editor

fix(auth): resolve login redirect loop issue

docs(readme): update installation instructions

style(components): format code with prettier

refactor(voting): simplify vote calculation logic
```

### Best Practices

- Use present tense ("add feature" not "added feature")
- Use imperative mood ("move cursor to..." not "moves cursor to...")
- Keep the subject line under 50 characters
- Add a body for complex changes explaining what and why
- Reference issues using `#issue-number`

## Pull Request Process

### Before Submitting

1. **Sync with upstream**

   ```bash
   git fetch upstream
   git rebase upstream/main
   ```

2. **Create a feature branch**

   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make your changes**

   - Write code following our guidelines
   - Test thoroughly
   - Update documentation if needed

4. **Commit your changes**

   ```bash
   git add .
   git commit -m "feat(scope): description"
   ```

5. **Push to your fork**

   ```bash
   git push origin feature/your-feature-name
   ```

### Submitting the Pull Request

1. Go to the original RiverFlow repository
2. Click "New Pull Request"
3. Select your fork and branch
4. Fill out the PR template with:
   - **Title**: Clear, descriptive title following commit conventions
   - **Description**: What changes you made and why
   - **Issue reference**: Link related issues with `Fixes #123` or `Closes #123`
   - **Screenshots**: For UI changes, include before/after screenshots
   - **Testing**: Describe how you tested your changes

### PR Template Example

```markdown
## Description
Brief description of what this PR does

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Documentation update
- [ ] Code refactoring

## Related Issues
Fixes #123

## Screenshots (if applicable)
[Add screenshots here]

## Testing
- [ ] Tested locally
- [ ] All existing features still work
- [ ] Added new tests (if applicable)

## Checklist
- [ ] Code follows project style guidelines
- [ ] Self-reviewed my code
- [ ] Commented complex code sections
- [ ] Updated documentation
- [ ] No console errors or warnings
```

### Review Process

- A maintainer will review your PR
- Address any requested changes
- Keep discussions respectful and constructive
- Be patient - reviews may take a few days
- Once approved, a maintainer will merge your PR

### After Your PR is Merged

- Delete your feature branch
- Update your local repository
- Celebrate! 🎉 You've contributed to RiverFlow!

## Reporting Bugs

### Before Submitting a Bug Report

- Check if the bug has already been reported
- Verify it's reproducible on the latest version
- Collect information about your environment

### How to Submit a Bug Report

Create an issue with the following information:

**Title**: Clear, descriptive title

**Description**:
- Steps to reproduce the behavior
- Expected behavior
- Actual behavior
- Screenshots or error messages
- Environment details (OS, browser, Node version)

**Example**:

```markdown
## Bug Description
Login button doesn't respond on mobile devices

## Steps to Reproduce
1. Open the app on mobile (iOS Safari)
2. Navigate to login page
3. Click the login button
4. Nothing happens

## Expected Behavior
Should navigate to the dashboard after successful login

## Environment
- OS: iOS 16.5
- Browser: Safari
- Device: iPhone 12
```

## Suggesting Features

We love new ideas! Here's how to suggest features:

### Feature Request Template

```markdown
## Feature Description
Clear description of the feature

## Problem it Solves
What problem does this address?

## Proposed Solution
How would this feature work?

## Alternatives Considered
Other solutions you've thought about

## Additional Context
Mockups, examples from other apps, etc.
```

### Feature Discussion

- Open an issue with the `enhancement` label
- Discuss the feature with maintainers and community
- Wait for approval before starting implementation
- Break large features into smaller, manageable PRs

## Project Structure

Understanding the project structure helps you navigate the codebase:

```
RiverFlow/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── (auth)/            # Auth pages (login, register)
│   │   ├── api/               # API routes
│   │   ├── questions/         # Question pages
│   │   └── users/             # User profile pages
│   ├── components/            # Reusable components
│   │   ├── ui/                # shadcn/ui components
│   │   ├── QuestionCard.tsx   # Example component
│   │   └── ...
│   ├── lib/                   # Utility functions
│   │   └── utils.ts
│   ├── models/                # Appwrite configuration
│   │   ├── client/            # Client-side config
│   │   └── server/            # Server-side config
│   ├── store/                 # Zustand state management
│   └── utils/                 # Helper functions
├── public/                    # Static assets
├── .env.sample               # Environment variables template
└── package.json              # Dependencies
```

## Testing

While we're working on comprehensive test coverage, here's how to test your changes:

### Manual Testing Checklist

- [ ] Test in development environment
- [ ] Verify responsive design (mobile, tablet, desktop)
- [ ] Test in different browsers (Chrome, Firefox, Safari)
- [ ] Check for console errors
- [ ] Test edge cases and error scenarios
- [ ] Verify existing features still work

### Future: Automated Testing

We're planning to add:
- Unit tests with Jest and React Testing Library
- E2E tests with Playwright
- Component tests

If you'd like to help set up testing infrastructure, please reach out!

## Community

### Getting Help

- **GitHub Issues** - Ask questions or report problems
- **Discussions** - Join conversations about features and ideas
- **Documentation** - Check README and this guide first

### Recognition

We value all contributions! Contributors will be:
- Listed in our README contributors section
- Recognized in release notes for significant contributions
- Given credit in documentation they improve

## License

By contributing to RiverFlow, you agree that your contributions will be licensed under the MIT License.

---

## Questions?

If you have questions about contributing, feel free to:
- Open an issue with the `question` label
- Reach out to the maintainers
- Check our existing documentation

Thank you for contributing to RiverFlow! Together, we're building an amazing Q&A platform for developers. 🚀