const BASE_URL = 'https://mystage.artelelectronics.com/api/v1'
export async function postImage(url, body) {
    const user = JSON.parse(localStorage.getItem('token'))
    const options = {
        method: 'POST',
        body: body,
    }

    if(user && !url.includes('/login')) {
        options.headers = {
            ...options.headers,
            Authorization: `Bearer ${user?.token?.access}`
        }
    }

    return await fetch(BASE_URL+url, options )
        .then((res) => res.json())
        .then(data => {
            return data
        })
        .catch((err) => {
            console.log("error: ", err.message);
        });
}