import express from "express";
import Items from "./item";
const routes = express.Router();

const items: Items[] = [
    { id: 1, product: "apple", price: 1.0, quantity: 2 },
    { id: 2, product: "banana", price: .5, quantity: 4 },
    { id: 3, product: "coca-cola", price: 1.5, quantity: 1 },
    { id: 4, product: "doritos", price: 3.0, quantity: 1 }
  ];
  
  let nextId: number = 5;


  routes.get("/items", (req, res) => {
    res.status(200)
    let maxPrice: number = parseInt(req.query.maxPrice as string);  
    let prefix: string = req.query.prefix as string;
    let pageSize: string = req.query.pageSize as string;
   
    let results = items;
    if(maxPrice){
        results = results.filter(item => item.price <= maxPrice);
    }
    if(prefix) {
        prefix = prefix.toLowerCase();
        results = results.filter(
            item => item.product.toLowerCase().startsWith(prefix));
    }
    if(pageSize) {
        results = results.filter(
          item => item.product.slice(2));
    }
    res.json(results);
});

  routes.get("/items/:id", (req, res) => {
      const id: number = parseInt(req.params.id);
      const item: Items|undefined = items.find(item => item.id === id);
      if (item) {
          res.json(item);
      }else {
          res.status(404);
          res.send("ID Not Found");
      }
  });

    routes.post("/items", (req, res) => {
      let item: Items = req.body;
      item.id = nextId;
      nextId ++;
      items.push(item);
      res.status(201);
      res.json(item);
    });

    routes.put("/items/:id", (req, res) => {
      const id: number = parseInt(req.params.id);
      let item: Items = req.body;
      item.id = id;
      const index: number = items.findIndex(item => item.id === id);
      if (index !== -1) {
        items[index] = item;
        res.status(200);
        res.json(item);
      } 
    });

    routes.delete("/items/:id", (req, res) => {
      const id: number = parseInt(req.params.id);
      const index: number = items.findIndex(item => item.id === id);
      if (index !== -1) {
        items.splice(index,1);
      }
      res.status(204);
      res.send();
    });

    export default routes;
  
