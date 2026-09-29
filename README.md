# Zeus 2.0

A multi-timeframe crypto day-trading terminal that runs entirely in your browser: no install, no server.

**Live demo:** https://thenewurbankid-web.github.io/zeus2point0/

- **Zeus AI copilot**: an in-browser LLM (WebLLM on WebGPU). Describe a strategy in plain English and it builds it, backtests it and runs it. Nothing you type leaves your computer.
- **Trend matrix**: trend score for 1m / 5m / 15m / 1h / 4h plus a cross-timeframe confluence reading.
- **Custom strategies**: no-code rule builder or JavaScript, with presets.
- **Auto-execution**: paper trading by default; optional live Binance spot orders with your own API key (Testnet supported).
- **Risk controls**: position sizing, SL / TP (% or ATR), trailing stop, cooldown, max open positions, daily loss limit, flatten-all.
- **Backtester**: runs the same strategy and risk code on recent Binance history.

Market data comes from Binance's public API. The AI copilot needs a WebGPU browser (recent Chrome / Edge, Safari 26+). The first load downloads the model once, and after that it's cached.

> Not financial advice. Keep the tab open and visible while auto-trading. Test on paper or Testnet before using real money.
