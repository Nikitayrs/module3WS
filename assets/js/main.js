const API_URL = 'http://vaepvuvy-m3.wsr.ru/api/';

function sendRequest(path, callback, method = 'GET', data = {}, headers = {}) {
    let params = {
        method: method,
        headers: {
            'Content-Type': 'application/json',
            ...headers
        }
    };

    if (Object.keys(data).length) {
        params['body'] = JSON.stringify(data)
    }

    let code = 500;

    fetch(API_URL + path, params)
        .then(response => {
            code = response.status
            return (code === 204 || code === 201) ? null : response.json();
        })
        .then(function (response) {
            if (typeof callback === 'function') {
                callback(response, code)
            }
        })
}

function getArrivalTime(time1, time2) {
    time1 = time1.split(':')
    time2 = time2.split(':')
    let minutes = (time2[0] - time1[0]) * 60 + (time2[1] - time1[1])
    return {
        hours: Math.floor(minutes / 60),
        minutes: minutes % 60
    }
}
