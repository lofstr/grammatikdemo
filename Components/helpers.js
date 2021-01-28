import React, { useState } from 'react';

export function fetchData(text, resultCallback) {
  var request = new XMLHttpRequest();
  const reqUrl = 'https://sapistunnel.eu.ngrok.io/api';
  const reqUrl2 = 'https://graspservice.eu.ngrok.io/api';
  request.open('POST', reqUrl2, true);
  request.onreadystatechange = (e) => {
    if (request.readyState !== 4) {
      return;
    }
    if (request.status === 200) {
      console.log('Requst was a success');
      for (
        let index = 0;
        index < request.response[0].efselab.parsed.length;
        index++
      ) {
        const element = request.response[0].efselab.parsed[index];
      }
      resultCallback({
        success: true,
        response: request.response[0].efselab.parsed,
      });
    } else {
      console.log('Request got an error');
      let errorMsg = 'Kunde tyvärr inte nå servern - försök igen senare!';
      resultCallback({ success: false, response: errorMsg });
    }
  };
  request.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
  request.responseType = 'json';
  request.send(text);
}
