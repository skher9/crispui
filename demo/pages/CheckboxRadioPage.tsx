import { useState } from 'react';
import { Checkbox, Radio, RadioGroup, Switch } from '@crispui/react';
import { DocPage, DocSection, Callout } from '../components/DocPage';
import { ExampleBlock } from '../components/ExampleBlock';
import { PropsTable } from '../components/PropsTable';

// ── Checkbox ──────────────────────────────────────────────────────────────

export function CheckboxPage() {
  const [checked, setChecked] = useState(true);
  return (
    <DocPage title="Checkbox" description="Custom checkbox with a smooth SVG checkmark, optional description, three sizes, and error state." importNames="Checkbox">
      <DocSection title="Basic usage">
        <ExampleBlock code={`<Checkbox
  label="Subscribe to updates"
  description="Get notified about new features and releases."
  checked={checked}
  onChange={e => setChecked(e.target.checked)}
/>`} previewClassName="flex-col items-start">
          <Checkbox label="Subscribe to updates" description="Get notified about new features." checked={checked} onChange={e => setChecked(e.target.checked)} />
        </ExampleBlock>
      </DocSection>

      <DocSection title="Sizes">
        <ExampleBlock code={`<Checkbox size="sm" label="Small" defaultChecked />
<Checkbox size="md" label="Medium (default)" defaultChecked />
<Checkbox size="lg" label="Large" defaultChecked />`} previewClassName="flex-col items-start gap-3">
          <Checkbox size="sm" label="Small" defaultChecked />
          <Checkbox size="md" label="Medium (default)" defaultChecked />
          <Checkbox size="lg" label="Large" defaultChecked />
        </ExampleBlock>
      </DocSection>

      <DocSection title="Error state">
        <ExampleBlock code={`<Checkbox label="Accept terms" error="You must accept the terms to continue." />`} previewClassName="flex-col items-start">
          <Checkbox label="Accept terms" error="You must accept the terms to continue." />
        </ExampleBlock>
      </DocSection>

      <DocSection title="Disabled">
        <Callout variant="warning">Do not use both <code className="font-mono text-xs">disabled</code> and <code className="font-mono text-xs">error</code> simultaneously — disabled inputs cannot be invalid in accessible patterns.</Callout>
        <ExampleBlock code={`<Checkbox label="Checked disabled" disabled defaultChecked />
<Checkbox label="Unchecked disabled" disabled />`} previewClassName="flex-col items-start gap-2">
          <Checkbox label="Checked disabled" disabled defaultChecked />
          <Checkbox label="Unchecked disabled" disabled />
        </ExampleBlock>
      </DocSection>

      <PropsTable props={[
        { name: 'label', type: 'string', description: 'Label rendered next to the checkbox.' },
        { name: 'description', type: 'string', description: 'Smaller helper text below the label.' },
        { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Checkbox and label size.' },
        { name: 'error', type: 'string', description: 'Error message shown below the label.' },
        { name: 'checked', type: 'boolean', description: 'Controlled checked state.' },
        { name: 'defaultChecked', type: 'boolean', description: 'Uncontrolled initial checked state.' },
        { name: 'disabled', type: 'boolean', default: 'false', description: 'Visually dims and prevents interaction.' },
        { name: 'onChange', type: 'ChangeEventHandler<HTMLInputElement>', description: 'Change handler.' },
      ]} />
    </DocPage>
  );
}

// ── Radio ─────────────────────────────────────────────────────────────────

export function RadioPage() {
  const [plan, setPlan] = useState('standard');
  const [freq, setFreq] = useState('daily');
  return (
    <DocPage title="Radio" description="RadioGroup provides shared name/value context for Radio items. Supports controlled and uncontrolled usage, vertical or horizontal layout." importNames="Radio, RadioGroup">
      <DocSection title="Basic RadioGroup (vertical)">
        <ExampleBlock code={`const [plan, setPlan] = useState('standard');

<RadioGroup
  name="plan"
  label="Pricing plan"
  value={plan}
  onChange={setPlan}
>
  <Radio value="free" label="Free" description="Up to 3 projects" />
  <Radio value="standard" label="Standard — $12/mo" description="Unlimited projects" />
  <Radio value="pro" label="Pro — $29/mo" description="Team features + priority support" />
</RadioGroup>`} previewClassName="flex-col items-start">
          <RadioGroup name="plan" label="Pricing plan" value={plan} onChange={setPlan} hint="You can change this later.">
            <Radio value="free" label="Free" description="Up to 3 projects" />
            <Radio value="standard" label="Standard — $12/mo" description="Unlimited projects" />
            <Radio value="pro" label="Pro — $29/mo" description="Team features + priority support" />
          </RadioGroup>
          <p className="text-xs text-gray-500 mt-2">Selected: <span className="text-crisp-400">{plan}</span></p>
        </ExampleBlock>
      </DocSection>

      <DocSection title="Horizontal layout">
        <ExampleBlock code={`<RadioGroup name="freq" orientation="horizontal" value={freq} onChange={setFreq}>
  <Radio value="daily" label="Daily" />
  <Radio value="weekly" label="Weekly" />
  <Radio value="monthly" label="Monthly" />
</RadioGroup>`} previewClassName="flex-col items-start">
          <RadioGroup name="freq" orientation="horizontal" value={freq} onChange={setFreq} label="Send digest">
            <Radio value="daily" label="Daily" />
            <Radio value="weekly" label="Weekly" />
            <Radio value="monthly" label="Monthly" />
          </RadioGroup>
        </ExampleBlock>
      </DocSection>

      <DocSection title="Sizes">
        <ExampleBlock code={`<RadioGroup name="sz" orientation="horizontal">
  <Radio value="sm" label="Small" size="sm" />
  <Radio value="md" label="Medium" size="md" />
  <Radio value="lg" label="Large" size="lg" />
</RadioGroup>`} previewClassName="flex-col items-start">
          <RadioGroup name="sz" orientation="horizontal" defaultValue="md">
            <Radio value="sm" label="Small" size="sm" />
            <Radio value="md" label="Medium" size="md" />
            <Radio value="lg" label="Large" size="lg" />
          </RadioGroup>
        </ExampleBlock>
      </DocSection>

      <PropsTable title="RadioGroup Props" props={[
        { name: 'name', type: 'string', required: true, description: 'HTML name for all Radio inputs in the group.' },
        { name: 'value', type: 'string', description: 'Controlled selected value.' },
        { name: 'onChange', type: '(value: string) => void', description: 'Called when selection changes.' },
        { name: 'orientation', type: "'vertical' | 'horizontal'", default: "'vertical'", description: 'Layout direction of radio items.' },
        { name: 'label', type: 'string', description: 'Fieldset legend.' },
        { name: 'hint', type: 'string', description: 'Helper text below the group.' },
        { name: 'error', type: 'string', description: 'Error message below the group.' },
        { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Passed down to all Radio children.' },
        { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables all Radio children.' },
      ]} />
    </DocPage>
  );
}

// ── Switch ─────────────────────────────────────────────────────────────────

export function SwitchPage() {
  const [notifs, setNotifs] = useState(true);
  const [dark, setDark] = useState(false);
  return (
    <DocPage title="Switch" description="A toggle switch that maps to an underlying checkbox. Fully keyboard and screen-reader accessible. Three sizes." importNames="Switch">
      <DocSection title="Basic usage">
        <ExampleBlock code={`<Switch
  label="Push notifications"
  description="Receive alerts for new activity"
  checked={notifs}
  onChange={e => setNotifs(e.target.checked)}
/>`} previewClassName="flex-col items-start gap-3">
          <Switch label="Push notifications" description="Receive alerts for new activity" checked={notifs} onChange={e => setNotifs(e.target.checked)} />
          <Switch label="Dark mode" checked={dark} onChange={e => setDark(e.target.checked)} />
          <Switch label="Beta features" description="May be unstable" disabled />
        </ExampleBlock>
      </DocSection>

      <DocSection title="Sizes">
        <ExampleBlock code={`<Switch size="sm" label="Small" defaultChecked />
<Switch size="md" label="Medium (default)" defaultChecked />
<Switch size="lg" label="Large" defaultChecked />`} previewClassName="flex-col items-start gap-3">
          <Switch size="sm" label="Small" defaultChecked />
          <Switch size="md" label="Medium (default)" defaultChecked />
          <Switch size="lg" label="Large" defaultChecked />
        </ExampleBlock>
      </DocSection>

      <Callout variant="tip">
        Switch renders as <code className="font-mono text-xs">type="checkbox"</code> with <code className="font-mono text-xs">role="switch"</code> — all native checkbox props work.
      </Callout>

      <PropsTable props={[
        { name: 'label', type: 'string', description: 'Label rendered to the right of the toggle.' },
        { name: 'description', type: 'string', description: 'Smaller helper text below the label.' },
        { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Track and thumb size.' },
        { name: 'checked', type: 'boolean', description: 'Controlled checked state.' },
        { name: 'defaultChecked', type: 'boolean', description: 'Uncontrolled initial state.' },
        { name: 'disabled', type: 'boolean', default: 'false', description: 'Prevents toggling.' },
      ]} />
    </DocPage>
  );
}
