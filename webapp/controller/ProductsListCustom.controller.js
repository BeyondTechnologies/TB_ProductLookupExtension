sap.ui.define([], function() {
	"use strict";
	return sap.ui.controller("retail.store.productlookups1.ZRT_PROD_LKPS1.controller.ProductsListCustom", {

		onInit: function() {
			var that = this;
			if (typeof Infinea !== "undefined") {
				Infinea.barcodeDataCallback = function(sBarcode, sType, sTypeText) {
					jQuery.proxy(that.onScan(sBarcode), that);
				};
			}
		}
	});
});