const availableSeats = document.getElementById("avialable-seats");
const seatsForBuy = document.getElementById("my-tickets");
const totalPriceOfTicket = document.getElementById("gross-price");
const netPriceOfTicket = document.getElementById("net-price");
const couponBox = document.getElementById("coupon-box");
const couponCode = document.getElementById("coupon-code");
const couponApplyBtn = document.getElementById("coupon-apply-btn");
const countSelectedSeats = document.getElementById("count-seat");

const ticketPrice = 550;

function seat(elementName) {
  const mySeat = document.getElementsByClassName(elementName);
  for (const seat of mySeat) {
    seat.addEventListener("click", function () {
      this.classList.add("selected");

      const selectedSeatsElement = document.getElementsByClassName("selected");

      const div = document.createElement("div");
      div.innerHTML = `<section class="flex justify-between mb-3">
      <h4 class="text-base text-[#03071299] font-normal">${this.innerText}</h4>
      <h4 class="text-base text-[#03071299] font-normal">Economy</h4>
      <h4 class="text-base text-[#03071299] font-normal">550</h4>
      </section>`;
      if (selectedSeatsElement.length <= 4) {
        seatsForBuy.appendChild(div);
      }
      // how many seats are available now
      availableSeats.innerText = mySeat.length - selectedSeatsElement.length;

      countSelectedSeats.innerText = selectedSeatsElement.length;
      totalPriceOfTicket.innerText = selectedSeatsElement.length * ticketPrice;
      netPriceOfTicket.innerText = selectedSeatsElement.length * ticketPrice;

      if (selectedSeatsElement.length > 4) {
        alert("You can'n select more then 4 seats");
        seat.classList.remove("selected");
      }
      if (parseFloat(countSelectedSeats.innerText) === 5) {
        const counted = parseFloat(countSelectedSeats.innerText) - 1;
        countSelectedSeats.innerText = counted;
        totalPriceOfTicket.innerText = counted * ticketPrice;
        netPriceOfTicket.innerText = counted * ticketPrice;
        availableSeats.innerText = mySeat.length - counted;
      }
    });
  }
}

seat("btn-active");

function valid() {
  const totalPrice = parseFloat(totalPriceOfTicket.innerText);
  if (parseFloat(countSelectedSeats.innerText) === 4) {
    if (couponCode.value === "NEW15") {
      couponBox.classList.add("hidden");
      const discount = 15 / 100;
      const discountPrice = totalPrice * discount;
      const netPrice = totalPrice - discountPrice;
      netPriceOfTicket.innerText = netPrice;
    } else if (couponCode.value === "Couple 20") {
      couponBox.classList.add("hidden");
      const discount = 20 / 100;
      const discountPrice = totalPrice * discount;
      const netPrice = totalPrice - discountPrice;
      netPriceOfTicket.innerText = netPrice;
    } else {
      alert("Please provide a valid coupon");
    }
  } else {
    alert("You are not able to get discount. To get discount buy 4 ticket");
  }
}