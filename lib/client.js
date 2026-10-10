window.__ModuleLoader__.load({
	id: "@supanexus/dsh-plugin-file-explorer",
	factory: (require) => {
		var module = { exports: {} };
		var exports = module.exports;
		Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
		let react_jsx_runtime = require("react/jsx-runtime");
		let react = require("react");
		//#region lib/types/shared/settings-contract.js
		/** Settings namespace contract visible to both Host and Client. */
		/**
		* Profile entry id from `cordis.patch.yml` (`supanexus-file-explorer`).
		* dsh ≥ 0.1.7 projects volatile Config under this id into `configForms`.
		*/
		const FILE_EXPLORER_SETTINGS_NS = "supanexus-file-explorer";
		//#endregion
		//#region ../../../../engine/node_modules/.pnpm/zod@4.4.3/node_modules/zod/v4/core/core.js
		var _a$1;
		function $constructor(name, initializer, params) {
			function init(inst, def) {
				if (!inst._zod) Object.defineProperty(inst, "_zod", {
					value: {
						def,
						constr: _,
						traits: /* @__PURE__ */ new Set()
					},
					enumerable: false
				});
				if (inst._zod.traits.has(name)) return;
				inst._zod.traits.add(name);
				initializer(inst, def);
				const proto = _.prototype;
				const keys = Object.keys(proto);
				for (let i = 0; i < keys.length; i++) {
					const k = keys[i];
					if (!(k in inst)) inst[k] = proto[k].bind(inst);
				}
			}
			const Parent = params?.Parent ?? Object;
			class Definition extends Parent {}
			Object.defineProperty(Definition, "name", { value: name });
			function _(def) {
				var _a;
				const inst = params?.Parent ? new Definition() : this;
				init(inst, def);
				(_a = inst._zod).deferred ?? (_a.deferred = []);
				for (const fn of inst._zod.deferred) fn();
				return inst;
			}
			Object.defineProperty(_, "init", { value: init });
			Object.defineProperty(_, Symbol.hasInstance, { value: (inst) => {
				if (params?.Parent && inst instanceof params.Parent) return true;
				return inst?._zod?.traits?.has(name);
			} });
			Object.defineProperty(_, "name", { value: name });
			return _;
		}
		var $ZodAsyncError = class extends Error {
			constructor() {
				super(`Encountered Promise during synchronous parse. Use .parseAsync() instead.`);
			}
		};
		var $ZodEncodeError = class extends Error {
			constructor(name) {
				super(`Encountered unidirectional transform during encode: ${name}`);
				this.name = "ZodEncodeError";
			}
		};
		(_a$1 = globalThis).__zod_globalConfig ?? (_a$1.__zod_globalConfig = {});
		const globalConfig = globalThis.__zod_globalConfig;
		function config(newConfig) {
			if (newConfig) Object.assign(globalConfig, newConfig);
			return globalConfig;
		}
		//#endregion
		//#region ../../../../engine/node_modules/.pnpm/zod@4.4.3/node_modules/zod/v4/core/util.js
		function getEnumValues(entries) {
			const numericValues = Object.values(entries).filter((v) => typeof v === "number");
			return Object.entries(entries).filter(([k, _]) => numericValues.indexOf(+k) === -1).map(([_, v]) => v);
		}
		function jsonStringifyReplacer(_, value) {
			if (typeof value === "bigint") return value.toString();
			return value;
		}
		function cached(getter) {
			return { get value() {
				{
					const value = getter();
					Object.defineProperty(this, "value", { value });
					return value;
				}
				throw new Error("cached value already set");
			} };
		}
		function nullish(input) {
			return input === null || input === void 0;
		}
		function cleanRegex(source) {
			const start = source.startsWith("^") ? 1 : 0;
			const end = source.endsWith("$") ? source.length - 1 : source.length;
			return source.slice(start, end);
		}
		function floatSafeRemainder(val, step) {
			const ratio = val / step;
			const roundedRatio = Math.round(ratio);
			const tolerance = Number.EPSILON * Math.max(Math.abs(ratio), 1);
			if (Math.abs(ratio - roundedRatio) < tolerance) return 0;
			return ratio - roundedRatio;
		}
		const EVALUATING = /* @__PURE__*/ Symbol("evaluating");
		function defineLazy(object, key, getter) {
			let value = void 0;
			Object.defineProperty(object, key, {
				get() {
					if (value === EVALUATING) return;
					if (value === void 0) {
						value = EVALUATING;
						value = getter();
					}
					return value;
				},
				set(v) {
					Object.defineProperty(object, key, { value: v });
				},
				configurable: true
			});
		}
		function assignProp(target, prop, value) {
			Object.defineProperty(target, prop, {
				value,
				writable: true,
				enumerable: true,
				configurable: true
			});
		}
		function mergeDefs(...defs) {
			const mergedDescriptors = {};
			for (const def of defs) {
				const descriptors = Object.getOwnPropertyDescriptors(def);
				Object.assign(mergedDescriptors, descriptors);
			}
			return Object.defineProperties({}, mergedDescriptors);
		}
		function esc(str) {
			return JSON.stringify(str);
		}
		function slugify(input) {
			return input.toLowerCase().trim().replace(/[^\w\s-]/g, "").replace(/[\s_-]+/g, "-").replace(/^-+|-+$/g, "");
		}
		const captureStackTrace = "captureStackTrace" in Error ? Error.captureStackTrace : (..._args) => {};
		function isObject(data) {
			return typeof data === "object" && data !== null && !Array.isArray(data);
		}
		const allowsEval = /* @__PURE__*/ cached(() => {
			if (globalConfig.jitless) return false;
			if (typeof navigator !== "undefined" && navigator?.userAgent?.includes("Cloudflare")) return false;
			try {
				new Function("");
				return true;
			} catch (_) {
				return false;
			}
		});
		function isPlainObject(o) {
			if (isObject(o) === false) return false;
			const ctor = o.constructor;
			if (ctor === void 0) return true;
			if (typeof ctor !== "function") return true;
			const prot = ctor.prototype;
			if (isObject(prot) === false) return false;
			if (Object.prototype.hasOwnProperty.call(prot, "isPrototypeOf") === false) return false;
			return true;
		}
		function shallowClone(o) {
			if (isPlainObject(o)) return { ...o };
			if (Array.isArray(o)) return [...o];
			if (o instanceof Map) return new Map(o);
			if (o instanceof Set) return new Set(o);
			return o;
		}
		const propertyKeyTypes = /* @__PURE__*/ new Set([
			"string",
			"number",
			"symbol"
		]);
		function escapeRegex(str) {
			return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
		}
		function clone(inst, def, params) {
			const cl = new inst._zod.constr(def ?? inst._zod.def);
			if (!def || params?.parent) cl._zod.parent = inst;
			return cl;
		}
		function normalizeParams(_params) {
			const params = _params;
			if (!params) return {};
			if (typeof params === "string") return { error: () => params };
			if (params?.message !== void 0) {
				if (params?.error !== void 0) throw new Error("Cannot specify both `message` and `error` params");
				params.error = params.message;
			}
			delete params.message;
			if (typeof params.error === "string") return {
				...params,
				error: () => params.error
			};
			return params;
		}
		function optionalKeys(shape) {
			return Object.keys(shape).filter((k) => {
				return shape[k]._zod.optin === "optional" && shape[k]._zod.optout === "optional";
			});
		}
		const NUMBER_FORMAT_RANGES = {
			safeint: [Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER],
			int32: [-2147483648, 2147483647],
			uint32: [0, 4294967295],
			float32: [-34028234663852886e22, 34028234663852886e22],
			float64: [-Number.MAX_VALUE, Number.MAX_VALUE]
		};
		function pick(schema, mask) {
			const currDef = schema._zod.def;
			const checks = currDef.checks;
			if (checks && checks.length > 0) throw new Error(".pick() cannot be used on object schemas containing refinements");
			return clone(schema, mergeDefs(schema._zod.def, {
				get shape() {
					const newShape = {};
					for (const key in mask) {
						if (!(key in currDef.shape)) throw new Error(`Unrecognized key: "${key}"`);
						if (!mask[key]) continue;
						newShape[key] = currDef.shape[key];
					}
					assignProp(this, "shape", newShape);
					return newShape;
				},
				checks: []
			}));
		}
		function omit(schema, mask) {
			const currDef = schema._zod.def;
			const checks = currDef.checks;
			if (checks && checks.length > 0) throw new Error(".omit() cannot be used on object schemas containing refinements");
			return clone(schema, mergeDefs(schema._zod.def, {
				get shape() {
					const newShape = { ...schema._zod.def.shape };
					for (const key in mask) {
						if (!(key in currDef.shape)) throw new Error(`Unrecognized key: "${key}"`);
						if (!mask[key]) continue;
						delete newShape[key];
					}
					assignProp(this, "shape", newShape);
					return newShape;
				},
				checks: []
			}));
		}
		function extend(schema, shape) {
			if (!isPlainObject(shape)) throw new Error("Invalid input to extend: expected a plain object");
			const checks = schema._zod.def.checks;
			if (checks && checks.length > 0) {
				const existingShape = schema._zod.def.shape;
				for (const key in shape) if (Object.getOwnPropertyDescriptor(existingShape, key) !== void 0) throw new Error("Cannot overwrite keys on object schemas containing refinements. Use `.safeExtend()` instead.");
			}
			return clone(schema, mergeDefs(schema._zod.def, { get shape() {
				const _shape = {
					...schema._zod.def.shape,
					...shape
				};
				assignProp(this, "shape", _shape);
				return _shape;
			} }));
		}
		function safeExtend(schema, shape) {
			if (!isPlainObject(shape)) throw new Error("Invalid input to safeExtend: expected a plain object");
			return clone(schema, mergeDefs(schema._zod.def, { get shape() {
				const _shape = {
					...schema._zod.def.shape,
					...shape
				};
				assignProp(this, "shape", _shape);
				return _shape;
			} }));
		}
		function merge(a, b) {
			if (a._zod.def.checks?.length) throw new Error(".merge() cannot be used on object schemas containing refinements. Use .safeExtend() instead.");
			return clone(a, mergeDefs(a._zod.def, {
				get shape() {
					const _shape = {
						...a._zod.def.shape,
						...b._zod.def.shape
					};
					assignProp(this, "shape", _shape);
					return _shape;
				},
				get catchall() {
					return b._zod.def.catchall;
				},
				checks: b._zod.def.checks ?? []
			}));
		}
		function partial(Class, schema, mask) {
			const checks = schema._zod.def.checks;
			if (checks && checks.length > 0) throw new Error(".partial() cannot be used on object schemas containing refinements");
			return clone(schema, mergeDefs(schema._zod.def, {
				get shape() {
					const oldShape = schema._zod.def.shape;
					const shape = { ...oldShape };
					if (mask) for (const key in mask) {
						if (!(key in oldShape)) throw new Error(`Unrecognized key: "${key}"`);
						if (!mask[key]) continue;
						shape[key] = Class ? new Class({
							type: "optional",
							innerType: oldShape[key]
						}) : oldShape[key];
					}
					else for (const key in oldShape) shape[key] = Class ? new Class({
						type: "optional",
						innerType: oldShape[key]
					}) : oldShape[key];
					assignProp(this, "shape", shape);
					return shape;
				},
				checks: []
			}));
		}
		function required(Class, schema, mask) {
			return clone(schema, mergeDefs(schema._zod.def, { get shape() {
				const oldShape = schema._zod.def.shape;
				const shape = { ...oldShape };
				if (mask) for (const key in mask) {
					if (!(key in shape)) throw new Error(`Unrecognized key: "${key}"`);
					if (!mask[key]) continue;
					shape[key] = new Class({
						type: "nonoptional",
						innerType: oldShape[key]
					});
				}
				else for (const key in oldShape) shape[key] = new Class({
					type: "nonoptional",
					innerType: oldShape[key]
				});
				assignProp(this, "shape", shape);
				return shape;
			} }));
		}
		function aborted(x, startIndex = 0) {
			if (x.aborted === true) return true;
			for (let i = startIndex; i < x.issues.length; i++) if (x.issues[i]?.continue !== true) return true;
			return false;
		}
		function explicitlyAborted(x, startIndex = 0) {
			if (x.aborted === true) return true;
			for (let i = startIndex; i < x.issues.length; i++) if (x.issues[i]?.continue === false) return true;
			return false;
		}
		function prefixIssues(path, issues) {
			return issues.map((iss) => {
				var _a;
				(_a = iss).path ?? (_a.path = []);
				iss.path.unshift(path);
				return iss;
			});
		}
		function unwrapMessage(message) {
			return typeof message === "string" ? message : message?.message;
		}
		function finalizeIssue(iss, ctx, config) {
			const message = iss.message ? iss.message : unwrapMessage(iss.inst?._zod.def?.error?.(iss)) ?? unwrapMessage(ctx?.error?.(iss)) ?? unwrapMessage(config.customError?.(iss)) ?? unwrapMessage(config.localeError?.(iss)) ?? "Invalid input";
			const { inst: _inst, continue: _continue, input: _input, ...rest } = iss;
			rest.path ?? (rest.path = []);
			rest.message = message;
			if (ctx?.reportInput) rest.input = _input;
			return rest;
		}
		function getLengthableOrigin(input) {
			if (Array.isArray(input)) return "array";
			if (typeof input === "string") return "string";
			return "unknown";
		}
		function issue(...args) {
			const [iss, input, inst] = args;
			if (typeof iss === "string") return {
				message: iss,
				code: "custom",
				input,
				inst
			};
			return { ...iss };
		}
		//#endregion
		//#region ../../../../engine/node_modules/.pnpm/zod@4.4.3/node_modules/zod/v4/core/errors.js
		const initializer$1 = (inst, def) => {
			inst.name = "$ZodError";
			Object.defineProperty(inst, "_zod", {
				value: inst._zod,
				enumerable: false
			});
			Object.defineProperty(inst, "issues", {
				value: def,
				enumerable: false
			});
			inst.message = JSON.stringify(def, jsonStringifyReplacer, 2);
			Object.defineProperty(inst, "toString", {
				value: () => inst.message,
				enumerable: false
			});
		};
		const $ZodError = $constructor("$ZodError", initializer$1);
		const $ZodRealError = $constructor("$ZodError", initializer$1, { Parent: Error });
		function flattenError(error, mapper = (issue) => issue.message) {
			const fieldErrors = {};
			const formErrors = [];
			for (const sub of error.issues) if (sub.path.length > 0) {
				fieldErrors[sub.path[0]] = fieldErrors[sub.path[0]] || [];
				fieldErrors[sub.path[0]].push(mapper(sub));
			} else formErrors.push(mapper(sub));
			return {
				formErrors,
				fieldErrors
			};
		}
		function formatError(error, mapper = (issue) => issue.message) {
			const fieldErrors = { _errors: [] };
			const processError = (error, path = []) => {
				for (const issue of error.issues) if (issue.code === "invalid_union" && issue.errors.length) issue.errors.map((issues) => processError({ issues }, [...path, ...issue.path]));
				else if (issue.code === "invalid_key") processError({ issues: issue.issues }, [...path, ...issue.path]);
				else if (issue.code === "invalid_element") processError({ issues: issue.issues }, [...path, ...issue.path]);
				else {
					const fullpath = [...path, ...issue.path];
					if (fullpath.length === 0) fieldErrors._errors.push(mapper(issue));
					else {
						let curr = fieldErrors;
						let i = 0;
						while (i < fullpath.length) {
							const el = fullpath[i];
							if (!(i === fullpath.length - 1)) curr[el] = curr[el] || { _errors: [] };
							else {
								curr[el] = curr[el] || { _errors: [] };
								curr[el]._errors.push(mapper(issue));
							}
							curr = curr[el];
							i++;
						}
					}
				}
			};
			processError(error);
			return fieldErrors;
		}
		//#endregion
		//#region ../../../../engine/node_modules/.pnpm/zod@4.4.3/node_modules/zod/v4/core/parse.js
		const _parse = (_Err) => (schema, value, _ctx, _params) => {
			const ctx = _ctx ? {
				..._ctx,
				async: false
			} : { async: false };
			const result = schema._zod.run({
				value,
				issues: []
			}, ctx);
			if (result instanceof Promise) throw new $ZodAsyncError();
			if (result.issues.length) {
				const e = new ((_params?.Err) ?? _Err)(result.issues.map((iss) => finalizeIssue(iss, ctx, config())));
				captureStackTrace(e, _params?.callee);
				throw e;
			}
			return result.value;
		};
		const _parseAsync = (_Err) => async (schema, value, _ctx, params) => {
			const ctx = _ctx ? {
				..._ctx,
				async: true
			} : { async: true };
			let result = schema._zod.run({
				value,
				issues: []
			}, ctx);
			if (result instanceof Promise) result = await result;
			if (result.issues.length) {
				const e = new ((params?.Err) ?? _Err)(result.issues.map((iss) => finalizeIssue(iss, ctx, config())));
				captureStackTrace(e, params?.callee);
				throw e;
			}
			return result.value;
		};
		const _safeParse = (_Err) => (schema, value, _ctx) => {
			const ctx = _ctx ? {
				..._ctx,
				async: false
			} : { async: false };
			const result = schema._zod.run({
				value,
				issues: []
			}, ctx);
			if (result instanceof Promise) throw new $ZodAsyncError();
			return result.issues.length ? {
				success: false,
				error: new (_Err ?? $ZodError)(result.issues.map((iss) => finalizeIssue(iss, ctx, config())))
			} : {
				success: true,
				data: result.value
			};
		};
		const safeParse$1 = /* @__PURE__*/ _safeParse($ZodRealError);
		const _safeParseAsync = (_Err) => async (schema, value, _ctx) => {
			const ctx = _ctx ? {
				..._ctx,
				async: true
			} : { async: true };
			let result = schema._zod.run({
				value,
				issues: []
			}, ctx);
			if (result instanceof Promise) result = await result;
			return result.issues.length ? {
				success: false,
				error: new _Err(result.issues.map((iss) => finalizeIssue(iss, ctx, config())))
			} : {
				success: true,
				data: result.value
			};
		};
		const safeParseAsync$1 = /* @__PURE__*/ _safeParseAsync($ZodRealError);
		const _encode = (_Err) => (schema, value, _ctx) => {
			const ctx = _ctx ? {
				..._ctx,
				direction: "backward"
			} : { direction: "backward" };
			return _parse(_Err)(schema, value, ctx);
		};
		const _decode = (_Err) => (schema, value, _ctx) => {
			return _parse(_Err)(schema, value, _ctx);
		};
		const _encodeAsync = (_Err) => async (schema, value, _ctx) => {
			const ctx = _ctx ? {
				..._ctx,
				direction: "backward"
			} : { direction: "backward" };
			return _parseAsync(_Err)(schema, value, ctx);
		};
		const _decodeAsync = (_Err) => async (schema, value, _ctx) => {
			return _parseAsync(_Err)(schema, value, _ctx);
		};
		const _safeEncode = (_Err) => (schema, value, _ctx) => {
			const ctx = _ctx ? {
				..._ctx,
				direction: "backward"
			} : { direction: "backward" };
			return _safeParse(_Err)(schema, value, ctx);
		};
		const _safeDecode = (_Err) => (schema, value, _ctx) => {
			return _safeParse(_Err)(schema, value, _ctx);
		};
		const _safeEncodeAsync = (_Err) => async (schema, value, _ctx) => {
			const ctx = _ctx ? {
				..._ctx,
				direction: "backward"
			} : { direction: "backward" };
			return _safeParseAsync(_Err)(schema, value, ctx);
		};
		const _safeDecodeAsync = (_Err) => async (schema, value, _ctx) => {
			return _safeParseAsync(_Err)(schema, value, _ctx);
		};
		//#endregion
		//#region ../../../../engine/node_modules/.pnpm/zod@4.4.3/node_modules/zod/v4/core/regexes.js
		/**
		* @deprecated CUID v1 is deprecated by its authors due to information leakage
		* (timestamps embedded in the id). Use {@link cuid2} instead.
		* See https://github.com/paralleldrive/cuid.
		*/
		const cuid = /^[cC][0-9a-z]{6,}$/;
		const cuid2 = /^[0-9a-z]+$/;
		const ulid = /^[0-9A-HJKMNP-TV-Za-hjkmnp-tv-z]{26}$/;
		const xid = /^[0-9a-vA-V]{20}$/;
		const ksuid = /^[A-Za-z0-9]{27}$/;
		const nanoid = /^[a-zA-Z0-9_-]{21}$/;
		/** ISO 8601-1 duration regex. Does not support the 8601-2 extensions like negative durations or fractional/negative components. */
		const duration$1 = /^P(?:(\d+W)|(?!.*W)(?=\d|T\d)(\d+Y)?(\d+M)?(\d+D)?(T(?=\d)(\d+H)?(\d+M)?(\d+([.,]\d+)?S)?)?)$/;
		/** A regex for any UUID-like identifier: 8-4-4-4-12 hex pattern */
		const guid = /^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12})$/;
		/** Returns a regex for validating an RFC 9562/4122 UUID.
		*
		* @param version Optionally specify a version 1-8. If no version is specified, all versions are supported. */
		const uuid = (version) => {
			if (!version) return /^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$/;
			return new RegExp(`^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-${version}[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12})$`);
		};
		/** Practical email validation */
		const email = /^(?!\.)(?!.*\.\.)([A-Za-z0-9_'+\-\.]*)[A-Za-z0-9_+-]@([A-Za-z0-9][A-Za-z0-9\-]*\.)+[A-Za-z]{2,}$/;
		const _emoji$1 = `^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$`;
		function emoji() {
			return new RegExp(_emoji$1, "u");
		}
		const ipv4 = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/;
		const ipv6 = /^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:))$/;
		const cidrv4 = /^((25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/([0-9]|[1-2][0-9]|3[0-2])$/;
		const cidrv6 = /^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|::|([0-9a-fA-F]{1,4})?::([0-9a-fA-F]{1,4}:?){0,6})\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/;
		const base64 = /^$|^(?:[0-9a-zA-Z+/]{4})*(?:(?:[0-9a-zA-Z+/]{2}==)|(?:[0-9a-zA-Z+/]{3}=))?$/;
		const base64url = /^[A-Za-z0-9_-]*$/;
		const httpProtocol = /^https?$/;
		const e164 = /^\+[1-9]\d{6,14}$/;
		const dateSource = `(?:(?:\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\\d|30)|(?:02)-(?:0[1-9]|1\\d|2[0-8])))`;
		const date$1 = /*@__PURE__*/ new RegExp(`^${dateSource}$`);
		function timeSource(args) {
			const hhmm = `(?:[01]\\d|2[0-3]):[0-5]\\d`;
			return typeof args.precision === "number" ? args.precision === -1 ? `${hhmm}` : args.precision === 0 ? `${hhmm}:[0-5]\\d` : `${hhmm}:[0-5]\\d\\.\\d{${args.precision}}` : `${hhmm}(?::[0-5]\\d(?:\\.\\d+)?)?`;
		}
		function time$1(args) {
			return new RegExp(`^${timeSource(args)}$`);
		}
		function datetime$1(args) {
			const time = timeSource({ precision: args.precision });
			const opts = ["Z"];
			if (args.local) opts.push("");
			if (args.offset) opts.push(`([+-](?:[01]\\d|2[0-3]):[0-5]\\d)`);
			const timeRegex = `${time}(?:${opts.join("|")})`;
			return new RegExp(`^${dateSource}T(?:${timeRegex})$`);
		}
		const string$1 = (params) => {
			const regex = params ? `[\\s\\S]{${params?.minimum ?? 0},${params?.maximum ?? ""}}` : `[\\s\\S]*`;
			return new RegExp(`^${regex}$`);
		};
		const integer = /^-?\d+$/;
		const number$1 = /^-?\d+(?:\.\d+)?$/;
		const lowercase = /^[^A-Z]*$/;
		const uppercase = /^[^a-z]*$/;
		//#endregion
		//#region ../../../../engine/node_modules/.pnpm/zod@4.4.3/node_modules/zod/v4/core/checks.js
		const $ZodCheck = /*@__PURE__*/ $constructor("$ZodCheck", (inst, def) => {
			var _a;
			inst._zod ?? (inst._zod = {});
			inst._zod.def = def;
			(_a = inst._zod).onattach ?? (_a.onattach = []);
		});
		const numericOriginMap = {
			number: "number",
			bigint: "bigint",
			object: "date"
		};
		const $ZodCheckLessThan = /*@__PURE__*/ $constructor("$ZodCheckLessThan", (inst, def) => {
			$ZodCheck.init(inst, def);
			const origin = numericOriginMap[typeof def.value];
			inst._zod.onattach.push((inst) => {
				const bag = inst._zod.bag;
				const curr = (def.inclusive ? bag.maximum : bag.exclusiveMaximum) ?? Number.POSITIVE_INFINITY;
				if (def.value < curr) if (def.inclusive) bag.maximum = def.value;
				else bag.exclusiveMaximum = def.value;
			});
			inst._zod.check = (payload) => {
				if (def.inclusive ? payload.value <= def.value : payload.value < def.value) return;
				payload.issues.push({
					origin,
					code: "too_big",
					maximum: typeof def.value === "object" ? def.value.getTime() : def.value,
					input: payload.value,
					inclusive: def.inclusive,
					inst,
					continue: !def.abort
				});
			};
		});
		const $ZodCheckGreaterThan = /*@__PURE__*/ $constructor("$ZodCheckGreaterThan", (inst, def) => {
			$ZodCheck.init(inst, def);
			const origin = numericOriginMap[typeof def.value];
			inst._zod.onattach.push((inst) => {
				const bag = inst._zod.bag;
				const curr = (def.inclusive ? bag.minimum : bag.exclusiveMinimum) ?? Number.NEGATIVE_INFINITY;
				if (def.value > curr) if (def.inclusive) bag.minimum = def.value;
				else bag.exclusiveMinimum = def.value;
			});
			inst._zod.check = (payload) => {
				if (def.inclusive ? payload.value >= def.value : payload.value > def.value) return;
				payload.issues.push({
					origin,
					code: "too_small",
					minimum: typeof def.value === "object" ? def.value.getTime() : def.value,
					input: payload.value,
					inclusive: def.inclusive,
					inst,
					continue: !def.abort
				});
			};
		});
		const $ZodCheckMultipleOf = /*@__PURE__*/ $constructor("$ZodCheckMultipleOf", (inst, def) => {
			$ZodCheck.init(inst, def);
			inst._zod.onattach.push((inst) => {
				var _a;
				(_a = inst._zod.bag).multipleOf ?? (_a.multipleOf = def.value);
			});
			inst._zod.check = (payload) => {
				if (typeof payload.value !== typeof def.value) throw new Error("Cannot mix number and bigint in multiple_of check.");
				if (typeof payload.value === "bigint" ? payload.value % def.value === BigInt(0) : floatSafeRemainder(payload.value, def.value) === 0) return;
				payload.issues.push({
					origin: typeof payload.value,
					code: "not_multiple_of",
					divisor: def.value,
					input: payload.value,
					inst,
					continue: !def.abort
				});
			};
		});
		const $ZodCheckNumberFormat = /*@__PURE__*/ $constructor("$ZodCheckNumberFormat", (inst, def) => {
			$ZodCheck.init(inst, def);
			def.format = def.format || "float64";
			const isInt = def.format?.includes("int");
			const origin = isInt ? "int" : "number";
			const [minimum, maximum] = NUMBER_FORMAT_RANGES[def.format];
			inst._zod.onattach.push((inst) => {
				const bag = inst._zod.bag;
				bag.format = def.format;
				bag.minimum = minimum;
				bag.maximum = maximum;
				if (isInt) bag.pattern = integer;
			});
			inst._zod.check = (payload) => {
				const input = payload.value;
				if (isInt) {
					if (!Number.isInteger(input)) {
						payload.issues.push({
							expected: origin,
							format: def.format,
							code: "invalid_type",
							continue: false,
							input,
							inst
						});
						return;
					}
					if (!Number.isSafeInteger(input)) {
						if (input > 0) payload.issues.push({
							input,
							code: "too_big",
							maximum: Number.MAX_SAFE_INTEGER,
							note: "Integers must be within the safe integer range.",
							inst,
							origin,
							inclusive: true,
							continue: !def.abort
						});
						else payload.issues.push({
							input,
							code: "too_small",
							minimum: Number.MIN_SAFE_INTEGER,
							note: "Integers must be within the safe integer range.",
							inst,
							origin,
							inclusive: true,
							continue: !def.abort
						});
						return;
					}
				}
				if (input < minimum) payload.issues.push({
					origin: "number",
					input,
					code: "too_small",
					minimum,
					inclusive: true,
					inst,
					continue: !def.abort
				});
				if (input > maximum) payload.issues.push({
					origin: "number",
					input,
					code: "too_big",
					maximum,
					inclusive: true,
					inst,
					continue: !def.abort
				});
			};
		});
		const $ZodCheckMaxLength = /*@__PURE__*/ $constructor("$ZodCheckMaxLength", (inst, def) => {
			var _a;
			$ZodCheck.init(inst, def);
			(_a = inst._zod.def).when ?? (_a.when = (payload) => {
				const val = payload.value;
				return !nullish(val) && val.length !== void 0;
			});
			inst._zod.onattach.push((inst) => {
				const curr = inst._zod.bag.maximum ?? Number.POSITIVE_INFINITY;
				if (def.maximum < curr) inst._zod.bag.maximum = def.maximum;
			});
			inst._zod.check = (payload) => {
				const input = payload.value;
				if (input.length <= def.maximum) return;
				const origin = getLengthableOrigin(input);
				payload.issues.push({
					origin,
					code: "too_big",
					maximum: def.maximum,
					inclusive: true,
					input,
					inst,
					continue: !def.abort
				});
			};
		});
		const $ZodCheckMinLength = /*@__PURE__*/ $constructor("$ZodCheckMinLength", (inst, def) => {
			var _a;
			$ZodCheck.init(inst, def);
			(_a = inst._zod.def).when ?? (_a.when = (payload) => {
				const val = payload.value;
				return !nullish(val) && val.length !== void 0;
			});
			inst._zod.onattach.push((inst) => {
				const curr = inst._zod.bag.minimum ?? Number.NEGATIVE_INFINITY;
				if (def.minimum > curr) inst._zod.bag.minimum = def.minimum;
			});
			inst._zod.check = (payload) => {
				const input = payload.value;
				if (input.length >= def.minimum) return;
				const origin = getLengthableOrigin(input);
				payload.issues.push({
					origin,
					code: "too_small",
					minimum: def.minimum,
					inclusive: true,
					input,
					inst,
					continue: !def.abort
				});
			};
		});
		const $ZodCheckLengthEquals = /*@__PURE__*/ $constructor("$ZodCheckLengthEquals", (inst, def) => {
			var _a;
			$ZodCheck.init(inst, def);
			(_a = inst._zod.def).when ?? (_a.when = (payload) => {
				const val = payload.value;
				return !nullish(val) && val.length !== void 0;
			});
			inst._zod.onattach.push((inst) => {
				const bag = inst._zod.bag;
				bag.minimum = def.length;
				bag.maximum = def.length;
				bag.length = def.length;
			});
			inst._zod.check = (payload) => {
				const input = payload.value;
				const length = input.length;
				if (length === def.length) return;
				const origin = getLengthableOrigin(input);
				const tooBig = length > def.length;
				payload.issues.push({
					origin,
					...tooBig ? {
						code: "too_big",
						maximum: def.length
					} : {
						code: "too_small",
						minimum: def.length
					},
					inclusive: true,
					exact: true,
					input: payload.value,
					inst,
					continue: !def.abort
				});
			};
		});
		const $ZodCheckStringFormat = /*@__PURE__*/ $constructor("$ZodCheckStringFormat", (inst, def) => {
			var _a, _b;
			$ZodCheck.init(inst, def);
			inst._zod.onattach.push((inst) => {
				const bag = inst._zod.bag;
				bag.format = def.format;
				if (def.pattern) {
					bag.patterns ?? (bag.patterns = /* @__PURE__ */ new Set());
					bag.patterns.add(def.pattern);
				}
			});
			if (def.pattern) (_a = inst._zod).check ?? (_a.check = (payload) => {
				def.pattern.lastIndex = 0;
				if (def.pattern.test(payload.value)) return;
				payload.issues.push({
					origin: "string",
					code: "invalid_format",
					format: def.format,
					input: payload.value,
					...def.pattern ? { pattern: def.pattern.toString() } : {},
					inst,
					continue: !def.abort
				});
			});
			else (_b = inst._zod).check ?? (_b.check = () => {});
		});
		const $ZodCheckRegex = /*@__PURE__*/ $constructor("$ZodCheckRegex", (inst, def) => {
			$ZodCheckStringFormat.init(inst, def);
			inst._zod.check = (payload) => {
				def.pattern.lastIndex = 0;
				if (def.pattern.test(payload.value)) return;
				payload.issues.push({
					origin: "string",
					code: "invalid_format",
					format: "regex",
					input: payload.value,
					pattern: def.pattern.toString(),
					inst,
					continue: !def.abort
				});
			};
		});
		const $ZodCheckLowerCase = /*@__PURE__*/ $constructor("$ZodCheckLowerCase", (inst, def) => {
			def.pattern ?? (def.pattern = lowercase);
			$ZodCheckStringFormat.init(inst, def);
		});
		const $ZodCheckUpperCase = /*@__PURE__*/ $constructor("$ZodCheckUpperCase", (inst, def) => {
			def.pattern ?? (def.pattern = uppercase);
			$ZodCheckStringFormat.init(inst, def);
		});
		const $ZodCheckIncludes = /*@__PURE__*/ $constructor("$ZodCheckIncludes", (inst, def) => {
			$ZodCheck.init(inst, def);
			const escapedRegex = escapeRegex(def.includes);
			const pattern = new RegExp(typeof def.position === "number" ? `^.{${def.position}}${escapedRegex}` : escapedRegex);
			def.pattern = pattern;
			inst._zod.onattach.push((inst) => {
				const bag = inst._zod.bag;
				bag.patterns ?? (bag.patterns = /* @__PURE__ */ new Set());
				bag.patterns.add(pattern);
			});
			inst._zod.check = (payload) => {
				if (payload.value.includes(def.includes, def.position)) return;
				payload.issues.push({
					origin: "string",
					code: "invalid_format",
					format: "includes",
					includes: def.includes,
					input: payload.value,
					inst,
					continue: !def.abort
				});
			};
		});
		const $ZodCheckStartsWith = /*@__PURE__*/ $constructor("$ZodCheckStartsWith", (inst, def) => {
			$ZodCheck.init(inst, def);
			const pattern = new RegExp(`^${escapeRegex(def.prefix)}.*`);
			def.pattern ?? (def.pattern = pattern);
			inst._zod.onattach.push((inst) => {
				const bag = inst._zod.bag;
				bag.patterns ?? (bag.patterns = /* @__PURE__ */ new Set());
				bag.patterns.add(pattern);
			});
			inst._zod.check = (payload) => {
				if (payload.value.startsWith(def.prefix)) return;
				payload.issues.push({
					origin: "string",
					code: "invalid_format",
					format: "starts_with",
					prefix: def.prefix,
					input: payload.value,
					inst,
					continue: !def.abort
				});
			};
		});
		const $ZodCheckEndsWith = /*@__PURE__*/ $constructor("$ZodCheckEndsWith", (inst, def) => {
			$ZodCheck.init(inst, def);
			const pattern = new RegExp(`.*${escapeRegex(def.suffix)}$`);
			def.pattern ?? (def.pattern = pattern);
			inst._zod.onattach.push((inst) => {
				const bag = inst._zod.bag;
				bag.patterns ?? (bag.patterns = /* @__PURE__ */ new Set());
				bag.patterns.add(pattern);
			});
			inst._zod.check = (payload) => {
				if (payload.value.endsWith(def.suffix)) return;
				payload.issues.push({
					origin: "string",
					code: "invalid_format",
					format: "ends_with",
					suffix: def.suffix,
					input: payload.value,
					inst,
					continue: !def.abort
				});
			};
		});
		const $ZodCheckOverwrite = /*@__PURE__*/ $constructor("$ZodCheckOverwrite", (inst, def) => {
			$ZodCheck.init(inst, def);
			inst._zod.check = (payload) => {
				payload.value = def.tx(payload.value);
			};
		});
		//#endregion
		//#region ../../../../engine/node_modules/.pnpm/zod@4.4.3/node_modules/zod/v4/core/doc.js
		var Doc = class {
			constructor(args = []) {
				this.content = [];
				this.indent = 0;
				if (this) this.args = args;
			}
			indented(fn) {
				this.indent += 1;
				fn(this);
				this.indent -= 1;
			}
			write(arg) {
				if (typeof arg === "function") {
					arg(this, { execution: "sync" });
					arg(this, { execution: "async" });
					return;
				}
				const lines = arg.split("\n").filter((x) => x);
				const minIndent = Math.min(...lines.map((x) => x.length - x.trimStart().length));
				const dedented = lines.map((x) => x.slice(minIndent)).map((x) => " ".repeat(this.indent * 2) + x);
				for (const line of dedented) this.content.push(line);
			}
			compile() {
				const F = Function;
				const args = this?.args;
				const lines = [...(this?.content ?? [``]).map((x) => `  ${x}`)];
				return new F(...args, lines.join("\n"));
			}
		};
		//#endregion
		//#region ../../../../engine/node_modules/.pnpm/zod@4.4.3/node_modules/zod/v4/core/versions.js
		const version = {
			major: 4,
			minor: 4,
			patch: 3
		};
		//#endregion
		//#region ../../../../engine/node_modules/.pnpm/zod@4.4.3/node_modules/zod/v4/core/schemas.js
		const $ZodType = /*@__PURE__*/ $constructor("$ZodType", (inst, def) => {
			var _a;
			inst ?? (inst = {});
			inst._zod.def = def;
			inst._zod.bag = inst._zod.bag || {};
			inst._zod.version = version;
			const checks = [...inst._zod.def.checks ?? []];
			if (inst._zod.traits.has("$ZodCheck")) checks.unshift(inst);
			for (const ch of checks) for (const fn of ch._zod.onattach) fn(inst);
			if (checks.length === 0) {
				(_a = inst._zod).deferred ?? (_a.deferred = []);
				inst._zod.deferred?.push(() => {
					inst._zod.run = inst._zod.parse;
				});
			} else {
				const runChecks = (payload, checks, ctx) => {
					let isAborted = aborted(payload);
					let asyncResult;
					for (const ch of checks) {
						if (ch._zod.def.when) {
							if (explicitlyAborted(payload)) continue;
							if (!ch._zod.def.when(payload)) continue;
						} else if (isAborted) continue;
						const currLen = payload.issues.length;
						const _ = ch._zod.check(payload);
						if (_ instanceof Promise && ctx?.async === false) throw new $ZodAsyncError();
						if (asyncResult || _ instanceof Promise) asyncResult = (asyncResult ?? Promise.resolve()).then(async () => {
							await _;
							if (payload.issues.length === currLen) return;
							if (!isAborted) isAborted = aborted(payload, currLen);
						});
						else {
							if (payload.issues.length === currLen) continue;
							if (!isAborted) isAborted = aborted(payload, currLen);
						}
					}
					if (asyncResult) return asyncResult.then(() => {
						return payload;
					});
					return payload;
				};
				const handleCanaryResult = (canary, payload, ctx) => {
					if (aborted(canary)) {
						canary.aborted = true;
						return canary;
					}
					const checkResult = runChecks(payload, checks, ctx);
					if (checkResult instanceof Promise) {
						if (ctx.async === false) throw new $ZodAsyncError();
						return checkResult.then((checkResult) => inst._zod.parse(checkResult, ctx));
					}
					return inst._zod.parse(checkResult, ctx);
				};
				inst._zod.run = (payload, ctx) => {
					if (ctx.skipChecks) return inst._zod.parse(payload, ctx);
					if (ctx.direction === "backward") {
						const canary = inst._zod.parse({
							value: payload.value,
							issues: []
						}, {
							...ctx,
							skipChecks: true
						});
						if (canary instanceof Promise) return canary.then((canary) => {
							return handleCanaryResult(canary, payload, ctx);
						});
						return handleCanaryResult(canary, payload, ctx);
					}
					const result = inst._zod.parse(payload, ctx);
					if (result instanceof Promise) {
						if (ctx.async === false) throw new $ZodAsyncError();
						return result.then((result) => runChecks(result, checks, ctx));
					}
					return runChecks(result, checks, ctx);
				};
			}
			defineLazy(inst, "~standard", () => ({
				validate: (value) => {
					try {
						const r = safeParse$1(inst, value);
						return r.success ? { value: r.data } : { issues: r.error?.issues };
					} catch (_) {
						return safeParseAsync$1(inst, value).then((r) => r.success ? { value: r.data } : { issues: r.error?.issues });
					}
				},
				vendor: "zod",
				version: 1
			}));
		});
		const $ZodString = /*@__PURE__*/ $constructor("$ZodString", (inst, def) => {
			$ZodType.init(inst, def);
			inst._zod.pattern = [...inst?._zod.bag?.patterns ?? []].pop() ?? string$1(inst._zod.bag);
			inst._zod.parse = (payload, _) => {
				if (def.coerce) try {
					payload.value = String(payload.value);
				} catch (_) {}
				if (typeof payload.value === "string") return payload;
				payload.issues.push({
					expected: "string",
					code: "invalid_type",
					input: payload.value,
					inst
				});
				return payload;
			};
		});
		const $ZodStringFormat = /*@__PURE__*/ $constructor("$ZodStringFormat", (inst, def) => {
			$ZodCheckStringFormat.init(inst, def);
			$ZodString.init(inst, def);
		});
		const $ZodGUID = /*@__PURE__*/ $constructor("$ZodGUID", (inst, def) => {
			def.pattern ?? (def.pattern = guid);
			$ZodStringFormat.init(inst, def);
		});
		const $ZodUUID = /*@__PURE__*/ $constructor("$ZodUUID", (inst, def) => {
			if (def.version) {
				const v = {
					v1: 1,
					v2: 2,
					v3: 3,
					v4: 4,
					v5: 5,
					v6: 6,
					v7: 7,
					v8: 8
				}[def.version];
				if (v === void 0) throw new Error(`Invalid UUID version: "${def.version}"`);
				def.pattern ?? (def.pattern = uuid(v));
			} else def.pattern ?? (def.pattern = uuid());
			$ZodStringFormat.init(inst, def);
		});
		const $ZodEmail = /*@__PURE__*/ $constructor("$ZodEmail", (inst, def) => {
			def.pattern ?? (def.pattern = email);
			$ZodStringFormat.init(inst, def);
		});
		const $ZodURL = /*@__PURE__*/ $constructor("$ZodURL", (inst, def) => {
			$ZodStringFormat.init(inst, def);
			inst._zod.check = (payload) => {
				try {
					const trimmed = payload.value.trim();
					if (!def.normalize && def.protocol?.source === httpProtocol.source) {
						if (!/^https?:\/\//i.test(trimmed)) {
							payload.issues.push({
								code: "invalid_format",
								format: "url",
								note: "Invalid URL format",
								input: payload.value,
								inst,
								continue: !def.abort
							});
							return;
						}
					}
					const url = new URL(trimmed);
					if (def.hostname) {
						def.hostname.lastIndex = 0;
						if (!def.hostname.test(url.hostname)) payload.issues.push({
							code: "invalid_format",
							format: "url",
							note: "Invalid hostname",
							pattern: def.hostname.source,
							input: payload.value,
							inst,
							continue: !def.abort
						});
					}
					if (def.protocol) {
						def.protocol.lastIndex = 0;
						if (!def.protocol.test(url.protocol.endsWith(":") ? url.protocol.slice(0, -1) : url.protocol)) payload.issues.push({
							code: "invalid_format",
							format: "url",
							note: "Invalid protocol",
							pattern: def.protocol.source,
							input: payload.value,
							inst,
							continue: !def.abort
						});
					}
					if (def.normalize) payload.value = url.href;
					else payload.value = trimmed;
					return;
				} catch (_) {
					payload.issues.push({
						code: "invalid_format",
						format: "url",
						input: payload.value,
						inst,
						continue: !def.abort
					});
				}
			};
		});
		const $ZodEmoji = /*@__PURE__*/ $constructor("$ZodEmoji", (inst, def) => {
			def.pattern ?? (def.pattern = emoji());
			$ZodStringFormat.init(inst, def);
		});
		const $ZodNanoID = /*@__PURE__*/ $constructor("$ZodNanoID", (inst, def) => {
			def.pattern ?? (def.pattern = nanoid);
			$ZodStringFormat.init(inst, def);
		});
		/**
		* @deprecated CUID v1 is deprecated by its authors due to information leakage
		* (timestamps embedded in the id). Use {@link $ZodCUID2} instead.
		* See https://github.com/paralleldrive/cuid.
		*/
		const $ZodCUID = /*@__PURE__*/ $constructor("$ZodCUID", (inst, def) => {
			def.pattern ?? (def.pattern = cuid);
			$ZodStringFormat.init(inst, def);
		});
		const $ZodCUID2 = /*@__PURE__*/ $constructor("$ZodCUID2", (inst, def) => {
			def.pattern ?? (def.pattern = cuid2);
			$ZodStringFormat.init(inst, def);
		});
		const $ZodULID = /*@__PURE__*/ $constructor("$ZodULID", (inst, def) => {
			def.pattern ?? (def.pattern = ulid);
			$ZodStringFormat.init(inst, def);
		});
		const $ZodXID = /*@__PURE__*/ $constructor("$ZodXID", (inst, def) => {
			def.pattern ?? (def.pattern = xid);
			$ZodStringFormat.init(inst, def);
		});
		const $ZodKSUID = /*@__PURE__*/ $constructor("$ZodKSUID", (inst, def) => {
			def.pattern ?? (def.pattern = ksuid);
			$ZodStringFormat.init(inst, def);
		});
		const $ZodISODateTime = /*@__PURE__*/ $constructor("$ZodISODateTime", (inst, def) => {
			def.pattern ?? (def.pattern = datetime$1(def));
			$ZodStringFormat.init(inst, def);
		});
		const $ZodISODate = /*@__PURE__*/ $constructor("$ZodISODate", (inst, def) => {
			def.pattern ?? (def.pattern = date$1);
			$ZodStringFormat.init(inst, def);
		});
		const $ZodISOTime = /*@__PURE__*/ $constructor("$ZodISOTime", (inst, def) => {
			def.pattern ?? (def.pattern = time$1(def));
			$ZodStringFormat.init(inst, def);
		});
		const $ZodISODuration = /*@__PURE__*/ $constructor("$ZodISODuration", (inst, def) => {
			def.pattern ?? (def.pattern = duration$1);
			$ZodStringFormat.init(inst, def);
		});
		const $ZodIPv4 = /*@__PURE__*/ $constructor("$ZodIPv4", (inst, def) => {
			def.pattern ?? (def.pattern = ipv4);
			$ZodStringFormat.init(inst, def);
			inst._zod.bag.format = `ipv4`;
		});
		const $ZodIPv6 = /*@__PURE__*/ $constructor("$ZodIPv6", (inst, def) => {
			def.pattern ?? (def.pattern = ipv6);
			$ZodStringFormat.init(inst, def);
			inst._zod.bag.format = `ipv6`;
			inst._zod.check = (payload) => {
				try {
					new URL(`http://[${payload.value}]`);
				} catch {
					payload.issues.push({
						code: "invalid_format",
						format: "ipv6",
						input: payload.value,
						inst,
						continue: !def.abort
					});
				}
			};
		});
		const $ZodCIDRv4 = /*@__PURE__*/ $constructor("$ZodCIDRv4", (inst, def) => {
			def.pattern ?? (def.pattern = cidrv4);
			$ZodStringFormat.init(inst, def);
		});
		const $ZodCIDRv6 = /*@__PURE__*/ $constructor("$ZodCIDRv6", (inst, def) => {
			def.pattern ?? (def.pattern = cidrv6);
			$ZodStringFormat.init(inst, def);
			inst._zod.check = (payload) => {
				const parts = payload.value.split("/");
				try {
					if (parts.length !== 2) throw new Error();
					const [address, prefix] = parts;
					if (!prefix) throw new Error();
					const prefixNum = Number(prefix);
					if (`${prefixNum}` !== prefix) throw new Error();
					if (prefixNum < 0 || prefixNum > 128) throw new Error();
					new URL(`http://[${address}]`);
				} catch {
					payload.issues.push({
						code: "invalid_format",
						format: "cidrv6",
						input: payload.value,
						inst,
						continue: !def.abort
					});
				}
			};
		});
		function isValidBase64(data) {
			if (data === "") return true;
			if (/\s/.test(data)) return false;
			if (data.length % 4 !== 0) return false;
			try {
				atob(data);
				return true;
			} catch {
				return false;
			}
		}
		const $ZodBase64 = /*@__PURE__*/ $constructor("$ZodBase64", (inst, def) => {
			def.pattern ?? (def.pattern = base64);
			$ZodStringFormat.init(inst, def);
			inst._zod.bag.contentEncoding = "base64";
			inst._zod.check = (payload) => {
				if (isValidBase64(payload.value)) return;
				payload.issues.push({
					code: "invalid_format",
					format: "base64",
					input: payload.value,
					inst,
					continue: !def.abort
				});
			};
		});
		function isValidBase64URL(data) {
			if (!base64url.test(data)) return false;
			const base64 = data.replace(/[-_]/g, (c) => c === "-" ? "+" : "/");
			return isValidBase64(base64.padEnd(Math.ceil(base64.length / 4) * 4, "="));
		}
		const $ZodBase64URL = /*@__PURE__*/ $constructor("$ZodBase64URL", (inst, def) => {
			def.pattern ?? (def.pattern = base64url);
			$ZodStringFormat.init(inst, def);
			inst._zod.bag.contentEncoding = "base64url";
			inst._zod.check = (payload) => {
				if (isValidBase64URL(payload.value)) return;
				payload.issues.push({
					code: "invalid_format",
					format: "base64url",
					input: payload.value,
					inst,
					continue: !def.abort
				});
			};
		});
		const $ZodE164 = /*@__PURE__*/ $constructor("$ZodE164", (inst, def) => {
			def.pattern ?? (def.pattern = e164);
			$ZodStringFormat.init(inst, def);
		});
		function isValidJWT(token, algorithm = null) {
			try {
				const tokensParts = token.split(".");
				if (tokensParts.length !== 3) return false;
				const [header] = tokensParts;
				if (!header) return false;
				const parsedHeader = JSON.parse(atob(header));
				if ("typ" in parsedHeader && parsedHeader?.typ !== "JWT") return false;
				if (!parsedHeader.alg) return false;
				if (algorithm && (!("alg" in parsedHeader) || parsedHeader.alg !== algorithm)) return false;
				return true;
			} catch {
				return false;
			}
		}
		const $ZodJWT = /*@__PURE__*/ $constructor("$ZodJWT", (inst, def) => {
			$ZodStringFormat.init(inst, def);
			inst._zod.check = (payload) => {
				if (isValidJWT(payload.value, def.alg)) return;
				payload.issues.push({
					code: "invalid_format",
					format: "jwt",
					input: payload.value,
					inst,
					continue: !def.abort
				});
			};
		});
		const $ZodNumber = /*@__PURE__*/ $constructor("$ZodNumber", (inst, def) => {
			$ZodType.init(inst, def);
			inst._zod.pattern = inst._zod.bag.pattern ?? number$1;
			inst._zod.parse = (payload, _ctx) => {
				if (def.coerce) try {
					payload.value = Number(payload.value);
				} catch (_) {}
				const input = payload.value;
				if (typeof input === "number" && !Number.isNaN(input) && Number.isFinite(input)) return payload;
				const received = typeof input === "number" ? Number.isNaN(input) ? "NaN" : !Number.isFinite(input) ? "Infinity" : void 0 : void 0;
				payload.issues.push({
					expected: "number",
					code: "invalid_type",
					input,
					inst,
					...received ? { received } : {}
				});
				return payload;
			};
		});
		const $ZodNumberFormat = /*@__PURE__*/ $constructor("$ZodNumberFormat", (inst, def) => {
			$ZodCheckNumberFormat.init(inst, def);
			$ZodNumber.init(inst, def);
		});
		const $ZodUnknown = /*@__PURE__*/ $constructor("$ZodUnknown", (inst, def) => {
			$ZodType.init(inst, def);
			inst._zod.parse = (payload) => payload;
		});
		const $ZodNever = /*@__PURE__*/ $constructor("$ZodNever", (inst, def) => {
			$ZodType.init(inst, def);
			inst._zod.parse = (payload, _ctx) => {
				payload.issues.push({
					expected: "never",
					code: "invalid_type",
					input: payload.value,
					inst
				});
				return payload;
			};
		});
		function handleArrayResult(result, final, index) {
			if (result.issues.length) final.issues.push(...prefixIssues(index, result.issues));
			final.value[index] = result.value;
		}
		const $ZodArray = /*@__PURE__*/ $constructor("$ZodArray", (inst, def) => {
			$ZodType.init(inst, def);
			inst._zod.parse = (payload, ctx) => {
				const input = payload.value;
				if (!Array.isArray(input)) {
					payload.issues.push({
						expected: "array",
						code: "invalid_type",
						input,
						inst
					});
					return payload;
				}
				payload.value = Array(input.length);
				const proms = [];
				for (let i = 0; i < input.length; i++) {
					const item = input[i];
					const result = def.element._zod.run({
						value: item,
						issues: []
					}, ctx);
					if (result instanceof Promise) proms.push(result.then((result) => handleArrayResult(result, payload, i)));
					else handleArrayResult(result, payload, i);
				}
				if (proms.length) return Promise.all(proms).then(() => payload);
				return payload;
			};
		});
		function handlePropertyResult(result, final, key, input, isOptionalIn, isOptionalOut) {
			const isPresent = key in input;
			if (result.issues.length) {
				if (isOptionalIn && isOptionalOut && !isPresent) return;
				final.issues.push(...prefixIssues(key, result.issues));
			}
			if (!isPresent && !isOptionalIn) {
				if (!result.issues.length) final.issues.push({
					code: "invalid_type",
					expected: "nonoptional",
					input: void 0,
					path: [key]
				});
				return;
			}
			if (result.value === void 0) {
				if (isPresent) final.value[key] = void 0;
			} else final.value[key] = result.value;
		}
		function normalizeDef(def) {
			const keys = Object.keys(def.shape);
			for (const k of keys) if (!def.shape?.[k]?._zod?.traits?.has("$ZodType")) throw new Error(`Invalid element at key "${k}": expected a Zod schema`);
			const okeys = optionalKeys(def.shape);
			return {
				...def,
				keys,
				keySet: new Set(keys),
				numKeys: keys.length,
				optionalKeys: new Set(okeys)
			};
		}
		function handleCatchall(proms, input, payload, ctx, def, inst) {
			const unrecognized = [];
			const keySet = def.keySet;
			const _catchall = def.catchall._zod;
			const t = _catchall.def.type;
			const isOptionalIn = _catchall.optin === "optional";
			const isOptionalOut = _catchall.optout === "optional";
			for (const key in input) {
				if (key === "__proto__") continue;
				if (keySet.has(key)) continue;
				if (t === "never") {
					unrecognized.push(key);
					continue;
				}
				const r = _catchall.run({
					value: input[key],
					issues: []
				}, ctx);
				if (r instanceof Promise) proms.push(r.then((r) => handlePropertyResult(r, payload, key, input, isOptionalIn, isOptionalOut)));
				else handlePropertyResult(r, payload, key, input, isOptionalIn, isOptionalOut);
			}
			if (unrecognized.length) payload.issues.push({
				code: "unrecognized_keys",
				keys: unrecognized,
				input,
				inst
			});
			if (!proms.length) return payload;
			return Promise.all(proms).then(() => {
				return payload;
			});
		}
		const $ZodObject = /*@__PURE__*/ $constructor("$ZodObject", (inst, def) => {
			$ZodType.init(inst, def);
			if (!Object.getOwnPropertyDescriptor(def, "shape")?.get) {
				const sh = def.shape;
				Object.defineProperty(def, "shape", { get: () => {
					const newSh = { ...sh };
					Object.defineProperty(def, "shape", { value: newSh });
					return newSh;
				} });
			}
			const _normalized = cached(() => normalizeDef(def));
			defineLazy(inst._zod, "propValues", () => {
				const shape = def.shape;
				const propValues = {};
				for (const key in shape) {
					const field = shape[key]._zod;
					if (field.values) {
						propValues[key] ?? (propValues[key] = /* @__PURE__ */ new Set());
						for (const v of field.values) propValues[key].add(v);
					}
				}
				return propValues;
			});
			const isObject$2 = isObject;
			const catchall = def.catchall;
			let value;
			inst._zod.parse = (payload, ctx) => {
				value ?? (value = _normalized.value);
				const input = payload.value;
				if (!isObject$2(input)) {
					payload.issues.push({
						expected: "object",
						code: "invalid_type",
						input,
						inst
					});
					return payload;
				}
				payload.value = {};
				const proms = [];
				const shape = value.shape;
				for (const key of value.keys) {
					const el = shape[key];
					const isOptionalIn = el._zod.optin === "optional";
					const isOptionalOut = el._zod.optout === "optional";
					const r = el._zod.run({
						value: input[key],
						issues: []
					}, ctx);
					if (r instanceof Promise) proms.push(r.then((r) => handlePropertyResult(r, payload, key, input, isOptionalIn, isOptionalOut)));
					else handlePropertyResult(r, payload, key, input, isOptionalIn, isOptionalOut);
				}
				if (!catchall) return proms.length ? Promise.all(proms).then(() => payload) : payload;
				return handleCatchall(proms, input, payload, ctx, _normalized.value, inst);
			};
		});
		const $ZodObjectJIT = /*@__PURE__*/ $constructor("$ZodObjectJIT", (inst, def) => {
			$ZodObject.init(inst, def);
			const superParse = inst._zod.parse;
			const _normalized = cached(() => normalizeDef(def));
			const generateFastpass = (shape) => {
				const doc = new Doc([
					"shape",
					"payload",
					"ctx"
				]);
				const normalized = _normalized.value;
				const parseStr = (key) => {
					const k = esc(key);
					return `shape[${k}]._zod.run({ value: input[${k}], issues: [] }, ctx)`;
				};
				doc.write(`const input = payload.value;`);
				const ids = Object.create(null);
				let counter = 0;
				for (const key of normalized.keys) ids[key] = `key_${counter++}`;
				doc.write(`const newResult = {};`);
				for (const key of normalized.keys) {
					const id = ids[key];
					const k = esc(key);
					const schema = shape[key];
					const isOptionalIn = schema?._zod?.optin === "optional";
					const isOptionalOut = schema?._zod?.optout === "optional";
					doc.write(`const ${id} = ${parseStr(key)};`);
					if (isOptionalIn && isOptionalOut) doc.write(`
        if (${id}.issues.length) {
          if (${k} in input) {
            payload.issues = payload.issues.concat(${id}.issues.map(iss => ({
              ...iss,
              path: iss.path ? [${k}, ...iss.path] : [${k}]
            })));
          }
        }
        
        if (${id}.value === undefined) {
          if (${k} in input) {
            newResult[${k}] = undefined;
          }
        } else {
          newResult[${k}] = ${id}.value;
        }
        
      `);
					else if (!isOptionalIn) doc.write(`
        const ${id}_present = ${k} in input;
        if (${id}.issues.length) {
          payload.issues = payload.issues.concat(${id}.issues.map(iss => ({
            ...iss,
            path: iss.path ? [${k}, ...iss.path] : [${k}]
          })));
        }
        if (!${id}_present && !${id}.issues.length) {
          payload.issues.push({
            code: "invalid_type",
            expected: "nonoptional",
            input: undefined,
            path: [${k}]
          });
        }

        if (${id}_present) {
          if (${id}.value === undefined) {
            newResult[${k}] = undefined;
          } else {
            newResult[${k}] = ${id}.value;
          }
        }

      `);
					else doc.write(`
        if (${id}.issues.length) {
          payload.issues = payload.issues.concat(${id}.issues.map(iss => ({
            ...iss,
            path: iss.path ? [${k}, ...iss.path] : [${k}]
          })));
        }
        
        if (${id}.value === undefined) {
          if (${k} in input) {
            newResult[${k}] = undefined;
          }
        } else {
          newResult[${k}] = ${id}.value;
        }
        
      `);
				}
				doc.write(`payload.value = newResult;`);
				doc.write(`return payload;`);
				const fn = doc.compile();
				return (payload, ctx) => fn(shape, payload, ctx);
			};
			let fastpass;
			const isObject$1 = isObject;
			const jit = !globalConfig.jitless;
			const fastEnabled = jit && allowsEval.value;
			const catchall = def.catchall;
			let value;
			inst._zod.parse = (payload, ctx) => {
				value ?? (value = _normalized.value);
				const input = payload.value;
				if (!isObject$1(input)) {
					payload.issues.push({
						expected: "object",
						code: "invalid_type",
						input,
						inst
					});
					return payload;
				}
				if (jit && fastEnabled && ctx?.async === false && ctx.jitless !== true) {
					if (!fastpass) fastpass = generateFastpass(def.shape);
					payload = fastpass(payload, ctx);
					if (!catchall) return payload;
					return handleCatchall([], input, payload, ctx, value, inst);
				}
				return superParse(payload, ctx);
			};
		});
		function handleUnionResults(results, final, inst, ctx) {
			for (const result of results) if (result.issues.length === 0) {
				final.value = result.value;
				return final;
			}
			const nonaborted = results.filter((r) => !aborted(r));
			if (nonaborted.length === 1) {
				final.value = nonaborted[0].value;
				return nonaborted[0];
			}
			final.issues.push({
				code: "invalid_union",
				input: final.value,
				inst,
				errors: results.map((result) => result.issues.map((iss) => finalizeIssue(iss, ctx, config())))
			});
			return final;
		}
		const $ZodUnion = /*@__PURE__*/ $constructor("$ZodUnion", (inst, def) => {
			$ZodType.init(inst, def);
			defineLazy(inst._zod, "optin", () => def.options.some((o) => o._zod.optin === "optional") ? "optional" : void 0);
			defineLazy(inst._zod, "optout", () => def.options.some((o) => o._zod.optout === "optional") ? "optional" : void 0);
			defineLazy(inst._zod, "values", () => {
				if (def.options.every((o) => o._zod.values)) return new Set(def.options.flatMap((option) => Array.from(option._zod.values)));
			});
			defineLazy(inst._zod, "pattern", () => {
				if (def.options.every((o) => o._zod.pattern)) {
					const patterns = def.options.map((o) => o._zod.pattern);
					return new RegExp(`^(${patterns.map((p) => cleanRegex(p.source)).join("|")})$`);
				}
			});
			const first = def.options.length === 1 ? def.options[0]._zod.run : null;
			inst._zod.parse = (payload, ctx) => {
				if (first) return first(payload, ctx);
				let async = false;
				const results = [];
				for (const option of def.options) {
					const result = option._zod.run({
						value: payload.value,
						issues: []
					}, ctx);
					if (result instanceof Promise) {
						results.push(result);
						async = true;
					} else {
						if (result.issues.length === 0) return result;
						results.push(result);
					}
				}
				if (!async) return handleUnionResults(results, payload, inst, ctx);
				return Promise.all(results).then((results) => {
					return handleUnionResults(results, payload, inst, ctx);
				});
			};
		});
		const $ZodIntersection = /*@__PURE__*/ $constructor("$ZodIntersection", (inst, def) => {
			$ZodType.init(inst, def);
			inst._zod.parse = (payload, ctx) => {
				const input = payload.value;
				const left = def.left._zod.run({
					value: input,
					issues: []
				}, ctx);
				const right = def.right._zod.run({
					value: input,
					issues: []
				}, ctx);
				if (left instanceof Promise || right instanceof Promise) return Promise.all([left, right]).then(([left, right]) => {
					return handleIntersectionResults(payload, left, right);
				});
				return handleIntersectionResults(payload, left, right);
			};
		});
		function mergeValues(a, b) {
			if (a === b) return {
				valid: true,
				data: a
			};
			if (a instanceof Date && b instanceof Date && +a === +b) return {
				valid: true,
				data: a
			};
			if (isPlainObject(a) && isPlainObject(b)) {
				const bKeys = Object.keys(b);
				const sharedKeys = Object.keys(a).filter((key) => bKeys.indexOf(key) !== -1);
				const newObj = {
					...a,
					...b
				};
				for (const key of sharedKeys) {
					const sharedValue = mergeValues(a[key], b[key]);
					if (!sharedValue.valid) return {
						valid: false,
						mergeErrorPath: [key, ...sharedValue.mergeErrorPath]
					};
					newObj[key] = sharedValue.data;
				}
				return {
					valid: true,
					data: newObj
				};
			}
			if (Array.isArray(a) && Array.isArray(b)) {
				if (a.length !== b.length) return {
					valid: false,
					mergeErrorPath: []
				};
				const newArray = [];
				for (let index = 0; index < a.length; index++) {
					const itemA = a[index];
					const itemB = b[index];
					const sharedValue = mergeValues(itemA, itemB);
					if (!sharedValue.valid) return {
						valid: false,
						mergeErrorPath: [index, ...sharedValue.mergeErrorPath]
					};
					newArray.push(sharedValue.data);
				}
				return {
					valid: true,
					data: newArray
				};
			}
			return {
				valid: false,
				mergeErrorPath: []
			};
		}
		function handleIntersectionResults(result, left, right) {
			const unrecKeys = /* @__PURE__ */ new Map();
			let unrecIssue;
			for (const iss of left.issues) if (iss.code === "unrecognized_keys") {
				unrecIssue ?? (unrecIssue = iss);
				for (const k of iss.keys) {
					if (!unrecKeys.has(k)) unrecKeys.set(k, {});
					unrecKeys.get(k).l = true;
				}
			} else result.issues.push(iss);
			for (const iss of right.issues) if (iss.code === "unrecognized_keys") for (const k of iss.keys) {
				if (!unrecKeys.has(k)) unrecKeys.set(k, {});
				unrecKeys.get(k).r = true;
			}
			else result.issues.push(iss);
			const bothKeys = [...unrecKeys].filter(([, f]) => f.l && f.r).map(([k]) => k);
			if (bothKeys.length && unrecIssue) result.issues.push({
				...unrecIssue,
				keys: bothKeys
			});
			if (aborted(result)) return result;
			const merged = mergeValues(left.value, right.value);
			if (!merged.valid) throw new Error(`Unmergable intersection. Error path: ${JSON.stringify(merged.mergeErrorPath)}`);
			result.value = merged.data;
			return result;
		}
		const $ZodEnum = /*@__PURE__*/ $constructor("$ZodEnum", (inst, def) => {
			$ZodType.init(inst, def);
			const values = getEnumValues(def.entries);
			const valuesSet = new Set(values);
			inst._zod.values = valuesSet;
			inst._zod.pattern = new RegExp(`^(${values.filter((k) => propertyKeyTypes.has(typeof k)).map((o) => typeof o === "string" ? escapeRegex(o) : o.toString()).join("|")})$`);
			inst._zod.parse = (payload, _ctx) => {
				const input = payload.value;
				if (valuesSet.has(input)) return payload;
				payload.issues.push({
					code: "invalid_value",
					values,
					input,
					inst
				});
				return payload;
			};
		});
		const $ZodLiteral = /*@__PURE__*/ $constructor("$ZodLiteral", (inst, def) => {
			$ZodType.init(inst, def);
			if (def.values.length === 0) throw new Error("Cannot create literal schema with no valid values");
			const values = new Set(def.values);
			inst._zod.values = values;
			inst._zod.pattern = new RegExp(`^(${def.values.map((o) => typeof o === "string" ? escapeRegex(o) : o ? escapeRegex(o.toString()) : String(o)).join("|")})$`);
			inst._zod.parse = (payload, _ctx) => {
				const input = payload.value;
				if (values.has(input)) return payload;
				payload.issues.push({
					code: "invalid_value",
					values: def.values,
					input,
					inst
				});
				return payload;
			};
		});
		const $ZodTransform = /*@__PURE__*/ $constructor("$ZodTransform", (inst, def) => {
			$ZodType.init(inst, def);
			inst._zod.optin = "optional";
			inst._zod.parse = (payload, ctx) => {
				if (ctx.direction === "backward") throw new $ZodEncodeError(inst.constructor.name);
				const _out = def.transform(payload.value, payload);
				if (ctx.async) return (_out instanceof Promise ? _out : Promise.resolve(_out)).then((output) => {
					payload.value = output;
					payload.fallback = true;
					return payload;
				});
				if (_out instanceof Promise) throw new $ZodAsyncError();
				payload.value = _out;
				payload.fallback = true;
				return payload;
			};
		});
		function handleOptionalResult(result, input) {
			if (input === void 0 && (result.issues.length || result.fallback)) return {
				issues: [],
				value: void 0
			};
			return result;
		}
		const $ZodOptional = /*@__PURE__*/ $constructor("$ZodOptional", (inst, def) => {
			$ZodType.init(inst, def);
			inst._zod.optin = "optional";
			inst._zod.optout = "optional";
			defineLazy(inst._zod, "values", () => {
				return def.innerType._zod.values ? /* @__PURE__ */ new Set([...def.innerType._zod.values, void 0]) : void 0;
			});
			defineLazy(inst._zod, "pattern", () => {
				const pattern = def.innerType._zod.pattern;
				return pattern ? new RegExp(`^(${cleanRegex(pattern.source)})?$`) : void 0;
			});
			inst._zod.parse = (payload, ctx) => {
				if (def.innerType._zod.optin === "optional") {
					const input = payload.value;
					const result = def.innerType._zod.run(payload, ctx);
					if (result instanceof Promise) return result.then((r) => handleOptionalResult(r, input));
					return handleOptionalResult(result, input);
				}
				if (payload.value === void 0) return payload;
				return def.innerType._zod.run(payload, ctx);
			};
		});
		const $ZodExactOptional = /*@__PURE__*/ $constructor("$ZodExactOptional", (inst, def) => {
			$ZodOptional.init(inst, def);
			defineLazy(inst._zod, "values", () => def.innerType._zod.values);
			defineLazy(inst._zod, "pattern", () => def.innerType._zod.pattern);
			inst._zod.parse = (payload, ctx) => {
				return def.innerType._zod.run(payload, ctx);
			};
		});
		const $ZodNullable = /*@__PURE__*/ $constructor("$ZodNullable", (inst, def) => {
			$ZodType.init(inst, def);
			defineLazy(inst._zod, "optin", () => def.innerType._zod.optin);
			defineLazy(inst._zod, "optout", () => def.innerType._zod.optout);
			defineLazy(inst._zod, "pattern", () => {
				const pattern = def.innerType._zod.pattern;
				return pattern ? new RegExp(`^(${cleanRegex(pattern.source)}|null)$`) : void 0;
			});
			defineLazy(inst._zod, "values", () => {
				return def.innerType._zod.values ? /* @__PURE__ */ new Set([...def.innerType._zod.values, null]) : void 0;
			});
			inst._zod.parse = (payload, ctx) => {
				if (payload.value === null) return payload;
				return def.innerType._zod.run(payload, ctx);
			};
		});
		const $ZodDefault = /*@__PURE__*/ $constructor("$ZodDefault", (inst, def) => {
			$ZodType.init(inst, def);
			inst._zod.optin = "optional";
			defineLazy(inst._zod, "values", () => def.innerType._zod.values);
			inst._zod.parse = (payload, ctx) => {
				if (ctx.direction === "backward") return def.innerType._zod.run(payload, ctx);
				if (payload.value === void 0) {
					payload.value = def.defaultValue;
					/**
					* $ZodDefault returns the default value immediately in forward direction.
					* It doesn't pass the default value into the validator ("prefault"). There's no reason to pass the default value through validation. The validity of the default is enforced by TypeScript statically. Otherwise, it's the responsibility of the user to ensure the default is valid. In the case of pipes with divergent in/out types, you can specify the default on the `in` schema of your ZodPipe to set a "prefault" for the pipe.   */
					return payload;
				}
				const result = def.innerType._zod.run(payload, ctx);
				if (result instanceof Promise) return result.then((result) => handleDefaultResult(result, def));
				return handleDefaultResult(result, def);
			};
		});
		function handleDefaultResult(payload, def) {
			if (payload.value === void 0) payload.value = def.defaultValue;
			return payload;
		}
		const $ZodPrefault = /*@__PURE__*/ $constructor("$ZodPrefault", (inst, def) => {
			$ZodType.init(inst, def);
			inst._zod.optin = "optional";
			defineLazy(inst._zod, "values", () => def.innerType._zod.values);
			inst._zod.parse = (payload, ctx) => {
				if (ctx.direction === "backward") return def.innerType._zod.run(payload, ctx);
				if (payload.value === void 0) payload.value = def.defaultValue;
				return def.innerType._zod.run(payload, ctx);
			};
		});
		const $ZodNonOptional = /*@__PURE__*/ $constructor("$ZodNonOptional", (inst, def) => {
			$ZodType.init(inst, def);
			defineLazy(inst._zod, "values", () => {
				const v = def.innerType._zod.values;
				return v ? new Set([...v].filter((x) => x !== void 0)) : void 0;
			});
			inst._zod.parse = (payload, ctx) => {
				const result = def.innerType._zod.run(payload, ctx);
				if (result instanceof Promise) return result.then((result) => handleNonOptionalResult(result, inst));
				return handleNonOptionalResult(result, inst);
			};
		});
		function handleNonOptionalResult(payload, inst) {
			if (!payload.issues.length && payload.value === void 0) payload.issues.push({
				code: "invalid_type",
				expected: "nonoptional",
				input: payload.value,
				inst
			});
			return payload;
		}
		const $ZodCatch = /*@__PURE__*/ $constructor("$ZodCatch", (inst, def) => {
			$ZodType.init(inst, def);
			inst._zod.optin = "optional";
			defineLazy(inst._zod, "optout", () => def.innerType._zod.optout);
			defineLazy(inst._zod, "values", () => def.innerType._zod.values);
			inst._zod.parse = (payload, ctx) => {
				if (ctx.direction === "backward") return def.innerType._zod.run(payload, ctx);
				const result = def.innerType._zod.run(payload, ctx);
				if (result instanceof Promise) return result.then((result) => {
					payload.value = result.value;
					if (result.issues.length) {
						payload.value = def.catchValue({
							...payload,
							error: { issues: result.issues.map((iss) => finalizeIssue(iss, ctx, config())) },
							input: payload.value
						});
						payload.issues = [];
						payload.fallback = true;
					}
					return payload;
				});
				payload.value = result.value;
				if (result.issues.length) {
					payload.value = def.catchValue({
						...payload,
						error: { issues: result.issues.map((iss) => finalizeIssue(iss, ctx, config())) },
						input: payload.value
					});
					payload.issues = [];
					payload.fallback = true;
				}
				return payload;
			};
		});
		const $ZodPipe = /*@__PURE__*/ $constructor("$ZodPipe", (inst, def) => {
			$ZodType.init(inst, def);
			defineLazy(inst._zod, "values", () => def.in._zod.values);
			defineLazy(inst._zod, "optin", () => def.in._zod.optin);
			defineLazy(inst._zod, "optout", () => def.out._zod.optout);
			defineLazy(inst._zod, "propValues", () => def.in._zod.propValues);
			inst._zod.parse = (payload, ctx) => {
				if (ctx.direction === "backward") {
					const right = def.out._zod.run(payload, ctx);
					if (right instanceof Promise) return right.then((right) => handlePipeResult(right, def.in, ctx));
					return handlePipeResult(right, def.in, ctx);
				}
				const left = def.in._zod.run(payload, ctx);
				if (left instanceof Promise) return left.then((left) => handlePipeResult(left, def.out, ctx));
				return handlePipeResult(left, def.out, ctx);
			};
		});
		function handlePipeResult(left, next, ctx) {
			if (left.issues.length) {
				left.aborted = true;
				return left;
			}
			return next._zod.run({
				value: left.value,
				issues: left.issues,
				fallback: left.fallback
			}, ctx);
		}
		const $ZodReadonly = /*@__PURE__*/ $constructor("$ZodReadonly", (inst, def) => {
			$ZodType.init(inst, def);
			defineLazy(inst._zod, "propValues", () => def.innerType._zod.propValues);
			defineLazy(inst._zod, "values", () => def.innerType._zod.values);
			defineLazy(inst._zod, "optin", () => def.innerType?._zod?.optin);
			defineLazy(inst._zod, "optout", () => def.innerType?._zod?.optout);
			inst._zod.parse = (payload, ctx) => {
				if (ctx.direction === "backward") return def.innerType._zod.run(payload, ctx);
				const result = def.innerType._zod.run(payload, ctx);
				if (result instanceof Promise) return result.then(handleReadonlyResult);
				return handleReadonlyResult(result);
			};
		});
		function handleReadonlyResult(payload) {
			payload.value = Object.freeze(payload.value);
			return payload;
		}
		const $ZodCustom = /*@__PURE__*/ $constructor("$ZodCustom", (inst, def) => {
			$ZodCheck.init(inst, def);
			$ZodType.init(inst, def);
			inst._zod.parse = (payload, _) => {
				return payload;
			};
			inst._zod.check = (payload) => {
				const input = payload.value;
				const r = def.fn(input);
				if (r instanceof Promise) return r.then((r) => handleRefineResult(r, payload, input, inst));
				handleRefineResult(r, payload, input, inst);
			};
		});
		function handleRefineResult(result, payload, input, inst) {
			if (!result) {
				const _iss = {
					code: "custom",
					input,
					inst,
					path: [...inst._zod.def.path ?? []],
					continue: !inst._zod.def.abort
				};
				if (inst._zod.def.params) _iss.params = inst._zod.def.params;
				payload.issues.push(issue(_iss));
			}
		}
		//#endregion
		//#region ../../../../engine/node_modules/.pnpm/zod@4.4.3/node_modules/zod/v4/core/registries.js
		var _a;
		var $ZodRegistry = class {
			constructor() {
				this._map = /* @__PURE__ */ new WeakMap();
				this._idmap = /* @__PURE__ */ new Map();
			}
			add(schema, ..._meta) {
				const meta = _meta[0];
				this._map.set(schema, meta);
				if (meta && typeof meta === "object" && "id" in meta) this._idmap.set(meta.id, schema);
				return this;
			}
			clear() {
				this._map = /* @__PURE__ */ new WeakMap();
				this._idmap = /* @__PURE__ */ new Map();
				return this;
			}
			remove(schema) {
				const meta = this._map.get(schema);
				if (meta && typeof meta === "object" && "id" in meta) this._idmap.delete(meta.id);
				this._map.delete(schema);
				return this;
			}
			get(schema) {
				const p = schema._zod.parent;
				if (p) {
					const pm = { ...this.get(p) ?? {} };
					delete pm.id;
					const f = {
						...pm,
						...this._map.get(schema)
					};
					return Object.keys(f).length ? f : void 0;
				}
				return this._map.get(schema);
			}
			has(schema) {
				return this._map.has(schema);
			}
		};
		function registry() {
			return new $ZodRegistry();
		}
		(_a = globalThis).__zod_globalRegistry ?? (_a.__zod_globalRegistry = registry());
		const globalRegistry = globalThis.__zod_globalRegistry;
		//#endregion
		//#region ../../../../engine/node_modules/.pnpm/zod@4.4.3/node_modules/zod/v4/core/api.js
		// @__NO_SIDE_EFFECTS__
		function _string(Class, params) {
			return new Class({
				type: "string",
				...normalizeParams(params)
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _email(Class, params) {
			return new Class({
				type: "string",
				format: "email",
				check: "string_format",
				abort: false,
				...normalizeParams(params)
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _guid(Class, params) {
			return new Class({
				type: "string",
				format: "guid",
				check: "string_format",
				abort: false,
				...normalizeParams(params)
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _uuid(Class, params) {
			return new Class({
				type: "string",
				format: "uuid",
				check: "string_format",
				abort: false,
				...normalizeParams(params)
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _uuidv4(Class, params) {
			return new Class({
				type: "string",
				format: "uuid",
				check: "string_format",
				abort: false,
				version: "v4",
				...normalizeParams(params)
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _uuidv6(Class, params) {
			return new Class({
				type: "string",
				format: "uuid",
				check: "string_format",
				abort: false,
				version: "v6",
				...normalizeParams(params)
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _uuidv7(Class, params) {
			return new Class({
				type: "string",
				format: "uuid",
				check: "string_format",
				abort: false,
				version: "v7",
				...normalizeParams(params)
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _url(Class, params) {
			return new Class({
				type: "string",
				format: "url",
				check: "string_format",
				abort: false,
				...normalizeParams(params)
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _emoji(Class, params) {
			return new Class({
				type: "string",
				format: "emoji",
				check: "string_format",
				abort: false,
				...normalizeParams(params)
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _nanoid(Class, params) {
			return new Class({
				type: "string",
				format: "nanoid",
				check: "string_format",
				abort: false,
				...normalizeParams(params)
			});
		}
		/**
		* @deprecated CUID v1 is deprecated by its authors due to information leakage
		* (timestamps embedded in the id). Use {@link _cuid2} instead.
		* See https://github.com/paralleldrive/cuid.
		*/
		// @__NO_SIDE_EFFECTS__
		function _cuid(Class, params) {
			return new Class({
				type: "string",
				format: "cuid",
				check: "string_format",
				abort: false,
				...normalizeParams(params)
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _cuid2(Class, params) {
			return new Class({
				type: "string",
				format: "cuid2",
				check: "string_format",
				abort: false,
				...normalizeParams(params)
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _ulid(Class, params) {
			return new Class({
				type: "string",
				format: "ulid",
				check: "string_format",
				abort: false,
				...normalizeParams(params)
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _xid(Class, params) {
			return new Class({
				type: "string",
				format: "xid",
				check: "string_format",
				abort: false,
				...normalizeParams(params)
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _ksuid(Class, params) {
			return new Class({
				type: "string",
				format: "ksuid",
				check: "string_format",
				abort: false,
				...normalizeParams(params)
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _ipv4(Class, params) {
			return new Class({
				type: "string",
				format: "ipv4",
				check: "string_format",
				abort: false,
				...normalizeParams(params)
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _ipv6(Class, params) {
			return new Class({
				type: "string",
				format: "ipv6",
				check: "string_format",
				abort: false,
				...normalizeParams(params)
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _cidrv4(Class, params) {
			return new Class({
				type: "string",
				format: "cidrv4",
				check: "string_format",
				abort: false,
				...normalizeParams(params)
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _cidrv6(Class, params) {
			return new Class({
				type: "string",
				format: "cidrv6",
				check: "string_format",
				abort: false,
				...normalizeParams(params)
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _base64(Class, params) {
			return new Class({
				type: "string",
				format: "base64",
				check: "string_format",
				abort: false,
				...normalizeParams(params)
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _base64url(Class, params) {
			return new Class({
				type: "string",
				format: "base64url",
				check: "string_format",
				abort: false,
				...normalizeParams(params)
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _e164(Class, params) {
			return new Class({
				type: "string",
				format: "e164",
				check: "string_format",
				abort: false,
				...normalizeParams(params)
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _jwt(Class, params) {
			return new Class({
				type: "string",
				format: "jwt",
				check: "string_format",
				abort: false,
				...normalizeParams(params)
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _isoDateTime(Class, params) {
			return new Class({
				type: "string",
				format: "datetime",
				check: "string_format",
				offset: false,
				local: false,
				precision: null,
				...normalizeParams(params)
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _isoDate(Class, params) {
			return new Class({
				type: "string",
				format: "date",
				check: "string_format",
				...normalizeParams(params)
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _isoTime(Class, params) {
			return new Class({
				type: "string",
				format: "time",
				check: "string_format",
				precision: null,
				...normalizeParams(params)
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _isoDuration(Class, params) {
			return new Class({
				type: "string",
				format: "duration",
				check: "string_format",
				...normalizeParams(params)
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _number(Class, params) {
			return new Class({
				type: "number",
				checks: [],
				...normalizeParams(params)
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _int(Class, params) {
			return new Class({
				type: "number",
				check: "number_format",
				abort: false,
				format: "safeint",
				...normalizeParams(params)
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _unknown(Class) {
			return new Class({ type: "unknown" });
		}
		// @__NO_SIDE_EFFECTS__
		function _never(Class, params) {
			return new Class({
				type: "never",
				...normalizeParams(params)
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _lt(value, params) {
			return new $ZodCheckLessThan({
				check: "less_than",
				...normalizeParams(params),
				value,
				inclusive: false
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _lte(value, params) {
			return new $ZodCheckLessThan({
				check: "less_than",
				...normalizeParams(params),
				value,
				inclusive: true
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _gt(value, params) {
			return new $ZodCheckGreaterThan({
				check: "greater_than",
				...normalizeParams(params),
				value,
				inclusive: false
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _gte(value, params) {
			return new $ZodCheckGreaterThan({
				check: "greater_than",
				...normalizeParams(params),
				value,
				inclusive: true
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _multipleOf(value, params) {
			return new $ZodCheckMultipleOf({
				check: "multiple_of",
				...normalizeParams(params),
				value
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _maxLength(maximum, params) {
			return new $ZodCheckMaxLength({
				check: "max_length",
				...normalizeParams(params),
				maximum
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _minLength(minimum, params) {
			return new $ZodCheckMinLength({
				check: "min_length",
				...normalizeParams(params),
				minimum
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _length(length, params) {
			return new $ZodCheckLengthEquals({
				check: "length_equals",
				...normalizeParams(params),
				length
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _regex(pattern, params) {
			return new $ZodCheckRegex({
				check: "string_format",
				format: "regex",
				...normalizeParams(params),
				pattern
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _lowercase(params) {
			return new $ZodCheckLowerCase({
				check: "string_format",
				format: "lowercase",
				...normalizeParams(params)
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _uppercase(params) {
			return new $ZodCheckUpperCase({
				check: "string_format",
				format: "uppercase",
				...normalizeParams(params)
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _includes(includes, params) {
			return new $ZodCheckIncludes({
				check: "string_format",
				format: "includes",
				...normalizeParams(params),
				includes
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _startsWith(prefix, params) {
			return new $ZodCheckStartsWith({
				check: "string_format",
				format: "starts_with",
				...normalizeParams(params),
				prefix
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _endsWith(suffix, params) {
			return new $ZodCheckEndsWith({
				check: "string_format",
				format: "ends_with",
				...normalizeParams(params),
				suffix
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _overwrite(tx) {
			return new $ZodCheckOverwrite({
				check: "overwrite",
				tx
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _normalize(form) {
			return /* @__PURE__ */ _overwrite((input) => input.normalize(form));
		}
		// @__NO_SIDE_EFFECTS__
		function _trim() {
			return /* @__PURE__ */ _overwrite((input) => input.trim());
		}
		// @__NO_SIDE_EFFECTS__
		function _toLowerCase() {
			return /* @__PURE__ */ _overwrite((input) => input.toLowerCase());
		}
		// @__NO_SIDE_EFFECTS__
		function _toUpperCase() {
			return /* @__PURE__ */ _overwrite((input) => input.toUpperCase());
		}
		// @__NO_SIDE_EFFECTS__
		function _slugify() {
			return /* @__PURE__ */ _overwrite((input) => slugify(input));
		}
		// @__NO_SIDE_EFFECTS__
		function _array(Class, element, params) {
			return new Class({
				type: "array",
				element,
				...normalizeParams(params)
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _refine(Class, fn, _params) {
			return new Class({
				type: "custom",
				check: "custom",
				fn,
				...normalizeParams(_params)
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _superRefine(fn, params) {
			const ch = /* @__PURE__ */ _check((payload) => {
				payload.addIssue = (issue$2) => {
					if (typeof issue$2 === "string") payload.issues.push(issue(issue$2, payload.value, ch._zod.def));
					else {
						const _issue = issue$2;
						if (_issue.fatal) _issue.continue = false;
						_issue.code ?? (_issue.code = "custom");
						_issue.input ?? (_issue.input = payload.value);
						_issue.inst ?? (_issue.inst = ch);
						_issue.continue ?? (_issue.continue = !ch._zod.def.abort);
						payload.issues.push(issue(_issue));
					}
				};
				return fn(payload.value, payload);
			}, params);
			return ch;
		}
		// @__NO_SIDE_EFFECTS__
		function _check(fn, params) {
			const ch = new $ZodCheck({
				check: "custom",
				...normalizeParams(params)
			});
			ch._zod.check = fn;
			return ch;
		}
		//#endregion
		//#region ../../../../engine/node_modules/.pnpm/zod@4.4.3/node_modules/zod/v4/core/to-json-schema.js
		function initializeContext(params) {
			let target = params?.target ?? "draft-2020-12";
			if (target === "draft-4") target = "draft-04";
			if (target === "draft-7") target = "draft-07";
			return {
				processors: params.processors ?? {},
				metadataRegistry: params?.metadata ?? globalRegistry,
				target,
				unrepresentable: params?.unrepresentable ?? "throw",
				override: params?.override ?? (() => {}),
				io: params?.io ?? "output",
				counter: 0,
				seen: /* @__PURE__ */ new Map(),
				cycles: params?.cycles ?? "ref",
				reused: params?.reused ?? "inline",
				external: params?.external ?? void 0
			};
		}
		function process(schema, ctx, _params = {
			path: [],
			schemaPath: []
		}) {
			var _a;
			const def = schema._zod.def;
			const seen = ctx.seen.get(schema);
			if (seen) {
				seen.count++;
				if (_params.schemaPath.includes(schema)) seen.cycle = _params.path;
				return seen.schema;
			}
			const result = {
				schema: {},
				count: 1,
				cycle: void 0,
				path: _params.path
			};
			ctx.seen.set(schema, result);
			const overrideSchema = schema._zod.toJSONSchema?.();
			if (overrideSchema) result.schema = overrideSchema;
			else {
				const params = {
					..._params,
					schemaPath: [..._params.schemaPath, schema],
					path: _params.path
				};
				if (schema._zod.processJSONSchema) schema._zod.processJSONSchema(ctx, result.schema, params);
				else {
					const _json = result.schema;
					const processor = ctx.processors[def.type];
					if (!processor) throw new Error(`[toJSONSchema]: Non-representable type encountered: ${def.type}`);
					processor(schema, ctx, _json, params);
				}
				const parent = schema._zod.parent;
				if (parent) {
					if (!result.ref) result.ref = parent;
					process(parent, ctx, params);
					ctx.seen.get(parent).isParent = true;
				}
			}
			const meta = ctx.metadataRegistry.get(schema);
			if (meta) Object.assign(result.schema, meta);
			if (ctx.io === "input" && isTransforming(schema)) {
				delete result.schema.examples;
				delete result.schema.default;
			}
			if (ctx.io === "input" && "_prefault" in result.schema) (_a = result.schema).default ?? (_a.default = result.schema._prefault);
			delete result.schema._prefault;
			return ctx.seen.get(schema).schema;
		}
		function extractDefs(ctx, schema) {
			const root = ctx.seen.get(schema);
			if (!root) throw new Error("Unprocessed schema. This is a bug in Zod.");
			const idToSchema = /* @__PURE__ */ new Map();
			for (const entry of ctx.seen.entries()) {
				const id = ctx.metadataRegistry.get(entry[0])?.id;
				if (id) {
					const existing = idToSchema.get(id);
					if (existing && existing !== entry[0]) throw new Error(`Duplicate schema id "${id}" detected during JSON Schema conversion. Two different schemas cannot share the same id when converted together.`);
					idToSchema.set(id, entry[0]);
				}
			}
			const makeURI = (entry) => {
				const defsSegment = ctx.target === "draft-2020-12" ? "$defs" : "definitions";
				if (ctx.external) {
					const externalId = ctx.external.registry.get(entry[0])?.id;
					const uriGenerator = ctx.external.uri ?? ((id) => id);
					if (externalId) return { ref: uriGenerator(externalId) };
					const id = entry[1].defId ?? entry[1].schema.id ?? `schema${ctx.counter++}`;
					entry[1].defId = id;
					return {
						defId: id,
						ref: `${uriGenerator("__shared")}#/${defsSegment}/${id}`
					};
				}
				if (entry[1] === root) return { ref: "#" };
				const defUriPrefix = `#/${defsSegment}/`;
				const defId = entry[1].schema.id ?? `__schema${ctx.counter++}`;
				return {
					defId,
					ref: defUriPrefix + defId
				};
			};
			const extractToDef = (entry) => {
				if (entry[1].schema.$ref) return;
				const seen = entry[1];
				const { ref, defId } = makeURI(entry);
				seen.def = { ...seen.schema };
				if (defId) seen.defId = defId;
				const schema = seen.schema;
				for (const key in schema) delete schema[key];
				schema.$ref = ref;
			};
			if (ctx.cycles === "throw") for (const entry of ctx.seen.entries()) {
				const seen = entry[1];
				if (seen.cycle) throw new Error(`Cycle detected: #/${seen.cycle?.join("/")}/<root>

Set the \`cycles\` parameter to \`"ref"\` to resolve cyclical schemas with defs.`);
			}
			for (const entry of ctx.seen.entries()) {
				const seen = entry[1];
				if (schema === entry[0]) {
					extractToDef(entry);
					continue;
				}
				if (ctx.external) {
					const ext = ctx.external.registry.get(entry[0])?.id;
					if (schema !== entry[0] && ext) {
						extractToDef(entry);
						continue;
					}
				}
				if (ctx.metadataRegistry.get(entry[0])?.id) {
					extractToDef(entry);
					continue;
				}
				if (seen.cycle) {
					extractToDef(entry);
					continue;
				}
				if (seen.count > 1) {
					if (ctx.reused === "ref") {
						extractToDef(entry);
						continue;
					}
				}
			}
		}
		function finalize(ctx, schema) {
			const root = ctx.seen.get(schema);
			if (!root) throw new Error("Unprocessed schema. This is a bug in Zod.");
			const flattenRef = (zodSchema) => {
				const seen = ctx.seen.get(zodSchema);
				if (seen.ref === null) return;
				const schema = seen.def ?? seen.schema;
				const _cached = { ...schema };
				const ref = seen.ref;
				seen.ref = null;
				if (ref) {
					flattenRef(ref);
					const refSeen = ctx.seen.get(ref);
					const refSchema = refSeen.schema;
					if (refSchema.$ref && (ctx.target === "draft-07" || ctx.target === "draft-04" || ctx.target === "openapi-3.0")) {
						schema.allOf = schema.allOf ?? [];
						schema.allOf.push(refSchema);
					} else Object.assign(schema, refSchema);
					Object.assign(schema, _cached);
					if (zodSchema._zod.parent === ref) for (const key in schema) {
						if (key === "$ref" || key === "allOf") continue;
						if (!(key in _cached)) delete schema[key];
					}
					if (refSchema.$ref && refSeen.def) for (const key in schema) {
						if (key === "$ref" || key === "allOf") continue;
						if (key in refSeen.def && JSON.stringify(schema[key]) === JSON.stringify(refSeen.def[key])) delete schema[key];
					}
				}
				const parent = zodSchema._zod.parent;
				if (parent && parent !== ref) {
					flattenRef(parent);
					const parentSeen = ctx.seen.get(parent);
					if (parentSeen?.schema.$ref) {
						schema.$ref = parentSeen.schema.$ref;
						if (parentSeen.def) for (const key in schema) {
							if (key === "$ref" || key === "allOf") continue;
							if (key in parentSeen.def && JSON.stringify(schema[key]) === JSON.stringify(parentSeen.def[key])) delete schema[key];
						}
					}
				}
				ctx.override({
					zodSchema,
					jsonSchema: schema,
					path: seen.path ?? []
				});
			};
			for (const entry of [...ctx.seen.entries()].reverse()) flattenRef(entry[0]);
			const result = {};
			if (ctx.target === "draft-2020-12") result.$schema = "https://json-schema.org/draft/2020-12/schema";
			else if (ctx.target === "draft-07") result.$schema = "http://json-schema.org/draft-07/schema#";
			else if (ctx.target === "draft-04") result.$schema = "http://json-schema.org/draft-04/schema#";
			else if (ctx.target === "openapi-3.0") {}
			if (ctx.external?.uri) {
				const id = ctx.external.registry.get(schema)?.id;
				if (!id) throw new Error("Schema is missing an `id` property");
				result.$id = ctx.external.uri(id);
			}
			Object.assign(result, root.def ?? root.schema);
			const rootMetaId = ctx.metadataRegistry.get(schema)?.id;
			if (rootMetaId !== void 0 && result.id === rootMetaId) delete result.id;
			const defs = ctx.external?.defs ?? {};
			for (const entry of ctx.seen.entries()) {
				const seen = entry[1];
				if (seen.def && seen.defId) {
					if (seen.def.id === seen.defId) delete seen.def.id;
					defs[seen.defId] = seen.def;
				}
			}
			if (ctx.external) {} else if (Object.keys(defs).length > 0) if (ctx.target === "draft-2020-12") result.$defs = defs;
			else result.definitions = defs;
			try {
				const finalized = JSON.parse(JSON.stringify(result));
				Object.defineProperty(finalized, "~standard", {
					value: {
						...schema["~standard"],
						jsonSchema: {
							input: createStandardJSONSchemaMethod(schema, "input", ctx.processors),
							output: createStandardJSONSchemaMethod(schema, "output", ctx.processors)
						}
					},
					enumerable: false,
					writable: false
				});
				return finalized;
			} catch (_err) {
				throw new Error("Error converting schema to JSON.");
			}
		}
		function isTransforming(_schema, _ctx) {
			const ctx = _ctx ?? { seen: /* @__PURE__ */ new Set() };
			if (ctx.seen.has(_schema)) return false;
			ctx.seen.add(_schema);
			const def = _schema._zod.def;
			if (def.type === "transform") return true;
			if (def.type === "array") return isTransforming(def.element, ctx);
			if (def.type === "set") return isTransforming(def.valueType, ctx);
			if (def.type === "lazy") return isTransforming(def.getter(), ctx);
			if (def.type === "promise" || def.type === "optional" || def.type === "nonoptional" || def.type === "nullable" || def.type === "readonly" || def.type === "default" || def.type === "prefault") return isTransforming(def.innerType, ctx);
			if (def.type === "intersection") return isTransforming(def.left, ctx) || isTransforming(def.right, ctx);
			if (def.type === "record" || def.type === "map") return isTransforming(def.keyType, ctx) || isTransforming(def.valueType, ctx);
			if (def.type === "pipe") {
				if (_schema._zod.traits.has("$ZodCodec")) return true;
				return isTransforming(def.in, ctx) || isTransforming(def.out, ctx);
			}
			if (def.type === "object") {
				for (const key in def.shape) if (isTransforming(def.shape[key], ctx)) return true;
				return false;
			}
			if (def.type === "union") {
				for (const option of def.options) if (isTransforming(option, ctx)) return true;
				return false;
			}
			if (def.type === "tuple") {
				for (const item of def.items) if (isTransforming(item, ctx)) return true;
				if (def.rest && isTransforming(def.rest, ctx)) return true;
				return false;
			}
			return false;
		}
		/**
		* Creates a toJSONSchema method for a schema instance.
		* This encapsulates the logic of initializing context, processing, extracting defs, and finalizing.
		*/
		const createToJSONSchemaMethod = (schema, processors = {}) => (params) => {
			const ctx = initializeContext({
				...params,
				processors
			});
			process(schema, ctx);
			extractDefs(ctx, schema);
			return finalize(ctx, schema);
		};
		const createStandardJSONSchemaMethod = (schema, io, processors = {}) => (params) => {
			const { libraryOptions, target } = params ?? {};
			const ctx = initializeContext({
				...libraryOptions ?? {},
				target,
				io,
				processors
			});
			process(schema, ctx);
			extractDefs(ctx, schema);
			return finalize(ctx, schema);
		};
		//#endregion
		//#region ../../../../engine/node_modules/.pnpm/zod@4.4.3/node_modules/zod/v4/core/json-schema-processors.js
		const formatMap = {
			guid: "uuid",
			url: "uri",
			datetime: "date-time",
			json_string: "json-string",
			regex: ""
		};
		const stringProcessor = (schema, ctx, _json, _params) => {
			const json = _json;
			json.type = "string";
			const { minimum, maximum, format, patterns, contentEncoding } = schema._zod.bag;
			if (typeof minimum === "number") json.minLength = minimum;
			if (typeof maximum === "number") json.maxLength = maximum;
			if (format) {
				json.format = formatMap[format] ?? format;
				if (json.format === "") delete json.format;
				if (format === "time") delete json.format;
			}
			if (contentEncoding) json.contentEncoding = contentEncoding;
			if (patterns && patterns.size > 0) {
				const regexes = [...patterns];
				if (regexes.length === 1) json.pattern = regexes[0].source;
				else if (regexes.length > 1) json.allOf = [...regexes.map((regex) => ({
					...ctx.target === "draft-07" || ctx.target === "draft-04" || ctx.target === "openapi-3.0" ? { type: "string" } : {},
					pattern: regex.source
				}))];
			}
		};
		const numberProcessor = (schema, ctx, _json, _params) => {
			const json = _json;
			const { minimum, maximum, format, multipleOf, exclusiveMaximum, exclusiveMinimum } = schema._zod.bag;
			if (typeof format === "string" && format.includes("int")) json.type = "integer";
			else json.type = "number";
			const exMin = typeof exclusiveMinimum === "number" && exclusiveMinimum >= (minimum ?? Number.NEGATIVE_INFINITY);
			const exMax = typeof exclusiveMaximum === "number" && exclusiveMaximum <= (maximum ?? Number.POSITIVE_INFINITY);
			const legacy = ctx.target === "draft-04" || ctx.target === "openapi-3.0";
			if (exMin) if (legacy) {
				json.minimum = exclusiveMinimum;
				json.exclusiveMinimum = true;
			} else json.exclusiveMinimum = exclusiveMinimum;
			else if (typeof minimum === "number") json.minimum = minimum;
			if (exMax) if (legacy) {
				json.maximum = exclusiveMaximum;
				json.exclusiveMaximum = true;
			} else json.exclusiveMaximum = exclusiveMaximum;
			else if (typeof maximum === "number") json.maximum = maximum;
			if (typeof multipleOf === "number") json.multipleOf = multipleOf;
		};
		const neverProcessor = (_schema, _ctx, json, _params) => {
			json.not = {};
		};
		const enumProcessor = (schema, _ctx, json, _params) => {
			const def = schema._zod.def;
			const values = getEnumValues(def.entries);
			if (values.every((v) => typeof v === "number")) json.type = "number";
			if (values.every((v) => typeof v === "string")) json.type = "string";
			json.enum = values;
		};
		const literalProcessor = (schema, ctx, json, _params) => {
			const def = schema._zod.def;
			const vals = [];
			for (const val of def.values) if (val === void 0) {
				if (ctx.unrepresentable === "throw") throw new Error("Literal `undefined` cannot be represented in JSON Schema");
			} else if (typeof val === "bigint") if (ctx.unrepresentable === "throw") throw new Error("BigInt literals cannot be represented in JSON Schema");
			else vals.push(Number(val));
			else vals.push(val);
			if (vals.length === 0) {} else if (vals.length === 1) {
				const val = vals[0];
				json.type = val === null ? "null" : typeof val;
				if (ctx.target === "draft-04" || ctx.target === "openapi-3.0") json.enum = [val];
				else json.const = val;
			} else {
				if (vals.every((v) => typeof v === "number")) json.type = "number";
				if (vals.every((v) => typeof v === "string")) json.type = "string";
				if (vals.every((v) => typeof v === "boolean")) json.type = "boolean";
				if (vals.every((v) => v === null)) json.type = "null";
				json.enum = vals;
			}
		};
		const customProcessor = (_schema, ctx, _json, _params) => {
			if (ctx.unrepresentable === "throw") throw new Error("Custom types cannot be represented in JSON Schema");
		};
		const transformProcessor = (_schema, ctx, _json, _params) => {
			if (ctx.unrepresentable === "throw") throw new Error("Transforms cannot be represented in JSON Schema");
		};
		const arrayProcessor = (schema, ctx, _json, params) => {
			const json = _json;
			const def = schema._zod.def;
			const { minimum, maximum } = schema._zod.bag;
			if (typeof minimum === "number") json.minItems = minimum;
			if (typeof maximum === "number") json.maxItems = maximum;
			json.type = "array";
			json.items = process(def.element, ctx, {
				...params,
				path: [...params.path, "items"]
			});
		};
		const objectProcessor = (schema, ctx, _json, params) => {
			const json = _json;
			const def = schema._zod.def;
			json.type = "object";
			json.properties = {};
			const shape = def.shape;
			for (const key in shape) json.properties[key] = process(shape[key], ctx, {
				...params,
				path: [
					...params.path,
					"properties",
					key
				]
			});
			const allKeys = new Set(Object.keys(shape));
			const requiredKeys = new Set([...allKeys].filter((key) => {
				const v = def.shape[key]._zod;
				if (ctx.io === "input") return v.optin === void 0;
				else return v.optout === void 0;
			}));
			if (requiredKeys.size > 0) json.required = Array.from(requiredKeys);
			if (def.catchall?._zod.def.type === "never") json.additionalProperties = false;
			else if (!def.catchall) {
				if (ctx.io === "output") json.additionalProperties = false;
			} else if (def.catchall) json.additionalProperties = process(def.catchall, ctx, {
				...params,
				path: [...params.path, "additionalProperties"]
			});
		};
		const unionProcessor = (schema, ctx, json, params) => {
			const def = schema._zod.def;
			const isExclusive = def.inclusive === false;
			const options = def.options.map((x, i) => process(x, ctx, {
				...params,
				path: [
					...params.path,
					isExclusive ? "oneOf" : "anyOf",
					i
				]
			}));
			if (isExclusive) json.oneOf = options;
			else json.anyOf = options;
		};
		const intersectionProcessor = (schema, ctx, json, params) => {
			const def = schema._zod.def;
			const a = process(def.left, ctx, {
				...params,
				path: [
					...params.path,
					"allOf",
					0
				]
			});
			const b = process(def.right, ctx, {
				...params,
				path: [
					...params.path,
					"allOf",
					1
				]
			});
			const isSimpleIntersection = (val) => "allOf" in val && Object.keys(val).length === 1;
			json.allOf = [...isSimpleIntersection(a) ? a.allOf : [a], ...isSimpleIntersection(b) ? b.allOf : [b]];
		};
		const nullableProcessor = (schema, ctx, json, params) => {
			const def = schema._zod.def;
			const inner = process(def.innerType, ctx, params);
			const seen = ctx.seen.get(schema);
			if (ctx.target === "openapi-3.0") {
				seen.ref = def.innerType;
				json.nullable = true;
			} else json.anyOf = [inner, { type: "null" }];
		};
		const nonoptionalProcessor = (schema, ctx, _json, params) => {
			const def = schema._zod.def;
			process(def.innerType, ctx, params);
			const seen = ctx.seen.get(schema);
			seen.ref = def.innerType;
		};
		const defaultProcessor = (schema, ctx, json, params) => {
			const def = schema._zod.def;
			process(def.innerType, ctx, params);
			const seen = ctx.seen.get(schema);
			seen.ref = def.innerType;
			json.default = JSON.parse(JSON.stringify(def.defaultValue));
		};
		const prefaultProcessor = (schema, ctx, json, params) => {
			const def = schema._zod.def;
			process(def.innerType, ctx, params);
			const seen = ctx.seen.get(schema);
			seen.ref = def.innerType;
			if (ctx.io === "input") json._prefault = JSON.parse(JSON.stringify(def.defaultValue));
		};
		const catchProcessor = (schema, ctx, json, params) => {
			const def = schema._zod.def;
			process(def.innerType, ctx, params);
			const seen = ctx.seen.get(schema);
			seen.ref = def.innerType;
			let catchValue;
			try {
				catchValue = def.catchValue(void 0);
			} catch {
				throw new Error("Dynamic catch values are not supported in JSON Schema");
			}
			json.default = catchValue;
		};
		const pipeProcessor = (schema, ctx, _json, params) => {
			const def = schema._zod.def;
			const inIsTransform = def.in._zod.traits.has("$ZodTransform");
			const innerType = ctx.io === "input" ? inIsTransform ? def.out : def.in : def.out;
			process(innerType, ctx, params);
			const seen = ctx.seen.get(schema);
			seen.ref = innerType;
		};
		const readonlyProcessor = (schema, ctx, json, params) => {
			const def = schema._zod.def;
			process(def.innerType, ctx, params);
			const seen = ctx.seen.get(schema);
			seen.ref = def.innerType;
			json.readOnly = true;
		};
		const optionalProcessor = (schema, ctx, _json, params) => {
			const def = schema._zod.def;
			process(def.innerType, ctx, params);
			const seen = ctx.seen.get(schema);
			seen.ref = def.innerType;
		};
		//#endregion
		//#region ../../../../engine/node_modules/.pnpm/zod@4.4.3/node_modules/zod/v4/classic/iso.js
		const ZodISODateTime = /*@__PURE__*/ $constructor("ZodISODateTime", (inst, def) => {
			$ZodISODateTime.init(inst, def);
			ZodStringFormat.init(inst, def);
		});
		function datetime(params) {
			return /* @__PURE__ */ _isoDateTime(ZodISODateTime, params);
		}
		const ZodISODate = /*@__PURE__*/ $constructor("ZodISODate", (inst, def) => {
			$ZodISODate.init(inst, def);
			ZodStringFormat.init(inst, def);
		});
		function date(params) {
			return /* @__PURE__ */ _isoDate(ZodISODate, params);
		}
		const ZodISOTime = /*@__PURE__*/ $constructor("ZodISOTime", (inst, def) => {
			$ZodISOTime.init(inst, def);
			ZodStringFormat.init(inst, def);
		});
		function time(params) {
			return /* @__PURE__ */ _isoTime(ZodISOTime, params);
		}
		const ZodISODuration = /*@__PURE__*/ $constructor("ZodISODuration", (inst, def) => {
			$ZodISODuration.init(inst, def);
			ZodStringFormat.init(inst, def);
		});
		function duration(params) {
			return /* @__PURE__ */ _isoDuration(ZodISODuration, params);
		}
		//#endregion
		//#region ../../../../engine/node_modules/.pnpm/zod@4.4.3/node_modules/zod/v4/classic/errors.js
		const initializer = (inst, issues) => {
			$ZodError.init(inst, issues);
			inst.name = "ZodError";
			Object.defineProperties(inst, {
				format: { value: (mapper) => formatError(inst, mapper) },
				flatten: { value: (mapper) => flattenError(inst, mapper) },
				addIssue: { value: (issue) => {
					inst.issues.push(issue);
					inst.message = JSON.stringify(inst.issues, jsonStringifyReplacer, 2);
				} },
				addIssues: { value: (issues) => {
					inst.issues.push(...issues);
					inst.message = JSON.stringify(inst.issues, jsonStringifyReplacer, 2);
				} },
				isEmpty: { get() {
					return inst.issues.length === 0;
				} }
			});
		};
		const ZodRealError = /*@__PURE__*/ $constructor("ZodError", initializer, { Parent: Error });
		//#endregion
		//#region ../../../../engine/node_modules/.pnpm/zod@4.4.3/node_modules/zod/v4/classic/parse.js
		const parse = /* @__PURE__ */ _parse(ZodRealError);
		const parseAsync = /* @__PURE__ */ _parseAsync(ZodRealError);
		const safeParse = /* @__PURE__ */ _safeParse(ZodRealError);
		const safeParseAsync = /* @__PURE__ */ _safeParseAsync(ZodRealError);
		const encode = /* @__PURE__ */ _encode(ZodRealError);
		const decode = /* @__PURE__ */ _decode(ZodRealError);
		const encodeAsync = /* @__PURE__ */ _encodeAsync(ZodRealError);
		const decodeAsync = /* @__PURE__ */ _decodeAsync(ZodRealError);
		const safeEncode = /* @__PURE__ */ _safeEncode(ZodRealError);
		const safeDecode = /* @__PURE__ */ _safeDecode(ZodRealError);
		const safeEncodeAsync = /* @__PURE__ */ _safeEncodeAsync(ZodRealError);
		const safeDecodeAsync = /* @__PURE__ */ _safeDecodeAsync(ZodRealError);
		//#endregion
		//#region ../../../../engine/node_modules/.pnpm/zod@4.4.3/node_modules/zod/v4/classic/schemas.js
		const _installedGroups = /* @__PURE__ */ new WeakMap();
		function _installLazyMethods(inst, group, methods) {
			const proto = Object.getPrototypeOf(inst);
			let installed = _installedGroups.get(proto);
			if (!installed) {
				installed = /* @__PURE__ */ new Set();
				_installedGroups.set(proto, installed);
			}
			if (installed.has(group)) return;
			installed.add(group);
			for (const key in methods) {
				const fn = methods[key];
				Object.defineProperty(proto, key, {
					configurable: true,
					enumerable: false,
					get() {
						const bound = fn.bind(this);
						Object.defineProperty(this, key, {
							configurable: true,
							writable: true,
							enumerable: true,
							value: bound
						});
						return bound;
					},
					set(v) {
						Object.defineProperty(this, key, {
							configurable: true,
							writable: true,
							enumerable: true,
							value: v
						});
					}
				});
			}
		}
		const ZodType = /*@__PURE__*/ $constructor("ZodType", (inst, def) => {
			$ZodType.init(inst, def);
			Object.assign(inst["~standard"], { jsonSchema: {
				input: createStandardJSONSchemaMethod(inst, "input"),
				output: createStandardJSONSchemaMethod(inst, "output")
			} });
			inst.toJSONSchema = createToJSONSchemaMethod(inst, {});
			inst.def = def;
			inst.type = def.type;
			Object.defineProperty(inst, "_def", { value: def });
			inst.parse = (data, params) => parse(inst, data, params, { callee: inst.parse });
			inst.safeParse = (data, params) => safeParse(inst, data, params);
			inst.parseAsync = async (data, params) => parseAsync(inst, data, params, { callee: inst.parseAsync });
			inst.safeParseAsync = async (data, params) => safeParseAsync(inst, data, params);
			inst.spa = inst.safeParseAsync;
			inst.encode = (data, params) => encode(inst, data, params);
			inst.decode = (data, params) => decode(inst, data, params);
			inst.encodeAsync = async (data, params) => encodeAsync(inst, data, params);
			inst.decodeAsync = async (data, params) => decodeAsync(inst, data, params);
			inst.safeEncode = (data, params) => safeEncode(inst, data, params);
			inst.safeDecode = (data, params) => safeDecode(inst, data, params);
			inst.safeEncodeAsync = async (data, params) => safeEncodeAsync(inst, data, params);
			inst.safeDecodeAsync = async (data, params) => safeDecodeAsync(inst, data, params);
			_installLazyMethods(inst, "ZodType", {
				check(...chks) {
					const def = this.def;
					return this.clone(mergeDefs(def, { checks: [...def.checks ?? [], ...chks.map((ch) => typeof ch === "function" ? { _zod: {
						check: ch,
						def: { check: "custom" },
						onattach: []
					} } : ch)] }), { parent: true });
				},
				with(...chks) {
					return this.check(...chks);
				},
				clone(def, params) {
					return clone(this, def, params);
				},
				brand() {
					return this;
				},
				register(reg, meta) {
					reg.add(this, meta);
					return this;
				},
				refine(check, params) {
					return this.check(refine(check, params));
				},
				superRefine(refinement, params) {
					return this.check(superRefine(refinement, params));
				},
				overwrite(fn) {
					return this.check(/* @__PURE__ */ _overwrite(fn));
				},
				optional() {
					return optional(this);
				},
				exactOptional() {
					return exactOptional(this);
				},
				nullable() {
					return nullable(this);
				},
				nullish() {
					return optional(nullable(this));
				},
				nonoptional(params) {
					return nonoptional(this, params);
				},
				array() {
					return array(this);
				},
				or(arg) {
					return union([this, arg]);
				},
				and(arg) {
					return intersection(this, arg);
				},
				transform(tx) {
					return pipe(this, transform(tx));
				},
				default(d) {
					return _default(this, d);
				},
				prefault(d) {
					return prefault(this, d);
				},
				catch(params) {
					return _catch(this, params);
				},
				pipe(target) {
					return pipe(this, target);
				},
				readonly() {
					return readonly(this);
				},
				describe(description) {
					const cl = this.clone();
					globalRegistry.add(cl, { description });
					return cl;
				},
				meta(...args) {
					if (args.length === 0) return globalRegistry.get(this);
					const cl = this.clone();
					globalRegistry.add(cl, args[0]);
					return cl;
				},
				isOptional() {
					return this.safeParse(void 0).success;
				},
				isNullable() {
					return this.safeParse(null).success;
				},
				apply(fn) {
					return fn(this);
				}
			});
			Object.defineProperty(inst, "description", {
				get() {
					return globalRegistry.get(inst)?.description;
				},
				configurable: true
			});
			return inst;
		});
		/** @internal */
		const _ZodString = /*@__PURE__*/ $constructor("_ZodString", (inst, def) => {
			$ZodString.init(inst, def);
			ZodType.init(inst, def);
			inst._zod.processJSONSchema = (ctx, json, params) => stringProcessor(inst, ctx, json, params);
			const bag = inst._zod.bag;
			inst.format = bag.format ?? null;
			inst.minLength = bag.minimum ?? null;
			inst.maxLength = bag.maximum ?? null;
			_installLazyMethods(inst, "_ZodString", {
				regex(...args) {
					return this.check(/* @__PURE__ */ _regex(...args));
				},
				includes(...args) {
					return this.check(/* @__PURE__ */ _includes(...args));
				},
				startsWith(...args) {
					return this.check(/* @__PURE__ */ _startsWith(...args));
				},
				endsWith(...args) {
					return this.check(/* @__PURE__ */ _endsWith(...args));
				},
				min(...args) {
					return this.check(/* @__PURE__ */ _minLength(...args));
				},
				max(...args) {
					return this.check(/* @__PURE__ */ _maxLength(...args));
				},
				length(...args) {
					return this.check(/* @__PURE__ */ _length(...args));
				},
				nonempty(...args) {
					return this.check(/* @__PURE__ */ _minLength(1, ...args));
				},
				lowercase(params) {
					return this.check(/* @__PURE__ */ _lowercase(params));
				},
				uppercase(params) {
					return this.check(/* @__PURE__ */ _uppercase(params));
				},
				trim() {
					return this.check(/* @__PURE__ */ _trim());
				},
				normalize(...args) {
					return this.check(/* @__PURE__ */ _normalize(...args));
				},
				toLowerCase() {
					return this.check(/* @__PURE__ */ _toLowerCase());
				},
				toUpperCase() {
					return this.check(/* @__PURE__ */ _toUpperCase());
				},
				slugify() {
					return this.check(/* @__PURE__ */ _slugify());
				}
			});
		});
		const ZodString = /*@__PURE__*/ $constructor("ZodString", (inst, def) => {
			$ZodString.init(inst, def);
			_ZodString.init(inst, def);
			inst.email = (params) => inst.check(/* @__PURE__ */ _email(ZodEmail, params));
			inst.url = (params) => inst.check(/* @__PURE__ */ _url(ZodURL, params));
			inst.jwt = (params) => inst.check(/* @__PURE__ */ _jwt(ZodJWT, params));
			inst.emoji = (params) => inst.check(/* @__PURE__ */ _emoji(ZodEmoji, params));
			inst.guid = (params) => inst.check(/* @__PURE__ */ _guid(ZodGUID, params));
			inst.uuid = (params) => inst.check(/* @__PURE__ */ _uuid(ZodUUID, params));
			inst.uuidv4 = (params) => inst.check(/* @__PURE__ */ _uuidv4(ZodUUID, params));
			inst.uuidv6 = (params) => inst.check(/* @__PURE__ */ _uuidv6(ZodUUID, params));
			inst.uuidv7 = (params) => inst.check(/* @__PURE__ */ _uuidv7(ZodUUID, params));
			inst.nanoid = (params) => inst.check(/* @__PURE__ */ _nanoid(ZodNanoID, params));
			inst.guid = (params) => inst.check(/* @__PURE__ */ _guid(ZodGUID, params));
			inst.cuid = (params) => inst.check(/* @__PURE__ */ _cuid(ZodCUID, params));
			inst.cuid2 = (params) => inst.check(/* @__PURE__ */ _cuid2(ZodCUID2, params));
			inst.ulid = (params) => inst.check(/* @__PURE__ */ _ulid(ZodULID, params));
			inst.base64 = (params) => inst.check(/* @__PURE__ */ _base64(ZodBase64, params));
			inst.base64url = (params) => inst.check(/* @__PURE__ */ _base64url(ZodBase64URL, params));
			inst.xid = (params) => inst.check(/* @__PURE__ */ _xid(ZodXID, params));
			inst.ksuid = (params) => inst.check(/* @__PURE__ */ _ksuid(ZodKSUID, params));
			inst.ipv4 = (params) => inst.check(/* @__PURE__ */ _ipv4(ZodIPv4, params));
			inst.ipv6 = (params) => inst.check(/* @__PURE__ */ _ipv6(ZodIPv6, params));
			inst.cidrv4 = (params) => inst.check(/* @__PURE__ */ _cidrv4(ZodCIDRv4, params));
			inst.cidrv6 = (params) => inst.check(/* @__PURE__ */ _cidrv6(ZodCIDRv6, params));
			inst.e164 = (params) => inst.check(/* @__PURE__ */ _e164(ZodE164, params));
			inst.datetime = (params) => inst.check(datetime(params));
			inst.date = (params) => inst.check(date(params));
			inst.time = (params) => inst.check(time(params));
			inst.duration = (params) => inst.check(duration(params));
		});
		function string(params) {
			return /* @__PURE__ */ _string(ZodString, params);
		}
		const ZodStringFormat = /*@__PURE__*/ $constructor("ZodStringFormat", (inst, def) => {
			$ZodStringFormat.init(inst, def);
			_ZodString.init(inst, def);
		});
		const ZodEmail = /*@__PURE__*/ $constructor("ZodEmail", (inst, def) => {
			$ZodEmail.init(inst, def);
			ZodStringFormat.init(inst, def);
		});
		const ZodGUID = /*@__PURE__*/ $constructor("ZodGUID", (inst, def) => {
			$ZodGUID.init(inst, def);
			ZodStringFormat.init(inst, def);
		});
		const ZodUUID = /*@__PURE__*/ $constructor("ZodUUID", (inst, def) => {
			$ZodUUID.init(inst, def);
			ZodStringFormat.init(inst, def);
		});
		const ZodURL = /*@__PURE__*/ $constructor("ZodURL", (inst, def) => {
			$ZodURL.init(inst, def);
			ZodStringFormat.init(inst, def);
		});
		const ZodEmoji = /*@__PURE__*/ $constructor("ZodEmoji", (inst, def) => {
			$ZodEmoji.init(inst, def);
			ZodStringFormat.init(inst, def);
		});
		const ZodNanoID = /*@__PURE__*/ $constructor("ZodNanoID", (inst, def) => {
			$ZodNanoID.init(inst, def);
			ZodStringFormat.init(inst, def);
		});
		/**
		* @deprecated CUID v1 is deprecated by its authors due to information leakage
		* (timestamps embedded in the id). Use {@link ZodCUID2} instead.
		* See https://github.com/paralleldrive/cuid.
		*/
		const ZodCUID = /*@__PURE__*/ $constructor("ZodCUID", (inst, def) => {
			$ZodCUID.init(inst, def);
			ZodStringFormat.init(inst, def);
		});
		const ZodCUID2 = /*@__PURE__*/ $constructor("ZodCUID2", (inst, def) => {
			$ZodCUID2.init(inst, def);
			ZodStringFormat.init(inst, def);
		});
		const ZodULID = /*@__PURE__*/ $constructor("ZodULID", (inst, def) => {
			$ZodULID.init(inst, def);
			ZodStringFormat.init(inst, def);
		});
		const ZodXID = /*@__PURE__*/ $constructor("ZodXID", (inst, def) => {
			$ZodXID.init(inst, def);
			ZodStringFormat.init(inst, def);
		});
		const ZodKSUID = /*@__PURE__*/ $constructor("ZodKSUID", (inst, def) => {
			$ZodKSUID.init(inst, def);
			ZodStringFormat.init(inst, def);
		});
		const ZodIPv4 = /*@__PURE__*/ $constructor("ZodIPv4", (inst, def) => {
			$ZodIPv4.init(inst, def);
			ZodStringFormat.init(inst, def);
		});
		const ZodIPv6 = /*@__PURE__*/ $constructor("ZodIPv6", (inst, def) => {
			$ZodIPv6.init(inst, def);
			ZodStringFormat.init(inst, def);
		});
		const ZodCIDRv4 = /*@__PURE__*/ $constructor("ZodCIDRv4", (inst, def) => {
			$ZodCIDRv4.init(inst, def);
			ZodStringFormat.init(inst, def);
		});
		const ZodCIDRv6 = /*@__PURE__*/ $constructor("ZodCIDRv6", (inst, def) => {
			$ZodCIDRv6.init(inst, def);
			ZodStringFormat.init(inst, def);
		});
		const ZodBase64 = /*@__PURE__*/ $constructor("ZodBase64", (inst, def) => {
			$ZodBase64.init(inst, def);
			ZodStringFormat.init(inst, def);
		});
		const ZodBase64URL = /*@__PURE__*/ $constructor("ZodBase64URL", (inst, def) => {
			$ZodBase64URL.init(inst, def);
			ZodStringFormat.init(inst, def);
		});
		const ZodE164 = /*@__PURE__*/ $constructor("ZodE164", (inst, def) => {
			$ZodE164.init(inst, def);
			ZodStringFormat.init(inst, def);
		});
		const ZodJWT = /*@__PURE__*/ $constructor("ZodJWT", (inst, def) => {
			$ZodJWT.init(inst, def);
			ZodStringFormat.init(inst, def);
		});
		const ZodNumber = /*@__PURE__*/ $constructor("ZodNumber", (inst, def) => {
			$ZodNumber.init(inst, def);
			ZodType.init(inst, def);
			inst._zod.processJSONSchema = (ctx, json, params) => numberProcessor(inst, ctx, json, params);
			_installLazyMethods(inst, "ZodNumber", {
				gt(value, params) {
					return this.check(/* @__PURE__ */ _gt(value, params));
				},
				gte(value, params) {
					return this.check(/* @__PURE__ */ _gte(value, params));
				},
				min(value, params) {
					return this.check(/* @__PURE__ */ _gte(value, params));
				},
				lt(value, params) {
					return this.check(/* @__PURE__ */ _lt(value, params));
				},
				lte(value, params) {
					return this.check(/* @__PURE__ */ _lte(value, params));
				},
				max(value, params) {
					return this.check(/* @__PURE__ */ _lte(value, params));
				},
				int(params) {
					return this.check(int(params));
				},
				safe(params) {
					return this.check(int(params));
				},
				positive(params) {
					return this.check(/* @__PURE__ */ _gt(0, params));
				},
				nonnegative(params) {
					return this.check(/* @__PURE__ */ _gte(0, params));
				},
				negative(params) {
					return this.check(/* @__PURE__ */ _lt(0, params));
				},
				nonpositive(params) {
					return this.check(/* @__PURE__ */ _lte(0, params));
				},
				multipleOf(value, params) {
					return this.check(/* @__PURE__ */ _multipleOf(value, params));
				},
				step(value, params) {
					return this.check(/* @__PURE__ */ _multipleOf(value, params));
				},
				finite() {
					return this;
				}
			});
			const bag = inst._zod.bag;
			inst.minValue = Math.max(bag.minimum ?? Number.NEGATIVE_INFINITY, bag.exclusiveMinimum ?? Number.NEGATIVE_INFINITY) ?? null;
			inst.maxValue = Math.min(bag.maximum ?? Number.POSITIVE_INFINITY, bag.exclusiveMaximum ?? Number.POSITIVE_INFINITY) ?? null;
			inst.isInt = (bag.format ?? "").includes("int") || Number.isSafeInteger(bag.multipleOf ?? .5);
			inst.isFinite = true;
			inst.format = bag.format ?? null;
		});
		function number(params) {
			return /* @__PURE__ */ _number(ZodNumber, params);
		}
		const ZodNumberFormat = /*@__PURE__*/ $constructor("ZodNumberFormat", (inst, def) => {
			$ZodNumberFormat.init(inst, def);
			ZodNumber.init(inst, def);
		});
		function int(params) {
			return /* @__PURE__ */ _int(ZodNumberFormat, params);
		}
		const ZodUnknown = /*@__PURE__*/ $constructor("ZodUnknown", (inst, def) => {
			$ZodUnknown.init(inst, def);
			ZodType.init(inst, def);
			inst._zod.processJSONSchema = (ctx, json, params) => void 0;
		});
		function unknown() {
			return /* @__PURE__ */ _unknown(ZodUnknown);
		}
		const ZodNever = /*@__PURE__*/ $constructor("ZodNever", (inst, def) => {
			$ZodNever.init(inst, def);
			ZodType.init(inst, def);
			inst._zod.processJSONSchema = (ctx, json, params) => neverProcessor(inst, ctx, json, params);
		});
		function never(params) {
			return /* @__PURE__ */ _never(ZodNever, params);
		}
		const ZodArray = /*@__PURE__*/ $constructor("ZodArray", (inst, def) => {
			$ZodArray.init(inst, def);
			ZodType.init(inst, def);
			inst._zod.processJSONSchema = (ctx, json, params) => arrayProcessor(inst, ctx, json, params);
			inst.element = def.element;
			_installLazyMethods(inst, "ZodArray", {
				min(n, params) {
					return this.check(/* @__PURE__ */ _minLength(n, params));
				},
				nonempty(params) {
					return this.check(/* @__PURE__ */ _minLength(1, params));
				},
				max(n, params) {
					return this.check(/* @__PURE__ */ _maxLength(n, params));
				},
				length(n, params) {
					return this.check(/* @__PURE__ */ _length(n, params));
				},
				unwrap() {
					return this.element;
				}
			});
		});
		function array(element, params) {
			return /* @__PURE__ */ _array(ZodArray, element, params);
		}
		const ZodObject = /*@__PURE__*/ $constructor("ZodObject", (inst, def) => {
			$ZodObjectJIT.init(inst, def);
			ZodType.init(inst, def);
			inst._zod.processJSONSchema = (ctx, json, params) => objectProcessor(inst, ctx, json, params);
			defineLazy(inst, "shape", () => {
				return def.shape;
			});
			_installLazyMethods(inst, "ZodObject", {
				keyof() {
					return _enum(Object.keys(this._zod.def.shape));
				},
				catchall(catchall) {
					return this.clone({
						...this._zod.def,
						catchall
					});
				},
				passthrough() {
					return this.clone({
						...this._zod.def,
						catchall: unknown()
					});
				},
				loose() {
					return this.clone({
						...this._zod.def,
						catchall: unknown()
					});
				},
				strict() {
					return this.clone({
						...this._zod.def,
						catchall: never()
					});
				},
				strip() {
					return this.clone({
						...this._zod.def,
						catchall: void 0
					});
				},
				extend(incoming) {
					return extend(this, incoming);
				},
				safeExtend(incoming) {
					return safeExtend(this, incoming);
				},
				merge(other) {
					return merge(this, other);
				},
				pick(mask) {
					return pick(this, mask);
				},
				omit(mask) {
					return omit(this, mask);
				},
				partial(...args) {
					return partial(ZodOptional, this, args[0]);
				},
				required(...args) {
					return required(ZodNonOptional, this, args[0]);
				}
			});
		});
		function object(shape, params) {
			const def = {
				type: "object",
				shape: shape ?? {},
				...normalizeParams(params)
			};
			return new ZodObject(def);
		}
		const ZodUnion = /*@__PURE__*/ $constructor("ZodUnion", (inst, def) => {
			$ZodUnion.init(inst, def);
			ZodType.init(inst, def);
			inst._zod.processJSONSchema = (ctx, json, params) => unionProcessor(inst, ctx, json, params);
			inst.options = def.options;
		});
		function union(options, params) {
			return new ZodUnion({
				type: "union",
				options,
				...normalizeParams(params)
			});
		}
		const ZodIntersection = /*@__PURE__*/ $constructor("ZodIntersection", (inst, def) => {
			$ZodIntersection.init(inst, def);
			ZodType.init(inst, def);
			inst._zod.processJSONSchema = (ctx, json, params) => intersectionProcessor(inst, ctx, json, params);
		});
		function intersection(left, right) {
			return new ZodIntersection({
				type: "intersection",
				left,
				right
			});
		}
		const ZodEnum = /*@__PURE__*/ $constructor("ZodEnum", (inst, def) => {
			$ZodEnum.init(inst, def);
			ZodType.init(inst, def);
			inst._zod.processJSONSchema = (ctx, json, params) => enumProcessor(inst, ctx, json, params);
			inst.enum = def.entries;
			inst.options = Object.values(def.entries);
			const keys = new Set(Object.keys(def.entries));
			inst.extract = (values, params) => {
				const newEntries = {};
				for (const value of values) if (keys.has(value)) newEntries[value] = def.entries[value];
				else throw new Error(`Key ${value} not found in enum`);
				return new ZodEnum({
					...def,
					checks: [],
					...normalizeParams(params),
					entries: newEntries
				});
			};
			inst.exclude = (values, params) => {
				const newEntries = { ...def.entries };
				for (const value of values) if (keys.has(value)) delete newEntries[value];
				else throw new Error(`Key ${value} not found in enum`);
				return new ZodEnum({
					...def,
					checks: [],
					...normalizeParams(params),
					entries: newEntries
				});
			};
		});
		function _enum(values, params) {
			const entries = Array.isArray(values) ? Object.fromEntries(values.map((v) => [v, v])) : values;
			return new ZodEnum({
				type: "enum",
				entries,
				...normalizeParams(params)
			});
		}
		const ZodLiteral = /*@__PURE__*/ $constructor("ZodLiteral", (inst, def) => {
			$ZodLiteral.init(inst, def);
			ZodType.init(inst, def);
			inst._zod.processJSONSchema = (ctx, json, params) => literalProcessor(inst, ctx, json, params);
			inst.values = new Set(def.values);
			Object.defineProperty(inst, "value", { get() {
				if (def.values.length > 1) throw new Error("This schema contains multiple valid literal values. Use `.values` instead.");
				return def.values[0];
			} });
		});
		function literal(value, params) {
			return new ZodLiteral({
				type: "literal",
				values: Array.isArray(value) ? value : [value],
				...normalizeParams(params)
			});
		}
		const ZodTransform = /*@__PURE__*/ $constructor("ZodTransform", (inst, def) => {
			$ZodTransform.init(inst, def);
			ZodType.init(inst, def);
			inst._zod.processJSONSchema = (ctx, json, params) => transformProcessor(inst, ctx, json, params);
			inst._zod.parse = (payload, _ctx) => {
				if (_ctx.direction === "backward") throw new $ZodEncodeError(inst.constructor.name);
				payload.addIssue = (issue$1) => {
					if (typeof issue$1 === "string") payload.issues.push(issue(issue$1, payload.value, def));
					else {
						const _issue = issue$1;
						if (_issue.fatal) _issue.continue = false;
						_issue.code ?? (_issue.code = "custom");
						_issue.input ?? (_issue.input = payload.value);
						_issue.inst ?? (_issue.inst = inst);
						payload.issues.push(issue(_issue));
					}
				};
				const output = def.transform(payload.value, payload);
				if (output instanceof Promise) return output.then((output) => {
					payload.value = output;
					payload.fallback = true;
					return payload;
				});
				payload.value = output;
				payload.fallback = true;
				return payload;
			};
		});
		function transform(fn) {
			return new ZodTransform({
				type: "transform",
				transform: fn
			});
		}
		const ZodOptional = /*@__PURE__*/ $constructor("ZodOptional", (inst, def) => {
			$ZodOptional.init(inst, def);
			ZodType.init(inst, def);
			inst._zod.processJSONSchema = (ctx, json, params) => optionalProcessor(inst, ctx, json, params);
			inst.unwrap = () => inst._zod.def.innerType;
		});
		function optional(innerType) {
			return new ZodOptional({
				type: "optional",
				innerType
			});
		}
		const ZodExactOptional = /*@__PURE__*/ $constructor("ZodExactOptional", (inst, def) => {
			$ZodExactOptional.init(inst, def);
			ZodType.init(inst, def);
			inst._zod.processJSONSchema = (ctx, json, params) => optionalProcessor(inst, ctx, json, params);
			inst.unwrap = () => inst._zod.def.innerType;
		});
		function exactOptional(innerType) {
			return new ZodExactOptional({
				type: "optional",
				innerType
			});
		}
		const ZodNullable = /*@__PURE__*/ $constructor("ZodNullable", (inst, def) => {
			$ZodNullable.init(inst, def);
			ZodType.init(inst, def);
			inst._zod.processJSONSchema = (ctx, json, params) => nullableProcessor(inst, ctx, json, params);
			inst.unwrap = () => inst._zod.def.innerType;
		});
		function nullable(innerType) {
			return new ZodNullable({
				type: "nullable",
				innerType
			});
		}
		const ZodDefault = /*@__PURE__*/ $constructor("ZodDefault", (inst, def) => {
			$ZodDefault.init(inst, def);
			ZodType.init(inst, def);
			inst._zod.processJSONSchema = (ctx, json, params) => defaultProcessor(inst, ctx, json, params);
			inst.unwrap = () => inst._zod.def.innerType;
			inst.removeDefault = inst.unwrap;
		});
		function _default(innerType, defaultValue) {
			return new ZodDefault({
				type: "default",
				innerType,
				get defaultValue() {
					return typeof defaultValue === "function" ? defaultValue() : shallowClone(defaultValue);
				}
			});
		}
		const ZodPrefault = /*@__PURE__*/ $constructor("ZodPrefault", (inst, def) => {
			$ZodPrefault.init(inst, def);
			ZodType.init(inst, def);
			inst._zod.processJSONSchema = (ctx, json, params) => prefaultProcessor(inst, ctx, json, params);
			inst.unwrap = () => inst._zod.def.innerType;
		});
		function prefault(innerType, defaultValue) {
			return new ZodPrefault({
				type: "prefault",
				innerType,
				get defaultValue() {
					return typeof defaultValue === "function" ? defaultValue() : shallowClone(defaultValue);
				}
			});
		}
		const ZodNonOptional = /*@__PURE__*/ $constructor("ZodNonOptional", (inst, def) => {
			$ZodNonOptional.init(inst, def);
			ZodType.init(inst, def);
			inst._zod.processJSONSchema = (ctx, json, params) => nonoptionalProcessor(inst, ctx, json, params);
			inst.unwrap = () => inst._zod.def.innerType;
		});
		function nonoptional(innerType, params) {
			return new ZodNonOptional({
				type: "nonoptional",
				innerType,
				...normalizeParams(params)
			});
		}
		const ZodCatch = /*@__PURE__*/ $constructor("ZodCatch", (inst, def) => {
			$ZodCatch.init(inst, def);
			ZodType.init(inst, def);
			inst._zod.processJSONSchema = (ctx, json, params) => catchProcessor(inst, ctx, json, params);
			inst.unwrap = () => inst._zod.def.innerType;
			inst.removeCatch = inst.unwrap;
		});
		function _catch(innerType, catchValue) {
			return new ZodCatch({
				type: "catch",
				innerType,
				catchValue: typeof catchValue === "function" ? catchValue : () => catchValue
			});
		}
		const ZodPipe = /*@__PURE__*/ $constructor("ZodPipe", (inst, def) => {
			$ZodPipe.init(inst, def);
			ZodType.init(inst, def);
			inst._zod.processJSONSchema = (ctx, json, params) => pipeProcessor(inst, ctx, json, params);
			inst.in = def.in;
			inst.out = def.out;
		});
		function pipe(in_, out) {
			return new ZodPipe({
				type: "pipe",
				in: in_,
				out
			});
		}
		const ZodReadonly = /*@__PURE__*/ $constructor("ZodReadonly", (inst, def) => {
			$ZodReadonly.init(inst, def);
			ZodType.init(inst, def);
			inst._zod.processJSONSchema = (ctx, json, params) => readonlyProcessor(inst, ctx, json, params);
			inst.unwrap = () => inst._zod.def.innerType;
		});
		function readonly(innerType) {
			return new ZodReadonly({
				type: "readonly",
				innerType
			});
		}
		const ZodCustom = /*@__PURE__*/ $constructor("ZodCustom", (inst, def) => {
			$ZodCustom.init(inst, def);
			ZodType.init(inst, def);
			inst._zod.processJSONSchema = (ctx, json, params) => customProcessor(inst, ctx, json, params);
		});
		function refine(fn, _params = {}) {
			return /* @__PURE__ */ _refine(ZodCustom, fn, _params);
		}
		function superRefine(fn, params) {
			return /* @__PURE__ */ _superRefine(fn, params);
		}
		//#endregion
		//#region lib/types/shared/rpc-contract.js
		/** Shared RPC DTOs and fail codes for `explorerFs`. */
		const EXPLORER_FS_SERVICE = "explorerFs";
		//#endregion
		//#region lib/types/client/rpc.js
		/**
		* Client Typert contribution + typed call helpers for `explorerFs`.
		*/
		const FailCode = _enum([
			"OUT_OF_ROOT",
			"NOT_FOUND",
			"NOT_EMPTY",
			"EXISTS",
			"IS_BINARY",
			"IS_DIR",
			"IO"
		]);
		const FailResultSchema = object({
			ok: literal(false),
			code: FailCode,
			message: string()
		});
		const OkResultSchema = object({ ok: literal(true) });
		const RootOkSchema = object({
			ok: literal(true),
			root: string()
		});
		const FsEntrySchema = object({
			name: string(),
			path: string(),
			kind: _enum(["file", "dir"]),
			size: number().optional()
		});
		const ListOkSchema = object({
			ok: literal(true),
			entries: array(FsEntrySchema)
		});
		const ReadOkSchema = object({
			ok: literal(true),
			content: string()
		});
		const RootResultSchema = union([RootOkSchema, FailResultSchema]);
		const ListResultSchema = union([ListOkSchema, FailResultSchema]);
		const ReadResultSchema = union([ReadOkSchema, FailResultSchema]);
		const MutateResultSchema = union([OkResultSchema, FailResultSchema]);
		const PKG = "@supanexus/dsh-plugin-file-explorer";
		const Str = string();
		function strParam(name) {
			return {
				name,
				wire: name,
				source: "json",
				codec: {
					mode: "strict",
					typeSymbol: `${PKG}/types#String`,
					create: () => Str
				}
			};
		}
		function resultCodec(schema, typeSymbol) {
			return {
				mode: "strict",
				typeSymbol: `${PKG}/types#${typeSymbol}`,
				create: () => schema
			};
		}
		function invocation(method, parameters, result) {
			return {
				id: `${PKG}#${EXPLORER_FS_SERVICE}/${method}`,
				service: EXPLORER_FS_SERVICE,
				namespace: EXPLORER_FS_SERVICE,
				method,
				invocation: { kind: "direct" },
				parameters,
				result
			};
		}
		/** Strict Client contribution mounted via `ctx.remote.$mount`. */
		const TYPERT_REMOTE = {
			package: PKG,
			descriptors: [
				invocation("getRoot", [], resultCodec(RootOkSchema, "RootOk")),
				invocation("setRoot", [strParam("root")], resultCodec(RootResultSchema, "RootResult")),
				invocation("list", [strParam("path")], resultCodec(ListResultSchema, "ListResult")),
				invocation("read", [strParam("path")], resultCodec(ReadResultSchema, "ReadResult")),
				invocation("write", [strParam("path"), strParam("content")], resultCodec(MutateResultSchema, "MutateResult")),
				invocation("mkdir", [strParam("path")], resultCodec(MutateResultSchema, "MutateResult")),
				invocation("rename", [strParam("from"), strParam("to")], resultCodec(MutateResultSchema, "MutateResult")),
				invocation("unlink", [strParam("path")], resultCodec(MutateResultSchema, "MutateResult")),
				invocation("revealRoot", [], resultCodec(MutateResultSchema, "MutateResult")),
				invocation("revealPath", [strParam("path")], resultCodec(MutateResultSchema, "MutateResult"))
			]
		};
		async function unwrap(promise) {
			const result = await promise;
			if (!result.ok) return {
				ok: false,
				error: {
					kind: "transport",
					message: result.error.message
				}
			};
			const value = result.value;
			if (typeof value === "object" && value !== null && "ok" in value && value.ok === false) {
				const fail = value;
				return {
					ok: false,
					error: {
						kind: "business",
						message: fail.message,
						code: fail.code
					}
				};
			}
			return {
				ok: true,
				value
			};
		}
		/** Thin helpers over `ctx.remote.explorerFs` after mount. */
		function createExplorerApi(ctx) {
			const remote = () => ctx.remote.explorerFs;
			return {
				getRoot: () => unwrap(remote().getRoot()),
				setRoot: (root) => unwrap(remote().setRoot(root)),
				list: (path) => unwrap(remote().list(path)),
				read: (path) => unwrap(remote().read(path)),
				write: (path, content) => unwrap(remote().write(path, content)),
				mkdir: (path) => unwrap(remote().mkdir(path)),
				rename: (from, to) => unwrap(remote().rename(from, to)),
				unlink: (path) => unwrap(remote().unlink(path)),
				revealRoot: () => unwrap(remote().revealRoot()),
				revealPath: (path) => unwrap(remote().revealPath(path))
			};
		}
		//#endregion
		//#region lib/types/client/state/tabs.js
		/**
		* Client-side tab roster for the file explorer editor.
		*
		* `getSnapshot` MUST return a stable reference between mutations — React's
		* useSyncExternalStore infinite-loops if every call allocates a new object.
		*/
		const EMPTY = {
			open: [],
			activePath: null
		};
		function titleOf(path) {
			if (path === "") return "/";
			const parts = path.split("/");
			return parts[parts.length - 1] || path;
		}
		/**
		* Mutable tab roster with subscribe semantics for React.
		*/
		var TabsStore = class {
			#open = [];
			#activePath = null;
			#snapshot = EMPTY;
			#listeners = /* @__PURE__ */ new Set();
			getSnapshot = () => this.#snapshot;
			subscribe = (listener) => {
				this.#listeners.add(listener);
				return () => {
					this.#listeners.delete(listener);
				};
			};
			/** Open or activate a path. Returns whether a new tab was created. */
			open(path) {
				if (this.#open.find((t) => t.path === path) !== void 0) {
					if (this.#activePath === path) return false;
					this.#activePath = path;
					this.#emit();
					return false;
				}
				this.#open = [...this.#open, {
					path,
					title: titleOf(path)
				}];
				this.#activePath = path;
				this.#emit();
				return true;
			}
			activate(path) {
				if (!this.#open.some((t) => t.path === path)) return;
				if (this.#activePath === path) return;
				this.#activePath = path;
				this.#emit();
			}
			/**
			* Close a tab. Activates neighbor to the right, else left, else null.
			* @returns whether the tab was present.
			*/
			close(path) {
				const index = this.#open.findIndex((t) => t.path === path);
				if (index < 0) return false;
				const next = this.#open.filter((t) => t.path !== path);
				this.#open = next;
				if (this.#activePath === path) {
					const right = next[index];
					const left = next[index - 1];
					this.#activePath = right?.path ?? left?.path ?? null;
				}
				this.#emit();
				return true;
			}
			/** Rename an open tab path (after a successful host rename). */
			rename(from, to) {
				this.#open = this.#open.map((t) => t.path === from ? {
					path: to,
					title: titleOf(to)
				} : t);
				if (this.#activePath === from) this.#activePath = to;
				this.#emit();
			}
			#emit() {
				this.#snapshot = {
					open: this.#open,
					activePath: this.#activePath
				};
				for (const listener of this.#listeners) listener();
			}
		};
		//#endregion
		//#region lib/types/client/state/buffers.js
		/**
		* Per-path editor buffers and dirty tracking.
		*/
		/**
		* Text buffers keyed by relative path.
		*/
		var BuffersStore = class {
			#map = /* @__PURE__ */ new Map();
			#listeners = /* @__PURE__ */ new Set();
			subscribe = (listener) => {
				this.#listeners.add(listener);
				return () => {
					this.#listeners.delete(listener);
				};
			};
			get(path) {
				return this.#map.get(path);
			}
			/** Load or replace buffer from a successful read. Clears dirty. */
			load(path, content) {
				this.#map.set(path, {
					path,
					content,
					savedContent: content
				});
				this.#emit();
			}
			/** Update draft content; dirty when content !== savedContent. */
			setContent(path, content) {
				const prev = this.#map.get(path);
				if (prev !== void 0 && prev.content === content) return;
				if (prev === void 0) this.#map.set(path, {
					path,
					content,
					savedContent: content
				});
				else this.#map.set(path, {
					...prev,
					content
				});
				this.#emit();
			}
			/** Mark current content as saved (after successful write). */
			markSaved(path) {
				const prev = this.#map.get(path);
				if (prev === void 0) return;
				this.#map.set(path, {
					...prev,
					savedContent: prev.content
				});
				this.#emit();
			}
			isDirty(path) {
				const entry = this.#map.get(path);
				if (entry === void 0) return false;
				return entry.content !== entry.savedContent;
			}
			drop(path) {
				if (!this.#map.delete(path)) return;
				this.#emit();
			}
			/** Move buffer after rename. */
			rename(from, to) {
				const prev = this.#map.get(from);
				if (prev === void 0) return;
				this.#map.delete(from);
				this.#map.set(to, {
					...prev,
					path: to
				});
				this.#emit();
			}
			#emit() {
				for (const listener of this.#listeners) listener();
			}
		};
		//#endregion
		//#region lib/types/client/state/md-mode.js
		/**
		* Per-path markdown preview vs source mode (in-memory only).
		*/
		function isMarkdownPath(path) {
			const lower = path.toLowerCase();
			return lower.endsWith(".md") || lower.endsWith(".markdown");
		}
		/**
		* Remember preview/source preference per path for the session.
		*/
		var MdModeStore = class {
			#modes = /* @__PURE__ */ new Map();
			#listeners = /* @__PURE__ */ new Set();
			subscribe = (listener) => {
				this.#listeners.add(listener);
				return () => {
					this.#listeners.delete(listener);
				};
			};
			get(path) {
				return this.#modes.get(path) ?? "source";
			}
			set(path, mode) {
				this.#modes.set(path, mode);
				this.#emit();
			}
			toggle(path) {
				const next = this.get(path) === "preview" ? "source" : "preview";
				this.set(path, next);
				return next;
			}
			rename(from, to) {
				const mode = this.#modes.get(from);
				if (mode === void 0) return;
				this.#modes.delete(from);
				this.#modes.set(to, mode);
				this.#emit();
			}
			drop(path) {
				if (!this.#modes.delete(path)) return;
				this.#emit();
			}
			#emit() {
				for (const listener of this.#listeners) listener();
			}
		};
		//#endregion
		//#region lib/types/client/state/mode.js
		/**
		* In-memory explorer mode flag (sidebar occupancy).
		* Subscribe API matches useSyncExternalStore (`() => void` listeners).
		*/
		var ExplorerModeStore = class {
			enabled = false;
			listeners = /* @__PURE__ */ new Set();
			getSnapshot = () => this.enabled;
			subscribe = (listener) => {
				this.listeners.add(listener);
				return () => {
					this.listeners.delete(listener);
				};
			};
			setEnabled(next) {
				if (this.enabled === next) return;
				this.enabled = next;
				for (const listener of this.listeners) listener();
			}
			toggle() {
				this.setEnabled(!this.enabled);
				return this.enabled;
			}
		};
		//#endregion
		//#region lib/types/client/root-events.js
		/** Notify explorer UI after the Host workspace root is re-pinned. */
		const listeners = /* @__PURE__ */ new Set();
		/** Subscribe to successful session/root pins. */
		function subscribeRootPinned(listener) {
			listeners.add(listener);
			return () => {
				listeners.delete(listener);
			};
		}
		/** Fire after `setRoot` succeeds so the tree reloads against the new cwd. */
		function notifyRootPinned() {
			for (const listener of listeners) listener();
		}
		//#endregion
		//#region lib/types/client/locales.js
		/** Locales for the file explorer plugin. */
		const NS = "file-explorer";
		const zh = {
			viewLabel: "文件",
			emptyWorkspace: "工作区为空",
			settingsTitle: "SupaNexus 文件浏览",
			settingsDescription: "工作区根目录与对话内文件链接打开方式",
			settingsRoot: "兜底根目录",
			settingsRootHint: "会话未钉定 cwd 时使用；会话打开文件浏览时会优先钉到会话工作区",
			settingsOpenLinks: "在编辑器中打开对话内文件链接",
			settingsOpenLinksHint: "拦截会话消息里的本地路径链接，并在文件编辑器中打开",
			expand: "展开",
			collapse: "折叠",
			expandAll: "全部展开",
			collapseAll: "全部折叠",
			readOnly: "当前不可写入设置",
			newFile: "新建文件",
			newFolder: "新建文件夹",
			refresh: "刷新",
			rename: "重命名",
			delete: "删除",
			promptNewFile: "新文件名",
			promptNewFolder: "新文件夹名",
			promptRename: "重命名为",
			confirmDelete: "确定删除「{name}」？",
			openInFileManager: "在文件管理器中打开",
			revealPathInFileManager: "打开文件所在目录",
			tabClose: "关闭",
			tabCloseRight: "关闭右侧",
			tabCloseAll: "关闭所有",
			confirmCloseDirty: "有未保存的更改，确定关闭？",
			editorEmpty: "从左侧目录树打开文件",
			editorSave: "保存",
			editorSource: "源码",
			editorPreview: "预览",
			editorSaved: "已保存",
			editorTextareaMode: "文本框模式",
			treeAriaLabel: "工作区文件",
			editorAppearance: "主题",
			editorTheme: "底色",
			editorThemeDark: "深色",
			editorThemeLight: "浅色",
			editorThemeHighContrast: "高对比",
			editorFontSize: "字号",
			editorFontSmaller: "缩小字号",
			editorFontLarger: "放大字号",
			editorCustomColor: "自定义色值",
			editorCustomColorHint: "支持 #RGB / #RRGGBB / #RRGGBBAA",
			editorCustomColorInvalid: "色值无效，请使用 HTML 十六进制颜色",
			editorCustomColorClear: "清除",
			editorScheme: "方案",
			editorSchemeSave: "保存当前方案",
			editorSchemeEmpty: "暂无已保存方案",
			editorSchemeRemove: "删除方案",
			editorFilePath: "文件路径"
		};
		const en = {
			viewLabel: "Files",
			emptyWorkspace: "Empty workspace",
			settingsTitle: "SupaNexus file explorer",
			settingsDescription: "Workspace root and conversation file-link behavior",
			settingsRoot: "Fallback root",
			settingsRootHint: "Used before a session cwd pin; opening the explorer pins to the session workspace when available",
			settingsOpenLinks: "Open conversation file links in editor",
			settingsOpenLinksHint: "Intercept local path links in conversation messages and open them in the file editor",
			expand: "Expand",
			collapse: "Collapse",
			expandAll: "Expand All",
			collapseAll: "Collapse All",
			readOnly: "Settings are read-only right now",
			newFile: "New file",
			newFolder: "New folder",
			refresh: "Refresh",
			rename: "Rename",
			delete: "Delete",
			promptNewFile: "New file name",
			promptNewFolder: "New folder name",
			promptRename: "Rename to",
			confirmDelete: "Delete \"{name}\"?",
			openInFileManager: "Reveal in file manager",
			revealPathInFileManager: "Reveal in File Manager",
			tabClose: "Close",
			tabCloseRight: "Close to the Right",
			tabCloseAll: "Close All",
			confirmCloseDirty: "Unsaved changes will be discarded. Close anyway?",
			editorEmpty: "Open a file from the explorer",
			editorSave: "Save",
			editorSource: "Source",
			editorPreview: "Preview",
			editorSaved: "Saved",
			editorTextareaMode: "Textarea mode",
			treeAriaLabel: "Workspace files",
			editorAppearance: "Theme",
			editorTheme: "Background",
			editorThemeDark: "Dark",
			editorThemeLight: "Light",
			editorThemeHighContrast: "High contrast",
			editorFontSize: "Font size",
			editorFontSmaller: "Decrease font size",
			editorFontLarger: "Increase font size",
			editorCustomColor: "Custom color",
			editorCustomColorHint: "Accepts #RGB / #RRGGBB / #RRGGBBAA",
			editorCustomColorInvalid: "Invalid color — use an HTML hex value",
			editorCustomColorClear: "Clear",
			editorScheme: "Schemes",
			editorSchemeSave: "Save current scheme",
			editorSchemeEmpty: "No saved schemes yet",
			editorSchemeRemove: "Remove scheme",
			editorFilePath: "File path"
		};
		const dictionaries = {
			zh,
			en
		};
		function explorerT(locale) {
			const table = locale.startsWith("zh") ? zh : en;
			return (key, vars) => {
				let text = table[key];
				if (vars !== void 0) for (const [name, value] of Object.entries(vars)) text = text.replaceAll(`{${name}}`, value);
				return text;
			};
		}
		//#endregion
		//#region lib/types/client/use-explorer-t.js
		/** Subscribe to active locale and return an explorer translate function. */
		/** Reactive `t` for file-explorer copy. */
		function useExplorerT(ctx) {
			return explorerT((0, react.useSyncExternalStore)((listener) => ctx.locale.subscribe(listener), () => ctx.locale.getSnapshot().active));
		}
		//#endregion
		//#region \0dsh-css:/Users/hivanpan/Hivan/project/ykl/project/Whale/whale-harness-free/plugins/packages/ui/dsh-plugin-file-explorer/src/client/explorer/explorer.module.css.mjs
		const css$3 = ".t3VzRa_panel{background:var(--dsw-alias-bg-layer-2);min-width:0;height:100%;min-height:0;color:var(--dsw-alias-label-primary);flex-direction:column;font-size:13px;display:flex;overflow:hidden}.t3VzRa_toolbar{border-bottom:1px solid var(--dsw-alias-border-l2);box-sizing:border-box;flex-shrink:0;justify-content:space-between;align-items:center;gap:8px;min-height:36px;padding:8px 10px;display:flex}.t3VzRa_workspaceName{text-overflow:ellipsis;white-space:nowrap;min-width:0;color:var(--dsw-alias-label-primary);flex:1;font-size:13px;font-weight:600;overflow:hidden}.t3VzRa_toolbarActions{flex-shrink:0;align-items:center;gap:2px;display:flex}.t3VzRa_iconBtn{appearance:none;color:var(--dsw-alias-label-primary);cursor:pointer;background:0 0;border:0;border-radius:4px;justify-content:center;align-items:center;width:26px;height:26px;padding:0;display:inline-flex}.t3VzRa_iconBtn:hover{background:var(--dsw-alias-bg-layer-3)}.t3VzRa_iconBtn:disabled{opacity:.45;cursor:default}.t3VzRa_toolIcon{width:16px;height:16px;display:block}.t3VzRa_toolBtn{appearance:none;border:1px solid var(--dsw-alias-border-l2);background:var(--dsw-alias-bg-layer-3);color:inherit;font:inherit;cursor:pointer;border-radius:6px;padding:4px 8px}.t3VzRa_toolBtn:hover{border-color:var(--dsw-alias-label-dimmed)}.t3VzRa_toolBtn:disabled{opacity:.45;cursor:default}.t3VzRa_errorBanner{color:var(--dsw-alias-danger,#c44);background:var(--dsw-alias-bg-layer-3);border-bottom:1px solid var(--dsw-alias-border-l2);flex-shrink:0;padding:6px 10px}.t3VzRa_treeScroll{overscroll-behavior:contain;scrollbar-gutter:stable both-edges;flex:1;min-width:0;min-height:0;overflow:auto}.t3VzRa_treeScroll::-webkit-scrollbar{width:8px;height:8px}.t3VzRa_treeScroll::-webkit-scrollbar-thumb{background:var(--dsw-alias-scrollbar-bg-l2,color-mix(in srgb,var(--dsw-alias-label-primary)28%,transparent));border-radius:4px}.t3VzRa_treeScroll::-webkit-scrollbar-thumb:hover{background:var(--dsw-alias-scrollbar-hover-l2,color-mix(in srgb,var(--dsw-alias-label-primary)42%,transparent))}.t3VzRa_treeScroll::-webkit-scrollbar-corner{background:0 0}.t3VzRa_tree{vertical-align:top;box-sizing:border-box;cursor:pointer;min-width:100%;margin:0;padding:4px 0 12px;list-style:none;display:inline-block}.t3VzRa_tree>li,.t3VzRa_children>li{display:block}.t3VzRa_empty{color:var(--dsw-alias-label-secondary);cursor:default;padding:16px 12px}.t3VzRa_row{box-sizing:border-box;width:max-content;max-width:none;color:inherit;font:inherit;text-align:left;cursor:pointer;user-select:none;background:0 0;border:0;border-radius:4px;outline:none;align-items:center;gap:4px;padding-top:3px;padding-bottom:3px;padding-right:12px;display:flex;position:relative}.t3VzRa_row:hover{background:var(--dsw-alias-bg-layer-3)}.t3VzRa_row:focus,.t3VzRa_row:focus-visible{cursor:pointer;background:var(--dsw-alias-bg-layer-3);box-shadow:inset 0 0 0 1px var(--dsw-alias-border-l1,var(--dsw-alias-label-dimmed))}.t3VzRa_rowSelected{background:color-mix(in srgb,var(--dsw-alias-label-primary)10%,var(--dsw-alias-bg-layer-3))}.t3VzRa_rowSelected:focus,.t3VzRa_rowSelected:focus-visible{background:color-mix(in srgb,var(--dsw-alias-label-primary)14%,var(--dsw-alias-bg-layer-3))}.t3VzRa_rowSelected:before{content:\"\";background:var(--dsw-alias-label-primary);border-radius:1px;width:2px;position:absolute;top:2px;bottom:2px;left:0}.t3VzRa_rowOpened:not(.t3VzRa_rowSelected){color:var(--dsw-alias-label-primary);font-weight:500}.t3VzRa_rowEditing{cursor:default;background:var(--dsw-alias-bg-layer-3)}.t3VzRa_chevron{opacity:.7;flex-shrink:0;width:14px;height:14px;display:block}.t3VzRa_chevronBtn{appearance:none;color:inherit;cursor:pointer;background:0 0;border:0;border-radius:4px;flex-shrink:0;justify-content:center;align-items:center;width:18px;height:18px;margin:0;padding:0;display:inline-flex}.t3VzRa_chevronBtn:hover{background:var(--dsw-alias-bg-layer-1)}.t3VzRa_chevronPlaceholder{flex-shrink:0;width:18px;height:18px}.t3VzRa_icon{opacity:.85;flex-shrink:0;width:14px;height:14px}.t3VzRa_label{white-space:nowrap;flex:none}.t3VzRa_inlineInput{border:1px solid var(--dsw-alias-border-l1,var(--dsw-alias-border-l2));background:var(--dsw-alias-bg-layer-1);width:12em;min-width:120px;height:22px;color:var(--dsw-alias-label-primary);font:inherit;border-radius:4px;outline:none;flex:0 auto;margin:0;padding:1px 6px}.t3VzRa_inlineInput:focus{border-color:var(--dsw-alias-label-dimmed)}.t3VzRa_children{margin:0;padding:0;list-style:none}.t3VzRa_emptyChild{color:var(--dsw-alias-label-secondary);padding-top:2px;padding-bottom:2px;padding-right:8px;font-size:12px;list-style:none}.t3VzRa_contextMenu{z-index:1000;border:1px solid var(--dsw-alias-border-l2);background:var(--dsw-alias-bg-layer-1);min-width:148px;box-shadow:0 8px 24px color-mix(in srgb,var(--dsw-alias-label-primary)12%,transparent);border-radius:8px;flex-direction:column;gap:2px;margin:0;padding:4px;display:flex;position:fixed}.t3VzRa_contextItem{appearance:none;color:var(--dsw-alias-label-primary);font:inherit;text-align:left;cursor:pointer;background:0 0;border:0;border-radius:6px;padding:7px 10px;font-size:13px}.t3VzRa_contextItem:hover{background:var(--dsw-alias-bg-layer-3)}.t3VzRa_contextItem:disabled{opacity:.45;cursor:default}.t3VzRa_contextItem:disabled:hover{background:0 0}.t3VzRa_contextItemDanger{color:var(--dsw-alias-danger,#c44)}.t3VzRa_contextItemDanger:hover{background:color-mix(in srgb,var(--dsw-alias-danger,#c44)12%,var(--dsw-alias-bg-layer-3))}";
		const tagId$3 = "@supanexus/dsh-plugin-file-explorer/explorer.module.css";
		if (typeof document !== "undefined" && document.querySelector("style[data-plugin-css=" + JSON.stringify(tagId$3) + "]") === null) {
			const tag = document.createElement("style");
			tag.dataset.plugin = "@supanexus/dsh-plugin-file-explorer";
			tag.dataset.pluginCss = tagId$3;
			tag.textContent = css$3;
			document.head.appendChild(tag);
		}
		var explorer_module_css_default = {
			"chevron": "t3VzRa_chevron",
			"chevronBtn": "t3VzRa_chevronBtn",
			"chevronPlaceholder": "t3VzRa_chevronPlaceholder",
			"children": "t3VzRa_children",
			"contextItem": "t3VzRa_contextItem",
			"contextItemDanger": "t3VzRa_contextItemDanger",
			"contextMenu": "t3VzRa_contextMenu",
			"empty": "t3VzRa_empty",
			"emptyChild": "t3VzRa_emptyChild",
			"errorBanner": "t3VzRa_errorBanner",
			"icon": "t3VzRa_icon",
			"iconBtn": "t3VzRa_iconBtn",
			"inlineInput": "t3VzRa_inlineInput",
			"label": "t3VzRa_label",
			"panel": "t3VzRa_panel",
			"row": "t3VzRa_row",
			"rowEditing": "t3VzRa_rowEditing",
			"rowOpened": "t3VzRa_rowOpened",
			"rowSelected": "t3VzRa_rowSelected",
			"toolBtn": "t3VzRa_toolBtn",
			"toolIcon": "t3VzRa_toolIcon",
			"toolbar": "t3VzRa_toolbar",
			"toolbarActions": "t3VzRa_toolbarActions",
			"tree": "t3VzRa_tree",
			"treeScroll": "t3VzRa_treeScroll",
			"workspaceName": "t3VzRa_workspaceName"
		};
		//#endregion
		//#region lib/types/client/explorer/InlineNameInput.js
		/**
		* Shared basename sanitizer and inline name editor for the file tree.
		*/
		/** Reject empty / path-segment / traversal names; strip parent path if pasted. */
		function sanitizeBasename(raw) {
			const trimmed = raw.trim();
			if (trimmed === "") return null;
			const base = trimmed.replaceAll("\\", "/").split("/").filter(Boolean).pop() ?? "";
			if (base === "" || base === "." || base === "..") return null;
			if (base.includes("/") || base.includes("\\")) return null;
			return base;
		}
		function FolderIcon$1() {
			return (0, react_jsx_runtime.jsx)("svg", {
				className: explorer_module_css_default.icon,
				viewBox: "0 0 16 16",
				"aria-hidden": "true",
				children: (0, react_jsx_runtime.jsx)("path", {
					fill: "currentColor",
					d: "M1.5 3.5h5l1 1.5h7v8h-13z",
					opacity: "0.85"
				})
			});
		}
		function FileIcon$1() {
			return (0, react_jsx_runtime.jsx)("svg", {
				className: explorer_module_css_default.icon,
				viewBox: "0 0 16 16",
				"aria-hidden": "true",
				children: (0, react_jsx_runtime.jsx)("path", {
					fill: "currentColor",
					d: "M4 1.5h5.5L13 5v9.5H4z",
					opacity: "0.75"
				})
			});
		}
		/**
		* Tree row with a focused text field. Enter commits; Escape cancels;
		* blur commits when non-empty, otherwise cancels.
		*/
		function InlineNameInput(props) {
			const { depth, kind, initialValue, placeholder, ariaLabel, onCommit, onCancel } = props;
			const ref = (0, react.useRef)(null);
			const finished = (0, react.useRef)(false);
			(0, react.useEffect)(() => {
				const el = ref.current;
				if (el === null) return;
				el.focus();
				el.select();
			}, []);
			const finish = (fn) => {
				if (finished.current) return;
				finished.current = true;
				fn();
			};
			const tryCommit = (raw) => {
				const name = sanitizeBasename(raw);
				if (name === null) {
					finish(onCancel);
					return;
				}
				finish(() => onCommit(name));
			};
			const onKeyDown = (event) => {
				if (event.key === "Enter") {
					event.preventDefault();
					event.stopPropagation();
					tryCommit(event.currentTarget.value);
					return;
				}
				if (event.key === "Escape") {
					event.preventDefault();
					event.stopPropagation();
					finish(onCancel);
				}
			};
			return (0, react_jsx_runtime.jsxs)("div", {
				className: `${explorer_module_css_default.row} ${explorer_module_css_default.rowEditing}`,
				style: { paddingLeft: 8 + depth * 12 },
				"data-file-explorer-inline-edit": "",
				children: [
					(0, react_jsx_runtime.jsx)("span", { className: explorer_module_css_default.chevronPlaceholder }),
					kind === "dir" ? (0, react_jsx_runtime.jsx)(FolderIcon$1, {}) : (0, react_jsx_runtime.jsx)(FileIcon$1, {}),
					(0, react_jsx_runtime.jsx)("input", {
						ref,
						className: explorer_module_css_default.inlineInput,
						defaultValue: initialValue,
						placeholder,
						"aria-label": ariaLabel,
						spellCheck: false,
						onClick: (event) => event.stopPropagation(),
						onKeyDown,
						onBlur: (event) => {
							tryCommit(event.currentTarget.value);
						}
					})
				]
			});
		}
		//#endregion
		//#region lib/types/client/explorer/ToolbarIcons.js
		function IconShell(props) {
			return (0, react_jsx_runtime.jsx)("button", {
				type: "button",
				className: explorer_module_css_default.iconBtn,
				title: props.title,
				"aria-label": props.title,
				onClick: props.onClick,
				children: props.children
			});
		}
		const svgProps = {
			className: explorer_module_css_default.toolIcon,
			viewBox: "0 0 16 16",
			fill: "none",
			"aria-hidden": true
		};
		/** Document with corner plus — new file. */
		function NewFileIconButton(props) {
			return (0, react_jsx_runtime.jsx)(IconShell, {
				title: props.title,
				onClick: props.onClick,
				children: (0, react_jsx_runtime.jsxs)("svg", {
					...svgProps,
					children: [
						(0, react_jsx_runtime.jsx)("path", {
							d: "M4 2.5h5.2L12 5.3V13.5H4V2.5Z",
							stroke: "currentColor",
							strokeWidth: "1.2"
						}),
						(0, react_jsx_runtime.jsx)("path", {
							d: "M9 2.5V5.5H12",
							stroke: "currentColor",
							strokeWidth: "1.2"
						}),
						(0, react_jsx_runtime.jsx)("path", {
							d: "M8 8v4M6 10h4",
							stroke: "currentColor",
							strokeWidth: "1.2",
							strokeLinecap: "round"
						})
					]
				})
			});
		}
		/** Folder with plus — new folder. */
		function NewFolderIconButton(props) {
			return (0, react_jsx_runtime.jsx)(IconShell, {
				title: props.title,
				onClick: props.onClick,
				children: (0, react_jsx_runtime.jsxs)("svg", {
					...svgProps,
					children: [(0, react_jsx_runtime.jsx)("path", {
						d: "M2 4.2h4.2l1.1 1.3H14v6.8H2V4.2Z",
						stroke: "currentColor",
						strokeWidth: "1.2",
						strokeLinejoin: "round"
					}), (0, react_jsx_runtime.jsx)("path", {
						d: "M9.5 7.8v3.2M7.9 9.4h3.2",
						stroke: "currentColor",
						strokeWidth: "1.2",
						strokeLinecap: "round"
					})]
				})
			});
		}
		/** Circular arrows — refresh. */
		function RefreshIconButton(props) {
			return (0, react_jsx_runtime.jsx)(IconShell, {
				title: props.title,
				onClick: props.onClick,
				children: (0, react_jsx_runtime.jsxs)("svg", {
					...svgProps,
					children: [(0, react_jsx_runtime.jsx)("path", {
						d: "M13 8a5 5 0 1 1-1.4-3.4",
						stroke: "currentColor",
						strokeWidth: "1.2",
						strokeLinecap: "round"
					}), (0, react_jsx_runtime.jsx)("path", {
						d: "M13 3.2V6.5H9.7",
						stroke: "currentColor",
						strokeWidth: "1.2",
						strokeLinecap: "round",
						strokeLinejoin: "round"
					})]
				})
			});
		}
		/** Nested chevrons — expand all. */
		function ExpandAllIconButton(props) {
			return (0, react_jsx_runtime.jsx)(IconShell, {
				title: props.title,
				onClick: props.onClick,
				children: (0, react_jsx_runtime.jsxs)("svg", {
					...svgProps,
					children: [(0, react_jsx_runtime.jsx)("path", {
						d: "M3 4.5 8 9l5-4.5",
						stroke: "currentColor",
						strokeWidth: "1.2",
						strokeLinecap: "round",
						strokeLinejoin: "round"
					}), (0, react_jsx_runtime.jsx)("path", {
						d: "M3 8.5 8 13l5-4.5",
						stroke: "currentColor",
						strokeWidth: "1.2",
						strokeLinecap: "round",
						strokeLinejoin: "round"
					})]
				})
			});
		}
		/** Nested chevrons up — collapse all. */
		function CollapseAllIconButton(props) {
			return (0, react_jsx_runtime.jsx)(IconShell, {
				title: props.title,
				onClick: props.onClick,
				children: (0, react_jsx_runtime.jsxs)("svg", {
					...svgProps,
					children: [(0, react_jsx_runtime.jsx)("path", {
						d: "M3 7.5 8 3l5 4.5",
						stroke: "currentColor",
						strokeWidth: "1.2",
						strokeLinecap: "round",
						strokeLinejoin: "round"
					}), (0, react_jsx_runtime.jsx)("path", {
						d: "M3 11.5 8 7l5 4.5",
						stroke: "currentColor",
						strokeWidth: "1.2",
						strokeLinecap: "round",
						strokeLinejoin: "round"
					})]
				})
			});
		}
		/** Plain folder — reveal in OS file manager. */
		function RevealIconButton(props) {
			return (0, react_jsx_runtime.jsx)(IconShell, {
				title: props.title,
				onClick: props.onClick,
				children: (0, react_jsx_runtime.jsx)("svg", {
					...svgProps,
					children: (0, react_jsx_runtime.jsx)("path", {
						d: "M2 4.2h4.2l1.1 1.3H14v6.8H2V4.2Z",
						stroke: "currentColor",
						strokeWidth: "1.2",
						strokeLinejoin: "round"
					})
				})
			});
		}
		//#endregion
		//#region lib/types/client/explorer/ExplorerContextMenu.js
		/**
		* Floating context menu for explorer rows (rename / delete).
		*/
		/**
		* Fixed-position menu; closes on outside click, Escape, or item select.
		*/
		function ExplorerContextMenu(props) {
			const { x, y, items, onClose } = props;
			const rootRef = (0, react.useRef)(null);
			(0, react.useEffect)(() => {
				const onPointer = (event) => {
					const root = rootRef.current;
					if (root !== null && root.contains(event.target)) return;
					onClose();
				};
				const onKey = (event) => {
					if (event.key === "Escape") onClose();
				};
				const timer = window.setTimeout(() => {
					document.addEventListener("mousedown", onPointer, true);
					document.addEventListener("keydown", onKey, true);
				}, 0);
				return () => {
					window.clearTimeout(timer);
					document.removeEventListener("mousedown", onPointer, true);
					document.removeEventListener("keydown", onKey, true);
				};
			}, [onClose]);
			const maxX = typeof window !== "undefined" ? window.innerWidth - 8 : x;
			const maxY = typeof window !== "undefined" ? window.innerHeight - 8 : y;
			const left = Math.min(x, maxX - 160);
			const top = Math.min(y, maxY - 88);
			return (0, react_jsx_runtime.jsx)("div", {
				ref: rootRef,
				className: explorer_module_css_default.contextMenu,
				style: {
					left,
					top
				},
				role: "menu",
				"data-file-explorer-context-menu": "",
				children: items.map((item) => (0, react_jsx_runtime.jsx)("button", {
					type: "button",
					role: "menuitem",
					disabled: item.disabled === true,
					className: item.danger === true ? `${explorer_module_css_default.contextItem} ${explorer_module_css_default.contextItemDanger}` : explorer_module_css_default.contextItem,
					onClick: () => {
						if (item.disabled === true) return;
						onClose();
						item.onSelect();
					},
					children: item.label
				}, item.id))
			});
		}
		//#endregion
		//#region lib/types/client/explorer/scroll-tree-row.js
		/**
		* Scroll a tree row into the explorer's dedicated scrollport (not the page).
		* Native scrollIntoView often fails here because ancestors use overflow:hidden.
		*/
		const SCROLL_PAD = 12;
		function scrollTreeRowIntoView(row) {
			const scroller = row.closest("[data-file-explorer-tree-scroll]");
			if (!(scroller instanceof HTMLElement)) return;
			const rowRect = row.getBoundingClientRect();
			const box = scroller.getBoundingClientRect();
			let nextLeft = scroller.scrollLeft;
			let nextTop = scroller.scrollTop;
			if (rowRect.right > box.right - SCROLL_PAD) nextLeft += rowRect.right - box.right + SCROLL_PAD;
			else if (rowRect.left < box.left + SCROLL_PAD) nextLeft -= box.left + SCROLL_PAD - rowRect.left;
			if (rowRect.bottom > box.bottom - SCROLL_PAD) nextTop += rowRect.bottom - box.bottom + SCROLL_PAD;
			else if (rowRect.top < box.top + SCROLL_PAD) nextTop -= box.top + SCROLL_PAD - rowRect.top;
			if (nextLeft !== scroller.scrollLeft || nextTop !== scroller.scrollTop) scroller.scrollTo({
				left: Math.max(0, nextLeft),
				top: Math.max(0, nextTop)
			});
		}
		//#endregion
		//#region lib/types/client/explorer/TreeNode.js
		/**
		* Single tree node with lazy children; rename/create via inline edit + context menu.
		*/
		function FolderIcon() {
			return (0, react_jsx_runtime.jsx)("svg", {
				className: explorer_module_css_default.icon,
				viewBox: "0 0 16 16",
				"aria-hidden": "true",
				children: (0, react_jsx_runtime.jsx)("path", {
					fill: "currentColor",
					d: "M1.5 3.5h5l1 1.5h7v8h-13z",
					opacity: "0.85"
				})
			});
		}
		function FileIcon() {
			return (0, react_jsx_runtime.jsx)("svg", {
				className: explorer_module_css_default.icon,
				viewBox: "0 0 16 16",
				"aria-hidden": "true",
				children: (0, react_jsx_runtime.jsx)("path", {
					fill: "currentColor",
					d: "M4 1.5h5.5L13 5v9.5H4z",
					opacity: "0.75"
				})
			});
		}
		function Chevron({ open }) {
			return (0, react_jsx_runtime.jsx)("svg", {
				className: explorer_module_css_default.chevron,
				viewBox: "0 0 16 16",
				"aria-hidden": "true",
				style: {
					transform: open ? "rotate(90deg)" : void 0,
					transition: "transform 0.12s"
				},
				children: (0, react_jsx_runtime.jsx)("path", {
					fill: "currentColor",
					d: "M6 3l5 5-5 5z"
				})
			});
		}
		function joinPath(parent, name) {
			return parent === "" ? name : `${parent}/${name}`;
		}
		function parentPath(path) {
			return path.includes("/") ? path.slice(0, path.lastIndexOf("/")) : "";
		}
		/**
		* Render one filesystem entry; directories expand lazily via `api.list`.
		*/
		function TreeNode(props) {
			const { entry, depth, api, t, activePath, selectedPath, onSelect, onOpenFile, onError, onTreeMutated, refreshToken, expandSignal, collapseSignal } = props;
			const [expanded, setExpanded] = (0, react.useState)(false);
			const [children, setChildren] = (0, react.useState)(null);
			const [loading, setLoading] = (0, react.useState)(false);
			const [menu, setMenu] = (0, react.useState)(null);
			const [renaming, setRenaming] = (0, react.useState)(false);
			const [childDraft, setChildDraft] = (0, react.useState)(null);
			const loadChildren = (0, react.useCallback)(async () => {
				setLoading(true);
				const result = await api.list(entry.path);
				setLoading(false);
				if (!result.ok) {
					onError(result.error.message);
					return;
				}
				setChildren(result.value.entries);
			}, [
				api,
				entry.path,
				onError
			]);
			(0, react.useEffect)(() => {
				if (!expanded) return;
				loadChildren();
			}, [
				expanded,
				refreshToken,
				loadChildren
			]);
			(0, react.useEffect)(() => {
				if (expandSignal === 0 || entry.kind !== "dir") return;
				setExpanded(true);
			}, [expandSignal, entry.kind]);
			(0, react.useEffect)(() => {
				if (collapseSignal === 0 || entry.kind !== "dir") return;
				setExpanded(false);
			}, [collapseSignal, entry.kind]);
			const toggleExpand = () => {
				if (entry.kind !== "dir") return;
				setExpanded((v) => !v);
			};
			const onRowClick = () => {
				if (renaming) return;
				onSelect(entry.path);
				if (entry.kind === "dir") {
					toggleExpand();
					return;
				}
				onOpenFile(entry.path);
			};
			const commitRename = async (name) => {
				setRenaming(false);
				if (name === entry.name) return;
				const to = joinPath(parentPath(entry.path), name);
				const result = await api.rename(entry.path, to);
				if (!result.ok) {
					onError(result.error.message);
					return;
				}
				onSelect(to);
				onTreeMutated();
			};
			const commitChildCreate = async (kind, name) => {
				setChildDraft(null);
				const path = joinPath(entry.path, name);
				if (kind === "file") {
					const result = await api.write(path, "");
					if (!result.ok) {
						onError(result.error.message);
						return;
					}
					onTreeMutated();
					onSelect(path);
					onOpenFile(path);
					return;
				}
				const result = await api.mkdir(path);
				if (!result.ok) {
					onError(result.error.message);
					return;
				}
				onSelect(path);
				onTreeMutated();
			};
			const startChildDraft = (kind) => {
				setExpanded(true);
				setChildDraft(kind);
			};
			const remove = async () => {
				if (!window.confirm(t("confirmDelete", { name: entry.name }))) return;
				const result = await api.unlink(entry.path);
				if (!result.ok) {
					onError(result.error.message);
					return;
				}
				onTreeMutated();
			};
			const revealInFileManager = async () => {
				const result = await api.revealPath(entry.path);
				if (!result.ok) onError(result.error.message);
			};
			const selected = entry.path === selectedPath;
			const opened = entry.path === activePath;
			const rowRef = (0, react.useRef)(null);
			const rowClass = [
				explorer_module_css_default.row,
				selected ? explorer_module_css_default.rowSelected : "",
				opened && !selected ? explorer_module_css_default.rowOpened : ""
			].filter(Boolean).join(" ");
			(0, react.useEffect)(() => {
				if (!selected) return;
				const row = rowRef.current;
				if (row === null) return;
				const id = window.requestAnimationFrame(() => {
					scrollTreeRowIntoView(row);
				});
				return () => window.cancelAnimationFrame(id);
			}, [selected, expanded]);
			const menuItems = entry.kind === "dir" ? [
				{
					id: "expand-toggle",
					label: expanded ? t("collapse") : t("expand"),
					onSelect: () => {
						toggleExpand();
					}
				},
				{
					id: "reveal",
					label: t("revealPathInFileManager"),
					onSelect: () => {
						revealInFileManager();
					}
				},
				{
					id: "new-file",
					label: t("newFile"),
					onSelect: () => {
						startChildDraft("file");
					}
				},
				{
					id: "new-folder",
					label: t("newFolder"),
					onSelect: () => {
						startChildDraft("dir");
					}
				},
				{
					id: "rename",
					label: t("rename"),
					onSelect: () => {
						setRenaming(true);
					}
				},
				{
					id: "delete",
					label: t("delete"),
					danger: true,
					onSelect: () => {
						remove();
					}
				}
			] : [
				{
					id: "reveal",
					label: t("revealPathInFileManager"),
					onSelect: () => {
						revealInFileManager();
					}
				},
				{
					id: "rename",
					label: t("rename"),
					onSelect: () => {
						setRenaming(true);
					}
				},
				{
					id: "delete",
					label: t("delete"),
					danger: true,
					onSelect: () => {
						remove();
					}
				}
			];
			return (0, react_jsx_runtime.jsxs)("li", { children: [
				renaming ? (0, react_jsx_runtime.jsx)(InlineNameInput, {
					depth,
					kind: entry.kind,
					initialValue: entry.name,
					placeholder: t("promptRename"),
					ariaLabel: t("rename"),
					onCancel: () => setRenaming(false),
					onCommit: (name) => {
						commitRename(name);
					}
				}) : (0, react_jsx_runtime.jsxs)("div", {
					ref: rowRef,
					className: rowClass,
					style: { paddingLeft: 8 + depth * 12 },
					title: entry.path || entry.name,
					role: "treeitem",
					"aria-selected": selected,
					"aria-expanded": entry.kind === "dir" ? expanded : void 0,
					onClick: onRowClick,
					onContextMenu: (event) => {
						event.preventDefault();
						event.stopPropagation();
						onSelect(entry.path);
						setMenu({
							x: event.clientX,
							y: event.clientY
						});
					},
					onKeyDown: (event) => {
						if (entry.kind === "dir" && event.key === "ArrowRight") {
							event.preventDefault();
							onSelect(entry.path);
							setExpanded(true);
							return;
						}
						if (entry.kind === "dir" && event.key === "ArrowLeft") {
							event.preventDefault();
							onSelect(entry.path);
							setExpanded(false);
							return;
						}
						if (event.key === "Enter" || event.key === " ") {
							event.preventDefault();
							onRowClick();
						}
						if (event.key === "F2") {
							event.preventDefault();
							onSelect(entry.path);
							setRenaming(true);
						}
					},
					tabIndex: 0,
					children: [
						entry.kind === "dir" ? (0, react_jsx_runtime.jsx)("button", {
							type: "button",
							className: explorer_module_css_default.chevronBtn,
							"aria-label": expanded ? t("collapse") : t("expand"),
							tabIndex: -1,
							onClick: (event) => {
								event.preventDefault();
								event.stopPropagation();
								onSelect(entry.path);
								toggleExpand();
							},
							children: (0, react_jsx_runtime.jsx)(Chevron, { open: expanded })
						}) : (0, react_jsx_runtime.jsx)("span", { className: explorer_module_css_default.chevronPlaceholder }),
						entry.kind === "dir" ? (0, react_jsx_runtime.jsx)(FolderIcon, {}) : (0, react_jsx_runtime.jsx)(FileIcon, {}),
						(0, react_jsx_runtime.jsxs)("span", {
							className: explorer_module_css_default.label,
							children: [entry.name, loading ? "…" : ""]
						})
					]
				}),
				menu !== null ? (0, react_jsx_runtime.jsx)(ExplorerContextMenu, {
					x: menu.x,
					y: menu.y,
					onClose: () => setMenu(null),
					items: menuItems
				}) : null,
				entry.kind === "dir" && expanded ? (0, react_jsx_runtime.jsxs)("ul", {
					className: explorer_module_css_default.children,
					role: "group",
					children: [
						childDraft !== null ? (0, react_jsx_runtime.jsx)("li", { children: (0, react_jsx_runtime.jsx)(InlineNameInput, {
							depth: depth + 1,
							kind: childDraft,
							initialValue: "",
							placeholder: childDraft === "file" ? t("promptNewFile") : t("promptNewFolder"),
							ariaLabel: childDraft === "file" ? t("newFile") : t("newFolder"),
							onCancel: () => setChildDraft(null),
							onCommit: (name) => {
								commitChildCreate(childDraft, name);
							}
						}) }, `draft-${childDraft}`) : null,
						children !== null ? children.map((child) => (0, react_jsx_runtime.jsx)(TreeNode, {
							entry: child,
							depth: depth + 1,
							api,
							t,
							activePath,
							selectedPath,
							onSelect,
							onOpenFile,
							onError,
							onTreeMutated,
							refreshToken,
							expandSignal,
							collapseSignal
						}, child.path)) : null,
						children !== null && children.length === 0 && childDraft === null ? (0, react_jsx_runtime.jsx)("li", {
							className: explorer_module_css_default.emptyChild,
							style: { paddingLeft: 8 + (depth + 1) * 12 },
							children: t("emptyWorkspace")
						}) : null
					]
				}) : null
			] });
		}
		//#endregion
		//#region lib/types/client/explorer/ExplorerPanel.js
		/**
		* Sidebar explorer panel: workspace header + icon actions + root listing.
		*/
		var PanelBoundary = class extends react.Component {
			state = { message: null };
			static getDerivedStateFromError(error) {
				return { message: error.message };
			}
			componentDidCatch(error, info) {
				console.error("[file-explorer] panel crash", error, info);
			}
			render() {
				if (this.state.message !== null) return (0, react_jsx_runtime.jsx)("div", {
					className: explorer_module_css_default.errorBanner,
					children: this.state.message
				});
				return this.props.children;
			}
		};
		/** Basename for display; browser bundle may not have node:path — keep a fallback. */
		function workspaceLabel(root) {
			const normalized = root.replaceAll("\\", "/").replace(/\/+$/, "");
			return (normalized.includes("/") ? normalized.slice(normalized.lastIndexOf("/") + 1) : normalized) || root || "workspace";
		}
		/**
		* Root listing with create-file / create-dir actions.
		*/
		function ExplorerPanel(props) {
			return (0, react_jsx_runtime.jsx)(PanelBoundary, { children: (0, react_jsx_runtime.jsx)(ExplorerPanelInner, { ...props }) });
		}
		function ExplorerPanelInner(props) {
			const { ctx, api, tabs, onOpenFile } = props;
			const t = useExplorerT(ctx);
			const activePath = (0, react.useSyncExternalStore)(tabs.subscribe, () => tabs.getSnapshot().activePath);
			const [entries, setEntries] = (0, react.useState)([]);
			const [error, setError] = (0, react.useState)(null);
			const [refreshToken, setRefreshToken] = (0, react.useState)(0);
			const [expandSignal, setExpandSignal] = (0, react.useState)(0);
			const [collapseSignal, setCollapseSignal] = (0, react.useState)(0);
			const [rootDraft, setRootDraft] = (0, react.useState)(null);
			const [selectedPath, setSelectedPath] = (0, react.useState)(null);
			const [rootPath, setRootPath] = (0, react.useState)("");
			(0, react.useEffect)(() => {
				if (activePath !== null) setSelectedPath(activePath);
			}, [activePath]);
			const reload = (0, react.useCallback)(async () => {
				const [listResult, rootResult] = await Promise.all([api.list(""), api.getRoot()]);
				if (rootResult.ok) setRootPath(rootResult.value.root);
				if (!listResult.ok) {
					setError(listResult.error.message);
					return;
				}
				setError(null);
				setEntries(listResult.value.entries);
			}, [api]);
			(0, react.useEffect)(() => {
				reload();
			}, [reload, refreshToken]);
			(0, react.useEffect)(() => subscribeRootPinned(() => {
				setRefreshToken((n) => n + 1);
			}), []);
			const bump = () => {
				setRefreshToken((n) => n + 1);
			};
			const commitRootCreate = async (kind, name) => {
				setRootDraft(null);
				const path = name;
				if (kind === "file") {
					const result = await api.write(path, "");
					if (!result.ok) {
						setError(result.error.message);
						return;
					}
					bump();
					setSelectedPath(path);
					onOpenFile(path);
					return;
				}
				const result = await api.mkdir(path);
				if (!result.ok) {
					setError(result.error.message);
					return;
				}
				bump();
				setSelectedPath(path);
			};
			const revealRoot = async () => {
				const result = await api.revealRoot();
				if (!result.ok) setError(result.error.message);
			};
			const title = workspaceLabel(rootPath);
			return (0, react_jsx_runtime.jsxs)("div", {
				className: explorer_module_css_default.panel,
				"data-file-explorer-panel": "",
				children: [
					(0, react_jsx_runtime.jsxs)("div", {
						className: explorer_module_css_default.toolbar,
						children: [(0, react_jsx_runtime.jsx)("div", {
							className: explorer_module_css_default.workspaceName,
							title: rootPath || void 0,
							children: title
						}), (0, react_jsx_runtime.jsxs)("div", {
							className: explorer_module_css_default.toolbarActions,
							children: [
								(0, react_jsx_runtime.jsx)(NewFileIconButton, {
									title: t("newFile"),
									onClick: () => setRootDraft("file")
								}),
								(0, react_jsx_runtime.jsx)(NewFolderIconButton, {
									title: t("newFolder"),
									onClick: () => setRootDraft("dir")
								}),
								(0, react_jsx_runtime.jsx)(ExpandAllIconButton, {
									title: t("expandAll"),
									onClick: () => setExpandSignal((n) => n + 1)
								}),
								(0, react_jsx_runtime.jsx)(CollapseAllIconButton, {
									title: t("collapseAll"),
									onClick: () => setCollapseSignal((n) => n + 1)
								}),
								(0, react_jsx_runtime.jsx)(RefreshIconButton, {
									title: t("refresh"),
									onClick: () => bump()
								}),
								(0, react_jsx_runtime.jsx)(RevealIconButton, {
									title: t("openInFileManager"),
									onClick: () => void revealRoot()
								})
							]
						})]
					}),
					error !== null ? (0, react_jsx_runtime.jsx)("div", {
						className: explorer_module_css_default.errorBanner,
						children: error
					}) : null,
					entries.length === 0 && rootDraft === null ? (0, react_jsx_runtime.jsx)("div", {
						className: explorer_module_css_default.empty,
						children: t("emptyWorkspace")
					}) : (0, react_jsx_runtime.jsx)("div", {
						className: explorer_module_css_default.treeScroll,
						"data-file-explorer-tree-scroll": "",
						children: (0, react_jsx_runtime.jsxs)("ul", {
							className: explorer_module_css_default.tree,
							role: "tree",
							children: [rootDraft !== null ? (0, react_jsx_runtime.jsx)("li", { children: (0, react_jsx_runtime.jsx)(InlineNameInput, {
								depth: 0,
								kind: rootDraft,
								initialValue: "",
								placeholder: rootDraft === "file" ? t("promptNewFile") : t("promptNewFolder"),
								ariaLabel: rootDraft === "file" ? t("newFile") : t("newFolder"),
								onCancel: () => setRootDraft(null),
								onCommit: (name) => {
									commitRootCreate(rootDraft, name);
								}
							}) }, `draft-${rootDraft}`) : null, entries.map((entry) => (0, react_jsx_runtime.jsx)(TreeNode, {
								entry,
								depth: 0,
								api,
								t,
								activePath,
								selectedPath,
								onSelect: setSelectedPath,
								onOpenFile,
								onError: setError,
								onTreeMutated: bump,
								refreshToken,
								expandSignal,
								collapseSignal
							}, entry.path))]
						})
					})
				]
			});
		}
		//#endregion
		//#region lib/types/client/editor/monaco-loader.js
		/**
		* Load Monaco from jsDelivr; callers fall back to textarea on failure.
		*/
		const MONACO_CDN = "https://cdn.jsdelivr.net/npm/monaco-editor@0.52.2/min/vs";
		const LOAD_TIMEOUT_MS = 12e3;
		let loading = null;
		/**
		* Ensure Monaco AMD loader + editor are available.
		*/
		function loadMonaco() {
			if (typeof window === "undefined") return Promise.reject(/* @__PURE__ */ new Error("monaco requires a browser"));
			if (window.monaco !== void 0) return Promise.resolve(window.monaco);
			if (loading !== null) return loading;
			loading = new Promise((resolve, reject) => {
				const timer = window.setTimeout(() => {
					loading = null;
					reject(/* @__PURE__ */ new Error("monaco load timed out"));
				}, LOAD_TIMEOUT_MS);
				const finish = (monaco) => {
					window.clearTimeout(timer);
					window.monaco = monaco;
					resolve(monaco);
				};
				const startRequire = () => {
					if (window.require === void 0) {
						loading = null;
						window.clearTimeout(timer);
						reject(/* @__PURE__ */ new Error("monaco AMD loader missing"));
						return;
					}
					window.require.config({ paths: { vs: MONACO_CDN } });
					window.require(["vs/editor/editor.main"], (monaco) => {
						finish(monaco);
					});
				};
				if (window.require !== void 0) {
					startRequire();
					return;
				}
				const script = document.createElement("script");
				script.src = `${MONACO_CDN}/loader.js`;
				script.async = true;
				script.onload = () => startRequire();
				script.onerror = () => {
					loading = null;
					window.clearTimeout(timer);
					reject(/* @__PURE__ */ new Error("monaco loader script failed"));
				};
				document.head.appendChild(script);
			}).catch((error) => {
				loading = null;
				throw error;
			});
			return loading;
		}
		/** Map a relative path to a Monaco language id. */
		function languageForPath(path) {
			const lower = path.toLowerCase();
			if (lower.endsWith(".ts") || lower.endsWith(".tsx")) return "typescript";
			if (lower.endsWith(".js") || lower.endsWith(".jsx") || lower.endsWith(".mjs")) return "javascript";
			if (lower.endsWith(".json")) return "json";
			if (lower.endsWith(".md") || lower.endsWith(".markdown")) return "markdown";
			if (lower.endsWith(".css") || lower.endsWith(".scss")) return "css";
			if (lower.endsWith(".html") || lower.endsWith(".htm")) return "html";
			if (lower.endsWith(".yml") || lower.endsWith(".yaml")) return "yaml";
			if (lower.endsWith(".py")) return "python";
			if (lower.endsWith(".go")) return "go";
			if (lower.endsWith(".rs")) return "rust";
			if (lower.endsWith(".sh") || lower.endsWith(".bash")) return "shell";
			return "plaintext";
		}
		//#endregion
		//#region lib/types/client/editor/appearance.js
		/**
		* Persisted Monaco / textarea appearance (theme, optional custom bg, font size, schemes).
		* Intentionally not named themeStore — keep clear of upstream naming.
		*/
		const STORAGE_KEY = "supanexus-file-explorer:editor-appearance";
		const SCHEMES_KEY = "supanexus-file-explorer:editor-appearance-schemes";
		const FONT_MIN = 11;
		const FONT_MAX = 24;
		const FONT_DEFAULT = 13;
		const SCHEMES_MAX = 12;
		const CUSTOM_THEME_ID = "supanexus-file-explorer-custom";
		const THEMES = [
			"vs-dark",
			"vs",
			"hc-black"
		];
		const HEX_RE = /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/;
		function clampFont(size) {
			if (!Number.isFinite(size)) return FONT_DEFAULT;
			return Math.min(FONT_MAX, Math.max(FONT_MIN, Math.round(size)));
		}
		function parseTheme(raw) {
			return THEMES.includes(raw) ? raw : "vs-dark";
		}
		/** Normalize and validate an HTML hex color; returns null when invalid. */
		function normalizeHexColor(raw) {
			const trimmed = raw.trim();
			if (!HEX_RE.test(trimmed)) return null;
			if (trimmed.length === 4) {
				const r = trimmed[1];
				const g = trimmed[2];
				const b = trimmed[3];
				return `#${r}${r}${g}${g}${b}${b}`.toLowerCase();
			}
			return trimmed.toLowerCase();
		}
		/** Color input (`#rrggbb`) value derived from a stored custom color. */
		function hexForColorInput(custom, theme) {
			if (custom !== null) {
				if (custom.length === 9) return custom.slice(0, 7);
				return custom;
			}
			if (theme === "vs") return "#ffffff";
			if (theme === "hc-black") return "#000000";
			return "#1e1e1e";
		}
		function parseCustomBackground(raw) {
			if (typeof raw !== "string") return null;
			return normalizeHexColor(raw);
		}
		function newSchemeId() {
			return `s_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 7)}`;
		}
		function parseSchemes(raw) {
			if (!Array.isArray(raw)) return [];
			const out = [];
			for (const item of raw) {
				if (item === null || typeof item !== "object") continue;
				const row = item;
				const background = typeof row.background === "string" ? normalizeHexColor(row.background) : null;
				if (background === null) continue;
				const fontSize = clampFont(typeof row.fontSize === "number" ? row.fontSize : FONT_DEFAULT);
				const id = typeof row.id === "string" && row.id.length > 0 ? row.id : newSchemeId();
				out.push({
					id,
					background,
					fontSize
				});
				if (out.length >= SCHEMES_MAX) break;
			}
			return out;
		}
		function defaults() {
			return {
				theme: "vs-dark",
				customBackground: null,
				fontSize: FONT_DEFAULT,
				schemes: []
			};
		}
		function readStoredAppearance() {
			try {
				const raw = window.localStorage.getItem(STORAGE_KEY);
				if (raw === null) return {
					theme: "vs-dark",
					customBackground: null,
					fontSize: FONT_DEFAULT
				};
				const parsed = JSON.parse(raw);
				return {
					theme: parseTheme(parsed.theme),
					customBackground: parseCustomBackground(parsed.customBackground),
					fontSize: clampFont(typeof parsed.fontSize === "number" ? parsed.fontSize : FONT_DEFAULT)
				};
			} catch {
				return {
					theme: "vs-dark",
					customBackground: null,
					fontSize: FONT_DEFAULT
				};
			}
		}
		function readStoredSchemes() {
			try {
				const raw = window.localStorage.getItem(SCHEMES_KEY);
				if (raw === null) return [];
				return parseSchemes(JSON.parse(raw));
			} catch {
				return [];
			}
		}
		/**
		* Mutable appearance prefs with subscribe semantics for React.
		* `getSnapshot` MUST return a stable reference between mutations.
		*/
		var EditorAppearanceStore = class {
			#theme = "vs-dark";
			#customBackground = null;
			#fontSize = FONT_DEFAULT;
			#schemes = [];
			#hydrated = false;
			#snapshot = defaults();
			#listeners = /* @__PURE__ */ new Set();
			getSnapshot = () => this.#snapshot;
			subscribe = (listener) => {
				this.#listeners.add(listener);
				return () => {
					this.#listeners.delete(listener);
				};
			};
			/** Load from localStorage once on the client. */
			hydrate() {
				if (this.#hydrated) return;
				this.#hydrated = true;
				if (typeof window === "undefined") return;
				const next = readStoredAppearance();
				this.#theme = next.theme;
				this.#customBackground = next.customBackground;
				this.#fontSize = next.fontSize;
				this.#schemes = readStoredSchemes();
				this.#refreshSnapshot();
				this.#emit();
			}
			setTheme(theme) {
				if (this.#theme === theme && this.#customBackground === null) return;
				this.#theme = theme;
				this.#customBackground = null;
				this.#refreshSnapshot();
				this.#persistAppearance();
				this.#emit();
			}
			/**
			* Set or clear a custom background hex.
			* @returns whether the value was accepted (invalid hex ignored when non-empty).
			*/
			setCustomBackground(raw) {
				if (raw === null || raw.trim() === "") {
					if (this.#customBackground === null) return true;
					this.#customBackground = null;
					this.#refreshSnapshot();
					this.#persistAppearance();
					this.#emit();
					return true;
				}
				const next = normalizeHexColor(raw);
				if (next === null) return false;
				if (this.#customBackground === next) return true;
				this.#customBackground = next;
				this.#refreshSnapshot();
				this.#persistAppearance();
				this.#emit();
				return true;
			}
			setFontSize(size) {
				const next = clampFont(size);
				if (this.#fontSize === next) return;
				this.#fontSize = next;
				this.#refreshSnapshot();
				this.#persistAppearance();
				this.#emit();
			}
			bumpFont(delta) {
				this.setFontSize(this.#fontSize + delta);
			}
			/**
			* Persist current color + font as a named scheme.
			* @param backgroundOverride optional hex (e.g. menu draft) instead of current store color.
			* @returns whether a scheme was written.
			*/
			saveScheme(backgroundOverride) {
				const background = (backgroundOverride !== void 0 ? normalizeHexColor(backgroundOverride) : null) ?? this.#customBackground ?? hexForColorInput(null, this.#theme);
				const fontSize = this.#fontSize;
				const existing = this.#schemes.findIndex((s) => s.background === background && s.fontSize === fontSize);
				if (existing >= 0) {
					const hit = this.#schemes[existing];
					this.#schemes = [hit, ...this.#schemes.filter((_, i) => i !== existing)];
					this.#refreshSnapshot();
					this.#persistSchemes();
					this.#emit();
					return true;
				}
				const next = {
					id: newSchemeId(),
					background,
					fontSize
				};
				this.#schemes = [next, ...this.#schemes].slice(0, SCHEMES_MAX);
				this.#refreshSnapshot();
				this.#persistSchemes();
				this.#emit();
				return true;
			}
			/** Apply a saved scheme (color + font). */
			applyScheme(id) {
				const scheme = this.#schemes.find((s) => s.id === id);
				if (scheme === void 0) return false;
				this.#customBackground = scheme.background;
				this.#fontSize = scheme.fontSize;
				this.#refreshSnapshot();
				this.#persistAppearance();
				this.#emit();
				return true;
			}
			removeScheme(id) {
				const next = this.#schemes.filter((s) => s.id !== id);
				if (next.length === this.#schemes.length) return;
				this.#schemes = next;
				this.#refreshSnapshot();
				this.#persistSchemes();
				this.#emit();
			}
			#refreshSnapshot() {
				this.#snapshot = {
					theme: this.#theme,
					customBackground: this.#customBackground,
					fontSize: this.#fontSize,
					schemes: this.#schemes
				};
			}
			#persistAppearance() {
				if (typeof window === "undefined") return;
				try {
					window.localStorage.setItem(STORAGE_KEY, JSON.stringify({
						theme: this.#theme,
						customBackground: this.#customBackground,
						fontSize: this.#fontSize
					}));
				} catch {}
			}
			#persistSchemes() {
				if (typeof window === "undefined") return;
				try {
					window.localStorage.setItem(SCHEMES_KEY, JSON.stringify(this.#schemes));
				} catch {}
			}
			#emit() {
				for (const listener of this.#listeners) listener();
			}
		};
		const EDITOR_CUSTOM_THEME_ID = CUSTOM_THEME_ID;
		//#endregion
		//#region lib/types/client/editor/apply-monaco-appearance.js
		/**
		* Apply appearance prefs to a loaded Monaco namespace (theme + optional custom bg).
		*/
		/**
		* Register / select Monaco theme for the current appearance snapshot.
		*/
		function applyMonacoAppearance(monaco, appearance) {
			const custom = appearance.customBackground;
			if (custom === null) {
				monaco.editor.setTheme(appearance.theme);
				return;
			}
			const base = appearance.theme === "vs" ? "vs" : appearance.theme === "hc-black" ? "hc-black" : "vs-dark";
			monaco.editor.defineTheme(EDITOR_CUSTOM_THEME_ID, {
				base,
				inherit: true,
				rules: [],
				colors: {
					"editor.background": custom,
					"editorGutter.background": custom,
					"editorLineNumber.foreground": base === "vs" ? "#237893" : "#858585"
				}
			});
			monaco.editor.setTheme(EDITOR_CUSTOM_THEME_ID);
		}
		//#endregion
		//#region \0dsh-css:/Users/hivanpan/Hivan/project/ykl/project/Whale/whale-harness-free/plugins/packages/ui/dsh-plugin-file-explorer/src/client/editor/editor.module.css.mjs
		const css$2 = ".VX-wEW_surface{background:var(--dsw-alias-bg-layer-1);height:100%;min-height:0;color:var(--dsw-alias-label-primary);flex-direction:column;display:flex}.VX-wEW_tabs{border-bottom:1px solid var(--dsw-alias-border-l2);background:var(--dsw-alias-bg-layer-2);flex-shrink:0;align-items:stretch;gap:2px;padding:0 8px;display:flex;overflow-x:auto}.VX-wEW_tab{color:var(--dsw-alias-label-secondary);font:inherit;cursor:pointer;white-space:nowrap;background:0 0;border:0;border-bottom:2px solid #0000;align-items:center;gap:6px;padding:8px 10px;font-size:13px;display:flex}.VX-wEW_tabActive{color:var(--dsw-alias-label-primary);border-bottom-color:var(--dsw-alias-brand-primary)}.VX-wEW_dirtyMark{color:var(--dsw-alias-brand-primary)}.VX-wEW_closeBtn{appearance:none;color:inherit;font:inherit;cursor:pointer;opacity:.6;background:0 0;border:0;border-radius:4px;padding:2px 4px;font-size:12px;line-height:1}.VX-wEW_closeBtn:hover{opacity:1;background:var(--dsw-alias-bg-layer-3)}.VX-wEW_toolbar{border-bottom:1px solid var(--dsw-alias-border-l2);flex-shrink:0;align-items:center;gap:8px;padding:6px 10px;display:flex}.VX-wEW_toolBtn{appearance:none;border:1px solid var(--dsw-alias-border-l2);background:var(--dsw-alias-bg-layer-3);color:inherit;font:inherit;cursor:pointer;border-radius:6px;padding:4px 10px;font-size:12px}.VX-wEW_toolBtn:hover{border-color:var(--dsw-alias-label-dimmed)}.VX-wEW_toolBtnActive{border-color:var(--dsw-alias-brand-primary);color:var(--dsw-alias-brand-primary)}.VX-wEW_status{color:var(--dsw-alias-label-secondary);margin-left:auto;font-size:12px}.VX-wEW_pathBar{border-bottom:1px solid var(--dsw-alias-border-l2);background:var(--dsw-alias-bg-layer-2);color:var(--dsw-alias-label-secondary);white-space:nowrap;text-overflow:ellipsis;user-select:text;flex-shrink:0;padding:4px 12px;font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,monospace;font-size:12px;line-height:1.4;overflow:hidden}.VX-wEW_toolbarEnd{flex-shrink:0;align-items:center;display:flex;position:relative}.VX-wEW_appearanceMenu{z-index:20;border:1px solid var(--dsw-alias-border-l2);background:var(--dsw-alias-bg-layer-1);min-width:220px;box-shadow:0 10px 28px color-mix(in srgb,var(--dsw-alias-label-primary)14%,transparent);border-radius:10px;flex-direction:column;gap:12px;padding:10px;display:flex;position:absolute;top:calc(100% + 6px);right:0}.VX-wEW_appearanceSection{flex-direction:column;gap:6px;display:flex}.VX-wEW_appearanceLabel{color:var(--dsw-alias-label-secondary);font-size:12px}.VX-wEW_appearanceThemeRow{flex-wrap:wrap;gap:6px;display:flex}.VX-wEW_appearanceChip{appearance:none;border:1px solid var(--dsw-alias-border-l2);background:var(--dsw-alias-bg-layer-3);color:inherit;font:inherit;cursor:pointer;border-radius:999px;padding:4px 10px;font-size:12px}.VX-wEW_appearanceChip:hover{border-color:var(--dsw-alias-label-dimmed)}.VX-wEW_appearanceChipActive{border-color:var(--dsw-alias-brand-primary);color:var(--dsw-alias-brand-primary)}.VX-wEW_appearanceFontRow{align-items:center;gap:8px;display:flex}.VX-wEW_appearanceStep{appearance:none;border:1px solid var(--dsw-alias-border-l2);background:var(--dsw-alias-bg-layer-3);color:inherit;min-width:36px;height:28px;font:inherit;cursor:pointer;border-radius:6px;padding:0 8px;font-size:12px}.VX-wEW_appearanceStep:hover:not(:disabled){border-color:var(--dsw-alias-label-dimmed)}.VX-wEW_appearanceStep:disabled{opacity:.45;cursor:default}.VX-wEW_appearanceFontValue{text-align:center;font-variant-numeric:tabular-nums;min-width:48px;font-size:13px}.VX-wEW_appearanceColorRow{align-items:center;gap:6px;display:flex}.VX-wEW_appearanceColorSwatch{border:1px solid var(--dsw-alias-border-l2);cursor:pointer;background:0 0;border-radius:6px;flex-shrink:0;width:28px;height:28px;padding:0}.VX-wEW_appearanceHexInput{box-sizing:border-box;border:1px solid var(--dsw-alias-border-l2);background:var(--dsw-alias-bg-layer-3);min-width:0;height:28px;color:var(--dsw-alias-label-primary);font:inherit;border-radius:6px;outline:none;flex:1;padding:0 8px;font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,monospace;font-size:12px}.VX-wEW_appearanceHexInput:focus{border-color:var(--dsw-alias-label-dimmed)}.VX-wEW_appearanceHexInvalid{border-color:var(--dsw-alias-danger,#c44)}.VX-wEW_appearanceHint{color:var(--dsw-alias-label-secondary);font-size:11px;line-height:1.35}.VX-wEW_appearanceSaveScheme{appearance:none;border:1px solid var(--dsw-alias-border-l2);background:var(--dsw-alias-bg-layer-3);color:inherit;height:28px;font:inherit;cursor:pointer;border-radius:6px;align-self:flex-start;padding:0 10px;font-size:12px}.VX-wEW_appearanceSaveScheme:hover{border-color:var(--dsw-alias-label-dimmed)}.VX-wEW_appearanceSchemeList{flex-direction:column;gap:4px;max-height:140px;margin:0;padding:0;list-style:none;display:flex;overflow-y:auto}.VX-wEW_appearanceSchemeItem{align-items:center;gap:4px;display:flex}.VX-wEW_appearanceSchemeApply{appearance:none;border:1px solid var(--dsw-alias-border-l2);background:var(--dsw-alias-bg-layer-3);min-width:0;color:inherit;height:28px;font:inherit;cursor:pointer;text-align:left;border-radius:6px;flex:1;align-items:center;gap:8px;padding:0 8px;font-size:12px;display:flex}.VX-wEW_appearanceSchemeApply:hover{border-color:var(--dsw-alias-label-dimmed)}.VX-wEW_appearanceSchemeApplyActive{border-color:var(--dsw-alias-brand-primary);color:var(--dsw-alias-brand-primary)}.VX-wEW_appearanceSchemeSwatch{border:1px solid var(--dsw-alias-border-l2);border-radius:3px;flex-shrink:0;width:14px;height:14px}.VX-wEW_appearanceSchemeMeta{text-overflow:ellipsis;white-space:nowrap;font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,monospace;font-size:11px;overflow:hidden}.VX-wEW_appearanceSchemeRemove{appearance:none;color:var(--dsw-alias-label-secondary);width:28px;height:28px;font:inherit;cursor:pointer;background:0 0;border:0;border-radius:6px;flex-shrink:0;font-size:16px;line-height:1}.VX-wEW_appearanceSchemeRemove:hover{color:var(--dsw-alias-label-primary);background:var(--dsw-alias-bg-layer-3)}.VX-wEW_body{flex:1;min-height:0;position:relative}.VX-wEW_textarea{resize:none;background:var(--dsw-alias-bg-layer-1);width:100%;height:100%;color:var(--dsw-alias-label-primary);box-sizing:border-box;border:0;outline:none;padding:12px 14px;font:13px/1.5 ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,monospace}.VX-wEW_monacoHost{width:100%;height:100%}.VX-wEW_preview{box-sizing:border-box;height:100%;padding:16px 20px;line-height:1.55;overflow:auto}.VX-wEW_preview h1,.VX-wEW_preview h2,.VX-wEW_preview h3{margin:.8em 0 .4em}.VX-wEW_preview pre{background:var(--dsw-alias-bg-layer-3);border-radius:8px;padding:10px 12px;overflow:auto}.VX-wEW_preview code{font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,monospace;font-size:.92em}.VX-wEW_empty{height:100%;color:var(--dsw-alias-label-secondary);place-items:center;font-size:14px;display:grid}.VX-wEW_errorBanner{color:var(--dsw-alias-danger,#c44);border-bottom:1px solid var(--dsw-alias-border-l2);flex-shrink:0;padding:6px 12px}";
		const tagId$2 = "@supanexus/dsh-plugin-file-explorer/editor.module.css";
		if (typeof document !== "undefined" && document.querySelector("style[data-plugin-css=" + JSON.stringify(tagId$2) + "]") === null) {
			const tag = document.createElement("style");
			tag.dataset.plugin = "@supanexus/dsh-plugin-file-explorer";
			tag.dataset.pluginCss = tagId$2;
			tag.textContent = css$2;
			document.head.appendChild(tag);
		}
		var editor_module_css_default = {
			"appearanceChip": "VX-wEW_appearanceChip",
			"appearanceChipActive": "VX-wEW_appearanceChipActive",
			"appearanceColorRow": "VX-wEW_appearanceColorRow",
			"appearanceColorSwatch": "VX-wEW_appearanceColorSwatch",
			"appearanceFontRow": "VX-wEW_appearanceFontRow",
			"appearanceFontValue": "VX-wEW_appearanceFontValue",
			"appearanceHexInput": "VX-wEW_appearanceHexInput",
			"appearanceHexInvalid": "VX-wEW_appearanceHexInvalid",
			"appearanceHint": "VX-wEW_appearanceHint",
			"appearanceLabel": "VX-wEW_appearanceLabel",
			"appearanceMenu": "VX-wEW_appearanceMenu",
			"appearanceSaveScheme": "VX-wEW_appearanceSaveScheme",
			"appearanceSchemeApply": "VX-wEW_appearanceSchemeApply",
			"appearanceSchemeApplyActive": "VX-wEW_appearanceSchemeApplyActive",
			"appearanceSchemeItem": "VX-wEW_appearanceSchemeItem",
			"appearanceSchemeList": "VX-wEW_appearanceSchemeList",
			"appearanceSchemeMeta": "VX-wEW_appearanceSchemeMeta",
			"appearanceSchemeRemove": "VX-wEW_appearanceSchemeRemove",
			"appearanceSchemeSwatch": "VX-wEW_appearanceSchemeSwatch",
			"appearanceSection": "VX-wEW_appearanceSection",
			"appearanceStep": "VX-wEW_appearanceStep",
			"appearanceThemeRow": "VX-wEW_appearanceThemeRow",
			"body": "VX-wEW_body",
			"closeBtn": "VX-wEW_closeBtn",
			"dirtyMark": "VX-wEW_dirtyMark",
			"empty": "VX-wEW_empty",
			"errorBanner": "VX-wEW_errorBanner",
			"monacoHost": "VX-wEW_monacoHost",
			"pathBar": "VX-wEW_pathBar",
			"preview": "VX-wEW_preview",
			"status": "VX-wEW_status",
			"surface": "VX-wEW_surface",
			"tab": "VX-wEW_tab",
			"tabActive": "VX-wEW_tabActive",
			"tabs": "VX-wEW_tabs",
			"textarea": "VX-wEW_textarea",
			"toolBtn": "VX-wEW_toolBtn",
			"toolBtnActive": "VX-wEW_toolBtnActive",
			"toolbar": "VX-wEW_toolbar",
			"toolbarEnd": "VX-wEW_toolbarEnd"
		};
		//#endregion
		//#region lib/types/client/editor/AppearanceMenu.js
		/**
		* Popover for Monaco theme + custom hex background + font size + saved schemes.
		*/
		const THEME_OPTIONS = [
			{
				id: "vs-dark",
				labelKey: "editorThemeDark"
			},
			{
				id: "vs",
				labelKey: "editorThemeLight"
			},
			{
				id: "hc-black",
				labelKey: "editorThemeHighContrast"
			}
		];
		/**
		* Floating panel: preset themes, custom HTML hex, font size, saved schemes.
		*/
		function AppearanceMenu(props) {
			const { t, appearance, store, onClose } = props;
			const rootRef = (0, react.useRef)(null);
			const [hexDraft, setHexDraft] = (0, react.useState)(appearance.customBackground ?? hexForColorInput(null, appearance.theme));
			const [hexInvalid, setHexInvalid] = (0, react.useState)(false);
			(0, react.useEffect)(() => {
				setHexDraft(appearance.customBackground ?? hexForColorInput(null, appearance.theme));
				setHexInvalid(false);
			}, [appearance.customBackground, appearance.theme]);
			(0, react.useEffect)(() => {
				const onPointer = (event) => {
					const root = rootRef.current;
					if (root !== null && root.contains(event.target)) return;
					onClose();
				};
				const onKey = (event) => {
					if (event.key === "Escape") onClose();
				};
				const timer = window.setTimeout(() => {
					document.addEventListener("mousedown", onPointer, true);
					document.addEventListener("keydown", onKey, true);
				}, 0);
				return () => {
					window.clearTimeout(timer);
					document.removeEventListener("mousedown", onPointer, true);
					document.removeEventListener("keydown", onKey, true);
				};
			}, [onClose]);
			const commitHex = (raw) => {
				const normalized = normalizeHexColor(raw);
				if (normalized === null) {
					setHexInvalid(true);
					return false;
				}
				setHexInvalid(false);
				setHexDraft(normalized);
				store.setCustomBackground(normalized);
				return true;
			};
			const saveCurrentScheme = () => {
				const draft = hexDraft.trim();
				if (draft !== "") {
					const normalized = normalizeHexColor(draft);
					if (normalized === null) {
						setHexInvalid(true);
						return;
					}
					setHexInvalid(false);
					setHexDraft(normalized);
					store.setCustomBackground(normalized);
					store.saveScheme(normalized);
					return;
				}
				store.saveScheme();
			};
			const pickerValue = hexForColorInput(normalizeHexColor(hexDraft) ?? appearance.customBackground, appearance.theme);
			return (0, react_jsx_runtime.jsxs)("div", {
				ref: rootRef,
				className: editor_module_css_default.appearanceMenu,
				role: "dialog",
				"aria-label": t("editorAppearance"),
				"data-file-explorer-appearance": "",
				children: [
					(0, react_jsx_runtime.jsxs)("div", {
						className: editor_module_css_default.appearanceSection,
						children: [(0, react_jsx_runtime.jsx)("div", {
							className: editor_module_css_default.appearanceLabel,
							children: t("editorTheme")
						}), (0, react_jsx_runtime.jsx)("div", {
							className: editor_module_css_default.appearanceThemeRow,
							role: "radiogroup",
							"aria-label": t("editorTheme"),
							children: THEME_OPTIONS.map((option) => (0, react_jsx_runtime.jsx)("button", {
								type: "button",
								role: "radio",
								"aria-checked": appearance.customBackground === null && appearance.theme === option.id,
								className: appearance.customBackground === null && appearance.theme === option.id ? `${editor_module_css_default.appearanceChip} ${editor_module_css_default.appearanceChipActive}` : editor_module_css_default.appearanceChip,
								onClick: () => store.setTheme(option.id),
								children: t(option.labelKey)
							}, option.id))
						})]
					}),
					(0, react_jsx_runtime.jsxs)("div", {
						className: editor_module_css_default.appearanceSection,
						children: [
							(0, react_jsx_runtime.jsx)("div", {
								className: editor_module_css_default.appearanceLabel,
								children: t("editorCustomColor")
							}),
							(0, react_jsx_runtime.jsxs)("div", {
								className: editor_module_css_default.appearanceColorRow,
								children: [
									(0, react_jsx_runtime.jsx)("input", {
										type: "color",
										className: editor_module_css_default.appearanceColorSwatch,
										value: pickerValue,
										"aria-label": t("editorCustomColor"),
										onChange: (event) => {
											commitHex(event.target.value);
										}
									}),
									(0, react_jsx_runtime.jsx)("input", {
										type: "text",
										className: hexInvalid ? `${editor_module_css_default.appearanceHexInput} ${editor_module_css_default.appearanceHexInvalid}` : editor_module_css_default.appearanceHexInput,
										value: hexDraft,
										spellCheck: false,
										placeholder: "#1e1e1e",
										"aria-invalid": hexInvalid,
										"aria-label": t("editorCustomColor"),
										onChange: (event) => {
											setHexDraft(event.target.value);
											setHexInvalid(false);
										},
										onBlur: () => {
											if (hexDraft.trim() === "") {
												store.setCustomBackground(null);
												setHexDraft(hexForColorInput(null, appearance.theme));
												setHexInvalid(false);
												return;
											}
											commitHex(hexDraft);
										},
										onKeyDown: (event) => {
											if (event.key === "Enter") {
												event.preventDefault();
												commitHex(hexDraft);
											}
										}
									}),
									(0, react_jsx_runtime.jsx)("button", {
										type: "button",
										className: editor_module_css_default.appearanceStep,
										disabled: appearance.customBackground === null,
										onClick: () => {
											store.setCustomBackground(null);
											setHexDraft(hexForColorInput(null, appearance.theme));
											setHexInvalid(false);
										},
										children: t("editorCustomColorClear")
									})
								]
							}),
							hexInvalid ? (0, react_jsx_runtime.jsx)("div", {
								className: editor_module_css_default.appearanceHint,
								children: t("editorCustomColorInvalid")
							}) : (0, react_jsx_runtime.jsx)("div", {
								className: editor_module_css_default.appearanceHint,
								children: t("editorCustomColorHint")
							})
						]
					}),
					(0, react_jsx_runtime.jsxs)("div", {
						className: editor_module_css_default.appearanceSection,
						children: [(0, react_jsx_runtime.jsx)("div", {
							className: editor_module_css_default.appearanceLabel,
							children: t("editorFontSize")
						}), (0, react_jsx_runtime.jsxs)("div", {
							className: editor_module_css_default.appearanceFontRow,
							children: [
								(0, react_jsx_runtime.jsx)("button", {
									type: "button",
									className: editor_module_css_default.appearanceStep,
									"aria-label": t("editorFontSmaller"),
									disabled: appearance.fontSize <= 11,
									onClick: () => store.bumpFont(-1),
									children: "A−"
								}),
								(0, react_jsx_runtime.jsxs)("span", {
									className: editor_module_css_default.appearanceFontValue,
									children: [appearance.fontSize, "px"]
								}),
								(0, react_jsx_runtime.jsx)("button", {
									type: "button",
									className: editor_module_css_default.appearanceStep,
									"aria-label": t("editorFontLarger"),
									disabled: appearance.fontSize >= 24,
									onClick: () => store.bumpFont(1),
									children: "A+"
								})
							]
						})]
					}),
					(0, react_jsx_runtime.jsxs)("div", {
						className: editor_module_css_default.appearanceSection,
						children: [
							(0, react_jsx_runtime.jsx)("div", {
								className: editor_module_css_default.appearanceLabel,
								children: t("editorScheme")
							}),
							(0, react_jsx_runtime.jsx)("button", {
								type: "button",
								className: editor_module_css_default.appearanceSaveScheme,
								onClick: saveCurrentScheme,
								children: t("editorSchemeSave")
							}),
							appearance.schemes.length === 0 ? (0, react_jsx_runtime.jsx)("div", {
								className: editor_module_css_default.appearanceHint,
								children: t("editorSchemeEmpty")
							}) : (0, react_jsx_runtime.jsx)("ul", {
								className: editor_module_css_default.appearanceSchemeList,
								"aria-label": t("editorScheme"),
								children: appearance.schemes.map((scheme) => {
									const active = appearance.customBackground === scheme.background && appearance.fontSize === scheme.fontSize;
									return (0, react_jsx_runtime.jsxs)("li", {
										className: editor_module_css_default.appearanceSchemeItem,
										children: [(0, react_jsx_runtime.jsxs)("button", {
											type: "button",
											className: active ? `${editor_module_css_default.appearanceSchemeApply} ${editor_module_css_default.appearanceSchemeApplyActive}` : editor_module_css_default.appearanceSchemeApply,
											onClick: () => store.applyScheme(scheme.id),
											children: [(0, react_jsx_runtime.jsx)("span", {
												className: editor_module_css_default.appearanceSchemeSwatch,
												style: { background: scheme.background },
												"aria-hidden": "true"
											}), (0, react_jsx_runtime.jsxs)("span", {
												className: editor_module_css_default.appearanceSchemeMeta,
												children: [
													scheme.background,
													" · ",
													scheme.fontSize,
													"px"
												]
											})]
										}), (0, react_jsx_runtime.jsx)("button", {
											type: "button",
											className: editor_module_css_default.appearanceSchemeRemove,
											"aria-label": t("editorSchemeRemove"),
											onClick: () => store.removeScheme(scheme.id),
											children: "×"
										})]
									}, scheme.id);
								})
							})
						]
					})
				]
			});
		}
		//#endregion
		//#region lib/types/client/editor/TabStrip.js
		/**
		* Tab strip for open editor buffers, with close + context-menu actions.
		*/
		/**
		* Horizontal list of open paths with dirty marks, close buttons, and
		* right-click: close / close to the right / close all.
		*/
		function TabStrip(props) {
			const { tabs, activePath, buffers, t, onActivate, onClose, onClosePaths } = props;
			const [menu, setMenu] = (0, react.useState)(null);
			const closeMenu = (0, react.useCallback)(() => {
				setMenu(null);
			}, []);
			const menuItems = menu === null ? [] : (() => {
				const index = tabs.findIndex((tab) => tab.path === menu.path);
				const toRight = index >= 0 ? tabs.slice(index + 1).map((tab) => tab.path) : [];
				return [
					{
						id: "close",
						label: t("tabClose"),
						onSelect: () => {
							onClose(menu.path);
						}
					},
					{
						id: "close-right",
						label: t("tabCloseRight"),
						disabled: toRight.length === 0,
						onSelect: () => {
							if (toRight.length === 0) return;
							onClosePaths(toRight);
						}
					},
					{
						id: "close-all",
						label: t("tabCloseAll"),
						onSelect: () => {
							onClosePaths(tabs.map((tab) => tab.path));
						}
					}
				];
			})();
			return (0, react_jsx_runtime.jsxs)("div", {
				className: editor_module_css_default.tabs,
				role: "tablist",
				children: [tabs.map((tab) => {
					const active = tab.path === activePath;
					const dirty = buffers.isDirty(tab.path);
					return (0, react_jsx_runtime.jsxs)("button", {
						type: "button",
						role: "tab",
						"aria-selected": active,
						className: active ? `${editor_module_css_default.tab} ${editor_module_css_default.tabActive}` : editor_module_css_default.tab,
						onClick: () => onActivate(tab.path),
						onContextMenu: (event) => {
							event.preventDefault();
							event.stopPropagation();
							onActivate(tab.path);
							setMenu({
								x: event.clientX,
								y: event.clientY,
								path: tab.path
							});
						},
						children: [(0, react_jsx_runtime.jsxs)("span", { children: [tab.title, dirty ? (0, react_jsx_runtime.jsx)("span", {
							className: editor_module_css_default.dirtyMark,
							children: " •"
						}) : null] }), (0, react_jsx_runtime.jsx)("span", {
							className: editor_module_css_default.closeBtn,
							role: "button",
							tabIndex: 0,
							"aria-label": t("tabClose"),
							onClick: (event) => {
								event.stopPropagation();
								onClose(tab.path);
							},
							onKeyDown: (event) => {
								if (event.key === "Enter" || event.key === " ") {
									event.preventDefault();
									event.stopPropagation();
									onClose(tab.path);
								}
							},
							children: "×"
						})]
					}, tab.path);
				}), menu !== null ? (0, react_jsx_runtime.jsx)(ExplorerContextMenu, {
					x: menu.x,
					y: menu.y,
					items: menuItems,
					onClose: closeMenu
				}) : null]
			});
		}
		//#endregion
		//#region node_modules/marked/lib/marked.esm.js
		/**
		* marked v18.0.11 - a markdown parser
		* Copyright (c) 2018-2026, MarkedJS. (MIT License)
		* Copyright (c) 2011-2018, Christopher Jeffrey. (MIT License)
		* https://github.com/markedjs/marked
		*/
		/**
		* DO NOT EDIT THIS FILE
		* The code in this file is generated from files in ./src/
		*/
		function A() {
			return {
				async: !1,
				breaks: !1,
				extensions: null,
				gfm: !0,
				hooks: null,
				pedantic: !1,
				renderer: null,
				silent: !1,
				tokenizer: null,
				walkTokens: null
			};
		}
		var R = A();
		function j(l) {
			R = l;
		}
		var z = { exec: () => null };
		function I(l) {
			let e = [];
			return (t) => {
				let n = Math.max(0, Math.min(3, t - 1)), s = e[n];
				return s || (s = l(n), e[n] = s), s;
			};
		}
		function k(l, e = "") {
			let t = typeof l == "string" ? l : l.source, n = {
				replace: (s, r) => {
					let i = typeof r == "string" ? r : r.source;
					return i = i.replace(m.caret, "$1"), t = t.replace(s, i), n;
				},
				getRegex: () => new RegExp(t, e)
			};
			return n;
		}
		var Oe = ((l = "") => {
			try {
				return !!new RegExp("(?<=1)(?<!1)" + l);
			} catch {
				return !1;
			}
		})();
		var m = {
			codeRemoveIndent: /^(?: {1,4}| {0,3}\t)/gm,
			outputLinkReplace: /\\([\[\]])/g,
			indentCodeCompensation: /^(\s+)(?:```)/,
			beginningSpace: /^\s+/,
			endingHash: /#$/,
			startingSpaceChar: /^ /,
			endingSpaceChar: / $/,
			nonSpaceChar: /[^ ]/,
			newLineCharGlobal: /\n/g,
			tabCharGlobal: /\t/g,
			multipleSpaceGlobal: /\s+/g,
			blankLine: /^[ \t]*$/,
			doubleBlankLine: /\n[ \t]*\n[ \t]*$/,
			blockquoteStart: /^ {0,3}>/,
			blockquoteSetextReplace: /\n {0,3}((?:=+|-+) *)(?=\n|$)/g,
			blockquoteSetextReplace2: /^ {0,3}>[ \t]?/gm,
			listReplaceNesting: /^ {1,4}(?=( {4})*[^ ])/g,
			listIsTask: /^\[[ xX]\] +\S/,
			listReplaceTask: /^\[[ xX]\] +/,
			listTaskCheckbox: /\[[ xX]\]/,
			anyLine: /\n.*\n/,
			hrefBrackets: /^<(.*)>$/,
			tableDelimiter: /[:|]/,
			tableAlignChars: /^\||\| *$/g,
			tableRowBlankLine: /\n[ \t]*$/,
			tableAlignRight: /^ *-+: *$/,
			tableAlignCenter: /^ *:-+: *$/,
			tableAlignLeft: /^ *:-+ *$/,
			startATag: /^<a /i,
			endATag: /^<\/a>/i,
			startPreScriptTag: /^<(pre|code|kbd|script)(\s|>)/i,
			endPreScriptTag: /^<\/(pre|code|kbd|script)(\s|>)/i,
			startAngleBracket: /^</,
			endAngleBracket: />$/,
			pedanticHrefTitle: /^([^'"]*[^\s])\s+(['"])(.*)\2/,
			unicodeAlphaNumeric: /[\p{L}\p{N}]/u,
			escapeTest: /[&<>"']/,
			escapeReplace: /[&<>"']/g,
			escapeTestNoEncode: /[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,
			escapeReplaceNoEncode: /[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,
			caret: /(^|[^\[])\^/g,
			percentDecode: /%25/g,
			findPipe: /\|/g,
			splitPipe: / \|/,
			slashPipe: /\\\|/g,
			carriageReturn: /\r\n|\r/g,
			spaceLine: /^ +$/gm,
			notSpaceStart: /^\S*/,
			endingNewline: /\n$/,
			listItemRegex: (l) => new RegExp(`^( {0,3}${l})((?:[	 ][^\\n]*)?(?:\\n|$))`),
			nextBulletRegex: I((l) => new RegExp(`^ {0,${l}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`)),
			hrRegex: I((l) => new RegExp(`^ {0,${l}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`)),
			fencesBeginRegex: I((l) => new RegExp(`^ {0,${l}}(?:\`\`\`|~~~)`)),
			headingBeginRegex: I((l) => new RegExp(`^ {0,${l}}#`)),
			htmlBeginRegex: I((l) => new RegExp(`^ {0,${l}}<(?:[a-z].*>|!--)`, "i")),
			blockquoteBeginRegex: I((l) => new RegExp(`^ {0,${l}}>`))
		};
		var Te = /^(?:[ \t]*(?:\n|$))+/;
		var we = /^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/;
		var ye = /^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/;
		var q = /^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/;
		var Pe = /^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/;
		var U = / {0,3}(?:[*+-]|\d{1,9}[.)])/;
		var oe = /^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/;
		var ae = k(oe).replace(/bull/g, U).replace(/blockCode/g, /(?: {4}| {0,3}\t)/).replace(/fences/g, / {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g, / {0,3}>/).replace(/heading/g, / {0,3}#{1,6}(?:\s|$)/).replace(/html/g, / {0,3}<[^\n>]+>\n/).replace(/\|table/g, "").getRegex();
		var Se = k(oe).replace(/bull/g, U).replace(/blockCode/g, /(?: {4}| {0,3}\t)/).replace(/fences/g, / {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g, / {0,3}>/).replace(/heading/g, / {0,3}#{1,6}(?:\s|$)/).replace(/html/g, / {0,3}<[^\n>]+>\n/).replace(/table/g, / {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex();
		var K = /^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table|[ \t]+\n)[^\n]+)*)/;
		var _e = /^[^\n]+/;
		var W = /(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/;
		var $e = k(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label", W).replace("title", /(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex();
		var Le = k(/^(bull)([ \t][^\n]*?)?(?:\n|$)/).replace(/bull/g, U).getRegex();
		var Q = "address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul";
		var X = /<!--(?:-?>|[\s\S]*?(?:-->|$))/;
		var Ee = k("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n*|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>[^\\n]*\\n*|$)|<![A-Z][\\s\\S]*?(?:>[^\\n]*\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>[^\\n]*\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))", "i").replace("comment", X).replace("tag", Q).replace("attribute", / +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex();
		var le = (l) => k(K).replace("hr", q).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("|lheading", "").replace("|table", "").replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*(?:\\n|$))|~~~)[^\\n]*(?:\\n|$)").replace("list", l).replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", Q).getRegex();
		var ze = le(/ {0,3}(?:[*+-]|1[.)])[ \t]+[^ \t\n]/);
		var Me = le(/ {0,3}(?:[*+-]|\d{1,9}[.)])(?:[ \t]|\n|$)/);
		var J = {
			blockquote: k(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph", Me).getRegex(),
			code: we,
			def: $e,
			fences: ye,
			heading: Pe,
			hr: q,
			html: Ee,
			lheading: ae,
			list: Le,
			newline: Te,
			paragraph: ze,
			table: z,
			text: _e
		};
		var se = k("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr", q).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("blockquote", " {0,3}>").replace("code", "(?: {4}| {0,3}	)[^\\n]").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*(?:\\n|$))|~~~)[^\\n]*(?:\\n|$)").replace("list", " {0,3}(?:[*+-]|1[.)])[ \\t]").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", Q).getRegex();
		var Ie = {
			...J,
			lheading: Se,
			table: se,
			paragraph: k(K).replace("hr", q).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("|lheading", "").replace("table", se).replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*(?:\\n|$))|~~~)[^\\n]*(?:\\n|$)").replace("list", " {0,3}(?:[*+-]|1[.)])[ \\t]+[^ \\t\\n]").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", Q).getRegex()
		};
		var Ce = {
			...J,
			html: k(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment", X).replace(/tag/g, "(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),
			def: /^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,
			heading: /^(#{1,6})(.*)(?:\n+|$)/,
			fences: z,
			lheading: /^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,
			paragraph: k(K).replace("hr", q).replace("heading", ` *#{1,6} *[^
]`).replace("lheading", ae).replace("|table", "").replace("blockquote", " {0,3}>").replace("|fences", "").replace("|list", "").replace("|html", "").replace("|tag", "").getRegex()
		};
		var Be = /^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/;
		var De = /^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/;
		var ue = /^( {2,}|\\)\n(?!\s*$)/;
		var qe = /^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/;
		var _ = /[\p{P}\p{S}]/u;
		var C = /[\s\p{P}\p{S}]/u;
		var v = /[^\s\p{P}\p{S}]/u;
		var ve = k(/^((?![*_])punctSpace)/, "u").replace(/punctSpace/g, C).getRegex();
		var He = /[\p{Pi}\p{Ps}"']/u;
		var pe = /(?!~)[\p{P}\p{S}]/u;
		var Ze = /(?!~)[\s\p{P}\p{S}]/u;
		var Ge = /(?:[^\s\p{P}\p{S}]|~)/u;
		var Qe = k(/link|precode-code|html/, "g").replace("link", /\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace("precode-", Oe ? "(?<!`)()" : "(^^|[^`])").replace("code", /(?<b>`+)[^`]+\k<b>(?!`)/).replace("html", /<(?! )[^<>]*?>/).getRegex();
		var ce = /^(?:\*+(?:((?!\*)punct)|([^\s*]))?)|^_+(?:((?!_)punct)|([^\s_]))?/;
		var Ne = k(ce, "u").replace(/punct/g, _).getRegex();
		var je = k(ce, "u").replace(/punct/g, pe).getRegex();
		var Ue = k(/^(?:\*+(?:((?!\*)(?!openQuote)punct)|([^\s*]))?)|^_+(?:((?!_)(?!openQuote)punct)|([^\s_]))?/, "u").replace(/openQuote/g, He).replace(/punct/g, _).getRegex();
		var he = "^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)";
		var Ke = k(he, "gu").replace(/notPunctSpace/g, v).replace(/punctSpace/g, C).replace(/punct/g, _).getRegex();
		var We = k(he, "gu").replace(/notPunctSpace/g, Ge).replace(/punctSpace/g, Ze).replace(/punct/g, pe).getRegex();
		var Je = k("^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)[\\s](\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|(?:(?!\\*)punct|notPunctSpace)(\\*+)(?!\\*)(?=notPunctSpace)", "gu").replace(/notPunctSpace/g, v).replace(/punctSpace/g, C).replace(/punct/g, _).getRegex();
		var Ve = k("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)", "gu").replace(/notPunctSpace/g, v).replace(/punctSpace/g, C).replace(/punct/g, _).getRegex();
		var et = k("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)[\\s](_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)|(?:(?!_)punct|notPunctSpace)(_+)(?!_)(?=notPunctSpace)", "gu").replace(/notPunctSpace/g, v).replace(/punctSpace/g, C).replace(/punct/g, _).getRegex();
		var tt = k(/^~~?(?:((?!~)punct)|[^\s~])/, "u").replace(/punct/g, _).getRegex();
		var rt = k("^[^~]+(?=[^~])|(?!~)punct(~~?)(?=[\\s]|$)|notPunctSpace(~~?)(?!~)(?=punctSpace|$)|(?!~)punctSpace(~~?)(?=notPunctSpace)|[\\s](~~?)(?!~)(?=punct)|(?!~)punct(~~?)(?!~)(?=punct)|notPunctSpace(~~?)(?=notPunctSpace)", "gu").replace(/notPunctSpace/g, v).replace(/punctSpace/g, C).replace(/punct/g, _).getRegex();
		var st = k(/\\(punct)/, "gu").replace(/punct/g, _).getRegex();
		var it = k(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme", /[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email", /[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex();
		var ot = k(X).replace("(?:-->|$)", "-->").getRegex();
		var at = k("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment", ot).replace("attribute", /\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex();
		var G = /(?:\[(?:\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+(?!`)[^`]*?`+(?!`)|``+(?=\])|[^\[\]\\`])*?/;
		var lt = k(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]+(?:\n[ \t]*)?|\n[ \t]*)(title))?\s*\)/).replace("label", G).replace("href", /<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]+|(?=\))/).replace("title", /"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex();
		var ke = k(/^!?\[(label)\]\[(ref)\]/).replace("label", G).replace("ref", W).getRegex();
		var de = k(/^!?\[(ref)\](?:\[\])?/).replace("ref", W).getRegex();
		var ut = k("reflink|nolink(?!\\()", "g").replace("reflink", ke).replace("nolink", de).getRegex();
		var ie = /[hH][tT][tT][pP][sS]?|[fF][tT][pP]/;
		var V = {
			_backpedal: z,
			anyPunctuation: st,
			autolink: it,
			blockSkip: Qe,
			br: ue,
			code: De,
			del: z,
			delLDelim: z,
			delRDelim: z,
			emStrongLDelim: Ne,
			emStrongRDelimAst: Ke,
			emStrongRDelimUnd: Ve,
			escape: Be,
			link: lt,
			nolink: de,
			punctuation: ve,
			reflink: ke,
			reflinkSearch: ut,
			tag: at,
			text: qe,
			url: z
		};
		var pt = {
			...V,
			emStrongLDelim: Ue,
			emStrongRDelimAst: Je,
			emStrongRDelimUnd: et,
			link: k(/^!?\[(label)\]\((.*?)\)/).replace("label", G).getRegex(),
			reflink: k(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label", G).getRegex()
		};
		var F = {
			...V,
			emStrongRDelimAst: We,
			emStrongLDelim: je,
			delLDelim: tt,
			delRDelim: rt,
			url: k(/^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("protocol", ie).replace("email", /[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),
			_backpedal: /(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,
			del: /^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/,
			text: k(/^(`+|~+|[^`~])(?:(?=[`~])|(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/).replace("protocol", ie).getRegex()
		};
		var ct = {
			...F,
			br: k(ue).replace("{2,}", "*").getRegex(),
			text: k(F.text).replace("\\b_", "\\b_| {2,}\\n").replace(/\{2,\}/g, "*").getRegex()
		};
		var H = {
			normal: J,
			gfm: Ie,
			pedantic: Ce
		};
		var B = {
			normal: V,
			gfm: F,
			breaks: ct,
			pedantic: pt
		};
		var ht = {
			"&": "&amp;",
			"<": "&lt;",
			">": "&gt;",
			"\"": "&quot;",
			"'": "&#39;"
		};
		var ge = (l) => ht[l];
		function T(l, e) {
			if (e) {
				if (m.escapeTest.test(l)) return l.replace(m.escapeReplace, ge);
			} else if (m.escapeTestNoEncode.test(l)) return l.replace(m.escapeReplaceNoEncode, ge);
			return l;
		}
		function Y(l) {
			try {
				l = encodeURI(l).replace(m.percentDecode, "%");
			} catch {
				return null;
			}
			return l;
		}
		function ee(l, e) {
			let n = l.replace(m.findPipe, (r, i, o) => {
				let u = !1, a = i;
				for (; --a >= 0 && o[a] === "\\";) u = !u;
				return u ? "|" : " |";
			}).split(m.splitPipe), s = 0;
			if (n[0].trim() || n.shift(), n.length > 0 && !n.at(-1)?.trim() && n.pop(), e) if (n.length > e) n.splice(e);
			else for (; n.length < e;) n.push("");
			for (; s < n.length; s++) n[s] = n[s].trim().replace(m.slashPipe, "|");
			return n;
		}
		function $(l, e, t) {
			let n = l.length;
			if (n === 0) return "";
			let s = 0;
			for (; s < n;) {
				let r = l.charAt(n - s - 1);
				if (r === e && !t) s++;
				else if (r !== e && t) s++;
				else break;
			}
			return l.slice(0, n - s);
		}
		function te(l) {
			let e = l.split(`
`), t = e.length - 1;
			for (; t >= 0 && m.blankLine.test(e[t]);) t--;
			return e.length - t <= 2 ? l : e.slice(0, t + 1).join(`
`);
		}
		function fe(l, e) {
			if (l.indexOf(e[1]) === -1) return -1;
			let t = 0;
			for (let n = 0; n < l.length; n++) if (l[n] === "\\") n++;
			else if (l[n] === e[0]) t++;
			else if (l[n] === e[1] && (t--, t < 0)) return n;
			return t > 0 ? -2 : -1;
		}
		function me(l, e = 0) {
			let t = e, n = "";
			for (let s of l) if (s === "	") {
				let r = 4 - t % 4;
				n += " ".repeat(r), t += r;
			} else n += s, t++;
			return n;
		}
		function xe(l, e, t, n, s) {
			let r = e.href, i = e.title || null, o = l[1].replace(s.other.outputLinkReplace, "$1"), u = l[0].charAt(0) === "!";
			n.state.inLink = !0;
			let a = n.state.linkEmitted, p = n.state.inRawBlock;
			n.state.linkEmitted = !1;
			let c = n.inlineTokens(o), h = n.state.linkEmitted;
			if (n.state.linkEmitted = a, n.state.inLink = !1, !u) {
				if (h) {
					n.state.inRawBlock = p;
					return;
				}
				n.state.linkEmitted = !0;
			}
			return {
				type: u ? "image" : "link",
				raw: t,
				href: r,
				title: i,
				text: o,
				tokens: c
			};
		}
		function kt(l, e, t) {
			let n = l.match(t.other.indentCodeCompensation);
			if (n === null) return e;
			let s = n[1];
			return e.split(`
`).map((r) => {
				let i = r.match(t.other.beginningSpace);
				if (i === null) return r;
				let [o] = i;
				return o.length >= s.length ? r.slice(s.length) : r;
			}).join(`
`);
		}
		var y = class {
			options;
			rules;
			lexer;
			constructor(e) {
				this.options = e || R;
			}
			space(e) {
				let t = this.rules.block.newline.exec(e);
				if (t && t[0].length > 0) return {
					type: "space",
					raw: t[0]
				};
			}
			code(e) {
				let t = this.rules.block.code.exec(e);
				if (t) {
					let n = this.options.pedantic ? t[0] : te(t[0]);
					return {
						type: "code",
						raw: n,
						codeBlockStyle: "indented",
						text: n.replace(this.rules.other.codeRemoveIndent, "")
					};
				}
			}
			fences(e) {
				let t = this.rules.block.fences.exec(e);
				if (t) {
					let n = t[0], s = kt(n, t[3] || "", this.rules);
					return {
						type: "code",
						raw: n,
						lang: t[2] ? t[2].trim().replace(this.rules.inline.anyPunctuation, "$1") : t[2],
						text: s
					};
				}
			}
			heading(e) {
				let t = this.rules.block.heading.exec(e);
				if (t) {
					let n = t[2].trim();
					if (this.rules.other.endingHash.test(n)) {
						let s = $(n, "#");
						(this.options.pedantic || !s || this.rules.other.endingSpaceChar.test(s)) && (n = s.trim());
					}
					return {
						type: "heading",
						raw: $(t[0], `
`),
						depth: t[1].length,
						text: n,
						tokens: this.lexer.inline(n)
					};
				}
			}
			hr(e) {
				let t = this.rules.block.hr.exec(e);
				if (t) return {
					type: "hr",
					raw: $(t[0], `
`)
				};
			}
			blockquote(e) {
				let t = this.rules.block.blockquote.exec(e);
				if (t) {
					let n = $(t[0], `
`).split(`
`), s = "", r = "", i = [];
					for (; n.length > 0;) {
						let o = !1, u = [], a;
						for (a = 0; a < n.length; a++) if (this.rules.other.blockquoteStart.test(n[a])) u.push(n[a]), o = !0;
						else if (!o) u.push(n[a]);
						else break;
						n = n.slice(a);
						let p = u.join(`
`), c = p.replace(this.rules.other.blockquoteSetextReplace, `
    $1`).replace(this.rules.other.blockquoteSetextReplace2, "");
						s = s ? `${s}
${p}` : p, r = r ? `${r}
${c}` : c;
						let h = this.lexer.state.top;
						if (this.lexer.state.top = !0, this.lexer.blockTokens(c, i, !0), this.lexer.state.top = h, n.length === 0) break;
						let d = i.at(-1);
						if (d?.type === "code") break;
						if (d?.type === "blockquote") {
							let O = d, g = n.join(`
`), w = O.raw + `
` + g.replace(this.rules.other.blockquoteSetextReplace2, ""), E = this.blockquote(w);
							i[i.length - 1] = E, s = `${s}
${g}`, r = r.substring(0, r.length - O.text.length) + E.text;
							break;
						} else if (d?.type === "list") {
							let O = d, g = O.raw + `
` + n.join(`
`), w = this.list(g);
							i[i.length - 1] = w, s = s.substring(0, s.length - d.raw.length) + w.raw, r = r.substring(0, r.length - O.raw.length) + w.raw, n = g.substring(i.at(-1).raw.length).split(`
`);
							continue;
						}
					}
					return {
						type: "blockquote",
						raw: s,
						tokens: i,
						text: r
					};
				}
			}
			list(e) {
				let t = this.rules.block.list.exec(e);
				if (t) {
					let n = t[1].trim(), s = n.length > 1, r = {
						type: "list",
						raw: "",
						ordered: s,
						start: s ? +n.slice(0, -1) : "",
						loose: !1,
						items: []
					};
					n = s ? `\\d{1,9}\\${n.slice(-1)}` : `\\${n}`, this.options.pedantic && (n = s ? n : "[*+-]");
					let i = this.rules.other.listItemRegex(n), o = !1;
					for (; e;) {
						let a = !1, p = "", c = "";
						if (!(t = i.exec(e)) || this.rules.block.hr.test(e)) break;
						p = t[0], e = e.substring(p.length);
						let h = me(t[2].split(`
`, 1)[0], t[1].length), d = e.split(`
`, 1)[0], O = !h.trim(), g = 0;
						if (this.options.pedantic ? (g = 2, c = h.trimStart()) : O ? g = t[1].length + 1 : (g = h.search(this.rules.other.nonSpaceChar), g = g > 4 ? 1 : g, c = h.slice(g), g += t[1].length), O && this.rules.other.blankLine.test(d) && (p += d + `
`, e = e.substring(d.length + 1), a = !0), !a) {
							let w = this.rules.other.nextBulletRegex(g), E = this.rules.other.hrRegex(g), ne = this.rules.other.fencesBeginRegex(g), re = this.rules.other.headingBeginRegex(g), be = this.rules.other.htmlBeginRegex(g), Re = this.rules.other.blockquoteBeginRegex(g);
							for (; e;) {
								let N = e.split(`
`, 1)[0], D;
								if (d = N, this.options.pedantic ? (d = d.replace(this.rules.other.listReplaceNesting, "  "), D = d) : D = d.replace(this.rules.other.tabCharGlobal, "    "), ne.test(d) || re.test(d) || be.test(d) || Re.test(d) || w.test(d) || E.test(d)) break;
								if (D.search(this.rules.other.nonSpaceChar) >= g || !d.trim()) c += `
` + D.slice(g);
								else {
									if (O || h.replace(this.rules.other.tabCharGlobal, "    ").search(this.rules.other.nonSpaceChar) >= 4 || ne.test(h) || re.test(h) || E.test(h)) break;
									c += `
` + d;
								}
								O = !d.trim(), p += N + `
`, e = e.substring(N.length + 1), h = D.slice(g);
							}
						}
						r.loose || (o ? r.loose = !0 : this.rules.other.doubleBlankLine.test(p) && (o = !0)), r.items.push({
							type: "list_item",
							raw: p,
							task: !!this.options.gfm && this.rules.other.listIsTask.test(c),
							loose: !1,
							text: c,
							tokens: []
						}), r.raw += p;
					}
					let u = r.items.at(-1);
					if (u) u.raw = u.raw.trimEnd(), u.text = u.text.trimEnd();
					else return;
					r.raw = r.raw.trimEnd();
					for (let a of r.items) if (this.lexer.state.top = !1, a.tokens = this.lexer.blockTokens(a.text, []), !r.loose) {
						let p = a.tokens.filter((h) => h.type === "space");
						r.loose = p.length > 0 && p.some((h) => this.rules.other.anyLine.test(h.raw));
					}
					for (let a of r.items) {
						let p = a.tokens[0];
						if (a.task && (p?.type === "text" || p?.type === "paragraph")) {
							a.text = a.text.replace(this.rules.other.listReplaceTask, ""), p.raw = p.raw.replace(this.rules.other.listReplaceTask, ""), p.text = p.text.replace(this.rules.other.listReplaceTask, "");
							for (let h = this.lexer.inlineQueue.length - 1; h >= 0; h--) if (this.rules.other.listIsTask.test(this.lexer.inlineQueue[h].src)) {
								this.lexer.inlineQueue[h].src = this.lexer.inlineQueue[h].src.replace(this.rules.other.listReplaceTask, "");
								break;
							}
							let c = this.rules.other.listTaskCheckbox.exec(a.raw);
							if (c) {
								let h = {
									type: "checkbox",
									raw: c[0] + " ",
									checked: c[0] !== "[ ]"
								};
								a.checked = h.checked, r.loose ? a.tokens[0] && ["paragraph", "text"].includes(a.tokens[0].type) && "tokens" in a.tokens[0] && a.tokens[0].tokens ? (a.tokens[0].raw = h.raw + a.tokens[0].raw, a.tokens[0].text = h.raw + a.tokens[0].text, a.tokens[0].tokens.unshift(h)) : a.tokens.unshift({
									type: "paragraph",
									raw: h.raw,
									text: h.raw,
									tokens: [h]
								}) : a.tokens.unshift(h);
							}
						} else a.task && (a.task = !1);
					}
					if (r.loose) for (let a of r.items) {
						a.loose = !0;
						for (let p of a.tokens) p.type === "text" && (p.type = "paragraph");
					}
					return r;
				}
			}
			html(e) {
				let t = this.rules.block.html.exec(e);
				if (t) {
					let n = te(t[0]);
					return {
						type: "html",
						block: !0,
						raw: n,
						pre: t[1] === "pre" || t[1] === "script" || t[1] === "style",
						text: n
					};
				}
			}
			def(e) {
				let t = this.rules.block.def.exec(e);
				if (t) {
					let n = t[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal, " "), s = t[2] ? t[2].replace(this.rules.other.hrefBrackets, "$1").replace(this.rules.inline.anyPunctuation, "$1") : "", r = t[3] ? t[3].substring(1, t[3].length - 1).replace(this.rules.inline.anyPunctuation, "$1") : t[3];
					return {
						type: "def",
						tag: n,
						raw: $(t[0], `
`),
						href: s,
						title: r
					};
				}
			}
			table(e) {
				let t = this.rules.block.table.exec(e);
				if (!t || !this.rules.other.tableDelimiter.test(t[2])) return;
				let n = ee(t[1]), s = t[2].replace(this.rules.other.tableAlignChars, "").split("|"), r = t[3]?.trim() ? t[3].replace(this.rules.other.tableRowBlankLine, "").split(`
`) : [], i = {
					type: "table",
					raw: $(t[0], `
`),
					header: [],
					align: [],
					rows: []
				};
				if (n.length === s.length) {
					for (let o of s) this.rules.other.tableAlignRight.test(o) ? i.align.push("right") : this.rules.other.tableAlignCenter.test(o) ? i.align.push("center") : this.rules.other.tableAlignLeft.test(o) ? i.align.push("left") : i.align.push(null);
					for (let o = 0; o < n.length; o++) i.header.push({
						text: n[o],
						tokens: this.lexer.inline(n[o]),
						header: !0,
						align: i.align[o]
					});
					for (let o of r) i.rows.push(ee(o, i.header.length).map((u, a) => ({
						text: u,
						tokens: this.lexer.inline(u),
						header: !1,
						align: i.align[a]
					})));
					return i;
				}
			}
			lheading(e) {
				let t = this.rules.block.lheading.exec(e);
				if (t) {
					let n = t[1].trim();
					return {
						type: "heading",
						raw: $(t[0], `
`),
						depth: t[2].charAt(0) === "=" ? 1 : 2,
						text: n,
						tokens: this.lexer.inline(n)
					};
				}
			}
			paragraph(e) {
				let t = this.rules.block.paragraph.exec(e);
				if (t) {
					let n = t[1].charAt(t[1].length - 1) === `
` ? t[1].slice(0, -1) : t[1];
					return {
						type: "paragraph",
						raw: t[0],
						text: n,
						tokens: this.lexer.inline(n)
					};
				}
			}
			text(e) {
				let t = this.rules.block.text.exec(e);
				if (t) return {
					type: "text",
					raw: t[0],
					text: t[0],
					tokens: this.lexer.inline(t[0])
				};
			}
			escape(e) {
				let t = this.rules.inline.escape.exec(e);
				if (t) return {
					type: "escape",
					raw: t[0],
					text: t[1]
				};
			}
			tag(e) {
				let t = this.rules.inline.tag.exec(e);
				if (t) return !this.lexer.state.inLink && this.rules.other.startATag.test(t[0]) ? this.lexer.state.inLink = !0 : this.lexer.state.inLink && this.rules.other.endATag.test(t[0]) && (this.lexer.state.inLink = !1), !this.lexer.state.inRawBlock && this.rules.other.startPreScriptTag.test(t[0]) ? this.lexer.state.inRawBlock = !0 : this.lexer.state.inRawBlock && this.rules.other.endPreScriptTag.test(t[0]) && (this.lexer.state.inRawBlock = !1), {
					type: "html",
					raw: t[0],
					inLink: this.lexer.state.inLink,
					inRawBlock: this.lexer.state.inRawBlock,
					block: !1,
					text: t[0]
				};
			}
			link(e) {
				let t = this.rules.inline.link.exec(e);
				if (t) {
					let n = t[2].trim();
					if (!this.options.pedantic && this.rules.other.startAngleBracket.test(n)) {
						if (!this.rules.other.endAngleBracket.test(n)) return;
						let i = $(n.slice(0, -1), "\\");
						if ((n.length - i.length) % 2 === 0) return;
					} else {
						let i = fe(t[2], "()");
						if (i === -2) return;
						if (i > -1) {
							let u = (t[0].indexOf("!") === 0 ? 5 : 4) + t[1].length + i;
							t[2] = t[2].substring(0, i), t[0] = t[0].substring(0, u).trim(), t[3] = "";
						}
					}
					let s = t[2], r = "";
					if (this.options.pedantic) {
						let i = this.rules.other.pedanticHrefTitle.exec(s);
						i && (s = i[1], r = i[3]);
					} else r = t[3] ? t[3].slice(1, -1) : "";
					return s = s.trim(), this.rules.other.startAngleBracket.test(s) && (this.options.pedantic && !this.rules.other.endAngleBracket.test(n) ? s = s.slice(1) : s = s.slice(1, -1)), xe(t, {
						href: s && s.replace(this.rules.inline.anyPunctuation, "$1"),
						title: r && r.replace(this.rules.inline.anyPunctuation, "$1")
					}, t[0], this.lexer, this.rules);
				}
			}
			reflink(e, t) {
				let n;
				if ((n = this.rules.inline.reflink.exec(e)) || (n = this.rules.inline.nolink.exec(e))) {
					let r = t[(n[2] || n[1]).replace(this.rules.other.multipleSpaceGlobal, " ").toLowerCase()];
					if (!r) {
						let i = n[0].charAt(0);
						return {
							type: "text",
							raw: i,
							text: i
						};
					}
					return xe(n, r, n[0], this.lexer, this.rules);
				}
			}
			emStrong(e, t, n = "") {
				let s = this.rules.inline.emStrongLDelim.exec(e);
				if (!s || !s[1] && !s[2] && !s[3] && !s[4] || s[4] && n.match(this.rules.other.unicodeAlphaNumeric)) return;
				if (!(s[1] || s[3] || "") || !n || this.rules.inline.punctuation.exec(n)) {
					let i = [...s[0]].length - 1, o, u, a = i, p = 0, c = s[0][0], h = n === c, d = c === "*" ? this.rules.inline.emStrongRDelimAst : this.rules.inline.emStrongRDelimUnd;
					for (d.lastIndex = 0, t = t.slice(-1 * e.length + i); (s = d.exec(t)) !== null;) {
						if (o = s[1] || s[2] || s[3] || s[4] || s[5] || s[6], !o) continue;
						if (u = [...o].length, s[3] || s[4]) {
							a += u;
							continue;
						} else if (s[5] || s[6]) {
							if (i % 3 && !((i + u) % 3)) {
								p += u;
								continue;
							}
							if (h) break;
						}
						if (a -= u, a > 0) continue;
						u = Math.min(u, u + a + p);
						let O = [...s[0]][0].length, g = e.slice(0, i + s.index + O + u);
						if (Math.min(i, u) % 2) {
							let E = g.slice(1, -1);
							return {
								type: "em",
								raw: g,
								text: E,
								tokens: this.lexer.inlineTokens(E)
							};
						}
						let w = g.slice(2, -2);
						return {
							type: "strong",
							raw: g,
							text: w,
							tokens: this.lexer.inlineTokens(w)
						};
					}
				}
			}
			codespan(e) {
				let t = this.rules.inline.code.exec(e);
				if (t) {
					let n = t[2].replace(this.rules.other.newLineCharGlobal, " "), s = this.rules.other.nonSpaceChar.test(n), r = this.rules.other.startingSpaceChar.test(n) && this.rules.other.endingSpaceChar.test(n);
					return s && r && (n = n.substring(1, n.length - 1)), {
						type: "codespan",
						raw: t[0],
						text: n
					};
				}
			}
			br(e) {
				let t = this.rules.inline.br.exec(e);
				if (t) return {
					type: "br",
					raw: t[0]
				};
			}
			del(e, t, n = "") {
				let s = this.rules.inline.delLDelim.exec(e);
				if (!s) return;
				if (!(s[1] || "") || !n || this.rules.inline.punctuation.exec(n)) {
					let i = [...s[0]].length - 1, o, u, a = i, p = this.rules.inline.delRDelim;
					for (p.lastIndex = 0, t = t.slice(-1 * e.length + i); (s = p.exec(t)) !== null;) {
						if (o = s[1] || s[2] || s[3] || s[4] || s[5] || s[6], !o || (u = [...o].length, u !== i)) continue;
						if (s[3] || s[4]) {
							a += u;
							continue;
						}
						if (a -= u, a > 0) continue;
						u = Math.min(u, u + a);
						let c = [...s[0]][0].length, h = e.slice(0, i + s.index + c + u), d = h.slice(i, -i);
						return {
							type: "del",
							raw: h,
							text: d,
							tokens: this.lexer.inlineTokens(d)
						};
					}
				}
			}
			autolink(e) {
				let t = this.rules.inline.autolink.exec(e);
				if (t) {
					let n, s;
					return t[2] === "@" ? (n = t[1], s = "mailto:" + n) : (n = t[1], s = n), {
						type: "link",
						raw: t[0],
						text: n,
						href: s,
						tokens: [{
							type: "text",
							raw: n,
							text: n
						}]
					};
				}
			}
			url(e) {
				let t;
				if (t = this.rules.inline.url.exec(e)) {
					let n, s;
					if (t[2] === "@") n = t[0], s = "mailto:" + n;
					else {
						let r;
						do
							r = t[0], t[0] = this.rules.inline._backpedal.exec(t[0])?.[0] ?? "";
						while (r !== t[0]);
						n = t[0], t[1] === "www." ? s = "http://" + t[0] : s = t[0];
					}
					return {
						type: "link",
						raw: t[0],
						text: n,
						href: s,
						tokens: [{
							type: "text",
							raw: n,
							text: n
						}]
					};
				}
			}
			inlineText(e) {
				let t = this.rules.inline.text.exec(e);
				if (t) {
					let n = this.lexer.state.inRawBlock;
					return {
						type: "text",
						raw: t[0],
						text: t[0],
						escaped: n
					};
				}
			}
		};
		var x = class l {
			tokens;
			options;
			state;
			inlineQueue;
			tokenizer;
			constructor(e) {
				this.tokens = [], this.tokens.links = Object.create(null), this.options = e || R, this.options.tokenizer = this.options.tokenizer || new y(), this.tokenizer = this.options.tokenizer, this.tokenizer.options = this.options, this.tokenizer.lexer = this, this.inlineQueue = [], this.state = {
					inLink: !1,
					inRawBlock: !1,
					linkEmitted: !1,
					top: !0
				};
				let t = {
					other: m,
					block: H.normal,
					inline: B.normal
				};
				this.options.pedantic ? (t.block = H.pedantic, t.inline = B.pedantic) : this.options.gfm && (t.block = H.gfm, this.options.breaks ? t.inline = B.breaks : t.inline = B.gfm), this.tokenizer.rules = t;
			}
			static get rules() {
				return {
					block: H,
					inline: B
				};
			}
			static lex(e, t) {
				return new l(t).lex(e);
			}
			static lexInline(e, t) {
				return new l(t).inlineTokens(e);
			}
			lex(e) {
				e = e.replace(m.carriageReturn, `
`), this.blockTokens(e, this.tokens);
				for (let t = 0; t < this.inlineQueue.length; t++) {
					let n = this.inlineQueue[t];
					this.inlineTokens(n.src, n.tokens);
				}
				return this.inlineQueue = [], this.tokens;
			}
			blockTokens(e, t = [], n = !1) {
				this.tokenizer.lexer = this, this.options.pedantic && (e = e.replace(m.tabCharGlobal, "    ").replace(m.spaceLine, ""));
				let s = Infinity;
				for (; e;) {
					if (e.length < s) s = e.length;
					else {
						this.infiniteLoopError(e.charCodeAt(0));
						break;
					}
					let r;
					if (this.options.extensions?.block?.some((o) => (r = o.call({ lexer: this }, e, t)) ? (e = e.substring(r.raw.length), t.push(r), !0) : !1)) continue;
					if (r = this.tokenizer.space(e)) {
						e = e.substring(r.raw.length);
						let o = t.at(-1);
						r.raw.length === 1 && o !== void 0 ? o.raw += `
` : t.push(r);
						continue;
					}
					if (r = this.tokenizer.code(e)) {
						e = e.substring(r.raw.length);
						let o = t.at(-1);
						o?.type === "paragraph" || o?.type === "text" ? (o.raw += (o.raw.endsWith(`
`) ? "" : `
`) + r.raw, o.text += `
` + r.text, this.inlineQueue.at(-1).src = o.text) : t.push(r);
						continue;
					}
					if (r = this.tokenizer.fences(e)) {
						e = e.substring(r.raw.length), t.push(r);
						continue;
					}
					if (r = this.tokenizer.heading(e)) {
						e = e.substring(r.raw.length), t.push(r);
						continue;
					}
					if (r = this.tokenizer.hr(e)) {
						e = e.substring(r.raw.length), t.push(r);
						continue;
					}
					if (r = this.tokenizer.blockquote(e)) {
						e = e.substring(r.raw.length), t.push(r);
						continue;
					}
					if (r = this.tokenizer.list(e)) {
						e = e.substring(r.raw.length), t.push(r);
						continue;
					}
					if (r = this.tokenizer.html(e)) {
						e = e.substring(r.raw.length), t.push(r);
						continue;
					}
					if (r = this.tokenizer.def(e)) {
						e = e.substring(r.raw.length);
						let o = t.at(-1);
						o?.type === "paragraph" || o?.type === "text" ? (o.raw += (o.raw.endsWith(`
`) ? "" : `
`) + r.raw, o.text += `
` + r.raw, this.inlineQueue.at(-1).src = o.text) : this.tokens.links[r.tag] || (this.tokens.links[r.tag] = {
							href: r.href,
							title: r.title
						}, t.push(r));
						continue;
					}
					if (r = this.tokenizer.table(e)) {
						e = e.substring(r.raw.length), t.push(r);
						continue;
					}
					if (r = this.tokenizer.lheading(e)) {
						e = e.substring(r.raw.length), t.push(r);
						continue;
					}
					let i = e;
					if (this.options.extensions?.startBlock) {
						let o = Infinity, u = e.slice(1), a;
						this.options.extensions.startBlock.forEach((p) => {
							a = p.call({ lexer: this }, u), typeof a == "number" && a >= 0 && (o = Math.min(o, a));
						}), o < Infinity && o >= 0 && (i = e.substring(0, o + 1));
					}
					if (this.state.top && (r = this.tokenizer.paragraph(i))) {
						let o = t.at(-1);
						n && o?.type === "paragraph" ? (o.raw += (o.raw.endsWith(`
`) ? "" : `
`) + r.raw, o.text += `
` + r.text, this.inlineQueue.pop(), this.inlineQueue.at(-1).src = o.text) : t.push(r), n = i.length !== e.length, e = e.substring(r.raw.length);
						continue;
					}
					if (r = this.tokenizer.text(e)) {
						e = e.substring(r.raw.length);
						let o = t.at(-1);
						o?.type === "text" ? (o.raw += (o.raw.endsWith(`
`) ? "" : `
`) + r.raw, o.text += `
` + r.text, this.inlineQueue.pop(), this.inlineQueue.at(-1).src = o.text) : t.push(r);
						continue;
					}
					if (e) {
						this.infiniteLoopError(e.charCodeAt(0));
						break;
					}
				}
				return this.state.top = !0, t;
			}
			inline(e, t = []) {
				return this.inlineQueue.push({
					src: e,
					tokens: t
				}), t;
			}
			linkInText(e) {
				if (!e.includes("[")) return !1;
				let t = this.tokenizer.rules.inline.link;
				for (let n of e.matchAll(this.tokenizer.rules.inline.blockSkip)) if (t.test(n[0]) && e.charAt(n.index - 1) !== "!") return !0;
				for (let n of e.matchAll(this.tokenizer.rules.inline.reflinkSearch)) {
					let s = n[0], r = s.lastIndexOf("[");
					if (!(s.charAt(0) === "!" || !Object.hasOwn(this.tokens.links, s.slice(r + 1, -1))) && !(r > 1 && this.linkInText(s.slice(1, r - 1)))) return !0;
				}
				return !1;
			}
			inlineTokens(e, t = []) {
				this.tokenizer.lexer = this;
				let n = e;
				if (this.tokens.links && e.includes("[")) {
					let o = this.tokenizer.rules.inline.reflinkSearch, u = (a) => {
						let p = a.lastIndexOf("[");
						if (!Object.hasOwn(this.tokens.links, a.slice(p + 1, -1))) return a;
						if (p > 1 && a.charAt(0) !== "!") {
							let c = a.slice(1, p - 1);
							if (this.linkInText(c)) return "[" + c.replace(o, u) + "][" + "a".repeat(a.length - p - 2) + "]";
						}
						return "[" + "a".repeat(a.length - 2) + "]";
					};
					n = n.replace(o, u);
				}
				n = n.replace(this.tokenizer.rules.inline.anyPunctuation, (o) => "+".repeat(o.length)), n = n.replace(this.tokenizer.rules.inline.blockSkip, (o, u, a) => {
					let p = a ? a.length : 0;
					return o.slice(0, p) + "[" + "a".repeat(o.length - p - 2) + "]";
				}), n = this.options.hooks?.emStrongMask?.call({ lexer: this }, n) ?? n;
				let s = !1, r = "", i = Infinity;
				for (; e;) {
					if (e.length < i) i = e.length;
					else {
						this.infiniteLoopError(e.charCodeAt(0));
						break;
					}
					s || (r = ""), s = !1;
					let o;
					if (this.options.extensions?.inline?.some((a) => (o = a.call({ lexer: this }, e, t)) ? (e = e.substring(o.raw.length), t.push(o), !0) : !1)) continue;
					if (o = this.tokenizer.escape(e)) {
						e = e.substring(o.raw.length), t.push(o);
						continue;
					}
					if (o = this.tokenizer.tag(e)) {
						e = e.substring(o.raw.length), t.push(o);
						continue;
					}
					if (o = this.tokenizer.link(e)) {
						e = e.substring(o.raw.length), t.push(o);
						continue;
					}
					if (o = this.tokenizer.reflink(e, this.tokens.links)) {
						e = e.substring(o.raw.length);
						let a = t.at(-1);
						o.type === "text" && a?.type === "text" ? (a.raw += o.raw, a.text += o.text) : t.push(o);
						continue;
					}
					if (o = this.tokenizer.emStrong(e, n, r)) {
						e = e.substring(o.raw.length), t.push(o);
						continue;
					}
					if (o = this.tokenizer.codespan(e)) {
						e = e.substring(o.raw.length), t.push(o);
						continue;
					}
					if (o = this.tokenizer.br(e)) {
						e = e.substring(o.raw.length), t.push(o);
						continue;
					}
					if (o = this.tokenizer.del(e, n, r)) {
						e = e.substring(o.raw.length), t.push(o);
						continue;
					}
					if (o = this.tokenizer.autolink(e)) {
						e = e.substring(o.raw.length), t.push(o);
						continue;
					}
					if (!this.state.inLink && (o = this.tokenizer.url(e))) {
						e = e.substring(o.raw.length), t.push(o);
						continue;
					}
					let u = e;
					if (this.options.extensions?.startInline) {
						let a = Infinity, p = e.slice(1), c;
						this.options.extensions.startInline.forEach((h) => {
							c = h.call({ lexer: this }, p), typeof c == "number" && c >= 0 && (a = Math.min(a, c));
						}), a < Infinity && a >= 0 && (u = e.substring(0, a + 1));
					}
					if (o = this.tokenizer.inlineText(u)) {
						e = e.substring(o.raw.length), o.raw.slice(-1) !== "_" && (r = o.raw.slice(-1)), s = !0;
						let a = t.at(-1);
						a?.type === "text" ? (a.raw += o.raw, a.text += o.text) : t.push(o);
						continue;
					}
					if (e) {
						this.infiniteLoopError(e.charCodeAt(0));
						break;
					}
				}
				return t;
			}
			infiniteLoopError(e) {
				let t = "Infinite loop on byte: " + e;
				if (this.options.silent) console.error(t);
				else throw new Error(t);
			}
		};
		var P = class {
			options;
			parser;
			constructor(e) {
				this.options = e || R;
			}
			space(e) {
				return "";
			}
			code({ text: e, lang: t, escaped: n }) {
				let s = (t || "").match(m.notSpaceStart)?.[0], r = e.replace(m.endingNewline, "") + `
`;
				return s ? "<pre><code class=\"language-" + T(s) + "\">" + (n ? r : T(r, !0)) + `</code></pre>
` : "<pre><code>" + (n ? r : T(r, !0)) + `</code></pre>
`;
			}
			blockquote({ tokens: e }) {
				return `<blockquote>
${this.parser.parse(e)}</blockquote>
`;
			}
			html({ text: e }) {
				return e;
			}
			def(e) {
				return "";
			}
			heading({ tokens: e, depth: t }) {
				return `<h${t}>${this.parser.parseInline(e)}</h${t}>
`;
			}
			hr(e) {
				return `<hr>
`;
			}
			list(e) {
				let t = e.ordered, n = e.start, s = "";
				for (let o = 0; o < e.items.length; o++) {
					let u = e.items[o];
					s += this.listitem(u);
				}
				let r = t ? "ol" : "ul", i = t && n !== 1 ? " start=\"" + n + "\"" : "";
				return "<" + r + i + `>
` + s + "</" + r + `>
`;
			}
			listitem(e) {
				return `<li>${this.parser.parse(e.tokens)}</li>
`;
			}
			checkbox({ checked: e }) {
				return "<input " + (e ? "checked=\"\" " : "") + "disabled=\"\" type=\"checkbox\"> ";
			}
			paragraph({ tokens: e }) {
				return `<p>${this.parser.parseInline(e)}</p>
`;
			}
			table(e) {
				let t = "", n = "";
				for (let r = 0; r < e.header.length; r++) n += this.tablecell(e.header[r]);
				t += this.tablerow({ text: n });
				let s = "";
				for (let r = 0; r < e.rows.length; r++) {
					let i = e.rows[r];
					n = "";
					for (let o = 0; o < i.length; o++) n += this.tablecell(i[o]);
					s += this.tablerow({ text: n });
				}
				return s && (s = `<tbody>${s}</tbody>`), `<table>
<thead>
` + t + `</thead>
` + s + `</table>
`;
			}
			tablerow({ text: e }) {
				return `<tr>
${e}</tr>
`;
			}
			tablecell(e) {
				let t = this.parser.parseInline(e.tokens), n = e.header ? "th" : "td";
				return (e.align ? `<${n} align="${e.align}">` : `<${n}>`) + t + `</${n}>
`;
			}
			strong({ tokens: e }) {
				return `<strong>${this.parser.parseInline(e)}</strong>`;
			}
			em({ tokens: e }) {
				return `<em>${this.parser.parseInline(e)}</em>`;
			}
			codespan({ text: e }) {
				return `<code>${T(e, !0)}</code>`;
			}
			br(e) {
				return "<br>";
			}
			del({ tokens: e }) {
				return `<del>${this.parser.parseInline(e)}</del>`;
			}
			link({ href: e, title: t, tokens: n }) {
				let s = this.parser.parseInline(n), r = Y(e);
				if (r === null) return s;
				e = r;
				let i = "<a href=\"" + e + "\"";
				return t && (i += " title=\"" + T(t) + "\""), i += ">" + s + "</a>", i;
			}
			image({ href: e, title: t, text: n, tokens: s }) {
				s && (n = this.parser.parseInline(s, this.parser.textRenderer));
				let r = Y(e);
				if (r === null) return T(n);
				e = r;
				let i = `<img src="${e}" alt="${T(n)}"`;
				return t && (i += ` title="${T(t)}"`), i += ">", i;
			}
			text(e) {
				return "tokens" in e && e.tokens ? this.parser.parseInline(e.tokens) : "escaped" in e && e.escaped ? e.text : T(e.text);
			}
		};
		var L = class {
			strong({ text: e }) {
				return e;
			}
			em({ text: e }) {
				return e;
			}
			codespan({ text: e }) {
				return e;
			}
			del({ text: e }) {
				return e;
			}
			html({ text: e }) {
				return e;
			}
			text({ text: e }) {
				return e;
			}
			link({ text: e }) {
				return "" + e;
			}
			image({ text: e }) {
				return "" + e;
			}
			br() {
				return "";
			}
			checkbox({ raw: e }) {
				return e;
			}
		};
		var b = class l {
			options;
			renderer;
			textRenderer;
			constructor(e) {
				this.options = e || R, this.options.renderer = this.options.renderer || new P(), this.renderer = this.options.renderer, this.renderer.options = this.options, this.renderer.parser = this, this.textRenderer = new L();
			}
			static parse(e, t) {
				return new l(t).parse(e);
			}
			static parseInline(e, t) {
				return new l(t).parseInline(e);
			}
			parse(e) {
				this.renderer.parser = this;
				let t = "";
				for (let n = 0; n < e.length; n++) {
					let s = e[n];
					if (this.options.extensions?.renderers?.[s.type]) {
						let i = s, o = this.options.extensions.renderers[i.type].call({ parser: this }, i);
						if (o !== !1 || ![
							"space",
							"hr",
							"heading",
							"code",
							"table",
							"blockquote",
							"list",
							"checkbox",
							"html",
							"def",
							"paragraph",
							"text"
						].includes(i.type)) {
							t += o || "";
							continue;
						}
					}
					let r = s;
					switch (r.type) {
						case "space":
							t += this.renderer.space(r);
							break;
						case "hr":
							t += this.renderer.hr(r);
							break;
						case "heading":
							t += this.renderer.heading(r);
							break;
						case "code":
							t += this.renderer.code(r);
							break;
						case "table":
							t += this.renderer.table(r);
							break;
						case "blockquote":
							t += this.renderer.blockquote(r);
							break;
						case "list":
							t += this.renderer.list(r);
							break;
						case "checkbox":
							t += this.renderer.checkbox(r);
							break;
						case "html":
							t += this.renderer.html(r);
							break;
						case "def":
							t += this.renderer.def(r);
							break;
						case "paragraph":
							t += this.renderer.paragraph(r);
							break;
						case "text":
							t += this.renderer.text(r);
							break;
						default: {
							let i = "Token with \"" + r.type + "\" type was not found.";
							if (this.options.silent) return console.error(i), "";
							throw new Error(i);
						}
					}
				}
				return t;
			}
			parseInline(e, t = this.renderer) {
				this.renderer.parser = this;
				let n = "";
				for (let s = 0; s < e.length; s++) {
					let r = e[s];
					if (this.options.extensions?.renderers?.[r.type]) {
						let o = this.options.extensions.renderers[r.type].call({ parser: this }, r);
						if (o !== !1 || ![
							"escape",
							"html",
							"link",
							"image",
							"checkbox",
							"strong",
							"em",
							"codespan",
							"br",
							"del",
							"text"
						].includes(r.type)) {
							n += o || "";
							continue;
						}
					}
					let i = r;
					switch (i.type) {
						case "escape":
							n += t.text(i);
							break;
						case "html":
							n += t.html(i);
							break;
						case "link":
							n += t.link(i);
							break;
						case "image":
							n += t.image(i);
							break;
						case "checkbox":
							n += t.checkbox(i);
							break;
						case "strong":
							n += t.strong(i);
							break;
						case "em":
							n += t.em(i);
							break;
						case "codespan":
							n += t.codespan(i);
							break;
						case "br":
							n += t.br(i);
							break;
						case "del":
							n += t.del(i);
							break;
						case "text":
							n += t.text(i);
							break;
						default: {
							let o = "Token with \"" + i.type + "\" type was not found.";
							if (this.options.silent) return console.error(o), "";
							throw new Error(o);
						}
					}
				}
				return n;
			}
		};
		var S = class {
			options;
			block;
			constructor(e) {
				this.options = e || R;
			}
			static passThroughHooks = /* @__PURE__ */ new Set([
				"preprocess",
				"postprocess",
				"processAllTokens",
				"emStrongMask"
			]);
			static passThroughHooksRespectAsync = /* @__PURE__ */ new Set([
				"preprocess",
				"postprocess",
				"processAllTokens"
			]);
			preprocess(e) {
				return e;
			}
			postprocess(e) {
				return e;
			}
			processAllTokens(e) {
				return e;
			}
			emStrongMask(e) {
				return e;
			}
			provideLexer(e = this.block) {
				return e ? x.lex : x.lexInline;
			}
			provideParser(e = this.block) {
				return e ? b.parse : b.parseInline;
			}
		};
		var Z = class {
			defaults = A();
			options = this.setOptions;
			parse = this.parseMarkdown(!0);
			parseInline = this.parseMarkdown(!1);
			Parser = b;
			Renderer = P;
			TextRenderer = L;
			Lexer = x;
			Tokenizer = y;
			Hooks = S;
			constructor(...e) {
				this.use(...e);
			}
			walkTokens(e, t) {
				let n = [];
				for (let s of e) switch (n = n.concat(t.call(this, s)), s.type) {
					case "table": {
						let r = s;
						for (let i of r.header) n = n.concat(this.walkTokens(i.tokens, t));
						for (let i of r.rows) for (let o of i) n = n.concat(this.walkTokens(o.tokens, t));
						break;
					}
					case "list": {
						let r = s;
						n = n.concat(this.walkTokens(r.items, t));
						break;
					}
					default: {
						let r = s;
						this.defaults.extensions?.childTokens?.[r.type] ? this.defaults.extensions.childTokens[r.type].forEach((i) => {
							let o = r[i].flat(Infinity);
							n = n.concat(this.walkTokens(o, t));
						}) : r.tokens && (n = n.concat(this.walkTokens(r.tokens, t)));
					}
				}
				return n;
			}
			use(...e) {
				let t = this.defaults.extensions || {
					renderers: {},
					childTokens: {}
				};
				return e.forEach((n) => {
					let s = { ...n };
					if (s.async = this.defaults.async || s.async || !1, n.extensions && (n.extensions.forEach((r) => {
						if (!r.name) throw new Error("extension name required");
						if ("renderer" in r) {
							let i = t.renderers[r.name];
							i ? t.renderers[r.name] = function(...o) {
								let u = r.renderer.apply(this, o);
								return u === !1 && (u = i.apply(this, o)), u;
							} : t.renderers[r.name] = r.renderer;
						}
						if ("tokenizer" in r) {
							if (!r.level || r.level !== "block" && r.level !== "inline") throw new Error("extension level must be 'block' or 'inline'");
							let i = t[r.level];
							i ? i.unshift(r.tokenizer) : t[r.level] = [r.tokenizer], r.start && (r.level === "block" ? t.startBlock ? t.startBlock.push(r.start) : t.startBlock = [r.start] : r.level === "inline" && (t.startInline ? t.startInline.push(r.start) : t.startInline = [r.start]));
						}
						"childTokens" in r && r.childTokens && (t.childTokens[r.name] = r.childTokens);
					}), s.extensions = t), n.renderer) {
						let r = this.defaults.renderer || new P(this.defaults);
						for (let i in n.renderer) {
							if (!(i in r)) throw new Error(`renderer '${i}' does not exist`);
							if (["options", "parser"].includes(i)) continue;
							let o = i, u = n.renderer[o], a = r[o];
							r[o] = (...p) => {
								let c = u.apply(r, p);
								return c === !1 && (c = a.apply(r, p)), c || "";
							};
						}
						s.renderer = r;
					}
					if (n.tokenizer) {
						let r = this.defaults.tokenizer || new y(this.defaults);
						for (let i in n.tokenizer) {
							if (!(i in r)) throw new Error(`tokenizer '${i}' does not exist`);
							if ([
								"options",
								"rules",
								"lexer"
							].includes(i)) continue;
							let o = i, u = n.tokenizer[o], a = r[o];
							r[o] = (...p) => {
								let c = u.apply(r, p);
								return c === !1 && (c = a.apply(r, p)), c;
							};
						}
						s.tokenizer = r;
					}
					if (n.hooks) {
						let r = this.defaults.hooks || new S();
						for (let i in n.hooks) {
							if (!(i in r)) throw new Error(`hook '${i}' does not exist`);
							if (["options", "block"].includes(i)) continue;
							let o = i, u = n.hooks[o], a = r[o];
							S.passThroughHooks.has(i) ? r[o] = (p) => {
								if (this.defaults.async && S.passThroughHooksRespectAsync.has(i)) return (async () => {
									let h = await u.call(r, p);
									return a.call(r, h);
								})();
								let c = u.call(r, p);
								return a.call(r, c);
							} : r[o] = (...p) => {
								if (this.defaults.async) return (async () => {
									let h = await u.apply(r, p);
									return h === !1 && (h = await a.apply(r, p)), h;
								})();
								let c = u.apply(r, p);
								return c === !1 && (c = a.apply(r, p)), c;
							};
						}
						s.hooks = r;
					}
					if (n.walkTokens) {
						let r = this.defaults.walkTokens, i = n.walkTokens;
						s.walkTokens = function(o) {
							let u = [];
							return u.push(i.call(this, o)), r && (u = u.concat(r.call(this, o))), u;
						};
					}
					this.defaults = {
						...this.defaults,
						...s
					};
				}), this;
			}
			setOptions(e) {
				return this.defaults = {
					...this.defaults,
					...e
				}, this;
			}
			lexer(e, t) {
				return x.lex(e, t ?? this.defaults);
			}
			parser(e, t) {
				return b.parse(e, t ?? this.defaults);
			}
			parseMarkdown(e) {
				return (n, s) => {
					let r = { ...s }, i = {
						...this.defaults,
						...r
					}, o = this.onError(!!i.silent, !!i.async);
					if (this.defaults.async === !0 && r.async === !1) return o(/* @__PURE__ */ new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));
					if (typeof n > "u" || n === null) return o(/* @__PURE__ */ new Error("marked(): input parameter is undefined or null"));
					if (typeof n != "string") return o(/* @__PURE__ */ new Error("marked(): input parameter is of type " + Object.prototype.toString.call(n) + ", string expected"));
					if (i.hooks && (i.hooks.options = i, i.hooks.block = e), i.async) return (async () => {
						let u = i.hooks ? await i.hooks.preprocess(n) : n, p = await (i.hooks ? await i.hooks.provideLexer(e) : e ? x.lex : x.lexInline)(u, i), c = i.hooks ? await i.hooks.processAllTokens(p) : p;
						i.walkTokens && await Promise.all(this.walkTokens(c, i.walkTokens));
						let d = await (i.hooks ? await i.hooks.provideParser(e) : e ? b.parse : b.parseInline)(c, i);
						return i.hooks ? await i.hooks.postprocess(d) : d;
					})().catch(o);
					try {
						i.hooks && (n = i.hooks.preprocess(n));
						let a = (i.hooks ? i.hooks.provideLexer(e) : e ? x.lex : x.lexInline)(n, i);
						i.hooks && (a = i.hooks.processAllTokens(a)), i.walkTokens && this.walkTokens(a, i.walkTokens);
						let c = (i.hooks ? i.hooks.provideParser(e) : e ? b.parse : b.parseInline)(a, i);
						return i.hooks && (c = i.hooks.postprocess(c)), c;
					} catch (u) {
						return o(u);
					}
				};
			}
			onError(e, t) {
				return (n) => {
					if (n.message += `
Please report this to https://github.com/markedjs/marked.`, e) {
						let s = "<p>An error occurred:</p><pre>" + T(n.message + "", !0) + "</pre>";
						return t ? Promise.resolve(s) : s;
					}
					if (t) return Promise.reject(n);
					throw n;
				};
			}
		};
		var M = new Z();
		function f(l, e) {
			return M.parse(l, e);
		}
		f.options = f.setOptions = function(l) {
			return M.setOptions(l), f.defaults = M.defaults, j(f.defaults), f;
		};
		f.getDefaults = A;
		f.defaults = R;
		function dt(...l) {
			return M.use(...l), f.defaults = M.defaults, j(f.defaults), f;
		}
		f.use = dt;
		f.walkTokens = function(l, e) {
			return M.walkTokens(l, e);
		};
		f.parseInline = M.parseInline;
		f.Parser = b;
		f.parser = b.parse;
		f.Renderer = P;
		f.TextRenderer = L;
		f.Lexer = x;
		f.lexer = x.lex;
		f.Tokenizer = y;
		f.Hooks = S;
		f.parse = f;
		f.options;
		f.setOptions;
		f.walkTokens;
		f.parseInline;
		b.parse;
		x.lex;
		//#endregion
		//#region lib/types/client/editor/MarkdownPreview.js
		/**
		* Markdown preview using `marked`.
		*/
		/**
		* Render markdown source as HTML inside a scrollable pane.
		*/
		function MarkdownPreview(props) {
			const html = (0, react.useMemo)(() => {
				try {
					return f.parse(props.content, { async: false });
				} catch (error) {
					return `<pre>${escapeHtml(error instanceof Error ? error.message : "preview failed")}</pre>`;
				}
			}, [props.content]);
			return (0, react_jsx_runtime.jsx)("div", {
				className: editor_module_css_default.preview,
				"data-file-explorer-preview": "",
				dangerouslySetInnerHTML: { __html: html }
			});
		}
		function escapeHtml(text) {
			return text.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
		}
		//#endregion
		//#region lib/types/client/editor/EditorSurface.js
		/**
		* Center-column editor: tabs + Monaco/textarea + markdown preview.
		*/
		const appearanceStore = new EditorAppearanceStore();
		/**
		* Multi-tab editor surface bound to explorer RPC + local stores.
		*/
		function EditorSurface(props) {
			const { ctx, api, tabs, buffers, mdModes } = props;
			const t = useExplorerT(ctx);
			const tabState = (0, react.useSyncExternalStore)(tabs.subscribe, tabs.getSnapshot);
			(0, react.useSyncExternalStore)(buffers.subscribe, () => buffers.get(tabState.activePath ?? "")?.content ?? "");
			(0, react.useSyncExternalStore)(mdModes.subscribe, () => tabState.activePath === null ? "source" : mdModes.get(tabState.activePath));
			const appearance = (0, react.useSyncExternalStore)(appearanceStore.subscribe, appearanceStore.getSnapshot);
			const [error, setError] = (0, react.useState)(null);
			const [status, setStatus] = (0, react.useState)("");
			const [monacoReady, setMonacoReady] = (0, react.useState)(false);
			const [monacoFailed, setMonacoFailed] = (0, react.useState)(false);
			const [appearanceOpen, setAppearanceOpen] = (0, react.useState)(false);
			const hostRef = (0, react.useRef)(null);
			const editorRef = (0, react.useRef)(null);
			const applyingExternal = (0, react.useRef)(false);
			const activePath = tabState.activePath;
			const buffer = activePath === null ? void 0 : buffers.get(activePath);
			const mdMode = activePath !== null && isMarkdownPath(activePath) ? mdModes.get(activePath) : "source";
			(0, react.useLayoutEffect)(() => {
				appearanceStore.hydrate();
			}, []);
			const openPath = (0, react.useCallback)(async (path) => {
				tabs.open(path);
				if (buffers.get(path) !== void 0) return;
				const result = await api.read(path);
				if (!result.ok) {
					setError(result.error.message);
					tabs.close(path);
					return;
				}
				setError(null);
				buffers.load(path, result.value.content);
			}, [
				api,
				buffers,
				tabs
			]);
			(0, react.useEffect)(() => {
				const handler = (event) => {
					const detail = event.detail;
					if (detail?.path) openPath(detail.path);
				};
				window.addEventListener("file-explorer:open", handler);
				return () => window.removeEventListener("file-explorer:open", handler);
			}, [openPath]);
			const saveActive = (0, react.useCallback)(async () => {
				if (activePath === null) return;
				const entry = buffers.get(activePath);
				if (entry === void 0) return;
				const result = await api.write(activePath, entry.content);
				if (!result.ok) {
					setError(result.error.message);
					return;
				}
				buffers.markSaved(activePath);
				setError(null);
				setStatus(t("editorSaved"));
				window.setTimeout(() => setStatus(""), 1200);
			}, [
				activePath,
				api,
				buffers,
				t
			]);
			(0, react.useEffect)(() => {
				const onKey = (event) => {
					if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "s") {
						event.preventDefault();
						saveActive();
					}
				};
				window.addEventListener("keydown", onKey);
				return () => window.removeEventListener("keydown", onKey);
			}, [saveActive]);
			(0, react.useEffect)(() => {
				let cancelled = false;
				loadMonaco().then(() => {
					if (!cancelled) setMonacoReady(true);
				}).catch(() => {
					if (!cancelled) setMonacoFailed(true);
				});
				return () => {
					cancelled = true;
				};
			}, []);
			(0, react.useEffect)(() => {
				if (!monacoReady || monacoFailed || hostRef.current === null || activePath === null) {
					editorRef.current?.dispose();
					editorRef.current = null;
					return;
				}
				if (mdMode === "preview") {
					editorRef.current?.dispose();
					editorRef.current = null;
					return;
				}
				let disposed = false;
				const snap = appearanceStore.getSnapshot();
				loadMonaco().then((monaco) => {
					if (disposed || hostRef.current === null) return;
					editorRef.current?.dispose();
					const content = buffers.get(activePath)?.content ?? "";
					applyMonacoAppearance(monaco, snap);
					const editor = monaco.editor.create(hostRef.current, {
						value: content,
						language: languageForPath(activePath),
						automaticLayout: true,
						minimap: { enabled: false },
						fontSize: snap.fontSize,
						theme: snap.customBackground === null ? snap.theme : EDITOR_CUSTOM_THEME_ID,
						scrollBeyondLastLine: false
					});
					editorRef.current = editor;
					editor.onDidChangeModelContent(() => {
						if (applyingExternal.current) return;
						buffers.setContent(activePath, editor.getValue());
					});
				});
				return () => {
					disposed = true;
					editorRef.current?.dispose();
					editorRef.current = null;
				};
			}, [
				monacoReady,
				monacoFailed,
				activePath,
				mdMode,
				buffers
			]);
			(0, react.useEffect)(() => {
				if (!monacoReady || monacoFailed) return;
				loadMonaco().then((monaco) => {
					applyMonacoAppearance(monaco, appearance);
					editorRef.current?.updateOptions({ fontSize: appearance.fontSize });
				});
			}, [
				appearance.theme,
				appearance.customBackground,
				appearance.fontSize,
				monacoReady,
				monacoFailed
			]);
			(0, react.useEffect)(() => {
				if (activePath === null || editorRef.current === null) return;
				const next = buffers.get(activePath)?.content ?? "";
				if (editorRef.current.getValue() === next) return;
				applyingExternal.current = true;
				try {
					editorRef.current.setValue(next);
				} finally {
					applyingExternal.current = false;
				}
			}, [
				activePath,
				buffer?.content,
				buffers
			]);
			const dropTab = (0, react.useCallback)((path) => {
				tabs.close(path);
				buffers.drop(path);
				mdModes.drop(path);
			}, [
				buffers,
				mdModes,
				tabs
			]);
			const onClose = (0, react.useCallback)((path) => {
				if (buffers.isDirty(path)) {
					if (!window.confirm(t("confirmCloseDirty"))) return;
				}
				dropTab(path);
			}, [
				buffers,
				dropTab,
				t
			]);
			const onClosePaths = (0, react.useCallback)((paths) => {
				if (paths.length === 0) return;
				if (paths.some((path) => buffers.isDirty(path)) && !window.confirm(t("confirmCloseDirty"))) return;
				for (const path of paths) dropTab(path);
			}, [
				buffers,
				dropTab,
				t
			]);
			if (tabState.open.length === 0 || activePath === null) return (0, react_jsx_runtime.jsx)("div", {
				className: editor_module_css_default.surface,
				"data-file-explorer-editor": "",
				children: (0, react_jsx_runtime.jsx)("div", {
					className: editor_module_css_default.empty,
					children: t("editorEmpty")
				})
			});
			return (0, react_jsx_runtime.jsxs)("div", {
				className: editor_module_css_default.surface,
				"data-file-explorer-editor": "",
				children: [
					(0, react_jsx_runtime.jsx)(TabStrip, {
						tabs: tabState.open,
						activePath,
						buffers,
						t,
						onActivate: (path) => tabs.activate(path),
						onClose,
						onClosePaths
					}),
					error !== null ? (0, react_jsx_runtime.jsx)("div", {
						className: editor_module_css_default.errorBanner,
						children: error
					}) : null,
					(0, react_jsx_runtime.jsxs)("div", {
						className: editor_module_css_default.toolbar,
						children: [
							(0, react_jsx_runtime.jsx)("button", {
								type: "button",
								className: editor_module_css_default.toolBtn,
								onClick: () => void saveActive(),
								children: t("editorSave")
							}),
							isMarkdownPath(activePath) ? (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [(0, react_jsx_runtime.jsx)("button", {
								type: "button",
								className: mdMode === "source" ? `${editor_module_css_default.toolBtn} ${editor_module_css_default.toolBtnActive}` : editor_module_css_default.toolBtn,
								onClick: () => mdModes.set(activePath, "source"),
								children: t("editorSource")
							}), (0, react_jsx_runtime.jsx)("button", {
								type: "button",
								className: mdMode === "preview" ? `${editor_module_css_default.toolBtn} ${editor_module_css_default.toolBtnActive}` : editor_module_css_default.toolBtn,
								onClick: () => mdModes.set(activePath, "preview"),
								children: t("editorPreview")
							})] }) : null,
							(0, react_jsx_runtime.jsx)("span", {
								className: editor_module_css_default.status,
								children: status || (monacoFailed ? t("editorTextareaMode") : "")
							}),
							(0, react_jsx_runtime.jsxs)("div", {
								className: editor_module_css_default.toolbarEnd,
								children: [(0, react_jsx_runtime.jsx)("button", {
									type: "button",
									className: appearanceOpen ? `${editor_module_css_default.toolBtn} ${editor_module_css_default.toolBtnActive}` : editor_module_css_default.toolBtn,
									"aria-expanded": appearanceOpen,
									"aria-haspopup": "dialog",
									onClick: () => setAppearanceOpen((open) => !open),
									children: t("editorAppearance")
								}), appearanceOpen ? (0, react_jsx_runtime.jsx)(AppearanceMenu, {
									t,
									appearance,
									store: appearanceStore,
									onClose: () => setAppearanceOpen(false)
								}) : null]
							})
						]
					}),
					(0, react_jsx_runtime.jsx)("div", {
						className: editor_module_css_default.pathBar,
						title: activePath,
						"aria-label": t("editorFilePath"),
						children: activePath
					}),
					(0, react_jsx_runtime.jsx)("div", {
						className: editor_module_css_default.body,
						children: mdMode === "preview" ? (0, react_jsx_runtime.jsx)(MarkdownPreview, { content: buffer?.content ?? "" }) : monacoReady && !monacoFailed ? (0, react_jsx_runtime.jsx)("div", {
							className: editor_module_css_default.monacoHost,
							ref: hostRef
						}) : (0, react_jsx_runtime.jsx)("textarea", {
							className: editor_module_css_default.textarea,
							style: {
								fontSize: appearance.fontSize,
								...appearance.customBackground !== null ? { background: appearance.customBackground } : {}
							},
							value: buffer?.content ?? "",
							onChange: (event) => buffers.setContent(activePath, event.target.value),
							spellCheck: false
						})
					})
				]
			});
		}
		/** Dispatch a cross-component open request. */
		function requestOpenPath(path) {
			window.dispatchEvent(new CustomEvent("file-explorer:open", { detail: { path } }));
		}
		//#endregion
		//#region \0dsh-css:/Users/hivanpan/Hivan/project/ykl/project/Whale/whale-harness-free/plugins/packages/ui/dsh-plugin-file-explorer/src/client/settings/settings-card.module.css.mjs
		const css$1 = ".yVXJpq_card{border:1px solid var(--dsw-alias-border-l2);background:var(--dsw-alias-bg-layer-3);border-radius:12px;list-style:none;transition:border-color .16s,background .16s}.yVXJpq_card:hover{border-color:var(--dsw-alias-label-dimmed)}.yVXJpq_cardOpen{background:var(--dsw-alias-bg-layer-2);border-color:var(--dsw-alias-label-dimmed)}.yVXJpq_header{appearance:none;width:100%;font:inherit;color:inherit;text-align:left;cursor:pointer;background:0 0;border:0;border-radius:12px;align-items:center;gap:12px;padding:14px 16px;display:flex}.yVXJpq_header:focus-visible{outline:2px solid var(--dsw-alias-brand-primary);outline-offset:-2px}.yVXJpq_headText{flex-direction:column;flex:1;gap:4px;min-width:0;display:flex}.yVXJpq_name{color:var(--dsw-alias-label-primary);font-size:15px;font-weight:600;line-height:1.4}.yVXJpq_description{color:var(--dsw-alias-label-tertiary);font-size:13px;line-height:1.5}.yVXJpq_chevron{color:var(--dsw-alias-label-tertiary);flex:none;transition:transform .16s}.yVXJpq_chevronOpen{transform:rotate(180deg)}.yVXJpq_body{border-top:1px solid var(--dsw-alias-border-l2);margin:0 16px;padding-bottom:8px}.yVXJpq_readOnly{color:var(--dsw-alias-label-tertiary);margin:12px 0 0;font-size:12px;line-height:1.5}.yVXJpq_field{flex-direction:column;gap:6px;padding:12px 0;display:flex}.yVXJpq_field+.yVXJpq_field{border-top:1px solid var(--dsw-alias-border-l2)}.yVXJpq_row{cursor:pointer;color:var(--dsw-alias-label-primary);align-items:center;gap:8px;font-size:13px;font-weight:500;line-height:1.5;display:flex}.yVXJpq_rowDisabled{cursor:not-allowed;opacity:.55}.yVXJpq_checkbox{width:14px;height:14px;accent-color:var(--dsw-alias-brand-primary);flex:none;margin:0}.yVXJpq_textInput{box-sizing:border-box;border:1px solid var(--dsw-alias-border-l2);background:var(--dsw-alias-bg-layer-1);width:100%;color:var(--dsw-alias-label-primary);font:inherit;border-radius:8px;padding:8px 10px;font-size:13px}.yVXJpq_hint{color:var(--dsw-alias-label-tertiary);margin:0;font-size:12px;line-height:1.5}.yVXJpq_label{color:var(--dsw-alias-label-primary);font-size:13px;font-weight:500}";
		const tagId$1 = "@supanexus/dsh-plugin-file-explorer/settings-card.module.css";
		if (typeof document !== "undefined" && document.querySelector("style[data-plugin-css=" + JSON.stringify(tagId$1) + "]") === null) {
			const tag = document.createElement("style");
			tag.dataset.plugin = "@supanexus/dsh-plugin-file-explorer";
			tag.dataset.pluginCss = tagId$1;
			tag.textContent = css$1;
			document.head.appendChild(tag);
		}
		var settings_card_module_css_default = {
			"body": "yVXJpq_body",
			"card": "yVXJpq_card",
			"cardOpen": "yVXJpq_cardOpen",
			"checkbox": "yVXJpq_checkbox",
			"chevron": "yVXJpq_chevron",
			"chevronOpen": "yVXJpq_chevronOpen",
			"description": "yVXJpq_description",
			"field": "yVXJpq_field",
			"headText": "yVXJpq_headText",
			"header": "yVXJpq_header",
			"hint": "yVXJpq_hint",
			"label": "yVXJpq_label",
			"name": "yVXJpq_name",
			"readOnly": "yVXJpq_readOnly",
			"row": "yVXJpq_row",
			"rowDisabled": "yVXJpq_rowDisabled",
			"textInput": "yVXJpq_textInput"
		};
		//#endregion
		//#region lib/types/client/settings/ExplorerSettingsCard.js
		/**
		* Plugins page contribution for file explorer preferences.
		*/
		/** Summary one-liner or settings form body for the Plugins page. */
		function ExplorerSettingsCard(props) {
			const { ctx, scope, view, t: slotT } = props;
			const snap = (0, react.useSyncExternalStore)(scope.subscribe, () => scope.getSnapshot());
			const t = explorerT((0, react.useSyncExternalStore)((listener) => ctx.locale.subscribe(listener), () => ctx.locale.getSnapshot().active));
			const [draftRoot, setDraftRoot] = (0, react.useState)(null);
			const [saving, setSaving] = (0, react.useState)(false);
			if (view === "summary") return slotT("settingsDescription");
			const available = snap.status === "ready";
			const writable = snap.writable;
			const value = snap.value;
			if (!available || value === void 0) return null;
			const rootValue = draftRoot ?? value.root;
			const openLinks = value.openLinksInEditor;
			const commitRoot = (0, react.useCallback)(async () => {
				if (!writable || saving || draftRoot === null) return;
				setSaving(true);
				try {
					await scope.set("root", draftRoot);
					setDraftRoot(null);
				} finally {
					setSaving(false);
				}
			}, [
				draftRoot,
				saving,
				scope,
				writable
			]);
			const toggleLinks = (0, react.useCallback)(async (checked) => {
				if (!writable || saving) return;
				setSaving(true);
				try {
					await scope.set("openLinksInEditor", checked);
				} finally {
					setSaving(false);
				}
			}, [
				saving,
				scope,
				writable
			]);
			return (0, react_jsx_runtime.jsxs)("div", {
				className: settings_card_module_css_default.body,
				children: [
					!writable ? (0, react_jsx_runtime.jsx)("p", {
						className: settings_card_module_css_default.readOnly,
						role: "status",
						children: t("readOnly")
					}) : null,
					(0, react_jsx_runtime.jsxs)("div", {
						className: settings_card_module_css_default.field,
						children: [
							(0, react_jsx_runtime.jsx)("label", {
								className: settings_card_module_css_default.label,
								htmlFor: "fe-root",
								children: t("settingsRoot")
							}),
							(0, react_jsx_runtime.jsx)("input", {
								id: "fe-root",
								className: settings_card_module_css_default.textInput,
								value: rootValue,
								disabled: !writable || saving,
								onChange: (event) => setDraftRoot(event.target.value),
								onBlur: () => {
									commitRoot();
								},
								onKeyDown: (event) => {
									if (event.key === "Enter") commitRoot();
								}
							}),
							(0, react_jsx_runtime.jsx)("p", {
								className: settings_card_module_css_default.hint,
								children: t("settingsRootHint")
							})
						]
					}),
					(0, react_jsx_runtime.jsxs)("div", {
						className: settings_card_module_css_default.field,
						children: [(0, react_jsx_runtime.jsxs)("label", {
							className: writable ? settings_card_module_css_default.row : `${settings_card_module_css_default.row} ${settings_card_module_css_default.rowDisabled}`,
							children: [(0, react_jsx_runtime.jsx)("input", {
								className: settings_card_module_css_default.checkbox,
								type: "checkbox",
								checked: openLinks,
								disabled: !writable || saving,
								onChange: (event) => {
									toggleLinks(event.target.checked);
								}
							}), (0, react_jsx_runtime.jsx)("span", { children: t("settingsOpenLinks") })]
						}), (0, react_jsx_runtime.jsx)("p", {
							className: settings_card_module_css_default.hint,
							children: t("settingsOpenLinksHint")
						})]
					})
				]
			});
		}
		//#endregion
		//#region lib/types/client/open-links.js
		/**
		* Capture clicks on conversation file-looking links and open them in the editor.
		*/
		const ABS_PATH = /^(?:\/|[A-Za-z]:[\\/])/;
		const REL_PATH = /^\.\.?[\\/]/;
		function candidateFromAnchor(anchor) {
			const dataPath = anchor.getAttribute("data-path") ?? anchor.getAttribute("data-filepath");
			if (dataPath !== null && dataPath.trim() !== "") return dataPath.trim();
			const href = anchor.getAttribute("href");
			if (href === null || href === "" || href.startsWith("#") || href.startsWith("mailto:")) return null;
			if (href.startsWith("file:")) try {
				return decodeURIComponent(href.replace(/^file:\/\//, "").replace(/^\/([A-Za-z]:)/, "$1"));
			} catch {
				return null;
			}
			if (ABS_PATH.test(href) || REL_PATH.test(href)) return href;
			if (!href.includes("://") && href.includes("/") && !href.startsWith("//")) return href;
			return null;
		}
		/**
		* Install a capture-phase click interceptor while settings allow it.
		* @returns disposer.
		*/
		function installOpenLinksInterceptor(scope) {
			const onClick = (event) => {
				const snap = scope.getSnapshot();
				if (snap.status !== "ready" || snap.value?.openLinksInEditor !== true) return;
				const target = event.target;
				if (!(target instanceof Element)) return;
				const anchor = target.closest("a");
				if (!(anchor instanceof HTMLAnchorElement)) return;
				const path = candidateFromAnchor(anchor);
				if (path === null) return;
				event.preventDefault();
				event.stopPropagation();
				requestOpenPath((ABS_PATH.test(path) ? path.replace(/^\/+/, "").replace(/^[A-Za-z]:[\\/]/, "") : path.replace(/^\.\//, "")).replaceAll("\\", "/"));
				window.dispatchEvent(new CustomEvent("file-explorer:focus-view"));
			};
			document.addEventListener("click", onClick, true);
			return () => document.removeEventListener("click", onClick, true);
		}
		//#endregion
		//#region lib/types/client/session-pin.js
		/**
		* Pin explorer root to the current session cwd when available.
		*/
		/**
		* Keep host root aligned with session cwd while explorer mode is on.
		* Re-syncs when the session changes or when mode turns on.
		*
		* Navigation lives on `uiSession.adapter.current` (SessionList no longer
		* exposes `.current` after the Controller / ui-session split).
		* @returns disposer.
		*/
		function installSessionRootPin(ctx, api, mode) {
			const sessions = ctx.get("sessions");
			const uiSession = ctx.get("uiSession");
			if (sessions === void 0 || uiSession === void 0) return () => {};
			let pinnedCwd;
			const sync = () => {
				if (!mode.getSnapshot()) return;
				const current = uiSession.adapter.current.getSnapshot().key;
				if (current === void 0) return;
				const cwd = sessions.list.getSnapshot().byId[current]?.cwd;
				if (cwd === void 0 || cwd.trim() === "") return;
				if (cwd === pinnedCwd) return;
				api.setRoot(cwd).then((result) => {
					if (!result.ok) return;
					pinnedCwd = cwd;
					notifyRootPinned();
				});
			};
			sync();
			const unsubBinding = uiSession.adapter.current.subscribe(sync);
			const unsubSessions = sessions.list.subscribe(sync);
			const unsubMode = mode.subscribe(() => {
				sync();
			});
			return () => {
				unsubBinding();
				unsubSessions();
				unsubMode();
			};
		}
		//#endregion
		//#region \0dsh-css:/Users/hivanpan/Hivan/project/ykl/project/Whale/whale-harness-free/plugins/packages/ui/dsh-plugin-file-explorer/src/client/files-view.module.css.mjs
		const css = "._5j-Hiq_shell{width:100%;height:100%;min-height:0;position:relative;overflow:hidden}._5j-Hiq_filesView{box-sizing:border-box;background:var(--dsw-alias-bg-layer-1);width:100%;min-height:0;color:var(--dsw-alias-label-primary);display:flex;position:absolute;inset:0;overflow:hidden}._5j-Hiq_treeCol{border-right:1px solid var(--dsw-alias-border-l2);background:var(--dsw-alias-bg-layer-2);flex-shrink:0;min-width:160px;max-width:70%;min-height:0;position:relative;overflow:hidden}._5j-Hiq_treeResize{z-index:2;cursor:col-resize;touch-action:none;width:6px;height:100%;position:absolute;top:0;right:-3px}._5j-Hiq_treeResize:hover,._5j-Hiq_treeResize:active{background:color-mix(in srgb,var(--dsw-alias-brand-primary,#4c8bf5)35%,transparent)}._5j-Hiq_editorCol{flex-direction:column;flex:1;min-width:0;min-height:0;display:flex;overflow:hidden}._5j-Hiq_crash{color:var(--dsw-alias-label-danger,#c62828);padding:16px;font-size:13px}";
		const tagId = "@supanexus/dsh-plugin-file-explorer/files-view.module.css";
		if (typeof document !== "undefined" && document.querySelector("style[data-plugin-css=" + JSON.stringify(tagId) + "]") === null) {
			const tag = document.createElement("style");
			tag.dataset.plugin = "@supanexus/dsh-plugin-file-explorer";
			tag.dataset.pluginCss = tagId;
			tag.textContent = css;
			document.head.appendChild(tag);
		}
		var files_view_module_css_default = {
			"crash": "_5j-Hiq_crash",
			"editorCol": "_5j-Hiq_editorCol",
			"filesView": "_5j-Hiq_filesView",
			"shell": "_5j-Hiq_shell",
			"treeCol": "_5j-Hiq_treeCol",
			"treeResize": "_5j-Hiq_treeResize"
		};
		//#endregion
		//#region lib/types/client/index.js
		/**
		* Client half: Files tab fills the conversation viewArea (composer-overlay
		* contract) with a center tree | editor split. Left sidebar stays the
		* official workspace / conversation list (no sidebar.workspaces shadow).
		*/
		const PACKAGE = "@supanexus/dsh-plugin-file-explorer";
		const VIEW_ID = "file-explorer";
		/** Required client services before apply runs. */
		const inject = [
			"slots",
			"remote",
			"locale",
			"connection",
			"configForms"
		];
		/**
		* Mount remotes and register UI slots.
		* @param ctx - Client root context.
		*/
		async function apply(ctx) {
			const disposeRemote = await ctx.remote.$mount(TYPERT_REMOTE);
			ctx.effect(() => disposeRemote, "supanexus-file-explorer: remote");
			ctx.effect(() => ctx.locale.register(NS, dictionaries), "supanexus-file-explorer: dictionaries");
			const settings = ctx.configForms.get(FILE_EXPLORER_SETTINGS_NS);
			const tabs = new TabsStore();
			const buffers = new BuffersStore();
			const mdModes = new MdModeStore();
			const mode = new ExplorerModeStore();
			ctx.inject(["remote.explorerFs"], (remoteCtx) => {
				const api = createExplorerApi(remoteCtx);
				remoteCtx.effect(() => installOpenLinksInterceptor(settings), "supanexus-file-explorer: open-links");
				remoteCtx.inject(["sessions", "uiSession"], (sessionCtx) => {
					sessionCtx.effect(() => installSessionRootPin(sessionCtx, api, mode), "supanexus-file-explorer: session-pin");
				});
				remoteCtx.effect(() => {
					let disposeComposer;
					const syncComposer = () => {
						const enabled = mode.getSnapshot();
						if (disposeComposer !== void 0) {
							try {
								disposeComposer();
							} catch (error) {
								console.error("[file-explorer] composer dispose failed", error);
							}
							disposeComposer = void 0;
						}
						if (!enabled) return;
						try {
							disposeComposer = remoteCtx.effect(() => remoteCtx.slots.register({
								name: "conversation.composer",
								priority: 50,
								registrant: PACKAGE,
								select: () => ({ hide: true })
							}, () => null), "supanexus-file-explorer: composer-hide");
						} catch (error) {
							console.error("[file-explorer] conversation.composer register failed", error);
						}
					};
					syncComposer();
					const unsub = mode.subscribe(syncComposer);
					return () => {
						unsub();
						if (disposeComposer !== void 0) {
							try {
								disposeComposer();
							} catch {}
							disposeComposer = void 0;
						}
					};
				}, "supanexus-file-explorer: mode→composer");
				remoteCtx.slots.inject("conversation.view", () => remoteCtx.slots.register({
					name: "conversation.view",
					id: VIEW_ID,
					order: 40,
					locale: NS,
					label: () => explorerT(remoteCtx.locale.getSnapshot().active)("viewLabel"),
					registrant: PACKAGE
				}, () => (0, react_jsx_runtime.jsx)(FilesView, {
					ctx: remoteCtx,
					mode,
					api,
					tabs,
					buffers,
					mdModes
				})));
				const t = remoteCtx.locale.bind(NS);
				remoteCtx.effect(() => remoteCtx.configForms.whileServed([FILE_EXPLORER_SETTINGS_NS], () => remoteCtx.slots.inject("plugins.item", () => remoteCtx.slots.register({
					name: "plugins.item",
					id: "file-explorer",
					order: 45,
					label: () => t("settingsTitle"),
					locale: NS,
					registrant: PACKAGE
				}, (props) => (0, react_jsx_runtime.jsx)(ExplorerSettingsCard, {
					ctx: remoteCtx,
					scope: settings,
					...props
				})))), "supanexus-file-explorer: plugins.item");
			});
		}
		var FilesViewBoundary = class extends react.Component {
			state = { message: null };
			static getDerivedStateFromError(error) {
				return { message: error.message };
			}
			componentDidCatch(error, info) {
				console.error("[file-explorer] FilesView crash", error, info);
			}
			render() {
				if (this.state.message !== null) return (0, react_jsx_runtime.jsx)("div", {
					className: files_view_module_css_default.shell,
					"data-file-explorer-view": "",
					"data-conversation-composer-overlay": "",
					children: (0, react_jsx_runtime.jsx)("div", {
						className: files_view_module_css_default.crash,
						children: this.state.message
					})
				});
				return this.props.children;
			}
		};
		const TREE_WIDTH_KEY = "supanexus-file-explorer:tree-width";
		const TREE_WIDTH_DEFAULT = 280;
		const TREE_WIDTH_MIN = 160;
		const TREE_WIDTH_MAX = 720;
		function readTreeWidth() {
			try {
				const raw = window.localStorage.getItem(TREE_WIDTH_KEY);
				if (raw === null) return TREE_WIDTH_DEFAULT;
				const n = Number(raw);
				if (!Number.isFinite(n)) return TREE_WIDTH_DEFAULT;
				return Math.min(TREE_WIDTH_MAX, Math.max(TREE_WIDTH_MIN, Math.round(n)));
			} catch {
				return TREE_WIDTH_DEFAULT;
			}
		}
		/**
		* Files conversation view. The root MUST carry
		* `data-conversation-composer-overlay` so ConversationRoot stretches
		* `.viewArea`; without it the pane collapses to zero height.
		*/
		function FilesView(props) {
			const { ctx, mode, api, tabs, buffers, mdModes } = props;
			const t = useExplorerT(ctx);
			const [treeWidth, setTreeWidth] = (0, react.useState)(TREE_WIDTH_DEFAULT);
			const dragRef = (0, react.useRef)(null);
			(0, react.useLayoutEffect)(() => {
				setTreeWidth(readTreeWidth());
			}, []);
			(0, react.useLayoutEffect)(() => {
				mode.setEnabled(true);
				return () => {
					mode.setEnabled(false);
				};
			}, [mode]);
			const onResizePointerDown = (0, react.useCallback)((event) => {
				event.preventDefault();
				event.currentTarget.setPointerCapture(event.pointerId);
				dragRef.current = {
					startX: event.clientX,
					startWidth: treeWidth
				};
			}, [treeWidth]);
			const onResizePointerMove = (0, react.useCallback)((event) => {
				const drag = dragRef.current;
				if (drag === null) return;
				const next = Math.min(TREE_WIDTH_MAX, Math.max(TREE_WIDTH_MIN, drag.startWidth + (event.clientX - drag.startX)));
				setTreeWidth(next);
			}, []);
			const onResizePointerUp = (0, react.useCallback)((event) => {
				if (dragRef.current === null) return;
				dragRef.current = null;
				try {
					event.currentTarget.releasePointerCapture(event.pointerId);
				} catch {}
				setTreeWidth((width) => {
					try {
						window.localStorage.setItem(TREE_WIDTH_KEY, String(width));
					} catch {}
					return width;
				});
			}, []);
			return (0, react_jsx_runtime.jsx)(FilesViewBoundary, { children: (0, react_jsx_runtime.jsx)("div", {
				className: files_view_module_css_default.shell,
				"data-file-explorer-view": "",
				"data-conversation-composer-overlay": "",
				children: (0, react_jsx_runtime.jsxs)("div", {
					className: files_view_module_css_default.filesView,
					children: [(0, react_jsx_runtime.jsxs)("aside", {
						className: files_view_module_css_default.treeCol,
						style: { width: treeWidth },
						"aria-label": t("treeAriaLabel"),
						children: [(0, react_jsx_runtime.jsx)(ExplorerPanel, {
							ctx,
							api,
							tabs,
							onOpenFile: (path) => {
								requestOpenPath(path);
							}
						}), (0, react_jsx_runtime.jsx)("div", {
							className: files_view_module_css_default.treeResize,
							role: "separator",
							"aria-orientation": "vertical",
							"aria-valuenow": treeWidth,
							"aria-valuemin": TREE_WIDTH_MIN,
							"aria-valuemax": TREE_WIDTH_MAX,
							onPointerDown: onResizePointerDown,
							onPointerMove: onResizePointerMove,
							onPointerUp: onResizePointerUp,
							onPointerCancel: onResizePointerUp
						})]
					}), (0, react_jsx_runtime.jsx)("div", {
						className: files_view_module_css_default.editorCol,
						children: (0, react_jsx_runtime.jsx)(EditorSurface, {
							ctx,
							api,
							tabs,
							buffers,
							mdModes
						})
					})]
				})
			}) });
		}
		//#endregion
		exports.VIEW_ID = VIEW_ID;
		exports.apply = apply;
		exports.inject = inject;
		return module.exports;
	}
});

//# sourceMappingURL=client.js.map