import { SERVER_NAME }  from './ServerUtil.js';

export  function logInfo(info, data) {
//need to take it dynamically....
if((SERVER_NAME === 'http://127.0.0.1:8080') || (SERVER_NAME === 'http://localhost:8080')) { console.log("****Start Info*****");
 console.log(info);
console.log("****End Info*****");
console.log("**** Start Data*****");
console.log(data);
}

return true;
}
