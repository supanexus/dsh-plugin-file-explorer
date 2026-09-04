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
		/** Must match Host settingsNamespace pattern /^[a-z][a-z0-9-]*$/. */
		const FILE_EXPLORER_SETTINGS_NS = "file-explorer";
		//#endregion
		//#region ../../../node_modules/.pnpm/zod@3.25.76/node_modules/zod/v3/helpers/util.js
		var util;
		(function(util) {
			util.assertEqual = (_) => {};
			function assertIs(_arg) {}
			util.assertIs = assertIs;
			function assertNever(_x) {
				throw new Error();
			}
			util.assertNever = assertNever;
			util.arrayToEnum = (items) => {
				const obj = {};
				for (const item of items) obj[item] = item;
				return obj;
			};
			util.getValidEnumValues = (obj) => {
				const validKeys = util.objectKeys(obj).filter((k) => typeof obj[obj[k]] !== "number");
				const filtered = {};
				for (const k of validKeys) filtered[k] = obj[k];
				return util.objectValues(filtered);
			};
			util.objectValues = (obj) => {
				return util.objectKeys(obj).map(function(e) {
					return obj[e];
				});
			};
			util.objectKeys = typeof Object.keys === "function" ? (obj) => Object.keys(obj) : (object) => {
				const keys = [];
				for (const key in object) if (Object.prototype.hasOwnProperty.call(object, key)) keys.push(key);
				return keys;
			};
			util.find = (arr, checker) => {
				for (const item of arr) if (checker(item)) return item;
			};
			util.isInteger = typeof Number.isInteger === "function" ? (val) => Number.isInteger(val) : (val) => typeof val === "number" && Number.isFinite(val) && Math.floor(val) === val;
			function joinValues(array, separator = " | ") {
				return array.map((val) => typeof val === "string" ? `'${val}'` : val).join(separator);
			}
			util.joinValues = joinValues;
			util.jsonStringifyReplacer = (_, value) => {
				if (typeof value === "bigint") return value.toString();
				return value;
			};
		})(util || (util = {}));
		var objectUtil;
		(function(objectUtil) {
			objectUtil.mergeShapes = (first, second) => {
				return {
					...first,
					...second
				};
			};
		})(objectUtil || (objectUtil = {}));
		const ZodParsedType = util.arrayToEnum([
			"string",
			"nan",
			"number",
			"integer",
			"float",
			"boolean",
			"date",
			"bigint",
			"symbol",
			"function",
			"undefined",
			"null",
			"array",
			"object",
			"unknown",
			"promise",
			"void",
			"never",
			"map",
			"set"
		]);
		const getParsedType = (data) => {
			switch (typeof data) {
				case "undefined": return ZodParsedType.undefined;
				case "string": return ZodParsedType.string;
				case "number": return Number.isNaN(data) ? ZodParsedType.nan : ZodParsedType.number;
				case "boolean": return ZodParsedType.boolean;
				case "function": return ZodParsedType.function;
				case "bigint": return ZodParsedType.bigint;
				case "symbol": return ZodParsedType.symbol;
				case "object":
					if (Array.isArray(data)) return ZodParsedType.array;
					if (data === null) return ZodParsedType.null;
					if (data.then && typeof data.then === "function" && data.catch && typeof data.catch === "function") return ZodParsedType.promise;
					if (typeof Map !== "undefined" && data instanceof Map) return ZodParsedType.map;
					if (typeof Set !== "undefined" && data instanceof Set) return ZodParsedType.set;
					if (typeof Date !== "undefined" && data instanceof Date) return ZodParsedType.date;
					return ZodParsedType.object;
				default: return ZodParsedType.unknown;
			}
		};
		//#endregion
		//#region ../../../node_modules/.pnpm/zod@3.25.76/node_modules/zod/v3/ZodError.js
		const ZodIssueCode = util.arrayToEnum([
			"invalid_type",
			"invalid_literal",
			"custom",
			"invalid_union",
			"invalid_union_discriminator",
			"invalid_enum_value",
			"unrecognized_keys",
			"invalid_arguments",
			"invalid_return_type",
			"invalid_date",
			"invalid_string",
			"too_small",
			"too_big",
			"invalid_intersection_types",
			"not_multiple_of",
			"not_finite"
		]);
		var ZodError = class ZodError extends Error {
			get errors() {
				return this.issues;
			}
			constructor(issues) {
				super();
				this.issues = [];
				this.addIssue = (sub) => {
					this.issues = [...this.issues, sub];
				};
				this.addIssues = (subs = []) => {
					this.issues = [...this.issues, ...subs];
				};
				const actualProto = new.target.prototype;
				if (Object.setPrototypeOf) Object.setPrototypeOf(this, actualProto);
				else this.__proto__ = actualProto;
				this.name = "ZodError";
				this.issues = issues;
			}
			format(_mapper) {
				const mapper = _mapper || function(issue) {
					return issue.message;
				};
				const fieldErrors = { _errors: [] };
				const processError = (error) => {
					for (const issue of error.issues) if (issue.code === "invalid_union") issue.unionErrors.map(processError);
					else if (issue.code === "invalid_return_type") processError(issue.returnTypeError);
					else if (issue.code === "invalid_arguments") processError(issue.argumentsError);
					else if (issue.path.length === 0) fieldErrors._errors.push(mapper(issue));
					else {
						let curr = fieldErrors;
						let i = 0;
						while (i < issue.path.length) {
							const el = issue.path[i];
							if (!(i === issue.path.length - 1)) curr[el] = curr[el] || { _errors: [] };
							else {
								curr[el] = curr[el] || { _errors: [] };
								curr[el]._errors.push(mapper(issue));
							}
							curr = curr[el];
							i++;
						}
					}
				};
				processError(this);
				return fieldErrors;
			}
			static assert(value) {
				if (!(value instanceof ZodError)) throw new Error(`Not a ZodError: ${value}`);
			}
			toString() {
				return this.message;
			}
			get message() {
				return JSON.stringify(this.issues, util.jsonStringifyReplacer, 2);
			}
			get isEmpty() {
				return this.issues.length === 0;
			}
			flatten(mapper = (issue) => issue.message) {
				const fieldErrors = {};
				const formErrors = [];
				for (const sub of this.issues) if (sub.path.length > 0) {
					const firstEl = sub.path[0];
					fieldErrors[firstEl] = fieldErrors[firstEl] || [];
					fieldErrors[firstEl].push(mapper(sub));
				} else formErrors.push(mapper(sub));
				return {
					formErrors,
					fieldErrors
				};
			}
			get formErrors() {
				return this.flatten();
			}
		};
		ZodError.create = (issues) => {
			return new ZodError(issues);
		};
		//#endregion
		//#region ../../../node_modules/.pnpm/zod@3.25.76/node_modules/zod/v3/locales/en.js
		const errorMap = (issue, _ctx) => {
			let message;
			switch (issue.code) {
				case ZodIssueCode.invalid_type:
					if (issue.received === ZodParsedType.undefined) message = "Required";
					else message = `Expected ${issue.expected}, received ${issue.received}`;
					break;
				case ZodIssueCode.invalid_literal:
					message = `Invalid literal value, expected ${JSON.stringify(issue.expected, util.jsonStringifyReplacer)}`;
					break;
				case ZodIssueCode.unrecognized_keys:
					message = `Unrecognized key(s) in object: ${util.joinValues(issue.keys, ", ")}`;
					break;
				case ZodIssueCode.invalid_union:
					message = `Invalid input`;
					break;
				case ZodIssueCode.invalid_union_discriminator:
					message = `Invalid discriminator value. Expected ${util.joinValues(issue.options)}`;
					break;
				case ZodIssueCode.invalid_enum_value:
					message = `Invalid enum value. Expected ${util.joinValues(issue.options)}, received '${issue.received}'`;
					break;
				case ZodIssueCode.invalid_arguments:
					message = `Invalid function arguments`;
					break;
				case ZodIssueCode.invalid_return_type:
					message = `Invalid function return type`;
					break;
				case ZodIssueCode.invalid_date:
					message = `Invalid date`;
					break;
				case ZodIssueCode.invalid_string:
					if (typeof issue.validation === "object") {
						if ("includes" in issue.validation) {
							message = `Invalid input: must include "${issue.validation.includes}"`;
							if (typeof issue.validation.position === "number") message = `${message} at one or more positions greater than or equal to ${issue.validation.position}`;
						} else if ("startsWith" in issue.validation) message = `Invalid input: must start with "${issue.validation.startsWith}"`;
						else if ("endsWith" in issue.validation) message = `Invalid input: must end with "${issue.validation.endsWith}"`;
						else util.assertNever(issue.validation);
					} else if (issue.validation !== "regex") message = `Invalid ${issue.validation}`;
					else message = "Invalid";
					break;
				case ZodIssueCode.too_small:
					if (issue.type === "array") message = `Array must contain ${issue.exact ? "exactly" : issue.inclusive ? `at least` : `more than`} ${issue.minimum} element(s)`;
					else if (issue.type === "string") message = `String must contain ${issue.exact ? "exactly" : issue.inclusive ? `at least` : `over`} ${issue.minimum} character(s)`;
					else if (issue.type === "number") message = `Number must be ${issue.exact ? `exactly equal to ` : issue.inclusive ? `greater than or equal to ` : `greater than `}${issue.minimum}`;
					else if (issue.type === "bigint") message = `Number must be ${issue.exact ? `exactly equal to ` : issue.inclusive ? `greater than or equal to ` : `greater than `}${issue.minimum}`;
					else if (issue.type === "date") message = `Date must be ${issue.exact ? `exactly equal to ` : issue.inclusive ? `greater than or equal to ` : `greater than `}${new Date(Number(issue.minimum))}`;
					else message = "Invalid input";
					break;
				case ZodIssueCode.too_big:
					if (issue.type === "array") message = `Array must contain ${issue.exact ? `exactly` : issue.inclusive ? `at most` : `less than`} ${issue.maximum} element(s)`;
					else if (issue.type === "string") message = `String must contain ${issue.exact ? `exactly` : issue.inclusive ? `at most` : `under`} ${issue.maximum} character(s)`;
					else if (issue.type === "number") message = `Number must be ${issue.exact ? `exactly` : issue.inclusive ? `less than or equal to` : `less than`} ${issue.maximum}`;
					else if (issue.type === "bigint") message = `BigInt must be ${issue.exact ? `exactly` : issue.inclusive ? `less than or equal to` : `less than`} ${issue.maximum}`;
					else if (issue.type === "date") message = `Date must be ${issue.exact ? `exactly` : issue.inclusive ? `smaller than or equal to` : `smaller than`} ${new Date(Number(issue.maximum))}`;
					else message = "Invalid input";
					break;
				case ZodIssueCode.custom:
					message = `Invalid input`;
					break;
				case ZodIssueCode.invalid_intersection_types:
					message = `Intersection results could not be merged`;
					break;
				case ZodIssueCode.not_multiple_of:
					message = `Number must be a multiple of ${issue.multipleOf}`;
					break;
				case ZodIssueCode.not_finite:
					message = "Number must be finite";
					break;
				default:
					message = _ctx.defaultError;
					util.assertNever(issue);
			}
			return { message };
		};
		//#endregion
		//#region ../../../node_modules/.pnpm/zod@3.25.76/node_modules/zod/v3/errors.js
		let overrideErrorMap = errorMap;
		function getErrorMap() {
			return overrideErrorMap;
		}
		//#endregion
		//#region ../../../node_modules/.pnpm/zod@3.25.76/node_modules/zod/v3/helpers/parseUtil.js
		const makeIssue = (params) => {
			const { data, path, errorMaps, issueData } = params;
			const fullPath = [...path, ...issueData.path || []];
			const fullIssue = {
				...issueData,
				path: fullPath
			};
			if (issueData.message !== void 0) return {
				...issueData,
				path: fullPath,
				message: issueData.message
			};
			let errorMessage = "";
			const maps = errorMaps.filter((m) => !!m).slice().reverse();
			for (const map of maps) errorMessage = map(fullIssue, {
				data,
				defaultError: errorMessage
			}).message;
			return {
				...issueData,
				path: fullPath,
				message: errorMessage
			};
		};
		function addIssueToContext(ctx, issueData) {
			const overrideMap = getErrorMap();
			const issue = makeIssue({
				issueData,
				data: ctx.data,
				path: ctx.path,
				errorMaps: [
					ctx.common.contextualErrorMap,
					ctx.schemaErrorMap,
					overrideMap,
					overrideMap === errorMap ? void 0 : errorMap
				].filter((x) => !!x)
			});
			ctx.common.issues.push(issue);
		}
		var ParseStatus = class ParseStatus {
			constructor() {
				this.value = "valid";
			}
			dirty() {
				if (this.value === "valid") this.value = "dirty";
			}
			abort() {
				if (this.value !== "aborted") this.value = "aborted";
			}
			static mergeArray(status, results) {
				const arrayValue = [];
				for (const s of results) {
					if (s.status === "aborted") return INVALID;
					if (s.status === "dirty") status.dirty();
					arrayValue.push(s.value);
				}
				return {
					status: status.value,
					value: arrayValue
				};
			}
			static async mergeObjectAsync(status, pairs) {
				const syncPairs = [];
				for (const pair of pairs) {
					const key = await pair.key;
					const value = await pair.value;
					syncPairs.push({
						key,
						value
					});
				}
				return ParseStatus.mergeObjectSync(status, syncPairs);
			}
			static mergeObjectSync(status, pairs) {
				const finalObject = {};
				for (const pair of pairs) {
					const { key, value } = pair;
					if (key.status === "aborted") return INVALID;
					if (value.status === "aborted") return INVALID;
					if (key.status === "dirty") status.dirty();
					if (value.status === "dirty") status.dirty();
					if (key.value !== "__proto__" && (typeof value.value !== "undefined" || pair.alwaysSet)) finalObject[key.value] = value.value;
				}
				return {
					status: status.value,
					value: finalObject
				};
			}
		};
		const INVALID = Object.freeze({ status: "aborted" });
		const DIRTY = (value) => ({
			status: "dirty",
			value
		});
		const OK = (value) => ({
			status: "valid",
			value
		});
		const isAborted = (x) => x.status === "aborted";
		const isDirty = (x) => x.status === "dirty";
		const isValid = (x) => x.status === "valid";
		const isAsync = (x) => typeof Promise !== "undefined" && x instanceof Promise;
		//#endregion
		//#region ../../../node_modules/.pnpm/zod@3.25.76/node_modules/zod/v3/helpers/errorUtil.js
		var errorUtil;
		(function(errorUtil) {
			errorUtil.errToObj = (message) => typeof message === "string" ? { message } : message || {};
			errorUtil.toString = (message) => typeof message === "string" ? message : message?.message;
		})(errorUtil || (errorUtil = {}));
		//#endregion
		//#region ../../../node_modules/.pnpm/zod@3.25.76/node_modules/zod/v3/types.js
		var ParseInputLazyPath = class {
			constructor(parent, value, path, key) {
				this._cachedPath = [];
				this.parent = parent;
				this.data = value;
				this._path = path;
				this._key = key;
			}
			get path() {
				if (!this._cachedPath.length) {
					if (Array.isArray(this._key)) this._cachedPath.push(...this._path, ...this._key);
					else this._cachedPath.push(...this._path, this._key);
				}
				return this._cachedPath;
			}
		};
		const handleResult = (ctx, result) => {
			if (isValid(result)) return {
				success: true,
				data: result.value
			};
			else {
				if (!ctx.common.issues.length) throw new Error("Validation failed but no issues detected.");
				return {
					success: false,
					get error() {
						if (this._error) return this._error;
						const error = new ZodError(ctx.common.issues);
						this._error = error;
						return this._error;
					}
				};
			}
		};
		function processCreateParams(params) {
			if (!params) return {};
			const { errorMap, invalid_type_error, required_error, description } = params;
			if (errorMap && (invalid_type_error || required_error)) throw new Error(`Can't use "invalid_type_error" or "required_error" in conjunction with custom error map.`);
			if (errorMap) return {
				errorMap,
				description
			};
			const customMap = (iss, ctx) => {
				const { message } = params;
				if (iss.code === "invalid_enum_value") return { message: message ?? ctx.defaultError };
				if (typeof ctx.data === "undefined") return { message: message ?? required_error ?? ctx.defaultError };
				if (iss.code !== "invalid_type") return { message: ctx.defaultError };
				return { message: message ?? invalid_type_error ?? ctx.defaultError };
			};
			return {
				errorMap: customMap,
				description
			};
		}
		var ZodType = class {
			get description() {
				return this._def.description;
			}
			_getType(input) {
				return getParsedType(input.data);
			}
			_getOrReturnCtx(input, ctx) {
				return ctx || {
					common: input.parent.common,
					data: input.data,
					parsedType: getParsedType(input.data),
					schemaErrorMap: this._def.errorMap,
					path: input.path,
					parent: input.parent
				};
			}
			_processInputParams(input) {
				return {
					status: new ParseStatus(),
					ctx: {
						common: input.parent.common,
						data: input.data,
						parsedType: getParsedType(input.data),
						schemaErrorMap: this._def.errorMap,
						path: input.path,
						parent: input.parent
					}
				};
			}
			_parseSync(input) {
				const result = this._parse(input);
				if (isAsync(result)) throw new Error("Synchronous parse encountered promise.");
				return result;
			}
			_parseAsync(input) {
				const result = this._parse(input);
				return Promise.resolve(result);
			}
			parse(data, params) {
				const result = this.safeParse(data, params);
				if (result.success) return result.data;
				throw result.error;
			}
			safeParse(data, params) {
				const ctx = {
					common: {
						issues: [],
						async: params?.async ?? false,
						contextualErrorMap: params?.errorMap
					},
					path: params?.path || [],
					schemaErrorMap: this._def.errorMap,
					parent: null,
					data,
					parsedType: getParsedType(data)
				};
				const result = this._parseSync({
					data,
					path: ctx.path,
					parent: ctx
				});
				return handleResult(ctx, result);
			}
			"~validate"(data) {
				const ctx = {
					common: {
						issues: [],
						async: !!this["~standard"].async
					},
					path: [],
					schemaErrorMap: this._def.errorMap,
					parent: null,
					data,
					parsedType: getParsedType(data)
				};
				if (!this["~standard"].async) try {
					const result = this._parseSync({
						data,
						path: [],
						parent: ctx
					});
					return isValid(result) ? { value: result.value } : { issues: ctx.common.issues };
				} catch (err) {
					if (err?.message?.toLowerCase()?.includes("encountered")) this["~standard"].async = true;
					ctx.common = {
						issues: [],
						async: true
					};
				}
				return this._parseAsync({
					data,
					path: [],
					parent: ctx
				}).then((result) => isValid(result) ? { value: result.value } : { issues: ctx.common.issues });
			}
			async parseAsync(data, params) {
				const result = await this.safeParseAsync(data, params);
				if (result.success) return result.data;
				throw result.error;
			}
			async safeParseAsync(data, params) {
				const ctx = {
					common: {
						issues: [],
						contextualErrorMap: params?.errorMap,
						async: true
					},
					path: params?.path || [],
					schemaErrorMap: this._def.errorMap,
					parent: null,
					data,
					parsedType: getParsedType(data)
				};
				const maybeAsyncResult = this._parse({
					data,
					path: ctx.path,
					parent: ctx
				});
				const result = await (isAsync(maybeAsyncResult) ? maybeAsyncResult : Promise.resolve(maybeAsyncResult));
				return handleResult(ctx, result);
			}
			refine(check, message) {
				const getIssueProperties = (val) => {
					if (typeof message === "string" || typeof message === "undefined") return { message };
					else if (typeof message === "function") return message(val);
					else return message;
				};
				return this._refinement((val, ctx) => {
					const result = check(val);
					const setError = () => ctx.addIssue({
						code: ZodIssueCode.custom,
						...getIssueProperties(val)
					});
					if (typeof Promise !== "undefined" && result instanceof Promise) return result.then((data) => {
						if (!data) {
							setError();
							return false;
						} else return true;
					});
					if (!result) {
						setError();
						return false;
					} else return true;
				});
			}
			refinement(check, refinementData) {
				return this._refinement((val, ctx) => {
					if (!check(val)) {
						ctx.addIssue(typeof refinementData === "function" ? refinementData(val, ctx) : refinementData);
						return false;
					} else return true;
				});
			}
			_refinement(refinement) {
				return new ZodEffects({
					schema: this,
					typeName: ZodFirstPartyTypeKind.ZodEffects,
					effect: {
						type: "refinement",
						refinement
					}
				});
			}
			superRefine(refinement) {
				return this._refinement(refinement);
			}
			constructor(def) {
				/** Alias of safeParseAsync */
				this.spa = this.safeParseAsync;
				this._def = def;
				this.parse = this.parse.bind(this);
				this.safeParse = this.safeParse.bind(this);
				this.parseAsync = this.parseAsync.bind(this);
				this.safeParseAsync = this.safeParseAsync.bind(this);
				this.spa = this.spa.bind(this);
				this.refine = this.refine.bind(this);
				this.refinement = this.refinement.bind(this);
				this.superRefine = this.superRefine.bind(this);
				this.optional = this.optional.bind(this);
				this.nullable = this.nullable.bind(this);
				this.nullish = this.nullish.bind(this);
				this.array = this.array.bind(this);
				this.promise = this.promise.bind(this);
				this.or = this.or.bind(this);
				this.and = this.and.bind(this);
				this.transform = this.transform.bind(this);
				this.brand = this.brand.bind(this);
				this.default = this.default.bind(this);
				this.catch = this.catch.bind(this);
				this.describe = this.describe.bind(this);
				this.pipe = this.pipe.bind(this);
				this.readonly = this.readonly.bind(this);
				this.isNullable = this.isNullable.bind(this);
				this.isOptional = this.isOptional.bind(this);
				this["~standard"] = {
					version: 1,
					vendor: "zod",
					validate: (data) => this["~validate"](data)
				};
			}
			optional() {
				return ZodOptional.create(this, this._def);
			}
			nullable() {
				return ZodNullable.create(this, this._def);
			}
			nullish() {
				return this.nullable().optional();
			}
			array() {
				return ZodArray.create(this);
			}
			promise() {
				return ZodPromise.create(this, this._def);
			}
			or(option) {
				return ZodUnion.create([this, option], this._def);
			}
			and(incoming) {
				return ZodIntersection.create(this, incoming, this._def);
			}
			transform(transform) {
				return new ZodEffects({
					...processCreateParams(this._def),
					schema: this,
					typeName: ZodFirstPartyTypeKind.ZodEffects,
					effect: {
						type: "transform",
						transform
					}
				});
			}
			default(def) {
				const defaultValueFunc = typeof def === "function" ? def : () => def;
				return new ZodDefault({
					...processCreateParams(this._def),
					innerType: this,
					defaultValue: defaultValueFunc,
					typeName: ZodFirstPartyTypeKind.ZodDefault
				});
			}
			brand() {
				return new ZodBranded({
					typeName: ZodFirstPartyTypeKind.ZodBranded,
					type: this,
					...processCreateParams(this._def)
				});
			}
			catch(def) {
				const catchValueFunc = typeof def === "function" ? def : () => def;
				return new ZodCatch({
					...processCreateParams(this._def),
					innerType: this,
					catchValue: catchValueFunc,
					typeName: ZodFirstPartyTypeKind.ZodCatch
				});
			}
			describe(description) {
				const This = this.constructor;
				return new This({
					...this._def,
					description
				});
			}
			pipe(target) {
				return ZodPipeline.create(this, target);
			}
			readonly() {
				return ZodReadonly.create(this);
			}
			isOptional() {
				return this.safeParse(void 0).success;
			}
			isNullable() {
				return this.safeParse(null).success;
			}
		};
		const cuidRegex = /^c[^\s-]{8,}$/i;
		const cuid2Regex = /^[0-9a-z]+$/;
		const ulidRegex = /^[0-9A-HJKMNP-TV-Z]{26}$/i;
		const uuidRegex = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/i;
		const nanoidRegex = /^[a-z0-9_-]{21}$/i;
		const jwtRegex = /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]*$/;
		const durationRegex = /^[-+]?P(?!$)(?:(?:[-+]?\d+Y)|(?:[-+]?\d+[.,]\d+Y$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:(?:[-+]?\d+W)|(?:[-+]?\d+[.,]\d+W$))?(?:(?:[-+]?\d+D)|(?:[-+]?\d+[.,]\d+D$))?(?:T(?=[\d+-])(?:(?:[-+]?\d+H)|(?:[-+]?\d+[.,]\d+H$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:[-+]?\d+(?:[.,]\d+)?S)?)??$/;
		const emailRegex = /^(?!\.)(?!.*\.\.)([A-Z0-9_'+\-\.]*)[A-Z0-9_+-]@([A-Z0-9][A-Z0-9\-]*\.)+[A-Z]{2,}$/i;
		const _emojiRegex = `^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$`;
		let emojiRegex;
		const ipv4Regex = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/;
		const ipv4CidrRegex = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/(3[0-2]|[12]?[0-9])$/;
		const ipv6Regex = /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))$/;
		const ipv6CidrRegex = /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/;
		const base64Regex = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/;
		const base64urlRegex = /^([0-9a-zA-Z-_]{4})*(([0-9a-zA-Z-_]{2}(==)?)|([0-9a-zA-Z-_]{3}(=)?))?$/;
		const dateRegexSource = `((\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-((0[13578]|1[02])-(0[1-9]|[12]\\d|3[01])|(0[469]|11)-(0[1-9]|[12]\\d|30)|(02)-(0[1-9]|1\\d|2[0-8])))`;
		const dateRegex = new RegExp(`^${dateRegexSource}$`);
		function timeRegexSource(args) {
			let secondsRegexSource = `[0-5]\\d`;
			if (args.precision) secondsRegexSource = `${secondsRegexSource}\\.\\d{${args.precision}}`;
			else if (args.precision == null) secondsRegexSource = `${secondsRegexSource}(\\.\\d+)?`;
			const secondsQuantifier = args.precision ? "+" : "?";
			return `([01]\\d|2[0-3]):[0-5]\\d(:${secondsRegexSource})${secondsQuantifier}`;
		}
		function timeRegex(args) {
			return new RegExp(`^${timeRegexSource(args)}$`);
		}
		function datetimeRegex(args) {
			let regex = `${dateRegexSource}T${timeRegexSource(args)}`;
			const opts = [];
			opts.push(args.local ? `Z?` : `Z`);
			if (args.offset) opts.push(`([+-]\\d{2}:?\\d{2})`);
			regex = `${regex}(${opts.join("|")})`;
			return new RegExp(`^${regex}$`);
		}
		function isValidIP(ip, version) {
			if ((version === "v4" || !version) && ipv4Regex.test(ip)) return true;
			if ((version === "v6" || !version) && ipv6Regex.test(ip)) return true;
			return false;
		}
		function isValidJWT(jwt, alg) {
			if (!jwtRegex.test(jwt)) return false;
			try {
				const [header] = jwt.split(".");
				if (!header) return false;
				const base64 = header.replace(/-/g, "+").replace(/_/g, "/").padEnd(header.length + (4 - header.length % 4) % 4, "=");
				const decoded = JSON.parse(atob(base64));
				if (typeof decoded !== "object" || decoded === null) return false;
				if ("typ" in decoded && decoded?.typ !== "JWT") return false;
				if (!decoded.alg) return false;
				if (alg && decoded.alg !== alg) return false;
				return true;
			} catch {
				return false;
			}
		}
		function isValidCidr(ip, version) {
			if ((version === "v4" || !version) && ipv4CidrRegex.test(ip)) return true;
			if ((version === "v6" || !version) && ipv6CidrRegex.test(ip)) return true;
			return false;
		}
		var ZodString = class ZodString extends ZodType {
			_parse(input) {
				if (this._def.coerce) input.data = String(input.data);
				if (this._getType(input) !== ZodParsedType.string) {
					const ctx = this._getOrReturnCtx(input);
					addIssueToContext(ctx, {
						code: ZodIssueCode.invalid_type,
						expected: ZodParsedType.string,
						received: ctx.parsedType
					});
					return INVALID;
				}
				const status = new ParseStatus();
				let ctx = void 0;
				for (const check of this._def.checks) if (check.kind === "min") {
					if (input.data.length < check.value) {
						ctx = this._getOrReturnCtx(input, ctx);
						addIssueToContext(ctx, {
							code: ZodIssueCode.too_small,
							minimum: check.value,
							type: "string",
							inclusive: true,
							exact: false,
							message: check.message
						});
						status.dirty();
					}
				} else if (check.kind === "max") {
					if (input.data.length > check.value) {
						ctx = this._getOrReturnCtx(input, ctx);
						addIssueToContext(ctx, {
							code: ZodIssueCode.too_big,
							maximum: check.value,
							type: "string",
							inclusive: true,
							exact: false,
							message: check.message
						});
						status.dirty();
					}
				} else if (check.kind === "length") {
					const tooBig = input.data.length > check.value;
					const tooSmall = input.data.length < check.value;
					if (tooBig || tooSmall) {
						ctx = this._getOrReturnCtx(input, ctx);
						if (tooBig) addIssueToContext(ctx, {
							code: ZodIssueCode.too_big,
							maximum: check.value,
							type: "string",
							inclusive: true,
							exact: true,
							message: check.message
						});
						else if (tooSmall) addIssueToContext(ctx, {
							code: ZodIssueCode.too_small,
							minimum: check.value,
							type: "string",
							inclusive: true,
							exact: true,
							message: check.message
						});
						status.dirty();
					}
				} else if (check.kind === "email") {
					if (!emailRegex.test(input.data)) {
						ctx = this._getOrReturnCtx(input, ctx);
						addIssueToContext(ctx, {
							validation: "email",
							code: ZodIssueCode.invalid_string,
							message: check.message
						});
						status.dirty();
					}
				} else if (check.kind === "emoji") {
					if (!emojiRegex) emojiRegex = new RegExp(_emojiRegex, "u");
					if (!emojiRegex.test(input.data)) {
						ctx = this._getOrReturnCtx(input, ctx);
						addIssueToContext(ctx, {
							validation: "emoji",
							code: ZodIssueCode.invalid_string,
							message: check.message
						});
						status.dirty();
					}
				} else if (check.kind === "uuid") {
					if (!uuidRegex.test(input.data)) {
						ctx = this._getOrReturnCtx(input, ctx);
						addIssueToContext(ctx, {
							validation: "uuid",
							code: ZodIssueCode.invalid_string,
							message: check.message
						});
						status.dirty();
					}
				} else if (check.kind === "nanoid") {
					if (!nanoidRegex.test(input.data)) {
						ctx = this._getOrReturnCtx(input, ctx);
						addIssueToContext(ctx, {
							validation: "nanoid",
							code: ZodIssueCode.invalid_string,
							message: check.message
						});
						status.dirty();
					}
				} else if (check.kind === "cuid") {
					if (!cuidRegex.test(input.data)) {
						ctx = this._getOrReturnCtx(input, ctx);
						addIssueToContext(ctx, {
							validation: "cuid",
							code: ZodIssueCode.invalid_string,
							message: check.message
						});
						status.dirty();
					}
				} else if (check.kind === "cuid2") {
					if (!cuid2Regex.test(input.data)) {
						ctx = this._getOrReturnCtx(input, ctx);
						addIssueToContext(ctx, {
							validation: "cuid2",
							code: ZodIssueCode.invalid_string,
							message: check.message
						});
						status.dirty();
					}
				} else if (check.kind === "ulid") {
					if (!ulidRegex.test(input.data)) {
						ctx = this._getOrReturnCtx(input, ctx);
						addIssueToContext(ctx, {
							validation: "ulid",
							code: ZodIssueCode.invalid_string,
							message: check.message
						});
						status.dirty();
					}
				} else if (check.kind === "url") try {
					new URL(input.data);
				} catch {
					ctx = this._getOrReturnCtx(input, ctx);
					addIssueToContext(ctx, {
						validation: "url",
						code: ZodIssueCode.invalid_string,
						message: check.message
					});
					status.dirty();
				}
				else if (check.kind === "regex") {
					check.regex.lastIndex = 0;
					if (!check.regex.test(input.data)) {
						ctx = this._getOrReturnCtx(input, ctx);
						addIssueToContext(ctx, {
							validation: "regex",
							code: ZodIssueCode.invalid_string,
							message: check.message
						});
						status.dirty();
					}
				} else if (check.kind === "trim") input.data = input.data.trim();
				else if (check.kind === "includes") {
					if (!input.data.includes(check.value, check.position)) {
						ctx = this._getOrReturnCtx(input, ctx);
						addIssueToContext(ctx, {
							code: ZodIssueCode.invalid_string,
							validation: {
								includes: check.value,
								position: check.position
							},
							message: check.message
						});
						status.dirty();
					}
				} else if (check.kind === "toLowerCase") input.data = input.data.toLowerCase();
				else if (check.kind === "toUpperCase") input.data = input.data.toUpperCase();
				else if (check.kind === "startsWith") {
					if (!input.data.startsWith(check.value)) {
						ctx = this._getOrReturnCtx(input, ctx);
						addIssueToContext(ctx, {
							code: ZodIssueCode.invalid_string,
							validation: { startsWith: check.value },
							message: check.message
						});
						status.dirty();
					}
				} else if (check.kind === "endsWith") {
					if (!input.data.endsWith(check.value)) {
						ctx = this._getOrReturnCtx(input, ctx);
						addIssueToContext(ctx, {
							code: ZodIssueCode.invalid_string,
							validation: { endsWith: check.value },
							message: check.message
						});
						status.dirty();
					}
				} else if (check.kind === "datetime") {
					if (!datetimeRegex(check).test(input.data)) {
						ctx = this._getOrReturnCtx(input, ctx);
						addIssueToContext(ctx, {
							code: ZodIssueCode.invalid_string,
							validation: "datetime",
							message: check.message
						});
						status.dirty();
					}
				} else if (check.kind === "date") {
					if (!dateRegex.test(input.data)) {
						ctx = this._getOrReturnCtx(input, ctx);
						addIssueToContext(ctx, {
							code: ZodIssueCode.invalid_string,
							validation: "date",
							message: check.message
						});
						status.dirty();
					}
				} else if (check.kind === "time") {
					if (!timeRegex(check).test(input.data)) {
						ctx = this._getOrReturnCtx(input, ctx);
						addIssueToContext(ctx, {
							code: ZodIssueCode.invalid_string,
							validation: "time",
							message: check.message
						});
						status.dirty();
					}
				} else if (check.kind === "duration") {
					if (!durationRegex.test(input.data)) {
						ctx = this._getOrReturnCtx(input, ctx);
						addIssueToContext(ctx, {
							validation: "duration",
							code: ZodIssueCode.invalid_string,
							message: check.message
						});
						status.dirty();
					}
				} else if (check.kind === "ip") {
					if (!isValidIP(input.data, check.version)) {
						ctx = this._getOrReturnCtx(input, ctx);
						addIssueToContext(ctx, {
							validation: "ip",
							code: ZodIssueCode.invalid_string,
							message: check.message
						});
						status.dirty();
					}
				} else if (check.kind === "jwt") {
					if (!isValidJWT(input.data, check.alg)) {
						ctx = this._getOrReturnCtx(input, ctx);
						addIssueToContext(ctx, {
							validation: "jwt",
							code: ZodIssueCode.invalid_string,
							message: check.message
						});
						status.dirty();
					}
				} else if (check.kind === "cidr") {
					if (!isValidCidr(input.data, check.version)) {
						ctx = this._getOrReturnCtx(input, ctx);
						addIssueToContext(ctx, {
							validation: "cidr",
							code: ZodIssueCode.invalid_string,
							message: check.message
						});
						status.dirty();
					}
				} else if (check.kind === "base64") {
					if (!base64Regex.test(input.data)) {
						ctx = this._getOrReturnCtx(input, ctx);
						addIssueToContext(ctx, {
							validation: "base64",
							code: ZodIssueCode.invalid_string,
							message: check.message
						});
						status.dirty();
					}
				} else if (check.kind === "base64url") {
					if (!base64urlRegex.test(input.data)) {
						ctx = this._getOrReturnCtx(input, ctx);
						addIssueToContext(ctx, {
							validation: "base64url",
							code: ZodIssueCode.invalid_string,
							message: check.message
						});
						status.dirty();
					}
				} else util.assertNever(check);
				return {
					status: status.value,
					value: input.data
				};
			}
			_regex(regex, validation, message) {
				return this.refinement((data) => regex.test(data), {
					validation,
					code: ZodIssueCode.invalid_string,
					...errorUtil.errToObj(message)
				});
			}
			_addCheck(check) {
				return new ZodString({
					...this._def,
					checks: [...this._def.checks, check]
				});
			}
			email(message) {
				return this._addCheck({
					kind: "email",
					...errorUtil.errToObj(message)
				});
			}
			url(message) {
				return this._addCheck({
					kind: "url",
					...errorUtil.errToObj(message)
				});
			}
			emoji(message) {
				return this._addCheck({
					kind: "emoji",
					...errorUtil.errToObj(message)
				});
			}
			uuid(message) {
				return this._addCheck({
					kind: "uuid",
					...errorUtil.errToObj(message)
				});
			}
			nanoid(message) {
				return this._addCheck({
					kind: "nanoid",
					...errorUtil.errToObj(message)
				});
			}
			cuid(message) {
				return this._addCheck({
					kind: "cuid",
					...errorUtil.errToObj(message)
				});
			}
			cuid2(message) {
				return this._addCheck({
					kind: "cuid2",
					...errorUtil.errToObj(message)
				});
			}
			ulid(message) {
				return this._addCheck({
					kind: "ulid",
					...errorUtil.errToObj(message)
				});
			}
			base64(message) {
				return this._addCheck({
					kind: "base64",
					...errorUtil.errToObj(message)
				});
			}
			base64url(message) {
				return this._addCheck({
					kind: "base64url",
					...errorUtil.errToObj(message)
				});
			}
			jwt(options) {
				return this._addCheck({
					kind: "jwt",
					...errorUtil.errToObj(options)
				});
			}
			ip(options) {
				return this._addCheck({
					kind: "ip",
					...errorUtil.errToObj(options)
				});
			}
			cidr(options) {
				return this._addCheck({
					kind: "cidr",
					...errorUtil.errToObj(options)
				});
			}
			datetime(options) {
				if (typeof options === "string") return this._addCheck({
					kind: "datetime",
					precision: null,
					offset: false,
					local: false,
					message: options
				});
				return this._addCheck({
					kind: "datetime",
					precision: typeof options?.precision === "undefined" ? null : options?.precision,
					offset: options?.offset ?? false,
					local: options?.local ?? false,
					...errorUtil.errToObj(options?.message)
				});
			}
			date(message) {
				return this._addCheck({
					kind: "date",
					message
				});
			}
			time(options) {
				if (typeof options === "string") return this._addCheck({
					kind: "time",
					precision: null,
					message: options
				});
				return this._addCheck({
					kind: "time",
					precision: typeof options?.precision === "undefined" ? null : options?.precision,
					...errorUtil.errToObj(options?.message)
				});
			}
			duration(message) {
				return this._addCheck({
					kind: "duration",
					...errorUtil.errToObj(message)
				});
			}
			regex(regex, message) {
				return this._addCheck({
					kind: "regex",
					regex,
					...errorUtil.errToObj(message)
				});
			}
			includes(value, options) {
				return this._addCheck({
					kind: "includes",
					value,
					position: options?.position,
					...errorUtil.errToObj(options?.message)
				});
			}
			startsWith(value, message) {
				return this._addCheck({
					kind: "startsWith",
					value,
					...errorUtil.errToObj(message)
				});
			}
			endsWith(value, message) {
				return this._addCheck({
					kind: "endsWith",
					value,
					...errorUtil.errToObj(message)
				});
			}
			min(minLength, message) {
				return this._addCheck({
					kind: "min",
					value: minLength,
					...errorUtil.errToObj(message)
				});
			}
			max(maxLength, message) {
				return this._addCheck({
					kind: "max",
					value: maxLength,
					...errorUtil.errToObj(message)
				});
			}
			length(len, message) {
				return this._addCheck({
					kind: "length",
					value: len,
					...errorUtil.errToObj(message)
				});
			}
			/**
			* Equivalent to `.min(1)`
			*/
			nonempty(message) {
				return this.min(1, errorUtil.errToObj(message));
			}
			trim() {
				return new ZodString({
					...this._def,
					checks: [...this._def.checks, { kind: "trim" }]
				});
			}
			toLowerCase() {
				return new ZodString({
					...this._def,
					checks: [...this._def.checks, { kind: "toLowerCase" }]
				});
			}
			toUpperCase() {
				return new ZodString({
					...this._def,
					checks: [...this._def.checks, { kind: "toUpperCase" }]
				});
			}
			get isDatetime() {
				return !!this._def.checks.find((ch) => ch.kind === "datetime");
			}
			get isDate() {
				return !!this._def.checks.find((ch) => ch.kind === "date");
			}
			get isTime() {
				return !!this._def.checks.find((ch) => ch.kind === "time");
			}
			get isDuration() {
				return !!this._def.checks.find((ch) => ch.kind === "duration");
			}
			get isEmail() {
				return !!this._def.checks.find((ch) => ch.kind === "email");
			}
			get isURL() {
				return !!this._def.checks.find((ch) => ch.kind === "url");
			}
			get isEmoji() {
				return !!this._def.checks.find((ch) => ch.kind === "emoji");
			}
			get isUUID() {
				return !!this._def.checks.find((ch) => ch.kind === "uuid");
			}
			get isNANOID() {
				return !!this._def.checks.find((ch) => ch.kind === "nanoid");
			}
			get isCUID() {
				return !!this._def.checks.find((ch) => ch.kind === "cuid");
			}
			get isCUID2() {
				return !!this._def.checks.find((ch) => ch.kind === "cuid2");
			}
			get isULID() {
				return !!this._def.checks.find((ch) => ch.kind === "ulid");
			}
			get isIP() {
				return !!this._def.checks.find((ch) => ch.kind === "ip");
			}
			get isCIDR() {
				return !!this._def.checks.find((ch) => ch.kind === "cidr");
			}
			get isBase64() {
				return !!this._def.checks.find((ch) => ch.kind === "base64");
			}
			get isBase64url() {
				return !!this._def.checks.find((ch) => ch.kind === "base64url");
			}
			get minLength() {
				let min = null;
				for (const ch of this._def.checks) if (ch.kind === "min") {
					if (min === null || ch.value > min) min = ch.value;
				}
				return min;
			}
			get maxLength() {
				let max = null;
				for (const ch of this._def.checks) if (ch.kind === "max") {
					if (max === null || ch.value < max) max = ch.value;
				}
				return max;
			}
		};
		ZodString.create = (params) => {
			return new ZodString({
				checks: [],
				typeName: ZodFirstPartyTypeKind.ZodString,
				coerce: params?.coerce ?? false,
				...processCreateParams(params)
			});
		};
		function floatSafeRemainder(val, step) {
			const valDecCount = (val.toString().split(".")[1] || "").length;
			const stepDecCount = (step.toString().split(".")[1] || "").length;
			const decCount = valDecCount > stepDecCount ? valDecCount : stepDecCount;
			return Number.parseInt(val.toFixed(decCount).replace(".", "")) % Number.parseInt(step.toFixed(decCount).replace(".", "")) / 10 ** decCount;
		}
		var ZodNumber = class ZodNumber extends ZodType {
			constructor() {
				super(...arguments);
				this.min = this.gte;
				this.max = this.lte;
				this.step = this.multipleOf;
			}
			_parse(input) {
				if (this._def.coerce) input.data = Number(input.data);
				if (this._getType(input) !== ZodParsedType.number) {
					const ctx = this._getOrReturnCtx(input);
					addIssueToContext(ctx, {
						code: ZodIssueCode.invalid_type,
						expected: ZodParsedType.number,
						received: ctx.parsedType
					});
					return INVALID;
				}
				let ctx = void 0;
				const status = new ParseStatus();
				for (const check of this._def.checks) if (check.kind === "int") {
					if (!util.isInteger(input.data)) {
						ctx = this._getOrReturnCtx(input, ctx);
						addIssueToContext(ctx, {
							code: ZodIssueCode.invalid_type,
							expected: "integer",
							received: "float",
							message: check.message
						});
						status.dirty();
					}
				} else if (check.kind === "min") {
					if (check.inclusive ? input.data < check.value : input.data <= check.value) {
						ctx = this._getOrReturnCtx(input, ctx);
						addIssueToContext(ctx, {
							code: ZodIssueCode.too_small,
							minimum: check.value,
							type: "number",
							inclusive: check.inclusive,
							exact: false,
							message: check.message
						});
						status.dirty();
					}
				} else if (check.kind === "max") {
					if (check.inclusive ? input.data > check.value : input.data >= check.value) {
						ctx = this._getOrReturnCtx(input, ctx);
						addIssueToContext(ctx, {
							code: ZodIssueCode.too_big,
							maximum: check.value,
							type: "number",
							inclusive: check.inclusive,
							exact: false,
							message: check.message
						});
						status.dirty();
					}
				} else if (check.kind === "multipleOf") {
					if (floatSafeRemainder(input.data, check.value) !== 0) {
						ctx = this._getOrReturnCtx(input, ctx);
						addIssueToContext(ctx, {
							code: ZodIssueCode.not_multiple_of,
							multipleOf: check.value,
							message: check.message
						});
						status.dirty();
					}
				} else if (check.kind === "finite") {
					if (!Number.isFinite(input.data)) {
						ctx = this._getOrReturnCtx(input, ctx);
						addIssueToContext(ctx, {
							code: ZodIssueCode.not_finite,
							message: check.message
						});
						status.dirty();
					}
				} else util.assertNever(check);
				return {
					status: status.value,
					value: input.data
				};
			}
			gte(value, message) {
				return this.setLimit("min", value, true, errorUtil.toString(message));
			}
			gt(value, message) {
				return this.setLimit("min", value, false, errorUtil.toString(message));
			}
			lte(value, message) {
				return this.setLimit("max", value, true, errorUtil.toString(message));
			}
			lt(value, message) {
				return this.setLimit("max", value, false, errorUtil.toString(message));
			}
			setLimit(kind, value, inclusive, message) {
				return new ZodNumber({
					...this._def,
					checks: [...this._def.checks, {
						kind,
						value,
						inclusive,
						message: errorUtil.toString(message)
					}]
				});
			}
			_addCheck(check) {
				return new ZodNumber({
					...this._def,
					checks: [...this._def.checks, check]
				});
			}
			int(message) {
				return this._addCheck({
					kind: "int",
					message: errorUtil.toString(message)
				});
			}
			positive(message) {
				return this._addCheck({
					kind: "min",
					value: 0,
					inclusive: false,
					message: errorUtil.toString(message)
				});
			}
			negative(message) {
				return this._addCheck({
					kind: "max",
					value: 0,
					inclusive: false,
					message: errorUtil.toString(message)
				});
			}
			nonpositive(message) {
				return this._addCheck({
					kind: "max",
					value: 0,
					inclusive: true,
					message: errorUtil.toString(message)
				});
			}
			nonnegative(message) {
				return this._addCheck({
					kind: "min",
					value: 0,
					inclusive: true,
					message: errorUtil.toString(message)
				});
			}
			multipleOf(value, message) {
				return this._addCheck({
					kind: "multipleOf",
					value,
					message: errorUtil.toString(message)
				});
			}
			finite(message) {
				return this._addCheck({
					kind: "finite",
					message: errorUtil.toString(message)
				});
			}
			safe(message) {
				return this._addCheck({
					kind: "min",
					inclusive: true,
					value: Number.MIN_SAFE_INTEGER,
					message: errorUtil.toString(message)
				})._addCheck({
					kind: "max",
					inclusive: true,
					value: Number.MAX_SAFE_INTEGER,
					message: errorUtil.toString(message)
				});
			}
			get minValue() {
				let min = null;
				for (const ch of this._def.checks) if (ch.kind === "min") {
					if (min === null || ch.value > min) min = ch.value;
				}
				return min;
			}
			get maxValue() {
				let max = null;
				for (const ch of this._def.checks) if (ch.kind === "max") {
					if (max === null || ch.value < max) max = ch.value;
				}
				return max;
			}
			get isInt() {
				return !!this._def.checks.find((ch) => ch.kind === "int" || ch.kind === "multipleOf" && util.isInteger(ch.value));
			}
			get isFinite() {
				let max = null;
				let min = null;
				for (const ch of this._def.checks) if (ch.kind === "finite" || ch.kind === "int" || ch.kind === "multipleOf") return true;
				else if (ch.kind === "min") {
					if (min === null || ch.value > min) min = ch.value;
				} else if (ch.kind === "max") {
					if (max === null || ch.value < max) max = ch.value;
				}
				return Number.isFinite(min) && Number.isFinite(max);
			}
		};
		ZodNumber.create = (params) => {
			return new ZodNumber({
				checks: [],
				typeName: ZodFirstPartyTypeKind.ZodNumber,
				coerce: params?.coerce || false,
				...processCreateParams(params)
			});
		};
		var ZodBigInt = class ZodBigInt extends ZodType {
			constructor() {
				super(...arguments);
				this.min = this.gte;
				this.max = this.lte;
			}
			_parse(input) {
				if (this._def.coerce) try {
					input.data = BigInt(input.data);
				} catch {
					return this._getInvalidInput(input);
				}
				if (this._getType(input) !== ZodParsedType.bigint) return this._getInvalidInput(input);
				let ctx = void 0;
				const status = new ParseStatus();
				for (const check of this._def.checks) if (check.kind === "min") {
					if (check.inclusive ? input.data < check.value : input.data <= check.value) {
						ctx = this._getOrReturnCtx(input, ctx);
						addIssueToContext(ctx, {
							code: ZodIssueCode.too_small,
							type: "bigint",
							minimum: check.value,
							inclusive: check.inclusive,
							message: check.message
						});
						status.dirty();
					}
				} else if (check.kind === "max") {
					if (check.inclusive ? input.data > check.value : input.data >= check.value) {
						ctx = this._getOrReturnCtx(input, ctx);
						addIssueToContext(ctx, {
							code: ZodIssueCode.too_big,
							type: "bigint",
							maximum: check.value,
							inclusive: check.inclusive,
							message: check.message
						});
						status.dirty();
					}
				} else if (check.kind === "multipleOf") {
					if (input.data % check.value !== BigInt(0)) {
						ctx = this._getOrReturnCtx(input, ctx);
						addIssueToContext(ctx, {
							code: ZodIssueCode.not_multiple_of,
							multipleOf: check.value,
							message: check.message
						});
						status.dirty();
					}
				} else util.assertNever(check);
				return {
					status: status.value,
					value: input.data
				};
			}
			_getInvalidInput(input) {
				const ctx = this._getOrReturnCtx(input);
				addIssueToContext(ctx, {
					code: ZodIssueCode.invalid_type,
					expected: ZodParsedType.bigint,
					received: ctx.parsedType
				});
				return INVALID;
			}
			gte(value, message) {
				return this.setLimit("min", value, true, errorUtil.toString(message));
			}
			gt(value, message) {
				return this.setLimit("min", value, false, errorUtil.toString(message));
			}
			lte(value, message) {
				return this.setLimit("max", value, true, errorUtil.toString(message));
			}
			lt(value, message) {
				return this.setLimit("max", value, false, errorUtil.toString(message));
			}
			setLimit(kind, value, inclusive, message) {
				return new ZodBigInt({
					...this._def,
					checks: [...this._def.checks, {
						kind,
						value,
						inclusive,
						message: errorUtil.toString(message)
					}]
				});
			}
			_addCheck(check) {
				return new ZodBigInt({
					...this._def,
					checks: [...this._def.checks, check]
				});
			}
			positive(message) {
				return this._addCheck({
					kind: "min",
					value: BigInt(0),
					inclusive: false,
					message: errorUtil.toString(message)
				});
			}
			negative(message) {
				return this._addCheck({
					kind: "max",
					value: BigInt(0),
					inclusive: false,
					message: errorUtil.toString(message)
				});
			}
			nonpositive(message) {
				return this._addCheck({
					kind: "max",
					value: BigInt(0),
					inclusive: true,
					message: errorUtil.toString(message)
				});
			}
			nonnegative(message) {
				return this._addCheck({
					kind: "min",
					value: BigInt(0),
					inclusive: true,
					message: errorUtil.toString(message)
				});
			}
			multipleOf(value, message) {
				return this._addCheck({
					kind: "multipleOf",
					value,
					message: errorUtil.toString(message)
				});
			}
			get minValue() {
				let min = null;
				for (const ch of this._def.checks) if (ch.kind === "min") {
					if (min === null || ch.value > min) min = ch.value;
				}
				return min;
			}
			get maxValue() {
				let max = null;
				for (const ch of this._def.checks) if (ch.kind === "max") {
					if (max === null || ch.value < max) max = ch.value;
				}
				return max;
			}
		};
		ZodBigInt.create = (params) => {
			return new ZodBigInt({
				checks: [],
				typeName: ZodFirstPartyTypeKind.ZodBigInt,
				coerce: params?.coerce ?? false,
				...processCreateParams(params)
			});
		};
		var ZodBoolean = class extends ZodType {
			_parse(input) {
				if (this._def.coerce) input.data = Boolean(input.data);
				if (this._getType(input) !== ZodParsedType.boolean) {
					const ctx = this._getOrReturnCtx(input);
					addIssueToContext(ctx, {
						code: ZodIssueCode.invalid_type,
						expected: ZodParsedType.boolean,
						received: ctx.parsedType
					});
					return INVALID;
				}
				return OK(input.data);
			}
		};
		ZodBoolean.create = (params) => {
			return new ZodBoolean({
				typeName: ZodFirstPartyTypeKind.ZodBoolean,
				coerce: params?.coerce || false,
				...processCreateParams(params)
			});
		};
		var ZodDate = class ZodDate extends ZodType {
			_parse(input) {
				if (this._def.coerce) input.data = new Date(input.data);
				if (this._getType(input) !== ZodParsedType.date) {
					const ctx = this._getOrReturnCtx(input);
					addIssueToContext(ctx, {
						code: ZodIssueCode.invalid_type,
						expected: ZodParsedType.date,
						received: ctx.parsedType
					});
					return INVALID;
				}
				if (Number.isNaN(input.data.getTime())) {
					addIssueToContext(this._getOrReturnCtx(input), { code: ZodIssueCode.invalid_date });
					return INVALID;
				}
				const status = new ParseStatus();
				let ctx = void 0;
				for (const check of this._def.checks) if (check.kind === "min") {
					if (input.data.getTime() < check.value) {
						ctx = this._getOrReturnCtx(input, ctx);
						addIssueToContext(ctx, {
							code: ZodIssueCode.too_small,
							message: check.message,
							inclusive: true,
							exact: false,
							minimum: check.value,
							type: "date"
						});
						status.dirty();
					}
				} else if (check.kind === "max") {
					if (input.data.getTime() > check.value) {
						ctx = this._getOrReturnCtx(input, ctx);
						addIssueToContext(ctx, {
							code: ZodIssueCode.too_big,
							message: check.message,
							inclusive: true,
							exact: false,
							maximum: check.value,
							type: "date"
						});
						status.dirty();
					}
				} else util.assertNever(check);
				return {
					status: status.value,
					value: new Date(input.data.getTime())
				};
			}
			_addCheck(check) {
				return new ZodDate({
					...this._def,
					checks: [...this._def.checks, check]
				});
			}
			min(minDate, message) {
				return this._addCheck({
					kind: "min",
					value: minDate.getTime(),
					message: errorUtil.toString(message)
				});
			}
			max(maxDate, message) {
				return this._addCheck({
					kind: "max",
					value: maxDate.getTime(),
					message: errorUtil.toString(message)
				});
			}
			get minDate() {
				let min = null;
				for (const ch of this._def.checks) if (ch.kind === "min") {
					if (min === null || ch.value > min) min = ch.value;
				}
				return min != null ? new Date(min) : null;
			}
			get maxDate() {
				let max = null;
				for (const ch of this._def.checks) if (ch.kind === "max") {
					if (max === null || ch.value < max) max = ch.value;
				}
				return max != null ? new Date(max) : null;
			}
		};
		ZodDate.create = (params) => {
			return new ZodDate({
				checks: [],
				coerce: params?.coerce || false,
				typeName: ZodFirstPartyTypeKind.ZodDate,
				...processCreateParams(params)
			});
		};
		var ZodSymbol = class extends ZodType {
			_parse(input) {
				if (this._getType(input) !== ZodParsedType.symbol) {
					const ctx = this._getOrReturnCtx(input);
					addIssueToContext(ctx, {
						code: ZodIssueCode.invalid_type,
						expected: ZodParsedType.symbol,
						received: ctx.parsedType
					});
					return INVALID;
				}
				return OK(input.data);
			}
		};
		ZodSymbol.create = (params) => {
			return new ZodSymbol({
				typeName: ZodFirstPartyTypeKind.ZodSymbol,
				...processCreateParams(params)
			});
		};
		var ZodUndefined = class extends ZodType {
			_parse(input) {
				if (this._getType(input) !== ZodParsedType.undefined) {
					const ctx = this._getOrReturnCtx(input);
					addIssueToContext(ctx, {
						code: ZodIssueCode.invalid_type,
						expected: ZodParsedType.undefined,
						received: ctx.parsedType
					});
					return INVALID;
				}
				return OK(input.data);
			}
		};
		ZodUndefined.create = (params) => {
			return new ZodUndefined({
				typeName: ZodFirstPartyTypeKind.ZodUndefined,
				...processCreateParams(params)
			});
		};
		var ZodNull = class extends ZodType {
			_parse(input) {
				if (this._getType(input) !== ZodParsedType.null) {
					const ctx = this._getOrReturnCtx(input);
					addIssueToContext(ctx, {
						code: ZodIssueCode.invalid_type,
						expected: ZodParsedType.null,
						received: ctx.parsedType
					});
					return INVALID;
				}
				return OK(input.data);
			}
		};
		ZodNull.create = (params) => {
			return new ZodNull({
				typeName: ZodFirstPartyTypeKind.ZodNull,
				...processCreateParams(params)
			});
		};
		var ZodAny = class extends ZodType {
			constructor() {
				super(...arguments);
				this._any = true;
			}
			_parse(input) {
				return OK(input.data);
			}
		};
		ZodAny.create = (params) => {
			return new ZodAny({
				typeName: ZodFirstPartyTypeKind.ZodAny,
				...processCreateParams(params)
			});
		};
		var ZodUnknown = class extends ZodType {
			constructor() {
				super(...arguments);
				this._unknown = true;
			}
			_parse(input) {
				return OK(input.data);
			}
		};
		ZodUnknown.create = (params) => {
			return new ZodUnknown({
				typeName: ZodFirstPartyTypeKind.ZodUnknown,
				...processCreateParams(params)
			});
		};
		var ZodNever = class extends ZodType {
			_parse(input) {
				const ctx = this._getOrReturnCtx(input);
				addIssueToContext(ctx, {
					code: ZodIssueCode.invalid_type,
					expected: ZodParsedType.never,
					received: ctx.parsedType
				});
				return INVALID;
			}
		};
		ZodNever.create = (params) => {
			return new ZodNever({
				typeName: ZodFirstPartyTypeKind.ZodNever,
				...processCreateParams(params)
			});
		};
		var ZodVoid = class extends ZodType {
			_parse(input) {
				if (this._getType(input) !== ZodParsedType.undefined) {
					const ctx = this._getOrReturnCtx(input);
					addIssueToContext(ctx, {
						code: ZodIssueCode.invalid_type,
						expected: ZodParsedType.void,
						received: ctx.parsedType
					});
					return INVALID;
				}
				return OK(input.data);
			}
		};
		ZodVoid.create = (params) => {
			return new ZodVoid({
				typeName: ZodFirstPartyTypeKind.ZodVoid,
				...processCreateParams(params)
			});
		};
		var ZodArray = class ZodArray extends ZodType {
			_parse(input) {
				const { ctx, status } = this._processInputParams(input);
				const def = this._def;
				if (ctx.parsedType !== ZodParsedType.array) {
					addIssueToContext(ctx, {
						code: ZodIssueCode.invalid_type,
						expected: ZodParsedType.array,
						received: ctx.parsedType
					});
					return INVALID;
				}
				if (def.exactLength !== null) {
					const tooBig = ctx.data.length > def.exactLength.value;
					const tooSmall = ctx.data.length < def.exactLength.value;
					if (tooBig || tooSmall) {
						addIssueToContext(ctx, {
							code: tooBig ? ZodIssueCode.too_big : ZodIssueCode.too_small,
							minimum: tooSmall ? def.exactLength.value : void 0,
							maximum: tooBig ? def.exactLength.value : void 0,
							type: "array",
							inclusive: true,
							exact: true,
							message: def.exactLength.message
						});
						status.dirty();
					}
				}
				if (def.minLength !== null) {
					if (ctx.data.length < def.minLength.value) {
						addIssueToContext(ctx, {
							code: ZodIssueCode.too_small,
							minimum: def.minLength.value,
							type: "array",
							inclusive: true,
							exact: false,
							message: def.minLength.message
						});
						status.dirty();
					}
				}
				if (def.maxLength !== null) {
					if (ctx.data.length > def.maxLength.value) {
						addIssueToContext(ctx, {
							code: ZodIssueCode.too_big,
							maximum: def.maxLength.value,
							type: "array",
							inclusive: true,
							exact: false,
							message: def.maxLength.message
						});
						status.dirty();
					}
				}
				if (ctx.common.async) return Promise.all([...ctx.data].map((item, i) => {
					return def.type._parseAsync(new ParseInputLazyPath(ctx, item, ctx.path, i));
				})).then((result) => {
					return ParseStatus.mergeArray(status, result);
				});
				const result = [...ctx.data].map((item, i) => {
					return def.type._parseSync(new ParseInputLazyPath(ctx, item, ctx.path, i));
				});
				return ParseStatus.mergeArray(status, result);
			}
			get element() {
				return this._def.type;
			}
			min(minLength, message) {
				return new ZodArray({
					...this._def,
					minLength: {
						value: minLength,
						message: errorUtil.toString(message)
					}
				});
			}
			max(maxLength, message) {
				return new ZodArray({
					...this._def,
					maxLength: {
						value: maxLength,
						message: errorUtil.toString(message)
					}
				});
			}
			length(len, message) {
				return new ZodArray({
					...this._def,
					exactLength: {
						value: len,
						message: errorUtil.toString(message)
					}
				});
			}
			nonempty(message) {
				return this.min(1, message);
			}
		};
		ZodArray.create = (schema, params) => {
			return new ZodArray({
				type: schema,
				minLength: null,
				maxLength: null,
				exactLength: null,
				typeName: ZodFirstPartyTypeKind.ZodArray,
				...processCreateParams(params)
			});
		};
		function deepPartialify(schema) {
			if (schema instanceof ZodObject) {
				const newShape = {};
				for (const key in schema.shape) {
					const fieldSchema = schema.shape[key];
					newShape[key] = ZodOptional.create(deepPartialify(fieldSchema));
				}
				return new ZodObject({
					...schema._def,
					shape: () => newShape
				});
			} else if (schema instanceof ZodArray) return new ZodArray({
				...schema._def,
				type: deepPartialify(schema.element)
			});
			else if (schema instanceof ZodOptional) return ZodOptional.create(deepPartialify(schema.unwrap()));
			else if (schema instanceof ZodNullable) return ZodNullable.create(deepPartialify(schema.unwrap()));
			else if (schema instanceof ZodTuple) return ZodTuple.create(schema.items.map((item) => deepPartialify(item)));
			else return schema;
		}
		var ZodObject = class ZodObject extends ZodType {
			constructor() {
				super(...arguments);
				this._cached = null;
				/**
				* @deprecated In most cases, this is no longer needed - unknown properties are now silently stripped.
				* If you want to pass through unknown properties, use `.passthrough()` instead.
				*/
				this.nonstrict = this.passthrough;
				/**
				* @deprecated Use `.extend` instead
				*  */
				this.augment = this.extend;
			}
			_getCached() {
				if (this._cached !== null) return this._cached;
				const shape = this._def.shape();
				const keys = util.objectKeys(shape);
				this._cached = {
					shape,
					keys
				};
				return this._cached;
			}
			_parse(input) {
				if (this._getType(input) !== ZodParsedType.object) {
					const ctx = this._getOrReturnCtx(input);
					addIssueToContext(ctx, {
						code: ZodIssueCode.invalid_type,
						expected: ZodParsedType.object,
						received: ctx.parsedType
					});
					return INVALID;
				}
				const { status, ctx } = this._processInputParams(input);
				const { shape, keys: shapeKeys } = this._getCached();
				const extraKeys = [];
				if (!(this._def.catchall instanceof ZodNever && this._def.unknownKeys === "strip")) {
					for (const key in ctx.data) if (!shapeKeys.includes(key)) extraKeys.push(key);
				}
				const pairs = [];
				for (const key of shapeKeys) {
					const keyValidator = shape[key];
					const value = ctx.data[key];
					pairs.push({
						key: {
							status: "valid",
							value: key
						},
						value: keyValidator._parse(new ParseInputLazyPath(ctx, value, ctx.path, key)),
						alwaysSet: key in ctx.data
					});
				}
				if (this._def.catchall instanceof ZodNever) {
					const unknownKeys = this._def.unknownKeys;
					if (unknownKeys === "passthrough") for (const key of extraKeys) pairs.push({
						key: {
							status: "valid",
							value: key
						},
						value: {
							status: "valid",
							value: ctx.data[key]
						}
					});
					else if (unknownKeys === "strict") {
						if (extraKeys.length > 0) {
							addIssueToContext(ctx, {
								code: ZodIssueCode.unrecognized_keys,
								keys: extraKeys
							});
							status.dirty();
						}
					} else if (unknownKeys === "strip") {} else throw new Error(`Internal ZodObject error: invalid unknownKeys value.`);
				} else {
					const catchall = this._def.catchall;
					for (const key of extraKeys) {
						const value = ctx.data[key];
						pairs.push({
							key: {
								status: "valid",
								value: key
							},
							value: catchall._parse(new ParseInputLazyPath(ctx, value, ctx.path, key)),
							alwaysSet: key in ctx.data
						});
					}
				}
				if (ctx.common.async) return Promise.resolve().then(async () => {
					const syncPairs = [];
					for (const pair of pairs) {
						const key = await pair.key;
						const value = await pair.value;
						syncPairs.push({
							key,
							value,
							alwaysSet: pair.alwaysSet
						});
					}
					return syncPairs;
				}).then((syncPairs) => {
					return ParseStatus.mergeObjectSync(status, syncPairs);
				});
				else return ParseStatus.mergeObjectSync(status, pairs);
			}
			get shape() {
				return this._def.shape();
			}
			strict(message) {
				errorUtil.errToObj;
				return new ZodObject({
					...this._def,
					unknownKeys: "strict",
					...message !== void 0 ? { errorMap: (issue, ctx) => {
						const defaultError = this._def.errorMap?.(issue, ctx).message ?? ctx.defaultError;
						if (issue.code === "unrecognized_keys") return { message: errorUtil.errToObj(message).message ?? defaultError };
						return { message: defaultError };
					} } : {}
				});
			}
			strip() {
				return new ZodObject({
					...this._def,
					unknownKeys: "strip"
				});
			}
			passthrough() {
				return new ZodObject({
					...this._def,
					unknownKeys: "passthrough"
				});
			}
			extend(augmentation) {
				return new ZodObject({
					...this._def,
					shape: () => ({
						...this._def.shape(),
						...augmentation
					})
				});
			}
			/**
			* Prior to zod@1.0.12 there was a bug in the
			* inferred type of merged objects. Please
			* upgrade if you are experiencing issues.
			*/
			merge(merging) {
				return new ZodObject({
					unknownKeys: merging._def.unknownKeys,
					catchall: merging._def.catchall,
					shape: () => ({
						...this._def.shape(),
						...merging._def.shape()
					}),
					typeName: ZodFirstPartyTypeKind.ZodObject
				});
			}
			setKey(key, schema) {
				return this.augment({ [key]: schema });
			}
			catchall(index) {
				return new ZodObject({
					...this._def,
					catchall: index
				});
			}
			pick(mask) {
				const shape = {};
				for (const key of util.objectKeys(mask)) if (mask[key] && this.shape[key]) shape[key] = this.shape[key];
				return new ZodObject({
					...this._def,
					shape: () => shape
				});
			}
			omit(mask) {
				const shape = {};
				for (const key of util.objectKeys(this.shape)) if (!mask[key]) shape[key] = this.shape[key];
				return new ZodObject({
					...this._def,
					shape: () => shape
				});
			}
			/**
			* @deprecated
			*/
			deepPartial() {
				return deepPartialify(this);
			}
			partial(mask) {
				const newShape = {};
				for (const key of util.objectKeys(this.shape)) {
					const fieldSchema = this.shape[key];
					if (mask && !mask[key]) newShape[key] = fieldSchema;
					else newShape[key] = fieldSchema.optional();
				}
				return new ZodObject({
					...this._def,
					shape: () => newShape
				});
			}
			required(mask) {
				const newShape = {};
				for (const key of util.objectKeys(this.shape)) if (mask && !mask[key]) newShape[key] = this.shape[key];
				else {
					let newField = this.shape[key];
					while (newField instanceof ZodOptional) newField = newField._def.innerType;
					newShape[key] = newField;
				}
				return new ZodObject({
					...this._def,
					shape: () => newShape
				});
			}
			keyof() {
				return createZodEnum(util.objectKeys(this.shape));
			}
		};
		ZodObject.create = (shape, params) => {
			return new ZodObject({
				shape: () => shape,
				unknownKeys: "strip",
				catchall: ZodNever.create(),
				typeName: ZodFirstPartyTypeKind.ZodObject,
				...processCreateParams(params)
			});
		};
		ZodObject.strictCreate = (shape, params) => {
			return new ZodObject({
				shape: () => shape,
				unknownKeys: "strict",
				catchall: ZodNever.create(),
				typeName: ZodFirstPartyTypeKind.ZodObject,
				...processCreateParams(params)
			});
		};
		ZodObject.lazycreate = (shape, params) => {
			return new ZodObject({
				shape,
				unknownKeys: "strip",
				catchall: ZodNever.create(),
				typeName: ZodFirstPartyTypeKind.ZodObject,
				...processCreateParams(params)
			});
		};
		var ZodUnion = class extends ZodType {
			_parse(input) {
				const { ctx } = this._processInputParams(input);
				const options = this._def.options;
				function handleResults(results) {
					for (const result of results) if (result.result.status === "valid") return result.result;
					for (const result of results) if (result.result.status === "dirty") {
						ctx.common.issues.push(...result.ctx.common.issues);
						return result.result;
					}
					const unionErrors = results.map((result) => new ZodError(result.ctx.common.issues));
					addIssueToContext(ctx, {
						code: ZodIssueCode.invalid_union,
						unionErrors
					});
					return INVALID;
				}
				if (ctx.common.async) return Promise.all(options.map(async (option) => {
					const childCtx = {
						...ctx,
						common: {
							...ctx.common,
							issues: []
						},
						parent: null
					};
					return {
						result: await option._parseAsync({
							data: ctx.data,
							path: ctx.path,
							parent: childCtx
						}),
						ctx: childCtx
					};
				})).then(handleResults);
				else {
					let dirty = void 0;
					const issues = [];
					for (const option of options) {
						const childCtx = {
							...ctx,
							common: {
								...ctx.common,
								issues: []
							},
							parent: null
						};
						const result = option._parseSync({
							data: ctx.data,
							path: ctx.path,
							parent: childCtx
						});
						if (result.status === "valid") return result;
						else if (result.status === "dirty" && !dirty) dirty = {
							result,
							ctx: childCtx
						};
						if (childCtx.common.issues.length) issues.push(childCtx.common.issues);
					}
					if (dirty) {
						ctx.common.issues.push(...dirty.ctx.common.issues);
						return dirty.result;
					}
					const unionErrors = issues.map((issues) => new ZodError(issues));
					addIssueToContext(ctx, {
						code: ZodIssueCode.invalid_union,
						unionErrors
					});
					return INVALID;
				}
			}
			get options() {
				return this._def.options;
			}
		};
		ZodUnion.create = (types, params) => {
			return new ZodUnion({
				options: types,
				typeName: ZodFirstPartyTypeKind.ZodUnion,
				...processCreateParams(params)
			});
		};
		const getDiscriminator = (type) => {
			if (type instanceof ZodLazy) return getDiscriminator(type.schema);
			else if (type instanceof ZodEffects) return getDiscriminator(type.innerType());
			else if (type instanceof ZodLiteral) return [type.value];
			else if (type instanceof ZodEnum) return type.options;
			else if (type instanceof ZodNativeEnum) return util.objectValues(type.enum);
			else if (type instanceof ZodDefault) return getDiscriminator(type._def.innerType);
			else if (type instanceof ZodUndefined) return [void 0];
			else if (type instanceof ZodNull) return [null];
			else if (type instanceof ZodOptional) return [void 0, ...getDiscriminator(type.unwrap())];
			else if (type instanceof ZodNullable) return [null, ...getDiscriminator(type.unwrap())];
			else if (type instanceof ZodBranded) return getDiscriminator(type.unwrap());
			else if (type instanceof ZodReadonly) return getDiscriminator(type.unwrap());
			else if (type instanceof ZodCatch) return getDiscriminator(type._def.innerType);
			else return [];
		};
		var ZodDiscriminatedUnion = class ZodDiscriminatedUnion extends ZodType {
			_parse(input) {
				const { ctx } = this._processInputParams(input);
				if (ctx.parsedType !== ZodParsedType.object) {
					addIssueToContext(ctx, {
						code: ZodIssueCode.invalid_type,
						expected: ZodParsedType.object,
						received: ctx.parsedType
					});
					return INVALID;
				}
				const discriminator = this.discriminator;
				const discriminatorValue = ctx.data[discriminator];
				const option = this.optionsMap.get(discriminatorValue);
				if (!option) {
					addIssueToContext(ctx, {
						code: ZodIssueCode.invalid_union_discriminator,
						options: Array.from(this.optionsMap.keys()),
						path: [discriminator]
					});
					return INVALID;
				}
				if (ctx.common.async) return option._parseAsync({
					data: ctx.data,
					path: ctx.path,
					parent: ctx
				});
				else return option._parseSync({
					data: ctx.data,
					path: ctx.path,
					parent: ctx
				});
			}
			get discriminator() {
				return this._def.discriminator;
			}
			get options() {
				return this._def.options;
			}
			get optionsMap() {
				return this._def.optionsMap;
			}
			/**
			* The constructor of the discriminated union schema. Its behaviour is very similar to that of the normal z.union() constructor.
			* However, it only allows a union of objects, all of which need to share a discriminator property. This property must
			* have a different value for each object in the union.
			* @param discriminator the name of the discriminator property
			* @param types an array of object schemas
			* @param params
			*/
			static create(discriminator, options, params) {
				const optionsMap = /* @__PURE__ */ new Map();
				for (const type of options) {
					const discriminatorValues = getDiscriminator(type.shape[discriminator]);
					if (!discriminatorValues.length) throw new Error(`A discriminator value for key \`${discriminator}\` could not be extracted from all schema options`);
					for (const value of discriminatorValues) {
						if (optionsMap.has(value)) throw new Error(`Discriminator property ${String(discriminator)} has duplicate value ${String(value)}`);
						optionsMap.set(value, type);
					}
				}
				return new ZodDiscriminatedUnion({
					typeName: ZodFirstPartyTypeKind.ZodDiscriminatedUnion,
					discriminator,
					options,
					optionsMap,
					...processCreateParams(params)
				});
			}
		};
		function mergeValues(a, b) {
			const aType = getParsedType(a);
			const bType = getParsedType(b);
			if (a === b) return {
				valid: true,
				data: a
			};
			else if (aType === ZodParsedType.object && bType === ZodParsedType.object) {
				const bKeys = util.objectKeys(b);
				const sharedKeys = util.objectKeys(a).filter((key) => bKeys.indexOf(key) !== -1);
				const newObj = {
					...a,
					...b
				};
				for (const key of sharedKeys) {
					const sharedValue = mergeValues(a[key], b[key]);
					if (!sharedValue.valid) return { valid: false };
					newObj[key] = sharedValue.data;
				}
				return {
					valid: true,
					data: newObj
				};
			} else if (aType === ZodParsedType.array && bType === ZodParsedType.array) {
				if (a.length !== b.length) return { valid: false };
				const newArray = [];
				for (let index = 0; index < a.length; index++) {
					const itemA = a[index];
					const itemB = b[index];
					const sharedValue = mergeValues(itemA, itemB);
					if (!sharedValue.valid) return { valid: false };
					newArray.push(sharedValue.data);
				}
				return {
					valid: true,
					data: newArray
				};
			} else if (aType === ZodParsedType.date && bType === ZodParsedType.date && +a === +b) return {
				valid: true,
				data: a
			};
			else return { valid: false };
		}
		var ZodIntersection = class extends ZodType {
			_parse(input) {
				const { status, ctx } = this._processInputParams(input);
				const handleParsed = (parsedLeft, parsedRight) => {
					if (isAborted(parsedLeft) || isAborted(parsedRight)) return INVALID;
					const merged = mergeValues(parsedLeft.value, parsedRight.value);
					if (!merged.valid) {
						addIssueToContext(ctx, { code: ZodIssueCode.invalid_intersection_types });
						return INVALID;
					}
					if (isDirty(parsedLeft) || isDirty(parsedRight)) status.dirty();
					return {
						status: status.value,
						value: merged.data
					};
				};
				if (ctx.common.async) return Promise.all([this._def.left._parseAsync({
					data: ctx.data,
					path: ctx.path,
					parent: ctx
				}), this._def.right._parseAsync({
					data: ctx.data,
					path: ctx.path,
					parent: ctx
				})]).then(([left, right]) => handleParsed(left, right));
				else return handleParsed(this._def.left._parseSync({
					data: ctx.data,
					path: ctx.path,
					parent: ctx
				}), this._def.right._parseSync({
					data: ctx.data,
					path: ctx.path,
					parent: ctx
				}));
			}
		};
		ZodIntersection.create = (left, right, params) => {
			return new ZodIntersection({
				left,
				right,
				typeName: ZodFirstPartyTypeKind.ZodIntersection,
				...processCreateParams(params)
			});
		};
		var ZodTuple = class ZodTuple extends ZodType {
			_parse(input) {
				const { status, ctx } = this._processInputParams(input);
				if (ctx.parsedType !== ZodParsedType.array) {
					addIssueToContext(ctx, {
						code: ZodIssueCode.invalid_type,
						expected: ZodParsedType.array,
						received: ctx.parsedType
					});
					return INVALID;
				}
				if (ctx.data.length < this._def.items.length) {
					addIssueToContext(ctx, {
						code: ZodIssueCode.too_small,
						minimum: this._def.items.length,
						inclusive: true,
						exact: false,
						type: "array"
					});
					return INVALID;
				}
				if (!this._def.rest && ctx.data.length > this._def.items.length) {
					addIssueToContext(ctx, {
						code: ZodIssueCode.too_big,
						maximum: this._def.items.length,
						inclusive: true,
						exact: false,
						type: "array"
					});
					status.dirty();
				}
				const items = [...ctx.data].map((item, itemIndex) => {
					const schema = this._def.items[itemIndex] || this._def.rest;
					if (!schema) return null;
					return schema._parse(new ParseInputLazyPath(ctx, item, ctx.path, itemIndex));
				}).filter((x) => !!x);
				if (ctx.common.async) return Promise.all(items).then((results) => {
					return ParseStatus.mergeArray(status, results);
				});
				else return ParseStatus.mergeArray(status, items);
			}
			get items() {
				return this._def.items;
			}
			rest(rest) {
				return new ZodTuple({
					...this._def,
					rest
				});
			}
		};
		ZodTuple.create = (schemas, params) => {
			if (!Array.isArray(schemas)) throw new Error("You must pass an array of schemas to z.tuple([ ... ])");
			return new ZodTuple({
				items: schemas,
				typeName: ZodFirstPartyTypeKind.ZodTuple,
				rest: null,
				...processCreateParams(params)
			});
		};
		var ZodRecord = class ZodRecord extends ZodType {
			get keySchema() {
				return this._def.keyType;
			}
			get valueSchema() {
				return this._def.valueType;
			}
			_parse(input) {
				const { status, ctx } = this._processInputParams(input);
				if (ctx.parsedType !== ZodParsedType.object) {
					addIssueToContext(ctx, {
						code: ZodIssueCode.invalid_type,
						expected: ZodParsedType.object,
						received: ctx.parsedType
					});
					return INVALID;
				}
				const pairs = [];
				const keyType = this._def.keyType;
				const valueType = this._def.valueType;
				for (const key in ctx.data) pairs.push({
					key: keyType._parse(new ParseInputLazyPath(ctx, key, ctx.path, key)),
					value: valueType._parse(new ParseInputLazyPath(ctx, ctx.data[key], ctx.path, key)),
					alwaysSet: key in ctx.data
				});
				if (ctx.common.async) return ParseStatus.mergeObjectAsync(status, pairs);
				else return ParseStatus.mergeObjectSync(status, pairs);
			}
			get element() {
				return this._def.valueType;
			}
			static create(first, second, third) {
				if (second instanceof ZodType) return new ZodRecord({
					keyType: first,
					valueType: second,
					typeName: ZodFirstPartyTypeKind.ZodRecord,
					...processCreateParams(third)
				});
				return new ZodRecord({
					keyType: ZodString.create(),
					valueType: first,
					typeName: ZodFirstPartyTypeKind.ZodRecord,
					...processCreateParams(second)
				});
			}
		};
		var ZodMap = class extends ZodType {
			get keySchema() {
				return this._def.keyType;
			}
			get valueSchema() {
				return this._def.valueType;
			}
			_parse(input) {
				const { status, ctx } = this._processInputParams(input);
				if (ctx.parsedType !== ZodParsedType.map) {
					addIssueToContext(ctx, {
						code: ZodIssueCode.invalid_type,
						expected: ZodParsedType.map,
						received: ctx.parsedType
					});
					return INVALID;
				}
				const keyType = this._def.keyType;
				const valueType = this._def.valueType;
				const pairs = [...ctx.data.entries()].map(([key, value], index) => {
					return {
						key: keyType._parse(new ParseInputLazyPath(ctx, key, ctx.path, [index, "key"])),
						value: valueType._parse(new ParseInputLazyPath(ctx, value, ctx.path, [index, "value"]))
					};
				});
				if (ctx.common.async) {
					const finalMap = /* @__PURE__ */ new Map();
					return Promise.resolve().then(async () => {
						for (const pair of pairs) {
							const key = await pair.key;
							const value = await pair.value;
							if (key.status === "aborted" || value.status === "aborted") return INVALID;
							if (key.status === "dirty" || value.status === "dirty") status.dirty();
							finalMap.set(key.value, value.value);
						}
						return {
							status: status.value,
							value: finalMap
						};
					});
				} else {
					const finalMap = /* @__PURE__ */ new Map();
					for (const pair of pairs) {
						const key = pair.key;
						const value = pair.value;
						if (key.status === "aborted" || value.status === "aborted") return INVALID;
						if (key.status === "dirty" || value.status === "dirty") status.dirty();
						finalMap.set(key.value, value.value);
					}
					return {
						status: status.value,
						value: finalMap
					};
				}
			}
		};
		ZodMap.create = (keyType, valueType, params) => {
			return new ZodMap({
				valueType,
				keyType,
				typeName: ZodFirstPartyTypeKind.ZodMap,
				...processCreateParams(params)
			});
		};
		var ZodSet = class ZodSet extends ZodType {
			_parse(input) {
				const { status, ctx } = this._processInputParams(input);
				if (ctx.parsedType !== ZodParsedType.set) {
					addIssueToContext(ctx, {
						code: ZodIssueCode.invalid_type,
						expected: ZodParsedType.set,
						received: ctx.parsedType
					});
					return INVALID;
				}
				const def = this._def;
				if (def.minSize !== null) {
					if (ctx.data.size < def.minSize.value) {
						addIssueToContext(ctx, {
							code: ZodIssueCode.too_small,
							minimum: def.minSize.value,
							type: "set",
							inclusive: true,
							exact: false,
							message: def.minSize.message
						});
						status.dirty();
					}
				}
				if (def.maxSize !== null) {
					if (ctx.data.size > def.maxSize.value) {
						addIssueToContext(ctx, {
							code: ZodIssueCode.too_big,
							maximum: def.maxSize.value,
							type: "set",
							inclusive: true,
							exact: false,
							message: def.maxSize.message
						});
						status.dirty();
					}
				}
				const valueType = this._def.valueType;
				function finalizeSet(elements) {
					const parsedSet = /* @__PURE__ */ new Set();
					for (const element of elements) {
						if (element.status === "aborted") return INVALID;
						if (element.status === "dirty") status.dirty();
						parsedSet.add(element.value);
					}
					return {
						status: status.value,
						value: parsedSet
					};
				}
				const elements = [...ctx.data.values()].map((item, i) => valueType._parse(new ParseInputLazyPath(ctx, item, ctx.path, i)));
				if (ctx.common.async) return Promise.all(elements).then((elements) => finalizeSet(elements));
				else return finalizeSet(elements);
			}
			min(minSize, message) {
				return new ZodSet({
					...this._def,
					minSize: {
						value: minSize,
						message: errorUtil.toString(message)
					}
				});
			}
			max(maxSize, message) {
				return new ZodSet({
					...this._def,
					maxSize: {
						value: maxSize,
						message: errorUtil.toString(message)
					}
				});
			}
			size(size, message) {
				return this.min(size, message).max(size, message);
			}
			nonempty(message) {
				return this.min(1, message);
			}
		};
		ZodSet.create = (valueType, params) => {
			return new ZodSet({
				valueType,
				minSize: null,
				maxSize: null,
				typeName: ZodFirstPartyTypeKind.ZodSet,
				...processCreateParams(params)
			});
		};
		var ZodFunction = class ZodFunction extends ZodType {
			constructor() {
				super(...arguments);
				this.validate = this.implement;
			}
			_parse(input) {
				const { ctx } = this._processInputParams(input);
				if (ctx.parsedType !== ZodParsedType.function) {
					addIssueToContext(ctx, {
						code: ZodIssueCode.invalid_type,
						expected: ZodParsedType.function,
						received: ctx.parsedType
					});
					return INVALID;
				}
				function makeArgsIssue(args, error) {
					return makeIssue({
						data: args,
						path: ctx.path,
						errorMaps: [
							ctx.common.contextualErrorMap,
							ctx.schemaErrorMap,
							getErrorMap(),
							errorMap
						].filter((x) => !!x),
						issueData: {
							code: ZodIssueCode.invalid_arguments,
							argumentsError: error
						}
					});
				}
				function makeReturnsIssue(returns, error) {
					return makeIssue({
						data: returns,
						path: ctx.path,
						errorMaps: [
							ctx.common.contextualErrorMap,
							ctx.schemaErrorMap,
							getErrorMap(),
							errorMap
						].filter((x) => !!x),
						issueData: {
							code: ZodIssueCode.invalid_return_type,
							returnTypeError: error
						}
					});
				}
				const params = { errorMap: ctx.common.contextualErrorMap };
				const fn = ctx.data;
				if (this._def.returns instanceof ZodPromise) {
					const me = this;
					return OK(async function(...args) {
						const error = new ZodError([]);
						const parsedArgs = await me._def.args.parseAsync(args, params).catch((e) => {
							error.addIssue(makeArgsIssue(args, e));
							throw error;
						});
						const result = await Reflect.apply(fn, this, parsedArgs);
						return await me._def.returns._def.type.parseAsync(result, params).catch((e) => {
							error.addIssue(makeReturnsIssue(result, e));
							throw error;
						});
					});
				} else {
					const me = this;
					return OK(function(...args) {
						const parsedArgs = me._def.args.safeParse(args, params);
						if (!parsedArgs.success) throw new ZodError([makeArgsIssue(args, parsedArgs.error)]);
						const result = Reflect.apply(fn, this, parsedArgs.data);
						const parsedReturns = me._def.returns.safeParse(result, params);
						if (!parsedReturns.success) throw new ZodError([makeReturnsIssue(result, parsedReturns.error)]);
						return parsedReturns.data;
					});
				}
			}
			parameters() {
				return this._def.args;
			}
			returnType() {
				return this._def.returns;
			}
			args(...items) {
				return new ZodFunction({
					...this._def,
					args: ZodTuple.create(items).rest(ZodUnknown.create())
				});
			}
			returns(returnType) {
				return new ZodFunction({
					...this._def,
					returns: returnType
				});
			}
			implement(func) {
				return this.parse(func);
			}
			strictImplement(func) {
				return this.parse(func);
			}
			static create(args, returns, params) {
				return new ZodFunction({
					args: args ? args : ZodTuple.create([]).rest(ZodUnknown.create()),
					returns: returns || ZodUnknown.create(),
					typeName: ZodFirstPartyTypeKind.ZodFunction,
					...processCreateParams(params)
				});
			}
		};
		var ZodLazy = class extends ZodType {
			get schema() {
				return this._def.getter();
			}
			_parse(input) {
				const { ctx } = this._processInputParams(input);
				return this._def.getter()._parse({
					data: ctx.data,
					path: ctx.path,
					parent: ctx
				});
			}
		};
		ZodLazy.create = (getter, params) => {
			return new ZodLazy({
				getter,
				typeName: ZodFirstPartyTypeKind.ZodLazy,
				...processCreateParams(params)
			});
		};
		var ZodLiteral = class extends ZodType {
			_parse(input) {
				if (input.data !== this._def.value) {
					const ctx = this._getOrReturnCtx(input);
					addIssueToContext(ctx, {
						received: ctx.data,
						code: ZodIssueCode.invalid_literal,
						expected: this._def.value
					});
					return INVALID;
				}
				return {
					status: "valid",
					value: input.data
				};
			}
			get value() {
				return this._def.value;
			}
		};
		ZodLiteral.create = (value, params) => {
			return new ZodLiteral({
				value,
				typeName: ZodFirstPartyTypeKind.ZodLiteral,
				...processCreateParams(params)
			});
		};
		function createZodEnum(values, params) {
			return new ZodEnum({
				values,
				typeName: ZodFirstPartyTypeKind.ZodEnum,
				...processCreateParams(params)
			});
		}
		var ZodEnum = class ZodEnum extends ZodType {
			_parse(input) {
				if (typeof input.data !== "string") {
					const ctx = this._getOrReturnCtx(input);
					const expectedValues = this._def.values;
					addIssueToContext(ctx, {
						expected: util.joinValues(expectedValues),
						received: ctx.parsedType,
						code: ZodIssueCode.invalid_type
					});
					return INVALID;
				}
				if (!this._cache) this._cache = new Set(this._def.values);
				if (!this._cache.has(input.data)) {
					const ctx = this._getOrReturnCtx(input);
					const expectedValues = this._def.values;
					addIssueToContext(ctx, {
						received: ctx.data,
						code: ZodIssueCode.invalid_enum_value,
						options: expectedValues
					});
					return INVALID;
				}
				return OK(input.data);
			}
			get options() {
				return this._def.values;
			}
			get enum() {
				const enumValues = {};
				for (const val of this._def.values) enumValues[val] = val;
				return enumValues;
			}
			get Values() {
				const enumValues = {};
				for (const val of this._def.values) enumValues[val] = val;
				return enumValues;
			}
			get Enum() {
				const enumValues = {};
				for (const val of this._def.values) enumValues[val] = val;
				return enumValues;
			}
			extract(values, newDef = this._def) {
				return ZodEnum.create(values, {
					...this._def,
					...newDef
				});
			}
			exclude(values, newDef = this._def) {
				return ZodEnum.create(this.options.filter((opt) => !values.includes(opt)), {
					...this._def,
					...newDef
				});
			}
		};
		ZodEnum.create = createZodEnum;
		var ZodNativeEnum = class extends ZodType {
			_parse(input) {
				const nativeEnumValues = util.getValidEnumValues(this._def.values);
				const ctx = this._getOrReturnCtx(input);
				if (ctx.parsedType !== ZodParsedType.string && ctx.parsedType !== ZodParsedType.number) {
					const expectedValues = util.objectValues(nativeEnumValues);
					addIssueToContext(ctx, {
						expected: util.joinValues(expectedValues),
						received: ctx.parsedType,
						code: ZodIssueCode.invalid_type
					});
					return INVALID;
				}
				if (!this._cache) this._cache = new Set(util.getValidEnumValues(this._def.values));
				if (!this._cache.has(input.data)) {
					const expectedValues = util.objectValues(nativeEnumValues);
					addIssueToContext(ctx, {
						received: ctx.data,
						code: ZodIssueCode.invalid_enum_value,
						options: expectedValues
					});
					return INVALID;
				}
				return OK(input.data);
			}
			get enum() {
				return this._def.values;
			}
		};
		ZodNativeEnum.create = (values, params) => {
			return new ZodNativeEnum({
				values,
				typeName: ZodFirstPartyTypeKind.ZodNativeEnum,
				...processCreateParams(params)
			});
		};
		var ZodPromise = class extends ZodType {
			unwrap() {
				return this._def.type;
			}
			_parse(input) {
				const { ctx } = this._processInputParams(input);
				if (ctx.parsedType !== ZodParsedType.promise && ctx.common.async === false) {
					addIssueToContext(ctx, {
						code: ZodIssueCode.invalid_type,
						expected: ZodParsedType.promise,
						received: ctx.parsedType
					});
					return INVALID;
				}
				const promisified = ctx.parsedType === ZodParsedType.promise ? ctx.data : Promise.resolve(ctx.data);
				return OK(promisified.then((data) => {
					return this._def.type.parseAsync(data, {
						path: ctx.path,
						errorMap: ctx.common.contextualErrorMap
					});
				}));
			}
		};
		ZodPromise.create = (schema, params) => {
			return new ZodPromise({
				type: schema,
				typeName: ZodFirstPartyTypeKind.ZodPromise,
				...processCreateParams(params)
			});
		};
		var ZodEffects = class extends ZodType {
			innerType() {
				return this._def.schema;
			}
			sourceType() {
				return this._def.schema._def.typeName === ZodFirstPartyTypeKind.ZodEffects ? this._def.schema.sourceType() : this._def.schema;
			}
			_parse(input) {
				const { status, ctx } = this._processInputParams(input);
				const effect = this._def.effect || null;
				const checkCtx = {
					addIssue: (arg) => {
						addIssueToContext(ctx, arg);
						if (arg.fatal) status.abort();
						else status.dirty();
					},
					get path() {
						return ctx.path;
					}
				};
				checkCtx.addIssue = checkCtx.addIssue.bind(checkCtx);
				if (effect.type === "preprocess") {
					const processed = effect.transform(ctx.data, checkCtx);
					if (ctx.common.async) return Promise.resolve(processed).then(async (processed) => {
						if (status.value === "aborted") return INVALID;
						const result = await this._def.schema._parseAsync({
							data: processed,
							path: ctx.path,
							parent: ctx
						});
						if (result.status === "aborted") return INVALID;
						if (result.status === "dirty") return DIRTY(result.value);
						if (status.value === "dirty") return DIRTY(result.value);
						return result;
					});
					else {
						if (status.value === "aborted") return INVALID;
						const result = this._def.schema._parseSync({
							data: processed,
							path: ctx.path,
							parent: ctx
						});
						if (result.status === "aborted") return INVALID;
						if (result.status === "dirty") return DIRTY(result.value);
						if (status.value === "dirty") return DIRTY(result.value);
						return result;
					}
				}
				if (effect.type === "refinement") {
					const executeRefinement = (acc) => {
						const result = effect.refinement(acc, checkCtx);
						if (ctx.common.async) return Promise.resolve(result);
						if (result instanceof Promise) throw new Error("Async refinement encountered during synchronous parse operation. Use .parseAsync instead.");
						return acc;
					};
					if (ctx.common.async === false) {
						const inner = this._def.schema._parseSync({
							data: ctx.data,
							path: ctx.path,
							parent: ctx
						});
						if (inner.status === "aborted") return INVALID;
						if (inner.status === "dirty") status.dirty();
						executeRefinement(inner.value);
						return {
							status: status.value,
							value: inner.value
						};
					} else return this._def.schema._parseAsync({
						data: ctx.data,
						path: ctx.path,
						parent: ctx
					}).then((inner) => {
						if (inner.status === "aborted") return INVALID;
						if (inner.status === "dirty") status.dirty();
						return executeRefinement(inner.value).then(() => {
							return {
								status: status.value,
								value: inner.value
							};
						});
					});
				}
				if (effect.type === "transform") {
					if (ctx.common.async === false) {
						const base = this._def.schema._parseSync({
							data: ctx.data,
							path: ctx.path,
							parent: ctx
						});
						if (!isValid(base)) return INVALID;
						const result = effect.transform(base.value, checkCtx);
						if (result instanceof Promise) throw new Error(`Asynchronous transform encountered during synchronous parse operation. Use .parseAsync instead.`);
						return {
							status: status.value,
							value: result
						};
					} else return this._def.schema._parseAsync({
						data: ctx.data,
						path: ctx.path,
						parent: ctx
					}).then((base) => {
						if (!isValid(base)) return INVALID;
						return Promise.resolve(effect.transform(base.value, checkCtx)).then((result) => ({
							status: status.value,
							value: result
						}));
					});
				}
				util.assertNever(effect);
			}
		};
		ZodEffects.create = (schema, effect, params) => {
			return new ZodEffects({
				schema,
				typeName: ZodFirstPartyTypeKind.ZodEffects,
				effect,
				...processCreateParams(params)
			});
		};
		ZodEffects.createWithPreprocess = (preprocess, schema, params) => {
			return new ZodEffects({
				schema,
				effect: {
					type: "preprocess",
					transform: preprocess
				},
				typeName: ZodFirstPartyTypeKind.ZodEffects,
				...processCreateParams(params)
			});
		};
		var ZodOptional = class extends ZodType {
			_parse(input) {
				if (this._getType(input) === ZodParsedType.undefined) return OK(void 0);
				return this._def.innerType._parse(input);
			}
			unwrap() {
				return this._def.innerType;
			}
		};
		ZodOptional.create = (type, params) => {
			return new ZodOptional({
				innerType: type,
				typeName: ZodFirstPartyTypeKind.ZodOptional,
				...processCreateParams(params)
			});
		};
		var ZodNullable = class extends ZodType {
			_parse(input) {
				if (this._getType(input) === ZodParsedType.null) return OK(null);
				return this._def.innerType._parse(input);
			}
			unwrap() {
				return this._def.innerType;
			}
		};
		ZodNullable.create = (type, params) => {
			return new ZodNullable({
				innerType: type,
				typeName: ZodFirstPartyTypeKind.ZodNullable,
				...processCreateParams(params)
			});
		};
		var ZodDefault = class extends ZodType {
			_parse(input) {
				const { ctx } = this._processInputParams(input);
				let data = ctx.data;
				if (ctx.parsedType === ZodParsedType.undefined) data = this._def.defaultValue();
				return this._def.innerType._parse({
					data,
					path: ctx.path,
					parent: ctx
				});
			}
			removeDefault() {
				return this._def.innerType;
			}
		};
		ZodDefault.create = (type, params) => {
			return new ZodDefault({
				innerType: type,
				typeName: ZodFirstPartyTypeKind.ZodDefault,
				defaultValue: typeof params.default === "function" ? params.default : () => params.default,
				...processCreateParams(params)
			});
		};
		var ZodCatch = class extends ZodType {
			_parse(input) {
				const { ctx } = this._processInputParams(input);
				const newCtx = {
					...ctx,
					common: {
						...ctx.common,
						issues: []
					}
				};
				const result = this._def.innerType._parse({
					data: newCtx.data,
					path: newCtx.path,
					parent: { ...newCtx }
				});
				if (isAsync(result)) return result.then((result) => {
					return {
						status: "valid",
						value: result.status === "valid" ? result.value : this._def.catchValue({
							get error() {
								return new ZodError(newCtx.common.issues);
							},
							input: newCtx.data
						})
					};
				});
				else return {
					status: "valid",
					value: result.status === "valid" ? result.value : this._def.catchValue({
						get error() {
							return new ZodError(newCtx.common.issues);
						},
						input: newCtx.data
					})
				};
			}
			removeCatch() {
				return this._def.innerType;
			}
		};
		ZodCatch.create = (type, params) => {
			return new ZodCatch({
				innerType: type,
				typeName: ZodFirstPartyTypeKind.ZodCatch,
				catchValue: typeof params.catch === "function" ? params.catch : () => params.catch,
				...processCreateParams(params)
			});
		};
		var ZodNaN = class extends ZodType {
			_parse(input) {
				if (this._getType(input) !== ZodParsedType.nan) {
					const ctx = this._getOrReturnCtx(input);
					addIssueToContext(ctx, {
						code: ZodIssueCode.invalid_type,
						expected: ZodParsedType.nan,
						received: ctx.parsedType
					});
					return INVALID;
				}
				return {
					status: "valid",
					value: input.data
				};
			}
		};
		ZodNaN.create = (params) => {
			return new ZodNaN({
				typeName: ZodFirstPartyTypeKind.ZodNaN,
				...processCreateParams(params)
			});
		};
		var ZodBranded = class extends ZodType {
			_parse(input) {
				const { ctx } = this._processInputParams(input);
				const data = ctx.data;
				return this._def.type._parse({
					data,
					path: ctx.path,
					parent: ctx
				});
			}
			unwrap() {
				return this._def.type;
			}
		};
		var ZodPipeline = class ZodPipeline extends ZodType {
			_parse(input) {
				const { status, ctx } = this._processInputParams(input);
				if (ctx.common.async) {
					const handleAsync = async () => {
						const inResult = await this._def.in._parseAsync({
							data: ctx.data,
							path: ctx.path,
							parent: ctx
						});
						if (inResult.status === "aborted") return INVALID;
						if (inResult.status === "dirty") {
							status.dirty();
							return DIRTY(inResult.value);
						} else return this._def.out._parseAsync({
							data: inResult.value,
							path: ctx.path,
							parent: ctx
						});
					};
					return handleAsync();
				} else {
					const inResult = this._def.in._parseSync({
						data: ctx.data,
						path: ctx.path,
						parent: ctx
					});
					if (inResult.status === "aborted") return INVALID;
					if (inResult.status === "dirty") {
						status.dirty();
						return {
							status: "dirty",
							value: inResult.value
						};
					} else return this._def.out._parseSync({
						data: inResult.value,
						path: ctx.path,
						parent: ctx
					});
				}
			}
			static create(a, b) {
				return new ZodPipeline({
					in: a,
					out: b,
					typeName: ZodFirstPartyTypeKind.ZodPipeline
				});
			}
		};
		var ZodReadonly = class extends ZodType {
			_parse(input) {
				const result = this._def.innerType._parse(input);
				const freeze = (data) => {
					if (isValid(data)) data.value = Object.freeze(data.value);
					return data;
				};
				return isAsync(result) ? result.then((data) => freeze(data)) : freeze(result);
			}
			unwrap() {
				return this._def.innerType;
			}
		};
		ZodReadonly.create = (type, params) => {
			return new ZodReadonly({
				innerType: type,
				typeName: ZodFirstPartyTypeKind.ZodReadonly,
				...processCreateParams(params)
			});
		};
		ZodObject.lazycreate;
		var ZodFirstPartyTypeKind;
		(function(ZodFirstPartyTypeKind) {
			ZodFirstPartyTypeKind["ZodString"] = "ZodString";
			ZodFirstPartyTypeKind["ZodNumber"] = "ZodNumber";
			ZodFirstPartyTypeKind["ZodNaN"] = "ZodNaN";
			ZodFirstPartyTypeKind["ZodBigInt"] = "ZodBigInt";
			ZodFirstPartyTypeKind["ZodBoolean"] = "ZodBoolean";
			ZodFirstPartyTypeKind["ZodDate"] = "ZodDate";
			ZodFirstPartyTypeKind["ZodSymbol"] = "ZodSymbol";
			ZodFirstPartyTypeKind["ZodUndefined"] = "ZodUndefined";
			ZodFirstPartyTypeKind["ZodNull"] = "ZodNull";
			ZodFirstPartyTypeKind["ZodAny"] = "ZodAny";
			ZodFirstPartyTypeKind["ZodUnknown"] = "ZodUnknown";
			ZodFirstPartyTypeKind["ZodNever"] = "ZodNever";
			ZodFirstPartyTypeKind["ZodVoid"] = "ZodVoid";
			ZodFirstPartyTypeKind["ZodArray"] = "ZodArray";
			ZodFirstPartyTypeKind["ZodObject"] = "ZodObject";
			ZodFirstPartyTypeKind["ZodUnion"] = "ZodUnion";
			ZodFirstPartyTypeKind["ZodDiscriminatedUnion"] = "ZodDiscriminatedUnion";
			ZodFirstPartyTypeKind["ZodIntersection"] = "ZodIntersection";
			ZodFirstPartyTypeKind["ZodTuple"] = "ZodTuple";
			ZodFirstPartyTypeKind["ZodRecord"] = "ZodRecord";
			ZodFirstPartyTypeKind["ZodMap"] = "ZodMap";
			ZodFirstPartyTypeKind["ZodSet"] = "ZodSet";
			ZodFirstPartyTypeKind["ZodFunction"] = "ZodFunction";
			ZodFirstPartyTypeKind["ZodLazy"] = "ZodLazy";
			ZodFirstPartyTypeKind["ZodLiteral"] = "ZodLiteral";
			ZodFirstPartyTypeKind["ZodEnum"] = "ZodEnum";
			ZodFirstPartyTypeKind["ZodEffects"] = "ZodEffects";
			ZodFirstPartyTypeKind["ZodNativeEnum"] = "ZodNativeEnum";
			ZodFirstPartyTypeKind["ZodOptional"] = "ZodOptional";
			ZodFirstPartyTypeKind["ZodNullable"] = "ZodNullable";
			ZodFirstPartyTypeKind["ZodDefault"] = "ZodDefault";
			ZodFirstPartyTypeKind["ZodCatch"] = "ZodCatch";
			ZodFirstPartyTypeKind["ZodPromise"] = "ZodPromise";
			ZodFirstPartyTypeKind["ZodBranded"] = "ZodBranded";
			ZodFirstPartyTypeKind["ZodPipeline"] = "ZodPipeline";
			ZodFirstPartyTypeKind["ZodReadonly"] = "ZodReadonly";
		})(ZodFirstPartyTypeKind || (ZodFirstPartyTypeKind = {}));
		const stringType = ZodString.create;
		const numberType = ZodNumber.create;
		ZodNaN.create;
		ZodBigInt.create;
		ZodBoolean.create;
		ZodDate.create;
		ZodSymbol.create;
		ZodUndefined.create;
		ZodNull.create;
		ZodAny.create;
		ZodUnknown.create;
		ZodNever.create;
		ZodVoid.create;
		const arrayType = ZodArray.create;
		const objectType = ZodObject.create;
		ZodObject.strictCreate;
		const unionType = ZodUnion.create;
		ZodDiscriminatedUnion.create;
		ZodIntersection.create;
		ZodTuple.create;
		ZodRecord.create;
		ZodMap.create;
		ZodSet.create;
		ZodFunction.create;
		ZodLazy.create;
		const literalType = ZodLiteral.create;
		const enumType = ZodEnum.create;
		ZodNativeEnum.create;
		ZodPromise.create;
		ZodEffects.create;
		ZodOptional.create;
		ZodNullable.create;
		ZodEffects.createWithPreprocess;
		ZodPipeline.create;
		//#endregion
		//#region lib/types/shared/rpc-contract.js
		/** Shared RPC DTOs and fail codes for `explorerFs`. */
		const EXPLORER_FS_SERVICE = "explorerFs";
		//#endregion
		//#region lib/types/client/rpc.js
		/**
		* Client Typert contribution + typed call helpers for `explorerFs`.
		*/
		const FailCode = enumType([
			"OUT_OF_ROOT",
			"NOT_FOUND",
			"NOT_EMPTY",
			"EXISTS",
			"IS_BINARY",
			"IS_DIR",
			"IO"
		]);
		const FailResultSchema = objectType({
			ok: literalType(false),
			code: FailCode,
			message: stringType()
		});
		const OkResultSchema = objectType({ ok: literalType(true) });
		const RootOkSchema = objectType({
			ok: literalType(true),
			root: stringType()
		});
		const FsEntrySchema = objectType({
			name: stringType(),
			path: stringType(),
			kind: enumType(["file", "dir"]),
			size: numberType().optional()
		});
		const ListOkSchema = objectType({
			ok: literalType(true),
			entries: arrayType(FsEntrySchema)
		});
		const ReadOkSchema = objectType({
			ok: literalType(true),
			content: stringType()
		});
		const RootResultSchema = unionType([RootOkSchema, FailResultSchema]);
		const ListResultSchema = unionType([ListOkSchema, FailResultSchema]);
		const ReadResultSchema = unionType([ReadOkSchema, FailResultSchema]);
		const MutateResultSchema = unionType([OkResultSchema, FailResultSchema]);
		const PKG = "@supanexus/dsh-plugin-file-explorer";
		const Str = stringType();
		function strParam(name) {
			return {
				name,
				wire: name,
				source: "json",
				codec: {
					mode: "strict",
					typeSymbol: `${PKG}/types#String`,
					schema: Str
				}
			};
		}
		function resultCodec(schema, typeSymbol) {
			return {
				mode: "strict",
				typeSymbol: `${PKG}/types#${typeSymbol}`,
				schema
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
		const css$3 = ".t3VzRa_panel{background:var(--dsw-alias-bg-layer-2);min-width:0;height:100%;min-height:0;color:var(--dsw-alias-label-primary);flex-direction:column;font-size:13px;display:flex;overflow:hidden}.t3VzRa_toolbar{border-bottom:1px solid var(--dsw-alias-border-l2);box-sizing:border-box;flex-shrink:0;justify-content:space-between;align-items:center;gap:8px;min-height:36px;padding:8px 10px;display:flex}.t3VzRa_workspaceName{text-overflow:ellipsis;white-space:nowrap;min-width:0;color:var(--dsw-alias-label-primary);flex:1;font-size:13px;font-weight:600;overflow:hidden}.t3VzRa_toolbarActions{flex-shrink:0;align-items:center;gap:2px;display:flex}.t3VzRa_iconBtn{appearance:none;color:var(--dsw-alias-label-primary);cursor:pointer;background:0 0;border:0;border-radius:4px;justify-content:center;align-items:center;width:26px;height:26px;padding:0;display:inline-flex}.t3VzRa_iconBtn:hover{background:var(--dsw-alias-bg-layer-3)}.t3VzRa_iconBtn:disabled{opacity:.45;cursor:default}.t3VzRa_toolIcon{width:16px;height:16px;display:block}.t3VzRa_toolBtn{appearance:none;border:1px solid var(--dsw-alias-border-l2);background:var(--dsw-alias-bg-layer-3);color:inherit;font:inherit;cursor:pointer;border-radius:6px;padding:4px 8px}.t3VzRa_toolBtn:hover{border-color:var(--dsw-alias-label-dimmed)}.t3VzRa_toolBtn:disabled{opacity:.45;cursor:default}.t3VzRa_errorBanner{color:var(--dsw-alias-danger,#c44);background:var(--dsw-alias-bg-layer-3);border-bottom:1px solid var(--dsw-alias-border-l2);flex-shrink:0;padding:6px 10px}.t3VzRa_treeScroll{overscroll-behavior:contain;scrollbar-gutter:stable both-edges;flex:1;min-width:0;min-height:0;overflow:auto}.t3VzRa_treeScroll::-webkit-scrollbar{width:8px;height:8px}.t3VzRa_treeScroll::-webkit-scrollbar-thumb{background:var(--dsw-alias-scrollbar-bg-l2,color-mix(in srgb, var(--dsw-alias-label-primary) 28%, transparent));border-radius:4px}.t3VzRa_treeScroll::-webkit-scrollbar-thumb:hover{background:var(--dsw-alias-scrollbar-hover-l2,color-mix(in srgb, var(--dsw-alias-label-primary) 42%, transparent))}.t3VzRa_treeScroll::-webkit-scrollbar-corner{background:0 0}.t3VzRa_tree{vertical-align:top;box-sizing:border-box;cursor:pointer;min-width:100%;margin:0;padding:4px 0 12px;list-style:none;display:inline-block}.t3VzRa_tree>li,.t3VzRa_children>li{display:block}.t3VzRa_empty{color:var(--dsw-alias-label-secondary);cursor:default;padding:16px 12px}.t3VzRa_row{box-sizing:border-box;width:max-content;max-width:none;color:inherit;font:inherit;text-align:left;cursor:pointer;user-select:none;background:0 0;border:0;border-radius:4px;outline:none;align-items:center;gap:4px;padding-top:3px;padding-bottom:3px;padding-right:12px;display:flex;position:relative}.t3VzRa_row:hover{background:var(--dsw-alias-bg-layer-3)}.t3VzRa_row:focus,.t3VzRa_row:focus-visible{cursor:pointer;background:var(--dsw-alias-bg-layer-3);box-shadow:inset 0 0 0 1px var(--dsw-alias-border-l1,var(--dsw-alias-label-dimmed))}.t3VzRa_rowSelected{background:color-mix(in srgb, var(--dsw-alias-label-primary) 10%, var(--dsw-alias-bg-layer-3))}.t3VzRa_rowSelected:focus,.t3VzRa_rowSelected:focus-visible{background:color-mix(in srgb, var(--dsw-alias-label-primary) 14%, var(--dsw-alias-bg-layer-3))}.t3VzRa_rowSelected:before{content:\"\";background:var(--dsw-alias-label-primary);border-radius:1px;width:2px;position:absolute;top:2px;bottom:2px;left:0}.t3VzRa_rowOpened:not(.t3VzRa_rowSelected){color:var(--dsw-alias-label-primary);font-weight:500}.t3VzRa_rowEditing{cursor:default;background:var(--dsw-alias-bg-layer-3)}.t3VzRa_chevron{opacity:.7;flex-shrink:0;width:14px;height:14px;display:block}.t3VzRa_chevronBtn{appearance:none;color:inherit;cursor:pointer;background:0 0;border:0;border-radius:4px;flex-shrink:0;justify-content:center;align-items:center;width:18px;height:18px;margin:0;padding:0;display:inline-flex}.t3VzRa_chevronBtn:hover{background:var(--dsw-alias-bg-layer-1)}.t3VzRa_chevronPlaceholder{flex-shrink:0;width:18px;height:18px}.t3VzRa_icon{opacity:.85;flex-shrink:0;width:14px;height:14px}.t3VzRa_label{white-space:nowrap;flex:none}.t3VzRa_inlineInput{border:1px solid var(--dsw-alias-border-l1,var(--dsw-alias-border-l2));background:var(--dsw-alias-bg-layer-1);width:12em;min-width:120px;height:22px;color:var(--dsw-alias-label-primary);font:inherit;border-radius:4px;outline:none;flex:0 auto;margin:0;padding:1px 6px}.t3VzRa_inlineInput:focus{border-color:var(--dsw-alias-label-dimmed)}.t3VzRa_children{margin:0;padding:0;list-style:none}.t3VzRa_emptyChild{color:var(--dsw-alias-label-secondary);padding-top:2px;padding-bottom:2px;padding-right:8px;font-size:12px;list-style:none}.t3VzRa_contextMenu{z-index:1000;border:1px solid var(--dsw-alias-border-l2);background:var(--dsw-alias-bg-layer-1);min-width:148px;box-shadow:0 8px 24px color-mix(in srgb, var(--dsw-alias-label-primary) 12%, transparent);border-radius:8px;flex-direction:column;gap:2px;margin:0;padding:4px;display:flex;position:fixed}.t3VzRa_contextItem{appearance:none;color:var(--dsw-alias-label-primary);font:inherit;text-align:left;cursor:pointer;background:0 0;border:0;border-radius:6px;padding:7px 10px;font-size:13px}.t3VzRa_contextItem:hover{background:var(--dsw-alias-bg-layer-3)}.t3VzRa_contextItem:disabled{opacity:.45;cursor:default}.t3VzRa_contextItem:disabled:hover{background:0 0}.t3VzRa_contextItemDanger{color:var(--dsw-alias-danger,#c44)}.t3VzRa_contextItemDanger:hover{background:color-mix(in srgb, var(--dsw-alias-danger,#c44) 12%, var(--dsw-alias-bg-layer-3))}";
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
		const css$2 = ".VX-wEW_surface{background:var(--dsw-alias-bg-layer-1);height:100%;min-height:0;color:var(--dsw-alias-label-primary);flex-direction:column;display:flex}.VX-wEW_tabs{border-bottom:1px solid var(--dsw-alias-border-l2);background:var(--dsw-alias-bg-layer-2);flex-shrink:0;align-items:stretch;gap:2px;padding:0 8px;display:flex;overflow-x:auto}.VX-wEW_tab{color:var(--dsw-alias-label-secondary);font:inherit;cursor:pointer;white-space:nowrap;background:0 0;border:0;border-bottom:2px solid #0000;align-items:center;gap:6px;padding:8px 10px;font-size:13px;display:flex}.VX-wEW_tabActive{color:var(--dsw-alias-label-primary);border-bottom-color:var(--dsw-alias-brand-primary)}.VX-wEW_dirtyMark{color:var(--dsw-alias-brand-primary)}.VX-wEW_closeBtn{appearance:none;color:inherit;font:inherit;cursor:pointer;opacity:.6;background:0 0;border:0;border-radius:4px;padding:2px 4px;font-size:12px;line-height:1}.VX-wEW_closeBtn:hover{opacity:1;background:var(--dsw-alias-bg-layer-3)}.VX-wEW_toolbar{border-bottom:1px solid var(--dsw-alias-border-l2);flex-shrink:0;align-items:center;gap:8px;padding:6px 10px;display:flex}.VX-wEW_toolBtn{appearance:none;border:1px solid var(--dsw-alias-border-l2);background:var(--dsw-alias-bg-layer-3);color:inherit;font:inherit;cursor:pointer;border-radius:6px;padding:4px 10px;font-size:12px}.VX-wEW_toolBtn:hover{border-color:var(--dsw-alias-label-dimmed)}.VX-wEW_toolBtnActive{border-color:var(--dsw-alias-brand-primary);color:var(--dsw-alias-brand-primary)}.VX-wEW_status{color:var(--dsw-alias-label-secondary);margin-left:auto;font-size:12px}.VX-wEW_pathBar{border-bottom:1px solid var(--dsw-alias-border-l2);background:var(--dsw-alias-bg-layer-2);color:var(--dsw-alias-label-secondary);white-space:nowrap;text-overflow:ellipsis;user-select:text;flex-shrink:0;padding:4px 12px;font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,monospace;font-size:12px;line-height:1.4;overflow:hidden}.VX-wEW_toolbarEnd{flex-shrink:0;align-items:center;display:flex;position:relative}.VX-wEW_appearanceMenu{z-index:20;border:1px solid var(--dsw-alias-border-l2);background:var(--dsw-alias-bg-layer-1);min-width:220px;box-shadow:0 10px 28px color-mix(in srgb, var(--dsw-alias-label-primary) 14%, transparent);border-radius:10px;flex-direction:column;gap:12px;padding:10px;display:flex;position:absolute;top:calc(100% + 6px);right:0}.VX-wEW_appearanceSection{flex-direction:column;gap:6px;display:flex}.VX-wEW_appearanceLabel{color:var(--dsw-alias-label-secondary);font-size:12px}.VX-wEW_appearanceThemeRow{flex-wrap:wrap;gap:6px;display:flex}.VX-wEW_appearanceChip{appearance:none;border:1px solid var(--dsw-alias-border-l2);background:var(--dsw-alias-bg-layer-3);color:inherit;font:inherit;cursor:pointer;border-radius:999px;padding:4px 10px;font-size:12px}.VX-wEW_appearanceChip:hover{border-color:var(--dsw-alias-label-dimmed)}.VX-wEW_appearanceChipActive{border-color:var(--dsw-alias-brand-primary);color:var(--dsw-alias-brand-primary)}.VX-wEW_appearanceFontRow{align-items:center;gap:8px;display:flex}.VX-wEW_appearanceStep{appearance:none;border:1px solid var(--dsw-alias-border-l2);background:var(--dsw-alias-bg-layer-3);color:inherit;min-width:36px;height:28px;font:inherit;cursor:pointer;border-radius:6px;padding:0 8px;font-size:12px}.VX-wEW_appearanceStep:hover:not(:disabled){border-color:var(--dsw-alias-label-dimmed)}.VX-wEW_appearanceStep:disabled{opacity:.45;cursor:default}.VX-wEW_appearanceFontValue{text-align:center;font-variant-numeric:tabular-nums;min-width:48px;font-size:13px}.VX-wEW_appearanceColorRow{align-items:center;gap:6px;display:flex}.VX-wEW_appearanceColorSwatch{border:1px solid var(--dsw-alias-border-l2);cursor:pointer;background:0 0;border-radius:6px;flex-shrink:0;width:28px;height:28px;padding:0}.VX-wEW_appearanceHexInput{box-sizing:border-box;border:1px solid var(--dsw-alias-border-l2);background:var(--dsw-alias-bg-layer-3);min-width:0;height:28px;color:var(--dsw-alias-label-primary);font:inherit;border-radius:6px;outline:none;flex:1;padding:0 8px;font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,monospace;font-size:12px}.VX-wEW_appearanceHexInput:focus{border-color:var(--dsw-alias-label-dimmed)}.VX-wEW_appearanceHexInvalid{border-color:var(--dsw-alias-danger,#c44)}.VX-wEW_appearanceHint{color:var(--dsw-alias-label-secondary);font-size:11px;line-height:1.35}.VX-wEW_appearanceSaveScheme{appearance:none;border:1px solid var(--dsw-alias-border-l2);background:var(--dsw-alias-bg-layer-3);color:inherit;height:28px;font:inherit;cursor:pointer;border-radius:6px;align-self:flex-start;padding:0 10px;font-size:12px}.VX-wEW_appearanceSaveScheme:hover{border-color:var(--dsw-alias-label-dimmed)}.VX-wEW_appearanceSchemeList{flex-direction:column;gap:4px;max-height:140px;margin:0;padding:0;list-style:none;display:flex;overflow-y:auto}.VX-wEW_appearanceSchemeItem{align-items:center;gap:4px;display:flex}.VX-wEW_appearanceSchemeApply{appearance:none;border:1px solid var(--dsw-alias-border-l2);background:var(--dsw-alias-bg-layer-3);min-width:0;color:inherit;height:28px;font:inherit;cursor:pointer;text-align:left;border-radius:6px;flex:1;align-items:center;gap:8px;padding:0 8px;font-size:12px;display:flex}.VX-wEW_appearanceSchemeApply:hover{border-color:var(--dsw-alias-label-dimmed)}.VX-wEW_appearanceSchemeApplyActive{border-color:var(--dsw-alias-brand-primary);color:var(--dsw-alias-brand-primary)}.VX-wEW_appearanceSchemeSwatch{border:1px solid var(--dsw-alias-border-l2);border-radius:3px;flex-shrink:0;width:14px;height:14px}.VX-wEW_appearanceSchemeMeta{text-overflow:ellipsis;white-space:nowrap;font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,monospace;font-size:11px;overflow:hidden}.VX-wEW_appearanceSchemeRemove{appearance:none;color:var(--dsw-alias-label-secondary);width:28px;height:28px;font:inherit;cursor:pointer;background:0 0;border:0;border-radius:6px;flex-shrink:0;font-size:16px;line-height:1}.VX-wEW_appearanceSchemeRemove:hover{color:var(--dsw-alias-label-primary);background:var(--dsw-alias-bg-layer-3)}.VX-wEW_body{flex:1;min-height:0;position:relative}.VX-wEW_textarea{resize:none;background:var(--dsw-alias-bg-layer-1);width:100%;height:100%;color:var(--dsw-alias-label-primary);box-sizing:border-box;border:0;outline:none;padding:12px 14px;font:13px/1.5 ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,monospace}.VX-wEW_monacoHost{width:100%;height:100%}.VX-wEW_preview{box-sizing:border-box;height:100%;padding:16px 20px;line-height:1.55;overflow:auto}.VX-wEW_preview h1,.VX-wEW_preview h2,.VX-wEW_preview h3{margin:.8em 0 .4em}.VX-wEW_preview pre{background:var(--dsw-alias-bg-layer-3);border-radius:8px;padding:10px 12px;overflow:auto}.VX-wEW_preview code{font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,monospace;font-size:.92em}.VX-wEW_empty{height:100%;color:var(--dsw-alias-label-secondary);place-items:center;font-size:14px;display:grid}.VX-wEW_errorBanner{color:var(--dsw-alias-danger,#c44);border-bottom:1px solid var(--dsw-alias-border-l2);flex-shrink:0;padding:6px 12px}";
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
		//#region ../../../node_modules/.pnpm/marked@18.0.11/node_modules/marked/lib/marked.esm.js
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
				let s = 1 / 0;
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
						let o = 1 / 0, u = e.slice(1), a;
						this.options.extensions.startBlock.forEach((p) => {
							a = p.call({ lexer: this }, u), typeof a == "number" && a >= 0 && (o = Math.min(o, a));
						}), o < 1 / 0 && o >= 0 && (i = e.substring(0, o + 1));
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
				let s = !1, r = "", i = 1 / 0;
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
						let a = 1 / 0, p = e.slice(1), c;
						this.options.extensions.startInline.forEach((h) => {
							c = h.call({ lexer: this }, p), typeof c == "number" && c >= 0 && (a = Math.min(a, c));
						}), a < 1 / 0 && a >= 0 && (u = e.substring(0, a + 1));
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
							let o = r[i].flat(1 / 0);
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
		* Settings → Plugins card for file explorer preferences.
		*/
		function ChevronDown({ className }) {
			return (0, react_jsx_runtime.jsx)("svg", {
				width: 14,
				height: 14,
				className,
				viewBox: "0 0 14 14",
				fill: "none",
				"aria-hidden": true,
				children: (0, react_jsx_runtime.jsx)("path", {
					d: "M11.8486 5.5L11.4238 5.92383L8.69727 8.65137C8.44157 8.90706 8.21562 9.13382 8.01172 9.29785C7.79912 9.46883 7.55595 9.61756 7.25 9.66602C7.08435 9.69222 6.91565 9.69222 6.75 9.66602C6.44405 9.61756 6.20088 9.46883 5.98828 9.29785C5.78438 9.13382 5.55843 8.90706 5.30273 8.65137L2.57617 5.92383L2.15137 5.5L3 4.65137L3.42383 5.07617L6.15137 7.80273C6.42595 8.07732 6.59876 8.24849 6.74023 8.3623C6.87291 8.46904 6.92272 8.47813 6.9375 8.48047C6.97895 8.48703 7.02105 8.48703 7.0625 8.48047C7.07728 8.47813 7.12709 8.46904 7.25977 8.3623C7.40124 8.24849 7.57405 8.07732 7.84863 7.80273L10.5762 5.07617L11 4.65137L11.8486 5.5Z",
					fill: "currentColor"
				})
			});
		}
		/** Collapsed-by-default plugin configuration card. */
		function ExplorerSettingsCard(props) {
			const { ctx, scope } = props;
			const snap = (0, react.useSyncExternalStore)(scope.subscribe, () => scope.getSnapshot());
			const t = explorerT((0, react.useSyncExternalStore)((listener) => ctx.locale.subscribe(listener), () => ctx.locale.getSnapshot().active));
			const [open, setOpen] = (0, react.useState)(false);
			const [draftRoot, setDraftRoot] = (0, react.useState)(null);
			const [saving, setSaving] = (0, react.useState)(false);
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
			const title = t("settingsTitle");
			return (0, react_jsx_runtime.jsxs)("li", {
				className: open ? `${settings_card_module_css_default.card} ${settings_card_module_css_default.cardOpen}` : settings_card_module_css_default.card,
				children: [(0, react_jsx_runtime.jsxs)("button", {
					type: "button",
					className: settings_card_module_css_default.header,
					"aria-expanded": open,
					"aria-label": `${t(open ? "collapse" : "expand")}: ${title}`,
					onClick: () => {
						setOpen((v) => !v);
					},
					children: [(0, react_jsx_runtime.jsxs)("span", {
						className: settings_card_module_css_default.headText,
						children: [(0, react_jsx_runtime.jsx)("span", {
							className: settings_card_module_css_default.name,
							children: title
						}), (0, react_jsx_runtime.jsx)("span", {
							className: settings_card_module_css_default.description,
							children: t("settingsDescription")
						})]
					}), (0, react_jsx_runtime.jsx)(ChevronDown, { className: [settings_card_module_css_default.chevron, open ? settings_card_module_css_default.chevronOpen : void 0].filter(Boolean).join(" ") })]
				}), open ? (0, react_jsx_runtime.jsxs)("div", {
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
				}) : null]
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
		* @returns disposer.
		*/
		function installSessionRootPin(ctx, api, mode) {
			const sessions = ctx.sessions;
			if (sessions === void 0) return () => {};
			const sync = () => {
				if (!mode.getSnapshot()) return;
				const snap = sessions.list.getSnapshot();
				const current = snap.current;
				if (current === void 0) return;
				const cwd = snap.byId[current]?.cwd;
				if (cwd === void 0 || cwd.trim() === "") return;
				api.setRoot(cwd);
			};
			sync();
			const unsubSessions = sessions.list.subscribe(sync);
			const unsubMode = mode.subscribe(() => {
				sync();
			});
			return () => {
				unsubSessions();
				unsubMode();
			};
		}
		//#endregion
		//#region \0dsh-css:/Users/hivanpan/Hivan/project/ykl/project/Whale/whale-harness-free/plugins/packages/ui/dsh-plugin-file-explorer/src/client/files-view.module.css.mjs
		const css = "._5j-Hiq_shell{width:100%;height:100%;min-height:0;position:relative;overflow:hidden}._5j-Hiq_filesView{box-sizing:border-box;background:var(--dsw-alias-bg-layer-1);width:100%;min-height:0;color:var(--dsw-alias-label-primary);display:flex;position:absolute;inset:0;overflow:hidden}._5j-Hiq_treeCol{border-right:1px solid var(--dsw-alias-border-l2);background:var(--dsw-alias-bg-layer-2);flex-shrink:0;min-width:160px;max-width:70%;min-height:0;position:relative;overflow:hidden}._5j-Hiq_treeResize{z-index:2;cursor:col-resize;touch-action:none;width:6px;height:100%;position:absolute;top:0;right:-3px}._5j-Hiq_treeResize:hover,._5j-Hiq_treeResize:active{background:color-mix(in srgb, var(--dsw-alias-brand-primary,#4c8bf5) 35%, transparent)}._5j-Hiq_editorCol{flex-direction:column;flex:1;min-width:0;min-height:0;display:flex;overflow:hidden}._5j-Hiq_crash{color:var(--dsw-alias-label-danger,#c62828);padding:16px;font-size:13px}";
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
			"settingsScope"
		];
		/**
		* Mount remotes and register UI slots.
		* @param ctx - Client root context.
		*/
		async function apply(ctx) {
			const disposeRemote = await ctx.remote.$mount(TYPERT_REMOTE);
			ctx.effect(() => disposeRemote, "supanexus-file-explorer: remote");
			ctx.effect(() => ctx.locale.register(NS, dictionaries), "supanexus-file-explorer: dictionaries");
			const settings = ctx.settingsScope.bind({ namespace: FILE_EXPLORER_SETTINGS_NS });
			const tabs = new TabsStore();
			const buffers = new BuffersStore();
			const mdModes = new MdModeStore();
			const mode = new ExplorerModeStore();
			ctx.inject(["remote.explorerFs"], (remoteCtx) => {
				const api = createExplorerApi(remoteCtx);
				remoteCtx.effect(() => installOpenLinksInterceptor(settings), "supanexus-file-explorer: open-links");
				remoteCtx.inject(["sessions"], (sessionCtx) => {
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
				remoteCtx.slots.inject("settings.plugin.item", () => remoteCtx.slots.register({
					name: "settings.plugin.item",
					key: FILE_EXPLORER_SETTINGS_NS,
					registrant: PACKAGE
				}, (props) => (0, react_jsx_runtime.jsx)(ExplorerSettingsCard, {
					ctx: remoteCtx,
					scope: settings,
					...props
				})));
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