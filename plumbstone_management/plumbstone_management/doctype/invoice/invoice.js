// Copyright (c) 2024, usama-khatri and contributors
// For license information, please see license.txt

frappe.ui.form.on("Invoice", {
	item_total(frm){
		let percent= (frm.doc.item_total/100)*(frm.doc.gst_percentage =="18%"?18:12)
		let ta=(frm.doc.item_total+percent).toFixed(2)
		frm.set_value("item_round_off_amount",(ta-Math.floor(ta)).toFixed(2))
		frm.set_value("tax_amount",percent.toFixed(2))
		frm.set_value("item_grand_total",Math.floor(ta).toFixed(2))

	},
	gst_percentage(frm){
		console.log(frm.doc)
		let percent= (frm.doc.item_total/100)*(frm.doc.gst_percentage =="18%"?18:12)
		let ta=(frm.doc.item_total+percent).toFixed(2)
		frm.set_value("item_round_off_amount",(ta-Math.floor(ta)).toFixed(2))
		frm.set_value("tax_amount",percent.toFixed(2))
		frm.set_value("item_grand_total",Math.floor(frm.doc.item_total+percent).toFixed(2))
	}
	
});

frappe.ui.form.on("Invoice Item",{
	
	item_qty(frm,cdt,cdn){
		let index = frm.doc.items?.findIndex(v=>v.name===cdn)
		let amount=frm.doc.items[index].item_qty * frm.doc.items[index].item_price
		frappe.model.set_value(cdt,cdn,"item_amount",amount)
	},
	item_amount(frm){
		let sum =0 
		frm.doc?.items.forEach(element => {
			sum+=element.item_amount
		});
		frm.set_value("item_total",sum)
	},
})
