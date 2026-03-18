const esbuild = require('esbuild');

const production = process.argv.includes('--production');
const watch = process.argv.includes('--watch');

/** @type {import('esbuild').BuildOptions} */
const buildOptions = {
    entryPoints: ['src/extension.ts'],
    bundle: true,
    outfile: 'dist/extension.js',
    external: ['vscode'],
    format: 'cjs',
    platform: 'node',
    sourcemap: !production,
    minify: production,
};

const watchPlugin = {
    name: 'watch-plugin',
    setup(build) {
        build.onStart(() => console.log('[watch] build started'));
        build.onEnd(result => {
            result.errors.forEach(({ text, location }) => {
                console.error(`✘ [ERROR] ${text}`);
                if (location) console.error(`    ${location.file}:${location.line}:${location.column}:`);
            });
            console.log('[watch] build finished');
        });
    },
};

async function main() {
    if (watch) {
        const ctx = await esbuild.context({ ...buildOptions, plugins: [watchPlugin] });
        await ctx.watch();
    } else {
        await esbuild.build(buildOptions);
        console.log('Build complete.');
    }
}

main().catch(err => {
    console.error(err);
    process.exit(1);
});
