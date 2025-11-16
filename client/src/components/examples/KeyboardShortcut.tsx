import KeyboardShortcut from '../KeyboardShortcut';

export default function KeyboardShortcutExample() {
  return (
    <div className="p-8 space-y-4">
      <div className="flex items-center gap-2">
        <span>Save:</span>
        <KeyboardShortcut keys={['Ctrl', 'S']} />
      </div>
      <div className="flex items-center gap-2">
        <span>Find:</span>
        <KeyboardShortcut keys={['Ctrl', 'F']} />
      </div>
      <div className="flex items-center gap-2">
        <span>Copy:</span>
        <KeyboardShortcut keys={['Ctrl', 'C']} />
      </div>
    </div>
  );
}
