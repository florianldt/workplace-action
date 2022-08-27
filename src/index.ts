import { debug, getInput, setFailed } from '@actions/core';

import notify from './notify';

async function run(): Promise<void> {
    const accessToken = getInput('bot-access-token');
    const threadKey = getInput('thread-key');
    const text = getInput('text');

    try {
        const res = await notify(accessToken, threadKey, text);
        debug(JSON.stringify(res));
    } catch (e) {
        if (e instanceof Error) {
            setFailed(e.message);
        }
    }
}

run();
