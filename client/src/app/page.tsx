'use client';

import { useParams } from 'next/navigation';
import { useMemo } from 'react';

export default function Page() {
  const rawParams = useParams();

  const params = useMemo(() => {
    return { ...rawParams };
  }, [rawParams]);

  return (
    <pre>
      {JSON.stringify(params, null, 2)}
    </pre>
  );
}
