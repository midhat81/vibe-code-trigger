# Vibe Code + Trigger.dev + E2B

A modern code execution platform that replaces Vercel's sandbox with **Trigger.dev workflows** and **E2B sandboxes**. Execute JavaScript, TypeScript, and Python code securely in isolated environments with real-time output.

## 🚀 Features

- **Real-time Code Execution**: Run code instantly in secure E2B sandboxes
- **Multiple Languages**: Support for JavaScript, TypeScript, and Python
- **Live Output Streaming**: See execution logs and results in real-time
- **Error Handling**: Comprehensive error display and debugging
- **Clean Architecture**: Modular TypeScript components with separation of concerns
- **Production Ready**: Built with Next.js 14, Trigger.dev v3, and E2B

## 📁 Project Structure

```
vibe-code-trigger/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── execute/
│   │   │       └── route.ts          # API endpoint for code execution
│   │   ├── page.tsx                   # Main application page
│   │   ├── layout.tsx                 # Root layout
│   │   └── globals.css                # Global styles
│   ├── components/
│   │   ├── CodeEditor.tsx             # Monaco editor component
│   │   ├── OutputPanel.tsx            # Real-time output display
│   │   └── ControlPanel.tsx           # Execution controls
│   └── lib/
│       └── types.ts                   # TypeScript interfaces
├── trigger/
│   └── code-execution.ts              # Trigger.dev workflow with E2B
├── trigger.config.ts                  # Trigger.dev configuration
├── package.json
├── tsconfig.json
├── next.config.js
├── tailwind.config.ts
└── .env.example
```

## 🛠️ Tech Stack

- **Frontend**: Next.js 14 (App Router), React, TypeScript
- **Editor**: Monaco Editor (VS Code editor)
- **Styling**: Tailwind CSS
- **Backend**: Trigger.dev v3 for workflow orchestration
- **Execution**: E2B Sandbox for secure code execution
- **Icons**: Lucide React

## 📋 Prerequisites

- Node.js 18+ 
- npm or yarn
- Trigger.dev account ([trigger.dev](https://trigger.dev))
- E2B account ([e2b.dev](https://e2b.dev))

## 🔧 Setup Instructions

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd vibe-code-trigger
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env.local` file:

```bash
cp .env.example .env.local
```

Add your API keys:

```env
TRIGGER_API_KEY=your_trigger_api_key
TRIGGER_API_URL=https://api.trigger.dev
TRIGGER_PROJECT_ID=your_project_id
E2B_API_KEY=your_e2b_api_key
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

#### Getting API Keys:

**Trigger.dev:**
1. Sign up at [trigger.dev](https://trigger.dev)
2. Create a new project
3. Copy your API key from the dashboard
4. Note your project ID

**E2B:**
1. Sign up at [e2b.dev](https://e2b.dev)
2. Go to Settings → API Keys
3. Generate a new API key

### 4. Run the Development Server

```bash
# Start Next.js dev server
npm run dev

# In another terminal, start Trigger.dev dev server
npm run trigger:dev
```

The app will be available at `http://localhost:3000`

## 🚀 Deployment

### Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

Add environment variables in Vercel dashboard:
- Go to Project Settings → Environment Variables
- Add all variables from `.env.local`

### Deploy Trigger.dev Workflows

```bash
npx trigger.dev@latest deploy
```

## 🏗️ Architecture Decisions

### Why Trigger.dev?

- **Reliability**: Built-in retries and error handling
- **Observability**: Full execution logs and monitoring
- **Scalability**: Automatic scaling for concurrent executions
- **Developer Experience**: Simple API, great TypeScript support

### Why E2B?

- **Security**: Isolated sandbox environments
- **Speed**: Fast cold starts (<2s)
- **Flexibility**: Support for multiple languages and custom environments
- **Simplicity**: Clean API for code execution

### Architecture Flow

```
User Code → Next.js API → Trigger.dev Task → E2B Sandbox → Results → User
```

1. **User submits code** via Monaco editor
2. **API endpoint** triggers Trigger.dev workflow
3. **Trigger.dev** orchestrates execution with retries
4. **E2B Sandbox** runs code in isolated environment
5. **Results stream back** to frontend via polling

## 🔒 Security

- All code executes in isolated E2B sandboxes
- 60-second timeout per execution
- No persistent storage between runs
- Sandboxes destroyed after execution

## 🐛 Troubleshooting

### Execution Timeout
- Increase timeout in `trigger/code-execution.ts`
- Check E2B sandbox limits

### API Connection Issues
- Verify API keys are correct
- Ensure Trigger.dev dev server is running
- Check network connectivity

### Monaco Editor Not Loading
- Clear browser cache
- Check for console errors
- Verify Monaco CDN accessibility

## 📝 Usage Example

```javascript
// JavaScript Example
console.log("Hello from Vibe Code!");
const sum = (a, b) => a + b;
console.log("5 + 3 =", sum(5, 3));
```

```python
# Python Example
print("Hello from Vibe Code!")
def sum(a, b):
    return a + b
print("5 + 3 =", sum(5, 3))
```

## 🎯 Key Features Implemented

✅ Real-time code execution  
✅ Multi-language support (JS, TS, Python)  
✅ Error handling and logging  
✅ Clean TypeScript architecture  
✅ Modular component design  
✅ Production-ready deployment  
✅ Comprehensive documentation  

## 📊 Performance

- **Cold Start**: ~2-3s (E2B sandbox initialization)
- **Warm Execution**: <500ms
- **Concurrent Executions**: Unlimited (scales with Trigger.dev)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a pull request

## 📄 License

MIT

## 🙏 Acknowledgments

- **Vercel** for the original Vibe Code concept
- **Trigger.dev** for workflow orchestration
- **E2B** for secure sandbox execution
- **Monaco Editor** for the code editor

## 📧 Support

For issues or questions:
- Open a GitHub issue
- Contact:mianmidhat@gmail.com

---

Built with ❤️ using Next.js, Trigger.dev, and E2B