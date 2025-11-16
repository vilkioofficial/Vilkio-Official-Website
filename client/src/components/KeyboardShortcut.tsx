interface KeyboardShortcutProps {
  keys: string[];
}

export default function KeyboardShortcut({ keys }: KeyboardShortcutProps) {
  return (
    <span className="inline-flex items-center gap-1" data-testid="keyboard-shortcut">
      {keys.map((key, index) => (
        <span key={index} className="inline-flex items-center gap-1">
          <kbd className="inline-block bg-muted border border-border rounded px-2 py-1 font-mono text-sm shadow-sm">
            {key}
          </kbd>
          {index < keys.length - 1 && <span className="text-muted-foreground">+</span>}
        </span>
      ))}
    </span>
  );
}
