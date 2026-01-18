import { exec } from 'child_process';
import util from 'util';

const execPromise = util.promisify(exec);


async function convert(command: string) {
    try {
        const { stdout, stderr } =  await execPromise(command);

        if (stderr) {
            console.error(stderr);
        }

        console.log(stdout);
        return stdout;

    } catch (error) {
        console.error(error);
        throw error;
    }
}

convert('node --version')
    .then(version => console.log(`Node.js version: ${version.trim()}`));


