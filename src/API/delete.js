const BASE_URL = 'https://mystage.artelelectronics.com/api/v1'
export async function deleteAPI(url, body) {
    const user = JSON.parse(localStorage.getItem('token'))

    const options = {
        method: 'DELETE',
        body: JSON.stringify(body),
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${user?.token?.access}`
        },
    }

    return await fetch(BASE_URL+url, options )
        .then((res) => {return res.json()})
        .catch((err) => {
            console.log(err.message);
        });
}