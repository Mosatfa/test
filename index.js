// const { query } = require('express');
const express = require('express');
const mysql2 = require('mysql2');
const app = express();
const port = 5000;
 
const test = "test repo"
console.log(test);
//connect database
const connection = mysql2.createConnection({
    host: 'localhost',
    database: 'routeassigment3',
    user: 'root',
    password: ''
});

app.use(express.json({}));

//Get All users
app.get('/users',(req,res,next)=>{
    const query = `SELECT * FROM USERS`;
    connection.execute(query,(err,result,fields)=>{
        if(err){
            return res.json({message:"Error Query", err});
        }
        return result.length !=0 ? res.json({message:"Done",result}) : res.json({message:"There are no users yet"})
    });
});

//Add user
app.post('/users',(req,res,next)=>{
    const {name,email,password,age} = req.body;
    // console.log({name,email,password,age});
    const query = `INSERT INTO USERS (name,email,password,age) VALUES ('${name}','${email}','${password}',${age})`;
    connection.execute(query,(err,result,fields)=>{
        if(err){
            if(err.errno == 1062){
                return res.json({message:"Email Already Exist"});
            }
            return res.json({message:"Error", err});
        }
        return res.json({message:"Done", result});
    });

});

//Update user
app.put('/users/:id',(req,res,next)=>{
    const {id} = req.params;
    const {password} = req.body;
    // console.log({password})
    const query = `UPDATE USERS SET password='${password}' WHERE id=${id}`;
    connection.execute(query,(err,result,fields)=>{
        if(err){
            return res.json({message:"Error Query",err});
        }
        return result.affectedRows ? res.json({message:"Done",result}) : res.json({message:"In-valid Id"});
    });

});

//Delete user 
app.delete('/users/:id',(req,res,next)=>{
    const {id} = req.params;
    const query = `DELETE FROM USERS WHERE id=${id}`
    connection.execute(query,(err,result,fields)=>{
        if(err){
            return res.json({message:"Error Query",err});
        }
        return result.affectedRows ? res.json({message:"Done",result}) : res.json({message:"In-valid Id"});
    });
});

// search for user where his name start with "a" and age less than 30
app.get('/users/search',(req,res,next)=>{
    const query = `SELECT * FROM USERS WHERE name LIKE 'a%' AND age <= 30;`
    connection.execute(query,(err,result,fields)=>{
        if(err){
            return res.json({message:"Error Query", err});
        }
        return res.json({message:"Done",result});
    });
});

// search for users by list of ids => using IN
app.get('/users/search/:id',(req,res,next)=>{
    const {id} = req.params;
    const query = `SELECT * FROM users WHERE id IN (SELECT ${id})`;
    connection.execute(query,(err,result,fields)=>{
        if(err){
            return res.json({message:"Error Query", err});
        }
        return result.length != 0 ? res.json({message:"Done",result}) : res.json({message:"In-valid Id"});
    });
});

// get all users with products
app.get('/users/products',(req,res,next)=>{

    const query = `SELECT * FROM USERS INNER JOIN PRODUCTS ON USERS.id = PRODUCTS.createdby`
    connection.execute(query,(err,result,fields)=>{
        if(err){
            return res.json({message:"Error Query",err})
        }
        return res.json({message:"Done",result})
    })
});




// get all products
app.get('/products',(req,res,next)=>{
    const query = `SELECT * FROM products`
    connection.execute(query,(err,result,fields)=>{
        if(err){
            return res.json({message:"Error Query", err});
        }
        return result.length != 0 ? res.json({message:"Done",result}) : res.json({message:"There are no products yet"});
    });
});

//add product user sign in
app.post('/products/:id',(req,res,next)=>{
    const {id} = req.params;
    const {pName,pDescription,price} = req.body;
    // console.log({pName,pDescription,price,createdby} )
    const query = `INSERT INTO products (pName,pDescription,price,createdby) VALUES ('${pName}','${pDescription}',${price},${id})`
    connection.execute(query,(err,result,fields)=>{
        if(err){
            if(err.errno == 1452){
                return res.json({message:"In-valid id"});
            }
            return res.json({message:"Error", err});
        }
        return res.json({message:"Done", result});
    });
});

// update product (product owner only)
app.put('/products/:id/:name',(req,res,next)=>{
    const {id , name} = req.params;
    const {pName,pDescription,price} = req.body;
    // console.log({pName,pDescription,price});
    const query = `UPDATE products SET pName='${pName}', pDescription='${pDescription}' , price=${price} WHERE products.createdby =${id} AND products.pName = '${name}' `;
    connection.execute(query,(err,result,fields)=>{
        if(err){
            return res.json({message:"Error Query",err});
        }
        return result.affectedRows ? res.json({message:"Done",result}) : res.json({message:"Product not found"});
    });
});

// delete product (product owner only )
app.delete('/products/:id/:name',(req,res,next)=>{
    const {id , name} = req.params;
    const query = `DELETE FROM products WHERE products.createdby =${id} AND products.pName = '${name}'`
    connection.execute(query,(err,result,fields)=>{
        if(err){
            return res.json({message:"Error Query",err});
        }
        return result.affectedRows ? res.json({message:"Done",result}) : res.json({message:"Product not found"});
    });
});
// search for products where price greater than 3000
app.get('/products/price',(req,res,next)=>{
    const query = `SELECT * FROM products WHERE price > 3000`
    connection.execute(query,(err,result,fields)=>{
        if(err){
            return res.json({message:"Error Query", err});
        }
        return result.length != 0 ? res.json({message:"Done",result}) : res.json({message:"Products not found"});
    });
});


// 404 page routing
app.use((req,res,next)=>{
    return res.json({message:"Page Not Found"})
})

app.listen(port,()=>{
    console.log(`server is Running......${port}`)
});