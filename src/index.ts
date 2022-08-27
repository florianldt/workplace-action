import { debug, getInput, setFailed } from '@actions/core';
import notify from './notify';

async function run(): Promise<void> {
    const accessToken = getInput('INPUT_ACCESS_TOKEN');
    const threadKey = getInput('INPUT_THREAD_KEY');
    const text = getInput('INPUT_TEXT');

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
