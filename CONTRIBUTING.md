# Contributing to Anime Character Analyzer

Thank you for your interest in contributing! This document provides guidelines for contributing to the project.

## 🚀 Getting Started

1. **Fork the repository** on GitHub
2. **Clone your fork** locally
3. **Create a new branch** for your feature/fix
4. **Make your changes** following our guidelines
5. **Test thoroughly** with multiple scenarios
6. **Submit a pull request** with a clear description

## 🎯 Types of Contributions

### 🆕 Adding New Characters

To add a new anime character:

1. **Character Data** (`lib/characters.ts`):
   \`\`\`typescript
   newcharacter: {
     name: "Character Name",
     emoji: "🎭",
     color: "blue",
     trait: "Trait & Personality",
     description: "Detailed personality description...",
     joke: "Funny character-specific joke..."
   }
   \`\`\`

2. **Character Image** (`public/charactername.png`):
   - Use original artwork or properly licensed images
   - Recommended size: 512x512px
   - Format: PNG with transparent background preferred

3. **Keyword Analysis** (`app/api/analyze-user/route.ts`):
   \`\`\`typescript
   charactername: [
     { word: "keyword1", weight: 2 },
     { word: "keyword2", weight: 1.5 },
     // Add 10-15 relevant keywords
   ]
   \`\`\`

4. **UI Updates**:
   - Add to character mappings in components
   - Add character-specific colors and messages
   - Update share messages

### 🐛 Bug Fixes

- **Describe the bug** clearly in your PR
- **Include steps to reproduce** the issue
- **Test your fix** with multiple scenarios
- **Update tests** if applicable

### ✨ Feature Enhancements

- **Open an issue first** to discuss major changes
- **Follow existing patterns** in the codebase
- **Update documentation** as needed
- **Consider mobile experience** for UI changes

## 📝 Code Guidelines

### TypeScript

- Use **strict TypeScript** with proper typing
- Define **interfaces** for complex objects
- Use **type guards** where appropriate
- Avoid **any** types when possible

### React/Next.js

- Use **functional components** with hooks
- Follow **Next.js App Router** patterns
- Use **server components** when possible
- Implement **proper error handling**

### Styling

- Use **Tailwind CSS** for styling
- Follow **existing design patterns**
- Ensure **responsive design**
- Test on **mobile devices**

### API Routes

- Implement **proper error handling**
- Use **appropriate HTTP status codes**
- Add **request validation**
- Include **logging** for debugging

## 🧪 Testing

### Manual Testing

1. **Character Analysis**:
   - Test with different Farcaster accounts
   - Verify keyword matching works correctly
   - Check edge cases (no posts, private accounts)

2. **Sharing Functionality**:
   - Test Farcaster frame generation
   - Verify OG images display correctly
   - Check share URLs work properly

3. **Mobile Experience**:
   - Test on various screen sizes
   - Verify touch interactions work
   - Check loading states

### Environment Testing

- Test with **development environment**
- Verify **production deployment** works
- Check **environment variables** are set correctly

## 🎨 Design Guidelines

### Character Consistency

- Each character should have **unique personality traits**
- **Keywords should be specific** to the character
- **Jokes should be character-appropriate**
- **Colors should match** character themes

### UI/UX

- Maintain **anime aesthetic** throughout
- Ensure **accessibility** standards
- Keep **loading times** reasonable
- Provide **clear feedback** to users

## 📋 Pull Request Process

### Before Submitting

- [ ] Code follows project guidelines
- [ ] All tests pass locally
- [ ] Documentation is updated
- [ ] Character images are properly licensed
- [ ] No API keys or secrets in code

### PR Description

Include:
- **Clear description** of changes
- **Screenshots** for UI changes
- **Testing steps** performed
- **Related issues** (if any)

### Review Process

1. **Automated checks** must pass
2. **Code review** by maintainers
3. **Testing** in staging environment
4. **Approval** and merge

## 🚨 Important Considerations

### Copyright and Licensing

- **Character Images**: Use only original artwork or properly licensed images
- **Anime References**: Respect intellectual property rights
- **Attribution**: Maintain proper attribution to original creators

### API Usage

- **Rate Limits**: Respect third-party API limits
- **Error Handling**: Implement graceful degradation
- **Caching**: Use appropriate caching strategies

### Security

- **Environment Variables**: Never commit secrets
- **Input Validation**: Validate all user inputs
- **CORS**: Configure properly for production

## 🆘 Getting Help

- **GitHub Issues**: For bugs and feature requests
- **Discussions**: For questions and ideas
- **Farcaster**: Reach out to [@altagers.eth](https://farcaster.xyz/altagers.eth)

## 📜 Code of Conduct

- Be **respectful** and **inclusive**
- **Help others** learn and grow
- **Give constructive feedback**
- **Respect different perspectives**

Thank you for contributing to the Anime Character Analyzer! 🎌
