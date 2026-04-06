import { DocPage, DocSection, Callout } from '../components/DocPage';
import { CodeBlock } from '../components/CodeBlock';

export function GettingStartedPage() {
  return (
    <DocPage
      title="Installation"
      description="Get crispui set up in your React project in under two minutes."
    >
      <DocSection title="Install the package">
        <CodeBlock code={`npm install @crispui/react`} language="bash" showLineNumbers={false} maxHeight="56px" />
        <p className="text-sm text-gray-500 mt-3">Or with yarn / pnpm:</p>
        <CodeBlock code={`yarn add @crispui/react\npnpm add @crispui/react`} language="bash" showLineNumbers={false} maxHeight="72px" />
      </DocSection>

      <DocSection title="Import the styles">
        <p className="text-sm text-gray-400 mb-4">Add this once in your root file (e.g. <code className="text-sky-400 font-mono text-xs bg-white/5 px-1.5 py-0.5 rounded">main.tsx</code>):</p>
        <CodeBlock code={`import '@crispui/react/styles';`} language="tsx" showLineNumbers={false} maxHeight="56px" />
      </DocSection>

      <DocSection title="Wrap with providers">
        <p className="text-sm text-gray-400 mb-4">
          Some components like <code className="text-sky-400 font-mono text-xs bg-white/5 px-1.5 py-0.5 rounded">Toast</code> and <code className="text-sky-400 font-mono text-xs bg-white/5 px-1.5 py-0.5 rounded">CommandPalette</code> require a context provider at the root:
        </p>
        <CodeBlock code={`import { ToastProvider } from '@crispui/react';

function App() {
  return (
    <ToastProvider position="top-right">
      <YourApp />
    </ToastProvider>
  );
}`} />
      </DocSection>

      <DocSection title="Quick start example">
        <CodeBlock code={`import {
  Button, Input, Badge, Card, CardHeader, CardTitle,
  CardContent, CardFooter, Alert
} from '@crispui/react';

export function LoginCard() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <Card className="w-80">
      <CardHeader>
        <CardTitle>Sign in</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <Alert variant="info">Use any credentials for demo purposes.</Alert>
        <Input
          label="Email"
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <Input
          label="Password"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
      </CardContent>
      <CardFooter>
        <Button className="w-full">Sign in</Button>
      </CardFooter>
    </Card>
  );
}`} />
      </DocSection>

      <DocSection title="Peer dependencies">
        <Callout variant="info">
          crispui requires React 18+ and uses Framer Motion for animations. Both are listed as peer dependencies.
        </Callout>
        <CodeBlock code={`{
  "peerDependencies": {
    "react": ">=18.0.0",
    "react-dom": ">=18.0.0"
  }
}`} language="json" />
      </DocSection>
    </DocPage>
  );
}
