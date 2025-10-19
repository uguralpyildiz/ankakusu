const checkoutBtn = document.getElementById('checkout-product');
const sendWhatsappBtn = document.getElementById('send-whatsapp');

checkoutBtn.addEventListener('click', () => {
	const tbody = document.querySelector("#cart-table tbody");
	tbody.innerHTML = "";

	// HTML’den ürün bilgilerini çek
	const title = document.querySelector(".product-title")?.textContent || "";
	const stock = document.querySelector("p")?.textContent || "";
	const oldPriceText = document.querySelector(".old-price")?.textContent || "0";
	const newPriceText = document.querySelector(".new-price")?.textContent || "0";
	const oldPrice = parseFloat(oldPriceText.replace(/[^\d,]/g, '').replace(',', '.')) || 0;
	const newPrice = parseFloat(newPriceText.replace(/[^\d,]/g, '').replace(',', '.')) || 0;
	const color = document.querySelector("input[name='color']:checked")?.value || "siyah";
	const quantity = parseInt(document.querySelector(".qty-input")?.value) || 1;
	const total = (quantity * newPrice).toFixed(2);

	// Tabloda ürün satırını ekle
	const row = document.createElement("tr");
	row.innerHTML = `
        <td>${title} (${color})</td>
        <td>${quantity}</td>
        <td>₺${total}</td>
    `;
	tbody.appendChild(row);

	// Modal üst info
	const modalInfo = document.getElementById('modal-product-info');


	// Modal aç
	const modal = new bootstrap.Modal(document.getElementById('cartModal'));
	modal.show();
});

// WhatsApp Gönder butonu
sendWhatsappBtn.addEventListener('click', () => {
	const qty = parseInt(document.querySelector("#cart-table tbody tr td:nth-child(2)")?.textContent) || 1;
	const color = document.querySelector('input[name="modal-color"]:checked')?.value || "siyah";

	const title = document.querySelector(".product-title")?.textContent || "";
	const stock = document.querySelector("p")?.textContent || "";
	const newPriceText = document.querySelector(".new-price")?.textContent || "0";
	const newPrice = parseFloat(newPriceText.replace(/[^\d,]/g, '').replace(',', '.')) || 0;
	const total = (qty * newPrice).toFixed(2);

	// Adres bilgileri
	const fname = document.getElementById('c_fname')?.value || "";
	const lname = document.getElementById('c_lname')?.value || "";
	const email = document.getElementById('c_email_address')?.value || "";
	const phone = document.getElementById('c_phone')?.value || "";
	const address1 = document.getElementById('c_address')?.value || "";
	const address2 = document.getElementById('c_address2')?.value || "";
	const notes = document.getElementById('c_order_notes')?.value || "";

	const message = `Sipariş Bilgileri:\n${title}\nStok: ${stock}\nRenk: ${color}\nAdet: ${qty}\nToplam: ₺${total}\n\nMüşteri Bilgileri:\nAd: ${fname}\nSoyad: ${lname}\nE-posta: ${email}\nTelefon: ${phone}\nAdres: ${address1} ${address2}\nNotlar: ${notes}`;

	const url = `https://wa.me/905326383588?text=${encodeURIComponent(message)}`;
	window.open(url, '_blank');
});