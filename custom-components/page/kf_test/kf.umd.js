var c = (E, t, i) => {
	if (!t.has(E)) throw TypeError("Cannot " + i);
};
var o = (E, t, i) => (
		c(E, t, "read from private field"), i ? i.call(E) : t.get(E)
	),
	p = (E, t, i) => {
		if (t.has(E))
			throw TypeError(
				"Cannot add the same private member more than once"
			);
		t instanceof WeakSet ? t.add(E) : t.set(E, i);
	},
	g = (E, t, i, a) => (
		c(E, t, "write to private field"), a ? a.call(E, i) : t.set(E, i), i
	);
var l = (E, t, i) => (c(E, t, "access private method"), i);
(function (E, t) {
	typeof exports == "object" && typeof module != "undefined"
		? (module.exports = t())
		: typeof define == "function" && define.amd
		? define(t)
		: ((E = typeof globalThis != "undefined" ? globalThis : E || self),
		  (E.kf = t()));
})(this, function () {
	var A, M, L;
	("use strict");
	let E = (n = 21) =>
		crypto
			.getRandomValues(new Uint8Array(n))
			.reduce(
				(e, s) => (
					(s &= 63),
					s < 36
						? (e += s.toString(36))
						: s < 62
						? (e += (s - 26).toString(36).toUpperCase())
						: s > 62
						? (e += "-")
						: (e += "_"),
					e
				),
				""
			);
	const t = {
			API: "API",
			GET_CONTEXT: "GET_CONTEXT",
			RETURN: "RETURN",
			GET_FORM_FIELD: "GET_FORM_FIELD",
			UPDATE_FORM: "UPDATE_FORM",
			GET_TABLE: "GET_TABLE",
			GET_TABLE_ROW: "GET_TABLE_ROW",
			ADD_TABLE_ROW: "ADD_TABLE_ROW",
			DELETE_TABLE_ROW: "DELETE_TABLE_ROW",
			TO_JSON: "TO_JSON",
			GET_TABLE_ROWS: "GET_TABLE_ROWS",
			MESSAGE: "MESSAGE",
			CONFIRM: "CONFIRM",
			ALERT: "ALERT",
			REDIRECT: "REDIRECT",
			OPEN_PAGE: "OPEN_PAGE",
			FORMAT_DATE: "FORMAT_DATE",
			FORMAT_DATE_TIME: "FORMAT_DATE_TIME",
			FORMAT_NUMBER: "FORMAT_NUMBER",
			FORMAT_CURRENCY: "FORMAT_CURRENCY",
			FORMAT_BOOLEAN: "FORMAT_BOOLEAN",
			GET_APP_VARIABLE: "GET_APP_VARIABLE",
			SET_APP_VARIABLE: "SET_APP_VARIABLE",
			GET_PAGE_VARIABLE: "GET_PAGE_VARIABLE",
			SET_PAGE_VARIABLE: "SET_PAGE_VARIABLE",
			GET_PAGE_PARAMS: "GET_PAGE_PARAMS",
			GET_ALL_PAGE_PARAMS: "GET_ALL_PAGE_PARAMS",
			PAGE_ON_CLOSE: "PAGE_ON_CLOSE",
			OPEN_POPUP: "OPEN_POPUP",
			GET_POPUP_PARAMS: "GET_POPUP_PARAMS",
			GET_ALL_POPUP_PARAMS: "GET_ALL_POPUP_PARAMS",
			CLOSE_POPUP: "CLOSE_POPUP",
			COMPONENT_GET: "COMPONENT_GET",
			COMPONENT_REFRESH: "COMPONENT_REFRESH",
			COMPONENT_SHOW: "COMPONENT_SHOW",
			COMPONENT_HIDE: "COMPONENT_HIDE",
			COMPONENT_ADD_EVENT_LISTENER: "COMPONENT_ADD_EVENT_LISTENER",
			CC_INITIALIZE: "CC_INITIALIZE",
			CC_WATCH_PARAMS: "CC_WATCH_PARAMS",
			WINDOW_NDEF_READER_NEW: "WINDOW_NDEF_READER_NEW",
			WINDOW_NDEF_READER_SCAN: "WINDOW_NDEF_READER_SCAN",
			WINDOW_NDEF_READER_WRITE: "WINDOW_NDEF_READER_WRITE",
			WINDOW_NDEF_READER_ADD_EVENT_LISTENER:
				"WINDOW_NDEF_READER_ADD_EVENT_LISTENER",
			WINDOW_NDEF_READER_MAKE_READONLY:
				"WINDOW_NDEF_READER_MAKE_READONLY",
			WINDOW_NDEF_READER_ABORT_SCAN: "WINDOW_NDEF_READER_ABORT_SCAN"
		},
		i = {
			COMPONENT_ON_MOUNT: "componentOnMount",
			CC_ON_PARAMS_CHANGE: "onCustomComponentParamsChange"
		},
		a = { POPUP_ID: "ACTIVE_POP_UP" };
	function u(n = "lcncsdk") {
		return `${n}-${E()}`;
	}
	const P = {};
	function C(n) {
		globalThis.parent && globalThis.parent !== globalThis
			? globalThis.parent.postMessage(n, "*")
			: globalThis.postMessage(n);
	}
	function d(n) {
		if (n.origin !== globalThis.location.origin) {
			const e = n.data;
			console.info("check race 0", e);
			if (e != null && e.isEvent) {
				const {
					target: r,
					eventParams: R,
					eventName: h,
					eventConfig: N = {}
				} = e;
				let T = P[r];
				T._dispatchEvent(h, R), N.once && T._removeEventListener(h);
				return;
			}
			let { _req: s, resp: _ } = e;
			s != null && s._id && P[s._id]._dispatchMessageEvents(s, _);
		}
	}
	globalThis.addEventListener("message", d);
	class S {
		constructor() {
			p(this, A, void 0);
			g(this, A, {});
		}
		_addEventListener(e, s) {
			var _;
			(o(this, A)[e] = ((_ = o(this, A)) == null ? void 0 : _[e]) || []),
				o(this, A)[e].push(s);
		}
		_removeEventListener(e, s) {
			if (s) {
				let _ = o(this, A)[e].findIndex(s);
				_ > -1 && o(this, A)[e].splice(_, 1);
				return;
			}
			Reflect.deleteProperty(o(this, A), e);
		}
		_dispatchEvent(e, s) {
			return Array.isArray(o(this, A)[e])
				? (o(this, A)[e].forEach((_) => _(s)), !0)
				: !1;
		}
		_dispatchMessageEvents(e, s) {
			let _ = e._id;
			Array.isArray(o(this, A)[_]) &&
				(o(this, A)[_].forEach((r) => {
					try {
						s && Object.keys(s).length === 1 && e.command !== t.API
							? r(Object.values(s)[0])
							: r(s);
					} catch (R) {
						console.error("Message callback error: ", R);
					}
				}),
				this._removeEventListener(_));
		}
	}
	A = new WeakMap();
	class O extends S {
		_postMessageAsync(e, s, _, r) {
			return new Promise((R, h) => {
				const N = u(e.toLowerCase());
				C({ _id: N, command: e, ...s }),
					(P[N] = this),
					this._addEventListener(N, async (T) => {
						T != null && T.errorMessage
							? h(T)
							: (_ && r && (T = await r(T)), R(T));
					});
			});
		}
		_postMessage(e, s, _) {
			const r = u(e.toLowerCase());
			C({ _id: r, command: e, ...s }),
				_ && this._addEventListener(s.eventName, _);
		}
	}
	class D extends O {
		constructor(s) {
			super();
			p(this, M);
			(this._id = s.componentId),
				(this.type = "Component"),
				(P[this._id] = this),
				l(this, M, L).call(this, s.componentMethods);
		}
		onMount(s) {
			this._postMessage(
				t.COMPONENT_ADD_EVENT_LISTENER,
				{
					id: this._id,
					eventName: i.COMPONENT_ON_MOUNT,
					eventConfig: { once: !0 }
				},
				s
			);
		}
		refresh() {
			return this._postMessageAsync(t.COMPONENT_REFRESH, {
				id: this._id
			});
		}
		show() {
			return this._postMessageAsync(t.COMPONENT_SHOW, { id: this._id });
		}
		hide() {
			return this._postMessageAsync(t.COMPONENT_HIDE, { id: this._id });
		}
	}
	(M = new WeakSet()),
		(L = function (s) {
			s == null ||
				s.forEach((_) => {
					this[_.name] = (...r) => {
						if (_.type === "method")
							return this._postMessageAsync(
								`COMPONENT_${_.name}`,
								{ id: this._id, parameters: r }
							);
						_.type === "event" &&
							this._postMessage(
								t.COMPONENT_ADD_EVENT_LISTENER,
								{
									id: this._id,
									eventName: _.name,
									eventConfig: r[1]
								},
								r[0]
							);
					};
				});
		});
	class G extends O {
		constructor(e) {
			super(),
				(this._id = e),
				(this.type = "CustomComponent"),
				(P[this._id] = this);
		}
		watchParams(e) {
			this._postMessage(
				t.CC_WATCH_PARAMS,
				{
					id: this._id,
					eventName: i.CC_ON_PARAMS_CHANGE,
					eventConfig: { once: !1 }
				},
				e
			);
		}
	}
	class f extends O {
		constructor(e) {
			super(),
				(this.type = "Popup"),
				(this._id = e.popupId || a.POPUP_ID);
		}
		getParameter(e) {
			return this._postMessageAsync(t.GET_POPUP_PARAMS, {
				key: e,
				popupId: this._id
			});
		}
		getAllParameters() {
			return this._postMessageAsync(t.GET_ALL_POPUP_PARAMS, {
				popupId: this._id
			});
		}
		close() {
			return this._postMessageAsync(t.CLOSE_POPUP, {});
		}
		getComponent(e) {
			return this._postMessageAsync(
				t.COMPONENT_GET,
				{ componentId: e },
				!0,
				(s) => new D(s)
			);
		}
	}
	class I extends O {
		constructor(e) {
			super(),
				(this.type = "Page"),
				(this.popup = new f({})),
				(this._id = e.pageId);
		}
		getParameter(e) {
			return this._postMessageAsync(t.GET_PAGE_PARAMS, { key: e });
		}
		getAllParameters() {
			return this._postMessageAsync(t.GET_ALL_PAGE_PARAMS, {
				pageId: this._id
			});
		}
		getVariable(e) {
			return this._postMessageAsync(t.GET_PAGE_VARIABLE, { key: e });
		}
		setVariable(e, s) {
			return this._postMessageAsync(t.SET_PAGE_VARIABLE, {
				key: e,
				value: s
			});
		}
		openPopup(e, s) {
			return this._postMessageAsync(t.OPEN_POPUP, {
				popupId: e,
				popupParams: s
			});
		}
		getComponent(e) {
			return this._postMessageAsync(
				t.COMPONENT_GET,
				{ componentId: e },
				!0,
				(s) => new D(s)
			);
		}
	}
	class y extends O {
		constructor(e) {
			super(), (this._id = e.appId), (this.page = new I(e));
		}
		getVariable(e) {
			return this._postMessageAsync(t.GET_APP_VARIABLE, { key: e });
		}
		setVariable(e, s) {
			return this._postMessageAsync(t.SET_APP_VARIABLE, {
				key: e,
				value: s
			});
		}
		openPage(e, s) {
			return this._postMessageAsync(t.OPEN_PAGE, {
				pageId: e,
				pageParams: s
			});
		}
	}
	class W extends O {
		showInfo(e) {
			return super._postMessageAsync(t.MESSAGE, { message: e });
		}
		showConfirm(e) {
			return super._postMessageAsync(t.CONFIRM, {
				data: {
					title: e.title,
					content: e.content,
					okText: e.okText || "Ok",
					cancelText: e.cancelText || "Cancel"
				}
			});
		}
		redirect(e) {
			return super._postMessageAsync(t.REDIRECT, { url: e });
		}
	}
	class F extends O {
		toDate(e) {
			return this._postMessageAsync(t.FORMAT_DATE, { date: e });
		}
		toDateTime(e) {
			return this._postMessageAsync(t.FORMAT_DATE_TIME, { date: e });
		}
		toNumber(e) {
			return this._postMessageAsync(t.FORMAT_NUMBER, { value: e });
		}
		toCurrency(e, s) {
			return this._postMessageAsync(t.FORMAT_CURRENCY, {
				value: e,
				currencyCode: s
			});
		}
		toBoolean(e) {
			return this._postMessageAsync(t.FORMAT_BOOLEAN, { value: e });
		}
	}
	class m extends O {
		constructor() {
			super();
		}
		api(e, s = {}) {
			return this._postMessageAsync(t.API, { url: e, args: s });
		}
		initialize() {
			return this._postMessageAsync(
				t.CC_INITIALIZE,
				{},
				!0,
				(e) => (
					(this.app = new y(e)),
					(this.page = new I(e)),
					(this.context = new G(e.componentId)),
					(this.client = new W()),
					(this.formatter = new F()),
					(this.user = e.user),
					(this.account = e.account),
					(this.env = e.envDetails),
					this
				)
			);
		}
		initialise() {
			return this.initialize();
		}
	}
	var B = new m();
	return B;
});
