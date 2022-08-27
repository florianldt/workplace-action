# Workplace action

GitHub Action for sending a Workplace message.

## Inputs

### `access-token`

**Required** The Workplace Bot access token.

### `thread-key`

**Required** The Workplace thread key to send the message.

### `text`

**Required** The message to send. Default `"Hello World!"`.

## Example usage

```yaml
uses: florianldt/workplace-action@master
with:
    access-token: ${{ secrets.WORKPLACE_ACCESS_TOKEN }}
    thread-key: ${{ secrets.WORKPLACE_THREAD_KEY }}
    text: 'Successful message!'
```
