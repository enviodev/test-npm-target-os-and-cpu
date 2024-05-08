# Debug OS and CPU target

This script allows us to determine which OS and CPU target is being used by the current environment according to npm and node.

To use the script run:
```bash
pnpm i
pnpm test
```

(note npm or yarn can also be used, but envio only supports pnpm officially, so rather use that.)


#### Dev notes (not for users)

Build and publish the test packages run: `node ./packages/index.js`.
