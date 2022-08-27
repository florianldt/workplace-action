import * as core from '@actions/core';
import notify from './notify';

async function run(): Promise<void> {
    const accessToken = core.getInput('access-token');
    const threadKey = core.getInput('thread-key');
    const text = core.getInput('text');

    core.debug(accessToken);
    try {
        const res = await notify(accessToken, threadKey, text);
        core.debug(JSON.stringify(res));
    } catch (e) {
        if (e instanceof Error) {
            core.setFailed(e.message);
        }
    }
}

run();
