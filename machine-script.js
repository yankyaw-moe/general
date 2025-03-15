class VendingMachine {
  constructor() {
    this.drinks = {
      "Coca Cola": 3.35,
      Pepsi: 2.1,
      Orange: 2.85,
    };
    this.moneyInserted = 0;
  }

  insertMoney(amount) {
    const validAmounts = [5, 10, 15, 20];
    if (validAmounts.includes(amount)) {
      this.moneyInserted += amount;
      console.log(`Money inserted: $${this.moneyInserted}`);
    } else {
      console.log("Invalid amount. Please insert 5$, 10$, 15$, or 20$");
    }
  }

  selectDrink(drink) {
    if (!this.drinks[drink]) {
      console.log("Invalid selection. Please choose a valid drink.");
      return;
    }

    const price = this.drinks[drink];

    if (this.moneyInserted >= price) {
      this.moneyInserted -= price;
      console.log(
        `Dispensing ${drink}. Remaining balance: $${this.moneyInserted.toFixed(
          2
        )}`
      );
    } else {
      console.log(
        `Not enough money. ${drink} costs $${price}. Please insert more money.`
      );
    }
  }

  purchaseAnotherDrink() {
    return this.moneyInserted > 0;
  }

  getChange() {
    console.log(`Returning change: $${this.moneyInserted.toFixed(2)}`);
    this.moneyInserted = 0;
  }
}

// Simulating the vending machine usage
const vendingMachine = new VendingMachine();
vendingMachine.insertMoney(10);
vendingMachine.selectDrink("Coca Cola");
if (vendingMachine.purchaseAnotherDrink()) {
  vendingMachine.selectDrink("Pepsi");
}
vendingMachine.getChange();
