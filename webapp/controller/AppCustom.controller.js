sap.ui.define([], function() {
	"use strict";
	return sap.ui.controller("retail.store.productlookups1.ZRT_PROD_LKPS1.controller.AppCustom", {
		onInit: function() {

			if (typeof Infinea !== "undefined") {
				Infinea.init();
			}

		},
		onExit: function() {

			if (typeof Infinea !== "undefined") {
				Infinea.barcodeDataCallback = null;
			}
		}
	});
});