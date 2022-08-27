import dotenv from 'dotenv';

import notify from '../src/notify';

dotenv.config();

let accessToken = '';
let threadKey = '';

test('throw missing access token data', async () => {
    try {
        await notify(accessToken, threadKey);
    } catch (e) {
        if (e instanceof Error) {
            expect(e.message).toMatch(
                'OAuthException: An active access token must be used to query information about the current user.',
            );
        }
    }
});

test('throw invalid access token data', async () => {
    accessToken = 'invalid';

    try {
        await notify(accessToken, threadKey);
    } catch (e) {
        if (e instanceof Error) {
            expect(e.message).toMatch(
                'OAuthException: Invalid OAuth access token - Cannot parse access token',
            );
        }
    }
});

test('throw bad thread key format', async () => {
    accessToken = process.env.BOT_ACCESS_TOKEN ?? '';
    threadKey = 'invalid';

    try {
        await notify(accessToken, threadKey);
    } catch (e) {
        if (e instanceof Error) {
            expect(e.message).toMatch(
                'OAuthException: (#100) Param recipient[thread_key] must be a thread id, thread fbid, or canonical id',
            );
        }
    }
});

test('throw invalid thread', async () => {
    accessToken = process.env.BOT_ACCESS_TOKEN ?? '';
    threadKey = 't_5330100977067919';

    try {
        await notify(accessToken, threadKey);
    } catch (e) {
        if (e instanceof Error) {
            expect(e.message).toMatch(
                'OAuthException: (#100) Invalid thread. The thread does either not exist or the bot is not allowed to send messages to it.',
            );
        }
    }
});

test('valid message', async () => {
    threadKey = process.env.THREAD_KEY ?? '';

    const res = await notify(accessToken, threadKey);
    expect(res.thread_key).toBe(threadKey);
});
