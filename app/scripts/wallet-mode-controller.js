import { EventEmitter } from 'events'
import extend from 'xtend'
import ObservableStore from 'obs-store'

module.exports = class WalletModeController extends EventEmitter {
	constructor (opts = {}) {
			super()
			const initState = extend({
				walletMode: '',
				keyringPass: '',
			}, opts.initState)
			this.store = new ObservableStore(initState)
			// setup memStore
			this.memStore = new ObservableStore({})
			this.store.subscribe(() => this._updateMemstore())
			this._updateMemstore()
	}

	getWalletMode () {
		return this.store.getState().walletMode
	}

	getKeyringPass () {
		return this.store.getState().keyringPass
	}

	setWalletMode (mode, cb) {
		this.store.updateState({ walletMode: mode })
		cb()
	}

	setKeyringPass (pass, cb) {
		this.store.updateState({ keyringPass: pass })
		cb()
	}

	_updateMemstore () {
		const walletMode = this.getWalletMode()
		const keyringPass = this.getKeyringPass()
		this.memStore.updateState({ walletMode, keyringPass })
	}
}
