sap.ui.define([], function() {
	"use strict";
	return sap.ui.controller("retail.store.productlookups1.ZRT_PROD_LKPS1.controller.ProductDetailsCustom", {

		onInit: function() {

			console.log("RT_PROD_LKPS - ProductDetail->onInit");

			if (typeof Infinea !== "undefined") {
				Infinea.init();
			}
		},

		onExit: function() {

			console.log("RT_PROD_LKPS - ProductDetail->onExit");

			if (typeof Infinea !== "undefined") {
				Infinea.barcodeDataCallback = null;
			}
		},

		onRouteMatched: function(oEvent) {
			if (oEvent.getParameter("name") === "detail" || oEvent.getParameter("name") === "detail_noUoM") {
				this._resetTabPressed();
				this._resetPromotionPanelStatus();
				this._resetBonusBuyPanelStatus();
				this._resetDeliveryPanelStatus();
				this.setupCharacteristicsSelectionForm(); // reset the Variants characteristics form
				this._clearAndPopulateGTINVBox([], this.byId("PRODUCTLOOKUP_DETAIL_TAB_INFORMAITON_GTINS_LIST"));
				if (this.currentArticleNumber !== oEvent.getParameter("arguments").articleNumber || this.currentSiteId !== oEvent.getParameter(
						"arguments").siteId) {
					this._resetModels();
				}

				var that = this;
				// this.getOwnerComponent().getComponentData().oMainController.oBarcodeScanHandler.registerScanHandling(function(sBarcodeNumber) {
				// 	that.onScan(sBarcodeNumber);
				// });
				console.log("RT_PROD_LKPS - ProductDetail->onRouteMatched");

				if (typeof Infinea !== "undefined") {
					Infinea.barcodeDataCallback = function(sBarcode, sType, sTypeText) {
						jQuery.proxy(that.handleBarcodeScan(sBarcode), that);
					};
				}

				// load a default image to replace any image displayed previously.
				this._dataCacheHandler.getDefaultProductImage(function(oDefaultImageModel) {
					that.getView().setModel(oDefaultImageModel, "Image");
				});

				this.currentSiteId = oEvent.getParameter("arguments").siteId;
				this.currentArticleNumber = oEvent.getParameter("arguments").articleNumber;
				this.currentUoM = (oEvent.getParameter("name") === "detail" && oEvent.getParameter("arguments").UoM) ? oEvent.getParameter(
					"arguments").UoM : null;

				// Force to expand the first tab by default
				// getDefautTabKey will return "Article"
				var tabControl = this.byId("PRODUCTLOOKUP_TAB_CONTAINER");
				tabControl.setSelectedKey(this.getDefaultTabKey());

				if (!tabControl.getExpanded()) {
					tabControl.setExpanded(true);
				}
			}
		}
	});
});