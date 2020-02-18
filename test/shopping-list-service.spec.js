const ShoppingListService = require("../src/shopping-list-service");
const knex = require("knex");

describe("shopping list service object", function () {
  let db;

  let testShoppingList = [
    {
      id: 1,
      name: "First test item!",
      date_added: new Date("2029-01-22T16:28:32.615Z"),
      checked: false,
      price: "12.00",
      category: "Main"
    },
    {
      id: 2,
      name: "Second test item!",
      date_added: new Date("2100-05-22T16:28:32.615Z"),
      checked: false,
      price: "21.00",
      category: "Snack"
    },
    {
      id: 3,
      name: "Third test item!",
      date_added: new Date("1919-12-22T16:28:32.615Z"),
      checked: false,
      price: "3.00",
      category: "Lunch"
    },
    {
      id: 4,
      name: "Third test item!",
      date_added: new Date("1919-12-22T16:28:32.615Z"),
      checked: false,
      price: "0.99",
      category: "Breakfast"
    }
  ];

  before(() => {
    db = knex({
      client: "pg",
      connection: process.env.TEST_DB_URL
    });
  });

  before(() => db("shopping_list").truncate());

  afterEach(() => db("shopping_list").truncate());

  after(() => db.destroy());

  context(`Given 'shopping_list' has data`, () => {
    beforeEach(() => {
      return db.into("shopping_list").insert(testShoppingList);
    });

    it(`getAllItems() resolves all items from 'shopping_list' table`, () => {
      const expectedItems = testShoppingList.map(item => ({
        ...item,
        checked: false
      }));
      return ShoppingListService.getAllItems(db).then(actual => {
        expect(actual).to.eql(expectedItems);
      });
    });

    it(`getById() resolves an item by id from 'shopping_list' table`, () => {
      const thirdId = 3;
      const thirdTestItem = testShoppingList[thirdId - 1];
      return ShoppingListService.getById(db, thirdId).then(actual => {
        expect(actual).to.eql({
          id: thirdId,
          name: thirdTestItem.name,
          category: thirdTestItem.category,
          // // something went wrong right about here
          checked: false,
          price: thirdTestItem.price,
          date_added: thirdTestItem.date_added
        });
      });
    });

    it(`deleteItem() removes an item by id from 'shopping_list' table`, () => {
      const itemId = 3;
      return ShoppingListService.deleteItem(db, itemId)
        .then(() => ShoppingListService.getAllItems(db))
        .then(allItems => {
          // copy the test Items array without the "deleted" article
          const expected = testShoppingList.filter(item => item.id !== itemId);
          expect(allItems).to.eql(expected);
        });
    });

    it(`updateItem() updates an item from the 'shopping_list' table`, () => {
      const idOfItemToUpdate = 3;
      const newItemData = {
        name: "PretenderBurgers",
        category: "Lunch",
        checked: false,
        price: "5.50",
        date_added: new Date("2020-10-01T00:00:00.000Z")
      };
      return ShoppingListService.updateItem(db, idOfItemToUpdate, newItemData)
        .then(() => ShoppingListService.getById(db, idOfItemToUpdate))
        .then(item => {
          expect(item).to.eql({
            id: idOfItemToUpdate,
            ...newItemData
          });
        });
    });

    context(`Given 'shopping_list' has no data`, () => {
      // beforeEach to clear test db
      beforeEach(() => db("shopping_list").truncate());
      // db was returning testShoppingList without beforeEach()
      it(`getAllItems() resolves an empty array`, () => {
        return ShoppingListService.getAllItems(db).then(actual => {
          expect(actual).to.eql([]);
        });
      });

      it(`insertItem() inserts a new Item and resolves the new Item with an 'id'`, () => {
        const newItem = {
          name: "PretenderSteaks",
          category: "Lunch",
          checked: true,
          price: "2.50",
          date_added: new Date("2020-03-01T00:00:00.000Z")
        };

        return ShoppingListService.insertItem(db, newItem).then(actual => {
          expect(actual).to.eql({
            id: 1,
            name: newItem.name,
            category: newItem.category,
            checked: newItem.checked,
            price: newItem.price,
            date_added: newItem.date_added
          });
        });
      });
    });

    // end of line
  });
});
