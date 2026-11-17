import React, { Suspense } from 'react';
import type { Block } from '@/content/types';
import { RichText } from './RichText';
import { cn } from '@/lib/utils';
import { toneClass } from '@/lib/theme';
import { ToolSlot } from '@/tools';

function Bullets({ items, ordered }: { items: string[]; ordered?: boolean }) {
  const Tag = ordered ? 'ol' : 'ul';
  return (
    <Tag className={cn('space-y-1.5 text-sm text-muted-foreground', ordered ? 'list-decimal pl-5' : '')}>
      {items.map((it, i) =>
        ordered ? (
          <li key={i} className="pl-1">
            <RichText md={it} />
          </li>
        ) : (
          <li key={i} className="flex gap-2">
            <span className="mt-[0.45rem] h-1.5 w-1.5 flex-none rounded-full bg-primary/70" />
            <span>
              <RichText md={it} />
            </span>
          </li>
        )
      )}
    </Tag>
  );
}

export function BlockView({ block }: { block: Block }) {
  switch (block.type) {
    case 'text':
      return (
        <p className="text-sm leading-relaxed text-muted-foreground">
          <RichText md={block.md} />
        </p>
      );
    case 'list':
      return (
        <div className="space-y-2">
          {block.title && <h4 className="text-sm font-semibold">{block.title}</h4>}
          <Bullets items={block.items} ordered={block.ordered} />
        </div>
      );
    case 'table':
      return (
        <figure className="space-y-2">
          {block.caption && <figcaption className="text-sm font-semibold">{block.caption}</figcaption>}
          <div className="-mx-1 overflow-x-auto rounded-lg border">
            <table className="tbl min-w-[32rem]">
              <thead>
                <tr>
                  {block.head.map((h, i) => (
                    <th key={i} scope="col">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {block.rows.map((r, ri) => (
                  <tr key={ri}>
                    {r.map((c, ci) => (
                      <td key={ci}>
                        <RichText md={c} />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {block.note && (
            <p className="text-xs text-muted-foreground">
              <RichText md={block.note} />
            </p>
          )}
        </figure>
      );
    case 'callout': {
      const t = toneClass[block.tone];
      return (
        <div className={cn('rounded-lg border p-4', t.box)}>
          <p className={cn('text-sm font-semibold', t.title)}>{block.title}</p>
          {block.md && (
            <p className="mt-1 text-sm">
              <RichText md={block.md} />
            </p>
          )}
          {block.items && (
            <div className="mt-2">
              <Bullets items={block.items} />
            </div>
          )}
        </div>
      );
    }
    case 'cards':
      return (
        <div className={cn('grid gap-3', block.cards.length >= 3 ? 'md:grid-cols-3' : 'md:grid-cols-2')}>
          {block.cards.map((c, i) => {
            const t = toneClass[c.tone ?? 'neutral'];
            return (
              <div key={i} className={cn('rounded-lg border p-4', c.tone ? t.box : 'bg-muted/30')}>
                <p className={cn('mb-2 text-sm font-semibold', c.tone ? t.title : '')}>{c.title}</p>
                {c.md && (
                  <p className="mb-2 text-sm text-muted-foreground">
                    <RichText md={c.md} />
                  </p>
                )}
                {c.items && <Bullets items={c.items} />}
              </div>
            );
          })}
        </div>
      );
    case 'steps':
      return (
        <div className="space-y-2">
          {block.title && <h4 className="text-sm font-semibold">{block.title}</h4>}
          <ol className="relative space-y-3 border-l-2 border-primary/30 pl-5">
            {block.items.map((s, i) => (
              <li key={i} className="relative">
                <span className="absolute -left-[1.85rem] flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                  {i + 1}
                </span>
                <p className="text-sm font-semibold">{s.title}</p>
                <p className="text-sm text-muted-foreground">
                  <RichText md={s.md} />
                </p>
              </li>
            ))}
          </ol>
        </div>
      );
    case 'tool':
      return (
        <Suspense fallback={<div className="h-40 animate-pulse rounded-xl border bg-muted/40" />}>
          <ToolSlot id={block.id} />
        </Suspense>
      );
    default:
      return null;
  }
}

export const Blocks = React.memo(function Blocks({ blocks }: { blocks: Block[] }) {
  return (
    <div className="space-y-4">
      {blocks.map((b, i) => (
        <BlockView key={i} block={b} />
      ))}
    </div>
  );
});
