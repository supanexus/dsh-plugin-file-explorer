/**
 * Host Typert service: filesystem operations constrained to a workspace root.
 *
 * Cordis exposes Services through a Proxy; Gateway invokes `@Remote` methods
 * with that Proxy (or a shadow) as `this`. Never touch state on the raw
 * receiver — unwrap via `symbols.original` first (same idea as Gateway's
 * `originalOf`). Do not use JS `#` private fields.
 */
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
import { mkdirSync, readdirSync, readFileSync, realpathSync, renameSync, rmdirSync, statSync, unlinkSync, writeFileSync, } from 'node:fs';
import { spawn } from 'node:child_process';
import { basename, dirname, join } from 'node:path';
import { platform as osPlatform } from 'node:os';
import { symbols } from '@deepseek-ai/cordis';
import { Remote, TypertRemoteService } from '@deepseek-ai/dsh-typert-protocol';
import { EXPLORER_FS_SERVICE, fail, } from "../shared/rpc-contract.js";
import { isEditableText } from "./content-type.js";
import { guardPath } from "./path-guard.js";
const SAMPLE_BYTES = 8192;
function isObject(value) {
    return typeof value === 'object' && value !== null;
}
/** Unwrap Cordis Proxy / shadow to the real service instance. */
function selfOf(receiver) {
    const original = Reflect.get(receiver, symbols.original);
    return (isObject(original) ? original : receiver);
}
function guardRel(self, rel) {
    return guardPath(self.root, rel, (p) => realpathSync(p));
}
function guardFail(reason) {
    if (reason === 'OUT_OF_ROOT')
        return fail('OUT_OF_ROOT', 'path escapes workspace root');
    return fail('OUT_OF_ROOT', 'absolute or invalid path rejected');
}
/**
 * Live explorer filesystem RPC. Root can be updated via `setRoot` or settings.
 */
let ExplorerFsService = (() => {
    let _classSuper = TypertRemoteService;
    let _instanceExtraInitializers = [];
    let _getRoot_decorators;
    let _setRoot_decorators;
    let _list_decorators;
    let _read_decorators;
    let _write_decorators;
    let _mkdir_decorators;
    let _rename_decorators;
    let _unlink_decorators;
    let _revealRoot_decorators;
    let _revealPath_decorators;
    return class ExplorerFsService extends _classSuper {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            _getRoot_decorators = [Remote];
            _setRoot_decorators = [Remote];
            _list_decorators = [Remote];
            _read_decorators = [Remote];
            _write_decorators = [Remote];
            _mkdir_decorators = [Remote];
            _rename_decorators = [Remote];
            _unlink_decorators = [Remote];
            _revealRoot_decorators = [Remote];
            _revealPath_decorators = [Remote];
            __esDecorate(this, null, _getRoot_decorators, { kind: "method", name: "getRoot", static: false, private: false, access: { has: obj => "getRoot" in obj, get: obj => obj.getRoot }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _setRoot_decorators, { kind: "method", name: "setRoot", static: false, private: false, access: { has: obj => "setRoot" in obj, get: obj => obj.setRoot }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _list_decorators, { kind: "method", name: "list", static: false, private: false, access: { has: obj => "list" in obj, get: obj => obj.list }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _read_decorators, { kind: "method", name: "read", static: false, private: false, access: { has: obj => "read" in obj, get: obj => obj.read }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _write_decorators, { kind: "method", name: "write", static: false, private: false, access: { has: obj => "write" in obj, get: obj => obj.write }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _mkdir_decorators, { kind: "method", name: "mkdir", static: false, private: false, access: { has: obj => "mkdir" in obj, get: obj => obj.mkdir }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _rename_decorators, { kind: "method", name: "rename", static: false, private: false, access: { has: obj => "rename" in obj, get: obj => obj.rename }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _unlink_decorators, { kind: "method", name: "unlink", static: false, private: false, access: { has: obj => "unlink" in obj, get: obj => obj.unlink }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _revealRoot_decorators, { kind: "method", name: "revealRoot", static: false, private: false, access: { has: obj => "revealRoot" in obj, get: obj => obj.revealRoot }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _revealPath_decorators, { kind: "method", name: "revealPath", static: false, private: false, access: { has: obj => "revealPath" in obj, get: obj => obj.revealPath }, metadata: _metadata }, null, _instanceExtraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        /** Absolute workspace root (public: Cordis Proxy must read/write freely). */
        root = __runInitializers(this, _instanceExtraInitializers);
        /** Whether the current root was pinned from a session cwd. */
        pinned = false;
        constructor(ctx, initialRoot) {
            super(ctx, EXPLORER_FS_SERVICE);
            this.root = initialRoot;
        }
        /** Absolute root currently in effect. */
        getRootPath() {
            return this.root;
        }
        /** Whether the current root was pinned from a session cwd. */
        isPinned() {
            return this.pinned;
        }
        /**
         * Apply a settings-driven root only when not session-pinned.
         */
        applySettingsRoot(root) {
            if (this.pinned)
                return;
            if (root.trim() === '')
                return;
            this.root = root;
        }
        /** Clear pin and fall back to the given settings root. */
        clearPin(fallbackRoot) {
            this.pinned = false;
            if (fallbackRoot.trim() !== '')
                this.root = fallbackRoot;
        }
        async getRoot() {
            const self = selfOf(this);
            return { ok: true, root: self.root };
        }
        async setRoot(root) {
            const self = selfOf(this);
            const next = root.trim();
            if (next === '')
                return fail('IO', 'root must be a non-empty absolute directory');
            try {
                const st = statSync(next);
                if (!st.isDirectory())
                    return fail('IO', 'root is not a directory');
                self.root = realpathSync(next);
                self.pinned = true;
                return { ok: true, root: self.root };
            }
            catch (error) {
                return fail('IO', error instanceof Error ? error.message : 'cannot set root');
            }
        }
        async list(path) {
            const self = selfOf(this);
            const guarded = guardRel(self, path);
            if (!guarded.ok)
                return guardFail(guarded.reason);
            try {
                const st = statSync(guarded.absolute);
                if (!st.isDirectory())
                    return fail('IO', 'not a directory');
                const names = readdirSync(guarded.absolute);
                const entries = [];
                for (const name of names) {
                    if (name === '.DS_Store')
                        continue;
                    const childAbs = join(guarded.absolute, name);
                    const childRel = guarded.relative === '' ? name : `${guarded.relative}/${name}`;
                    try {
                        const childSt = statSync(childAbs);
                        entries.push({
                            name,
                            path: childRel.replaceAll('\\', '/'),
                            kind: childSt.isDirectory() ? 'dir' : 'file',
                            ...(childSt.isFile() ? { size: childSt.size } : {}),
                        });
                    }
                    catch {
                        // skip unreadable entries
                    }
                }
                entries.sort((a, b) => {
                    if (a.kind !== b.kind)
                        return a.kind === 'dir' ? -1 : 1;
                    return a.name.localeCompare(b.name);
                });
                return { ok: true, entries };
            }
            catch (error) {
                if (isNotFound(error))
                    return fail('NOT_FOUND', 'path not found');
                return fail('IO', error instanceof Error ? error.message : 'list failed');
            }
        }
        async read(path) {
            const self = selfOf(this);
            const guarded = guardRel(self, path);
            if (!guarded.ok)
                return guardFail(guarded.reason);
            try {
                const st = statSync(guarded.absolute);
                if (st.isDirectory())
                    return fail('IS_DIR', 'path is a directory');
                const buf = readFileSync(guarded.absolute);
                const sample = buf.subarray(0, SAMPLE_BYTES);
                if (!isEditableText(guarded.absolute, sample)) {
                    return fail('IS_BINARY', 'file looks binary and cannot be edited');
                }
                return { ok: true, content: buf.toString('utf8') };
            }
            catch (error) {
                if (isNotFound(error))
                    return fail('NOT_FOUND', 'path not found');
                return fail('IO', error instanceof Error ? error.message : 'read failed');
            }
        }
        async write(path, content) {
            const self = selfOf(this);
            const guarded = guardRel(self, path);
            if (!guarded.ok)
                return guardFail(guarded.reason);
            try {
                try {
                    const st = statSync(guarded.absolute);
                    if (st.isDirectory())
                        return fail('IS_DIR', 'path is a directory');
                }
                catch (error) {
                    if (!isNotFound(error)) {
                        return fail('IO', error instanceof Error ? error.message : 'stat failed');
                    }
                }
                writeFileSync(guarded.absolute, content, 'utf8');
                return { ok: true };
            }
            catch (error) {
                return fail('IO', error instanceof Error ? error.message : 'write failed');
            }
        }
        async mkdir(path) {
            const self = selfOf(this);
            const guarded = guardRel(self, path);
            if (!guarded.ok)
                return guardFail(guarded.reason);
            try {
                if (exists(guarded.absolute))
                    return fail('EXISTS', 'path already exists');
                mkdirSync(guarded.absolute, { recursive: false });
                return { ok: true };
            }
            catch (error) {
                if (isExists(error))
                    return fail('EXISTS', 'path already exists');
                return fail('IO', error instanceof Error ? error.message : 'mkdir failed');
            }
        }
        async rename(from, to) {
            const self = selfOf(this);
            const fromG = guardRel(self, from);
            if (!fromG.ok)
                return guardFail(fromG.reason);
            const toG = guardRel(self, to);
            if (!toG.ok)
                return guardFail(toG.reason);
            try {
                if (!exists(fromG.absolute))
                    return fail('NOT_FOUND', 'source not found');
                if (exists(toG.absolute))
                    return fail('EXISTS', 'destination already exists');
                renameSync(fromG.absolute, toG.absolute);
                return { ok: true };
            }
            catch (error) {
                if (isNotFound(error))
                    return fail('NOT_FOUND', 'source not found');
                return fail('IO', error instanceof Error ? error.message : 'rename failed');
            }
        }
        /** Named `unlink` — Client remote forbids `remove` (Cordis Service.prototype). */
        async unlink(path) {
            const self = selfOf(this);
            const guarded = guardRel(self, path);
            if (!guarded.ok)
                return guardFail(guarded.reason);
            if (guarded.relative === '')
                return fail('IO', 'cannot remove workspace root');
            try {
                const st = statSync(guarded.absolute);
                if (st.isDirectory()) {
                    const children = readdirSync(guarded.absolute);
                    if (children.length > 0)
                        return fail('NOT_EMPTY', 'directory is not empty');
                    rmdirSync(guarded.absolute);
                }
                else {
                    unlinkSync(guarded.absolute);
                }
                return { ok: true };
            }
            catch (error) {
                if (isNotFound(error))
                    return fail('NOT_FOUND', 'path not found');
                return fail('IO', error instanceof Error ? error.message : 'unlink failed');
            }
        }
        /** Open the workspace root in the OS file manager (Finder / Explorer / xdg-open). */
        async revealRoot() {
            const self = selfOf(this);
            try {
                await openInFileManager(self.root);
                return { ok: true };
            }
            catch (error) {
                return fail('IO', error instanceof Error ? error.message : 'cannot open file manager');
            }
        }
        /**
         * Open a workspace-relative path in the OS file manager.
         * Directories open as folders; files reveal their parent directory.
         */
        async revealPath(path) {
            const self = selfOf(this);
            const guarded = guardRel(self, path);
            if (!guarded.ok)
                return guardFail(guarded.reason);
            try {
                const st = statSync(guarded.absolute);
                const target = st.isDirectory()
                    ? guarded.absolute
                    : (dirname(guarded.absolute) || guarded.absolute);
                await openInFileManager(target);
                return { ok: true };
            }
            catch (error) {
                if (isNotFound(error))
                    return fail('NOT_FOUND', 'path not found');
                return fail('IO', error instanceof Error ? error.message : 'cannot open file manager');
            }
        }
    };
})();
export { ExplorerFsService };
function openInFileManager(absolute) {
    return new Promise((resolve, reject) => {
        const platform = osPlatform();
        let child;
        if (platform === 'darwin') {
            child = spawn('open', [absolute], { stdio: 'ignore', detached: true });
        }
        else if (platform === 'win32') {
            child = spawn('explorer', [absolute], { stdio: 'ignore', detached: true });
        }
        else {
            child = spawn('xdg-open', [absolute], { stdio: 'ignore', detached: true });
        }
        child.on('error', reject);
        child.unref();
        // Do not wait for the GUI app to exit — spawn success is enough.
        resolve();
    });
}
function exists(absolute) {
    try {
        statSync(absolute);
        return true;
    }
    catch {
        return false;
    }
}
function isNotFound(error) {
    return typeof error === 'object' && error !== null && 'code' in error
        && error.code === 'ENOENT';
}
function isExists(error) {
    return typeof error === 'object' && error !== null && 'code' in error
        && error.code === 'EEXIST';
}
/** Basename helper for rename UI. */
export function entryBasename(relPath) {
    return basename(relPath);
}
/** Parent relative path of a relative file path. */
export function entryParent(relPath) {
    const parent = dirname(relPath).replaceAll('\\', '/');
    return parent === '.' ? '' : parent;
}
//# sourceMappingURL=fs-service.js.map