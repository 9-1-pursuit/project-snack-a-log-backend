const request = require("supertest");

const snacks = require("../app.js");
const db = require("../db/dbConfig.js");

const confirmHealth = require("../confirmHealth.js");

describe("Basic root route", () => {
  describe("/", () => {
    it("is able to make a successful get request to /, that returns a string", async () => {
      const response = await request(snacks).get("/");
      expect(response.text).toBe("Get Snack'n at Snack-a-log!");
    });
  });
});

describe("snacks", () => {
  beforeEach(async () => {
    await db.none("DELETE FROM snacks WHERE true");
    await db.none("ALTER SEQUENCE snacks_id_seq RESTART");
    await db.none(`INSERT INTO snacks (name, fiber, protein, added_sugar, is_healthy, image) VALUES
    ('Strawberries', 20, 10, 0, true, 'https://picsum.photos/id/1080/300/300'),
    ('Raspberries', 16, 4, 0, true, 'https://picsum.photos/id/102/300/300'),
    ('Honey Covered Granola',  30, 12, 22, false, 'https://picsum.photos/id/312/300/300'),
    ('New Wave Nuts', 11, 55, 9, true, 'https://picsum.photos/id/139/300/300'),
    ('Raw Onions & Turnips', 11, 9, 9, true, 'https://picsum.photos/id/292/300/300'),
    ('Healthy Birthday Cake Square', 4, 8, 19, false, 'https://content.nutrisystem.com/images/products/alc/large/BirthdayCakeSquare_L.jpg');`);
  });

  afterAll(() => {
    db.$pool.end();
  });

  describe("/snacks/:id", () => {
    describe("GET", () => {
      it("with correct id - fetches the correct snack", async () => {
        const response = await request(snacks).get("/snacks/1");
        const parsedRes = JSON.parse(response.text);

        expect(parsedRes.success).toBe(true);
        expect(parsedRes.payload.id).toEqual(1);
        expect(parsedRes.payload.name).toEqual("Strawberries");
      });

      it("with incorrect id - sets status to 404 and returns error key", async () => {
        const response = await request(snacks).get("/snacks/98989898");
        const parsedRes = JSON.parse(response.text);

        expect(response.statusCode).toEqual(404);
        expect(parsedRes.success).toBe(false);
        expect(parsedRes.payload).toMatch(/not found/);
      });
    });
    describe("DELETE", () => {
      it("with valid id - deletes the correct snack", async () => {
        const response = await request(snacks).delete("/snacks/1").send();
        const parsedRes = JSON.parse(response.text);

        expect(parsedRes.success).toBe(true);
        expect(parsedRes.payload.id).toEqual(1);
        expect(parsedRes.payload.name).toEqual("Strawberries");
      });

      it("with invalid id - does not delete anything", async () => {
        const response = await request(snacks).delete("/snacks/99999").send();
        const parsedRes = JSON.parse(response.text);

        expect(parsedRes.success).toBe(false);
        expect(parsedRes.payload.id).toBe(undefined);
      });
    });
  });

  describe("/snacks", () => {
    describe("GET", () => {
      it("returns all snacks", async () => {
        const expected = [
          {
            id: 1,
            name: "Strawberries",
            image: "https://picsum.photos/id/1080/300/300",
            fiber: 20,
            protein: 10,
            added_sugar: 0,
            is_healthy: true,
          },
          {
            id: 2,
            name: "Raspberries",
            image: "https://picsum.photos/id/102/300/300",
            fiber: 16,
            protein: 4,
            added_sugar: 0,
            is_healthy: true,
          },
          {
            id: 3,
            name: "Honey Covered Granola",
            image: "https://picsum.photos/id/312/300/300",
            fiber: 30,
            protein: 12,
            added_sugar: 22,
            is_healthy: false,
          },
          {
            id: 4,
            name: "New Wave Nuts",
            image: "https://picsum.photos/id/139/300/300",
            fiber: 11,
            protein: 55,
            added_sugar: 9,
            is_healthy: true,
          },
          {
            id: 5,
            name: "Raw Onions & Turnips",
            image: "https://picsum.photos/id/292/300/300",
            fiber: 11,
            protein: 9,
            added_sugar: 9,
            is_healthy: true,
          },
          {
            id: 6,
            name: "Healthy Birthday Cake Square",
            image:
              "https://content.nutrisystem.com/images/products/alc/large/BirthdayCakeSquare_L.jpg",
            fiber: 4,
            protein: 8,
            added_sugar: 19,
            is_healthy: false,
          },
        ];

        const response = await request(snacks).get("/snacks").expect(200);
        const parsedRes = JSON.parse(response.text);

        expect(parsedRes.payload).toEqual(expect.arrayContaining(expected));
      });
    });

    describe("POST", () => {
      it("with valid snack name and image - can create a snack", async () => {
        const response = await request(snacks).post("/snacks").send({
          name: "Spiders on a Log",
          image:
            "https://i3.wp.com/onmykidsplate.com/wp-content/uploads/2018/09/Halloween-Snack-Spider-Peanut-Butter-Celery.jpg",
          fiber: 6,
          protein: 6,
          added_sugar: 12,
        });

        const parsedRes = JSON.parse(response.text);

        expect(parsedRes.success).toBe(true);
        expect(!!parsedRes.payload.id).toBe(true);
        expect(parsedRes.payload.image).toEqual(
          "https://i3.wp.com/onmykidsplate.com/wp-content/uploads/2018/09/Halloween-Snack-Spider-Peanut-Butter-Celery.jpg"
        );
      });
      it("with valid snack name, but no image- can create a snack with default image", async () => {
        const response = await request(snacks).post("/snacks").send({
          name: "banana",
        });

        const parsedRes = JSON.parse(response.text);

        expect(parsedRes.success).toBe(true);
        expect(!!parsedRes.payload.id).toBe(true);
        expect(parsedRes.payload.name).toEqual("Banana");
        expect(parsedRes.payload.image).toEqual(
          "https://dummyimage.com/400x400/6e6c6e/e9e9f5.png&text=No+Image"
        );
      });

      it("with valid snack name but lowercase - can create a capitalized snack (will NOT capitalize words with 2 letter or less)", async () => {
        const response = await request(snacks).post("/snacks").send({
          name: "spiders on a log",
          image:
            "https://i3.wp.com/onmykidsplate.com/wp-content/uploads/2018/09/Halloween-Snack-Spider-Peanut-Butter-Celery.jpg",
          fiber: 6,
          protein: 6,
          added_sugar: 12,
        });

        const parsedRes = JSON.parse(response.text);

        expect(parsedRes.success).toBe(true);
        expect(!!parsedRes.payload.id).toBe(true);
        expect(parsedRes.payload.name).toEqual("Spiders on a Log");
      });

      it("with valid snack name, will capitalize as expected", async () => {
        const response = await request(snacks).post("/snacks").send({
          name: "COMBOS",
        });

        const parsedRes = JSON.parse(response.text);

        expect(parsedRes.success).toBe(true);
        expect(!!parsedRes.payload.id).toBe(true);
        expect(parsedRes.payload.name).toEqual("Combos");
      });

      it("with valid snack name mixed capitalization - can create a properly capitalized snack", async () => {
        const response = await request(snacks).post("/snacks").send({
          name: "FLAMIN' hot Cheetoes",
        });

        const parsedRes = JSON.parse(response.text);

        expect(parsedRes.success).toBe(true);
        expect(!!parsedRes.payload.id).toBe(true);
        expect(parsedRes.payload.name).toEqual("Flamin' Hot Cheetoes");
      });

      it("with invalid fiber, protein or added_sugar- can NOT determine health of snack", async () => {
        const response = await request(snacks).post("/snacks").send({
          name: "Combos",
          added_sugar: null,
        });

        const parsedRes = JSON.parse(response.text);

        expect(parsedRes.success).toBe(true);
        expect(!!parsedRes.payload.id).toBe(true);
        expect(parsedRes.payload.is_healthy).toBe(null);
      });
    });

    // describe("PUT", () => {
    //   it("with valid snack and id - updates the correct snack", async () => {
    //     const response = await request(snacks).put("/snacks/1").send({
    //       name: "Snack Platter",
    //       image:
    //         "https://www.freshcravings.com/wp-content/uploads/2017/12/FC_MexicanSnack-Platter-1-1480x1480@2x.jpg",
    //       fiber: 6,
    //       protein: 5,
    //       added_sugar: 1,
    //     });

    //     const parsedRes = JSON.parse(response.text);

    //     expect(parsedRes.success).toBe(true);
    //     expect(parsedRes.payload.id).toEqual(1);
    //     expect(parsedRes.payload.name).toEqual("Snack Platter");
    //   });

    //   it("with invalid snack or id - responds with 422 and message", async () => {
    //     const response = await request(snacks)
    //       .put("/snacks/1")
    //       .send({ image: "http://no-name.test" });

    //     const parsedRes = JSON.parse(response.text);

    //     expect(response.statusCode).toEqual(422);
    //     expect(parsedRes.success).toBe(false);
    //     expect(parsedRes.payload).toMatch(/include all fields/);
    //   });
    // });
  });
  describe("Snack Health Check", () => {
    describe("Snack Health: ♥ Enough fiber", () => {
      it("Checks if fiber is above five and added_sugar is below 5", () => {
        expect(confirmHealth({ protein: 4, fiber: 5, added_sugar: 1 })).toBe(
          true
        );
      });
    });

    describe("Snack Health: ♥ Enough protein", () => {
      it("Checks if protein is above 5 and added_sugar is below 5", () => {
        expect(confirmHealth({ protein: 6, fiber: 2, added_sugar: 0 })).toBe(
          true
        );
      });
    });

    describe("Snack Health: ♥ Enough fiber and protein", () => {
      it("Checks if protein is above 5 or fiber is above five and added_sugar is below 5", () => {
        expect(confirmHealth({ protein: 8, fiber: 9, added_sugar: 3 })).toBe(
          true
        );
      });
    });

    describe("Snack Health: ♡ Enough fiber, too much sugar", () => {
      it("Checks if fiber is above five and added_sugar is above 5", () => {
        expect(confirmHealth({ protein: 2, fiber: 8, added_sugar: 10 })).toBe(
          false
        );
      });
    });

    describe("Snack Health: ♡ Enough protein, too much sugar", () => {
      it("Checks if protein is above 5 and added_sugar is above 5", () => {
        expect(confirmHealth({ protein: 22, fiber: 3, added_sugar: 11 })).toBe(
          false
        );
      });
    });

    describe("Snack Health: ♡ Enough protein and fiber, too much sugar", () => {
      it("Checks if protein is above 5 and fiber is above five and added_sugar is above 5", () => {
        expect(confirmHealth({ protein: 5, fiber: 5, added_sugar: 13 })).toBe(
          false
        );
      });
    });

    describe("Snack Health: ♡ Not enough protein nor fiber, too much sugar", () => {
      it("Checks if protein is above 5 and fiber is above five and added_sugar is above 5", () => {
        expect(confirmHealth({ protein: 1, fiber: 0, added_sugar: 6 })).toBe(
          false
        );
      });
    });

    describe("Snack Health: ♡ Not enough protein nor fiber, nor too much sugar", () => {
      it("Checks if protein is above 5 and fiber is above five and added_sugar is above 5", () => {
        expect(confirmHealth({ protein: 1, fiber: 0, added_sugar: 2 })).toBe(
          false
        );
      });
    });

    describe("Snack Health: Missing info", () => {
      it("Checks if protein, fiber and added_sugar have valid values", () => {
        expect(
          confirmHealth({ protein: "", fiber: "c", added_sugar: null })
        ).toBe(null);
      });
    });
  });
});
