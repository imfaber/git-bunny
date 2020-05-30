import status from './status';
import commit from './commit';
import branch from './branch';
import checkout from './checkout';
import tag from './tag';
import add from './add';
import { runGitCmd } from './common/run-cmd';
import { GBunnyCommand } from './common/types';

const gBunnyCommand = (
    run: () => Promise<void> | void,
    help: string = ''
): GBunnyCommand =>
    ({
        run: () => run(),
        help: () => help
    } as GBunnyCommand);

export const gBunnyCommandList: {
    [key: string]: (opts: string[]) => GBunnyCommand;
} = {
    // Add
    add: (opts: string[]) =>
        gBunnyCommand(
            () => add(opts),
            '"git add" command with path selection and index support'
        ),
    a: (opts: string[]) =>
        gBunnyCommand(() => add(opts), '"git add" shorthand'),
    aa: (opts: string[]) =>
        gBunnyCommand(() => add(['-A', ...opts]), '"git add -A" shorthand'),
    au: (opts: string[]) =>
        gBunnyCommand(() => add(['-u', ...opts]), '"git add -u" shorthand'),

    // Blame
    blame: (opts: string[]) =>
        gBunnyCommand(() => runGitCmd(['blame', ...opts]), '"git blame"'),
    bl: (opts: string[]) =>
        gBunnyCommand(
            () => runGitCmd(['blame', ...opts]),
            '"git blame" shorthand'
        ),

    // Branch
    branch: (opts: string[]) => gBunnyCommand(() => branch(opts), ''),
    b: (opts: string[]) => gBunnyCommand(() => branch(opts), ''),
    ba: (opts: string[]) => gBunnyCommand(() => branch(['-a', ...opts]), ''),
    bd: (opts: string[]) => gBunnyCommand(() => branch(['-d', ...opts]), ''),
    bD: (opts: string[]) => gBunnyCommand(() => branch(['-D', ...opts]), ''),

    // Clean
    clean: (opts: string[]) =>
        gBunnyCommand(() => runGitCmd(['clean', ...opts]), ''),
    cl: (opts: string[]) =>
        gBunnyCommand(() => runGitCmd(['clean', ...opts]), ''),
    clf: (opts: string[]) =>
        gBunnyCommand(() => runGitCmd(['clean -fd', ...opts]), ''),

    // Checkout
    checkout: (opts: string[]) => gBunnyCommand(() => checkout(opts), ''),
    co: (opts: string[]) => gBunnyCommand(() => checkout(opts), ''),
    cob: (opts: string[]) => gBunnyCommand(() => checkout(['-b', ...opts]), ''),
    com: (opts: string[]) =>
        gBunnyCommand(() => checkout(['master', ...opts]), ''),

    // Commit
    commit: (opts: string[]) => gBunnyCommand(() => commit(opts), ''),
    c: (opts: string[]) => gBunnyCommand(() => commit(opts), ''),
    ca: (opts: string[]) => gBunnyCommand(() => commit(['-a', ...opts]), ''),
    ch: (opts: string[]) =>
        gBunnyCommand(() => commit(['-C HEAD', ...opts]), ''),
    cm: (opts: string[]) =>
        gBunnyCommand(() => commit(['--amend', ...opts]), ''),
    cmh: (opts: string[]) =>
        gBunnyCommand(() => commit(['--amend -C HEAD', ...opts]), ''),

    // Diff
    diff: (opts: string[]) =>
        gBunnyCommand(() => runGitCmd(['diff --', ...opts]), ''),
    d: (opts: string[]) =>
        gBunnyCommand(() => runGitCmd(['diff --', ...opts]), ''),
    dw: (opts: string[]) =>
        gBunnyCommand(() => runGitCmd(['diff --word-diff', ...opts]), ''),
    dt: (opts: string[]) =>
        gBunnyCommand(() => runGitCmd(['difftool', ...opts]), ''),
    dc: (opts: string[]) =>
        gBunnyCommand(() => runGitCmd(['diff --cached --', ...opts]), ''),

    // Fetch
    fetch: (opts: string[]) =>
        gBunnyCommand(() => runGitCmd(['fetch', ...opts]), ''),
    f: (opts: string[]) =>
        gBunnyCommand(() => runGitCmd(['fetch', ...opts]), ''),
    fa: (opts: string[]) =>
        gBunnyCommand(() => runGitCmd(['fetch --all', ...opts]), ''),

    // Log
    log: (opts: string[]) => gBunnyCommand(() => runGitCmd(['log'])),
    l: (opts: string[]) => gBunnyCommand(() => runGitCmd(['log'])),
    lg: (opts: string[]) =>
        gBunnyCommand(() =>
            runGitCmd([
                'log',
                '--graph',
                '--pretty="format:%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset"',
                '--abbrev-commit',
                ...opts
            ])
        ),

    // Merge
    merge: (opts: string[]) =>
        gBunnyCommand(() => runGitCmd(['merge', ...opts])),
    m: (opts: string[]) => gBunnyCommand(() => runGitCmd(['merge', ...opts])),
    mff: (opts: string[]) =>
        gBunnyCommand(() => runGitCmd(['merge --ff', ...opts])),
    mnff: (opts: string[]) =>
        gBunnyCommand(() => runGitCmd(['merge --no-ff', ...opts])),

    // Pull
    pull: (opts: string[]) => gBunnyCommand(() => runGitCmd(['pull', ...opts])),
    pl: (opts: string[]) => gBunnyCommand(() => runGitCmd(['pull', ...opts])),

    // Push
    push: (opts: string[]) => gBunnyCommand(() => runGitCmd(['push', ...opts])),
    ps: (opts: string[]) => gBunnyCommand(() => runGitCmd(['push', ...opts])),
    psf: (opts: string[]) =>
        gBunnyCommand(() => runGitCmd(['push -f', ...opts])),

    // Remote
    remote: (opts: string[]) =>
        gBunnyCommand(() => runGitCmd(['remote -v', ...opts])),
    r: (opts: string[]) =>
        gBunnyCommand(() => runGitCmd(['remote -v', ...opts])),

    // Rebase
    rebase: (opts: string[]) =>
        gBunnyCommand(() => runGitCmd(['rebase', ...opts])),
    rb: (opts: string[]) => gBunnyCommand(() => runGitCmd(['rebase', ...opts])),
    rba: (opts: string[]) =>
        gBunnyCommand(() => runGitCmd(['rebase --abort', ...opts])),
    rbc: (opts: string[]) =>
        gBunnyCommand(() => runGitCmd(['rebase --continue', ...opts])),

    // Remove
    rm: (opts: string[]) => gBunnyCommand(() => runGitCmd(['rm', ...opts])),

    // Reset
    reset: (opts: string[]) =>
        gBunnyCommand(() => runGitCmd(['reset --', ...opts])),
    rs: (opts: string[]) =>
        gBunnyCommand(() => runGitCmd(['reset --', ...opts])),
    rsh: (opts: string[]) =>
        gBunnyCommand(() => runGitCmd(['reset --hard', ...opts])),
    rsH: (opts: string[]) =>
        gBunnyCommand(() => runGitCmd(['reset HEAD~', ...opts])),

    // show
    show: (opts: string[]) => gBunnyCommand(() => runGitCmd(['show', ...opts])),
    sh: (opts: string[]) => gBunnyCommand(() => runGitCmd(['show', ...opts])),
    shm: (opts: string[]) =>
        gBunnyCommand(() => runGitCmd(['show --summary', ...opts])),

    // Status
    status: (opts: string[]) => gBunnyCommand(() => status(opts)),
    s: (opts: string[]) => gBunnyCommand(() => status(opts)),

    // Stash
    stash: (opts: string[]) =>
        gBunnyCommand(() => runGitCmd(['stash', ...opts])),
    st: (opts: string[]) => gBunnyCommand(() => runGitCmd(['stash', ...opts])),
    sta: (opts: string[]) =>
        gBunnyCommand(() => runGitCmd(['stash apply', ...opts])),
    stp: (opts: string[]) =>
        gBunnyCommand(() => runGitCmd(['stash pop', ...opts])),
    stl: (opts: string[]) =>
        gBunnyCommand(() => runGitCmd(['stash list', ...opts])),

    // Tag
    tag: (opts: string[]) => gBunnyCommand(() => tag(opts), ''),
    t: (opts: string[]) => gBunnyCommand(() => tag(opts), ''),
    td: (opts: string[]) => gBunnyCommand(() => tag(['-d', ...opts]), '')
} as any;

export const exitCommands = ['exit', 'quit', 'q'];
