/**
 * Service - fetched data from the endpoints
 * @url - https://api.jsonbin.io/b/5e8c3aafaf7c476bc47e47a3
 * returns json formatted response
 */

const Service = function () {
    this.getData = () => {
        return fetch('https://jsonplaceholder.typicode.com/users/1/todos')
                .then((response) => {
                    return response.json()
                }).then (res => {
                    return [
                        {
                          "id": 1,
                          "title": "Watch Money Heist",
                          "status": "doing"
                        },
                        {
                          "id": 2,
                          "title": "Buy groceries",
                          "status": "hold"
                        },
                        {
                          "id": 3,
                          "title": "Sanitize groceries",
                          "status": "pending"
                        },
                        {
                          "id": 4,
                          "title": "Submit todo list assignment",
                          "status": "doing"
                        },
                        {
                          "id": 5,
                          "title": "Prepare lunch",
                          "status": "hold"
                        },
                        {
                          "id": 6,
                          "title": "Release cleartrip app",
                          "status": "doing"
                        }
                    ]
                })
    }
}

export default Service