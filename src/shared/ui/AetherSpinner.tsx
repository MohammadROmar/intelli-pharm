export function AetherSpinner() {
  return (
    <div className="flex size-4 items-center justify-between" role="status">
      <span className="animate-spinner-bounce bg-muted-foreground h-full w-1 origin-center rounded opacity-20" />
      <span className="animate-spinner-bounce bg-muted-foreground h-full w-1 origin-center rounded opacity-20 [animation-delay:0.15s]" />
      <span className="animate-spinner-bounce bg-muted-foreground h-full w-1 origin-center rounded opacity-20 [animation-delay:0.3s]" />
    </div>
  );
}
