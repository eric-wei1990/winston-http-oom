# winston-http-oom

A demo to reproduce winston OOM with http transport.

## How to run?

1. Start log server to receive logs
_Log server use nodejs 20 since nodejs 20 is up to 96.13% faster than Node.js 18 when handling HTTP requests._

```
cd log-server
nvm use
npm install
npm start
```

2. Start client with winton http transport to send logs


```
cd winston-http-oom-client
nvm use
npm install
npm run inspect
```

3. Run stress tests by using [artillery](https://github.com/artilleryio/artillery)

_To make OOM happens more quickly, vusers is set to `3000` and `--max-old-space-size=256`._

```
cd winston-http-oom-client
npm run stress-test
```

## What happens when running stress test?

1. Heap increaed a lot.

![](./images/heap.png)

2. Client will be creash caused by OOM.

**P.S There is a pure express client could be used for testing express without winston.**