class CalendarAPI {
    constructor() {
        this.url = "http://localhost:3005/meetings";
    }

    loadDataAPI() {
        return this._fetch()
    }

    addDataAPI(data) {
        const options = {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        }
        return this._fetch(options)
    }

    removeData(id) {
        const options = {
            method: 'DELETE'
        };
        return this._fetch(options, `/${id}`);
    }

    updateDataAPI(id, data) {
        const options = {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        }
        return this._fetch(options,`/${id}`)
    }
   
    _fetch(options) {
        return fetch(this.url, options)
            .then(resp =>{
                if(resp.ok){
                    return resp.json();
                }
                return Promise.reject(resp)
            });
    }
}



export default CalendarAPI;