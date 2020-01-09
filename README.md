# install

```sh
npm i progress-i
```

# usage

```ts
import { ProgressBar } from "progress-i";

const p = new ProgressBar("progress", 50);
p.setTotal(100);
for (let i = 0; i < 100; i++) {
  await delay(100);
  p.setValue(i);
}
p.finish();
```
