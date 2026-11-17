import React from 'react';

/**
 * Minimal inline formatter: **bold**, and "\n" as line break.
 * Content is authored in this repo, never user-supplied.
 */
export function RichText({ md }: { md: string }) {
  const lines = md.split('\n');
  return (
    <>
      {lines.map((line, li) => (
        <React.Fragment key={li}>
          {li > 0 && <br />}
          {line.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
            part.startsWith('**') && part.endsWith('**') ? (
              <strong key={i} className="font-semibold text-foreground">
                {part.slice(2, -2)}
              </strong>
            ) : (
              <React.Fragment key={i}>{part}</React.Fragment>
            )
          )}
        </React.Fragment>
      ))}
    </>
  );
}
