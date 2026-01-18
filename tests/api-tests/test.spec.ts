import { test, expect } from "@playwright/test";
import { initialUrl } from "./constants";
import { RestfulController } from "./api-controller";

//   test('test of single object', async ({ request }) => {
//         await test.step('first test', async () => {
//       const response = await request.get('https://api.restful-api.dev/objects/7');
//       const respondeBody = await response.json()
//       const expectedObject = {
//         id: '7',
//         name: 'Apple MacBook Pro 16',
//         data: {
//           year: 2019,
//           price: 1849.99,
//           'CPU model': 'Intel Core i9',
//           'Hard disk size': '1 TB'
//         }
//       };
//       expect(respondeBody).toEqual(expectedObject);
//       })}
//     )

test.describe("Test restful", () => {
  test.describe("Categories", () => {
    test("test of single object", async ({ request }) => {
      const restful = new RestfulController(initialUrl, request);
      const response = await restful.getSingleObject();
      const respondeBody = await response.json();
      const expectedObject = {
        id: "7",
        name: "Apple MacBook Pro 16",
        data: {
          year: 2019,
          price: 1849.99,
          "CPU model": "Intel Core i9",
          "Hard disk size": "1 TB",
        },
      };
      expect(respondeBody).toEqual(expectedObject);
    });

    test("test list of all items", async ({ request }) => {
      const restful = new RestfulController(initialUrl, request);
      const response = await restful.getListOfAllItems();
      const body = await response.json();
      expect(Array.isArray(body)).toBe(true);
      expect(body).toHaveLength(13);
    });

    test("test list of items by Ids", async ({ request }) => {
      const restful = new RestfulController(initialUrl, request);
      const response = await restful.getListOfItemsByIds();
      expect(response.status()).toEqual(200);
    });

    test("get single object", async ({ request }) => {
      const restful = new RestfulController(initialUrl, request);
      const response = await restful.getSingleObject();
      const body = await response.json();
      expect(typeof body).toBe("object");
      expect(body.data.year).toEqual(2019);
      expect(body.name).toEqual("Apple MacBook Pro 16");
    });

    test("test of adding single object", async ({ request }) => {
      const restful = new RestfulController(initialUrl, request);
      const response = await restful.addSingleObject();
      const body = await response.json();
      expect(typeof body).toBe("object");
      expect(body.data.year).toEqual(2019);
      expect(response.status()).toEqual(200);
    });

    test("test of Put request", async ({ request }) => {
      const restful = new RestfulController(initialUrl, request);
      const response = await restful.putNewDataToTheObject();
      expect(response.status()).toEqual(200);
      const body = await response.json();
      expect(body.data.year).toEqual(2020);
    });

    test("test of patch", async ({ request }) => {
      const restful = new RestfulController(initialUrl, request);
      const response = await restful.patchToObject();
      const body = await response.json();
      expect(body.name).toEqual("Apple MacBook Pro 16 (Updated Name)");
    });

    test("test of object delete", async ({ request }) => {
      const restful = new RestfulController(initialUrl, request);
      const { dedeletedObject: response, id } = await restful.deleteObject();
      const body = await response.json();
      expect(body.message).toEqual(`Object with id = ${id} has been deleted.`);
    });
  });
});
