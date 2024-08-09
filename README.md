# Cribbage API

## Usage

QueryParams:

- `cards`: array of strings representing card names
- `detail`: Comma-separated strings representing the level of details to return.
  - `all` - returns all possible hands, instead of just the best
  - `flips` - for each scoring option, lists the flip cards that would result in this score
- sort: specify a sorting option (`mean` (default), `max`, `min`, `median`);

```bash
curl -G "https://cribbage-api.vercel.app/api/handStats" \
--data-urlencode "cards=7s,js,10c,2h,ks"
```
