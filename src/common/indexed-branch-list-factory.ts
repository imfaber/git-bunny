import chalk from 'chalk';
import print from './print';
import {
    GitIndexedEntityList,
    GitIndexedEntity,
    GitBranch,
    GitEntityType
} from './types';

export const getList = (branches: {
    [name: string]: GitBranch;
}): GitIndexedEntity[] => {
    const list: GitIndexedEntity[] = [];

    Object.keys(branches).forEach((b: string, i) => {
        list.push({
            index: i + 1,
            type: GitEntityType.Branch,
            ...branches[b]
        });
    });

    return list;
};

export const prompt = (list: GitIndexedEntity[]) => {
    list.forEach((b) => {
        const isCurrent = b.current;
        const index = chalk.white(`[${b.index}]`);
        const currentMarker = isCurrent ? chalk.green('➤ ') : '  ';
        let branch: string;

        if (b.name.startsWith('remotes/')) {
            branch = chalk.red(b.name);
        } else {
            branch = isCurrent ? chalk.green(b.name) : chalk.grey(b.name);
        }

        print(`${currentMarker} ${index} ${branch}`);
    });
};

export default (branches: {
    [name: string]: GitBranch;
}): GitIndexedEntityList => {
    const list = getList(branches);

    return {
        list,
        prompt: () => prompt(list)
    };
};