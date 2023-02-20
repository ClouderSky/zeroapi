

import {resolve, relative, parse, join} from 'path';
import {readdir, stat} from 'node:fs/promises';


const _listdir = async (list : string[], dir : string) : Promise<string[]> => {
    const children = await readdir(
        dir, {withFileTypes : true, encoding : 'utf-8'});

    const fileList = children
        .filter(x => x.isFile())
        .map(x => resolve(dir, x.name));

    return children
        .filter(x => x.isDirectory())
        .reduce(
            (prev, cur) => prev.then(x => _listdir(x, resolve(dir, cur.name))),
            Promise.resolve(list.concat(fileList)));
};

export const listdir = async (path : string) => {
    const pathStat = await stat(path);
    if (!pathStat.isDirectory()) { return []; }
    return _listdir([], path);
};

export const makeEntry = (startDir : string) => (list : string[]) =>
    list.reduce(
        (prev, cur) => ({...prev, [relative(startDir, cur)] : cur}),
        {} as Record<string, string>);

export const makeOutput = (entry : string) => entry.replace(/\.ts$/, '.js');

export const makeOutFileName = (rootDir : string, outDir : string) =>
    (path : string) => {
        const {dir, name} = parse(relative(rootDir, path));
        console.log(rootDir, outDir, path, dir, name, join(outDir, dir, name));
        return join(outDir, dir, name);
    };
