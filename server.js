const _express = require('express');
const _server = _express();

const _port = 4000;

const mysql = require('mysql');



const db = mysql.createConnection ({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'ibm_test_db'
});

// connect to database
db.connect((err) => {
  if (err) {
      throw err;
  }
  console.log('Connected to database');
});
global.db = db;


_server.get('/retoibm/sumar/:sumando01/:sumando02', function(request, response) {
  try{
    var _sumando01 = new Number(request.params.sumando01);
    var _sumando02 = new Number(request.params.sumando02);
    var _resultado = _sumando01 + _sumando02;
    
    if (typeof _resultado !== "undefined" && _resultado!==null && !isNaN(_resultado)){    
        
      let query = "INSERT INTO `sumatoria` (sumando01, sumando02, resultado) VALUES ('" + _sumando01 + "', '" + _sumando02 + "', '" + _resultado + "')";

        db.query(query, (err, result) => {
            if (err) {
                return response.status(500).send(err);
            }

            return response.status(200).json({resultado : _resultado});

        });

    }else{
      return response.status(400).json({resultado : "Bad Request"});
    }
  }
  catch(e){
    return response.status(500).json({resultado : e});
  }
});


_server.listen(_port, () => {
   console.log(`Server listening at ${_port}`);
});
