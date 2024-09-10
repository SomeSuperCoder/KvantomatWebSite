import { createHash } from 'crypto';

export const hashValue = val =>
    new Promise(resolve =>
      setTimeout(
        () => resolve(createHash('sha256').update(val).digest('hex')),
        0
      )
);
