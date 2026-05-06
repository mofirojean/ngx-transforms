# compat-test

Smoke test that verifies the lib's `Angular 17–21` peer-dep range is real.

## How it runs

`.github/workflows/compat.yml` triggers daily (6 AM UTC) and on `workflow_dispatch`. For each Angular major in the matrix [17, 19, 21]:

1. Build & pack the lib (`pnpm build:lib && cd dist/libs/ngx-transforms && npm pack`)
2. Scaffold a fresh consumer with that Angular major: `npx -y -p @angular/cli@N ng new compat-test --skip-install --skip-git --routing=false --style=css --inline-style --inline-template`
3. Replace `src/main.ts` with [`smoke.ts`](./smoke.ts)
4. Install the packed tarball into the consumer
5. Run `ng build` — fail the matrix entry if non-zero exit

If a matrix entry fails, either the lib regressed against that Angular version or the version genuinely dropped support. Decide whether to fix the lib or narrow the peer-dep range.

## Why these pipes

`smoke.ts` imports a representative subset chosen to exercise different code paths:

| Pipe | Tests |
|---|---|
| `TruncatePipe` | Baseline sync pipe |
| `TimeAgoPipe` | `Intl.RelativeTimeFormat` integration |
| `HtmlSanitizePipe` | `DomSanitizer` from `@angular/platform-browser` |
| `QrCodePipe` | Promise-returning pipe + AsyncPipe |
| `IsEmptyPipe` | Newest pipe (Boolean category, 1.0 addition) |
| `GroupByPipe` | Heavier array transform |

If a regression slips through, add a pipe that exercises the broken code path here.

## Running locally

```bash
# Build + pack
pnpm build:lib
cd dist/libs/ngx-transforms && npm pack && cd -

# Scaffold a test consumer for, say, Angular 19
npx -y -p @angular/cli@19 ng new compat-19 --skip-install --skip-git --routing=false --style=css --inline-style --inline-template
cp tools/compat-test/smoke.ts compat-19/src/main.ts
cd compat-19
npm install ../dist/libs/ngx-transforms/ngx-transforms-*.tgz
npm install
npx ng build
```
